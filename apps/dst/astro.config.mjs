import { defineConfig } from "astro/config";

// Static output by default — this is the group's own brand site, not an app.
// Deploy target: Vercel or Netlify, either works unmodified with static output.
export default defineConfig({
  site: "https://dst.llc",
  output: "static",
});
