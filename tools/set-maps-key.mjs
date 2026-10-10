#!/usr/bin/env node
// Puts the Google Maps Embed API key from the clipboard into every site's
// Vercel project as PUBLIC_GOOGLE_MAPS_KEY, so it never appears on screen, in
// shell history or in a chat. Copy the key in the Cloud console, then run
//
//   node tools/set-maps-key.mjs            set it everywhere
//   node tools/set-maps-key.mjs --dry-run  list the projects, change nothing
//
// The key is asked of Google first, as tick.am would ask it, so a key that is
// not enabled for the Embed API or not allowed on our domains fails here
// rather than as a grey box on every map. The clipboard is cleared after.
//
// A site picks the key up on its next build: a push for the git-linked ones,
// tools/deploy.sh for tick and tokiohotel. See packages/ui/src/maps.ts.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { homedir } from "node:os";

const NAME = "PUBLIC_GOOGLE_MAPS_KEY";
const TEAM = "team_TOdKBYxE5xmripmepZLkETjt";
const dry = process.argv.includes("--dry-run");

const fail = (why) => {
  console.error(why);
  process.exit(1);
};

const auth = JSON.parse(readFileSync(`${homedir()}/Library/Application Support/com.vercel.cli/auth.json`, "utf8"));
const vercel = async (path, init = {}) => {
  const res = await fetch(`https://api.vercel.com${path}${path.includes("?") ? "&" : "?"}teamId=${TEAM}`, {
    ...init,
    headers: { Authorization: `Bearer ${auth.token}`, "Content-Type": "application/json" },
  });
  const body = await res.json();
  if (!res.ok) fail(`Vercel ${path}: ${body.error?.message ?? res.status}${res.status === 403 ? " — run `vercel whoami` once to refresh the token" : ""}`);
  return body;
};

// Every site of the network: the projects built from apps/<site>. Not the
// API, which draws no maps.
const { projects } = await vercel("/v9/projects?limit=100");
const sites = projects.filter((p) => p.rootDirectory?.startsWith("apps/") && p.rootDirectory !== "apps/api");
if (dry) {
  console.log(`${sites.length} projects would get ${NAME}:\n  ${sites.map((p) => p.name).join(", ")}`);
  process.exit(0);
}

const key = execFileSync("pbpaste", { encoding: "utf8" }).trim();
if (!key) fail("The clipboard is empty — copy the key first.");
if (!/^AIza[0-9A-Za-z_-]{35}$/.test(key)) fail("That is not a Google API key (AIza… and 39 characters). Nothing saved; copy it again.");

const probe = await fetch(`https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(key)}&q=40.1862685,44.5151091`, {
  headers: { Referer: "https://tick.am/" },
});
if (!probe.ok) {
  const why = (await probe.text()).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 200);
  fail(`Google refused the key from tick.am (${probe.status}): ${why}\nNothing saved. Check that the Maps Embed API is enabled and tick.am is among the key's websites.`);
}

for (const p of sites) {
  await vercel(`/v10/projects/${p.id}/env?upsert=true`, {
    method: "POST",
    body: JSON.stringify({ key: NAME, value: key, type: "encrypted", target: ["production", "preview"] }),
  });
  console.log(`  ${p.name}`);
}
execFileSync("pbcopy", { input: "" });
console.log(`${NAME} set on ${sites.length} projects; the clipboard is cleared.`);
