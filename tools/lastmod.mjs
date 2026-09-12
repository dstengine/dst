// Regenerates packages/content/src/lastmod.json — when each built page's
// content last actually changed.
//
// Two kinds of page, dated two ways.
//
// An **entry page** — one event, one news item — is dated by the entry's own
// `updatedAt`. That field is written down in the data (see ItemBase), so
// there is nothing here to infer: the page says what the entry says.
//
// A **group page** — the front page, /events/, a section — has no entry of
// its own. It is dated by the newest of the entries it actually lists, taken
// with the dates of the files that shape it: its route, its copy, its
// vocabulary. Both halves are needed. Without the entries, a section is
// dated by whichever file happens to name it and a page built today can
// claim to be older than it is; without the files, rewriting a heading or a
// lede changes the page and moves nothing.
//
// Which entries a group lists is read off the built page: the internal links
// inside its <main> that resolve to entry pages. No per-site knowledge, and
// the answer is the page's own, not a second guess at what the template
// meant to render. Links to sibling groups are ignored, which is also what
// keeps two sections that link to each other from chasing each other's date.
//
// Feed files are deliberately left out of the file half: a feed holds a whole
// site's entries, so its commit date moves whenever any of them is touched,
// and counting it would put every section of that site on the same date —
// the noise this file exists to avoid. The entries cover it precisely.
//
// Why a generated file rather than a build-time lookup: Vercel checks the
// repo out shallow, so `git log` there reports the deploy commit for every
// file and every page would claim to have changed today. lastmod is a crawl
// signal; a date that is always "now" is worse than no date at all. So the
// dates are computed here, where the full history is, and committed.
//
//   npm run build && node tools/lastmod.mjs
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HOSTS = {
  dst: "dst.llc",
  llc: "llc.dst.llc",
  visas: "visas.dst.llc",
  riviera: "riviera.dst.llc",
  mbr: "mbr.dst.llc",
  palmcentral: "palmcentral.dst.llc",
  fwf: "fwf.lol",
  musical: "musical.today",
  eco: "eco.dst.llc",
  nyc42: "nyc42.lol",
  sol2go: "sol2go.lol",
  vien: "vien.lol",
  ldn: "ldn.lol",
  lnd: "lnd.lol",
  cmx: "cmx.lol",
  mxo: "mxo.lol",
  tokiohotel: "tokiohotel.vvm.space",
};

const gitDates = new Map();
/** Last commit that touched a file, as an ISO date. */
function lastCommit(file) {
  if (gitDates.has(file)) return gitDates.get(file);
  let date = null;
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], { cwd: REPO }).toString().trim();
    date = out || null;
  } catch {
    date = null;
  }
  gitDates.set(file, date);
  return date;
}


// What the page says, not what it looks like. Layouts and components are
// deliberately not counted: restyling the header changes every page in the
// network, and if that moved every lastmod, the field would say "all 72
// pages changed today" every time we touch the chrome — which is precisely
// the noise lastmod exists to avoid.
// A types file is in the same class: `types.ts` declares the shape of the
// data, never a word of it, so adding an optional field to Venue changes no
// page and must not date-stamp every page that renders one.
const isChrome = (file) => {
  const rel = path.relative(REPO, file);
  return /(^|\/)(layouts|components|styles)\//.test(rel) || /(^|\/)types\.ts$|\.d\.ts$/.test(rel);
};

/** What a file exports, and where each name really comes from.

    Three kinds of line matter: `export { cities } from "./data/cities"`
    (the name lives elsewhere), `export * from "./rules"` (some of the names
    live elsewhere, and only reading that file says which), and a plain
    `export const showBySlug = …` (the name lives here). */
const exportCache = new Map();
function exportsOf(file) {
  if (exportCache.has(file)) return exportCache.get(file);
  let text = "";
  try { text = readFileSync(file, "utf8"); } catch { /* generated or gone */ }
  const named = new Map();
  const wildcards = [];
  const locals = new Set();
  const imports = [];

  for (const m of text.matchAll(/export\s+(?:type\s+)?\{([^}]*)\}\s*from\s*["']([^"']+)["']/g))
    for (const part of m[1].split(",")) {
      const name = part.trim().split(/\s+as\s+/).pop()?.trim();
      if (name) named.set(name, m[2]);
    }
  for (const m of text.matchAll(/export\s+\*\s*from\s*["']([^"']+)["']/g)) wildcards.push(m[1]);
  for (const m of text.matchAll(/export\s+(?:declare\s+)?(?:const|let|var|function|async function|class|interface|type|enum)\s+([A-Za-z0-9_$]+)/g))
    locals.add(m[1]);
  for (const m of text.matchAll(/(?:^|[^.\w])import\s[^"']*?from\s*["']([^"']+)["']/g)) imports.push(m[1]);

  const out = { named, wildcards, locals, imports };
  exportCache.set(file, out);
  return out;
}

/** A relative specifier as a file on disk, or null. */
function resolveSpec(fromFile, spec) {
  if (!spec.startsWith(".")) return null;
  const base = path.resolve(path.dirname(fromFile), spec);
  for (const candidate of [base, `${base}.ts`, path.join(base, "index.ts")])
    if (existsSync(candidate) && statSync(candidate).isFile() && !isChrome(candidate)) return candidate;
  return null;
}

/** Does this file, or something it re-exports, provide `name`? */
function provides(file, name, seen = new Set()) {
  if (seen.has(file)) return false;
  seen.add(file);
  const { named, wildcards, locals } = exportsOf(file);
  if (locals.has(name) || named.has(name)) return true;
  return wildcards.some((spec) => {
    const target = resolveSpec(file, spec);
    return target ? provides(target, name, seen) : false;
  });
}

/** Everything a file's own content depends on: itself, then the data behind
    the relative imports it makes. Used once a name has been traced home. */
function closure(file, found) {
  if (found.has(file)) return;
  found.add(file);
  for (const spec of exportsOf(file).imports) {
    const target = resolveSpec(file, spec);
    if (target) closure(target, found);
  }
}

/** The import clauses of an Astro/TS file, as { spec, names } — names null
    meaning "all of them", for `import * as x` and default imports. */
function importClauses(text) {
  const out = [];
  for (const m of text.matchAll(/(?:^|[^.\w])import\s+([^;]*?)\s*from\s*["']([^"']+)["']/g)) {
    const clause = m[1].replace(/^type\s+/, "").trim();
    const braces = clause.match(/\{([^}]*)\}/);
    if (!braces || /^\*|^[A-Za-z0-9_$]+\s*,/.test(clause)) out.push({ spec: m[2], names: null });
    else out.push({ spec: m[2], names: braces[1].split(",").map((n) => n.trim().replace(/^type\s+/, "").split(/\s+as\s+/)[0]?.trim()).filter(Boolean) });
  }
  return out;
}

/** Files a page's *content* comes from: itself and the data it renders.

    A site can put a barrel between the page and its data — musical's pages
    import "../content", which only re-exports ./data/*, ./rules and
    ./routes. Stopping at the barrel meant editing a theatre moved nothing:
    the page claimed it had last changed in August while its photograph had
    changed that afternoon. Following the barrel wholesale is the opposite
    error, and the one this file exists to avoid — every page would then
    depend on every data file, and one new city would date-stamp all 143
    musical pages as changed.

    So the barrel is read rather than followed: each name the page imports is
    traced to the file that actually exports it, and only that file, plus the
    data behind it, counts. `cities` reaches ./data/cities; `runsInCity`
    reaches ./rules and, through it, the runs and venues it reads. Components
    and layouts stay out throughout (see isChrome), so this sharpens what
    counts as data, not what counts as a page. */
function sources(pageFile) {
  const found = new Set([pageFile]);
  let text = "";
  try { text = readFileSync(pageFile, "utf8"); } catch { return [...found]; }

  for (const { spec, names } of importClauses(text)) {
    if (spec.startsWith("@dst/content/")) {
      // A vertical's page renders that site's own slice of the feed, so its
      // date follows that file rather than the whole package.
      const kind = spec.split("/")[2];
      const candidate = path.join(REPO, "packages/content/src", kind, `${appOf(pageFile)}.ts`);
      if (existsSync(candidate)) closure(candidate, found);
      continue;
    }
    const target = resolveSpec(pageFile, spec);
    if (!target) continue;

    const { named, wildcards, locals } = exportsOf(target);
    const isBarrel = named.size > 0 || wildcards.length > 0;
    if (!isBarrel || names === null) { closure(target, found); continue; }

    for (const name of names) {
      if (locals.has(name)) { closure(target, found); continue; }
      const direct = named.get(name);
      if (direct) {
        // Traced home. If home is a types file the trace still succeeded —
        // there is simply nothing there that can date-stamp the page.
        const home = resolveSpec(target, direct);
        if (home) closure(home, found);
        continue;
      }
      let placed = false;
      for (const wild of wildcards) {
        const w = resolveSpec(target, wild);
        if (w && provides(w, name)) { closure(w, found); placed = true; }
      }
      // A name we cannot trace — a re-export of a package, most likely.
      // The barrel itself is the honest answer then.
      if (!placed) found.add(target);
    }
  }
  return [...found];
}

const appOf = (file) => path.relative(REPO, file).split(path.sep)[1];

/** Every source page that could have produced a built URL.

    Usually one. But a site can carry two dynamic routes at the same level —
    musical.today has cities at `[city].astro` and shows at `[show]/` — and
    from the built path alone there is no telling which one produced
    /chicago/. Rather than guess, return both and let the caller take the
    newest date among them: both routes render the same content file anyway,
    so the answer only differs when one of the route files itself is edited. */
function pagesFor(app, url) {
  const root = path.join(REPO, "apps", app, "src", "pages");
  const segments = url.split("/").filter(Boolean);
  if (!segments.length) {
    const home = path.join(root, "index.astro");
    return existsSync(home) ? [home] : [];
  }
  return resolvePage(root, segments);
}

const isDir = (p) => existsSync(p) && statSync(p).isDirectory();

function resolvePage(dir, [head, ...rest]) {
  if (!isDir(dir)) return [];
  const entries = readdirSync(dir, { withFileTypes: true });

  if (rest.length) {
    const dirs = [path.join(dir, head)];
    for (const e of entries) {
      if (e.isDirectory() && /^\[.+\]$/.test(e.name)) dirs.push(path.join(dir, e.name));
    }
    return dirs.flatMap((d) => resolvePage(d, rest));
  }

  // The last segment: a static page wins outright over a dynamic route.
  const exact = [path.join(dir, head, "index.astro"), path.join(dir, `${head}.astro`)]
    .filter((c) => existsSync(c) && statSync(c).isFile());
  if (exact.length) return exact;

  const dynamic = [];
  for (const e of entries) {
    if (e.isFile() && /^\[.+\]\.astro$/.test(e.name)) dynamic.push(path.join(dir, e.name));
    else if (e.isDirectory() && /^\[.+\]$/.test(e.name)) {
      const index = path.join(dir, e.name, "index.astro");
      if (existsSync(index)) dynamic.push(index);
    }
  }
  return dynamic;
}

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
  );

// Every entry in the network, by site and by the last segment of its
// address. The feeds are TypeScript; Node strips the types, which is how
// `node --test` already reads them.
const { allEvents } = await import("../packages/content/src/events/index.ts");
const { allNews } = await import("../packages/content/src/news/index.ts");
const entries = new Map();
for (const item of [...allEvents, ...allNews]) {
  if (!entries.has(item.site)) entries.set(item.site, new Map());
  const by = entries.get(item.site);
  const seen = by.get(item.slug);
  if (!seen || item.updatedAt > seen) by.set(item.slug, item.updatedAt);
}

const slugOf = (url) => url.split("/").filter(Boolean).at(-1) ?? "";

// A feed holds a whole site's entries, so its commit date moves whenever any
// one of them is touched. The entries carry their own dates now; the file
// would only add that noise back.
const isFeed = (file) =>
  /packages[\\/]content[\\/]src[\\/](events|news)[\\/]/.test(path.relative(REPO, file));

const MAIN = /<main[^>]*>([\s\S]*?)<\/main>/i;

/** The entries a group page actually lists: internal links inside its
    <main> whose last segment is an entry of this app. Links to sibling
    groups fall out by themselves, which is what stops two sections that
    link to each other from chasing each other's date. */
function listed(html, app) {
  const known = entries.get(app);
  if (!known) return [];
  const main = MAIN.exec(html);
  if (!main) return [];
  const dates = [];
  for (const [, href] of main[1].matchAll(/href="(\/[^"#?]*)"/g)) {
    const date = known.get(slugOf(href));
    if (date) dates.push(date);
  }
  return dates;
}

const newest = (dates) =>
  dates.reduce((a, b) => (Date.parse(b) > Date.parse(a) ? b : a));

const out = {};
let pages = 0;
let dated = 0;
let own = 0;
for (const [app, host] of Object.entries(HOSTS)) {
  const dist = path.join(REPO, "apps", app, "dist");
  if (!existsSync(dist)) {
    console.error(`apps/${app}/dist is missing — run "npm run build" first`);
    process.exit(1);
  }
  out[host] = {};
  for (const file of walk(dist)) {
    if (path.basename(file) !== "index.html") continue;
    const url = "/" + path.relative(dist, file).replace(/index\.html$/, "");
    // Neither is a page anyone is meant to find: a /go/ hop is a redirect
    // outwards, and /li/ is the counter on its own address. Both carry
    // noindex, both are disallowed in robots.txt and in no sitemap, and a
    // date is only ever read off a page a crawler may fetch.
    if (url.startsWith("/go/") || url === "/li/") continue;
    pages++;

    // An entry page says its own date, and nothing else has a say in it.
    const mine = entries.get(app)?.get(slugOf(url));
    if (mine) {
      out[host][url] = mine;
      dated++;
      own++;
      continue;
    }

    // A group page: the newest entry it lists, against the files that shape
    // it — its route, its copy, its vocabulary.
    const dates = listed(readFileSync(file, "utf8"), app);
    for (const source of pagesFor(app, url).flatMap(sources)) {
      if (isFeed(source)) continue;
      const date = lastCommit(source);
      if (date) dates.push(date);
    }
    if (!dates.length) continue;
    out[host][url] = newest(dates);
    dated++;
  }
}

const target = path.join(REPO, "packages/content/src/lastmod.json");
writeFileSync(target, JSON.stringify(out, null, 2) + "\n");
console.log(`${dated} of ${pages} pages dated -> packages/content/src/lastmod.json`);
console.log(`  ${own} pages dated by their own entry, ${dated - own} by what they list and what shapes them`);
for (const [host, urls] of Object.entries(out)) {
  const dates = Object.values(urls).sort();
  console.log(`  ${host.padEnd(20)} ${Object.keys(urls).length} pages, newest ${dates.at(-1)?.slice(0, 10)}`);
}
