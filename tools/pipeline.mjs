// Everything that has to happen between an edit and a deploy, in the one
// order that works.
//
//   node tools/pipeline.mjs        # or: npm run pipeline
//
// Two generated things go into a build, and the order they are generated in
// decides how many builds it costs.
//
// `llms.txt` is written into `apps/<app>/public/`, and `public/` is copied
// into `dist/` by the build — so it has to exist *before* the build, not
// after. `lastmod.json` is read by every `astro.config.mjs` to date the
// sitemap, and it is computed by walking `dist/` — so it can only be written
// *after* a build, and needs a second one to take effect.
//
// Run in that order — llms, build, lastmod, build — a ship costs two builds.
// Run llms last it costs three, because a third build is then the only way to
// get the file into `dist/`. The trap is easy to fall into from a cold tree:
// `lastmod.mjs` refuses to run without `dist/`, which invites you to build
// first and leaves `llms.mjs` stranded at the end. Hence this file: the order
// is written down once and run, rather than typed out from memory each time.
//
// The second build is narrowed to the sites whose dates actually moved.
// `sitemapEntry` in tools/sitemap.mjs reads `lastmod[hostname]` and nothing
// else, so an app's output depends on its own host's slice alone: a site
// whose slice is unchanged would rebuild to exactly what it already has.
// (`changefreq` is derived from `Date.now()` as well, but the first build of
// this same run supplied that, minutes ago — skipping the second one cannot
// make it stale.)
import { execFileSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { HOSTS, appOfHost } from "./hosts.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LASTMOD = path.join(REPO, "packages/content/src/lastmod.json");

const run = (cmd, args) => execFileSync(cmd, args, { cwd: REPO, stdio: "inherit" });

const readLastmod = () =>
  existsSync(LASTMOD) ? JSON.parse(readFileSync(LASTMOD, "utf8")) : {};

// Compared key-sorted: a page added or removed reorders the slice as it is
// written, and that is a change of order, not of dates. An unnecessary
// rebuild is only slow; a skipped one would ship a stale sitemap.
const canonical = (slice = {}) =>
  JSON.stringify(Object.entries(slice).sort(([a], [b]) => (a < b ? -1 : 1)));

const started = Date.now();
const since = () => `${((Date.now() - started) / 1000).toFixed(0)}s`;

console.log("→ llms.txt, before the build that copies it");
run("node", ["tools/llms.mjs"]);

console.log(`\n→ building every app (${since()})`);
run("npm", ["run", "build"]);

console.log(`\n→ sitemap dates from git history (${since()})`);
const before = readLastmod();
run("node", ["tools/lastmod.mjs"]);
const after = readLastmod();

const changed = Object.values(HOSTS)
  .filter((host) => canonical(before[host]) !== canonical(after[host]))
  .map(appOfHost);

if (!changed.length) {
  console.log(`\n✓ no dates moved — no second build needed (${since()})`);
} else {
  console.log(`\n→ rebuilding ${changed.length} of ${Object.keys(HOSTS).length}: ${changed.join(", ")} (${since()})`);
  for (const app of changed) run("npm", ["run", "build", `--workspace=apps/${app}`]);
  console.log(`\n✓ done (${since()})`);
}
