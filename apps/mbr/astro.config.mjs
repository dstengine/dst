import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { readFileSync } from "node:fs";
import { sitemapEntry, sitemapIndexLastmod } from "../../tools/sitemap.mjs";
import { stripSvgComments } from "../../tools/svg-comments.mjs";

// When each page's content last changed, generated from git history by
// tools/lastmod.mjs. Read as JSON rather than imported from @dst/content
// so this config stays plain ESM with no TypeScript in the loader path.
const lastmod = JSON.parse(
  readFileSync(new URL("../../packages/content/src/lastmod.json", import.meta.url), "utf8"),
);

// Static output by default — this is a content/guide site, not an app.
// Deploy target: Vercel or Netlify, either works unmodified with static output.
export default defineConfig({
  site: "https://mbr.dst.llc",
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
    // Last: the comments in a hand-drawn diagram explain it to whoever
    // edits it next, and public/ is copied to dist verbatim — so without
    // this they are served to every reader of the page as well.
    stripSvgComments(),
  ],
  output: "static",
});
