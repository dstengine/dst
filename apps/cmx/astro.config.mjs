import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { readFileSync } from "node:fs";
import { sitemapEntry, sitemapIndexLastmod } from "../../tools/sitemap.mjs";

// Same lastmod wiring as the rest of the repo: dates come from git history
// via tools/lastmod.mjs, and a page whose date we don't know goes out
// without one rather than with a guess.
const lastmod = JSON.parse(
  readFileSync(new URL("../../packages/content/src/lastmod.json", import.meta.url), "utf8"),
);

export default defineConfig({
  site: "https://cmx.lol",
  integrations: [
    sitemap({
      // /go/ hops are noindex and disallowed in robots.txt; a sitemap entry
      // would contradict both. /li/ carries the LiveInternet counter and is
      // noindex for the same reason — it exists to be opened deliberately.
      filter: (page) => !page.includes("/go/") && !page.endsWith("/li/"),
      // loc, lastmod, changefreq and priority — every field the
      // protocol defines for a URL. See tools/sitemap.mjs for what
      // each one is derived from and why.
      serialize: sitemapEntry(lastmod),
    }),
    // After sitemap(), so it rewrites the index that one just wrote.
    sitemapIndexLastmod(),
  ],
  output: "static",
});
