// Regenerates packages/content/src/lastmod.json — when each built page's
// content last actually changed, taken from git history.
//
// Why a generated file rather than a build-time lookup: Vercel checks the
// repo out shallow, so `git log` there reports the deploy commit for every
// file and every page would claim to have changed today. lastmod is a crawl
// signal; a date that is always "now" is worse than no date at all. So the
// dates are computed here, where the full history is, and committed.
//
//   npm run build && node tools/lastmod.mjs
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
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

/** The lines one item occupies in a data file, 1-based and inclusive.

    A site's whole feed lives in one file — every sol2go event in
    packages/content/src/events/sol2go.ts — so the file's own last commit is
    the same date for all thirty pages built from it. That is how a sitemap
    ends up saying the entire site changed this afternoon, which is precisely
    the noise lastmod exists to avoid, and it is the state every .lol site
    was in.

    So the item is located by its own slug and dated by its own lines. The
    range is found in the current file; `git log -L` is what follows those
    lines back through history, including through the edits that moved them. */
function itemRange(file, slug) {
  let text = "";
  try { text = readFileSync(file, "utf8"); } catch { return null; }
  const at = text.search(new RegExp(`slug:\\s*["']${slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`));
  if (at < 0) return null;

  // Back to the brace that opens the object this slug sits in.
  let depth = 0;
  let start = -1;
  for (let i = at; i >= 0; i--) {
    const c = text[i];
    if (c === "}") depth++;
    else if (c === "{") { if (depth === 0) { start = i; break; } depth--; }
  }
  if (start < 0) return null;

  // Forward to its match, stepping over strings so a brace inside a sentence
  // does not close the object early.
  let end = -1;
  depth = 0;
  let quote = null;
  for (let i = start; i < text.length; i++) {
    const c = text[i];
    if (quote) {
      if (c === "\\") i++;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { quote = c; continue; }
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth === 0) { end = i; break; } }
  }
  if (end < 0) return null;

  const lineAt = (offset) => text.slice(0, offset).split("\n").length;
  return [lineAt(start), lineAt(end)];
}

const rangeDates = new Map();
/** Last commit that touched a range of lines in a file, as an ISO date. */
function lastCommitLines(file, from, to) {
  const key = `${file}:${from},${to}`;
  if (rangeDates.has(key)) return rangeDates.get(key);
  let date = null;
  try {
    const out = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", `-L${from},${to}:${path.relative(REPO, file)}`],
      { cwd: REPO, maxBuffer: 64 * 1024 * 1024 },
    ).toString();
    date = out.split("\n").find((l) => /^\d{4}-\d{2}-\d{2}T/.test(l.trim()))?.trim() ?? null;
  } catch {
    date = null;
  }
  rangeDates.set(key, date);
  return date;
}

/** The date a page's content last changed, from one of its source files.

    A data file that holds the item this page is built from is dated by that
    item's lines; everything else — a route, a config, a file with no entry
    for this slug — by the file. */
function dateFor(file, url) {
  const slug = url.split("/").filter(Boolean).at(-1);
  if (!slug || !file.endsWith(".ts")) return lastCommit(file);
  const range = itemRange(file, slug);
  if (!range) return lastCommit(file);
  return lastCommitLines(file, range[0], range[1]) ?? lastCommit(file);
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

/** What a built page says, with the things that are not the page removed.

    Astro's scoped-style ids change whenever a component file changes, and
    `dateModified` is this file's own previous answer read back — neither is
    the page's content, and both would make every page look edited. */
function pageHash(file) {
  try {
    const html = readFileSync(file, "utf8")
      .replace(/ ?data-astro-cid-[a-z0-9]+/g, "")
      .replace(/astro-[a-z0-9]{8,}/g, "")
      .replace(/"dateModified":"[^"]*"/g, "");
    return createHash("sha1").update(html).digest("hex").slice(0, 16);
  } catch {
    return null;
  }
}

// The dates as they stand, and what the pages looked like when they were
// written. A rename that touches every route file is a change to the source
// of all 866 pages and to the content of none of them — and the git history
// cannot tell the two apart, because in the history they are the same edit.
// The built page can: if it comes out byte for byte what it was, the page
// did not change, whatever moved underneath it. So a hash only ever holds a
// date still; it never advances one, and a chrome-only edit still moves
// nothing because the date it would fall back to is unchanged anyway.
const HASH_FILE = path.join(REPO, "packages/content/src/lastmod.hashes.json");
const readJson = (file) => {
  try { return JSON.parse(readFileSync(file, "utf8")); } catch { return null; }
};
const previous = readJson(path.join(REPO, "packages/content/src/lastmod.json")) ?? {};
const previousHashes = readJson(HASH_FILE);
// No hash file yet: there is no evidence that anything changed, so every
// date already recorded stands and this run only writes the hashes down.
const seeding = previousHashes === null;

const out = {};
const hashes = {};
let pages = 0;
let dated = 0;
let held = 0;
for (const [app, host] of Object.entries(HOSTS)) {
  const dist = path.join(REPO, "apps", app, "dist");
  if (!existsSync(dist)) {
    console.error(`apps/${app}/dist is missing — run "npm run build" first`);
    process.exit(1);
  }
  out[host] = {};
  hashes[host] = {};
  for (const file of walk(dist)) {
    if (path.basename(file) !== "index.html") continue;
    const url = "/" + path.relative(dist, file).replace(/index\.html$/, "");
    if (url.startsWith("/go/")) continue; // noindex, never in a sitemap
    pages++;
    const candidates = pagesFor(app, url);
    if (!candidates.length) continue;
    // A page built from one item is dated by that item, and by nothing else
    // that happens to sit in the same feed or the same barrel. Before this,
    // an event page counted the site's news file and its content.ts among
    // its sources — so publishing one news item moved the date of all
    // thirty event pages, and a change to a section heading moved every
    // page on the site. Route files still count: editing the template does
    // change the page. Where no data file claims the slug — the front page,
    // /about/, an index — everything counts, as before.
    const files = candidates.flatMap(sources);
    const slug = url.split("/").filter(Boolean).at(-1);
    const routes = files.filter((f) => f.endsWith(".astro"));
    const data = files.filter((f) => !f.endsWith(".astro"));
    const owning = slug ? data.filter((f) => itemRange(f, slug)) : [];
    const counted = [...routes, ...(owning.length ? owning : data)];
    const dates = counted.map((f) => dateFor(f, url)).filter(Boolean).sort();
    if (!dates.length) continue;

    const hash = pageHash(file);
    if (hash) hashes[host][url] = hash;
    const was = previous[host]?.[url];
    const wasHash = previousHashes?.[host]?.[url];
    const unchanged = was && (seeding || (hash && wasHash === hash));
    out[host][url] = unchanged ? was : dates.at(-1);
    if (unchanged && was !== dates.at(-1)) held++;
    dated++;
  }
}

const target = path.join(REPO, "packages/content/src/lastmod.json");
writeFileSync(target, JSON.stringify(out, null, 2) + "\n");
writeFileSync(HASH_FILE, JSON.stringify(hashes, null, 2) + "\n");
console.log(`${dated} of ${pages} pages dated -> packages/content/src/lastmod.json`);
if (seeding) console.log("  no hashes on record — every date already written stands");
else if (held) console.log(`  ${held} pages kept their date: the built page is unchanged`);
for (const [host, urls] of Object.entries(out)) {
  const dates = Object.values(urls).sort();
  console.log(`  ${host.padEnd(20)} ${Object.keys(urls).length} pages, newest ${dates.at(-1)?.slice(0, 10)}`);
}
