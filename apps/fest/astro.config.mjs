import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { readFileSync } from "node:fs";
import { sitemapDropNoindex, sitemapEntry, sitemapIndexLastmod } from "../../tools/sitemap.mjs";
import { stripSvgComments } from "../../tools/svg-comments.mjs";
import { legacyTrail } from "./legacy-trail.mjs";

// When each page's content last changed, generated from git history by
// tools/lastmod.mjs. Read as JSON rather than imported from @dst/content
// so this config stays plain ESM with no TypeScript in the loader path.
const lastmod = JSON.parse(
  readFileSync(new URL("../../packages/content/src/lastmod.json", import.meta.url), "utf8"),
);

// fest.one is this app alone: the hub at /, the guides, and the archive of
// the old festival site as pages of its own (legacy/pages.json). So this
// sitemap is the host's only one, named by public/robots.txt, and the old
// /sitemap.xml redirects to its index (vercel.json).
export default defineConfig({
  site: "https://fest.one",
  integrations: [
    sitemap({
      // /go/ hops: a sitemap entry would contradict their robots tag.
      filter: (page) => !page.includes("/go/"),
      // loc, lastmod, changefreq and priority: every field the protocol
      // defines for a URL. See tools/sitemap.mjs.
      serialize: sitemapEntry(lastmod),
    }),
    // Then out with every page whose built HTML says noindex — a thin
    // index decides that as it renders, where the filter above cannot look,
    // and so do the archive pages the old site kept out of search
    // (/contacts/, `noindex` in legacy/pages.json). Before the index
    // rewrite, so the index is dated by what is left.
    sitemapDropNoindex(),
    // After sitemap(), so it rewrites the index that one just wrote.
    sitemapIndexLastmod(),
    stripSvgComments(),
    // An archive page's BreadcrumbList names the trail it shows, not the
    // segments of its address (legacy-trail.mjs).
    legacyTrail(),
  ],
  output: "static",
  // A component's <script> is written where the component renders, and
  // nowhere else. By default Astro 4 hoists every script it can reach
  // through the imports into one module per page, whether or not the
  // component renders: BaseLayout imports <Analytics>, so the click tracker
  // inside it reached every page here although `analytics: false` renders
  // no <Analytics>. The archive's CSP keeps the tag off this host, and a
  // tracker with no tag to report to is code a reader downloads for
  // nothing. This is Astro 5's default; the other sites keep the hoisting
  // until the network moves to it as a whole.
  experimental: { directRenderScript: true },
});
