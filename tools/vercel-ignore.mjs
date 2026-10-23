// Vercel's Ignored Build Step, decided per site.
//
//   apps/<site>/vercel.json   "ignoreCommand": "node ../../tools/vercel-ignore.mjs <site>"
//   by hand                   node tools/vercel-ignore.mjs tick 12d079f0 58117132
//
// Exit 0 skips the build (Vercel marks the deployment CANCELED), exit 1
// builds. Whatever this script is unsure of builds: a wasted build costs
// half a minute, a wrongly skipped one leaves a site out of date with
// nothing anywhere to say so.
//
// Why it exists. Every site's feed lives in packages/content and every app
// depends on that package, so the rule it replaces — build if the commit
// touched this app or packages/ — built every site on every push: nineteen
// builds, one at a time, for a change to one of them. This reads which files
// changed and asks whether any of them is something this site's build reads.
//
// Two holes in the old rule are closed on the way. It compared HEAD with
// HEAD^, so a push of several commits was judged by its last commit alone,
// and a push ending in a tests-only commit skipped every site. The base here
// is VERCEL_GIT_PREVIOUS_SHA, the commit of this project's last successful
// deployment, so changes add up across skipped pushes until one builds. And
// it never looked at tools/, though every astro.config imports from there.
//
// What it cannot change: Vercel counts a skipped build as a deployment
// against the Hobby allowance of 100 a day, and it still takes its turn in
// the one-at-a-time queue — for the ten-second clone rather than the
// half-minute build. Not creating the deployment at all is Vercel's own
// skipping of unaffected projects, which works from the workspace graph and
// so needs each site's data outside the package every app shares.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { HOSTS } from "./hosts.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** The verticals the hub's /events/ and /news/ round up — the keys of
    SITE_HOSTS in apps/dst/src/pages/events.astro and news.astro, which
    tests/vercel-ignore.test.js holds this list to. Their feeds are the
    hub's input as much as its own. */
export const HUB_READS = ["llc", "visas", "riviera", "mbr", "palmcentral", "eco"];

/** One site's feed: events/tick.ts, and the files it pulls in, named after
    it — events/tick-city-day.ts. index.ts is every site's. */
const FEED = /^packages\/content\/src\/(?:events|news)\/([a-z0-9]+)(?:-[^/]*)?\.ts$/;

/** Generated files keyed by host, which change whenever any site's do. */
const PER_HOST = new Set(["packages/content/src/images.json", "packages/content/src/lastmod.json"]);

/** What no build reads. Anything matching none of the rules builds. */
const INERT = [
  /^tools\//, // less the build-time modules an astro.config imports, checked first
  /^tests\//,
  /^scripts\//,
  /^packages\/[^/]+\/tests\//,
  /^\.claude\//,
  /^\.github\//,
  /^[^/]+\.md$/,
  /^\.gitignore$/,
  /^playwright\.config\.js$/,
];

function git(args, options = {}) {
  return execFileSync("git", args, {
    cwd: REPO,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
    // images.json alone is 700 KB, past the 1 MB default once it grows.
    maxBuffer: 64 * 1024 * 1024,
    ...options,
  });
}

const haveCommit = (sha) => {
  try {
    git(["cat-file", "-e", `${sha}^{commit}`]);
    return true;
  } catch {
    return false;
  }
};

/** The files under tools/ that an app's astro.config imports, and what
    those import in turn — they run inside the build. */
function buildInputs(site) {
  const inputs = new Set();
  const config = ["astro.config.mjs", "astro.config.ts"]
    .map((name) => path.join(REPO, "apps", site, name))
    .find(existsSync);
  const queue = config ? [config] : [];
  while (queue.length) {
    const file = queue.pop();
    for (const [, spec] of readFileSync(file, "utf8").matchAll(/(?:from|import\()\s*["'](\.{1,2}\/[^"']+)["']/g)) {
      const target = path.resolve(path.dirname(file), spec);
      const rel = path.relative(REPO, target).split(path.sep).join("/");
      if (rel.startsWith("tools/") && !inputs.has(rel) && existsSync(target)) {
        inputs.add(rel);
        queue.push(target);
      }
    }
  }
  return inputs;
}

/** Whether an app reads the shared packages at all; the lead API does not. */
function readsShared(site) {
  const pkg = JSON.parse(readFileSync(path.join(REPO, "apps", site, "package.json"), "utf8"));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  return "@dst/content" in deps || "@dst/ui" in deps;
}

function sliceChanged(file, hosts, from, to) {
  const slice = (sha) => {
    const all = JSON.parse(git(["show", `${sha}:${file}`]));
    return JSON.stringify(hosts.map((host) => all[host] ?? null));
  };
  return slice(from) !== slice(to);
}

/** Whether the root package.json changed in a way a build sees: a new
    script for a test is not a new dependency for a site. */
function manifestChanged(from, to) {
  const BUILD_FIELDS = ["dependencies", "devDependencies", "optionalDependencies", "overrides", "workspaces", "type", "engines", "packageManager"];
  const fields = (sha) => {
    const pkg = JSON.parse(git(["show", `${sha}:package.json`]));
    return JSON.stringify(BUILD_FIELDS.map((key) => pkg[key] ?? null));
  };
  return fields(from) !== fields(to);
}

/** Why `file` makes this site build, or null when it does not. */
function reasonToBuild(file, ctx) {
  const { site, reads, shared, inputs, from, to } = ctx;
  if (file.startsWith(`apps/${site}/`)) return "its own app";
  if (file.startsWith("apps/")) return null;
  if (file === "package-lock.json") return "the lockfile";
  if (file === "package.json") return manifestChanged(from, to) ? "the root manifest's dependencies" : null;
  if (file.startsWith("packages/")) {
    if (!shared || /^packages\/[^/]+\/tests\//.test(file)) return null;
    const feed = FEED.exec(file);
    if (feed) {
      const owner = feed[1];
      if (owner === "index") return "the feed index";
      if (!(owner in HOSTS)) return "a feed of no known site";
      return reads.includes(owner) ? `${owner}'s feed` : null;
    }
    if (PER_HOST.has(file)) {
      const hosts = reads.map((s) => HOSTS[s]).filter(Boolean);
      return sliceChanged(file, hosts, from, to) ? `its part of ${path.basename(file)}` : null;
    }
    return "shared code";
  }
  if (inputs.has(file)) return "a module its astro.config imports";
  if (INERT.some((re) => re.test(file))) return null;
  return "a file outside the known layout";
}

/** The verdict for one site between two commits: { build, why }. */
export function decide({ site, from, to = "HEAD", now = new Date() }) {
  const build = (why) => ({ build: true, why });
  if (!site || !existsSync(path.join(REPO, "apps", site, "package.json"))) {
    return build(`no app called "${site}"`);
  }
  // A CLI deployment uploads no .git, and the first deployment of a branch
  // has nothing before it: in both there is nothing to compare.
  try {
    git(["rev-parse", "--git-dir"]);
  } catch {
    return build("no git history in this upload");
  }
  if (!from) return build("no earlier deployment to compare with");
  // Vercel clones shallow, so a deployment a few dozen commits back may not
  // be in the clone; one commit of it is enough to diff against.
  if (!haveCommit(from)) {
    try {
      // A clone whose remote wants credentials fails at once instead of
      // waiting on a prompt nobody will answer.
      git(["fetch", "--quiet", "--depth=1", "origin", from], {
        timeout: 30_000,
        env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
      });
    } catch {}
  }
  if (!haveCommit(from)) return build(`the last deployed commit ${from.slice(0, 8)} is not in this clone`);

  const shared = readsShared(site);
  // Listings are cut at build time — upcomingEvents and pastEvents compare
  // with the build's own date — so a site last built on an earlier day
  // still shows yesterday's "coming up". The first push of a new day
  // rebuilds it, as every push used to. A UTC day, the same one the cut uses.
  if (shared) {
    const builtOn = new Date(Number(git(["show", "-s", "--format=%ct", from]).trim()) * 1000)
      .toISOString()
      .slice(0, 10);
    const today = now.toISOString().slice(0, 10);
    if (builtOn < today) return build(`last built from a commit of ${builtOn}, and listings are cut by date`);
  }

  // -z: paths verbatim. Without it git quotes a non-ASCII name in octal
  // escapes ("apps/fest/public/_assets/…\321\205…"), which matches no rule
  // here and so built every site for an image in one app.
  const files = git(["diff", "--name-only", "-z", "--no-renames", from, to]).split("\0").filter(Boolean);
  const ctx = {
    site,
    reads: site === "dst" ? ["dst", ...HUB_READS] : [site],
    shared,
    inputs: buildInputs(site),
    from,
    to,
  };
  const why = [];
  for (const file of files) {
    const reason = reasonToBuild(file, ctx);
    if (reason) why.push(`${file}: ${reason}`);
  }
  return { build: why.length > 0, why, files: files.length };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [site, from = process.env.VERCEL_GIT_PREVIOUS_SHA, to = process.env.VERCEL_GIT_COMMIT_SHA || "HEAD"] =
    process.argv.slice(2);
  let verdict;
  try {
    verdict = decide({ site, from, to });
  } catch (err) {
    verdict = { build: true, why: `could not decide (${String(err.message).split("\n")[0]})` };
  }
  const span = from ? `${from.slice(0, 8)}..${to.slice(0, 8)}` : to.slice(0, 8);
  if (!verdict.build) {
    console.log(`${site}: none of the ${verdict.files} files changed in ${span} is read by its build — skipping`);
  } else if (typeof verdict.why === "string") {
    console.log(`${site}: building — ${verdict.why}`);
  } else {
    console.log(`${site}: building — ${verdict.why.length} of ${verdict.files} files changed in ${span} are its own:`);
    for (const line of verdict.why.slice(0, 20)) console.log(`  ${line}`);
    if (verdict.why.length > 20) console.log(`  …and ${verdict.why.length - 20} more`);
  }
  process.exit(verdict.build ? 1 : 0);
}
