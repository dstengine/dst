// tools/vercel-ignore.mjs decides, per site, whether a push needs a build.
// These run it over real commits from this repo's history, with the clock
// fixed to the day each was made, so the answers are the ones Vercel got.
//
//   node --test tests/vercel-ignore.test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { decide, HUB_READS } from "../tools/vercel-ignore.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const APPS = readdirSync(path.join(REPO, "apps")).filter((app) =>
  existsSync(path.join(REPO, "apps", app, "package.json")),
);
/** The moment a commit was made — "now", as Vercel saw it on that push. */
const madeAt = (sha) =>
  new Date(execFileSync("git", ["show", "-s", "--format=%cI", sha], { cwd: REPO, encoding: "utf8" }).trim());

/** The sites that build for a span, sorted. */
const building = (from, to, now = madeAt(to)) =>
  APPS.filter((site) => decide({ site, from, to, now }).build).sort();

test("every app with a vercel.json asks the script about itself", () => {
  for (const app of APPS) {
    const file = path.join(REPO, "apps", app, "vercel.json");
    assert.ok(existsSync(file), `apps/${app} has no vercel.json, so Vercel builds it on every push`);
    const { ignoreCommand } = JSON.parse(readFileSync(file, "utf8"));
    assert.equal(ignoreCommand, `node ../../tools/vercel-ignore.mjs ${app}`, `apps/${app}/vercel.json`);
  }
});

test("the hub's list of verticals is the one its pages round up", () => {
  for (const page of ["events.astro", "news.astro"]) {
    const source = readFileSync(path.join(REPO, "apps/dst/src/pages", page), "utf8");
    const block = source.match(/const SITE_HOSTS[^=]*=\s*\{([\s\S]*?)\};/)?.[1] ?? "";
    const keys = [...block.matchAll(/^\s*([a-z0-9]+):/gm)].map((m) => m[1]);
    assert.deepEqual(keys.sort(), [...HUB_READS].sort(), `apps/dst/src/pages/${page}`);
  }
});

test("a push to four sites builds those four, not nineteen", () => {
  // 11 Oct: tick's Figaro and Barekamutyun, cover sizes on dst, ldn, tick
  // and vien, a test file, and lastmod.json moving for tick alone.
  assert.deepEqual(building("12d079f0", "58117132"), ["dst", "ldn", "tick", "vien"]);
});

test("a change to the lead API builds the lead API alone", () => {
  assert.deepEqual(building("045caf8b^", "045caf8b"), ["api"]);
});

test("shared UI builds every site that uses it, and not the API", () => {
  assert.deepEqual(building("cbc6c087^", "cbc6c087"), APPS.filter((a) => a !== "api").sort());
});

test("a new script, a tool's own data and .gitignore build nothing", () => {
  // package.json gained a script, scripts/ga.mjs appeared.
  assert.deepEqual(building("7dc0e820^", "7dc0e820"), []);
  // .gitignore and tools/events-seen.json.
  assert.deepEqual(building("60243c74^", "60243c74"), []);
});

test("a site last built yesterday builds on the first push of the day", () => {
  const verdict = decide({ site: "cmx", from: "7dc0e820^", to: "7dc0e820", now: new Date("2026-10-12T09:00:00Z") });
  assert.equal(verdict.build, true);
  assert.match(String(verdict.why), /cut by date/);
  // The API lists nothing by date, so it waits for a change of its own.
  assert.equal(decide({ site: "api", from: "7dc0e820^", to: "7dc0e820", now: new Date("2026-10-12T09:00:00Z") }).build, false);
});

test("with nothing to compare against, it builds", () => {
  assert.equal(decide({ site: "tick", from: undefined }).build, true);
  assert.equal(decide({ site: "tick", from: "0000000000000000000000000000000000000000" }).build, true);
  assert.equal(decide({ site: "nowhere", from: "HEAD" }).build, true);
});
