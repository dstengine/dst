// Which source page built a page in dist — for tools/lastmod.mjs, which
// dates a group page by the files that shape it and so has to know which
// files those are.
//
// Usually the built path says so on its own: /events/ is events.astro. It
// stops saying so where a site carries two dynamic routes at the same level.
// tick.am has `[page].astro`, short addresses for single entries
// (/devfest/), beside `[section].astro` (/halloween/, /concerts/), and the
// same pair under /am/; tea.ceo has the same pair. /halloween/ fits both
// patterns. Counting both dated every section by the event view as well,
// and each edit to Event.astro moved all 22 of tick's section pages in the
// sitemap without one of them changing.
//
// Astro itself tells the two apart by each route's getStaticPaths, so the
// question goes to the same place: each route's getStaticPaths is run here,
// in Node, and the route whose paths include the page is the one that built
// it. Where that cannot be decided — a getStaticPaths that does not run
// outside Vite, a page no route lists — every route at that level stays in,
// as before: a date a little too new is the old fault, a date from the wrong
// file would be a new one.
import { registerHooks } from "node:module";
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// The query that marks a route file loaded for its getStaticPaths alone.
const STATIC_PATHS = "?static-paths";

registerHooks({
  // A site's own TypeScript imports its neighbours without an extension —
  // `from "./data/runs"`, `from "./site.config"` — which Vite resolves and
  // Node does not. Only relative specifiers that fail as written are
  // retried with ".ts". Both src/dated.ts and a route's getStaticPaths are
  // loaded that way.
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (err) {
      if (!specifier.startsWith(".") || /\.(ts|m?js|json)$/.test(specifier)) throw err;
      return nextResolve(`${specifier}.ts`, context);
    }
  },
  // A route file is Astro, not TypeScript, but what getStaticPaths can see
  // is TypeScript: Astro hoists it out of the page and it has no scope but
  // the imports. So that is the module served here — the imports, less
  // components and stylesheets, and the function itself. It is cut off at
  // the first `}` that opens a line, the way every route here closes it; a
  // route written otherwise fails to load and keeps the old answer. The
  // URL keeps the route's own path, so its relative imports resolve from
  // where the page sits.
  load(url, context, nextLoad) {
    if (!url.endsWith(STATIC_PATHS)) return nextLoad(url, context);
    const text = readFileSync(fileURLToPath(url.slice(0, -STATIC_PATHS.length)), "utf8");
    const frontmatter = (/^\s*---\r?\n([\s\S]*?)\r?\n---\s*$/m.exec(text) ?? [])[1] ?? "";
    const imports = [...frontmatter.matchAll(/^import\s+(?:[^"';]*?\sfrom\s*)?["']([^"']+)["'];?/gm)]
      .filter(([, spec]) => !/\.(astro|css|scss|sass|less|svg|png|jpe?g|gif|webp|avif|mdx?)(\?|$)/i.test(spec))
      .map(([statement]) => statement);
    const start = frontmatter.search(/^export\s+(?:async\s+)?function\s+getStaticPaths\b/m);
    const end = frontmatter.slice(start).search(/^\}/m);
    const fn = start < 0 || end < 0 ? "" : frontmatter.slice(start, start + end + 1);
    return { format: "module-typescript", source: [...imports, fn].join("\n"), shortCircuit: true };
  },
});

const isDir = (p) => existsSync(p) && statSync(p).isDirectory();

/** Every source page whose pattern fits the path, static over dynamic. */
function resolvePage(dir, [head, ...rest]) {
  if (!isDir(dir)) return [];
  const entries = readdirSync(dir, { withFileTypes: true });

  if (rest.length) {
    // A static directory wins over a dynamic one, as it does in Astro's own
    // routing: musical.today's /venue/<slug>/ is venue/[slug].astro and
    // never [show]/[slug].astro, which would also match it. Counting both
    // dated 58 theatre pages by the show route's copy.
    const statically = resolvePage(path.join(dir, head), rest);
    if (statically.length) return statically;
    const dirs = [];
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

/** Routes whose getStaticPaths did not run here, with the reason. */
export const unread = new Map();

const built = new Map();
/** The paths a dynamic route builds, as built URLs; null when its
    getStaticPaths cannot be run here. */
async function pathsOf(root, page) {
  if (built.has(page)) return built.get(page);
  let urls = null;
  try {
    const { getStaticPaths } = await import(pathToFileURL(page).href + STATIC_PATHS);
    if (typeof getStaticPaths !== "function") throw new Error("no getStaticPaths");
    const list = await getStaticPaths({});
    if (!Array.isArray(list)) throw new Error("getStaticPaths returned no list");
    // `[section].astro` with { section: "wine" } is /wine/; a rest
    // parameter may hold several segments, or none.
    const pattern = path.relative(root, page).replace(/\.astro$/, "").split(path.sep).filter((s) => s !== "index");
    urls = new Set(list.map(({ params = {} }) => {
      const parts = pattern
        .map((s) => s.replace(/\[(?:\.\.\.)?([^\]]+)\]/g, (_, name) => params[name] ?? ""))
        .join("/").split("/").filter(Boolean);
      return parts.length ? `/${parts.join("/")}/` : "/";
    }));
  } catch (err) {
    unread.set(page, err.message.split("\n")[0]);
  }
  built.set(page, urls);
  return urls;
}

/** Every source page that could have produced a built URL under `root`,
    a site's src/pages.

    Usually one, read off the path. Where two dynamic routes at the same
    level both fit it, the one whose getStaticPaths lists it; failing that,
    every one not known to build something else; failing that, all of them,
    and the caller takes the newest date among them. */
export async function pagesFor(root, url) {
  const segments = url.split("/").filter(Boolean);
  if (!segments.length) {
    const home = path.join(root, "index.astro");
    return existsSync(home) ? [home] : [];
  }
  const candidates = resolvePage(root, segments);
  if (candidates.length < 2) return candidates;
  const paths = await Promise.all(candidates.map((page) => pathsOf(root, page)));
  const builders = candidates.filter((_, i) => paths[i]?.has(url));
  if (builders.length) return builders;
  const possible = candidates.filter((_, i) => !paths[i]);
  return possible.length ? possible : candidates;
}
