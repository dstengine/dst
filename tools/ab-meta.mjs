#!/usr/bin/env node
// The meta-hook page test, read out of Search Console.
//
//   node tools/ab-meta.mjs                 since the test's start, every host it runs on
//   node tools/ab-meta.mjs --id meta-hook  another page test from the registry
//   node tools/ab-meta.mjs --json FILE     also write the per-page rows
//
// Every event page's clicks and impressions since the test began, each page
// put in its variant by the same hash the build used (bucket() over the
// page's key — its path in the site's first language), then the two arms
// compared: CTR, average position, and a two-proportion z-test on the
// clicks. The arms are also shown per position band, because a lift in CTR
// that comes with a better position is not the title's doing.
//
// Reads with the service account in ~/dst/.secrets/ga4-reader.json, the one
// tools/gsc.mjs uses; nothing is written to the sites.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { EXPERIMENTS, bucket } from "../packages/content/src/experiments.ts";

const argv = process.argv.slice(2);
const option = (name) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : undefined; };
const ID = option("--id") ?? "meta-hook";
const JSON_OUT = option("--json");

const exp = EXPERIMENTS.find((e) => e.id === ID && e.unit === "page");
if (!exp) { console.error(`no page test "${ID}" in packages/content/src/experiments.ts`); process.exit(1); }
const PATHS = exp.paths ? new RegExp(exp.paths) : null;

// The key a page was split on: BaseLayout uses the page's address in its
// first language. tick.am is the one two-language host; its Armenian pages
// live under /am/ and share the English page's key.
const keyOf = (host, pathname) => (host === "tick.am" ? pathname.replace(/^\/am\//, "/") : pathname);

async function token() {
  const file = process.env.GSC_KEY ?? path.join(os.homedir(), "dst/.secrets/ga4-reader.json");
  if (!fs.existsSync(file)) throw new Error(`no service-account key at ${file}`);
  const key = JSON.parse(fs.readFileSync(file, "utf8"));
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: key.client_email, scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600,
  })}`;
  const signature = crypto.sign("RSA-SHA256", Buffer.from(unsigned), key.private_key).toString("base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${signature}` }),
  });
  const body = await res.json();
  if (!body.access_token) throw new Error(body.error_description ?? body.error ?? `token ${res.status}`);
  return body.access_token;
}

const iso = (d) => d.toISOString().slice(0, 10);
const yesterday = iso(new Date(Date.now() - 86400_000));

const t = await token();
const api = (p, init) => fetch(`https://www.googleapis.com/webmasters/v3/${p}`, {
  ...init, headers: { authorization: `Bearer ${t}`, "content-type": "application/json" },
}).then((r) => r.json());
const list = await api("sites");
const properties = (list.siteEntry ?? []).filter((e) => e.permissionLevel !== "siteUnverifiedUser").map((e) => e.siteUrl);
const hostOf = (p) => (p.startsWith("sc-domain:") ? p.slice(10) : new URL(p).host);

const rows = [];
for (const host of exp.hosts) {
  const property = properties.find((p) => hostOf(p) === host);
  if (!property) { console.error(`${host}: not in Search Console for this account`); continue; }
  const r = await api(`sites/${encodeURIComponent(property)}/searchAnalytics/query`, {
    method: "POST",
    body: JSON.stringify({ startDate: exp.start, endDate: yesterday, dataState: "all", dimensions: ["page"], rowLimit: 5000 }),
  });
  if (r.error) { console.error(`${host}: ${r.error.message}`); continue; }
  for (const row of r.rows ?? []) {
    const url = new URL(row.keys[0]);
    if (PATHS && !PATHS.test(url.pathname)) continue;
    rows.push({
      host, page: url.pathname, variant: bucket(exp, keyOf(host, url.pathname)),
      clicks: row.clicks, impressions: row.impressions, position: row.position,
    });
  }
}

// ---------------------------------------------------------------- arms

const sum = (xs, f) => xs.reduce((a, x) => a + f(x), 0);
const arm = (xs) => {
  const impressions = sum(xs, (x) => x.impressions), clicks = sum(xs, (x) => x.clicks);
  const position = impressions ? sum(xs, (x) => x.position * x.impressions) / impressions : 0;
  return { pages: xs.length, impressions, clicks, ctr: impressions ? clicks / impressions : 0, position };
};
// Two-sided p-value of a two-proportion z-test on clicks per impression.
const erfc = (x) => { const z = Math.abs(x), tt = 1 / (1 + 0.5 * z);
  const r = tt * Math.exp(-z * z - 1.26551223 + tt * (1.00002368 + tt * (0.37409196 + tt * (0.09678418 + tt * (-0.18628806 + tt * (0.27886807 + tt * (-1.13520398 + tt * (1.48851587 + tt * (-0.82215223 + tt * 0.17087277)))))))));
  return x >= 0 ? r : 2 - r; };
const ztest = (a, b) => {
  if (!a.impressions || !b.impressions) return { z: 0, p: 1 };
  const p = (a.clicks + b.clicks) / (a.impressions + b.impressions);
  const se = Math.sqrt(p * (1 - p) * (1 / a.impressions + 1 / b.impressions));
  const z = se ? (b.ctr - a.ctr) / se : 0;
  return { z, p: erfc(Math.abs(z) / Math.SQRT2) };
};
const pct = (x) => `${(100 * x).toFixed(1)}%`;
const fmtArm = (name, a) => `${name.padEnd(6)} pages ${String(a.pages).padStart(4)}  impr ${String(a.impressions).padStart(6)}  clicks ${String(a.clicks).padStart(5)}  CTR ${pct(a.ctr).padStart(6)}  pos ${a.position.toFixed(1)}`;

const [control, ...others] = exp.variants;
const report = (title, xs) => {
  const a = arm(xs.filter((x) => x.variant === control));
  console.log(`\n## ${title}`);
  console.log(fmtArm(control, a));
  for (const v of others) {
    const b = arm(xs.filter((x) => x.variant === v));
    const { z, p } = ztest(a, b);
    const lift = a.ctr ? (b.ctr - a.ctr) / a.ctr : 0;
    console.log(fmtArm(v, b) + `  lift ${lift >= 0 ? "+" : ""}${pct(lift)}  z ${z.toFixed(2)}  p ${p.toFixed(3)}`);
  }
};

console.log(`# ${exp.id}: ${exp.start} → ${yesterday}, ${rows.length} event pages with impressions on ${exp.hosts.length} hosts`);
console.log(`metric: ${exp.metric}`);
report("All hosts", rows);
for (const host of exp.hosts) { const xs = rows.filter((x) => x.host === host); if (xs.length) report(host, xs); }
const bands = [["1–3", 0, 3.5], ["4–6", 3.5, 6.5], ["7–10", 6.5, 10.5], ["11+", 10.5, 1e9]];
for (const [name, lo, hi] of bands) {
  const xs = rows.filter((x) => x.position > lo && x.position <= hi);
  if (xs.length) report(`Position ${name}`, xs);
}
const need = 2000;
const minImpr = Math.min(...exp.variants.map((v) => arm(rows.filter((x) => x.variant === v)).impressions));
console.log(`\nDecision rule: ${need} impressions per arm or eight weeks from ${exp.start}; the smaller arm has ${minImpr}.`);

if (JSON_OUT) {
  fs.mkdirSync(path.dirname(JSON_OUT), { recursive: true });
  fs.writeFileSync(JSON_OUT, JSON.stringify({ id: exp.id, start: exp.start, end: yesterday, rows }, null, 1));
  console.log(`rows → ${JSON_OUT}`);
}
