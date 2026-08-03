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
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: Object.entries(PORTS).map(([app, port]) => ({
    command: `npm run preview --workspace=apps/${app} -- --port ${port}`,
    url: `http://localhost:${port}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  })),
});
