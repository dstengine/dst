import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { readFileSync } from "node:fs";

// When each page's content last changed, generated from git history by
// tools/lastmod.mjs. Read as JSON rather than imported from @dst/content
// so this config stays plain ESM with no TypeScript in the loader path.
const lastmod = JSON.parse(
  readFileSync(new URL("../../packages/content/src/lastmod.json", import.meta.url), "utf8"),
);

export default defineConfig({
  site: "https://visas.dst.llc",
  integrations: [
    sitemap({
      // /go/ hops are noindex and disallowed in robots.txt; a sitemap entry
      // would contradict both.
      filter: (page) => !page.includes("/go/"),
      // Google uses lastmod to decide what is worth recrawling. Pages
      // whose date we don't know are left without one — a made-up date
      // trains the crawler to ignore the field.
      serialize(item) {
        const { hostname, pathname } = new URL(item.url);
        const date = lastmod[hostname]?.[pathname];
        return date ? { ...item, lastmod: date } : item;
      },
    }),
  ],
  output: "static",
});
