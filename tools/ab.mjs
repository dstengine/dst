#!/usr/bin/env node
// Every A/B/n test in the registry, read and judged against its own rule —
// and, before a test exists, how big and how long it would have to be.
//
//   node tools/ab.mjs                      every test that is still running
//   node tools/ab.mjs --id meta-hook       one test
//   node tools/ab.mjs --all                decided and ended tests too
//   node tools/ab.mjs --json FILE          also write the snapshot
//
//   node tools/ab.mjs plan --host tick.am --paths '^/events/[^/]+/$' --lift 0.2
//   node tools/ab.mjs plan --unit visitor --host tick.am --paths '…' --goal ticket_click --lift 0.3
//   node tools/ab.mjs plan --baseline 0.02 --daily 150 --lift 0.2    your own numbers, no API
//
// A page test is read in Search Console: clicks and impressions per page,
// each page put in its arm by the hash the build used. Impressions on one
// page are not independent of each other — one page with a lucky query
// moves a whole arm — so the p-value is a permutation over pages, not the
// pooled z-test, which is printed beside it only to show how far off it
// is. The same pages' 28 days before the start give each arm a baseline,
// and the lift is also shown as a difference-in-differences against it.
//
// A visitor test is read in GA4: visitors who saw each variant
// (experience_impression, by exp_variant_string) and visitors who then did
// the goal (the goal event, whose exp parameter carries the variant). Both
// parameters must be registered as custom dimensions in the property, or
// GA4 cannot split by them; the tool says so instead of guessing.
//
// Power is the point. The network has some twenty search clicks a day, so
// most tests cannot detect the lift they were started for, and the honest
// answer is to know that before launch, not after eight weeks.
//
// Reads with the service account in ~/dst/.secrets/ga4-reader.json, the one
// tools/gsc.mjs and tools/ga-report.py use; nothing is written anywhere but
// --json's file.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { EXPERIMENTS, bucket } from "../packages/content/src/experiments.ts";

const argv = process.argv.slice(2);
const option = (name) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : undefined; };
const flag = (name) => argv.includes(name);

const ALPHA = 0.05;
const POWER = 0.8;
// The longest a test is worth running: past this, seasons and the pages
// themselves change under it, and the answer arrives after nobody needs it.
const MAX_DAYS = 56;
// DST Network and Independent sites — packages/ui/src/analytics.ts says
// which host reports where. Both are read and summed, so a host that moved
// between them keeps its history.
const GA_PROPERTIES = ["548390990", "560638741"];

const DAY = 86400_000;
const iso = (d) => new Date(d).toISOString().slice(0, 10);
const today = iso(Date.now());
const yesterday = iso(Date.now() - DAY);
const addDays = (day, n) => iso(Date.parse(day) + n * DAY);
const daysFrom = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / DAY);

// ---------------------------------------------------------------- statistics

const erfc = (x) => { const z = Math.abs(x), t = 1 / (1 + 0.5 * z);
  const r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
  return x >= 0 ? r : 2 - r; };
const normalSf = (z) => erfc(z / Math.SQRT2) / 2;
// Acklam's inverse of the normal distribution, good to 1e-9.
function normalQuantile(p) {
  const a = [-39.6968302866538, 220.946098424521, -275.928510446969, 138.357751867269, -30.6647980661472, 2.50662827745924];
  const b = [-54.4760987982241, 161.585836858041, -155.698979859887, 66.8013118877197, -13.2806815528857];
  const c = [-0.00778489400243029, -0.322396458041136, -2.40075827716184, -2.54973253934373, 4.37466414146497, 2.93816398269878];
  const d = [0.00778469570904146, 0.32246712907004, 2.445134137143, 3.75440866190742];
  const lo = 0.02425;
  if (p < lo) { const q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
  if (p > 1 - lo) return -normalQuantile(1 - p);
  const q = p - 0.5, r = q * q;
  return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}
// Two-sided z for α spread over the comparisons with the control.
const zAlpha = (comparisons) => normalQuantile(1 - ALPHA / comparisons / 2);
const zBeta = normalQuantile(POWER);

/** Two-proportion z-test, two-sided. */
function ztest(a, b) {
  if (!a.n || !b.n) return { z: 0, p: 1 };
  const p = (a.x + b.x) / (a.n + b.n);
  const se = Math.sqrt(p * (1 - p) * (1 / a.n + 1 / b.n));
  const z = se ? (b.x / b.n - a.x / a.n) / se : 0;
  return { z, p: 2 * normalSf(Math.abs(z)) };
}

/** Units per arm needed to see a relative `lift` over `base`. */
const sampleFor = (base, lift, comparisons) => {
  const p2 = base * (1 + lift);
  if (!(base > 0) || p2 >= 1) return Infinity;
  return Math.ceil((zAlpha(comparisons) + zBeta) ** 2 * (base * (1 - base) + p2 * (1 - p2)) / (p2 - base) ** 2);
};
/** The smallest relative lift `n` units per arm can see over `base`. */
const liftAt = (base, n, comparisons) =>
  base > 0 && n > 0 ? (zAlpha(comparisons) + zBeta) * Math.sqrt((2 * base * (1 - base)) / n) / base : Infinity;

/** Chi-square goodness of fit of units per arm to the weights, by the
    Wilson–Hilferty approximation — plenty for a 0.001 threshold. */
function srm(counts, weights) {
  const total = counts.reduce((s, x) => s + x, 0), w = weights.reduce((s, x) => s + x, 0);
  if (total < 100) return { p: 1 };
  const chi = counts.reduce((s, x, i) => { const e = (total * weights[i]) / w; return s + (x - e) ** 2 / e; }, 0);
  const k = counts.length - 1;
  const z = (Math.cbrt(chi / k) - (1 - 2 / (9 * k))) / Math.sqrt(2 / (9 * k));
  return { chi, p: normalSf(z) };
}

/** A seeded generator, so a permutation p-value is the same on every run. */
const mulberry32 = (seed) => () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };

/** How often a random relabelling of the same pages gives a CTR gap as
    wide as the real one: the page is the unit that was randomised. */
function permutation(units, iterations = 10000) {
  const xs = units.filter((u) => u.n > 0);
  const inB = xs.map((u) => u.b);
  const gap = (labels) => { let na = 0, xa = 0, nb = 0, xb = 0;
    labels.forEach((b, i) => { if (b) { nb += xs[i].n; xb += xs[i].x; } else { na += xs[i].n; xa += xs[i].x; } });
    return na && nb ? xb / nb - xa / na : 0; };
  const observed = Math.abs(gap(inB));
  if (!xs.length || inB.every((b) => b === inB[0])) return 1;
  const rand = mulberry32(1), labels = [...inB];
  let extreme = 0;
  for (let k = 0; k < iterations; k++) {
    for (let i = labels.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [labels[i], labels[j]] = [labels[j], labels[i]]; }
    if (Math.abs(gap(labels)) >= observed - 1e-12) extreme++;
  }
  return (extreme + 1) / (iterations + 1);
}

/** Holm's step-down adjustment of the per-variant p-values. */
function holm(ps) {
  const order = ps.map((p, i) => [p, i]).sort((a, b) => a[0] - b[0]);
  const out = new Array(ps.length);
  let running = 0;
  order.forEach(([p, i], rank) => { running = Math.max(running, Math.min(1, p * (ps.length - rank))); out[i] = running; });
  return out;
}

// ---------------------------------------------------------------- Google

async function token() {
  const file = process.env.GSC_KEY ?? path.join(os.homedir(), "dst/.secrets/ga4-reader.json");
  if (!fs.existsSync(file)) throw new Error(`no service-account key at ${file}`);
  const key = JSON.parse(fs.readFileSync(file, "utf8"));
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: key.client_email,
    scope: "https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/analytics.readonly",
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

let bearer;
async function google(url, body) {
  bearer ??= await token();
  const res = await fetch(url, {
    method: body ? "POST" : "GET",
    headers: { authorization: `Bearer ${bearer}`, "content-type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

// Search Console: one page's clicks, impressions and position in a window.
let gscProperties;
const bareHost = (h) => h.replace(/^www\./, "");
async function searchPages(host, startDate, endDate) {
  gscProperties ??= ((await google("https://www.googleapis.com/webmasters/v3/sites")).siteEntry ?? [])
    .filter((e) => e.permissionLevel !== "siteUnverifiedUser").map((e) => e.siteUrl);
  const hostOf = (p) => (p.startsWith("sc-domain:") ? p.slice(10) : new URL(p).host);
  const property = gscProperties.find((p) => hostOf(p) === host);
  if (!property) return { error: "not in Search Console for this account" };
  const r = await google(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`,
    { startDate, endDate, dataState: "all", dimensions: ["page"], rowLimit: 25000 });
  if (r.error) return { error: r.error.message };
  // A domain property also carries its subdomains' pages: dst.llc's holds
  // every vertical's. Only this host's count.
  return { rows: (r.rows ?? []).map((row) => ({ url: new URL(row.keys[0]), clicks: row.clicks, impressions: row.impressions, position: row.position }))
    .filter((row) => bareHost(row.url.host) === host) };
}

// GA4: the custom dimensions a property will report on.
const registeredCache = {};
async function registered(property) {
  registeredCache[property] ??= new Set(((await google(`https://analyticsdata.googleapis.com/v1beta/properties/${property}/metadata`)).dimensions ?? [])
    .filter((d) => d.customDefinition).map((d) => d.apiName));
  return registeredCache[property];
}
const report = (property, body) => google(`https://analyticsdata.googleapis.com/v1beta/properties/${property}:runReport`, body);
const is = (fieldName, value) => ({ filter: { fieldName, stringFilter: { matchType: "EXACT", value } } });
const regex = (fieldName, value) => ({ filter: { fieldName, stringFilter: { matchType: "PARTIAL_REGEXP", value } } });
const among = (fieldName, values) => ({ filter: { fieldName, inListFilter: { values } } });
const all = (...expressions) => ({ andGroup: { expressions } });
const metricOf = (r, i = 0) => (r.rows ?? []).reduce((s, row) => s + Number(row.metricValues[i].value), 0);

// ---------------------------------------------------------------- reading a test

// The key a page test split on: BaseLayout uses the page's address in its
// first language. tick.am is the one two-language host under a page test;
// its Armenian pages live under /am/ and share the English page's key.
const keyOf = (host, pathname) => (host === "tick.am" ? pathname.replace(/^\/am\//, "/") : pathname);

async function readPage(exp, from, to) {
  const paths = exp.paths ? new RegExp(exp.paths) : null;
  const preFrom = addDays(exp.start, -28), preTo = addDays(exp.start, -1);
  const units = new Map(), notes = [];
  for (const host of exp.hosts) {
    for (const [window, f, t] of [["test", from, to], ["pre", preFrom, preTo]]) {
      const r = await searchPages(host, f, t);
      if (r.error) { if (window === "test") notes.push(`${host}: ${r.error}`); continue; }
      for (const row of r.rows) {
        if (paths && !paths.test(row.url.pathname)) continue;
        const key = keyOf(host, row.url.pathname), id = `${host} ${key}`;
        const u = units.get(id) ?? { id, variant: bucket(exp, key), test: { n: 0, x: 0, pos: 0 }, pre: { n: 0, x: 0, pos: 0 } };
        u[window].n += row.impressions; u[window].x += row.clicks; u[window].pos += row.position * row.impressions;
        units.set(id, u);
      }
    }
  }
  const list = [...units.values()];
  const arms = exp.variants.map((v) => {
    const xs = list.filter((u) => u.variant === v);
    const sum = (w, f) => xs.reduce((s, u) => s + u[w][f], 0);
    const n = sum("test", "n"), preN = sum("pre", "n");
    return { variant: v, units: xs.filter((u) => u.test.n > 0).length, n, x: sum("test", "x"),
      position: n ? sum("test", "pos") / n : null, pre: { n: preN, x: sum("pre", "x"), position: preN ? sum("pre", "pos") / preN : null } };
  });
  const [control] = exp.variants;
  for (const arm of arms.slice(1)) {
    arm.pPermutation = permutation(list.filter((u) => u.variant === control || u.variant === arm.variant)
      .map((u) => ({ n: u.test.n, x: u.test.x, b: u.variant === arm.variant })));
  }
  const pre = arms.reduce((s, a) => ({ n: s.n + a.pre.n, x: s.x + a.pre.x }), { n: 0, x: 0 });
  return { arms, baseline: pre.n >= 200 && pre.x > 0 ? pre.x / pre.n : null, notes, pre: { from: preFrom, to: preTo } };
}

async function readVisitor(exp, from, to) {
  const needed = ["customEvent:exp_variant_string", "customEvent:exp", ...(exp.goal?.param ? [`customEvent:${exp.goal.param}`] : [])];
  const arms = exp.variants.map((v) => ({ variant: v, n: 0, x: 0, views: 0, conversions: 0 }));
  const missing = [];
  let readable = 0;
  for (const property of GA_PROPERTIES) {
    const have = await registered(property);
    const lack = needed.filter((d) => !have.has(d));
    if (lack.length) { missing.push(`property ${property} lacks ${lack.map((d) => d.slice(12)).join(", ")}`); continue; }
    readable++;
    const window = { dateRanges: [{ startDate: from, endDate: to }] };
    const hosts = among("hostName", exp.hosts);
    const seen = await report(property, { ...window,
      dimensions: [{ name: "customEvent:exp_variant_string" }], metrics: [{ name: "totalUsers" }, { name: "eventCount" }],
      dimensionFilter: all(hosts, is("eventName", "experience_impression"), regex("customEvent:exp_variant_string", `^${exp.id}:`)) });
    if (seen.error) { missing.push(`property ${property}: ${seen.error.message}`); continue; }
    for (const row of seen.rows ?? []) {
      const arm = arms.find((a) => `${exp.id}:${a.variant}` === row.dimensionValues[0].value);
      if (arm) { arm.n += Number(row.metricValues[0].value); arm.views += Number(row.metricValues[1].value); }
    }
    for (const arm of arms) {
      const filters = [hosts, is("eventName", exp.goal.event), regex("customEvent:exp", `(^| )${exp.id}:${arm.variant}( |$)`)];
      if (exp.goal.param) filters.push(regex(`customEvent:${exp.goal.param}`, exp.goal.match));
      const done = await report(property, { ...window, metrics: [{ name: "totalUsers" }, { name: "eventCount" }], dimensionFilter: all(...filters) });
      arm.x += metricOf(done, 0); arm.conversions += metricOf(done, 1);
    }
  }
  if (!readable) return { unreadable: missing };
  const [a] = arms;
  for (const arm of arms.slice(1)) arm.pZ = ztest(a, arm).p;
  return { arms, srm: srm(arms.map((x) => x.n), exp.weights ?? exp.variants.map(() => 1)), notes: missing };
}

/** The test's state against its own rule. */
function judge(exp, read, from, to) {
  const elapsed = Math.max(1, daysFrom(from, to) + 1);
  const [control, ...others] = read.arms;
  const comparisons = others.length;
  const base = read.baseline ?? (control.n && control.x ? control.x / control.n : null);
  const pRaw = others.map((a) => a.pPermutation ?? a.pZ ?? 1);
  const pAdj = holm(pRaw);
  others.forEach((a, i) => {
    a.rate = a.n ? a.x / a.n : 0;
    a.lift = control.n && control.x ? a.rate / (control.x / control.n) - 1 : null;
    a.p = pAdj[i];
    if (a.pre && control.pre?.n && a.pre.n && control.pre.x && a.pre.x && control.x && a.x) {
      a.did = (a.rate / (a.pre.x / a.pre.n)) / ((control.x / control.n) / (control.pre.x / control.pre.n)) - 1;
    }
  });
  control.rate = control.n ? control.x / control.n : 0;
  const smallest = Math.min(...read.arms.map((a) => a.n));
  const perDay = smallest / elapsed;
  const power = {
    baseline: base,
    seesNow: base ? liftAt(base, smallest, comparisons) : null,
    seesAtRule: base && exp.sample ? liftAt(base, exp.sample, comparisons) : null,
    needForLift: base && exp.lift ? sampleFor(base, exp.lift, comparisons) : null,
  };
  const reach = (n) => (perDay > 0 && Number.isFinite(n) ? addDays(to, Math.ceil(Math.max(0, n - smallest) / perDay)) : null);
  power.sampleOn = exp.sample ? reach(exp.sample) : null;
  power.liftOn = power.needForLift ? reach(power.needForLift) : null;
  power.seesByDecideBy = base && exp.decideBy ? liftAt(base, smallest + perDay * Math.max(0, daysFrom(to, exp.decideBy)), comparisons) : null;

  const warnings = [];
  if (read.srm && read.srm.p < 0.001) warnings.push(`sample ratio mismatch (p ${read.srm.p.toExponential(1)}): the split itself is broken, nothing else in this read can be trusted`);
  const busiest = Math.max(...read.arms.map((a) => a.n));
  if (busiest >= 50 && smallest === 0) warnings.push("one arm has no units at all while another has fifty: a variant is not rendering");
  for (const a of others) {
    if (a.position && control.position && Math.abs(a.position - control.position) > 1.5) {
      warnings.push(`${a.variant} sits ${Math.abs(a.position - control.position).toFixed(1)} positions ${a.position < control.position ? "higher" : "lower"} than ${control.variant}: a CTR gap at different positions is not the copy's doing`);
    }
  }
  if (power.seesAtRule && exp.lift && power.seesAtRule > exp.lift) {
    warnings.push(`the rule's ${exp.sample} per arm can only see lifts of ${pct(power.seesAtRule)} or more, not the ${pct(exp.lift)} the hypothesis is about; that needs ${fmtN(power.needForLift)} per arm`);
  }

  let status, verdict;
  const due = (exp.sample && smallest >= exp.sample) || (exp.decideBy && today >= exp.decideBy);
  if (warnings.some((w) => w.startsWith("sample ratio") || w.startsWith("one arm"))) status = "BROKEN";
  else if (!exp.sample && !exp.decideBy) status = "NO RULE";
  else if (due) status = "DUE";
  else if (exp.decideBy && power.sampleOn && power.sampleOn > exp.decideBy) status = "UNDERPOWERED";
  else status = "RUNNING";
  if (status === "DUE" || status === "NO RULE") {
    const best = others.filter((a, i) => pAdj[i] < ALPHA).sort((x, y) => (y.lift ?? 0) - (x.lift ?? 0))[0];
    if (!best) verdict = `no difference seen; at this size only lifts of ${pct(power.seesNow)} or more were visible, so "no effect" means "no large effect"`;
    else if ((best.lift ?? 0) < 0) verdict = `${control.variant} beats ${best.variant} (p ${best.p.toFixed(3)}): keep the control`;
    else if (exp.lift && best.lift < exp.lift) verdict = `${best.variant} is ahead by ${pct(best.lift)} (p ${best.p.toFixed(3)}), under the ${pct(exp.lift)} worth shipping`;
    else verdict = `${best.variant} wins: ${pct(best.lift)} (p ${best.p.toFixed(3)})`;
    if (status === "NO RULE") verdict = `no decision rule; were it read today: ${verdict}`;
  }
  return { elapsed, smallest, perDay, power, warnings, status, verdict };
}

// ---------------------------------------------------------------- printing

const pct = (x) => (!Number.isFinite(x) ? "—" : `${x >= 0 ? "+" : "−"}${(100 * Math.abs(x)).toFixed(Math.abs(x) < 0.1 ? 1 : 0)}%`);
const rate = (x) => (x === null || !Number.isFinite(x) ? "—" : `${(100 * x).toFixed(2)}%`);
const fmtN = (n) => (n === null || n === undefined ? "—" : Number.isFinite(n) ? Math.round(n).toLocaleString("en-GB") : "∞");

function print(exp, read, j, from, to) {
  const unit = exp.unit === "page" ? "impr" : "users";
  const total = exp.decideBy ? daysFrom(exp.start, exp.decideBy) : null;
  console.log(`\n# ${exp.id} · ${exp.unit} test · ${exp.hosts.length} host${exp.hosts.length > 1 ? "s" : ""} · ${from} → ${to} (day ${j.elapsed}${total ? ` of ${total}` : ""})`);
  console.log(`  rule: ${exp.lift ? `lift ≥ ${pct(exp.lift)}` : "no lift named"} · ${exp.sample ? `${fmtN(exp.sample)} ${unit}/arm` : "no sample"} · ${exp.decideBy ? `by ${exp.decideBy}` : "no date"}`);
  for (const a of read.arms) {
    const parts = [`  ${a.variant.padEnd(8)}`];
    if (exp.unit === "page") parts.push(`pages ${String(a.units).padStart(4)}`);
    parts.push(`${unit} ${fmtN(a.n).padStart(7)}`, `${exp.unit === "page" ? "clicks" : "goal"} ${fmtN(a.x).padStart(5)}`, `rate ${rate(a.n ? a.x / a.n : null).padStart(7)}`);
    if (exp.unit === "page") parts.push(`pos ${a.position ? a.position.toFixed(1) : "—"}`, `pre ${rate(a.pre.n ? a.pre.x / a.pre.n : null)}`);
    if (exp.unit === "visitor") parts.push(`views ${fmtN(a.views)}`);
    if (a !== read.arms[0]) {
      parts.push(`lift ${pct(a.lift)}`);
      if (a.did !== undefined) parts.push(`DiD ${pct(a.did)}`);
      parts.push(`p ${a.p.toFixed(3)}${exp.unit === "page" ? " (pages)" : ""}`);
      if (exp.unit === "page") parts.push(`naive p ${ztest(read.arms[0], a).p.toFixed(3)}`);
    }
    console.log(parts.join("  "));
  }
  const pw = j.power;
  console.log(`  status: ${j.status}${j.verdict ? ` — ${j.verdict}` : ""}`);
  if (j.status === "RUNNING" || j.status === "UNDERPOWERED") {
    console.log(`  pace: ${fmtN(j.smallest)} of ${fmtN(exp.sample)} ${unit} in the smaller arm, ${j.perDay.toFixed(1)}/day → sample reached ${pw.sampleOn ?? "never at this pace"}`);
  }
  console.log(`  power: baseline ${rate(pw.baseline)}${read.baseline ? " (28 days before start)" : pw.baseline ? " (control so far)" : " — unknown, no clicks yet"}` +
    ` · sees now ≥ ${pct(pw.seesNow)}` + (pw.seesByDecideBy ? ` · by ${exp.decideBy} ≥ ${pct(pw.seesByDecideBy)}` : "") +
    (exp.lift && pw.needForLift ? ` · ${pct(exp.lift)} needs ${fmtN(pw.needForLift)}/arm${pw.liftOn ? ` (≈ ${pw.liftOn})` : ""}` : ""));
  for (const w of j.warnings) console.log(`  ! ${w}`);
  for (const n of read.notes ?? []) console.log(`  · ${n}`);
}

// ---------------------------------------------------------------- plan

async function plan() {
  const lift = Number(option("--lift") ?? 0.2);
  const variants = Number(option("--variants") ?? 2);
  const comparisons = variants - 1;
  const days = Number(option("--days") ?? 28);
  let base = option("--baseline") !== undefined ? Number(option("--baseline")) : null;
  let daily = option("--daily") !== undefined ? Number(option("--daily")) : null;
  const unit = option("--unit") ?? "page";
  const hosts = (option("--host") ?? "").split(",").filter(Boolean);
  const paths = option("--paths");
  const from = addDays(today, -days), to = yesterday;
  if ((base === null || daily === null) && !hosts.length) {
    console.error("plan needs --host (and --paths) to measure, or both --baseline and --daily"); process.exit(1);
  }
  if (base === null || daily === null) {
    if (unit === "page") {
      const re = paths ? new RegExp(paths) : null;
      let n = 0, x = 0, pages = 0;
      for (const host of hosts) {
        const r = await searchPages(host, from, to);
        if (r.error) { console.error(`${host}: ${r.error}`); continue; }
        for (const row of r.rows) if (!re || re.test(row.url.pathname)) { n += row.impressions; x += row.clicks; pages++; }
      }
      console.log(`measured: ${pages} pages, ${fmtN(n)} impressions, ${fmtN(x)} clicks in Search Console, ${from} → ${to}`);
      base ??= n ? x / n : 0; daily ??= n / days;
    } else {
      const goal = option("--goal");
      if (!goal) { console.error("a visitor plan needs --goal EVENT"); process.exit(1); }
      let users = 0, done = 0;
      for (const property of GA_PROPERTIES) {
        const filters = [among("hostName", hosts), ...(paths ? [regex("pagePath", paths)] : [])];
        const window = { dateRanges: [{ startDate: from, endDate: to }] };
        const seen = await report(property, { ...window, metrics: [{ name: "totalUsers" }], dimensionFilter: all(...filters, is("eventName", "page_view")) });
        const hit = await report(property, { ...window, metrics: [{ name: "totalUsers" }], dimensionFilter: all(...filters, is("eventName", goal)) });
        if (seen.error || hit.error) { console.error(`property ${property}: ${(seen.error ?? hit.error).message}`); continue; }
        users += metricOf(seen); done += metricOf(hit);
      }
      console.log(`measured: ${fmtN(users)} visitors on those pages, ${fmtN(done)} of them did ${goal}, in GA4, ${from} → ${to}`);
      base ??= users ? done / users : 0; daily ??= users / days;
    }
  }
  const perArm = daily / variants;
  const need = sampleFor(base, lift, comparisons);
  const runDays = Number.isFinite(need) && perArm > 0 ? Math.ceil(need / perArm) : Infinity;
  console.log(`\nbaseline ${rate(base)} · ${daily.toFixed(1)} units/day → ${perArm.toFixed(1)} per arm over ${variants} variants`);
  console.log(`to see ${pct(lift)} at α ${ALPHA}, power ${POWER}: ${fmtN(need)} per arm → ${Number.isFinite(runDays) ? `${runDays} days (${addDays(today, runDays)})` : "never"}`);
  console.log(`in ${MAX_DAYS} days it would see only lifts of ${pct(liftAt(base, perArm * MAX_DAYS, comparisons))} or more`);
  console.log(runDays <= MAX_DAYS
    ? `verdict: FEASIBLE — set lift ${lift}, sample ${need}, decideBy ${addDays(today, Math.min(MAX_DAYS, runDays + 7))}`
    : "verdict: TOO SLOW — widen the pages or hosts, test a bigger contrast, pick a commoner goal, or ship the change without a test");
}

// ---------------------------------------------------------------- main

if (argv[0] === "plan") {
  await plan();
} else {
  const id = option("--id");
  const tests = EXPERIMENTS.filter((e) => (id ? e.id === id : flag("--all") || (!e.winner && !(e.end && e.end <= today))));
  if (!tests.length) { console.error(id ? `no test "${id}" in packages/content/src/experiments.ts` : "no test is running"); process.exit(1); }
  const snapshot = { fetchedAt: new Date().toISOString(), tests: [] };
  for (const exp of tests) {
    if (exp.winner || (exp.end && exp.end <= today)) {
      console.log(`\n# ${exp.id} · ${exp.winner ? `DECIDED: ${exp.winner}` : `ENDED ${exp.end}`}`);
      snapshot.tests.push({ id: exp.id, status: exp.winner ? "DECIDED" : "ENDED" }); continue;
    }
    if (exp.start > yesterday) {
      console.log(`\n# ${exp.id} · SCHEDULED: starts ${exp.start}, nothing to read before ${addDays(exp.start, 1)}`);
      snapshot.tests.push({ id: exp.id, status: "SCHEDULED" }); continue;
    }
    const from = exp.start, to = exp.end && exp.end <= yesterday ? addDays(exp.end, -1) : yesterday;
    const read = exp.unit === "page" ? await readPage(exp, from, to) : await readVisitor(exp, from, to);
    if (read.unreadable) {
      console.log(`\n# ${exp.id} · visitor test · UNREADABLE — GA4 cannot split by variant: ${read.unreadable.join("; ")}`);
      console.log("  register them under Admin → Custom definitions → Create custom dimension (scope Event), once per property; they count from that day on");
      snapshot.tests.push({ id: exp.id, status: "UNREADABLE", missing: read.unreadable }); continue;
    }
    const j = judge(exp, read, from, to);
    print(exp, read, j, from, to);
    snapshot.tests.push({ id: exp.id, unit: exp.unit, from, to, ...j, arms: read.arms, srm: read.srm, notes: read.notes });
  }
  const out = option("--json");
  if (out) {
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, JSON.stringify(snapshot, null, 1));
    console.log(`\nsnapshot → ${out}`);
  }
}
