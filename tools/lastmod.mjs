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
  ldn: "ldn.lol",
  lnd: "lnd.lol",
  cmx: "cmx.lol",
  mxo: "mxo.lol",
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
const isChrome = (file) => /(^|\/)(layouts|components|styles)\//.test(path.relative(REPO, file));

/** Files a page's *content* comes from: itself and the data it renders. */
function sources(pageFile) {
  const found = [pageFile];
  const text = readFileSync(pageFile, "utf8");
  for (const [, spec] of text.matchAll(/from\s+["']([^"']+)["']/g)) {
    if (spec.startsWith(".")) {
      const base = path.resolve(path.dirname(pageFile), spec);
      for (const candidate of [base, `${base}.ts`, path.join(base, "index.ts")]) {
        if (existsSync(candidate) && statSync(candidate).isFile() && !isChrome(candidate)) found.push(candidate);
      }
    } else if (spec.startsWith("@dst/content/")) {
      // A vertical's page renders that site's own slice of the feed, so its
      // date follows that file rather than the whole package.
      const kind = spec.split("/")[2];
      const candidate = path.join(REPO, "packages/content/src", kind, `${appOf(pageFile)}.ts`);
      if (existsSync(candidate)) found.push(candidate);
    }
  }
  return found;
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

const out = {};
let pages = 0;
let dated = 0;
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
    if (url.startsWith("/go/")) continue; // noindex, never in a sitemap
    pages++;
    const candidates = pagesFor(app, url);
    if (!candidates.length) continue;
    const dates = candidates.flatMap(sources).map(lastCommit).filter(Boolean).sort();
    if (!dates.length) continue;
    out[host][url] = dates.at(-1);
    dated++;
  }
}

const target = path.join(REPO, "packages/content/src/lastmod.json");
writeFileSync(target, JSON.stringify(out, null, 2) + "\n");
console.log(`${dated} of ${pages} pages dated -> packages/content/src/lastmod.json`);
for (const [host, urls] of Object.entries(out)) {
  const dates = Object.values(urls).sort();
  console.log(`  ${host.padEnd(20)} ${Object.keys(urls).length} pages, newest ${dates.at(-1)?.slice(0, 10)}`);
}
