// Where a crawler can actually get to, and how far it has to walk.
//
// These sites have no inbound links worth the name, so the internal graph is
// the whole of the crawl budget argument: a page nothing links to is a page
// only the sitemap knows about, and a page six clicks from the front door is
// one a crawler reaches last and revisits least. Both are invisible to
// seo-check.mjs, which reads pages one at a time and cannot see a shape.
//
// Reads built HTML, so it measures what shipped rather than what the routes
// intended. Run a build first.
//
//   node tools/links-graph.mjs            every site with a dist
//   node tools/links-graph.mjs musical    one site
//   node tools/links-graph.mjs --depth 4  flag anything deeper than four
//
// Exit code is always 0: this reports shape, and a shape is a judgement, not
// a failure. The one thing it will not do is guess — a site whose dist is
// missing is skipped by name rather than counted as perfect.

import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const APPS = "apps";
const args = process.argv.slice(2);
const depthFlag = args.indexOf("--depth");
const MAX_DEPTH = depthFlag === -1 ? 3 : Number(args[depthFlag + 1]);
const only = args.filter((a, i) => !a.startsWith("--") && !(depthFlag !== -1 && i === depthFlag + 1));

/** Redirect stubs are not pages. /go/ and /li/ exist to send a reader off the
    site, so counting them as orphans would bury the real ones — there are more
    of them on musical than there are shows. */
const isPage = (u) => !u.startsWith("/go/") && !u.startsWith("/li/");

/** Every .html under dir, as a list of absolute paths. */
async function htmlFiles(dir) {
  const out = [];
  async function walk(d) {
    let entries;
    try {
      entries = await readdir(d, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const p = join(d, e.name);
      if (e.isDirectory()) await walk(p);
      else if (e.name.endsWith(".html")) out.push(p);
    }
  }
  await walk(dir);
  return out;
}

/** A dist path becomes the URL it is served at: /a/b/index.html -> /a/b/. */
function urlOf(dist, file) {
  const rel = relative(dist, file).split(sep).join("/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
  return `/${rel}`;
}

/** Internal hrefs only. A protocol, a mailto, a fragment and an /go/ redirect
    are all links out of the graph — /go/ especially, because its whole job is
    to leave. */
function linksIn(html) {
  const out = new Set();
  for (const m of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)) {
    let href = m[1].trim();
    if (!href.startsWith("/")) continue;
    if (href.startsWith("//")) continue;
    if (href.startsWith("/go/") || href.startsWith("/li/")) continue;
    href = href.split("#")[0].split("?")[0];
    if (!href) continue;
    out.add(href.endsWith("/") || href.includes(".") ? href : `${href}/`);
  }
  return out;
}

async function analyse(app) {
  const dist = join(APPS, app, "dist");
  try {
    if (!(await stat(dist)).isDirectory()) return null;
  } catch {
    return null;
  }
  const files = await htmlFiles(dist);
  if (files.length === 0) return null;

  const pages = new Map(); // url -> { out:Set }
  for (const f of files) {
    const html = await readFile(f, "utf8");
    const url = urlOf(dist, f);
    if (isPage(url)) pages.set(url, { out: linksIn(html) });
  }

  // Inbound counts, self-links excluded: a page linking to itself is a
  // breadcrumb or a canonical, not a vote.
  const inbound = new Map([...pages.keys()].map((u) => [u, 0]));
  for (const [from, { out }] of pages) {
    for (const to of out) {
      if (to !== from && inbound.has(to)) inbound.set(to, inbound.get(to) + 1);
    }
  }

  // Click depth from "/" by breadth-first walk. Unreachable stays undefined,
  // which is a stronger statement than a large number.
  const depth = new Map([["/", 0]]);
  let frontier = ["/"];
  while (frontier.length) {
    const next = [];
    for (const u of frontier) {
      for (const to of pages.get(u)?.out ?? []) {
        if (pages.has(to) && !depth.has(to)) {
          depth.set(to, depth.get(u) + 1);
          next.push(to);
        }
      }
    }
    frontier = next;
  }

  const orphans = [...pages.keys()].filter((u) => u !== "/" && inbound.get(u) === 0);
  const unreachable = [...pages.keys()].filter((u) => !depth.has(u));
  const deep = [...depth.entries()].filter(([, d]) => d > MAX_DEPTH).sort((a, b) => b[1] - a[1]);
  const thin = [...pages.entries()]
    .filter(([u, { out }]) => u !== "/" && [...out].filter((t) => pages.has(t) && t !== u).length < 3)
    .map(([u]) => u);

  return { app, total: pages.size, orphans, unreachable, deep, thin, depth };
}

const apps = only.length ? only : (await readdir(APPS, { withFileTypes: true }))
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .sort();

let any = false;
for (const app of apps) {
  const r = await analyse(app);
  if (!r) {
    if (only.length) console.log(`${app.padEnd(12)} no dist — build it first`);
    continue;
  }
  any = true;
  const depths = [...r.depth.values()];
  const deepest = depths.length ? Math.max(...depths) : 0;
  console.log(
    `\n${r.app}  ${r.total} pages, deepest ${deepest} click${deepest === 1 ? "" : "s"} from the front page`,
  );
  const line = (label, list) => {
    if (list.length === 0) return;
    console.log(`  ${String(list.length).padStart(4)} ${label}`);
    for (const u of list.slice(0, 8)) console.log(`       ${u}`);
    if (list.length > 8) console.log(`       … and ${list.length - 8} more`);
  };
  line("nothing links to them", r.orphans);
  line("not reachable by clicking from the front page", r.unreachable);
  line(`more than ${MAX_DEPTH} clicks deep`, r.deep.map(([u, d]) => `${u} (${d})`));
  line("fewer than 3 internal links out", r.thin);
  if (!r.orphans.length && !r.unreachable.length && !r.deep.length && !r.thin.length) {
    console.log("       nothing to report");
  }
}
if (!any) console.log("No built sites found — run a build first.");
