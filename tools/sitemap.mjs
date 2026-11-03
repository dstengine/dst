// The sitemap fields every page carries, and the lastmod the index carries.
//
// Imported by every apps/*/astro.config.mjs, so it must stay plain ESM with
// no TypeScript in the loader path — the same reason lastmod.json is read as
// JSON rather than imported from @dst/content.
//
// It lives in tools/ rather than in a package because it runs at build time
// and never ships: Vercel builds each app from its own Root Directory out of
// the uploaded repo, so a post-build script run on this machine would not
// exist on the deploy that matters. Everything here has to happen inside the
// Astro build, which is why the index rewrite is an integration and not a
// step in package.json.
//
// On changefreq and priority: the protocol defines both
// (sitemaps.org/protocol.html) and both are hints, not instructions. Google
// has said for years that it ignores them; Bing, Yandex and the smaller
// crawlers read them. They are cheap and they are honest here — derived from
// the page's own depth and its own lastmod, never hand-assigned — so they go
// in. lastmod is the field that does the work, and the one the index was
// missing entirely.
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DAY = 24 * 60 * 60 * 1000;

/** How often this page has any business changing.
    Read off the page's own history where there is one: a page that changed
    this week is worth coming back to this week, and one untouched for a year
    is not. A page we cannot date falls back to what its position implies —
    a feed gains items, a leaf article does not. */
function changefreqFor(depth, date) {
  if (!date) return depth === 0 ? "weekly" : depth === 1 ? "weekly" : "monthly";
  const age = Date.now() - new Date(date).getTime();
  if (age <= 7 * DAY) return "daily";
  if (age <= 31 * DAY) return "weekly";
  if (age <= 365 * DAY) return "monthly";
  return "yearly";
}

/** Relative importance *within this site* — which is all the field means.
    Depth is the whole of it: the front page, then the section a reader lands
    in, then the page that answers one question. Anything finer would be a
    number we made up about our own content. */
function priorityFor(depth) {
  if (depth === 0) return 1.0;
  if (depth === 1) return 0.8;
  if (depth === 2) return 0.6;
  return 0.4;
}

/** The `serialize` for @astrojs/sitemap: pass the lastmod map, get the
    function back. Every entry leaves with loc, changefreq and priority;
    lastmod only when git actually knows one, because a made-up date trains
    the crawler to ignore the field. */
export function sitemapEntry(lastmod) {
  return (item) => {
    const { hostname, pathname } = new URL(item.url);
    const date = lastmod[hostname]?.[pathname];
    const depth = pathname.split("/").filter(Boolean).length;
    const out = { ...item, changefreq: changefreqFor(depth, date), priority: priorityFor(depth) };
    if (date) out.lastmod = date;
    return out;
  };
}

/** True when a page's own <meta name="robots"> asks not to be indexed.
    Only the head is read: that is the one place the tag counts, and a body
    is free to quote one. */
function isNoindex(html) {
  const end = html.indexOf("</head>");
  const head = end === -1 ? html : html.slice(0, end);
  for (const [tag] of head.matchAll(/<meta\s[^>]*>/gi)) {
    if (!/\bname=["']?robots\b/i.test(tag)) continue;
    const content = (tag.match(/\bcontent=["']([^"']*)["']/i) || [])[1] ?? "";
    if (/\b(noindex|none)\b/i.test(content)) return true;
  }
  return false;
}

/** The built file a sitemap <loc> stands for, or null if there is none. */
function fileOf(outDir, loc) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(loc.replace(/&amp;/g, "&")).pathname);
  } catch {
    return null;
  }
  const candidates = pathname.endsWith("/")
    ? [path.join(outDir, pathname, "index.html")]
    : path.extname(pathname)
      ? [path.join(outDir, pathname)]
      : [path.join(outDir, pathname, "index.html"), path.join(outDir, `${pathname}.html`)];
  return candidates.find((f) => existsSync(f)) ?? null;
}

/** Takes out of every sitemap-N.xml the pages whose built HTML is noindex.
    A sitemap that lists a page the page itself tells robots to skip is a
    contradiction Search Console reports, and it is the page that is right.
    @astrojs/sitemap's `filter` only ever sees a URL, while the decision is
    made inside the page as it renders — an index with fewer than three
    entries marks itself noindex as thin, and which index that is changes
    with the content, not with the config. So the page's own robots tag is
    read after the build, and it is the one rule: no list of noindex paths
    kept by hand beside it.

    A <loc> with no built file behind it is left alone; listing a page that
    was never built is a different fault, and the build test names it.
    List this integration AFTER sitemap() and BEFORE sitemapIndexLastmod(),
    so the index is dated by the pages that are left. */
export function sitemapDropNoindex() {
  return {
    name: "dst:sitemap-drop-noindex",
    hooks: {
      "astro:build:done": ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        let names;
        try {
          names = readdirSync(outDir).filter((n) => /^sitemap-\d+\.xml$/.test(n));
        } catch {
          return;
        }
        for (const name of names) {
          const file = path.join(outDir, name);
          const xml = readFileSync(file, "utf8");
          const dropped = [];
          const out = xml.replace(/<url>([\s\S]*?)<\/url>/g, (whole, body) => {
            const loc = (body.match(/<loc>([^<]+)<\/loc>/) || [])[1];
            const page = loc && fileOf(outDir, loc);
            if (!page || !isNoindex(readFileSync(page, "utf8"))) return whole;
            dropped.push(new URL(loc.replace(/&amp;/g, "&")).pathname);
            return "";
          });
          if (dropped.length) {
            writeFileSync(file, out);
            logger.info(`${name}: left out ${dropped.length} noindex page(s): ${dropped.join(" ")}`);
          }
        }
      },
    },
  };
}

/** Puts a <lastmod> on every <sitemap> in sitemap-index.xml.
    The protocol allows it there and crawlers use it to decide whether a
    child sitemap is worth fetching at all; without it the index says nothing
    about whether anything below it has moved, and the whole set gets
    refetched or none of it does. The value is the newest lastmod inside that
    child, which is exactly what the field means.

    @astrojs/sitemap writes the index through the `sitemap` package's
    SitemapAndIndexStream, which emits a bare <loc> per child and gives no
    way to add to it — hence a rewrite after the fact. List this integration
    AFTER sitemap() and sitemapDropNoindex(), so its astro:build:done runs
    last and dates only the pages the children still list. */
export function sitemapIndexLastmod() {
  return {
    name: "dst:sitemap-index-lastmod",
    hooks: {
      "astro:build:done": ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        const indexPath = path.join(outDir, "sitemap-index.xml");
        let xml;
        try {
          xml = readFileSync(indexPath, "utf8");
        } catch {
          return; // a site with no sitemap, or none written this build
        }

        const newest = new Map();
        for (const name of readdirSync(outDir)) {
          if (!/^sitemap-\d+\.xml$/.test(name)) continue;
          const dates = [...readFileSync(path.join(outDir, name), "utf8")
            .matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]).sort();
          if (dates.length) newest.set(name, dates.at(-1));
        }

        let added = 0;
        const out = xml.replace(/<loc>([^<]+)<\/loc>/g, (whole, loc) => {
          const date = newest.get(path.basename(loc));
          if (!date) return whole;
          added++;
          return `${whole}<lastmod>${date}</lastmod>`;
        });
        if (added) {
          writeFileSync(indexPath, out);
          logger.info(`lastmod added to ${added} sitemap(s) in sitemap-index.xml`);
        }
      },
    },
  };
}
