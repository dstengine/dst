import { defineConfig, devices } from "@playwright/test";
import { PORTS } from "./tests/servers.js";

// Tests run against the built output, so they catch what actually ships.
// Run `npm run build` first (npm test does).
export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.js",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : [["list"]],
  use: { trace: "on-first-retry" },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] }, testIgnore: "**/safari.spec.js" },
    /* One spec, one extra engine. A whole second run of the suite would cost
       more than it finds; what the second engine is here for is the geometry
       the two of them can resolve differently, and that lives in one file. */
    { name: "webkit", use: { ...devices["Desktop Safari"] }, testMatch: "**/safari.spec.js" },
  ],
  webServer: Object.entries(PORTS).map(([app, port]) => ({
    command: `npm run preview --workspace=apps/${app} -- --port ${port}`,
    url: `http://localhost:${port}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  })),
});
