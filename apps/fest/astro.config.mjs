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

// fest.one is served through the archive of the old festival site, which
// keeps /, /robots.txt and /sitemap.xml and hands every path it does not
// have to this app. So this sitemap is the second one on the host: the
// archive's robots.txt names it beside its own (BOOTSTRAP step 3), and
// nothing here may be served at a path the archive answers.
export default defineConfig({
  site: "https://fest.one",
  integrations: [
    sitemap({
      // /go/ hops are noindex, nofollow; a sitemap entry would contradict
      // them.
      filter: (page) => !page.includes("/go/"),
      // loc, lastmod, changefreq and priority: every field the protocol
      // defines for a URL. See tools/sitemap.mjs.
      serialize: sitemapEntry(lastmod),
    }),
    // After sitemap(), so it rewrites the index that one just wrote.
    sitemapIndexLastmod(),
    stripSvgComments(),
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
