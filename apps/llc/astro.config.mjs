import { defineConfig } from "astro/config";

// Static output by default — this is a content/guide site, not an app.
// Deploy target: Vercel or Netlify, either works unmodified with static output.
export default defineConfig({
  site: "https://llc.dst.example",
  output: "static",
});
