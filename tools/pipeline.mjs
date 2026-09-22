// Everything that has to happen between an edit and a deploy, in the one
// order that works.
//
//   node tools/pipeline.mjs        # or: npm run pipeline
//   DST_BUILD_LANES=1 npm run pipeline   # when the machine is busy
//   DST_BUILD_ALL=1 npm run pipeline     # ignore what is already built
//
// Neither build is the whole network if it does not have to be. The first
// skips the sites nothing touched, against the input hashes in
// node_modules/.cache; the second skips the sites whose dates did not move.
// A run where nothing changed builds nothing at all and costs the six
// seconds lastmod.mjs spends reading git.
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
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { HOSTS, appOfHost } from "./hosts.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LASTMOD = path.join(REPO, "packages/content/src/lastmod.json");
const ASTRO = path.join(REPO, "node_modules/astro/astro.js");
const CACHE = path.join(REPO, "node_modules/.cache/dst-pipeline.json");

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

// What a site is actually built from, so a run can skip the sites nothing
// touched. Getting this wrong ships a stale page, so it is drawn from what
// the sources really read rather than from what looks likely:
//
//   - `apps/<app>/**`, `packages/ui/**` and the shared modules of
//     `packages/content/src` — the last of these is why a change to the
//     chrome or to `types.ts` rebuilds all seventeen.
//   - the site's own feed, `packages/content/src/{events,news}/<app>.ts`.
//     Every app reads its slice through `eventsBySite(siteId)` with its own
//     id and renders nothing of anyone else's.
//   - except `dst`, the hub, which is the one page in the network that
//     aggregates: `allNews`/`allEvents` filtered to `site !== "dst"`. So
//     any site's feed is also an input to `dst`.
//
// `lastmod.json` is deliberately not an input. It is rewritten every run,
// so counting it would mark all seventeen stale every time — and it is the
// second pass below, comparing host slices, that already decides who needs
// rebuilding for it.
const SKIP = new Set(["dist", "node_modules", ".astro", ".vercel", ".DS_Store"]);

const walk = (dir) =>
  existsSync(dir)
    ? readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
        SKIP.has(e.name) ? [] : e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
      )
    : [];

const feedsFor = (app) =>
  ["events", "news"].flatMap((kind) => {
    const dir = path.join(REPO, "packages/content/src", kind);
    const names = app === "dst" ? readdirSync(dir) : ["index.ts", `${app}.ts`];
    return names.map((n) => path.join(dir, n)).filter((p) => existsSync(p));
  });

const sharedContent = () => {
  const dir = path.join(REPO, "packages/content/src");
  return readdirSync(dir)
    .map((n) => path.join(dir, n))
    .filter((p) => statSync(p).isFile() && path.basename(p) !== "lastmod.json");
};

/** The build inputs of one app, split by how they are cheapest to compare.

    Source is hashed by content — 5 MB across the network, edited by hand,
    and content is the honest question. `public/` is hashed by size and
    mtime instead: it is 233 MB of generated pictures, reading all of it
    every run would cost more than the builds this saves, and it changes
    only when tools/images.mjs or tools/covers.mjs writes to it. */
function inputsOf(app) {
  const here = path.join(REPO, "apps", app);
  return {
    byContent: [
      ...walk(path.join(here, "src")),
      ...[`${here}/astro.config.mjs`, `${here}/package.json`, `${here}/llms.head.md`].filter(existsSync),
      ...walk(path.join(REPO, "packages/ui")),
      ...sharedContent(),
      ...feedsFor(app),
      path.join(REPO, "tools/sitemap.mjs"),
      path.join(REPO, "tools/svg-comments.mjs"),
      path.join(REPO, "package.json"),
    ],
    byStat: walk(path.join(here, "public")),
  };
}

function hashOf(app) {
  const { byContent, byStat } = inputsOf(app);
  const h = createHash("sha1");
  for (const f of byContent.sort()) h.update(`${path.relative(REPO, f)}\0`).update(readFileSync(f));
  for (const f of byStat.sort()) {
    const s = statSync(f);
    h.update(`${path.relative(REPO, f)}\0${s.size}\0${s.mtimeMs}`);
  }
  return h.digest("hex");
}

// An app whose dist is missing or empty is stale whatever its inputs say:
// that is the state a killed build leaves behind, and it is how
// apps/musical/dist once went out empty.
const distMissing = (app) => {
  const dist = path.join(REPO, "apps", app, "dist");
  return !existsSync(dist) || readdirSync(dist).length === 0;
};

const readCache = () => {
  try {
    return JSON.parse(readFileSync(CACHE, "utf8"));
  } catch {
    return {};
  }
};

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

// Hashed after llms.mjs, which writes into public/, and before anything
// else runs: nothing below this line touches an input.
const hashes = Object.fromEntries(apps.map((app) => [app, hashOf(app)]));
const cached = readCache();
const stale = apps.filter(
  (app) => process.env.DST_BUILD_ALL || cached[app] !== hashes[app] || distMissing(app),
);

if (!stale.length) {
  console.log(`\n→ nothing changed — no first build needed (${since()})`);
} else {
  console.log(`\n→ building ${stale.length} of ${apps.length}, ${LANES} at a time: ${stale.join(", ")}`);
  await buildApps(stale);
}

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
}

// Last, and only on success: the record of what is built says so only for
// a run that finished. A run killed between the two builds leaves some
// dist built against dates that moved afterwards, and the next run has to
// be able to see that — which it does by finding no record and building.
mkdirSync(path.dirname(CACHE), { recursive: true });
writeFileSync(CACHE, JSON.stringify(hashes, null, 2) + "\n");
console.log(`\n✓ done (${since()})`);
