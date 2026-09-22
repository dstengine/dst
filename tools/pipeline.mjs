// Everything that has to happen between an edit and a deploy, in the one
// order that works.
//
//   node tools/pipeline.mjs        # or: npm run pipeline
//   DST_BUILD_LANES=1 npm run pipeline   # when the machine is busy
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
import { spawn, execFileSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { HOSTS, appOfHost } from "./hosts.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LASTMOD = path.join(REPO, "packages/content/src/lastmod.json");
const ASTRO = path.join(REPO, "node_modules/astro/astro.js");

// Astro is run straight, rather than through `npm run build --workspace`:
// npm's own startup is about half a second an app, which is a fifth of what
// building one of these sites costs. Telemetry is a network POST per build
// and worth about the same again.
//
// How many at once is a memory budget, not a core count. A build peaks near
// 400 MB and this machine has 8 GB with a swap file usually most of the way
// full. Measured over all seventeen apps: 35.7s one at a time, 26.1s at two,
// 22.9s at three, 20.6s at four — then back up, 22.7s at six and 25.2s at
// eight, where a run grows the swap file by half a gigabyte and the machine
// pages instead of building. Four is the knee on eight cores; half the cores
// is the rule that got there. Set DST_BUILD_LANES to override when something
// else big is resident.
const LANES =
  Number(process.env.DST_BUILD_LANES) ||
  Math.max(1, Math.min(4, Math.floor(os.cpus().length / 2)));

/** Build these apps, at most LANES at a time.

    Output is held rather than streamed: four builds interleaving their page
    listings is unreadable, and the useful part is which app finished and
    which failed. A failed app prints everything it said, and the run stops
    at the end of the pass rather than carrying on quietly — an app whose
    build died is how `apps/musical/dist` once ended up empty, with the
    sitemap tests the only thing that noticed. */
function buildApps(apps) {
  return new Promise((resolve, reject) => {
    const queue = [...apps];
    const failed = [];
    let running = 0;
    let done = 0;

    const start = (app) => {
      running++;
      const chunks = [];
      const child = spawn(process.execPath, [ASTRO, "build"], {
        cwd: path.join(REPO, "apps", app),
        env: { ...process.env, ASTRO_TELEMETRY_DISABLED: "1" },
        stdio: ["ignore", "pipe", "pipe"],
      });
      child.stdout.on("data", (d) => chunks.push(d));
      child.stderr.on("data", (d) => chunks.push(d));
      child.on("error", (err) => {
        chunks.push(Buffer.from(String(err)));
        child.emit("exit", 1);
      });
      child.on("exit", (code) => {
        running--;
        done++;
        if (code === 0) {
          console.log(`   ${String(done).padStart(2)}/${apps.length} ${app}`);
        } else {
          failed.push(app);
          console.error(`   ${String(done).padStart(2)}/${apps.length} ${app} — FAILED`);
          console.error(Buffer.concat(chunks).toString());
        }
        pump();
      });
    };

    const pump = () => {
      while (running < LANES && queue.length) start(queue.shift());
      if (!running && !queue.length) {
        failed.length
          ? reject(new Error(`build failed: ${failed.join(", ")}`))
          : resolve();
      }
    };

    pump();
  });
}

const run = (cmd, args) => execFileSync(cmd, args, { cwd: REPO, stdio: "inherit" });

const readLastmod = () =>
  existsSync(LASTMOD) ? JSON.parse(readFileSync(LASTMOD, "utf8")) : {};

// Compared key-sorted: a page added or removed reorders the slice as it is
// written, and that is a change of order, not of dates. An unnecessary
// rebuild is only slow where a skipped one would ship a stale sitemap.
const canonical = (slice = {}) =>
  JSON.stringify(Object.entries(slice).sort(([a], [b]) => (a < b ? -1 : 1)));

const started = Date.now();
const since = () => `${((Date.now() - started) / 1000).toFixed(0)}s`;

const apps = Object.keys(HOSTS);

console.log("→ llms.txt, before the build that copies it");
run("node", ["tools/llms.mjs"]);

console.log(`\n→ building ${apps.length} apps, ${LANES} at a time`);
await buildApps(apps);

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
  console.log(`\n→ rebuilding ${changed.length} of ${apps.length}: ${changed.join(", ")} (${since()})`);
  await buildApps(changed);
  console.log(`\n✓ done (${since()})`);
}
