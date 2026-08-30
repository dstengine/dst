import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { readFileSync } from "node:fs";

// Same lastmod wiring as the rest of the repo: dates come from git history
// via tools/lastmod.mjs, and a page whose date we don't know goes out
// without one rather than with a guess.
const lastmod = JSON.parse(
  readFileSync(new URL("../../packages/content/src/lastmod.json", import.meta.url), "utf8"),
);

export default defineConfig({
  site: "https://ldn.lol",
  integrations: [
    sitemap({
      // /go/ hops are noindex and disallowed in robots.txt; a sitemap entry
      // would contradict both.
      filter: (page) => !page.includes("/go/"),
      serialize(item) {
        const { hostname, pathname } = new URL(item.url);
        const date = lastmod[hostname]?.[pathname];
        return date ? { ...item, lastmod: date } : item;
      },
    }),
  ],
  output: "static",
});
