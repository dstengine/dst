import { defineConfig } from "astro/config";

// No sitemap yet, on purpose: every page here is noindex until there is
// something to index, and a sitemap listing pages we ask crawlers to skip
// contradicts itself. It goes in with the content, along with @dst/ui.
export default defineConfig({
  site: "https://cmx.lol",
  output: "static",
});
