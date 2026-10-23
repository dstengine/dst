// The trail in an archive page's structured data, made the trail the page
// shows: the hub, the archive's own crumbs, the page. At the end of the
// build, over dist.
//
// BaseLayout (packages/ui) builds a page's BreadcrumbList from its address,
// one crumb a path segment. A guide's address is its trail, so that is
// right for every guide. An archive page's is not: /iron-maiden/moskva2016/
// shows Festivals > Archive > Concert > Iron Maiden in Moscow, and its
// address would name /iron-maiden/, a page this site has never served (58
// of the 109 named one; the session's ruling on card
// 2026-10-23-fest-one-new-engine makes that a defect). The records already
// hold the visible trail (legacy/pages.json, `crumbs`), so here each archive
// page's list is rebuilt from it: the layout's own first crumb (the hub) and
// last (the page, its canonical), and between them the archive's crumbs,
// every one a page of this app.
//
// Why here and not in the layout: a trail given to BaseLayout is a prop of
// packages/ui, which every site builds from, and that card leaves
// packages/ui alone. The prop is the later, cleaner fix (the card's debt
// list); this pass goes when it lands. An Astro integration rather than a
// step after the build because the app builds on Vercel on its own (see
// tools/svg-comments.mjs).
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const GRAPH = /<script type="application\/ld\+json">(\{"@context":"https:\/\/schema\.org","@graph":[\s\S]*?)<\/script>/;

export function legacyTrail() {
  return {
    name: "fest:legacy-trail",
    hooks: {
      "astro:build:done": ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        const records = JSON.parse(readFileSync(new URL("./legacy/pages.json", import.meta.url), "utf8"));
        const served = new Set(["/", ...records.map((r) => r.path)]);
        for (const record of records) {
          const file = path.join(outDir, record.path, "index.html");
          const html = readFileSync(file, "utf8");
          const json = html.match(GRAPH)?.[1];
          if (!json) throw new Error(`${record.path}: no JSON-LD graph to set the trail in`);
          const graph = JSON.parse(json);
          const list = graph["@graph"].find((n) => n["@type"] === "BreadcrumbList");
          if (!list) throw new Error(`${record.path}: no BreadcrumbList`);
          const items = list.itemListElement;
          const origin = new URL(items[0].item).origin;
          const middle = record.crumbs.map((c) => {
            if (!served.has(c.href)) throw new Error(`${record.path}: crumb ${c.href} is not a page of fest.one`);
            return { name: c.label, item: `${origin}${c.href}` };
          });
          list.itemListElement = [items[0], ...middle, items.at(-1)].map((entry, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: entry.name,
            item: entry.item,
          }));
          writeFileSync(file, html.replace(json, () => JSON.stringify(graph)));
        }
        logger.info(`${records.length} archive pages: structured trail set from the visible one`);
      },
    },
  };
}
