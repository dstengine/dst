import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { readFileSync } from "node:fs";
import { sitemapDropNoindex, sitemapEntry, sitemapIndexLastmod } from "../../tools/sitemap.mjs";
import { stripSvgComments } from "../../tools/svg-comments.mjs";

// Same lastmod wiring as the rest of the repo: dates come from git history
// via tools/lastmod.mjs, and a page whose date we don't know goes out
// without one rather than with a guess.
const lastmod = JSON.parse(
  readFileSync(new URL("../../packages/content/src/lastmod.json", import.meta.url), "utf8"),
);

export default defineConfig({
  site: "https://vien.lol",
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
    // Then out with every page whose built HTML says noindex — a thin
    // index decides that as it renders, where the filter above cannot look.
    // Before the index rewrite, so the index is dated by what is left.
    sitemapDropNoindex(),
    // After sitemap(), so it rewrites the index that one just wrote.
    sitemapIndexLastmod(),
    // Last: the comments in a hand-drawn diagram explain it to whoever
    // edits it next, and public/ is copied to dist verbatim — so without
    // this they are served to every reader of the page as well.
    stripSvgComments(),
  ],
  output: "static",
});
