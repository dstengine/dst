import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Static output by default — this is the group's own brand site, not an app.
// Deploy target: Vercel or Netlify, either works unmodified with static output.
export default defineConfig({
  site: "https://dst.llc",
  integrations: [
    sitemap({
      // /go/ hops are noindex and disallowed in robots.txt; a sitemap entry
      // would contradict both.
      filter: (page) => !page.includes("/go/"),
    }),
  ],
  output: "static",
});
