import { defineConfig, devices } from "@playwright/test";

// The countdown script on its own: tests/countdown.spec.js writes its
// fixtures into a blank page, so no site has to be built or served, and
// playwright.config.js would start all of them. The spec runs there too,
// with the rest of the layout suite.
//
//   npx playwright test -c tests/countdown.config.js
//   COUNTDOWN_SRC=<another CountdownScript.astro> npx playwright test -c tests/countdown.config.js
export default defineConfig({
  testDir: ".",
  testMatch: "countdown.spec.js",
  reporter: [["list"]],
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
