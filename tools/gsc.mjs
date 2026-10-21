// Search Console, read as the snapshot a month's search work starts from:
// what each host is shown for, where, and whether anyone clicks.
//
//   node tools/gsc.mjs                        90 days, every property the account reads
//   node tools/gsc.mjs tick vien.lol          some hosts, by app name or by host
//   node tools/gsc.mjs --days 28              a shorter window
//   node tools/gsc.mjs --json FILE            save the rows, for the next run to compare with
//   node tools/gsc.mjs --compare FILE         what moved since that snapshot
//   node tools/gsc.mjs --from FILE            read a saved snapshot instead of asking Google
//   node tools/gsc.mjs --core FILE            refresh the generated block of the keyword core
//
// The daily digest (tools/ga-report.py) prints a handful of queries a day;
// idx-check.mjs asks whether a page can get into the index at all. This is
// the step between them: the whole quarter's queries and pages, kept as a
// file so the next snapshot can say what moved, and read into the tables
// the playbook's monthly pass works from (~/mind/ai/events/event-site-
// playbook.md, "Что показали страницы, на которые приходят из поиска"):
//
//   - striking distance: a query shown on the first two pages with no
//     clicks is a title or a summary away from traffic;
//   - a top-three position nobody clicks: the result is there and says the
//     wrong thing;
//   - pages shown and never clicked, and queries split across two pages.
//
// The snapshot is the shape ~/mind/ai/dubai/seo/queries/analyse.py read on
// 17 Oct 2026, so the saved files stay one series: { period, sites: { host:
// { types, query, page, qp, date, country, device, appearance } } }, every
// list a row of { keys, clicks, impressions, ctr, position }.
//
// The keyword core (--core) is a hand-written file: per site, the head
// keyword and the clusters it is built to win, with the reasoning. What
// this writes into it is only the standing — between <!-- gsc:start --> and
// <!-- gsc:end -->, per host, the queries with impressions and the page each
// lands on — so the judgement above the block is never overwritten.
//
// Signs in as the service account in ~/dst/.secrets/ga4-reader.json, with
// no library: the JWT is the same as idx-check.mjs's. Dates are Google's;
// the window ends yesterday and asks for `dataState: all`, so the last two
// days are the fresh, not-final figures.
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { HOSTS } from "./hosts.mjs";

// ---------------------------------------------------------------- args

const argv = process.argv.slice(2);
const option = (name) => {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : undefined;
};
const optionValues = new Set(["--days", "--json", "--compare", "--from", "--core"].map(option).filter(Boolean));
const names = argv.filter((a) => !a.startsWith("--") && !optionValues.has(a));
const DAYS = Number(option("--days") ?? 90);
const wanted = names.length ? new Set(names.map((n) => HOSTS[n] ?? n)) : null;

// ---------------------------------------------------------------- Google

async function token() {
  const file = process.env.GSC_KEY ?? path.join(os.homedir(), "dst/.secrets/ga4-reader.json");
  if (!fs.existsSync(file)) throw new Error(`no service-account key at ${file}`);
  const key = JSON.parse(fs.readFileSync(file, "utf8"));
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: key.client_email,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })}`;
  const signature = crypto.sign("RSA-SHA256", Buffer.from(unsigned), key.private_key).toString("base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${signature}` }),
  });
  const body = await res.json();
  if (!body.access_token) throw new Error(body.error_description ?? body.error ?? `token ${res.status}`);
  return { token: body.access_token, email: key.client_email };
}

const iso = (d) => d.toISOString().slice(0, 10);

async function snapshot() {
  const auth = await token();
  const api = (p, init) =>
    fetch(`https://www.googleapis.com/webmasters/v3/${p}`, {
      ...init,
      headers: { authorization: `Bearer ${auth.token}`, "content-type": "application/json" },
    }).then((r) => r.json());
  const list = await api("sites");
  const properties = (list.siteEntry ?? []).filter((e) => e.permissionLevel !== "siteUnverifiedUser").map((e) => e.siteUrl);
  const hostOf = (p) => (p.startsWith("sc-domain:") ? p.slice(10) : new URL(p).host);
  const end = new Date(Date.now() - 86400_000);
  const start = new Date(end.getTime() - (DAYS - 1) * 86400_000);
  const period = [iso(start), iso(end)];
  const out = { period, days: DAYS, fetchedAt: new Date().toISOString(), account: auth.email, sites: {} };

  const query = async (property, body) => {
    const r = await api(`sites/${encodeURIComponent(property)}/searchAnalytics/query`, {
      method: "POST",
      body: JSON.stringify({ startDate: period[0], endDate: period[1], dataState: "all", ...body }),
    });
    if (r.error) throw new Error(`${hostOf(property)}: ${r.error.message}`);
    return (r.rows ?? []).map((row) => ({ keys: row.keys ?? [], clicks: row.clicks, impressions: row.impressions, ctr: row.ctr, position: row.position }));
  };

  const targets = properties.filter((p) => !wanted || wanted.has(hostOf(p)));
  // A few hosts at a time: the API allows 1,200 calls a minute per site,
  // and the whole network is some two hundred calls.
  const queue = [...targets];
  await Promise.all(
    Array.from({ length: 4 }, async () => {
      for (let p = queue.shift(); p; p = queue.shift()) {
        const host = hostOf(p);
        const types = {};
        for (const type of ["web", "image", "video"]) {
          const [row] = await query(p, { type, rowLimit: 1 });
          if (row) types[type] = { clicks: row.clicks, impressions: row.impressions, ctr: row.ctr, position: row.position };
        }
        out.sites[host] = {
          property: p,
          types,
          page: await query(p, { dimensions: ["page"], rowLimit: 1000 }),
          qp: await query(p, { dimensions: ["query", "page"], rowLimit: 5000 }),
          query: await query(p, { dimensions: ["query"], rowLimit: 1000 }),
          date: await query(p, { dimensions: ["date"], rowLimit: 200 }),
          country: await query(p, { dimensions: ["country"], rowLimit: 50 }),
          device: await query(p, { dimensions: ["device"], rowLimit: 3 }),
          appearance: await query(p, { dimensions: ["searchAppearance"], rowLimit: 20 }),
        };
        process.stderr.write(`${host.padEnd(22)} ${String(out.sites[host].query.length).padStart(4)} queries\n`);
      }
    }),
  );
  for (const host of Object.values(HOSTS)) {
    if (wanted && !wanted.has(host)) continue;
    if (!out.sites[host]) out.sites[host] = { property: null, note: `not shared with ${auth.email}`, types: {}, page: [], qp: [], query: [], date: [], country: [], device: [], appearance: [] };
  }
  return out;
}

// ---------------------------------------------------------------- tables

const pathOf = (url, host) => url.split(host, 2)[1] ?? url;
const n = (x, w) => String(Math.round(x)).padStart(w);
const signed = (x, w) => (Math.round(x) > 0 ? `+${Math.round(x)}` : String(Math.round(x))).padStart(w);
const f1 = (x, w) => x.toFixed(1).padStart(w);
const cut = (s, w) => (s.length > w ? s.slice(0, w - 1) + "…" : s).padEnd(w);
const weekOf = (date) => {
  // ISO week, Monday first: a weekly series is what tells a rising host from a flat one.
  const d = new Date(date + "T00:00:00Z");
  const day = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - day + 3);
  const first = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  return `${d.getUTCFullYear()}-${String(1 + Math.round(((d - first) / 86400_000 - 3 + ((first.getUTCDay() + 6) % 7)) / 7)).padStart(2, "0")}`;
};

function tables(D, old) {
  const S = D.sites;
  const byShown = Object.entries(S).sort((a, b) => (b[1].types.web?.impressions ?? 0) - (a[1].types.web?.impressions ?? 0));
  const lines = [];
  lines.push(`Search Console, ${D.period[0]} to ${D.period[1]} (${D.days} days)${old ? `, compared with ${old.period[0]} to ${old.period[1]}` : ""}`);
  lines.push("");
  lines.push(`${"host".padEnd(22)}${"clicks".padStart(7)}${"impr".padStart(7)}${"ctr%".padStart(6)}${"pos".padStart(6)}${"q".padStart(5)}${"pages".padStart(6)}${"clk".padStart(5)}  image${old ? "   vs last: clicks  impr" : ""}`);
  const tot = [0, 0];
  for (const [h, d] of byShown) {
    const w = d.types.web ?? { clicks: 0, impressions: 0, position: 0 };
    const im = d.types.image ?? { clicks: 0, impressions: 0 };
    tot[0] += w.clicks;
    tot[1] += w.impressions;
    let delta = "";
    if (old?.sites[h]) {
      const ow = old.sites[h].types.web ?? { clicks: 0, impressions: 0 };
      delta = `   ${signed(w.clicks - ow.clicks, 7)}${signed(w.impressions - ow.impressions, 7)}`;
    }
    const note = d.note ? `  ${d.note}` : "";
    lines.push(
      `${h.padEnd(22)}${n(w.clicks, 7)}${n(w.impressions, 7)}${f1(w.impressions ? (100 * w.clicks) / w.impressions : 0, 6)}${f1(w.position, 6)}${n(d.query.length, 5)}${n(d.page.length, 6)}${n(d.page.filter((p) => p.clicks).length, 5)}  ${Math.round(im.impressions)}/${Math.round(im.clicks)}${delta}${note}`,
    );
  }
  lines.push(`${"network".padEnd(22)}${n(tot[0], 7)}${n(tot[1], 7)}${f1(tot[1] ? (100 * tot[0]) / tot[1] : 0, 6)}`);

  lines.push("", "WEEKLY IMPRESSIONS (ISO week), hosts with ten or more");
  const weeks = [...new Set(Object.values(S).flatMap((d) => d.date.map((r) => weekOf(r.keys[0]))))].sort();
  lines.push(`${"".padEnd(14)}${weeks.map((w) => w.slice(5).padStart(5)).join("")}`);
  for (const [h, d] of byShown) {
    const wk = {};
    for (const r of d.date) wk[weekOf(r.keys[0])] = (wk[weekOf(r.keys[0])] ?? 0) + r.impressions;
    if (Object.values(wk).reduce((a, b) => a + b, 0) >= 10) lines.push(`${cut(h, 14)}${weeks.map((w) => n(wk[w] ?? 0, 5)).join("")}`);
  }

  lines.push("", "STRIKING DISTANCE: position 3.5–20, four or more impressions, no more than one click — by impressions");
  const striking = [];
  for (const [h, d] of byShown)
    for (const r of d.qp)
      if (r.position >= 3.5 && r.position <= 20 && r.impressions >= 4 && r.clicks <= 1) striking.push({ ...r, host: h });
  for (const r of striking.sort((a, b) => b.impressions - a.impressions).slice(0, 60))
    lines.push(`${n(r.impressions, 4)} ${n(r.clicks, 3)} ${f1(r.position, 5)} ${cut(r.host.split(".")[0], 9)}${cut(r.keys[0], 46)}${pathOf(r.keys[1], r.host)}`);

  lines.push("", "TOP THREE, NO CLICKS: position under 3.5, three or more impressions");
  for (const [h, d] of byShown)
    for (const r of d.qp.filter((r) => r.position < 3.5 && !r.clicks && r.impressions >= 3).sort((a, b) => b.impressions - a.impressions))
      lines.push(`${n(r.impressions, 4)} ${f1(r.position, 5)} ${cut(h.split(".")[0], 9)}${cut(r.keys[0], 46)}${pathOf(r.keys[1], h)}`);

  lines.push("", "PAGES SHOWN, NEVER CLICKED: fifteen or more impressions");
  for (const [h, d] of byShown)
    for (const r of d.page.filter((r) => !r.clicks && r.impressions >= 15).sort((a, b) => b.impressions - a.impressions))
      lines.push(`${n(r.impressions, 4)} ${f1(r.position, 5)} ${cut(h.split(".")[0], 11)}${pathOf(r.keys[0], h)}`);

  lines.push("", "ONE QUERY, TWO PAGES: a query shown on two or more pages of a host, eight or more impressions together");
  for (const [h, d] of byShown) {
    const by = {};
    for (const r of d.qp) if (r.impressions >= 2) (by[r.keys[0]] ??= []).push(r);
    for (const [q, v] of Object.entries(by).sort((a, b) => sum(b[1]) - sum(a[1])))
      if (v.length >= 2 && sum(v) >= 8)
        lines.push(`${cut(h.split(".")[0], 9)}${cut(q, 40)} ${v.sort((a, b) => b.impressions - a.impressions).slice(0, 4).map((r) => `${pathOf(r.keys[1], h)} ${Math.round(r.impressions)}@${r.position.toFixed(1)}`).join("  ")}`);
  }

  lines.push("", "COUNTRIES, top six per host (clicks/impressions)");
  for (const [h, d] of byShown) if (d.country.length) lines.push(`${cut(h, 22)}${d.country.slice(0, 6).map((r) => `${r.keys[0]} ${Math.round(r.clicks)}/${Math.round(r.impressions)}`).join(", ")}`);
  lines.push("", "DEVICES");
  for (const [h, d] of byShown) if (d.device.length) lines.push(`${cut(h, 22)}${d.device.map((r) => `${r.keys[0].slice(0, 3).toLowerCase()} ${Math.round(r.clicks)}/${Math.round(r.impressions)}`).join(", ")}`);
  const appearance = Object.entries(S).flatMap(([h, d]) => d.appearance.map((r) => `${h} ${r.keys[0]} ${Math.round(r.clicks)}/${Math.round(r.impressions)}`));
  lines.push("", `SEARCH APPEARANCE: ${appearance.length ? appearance.join("; ") : "no rich result on any host"}`);

  if (old) {
    lines.push("", `SINCE ${old.period[1]}: queries new to the network with three or more impressions`);
    for (const [h, d] of byShown) {
      const before = new Set((old.sites[h]?.query ?? []).map((r) => r.keys[0]));
      for (const r of d.query.filter((r) => !before.has(r.keys[0]) && r.impressions >= 3).sort((a, b) => b.impressions - a.impressions).slice(0, 12))
        lines.push(`${n(r.impressions, 4)} ${n(r.clicks, 3)} ${f1(r.position, 5)} ${cut(h.split(".")[0], 9)}${r.keys[0]}`);
    }
    lines.push("", "GONE: queries that had five or more impressions and are not shown now");
    for (const [h, d] of byShown) {
      const now = new Set(d.query.map((r) => r.keys[0]));
      for (const r of (old.sites[h]?.query ?? []).filter((r) => !now.has(r.keys[0]) && r.impressions >= 5).sort((a, b) => b.impressions - a.impressions).slice(0, 8))
        lines.push(`${n(r.impressions, 4)} ${cut(h.split(".")[0], 9)}${r.keys[0]}`);
    }
    lines.push("", "MOVED: pages with five or more impressions whose position changed by three or more");
    for (const [h, d] of byShown) {
      const before = Object.fromEntries((old.sites[h]?.page ?? []).map((r) => [r.keys[0], r]));
      for (const r of d.page.filter((r) => r.impressions >= 5 && before[r.keys[0]] && Math.abs(r.position - before[r.keys[0]].position) >= 3).sort((a, b) => b.impressions - a.impressions))
        lines.push(`${n(r.impressions, 4)} ${f1(before[r.keys[0]].position, 5)} → ${f1(r.position, 5)} ${cut(h.split(".")[0], 11)}${pathOf(r.keys[0], h)}`);
    }
  }
  return lines.join("\n");
}

const sum = (rows) => rows.reduce((a, r) => a + r.impressions, 0);

// ---------------------------------------------------------------- the core's standing block

const START = "<!-- gsc:start -->";
const END = "<!-- gsc:end -->";

function standing(D, old) {
  const out = [START, `Generated by \`node tools/gsc.mjs --core\` from Search Console, ${D.period[0]} to ${D.period[1]}${old ? `; the trend is against ${old.period[0]} to ${old.period[1]}` : ""}. Edit above or below the markers, not inside them.`, ""];
  const hosts = Object.entries(D.sites).sort((a, b) => (b[1].types.web?.impressions ?? 0) - (a[1].types.web?.impressions ?? 0));
  for (const [h, d] of hosts) {
    const w = d.types.web;
    if (!w?.impressions) {
      out.push(`### ${h}`, "", d.note ? d.note : "Nothing shown in the period.", "");
      continue;
    }
    out.push(`### ${h}`, "", `${Math.round(w.clicks)} clicks from ${Math.round(w.impressions)} impressions, average position ${w.position.toFixed(1)}; ${d.query.length} queries Search Console names, ${d.page.length} pages shown.`, "");
    // One line per query: the page it lands on most, and what to make of it.
    const pages = {};
    for (const r of d.qp) if (!pages[r.keys[0]] || r.impressions > pages[r.keys[0]].impressions) pages[r.keys[0]] = r;
    const split = {};
    for (const r of d.qp) if (r.impressions >= 2) split[r.keys[0]] = (split[r.keys[0]] ?? 0) + 1;
    const before = Object.fromEntries((old?.sites[h]?.query ?? []).map((r) => [r.keys[0], r]));
    const rows = d.query.filter((r) => r.impressions >= 3).sort((a, b) => b.impressions - a.impressions).slice(0, 30);
    if (!rows.length) {
      out.push("No query with three impressions; the impressions are on queries Search Console does not disclose.", "");
      continue;
    }
    out.push("| query | lands on | pos | impr | clicks | standing |", "|---|---|---:|---:|---:|---|");
    for (const r of rows) {
      const q = r.keys[0];
      const land = pages[q] ? pathOf(pages[q].keys[1], h) : "—";
      const state = r.clicks ? "wins" : r.position < 3.5 ? "top, no clicks" : r.position <= 20 ? "striking" : "far";
      const trend = old ? (before[q] ? ` (${r.impressions - before[q].impressions >= 0 ? "+" : ""}${Math.round(r.impressions - before[q].impressions)})` : " (new)") : "";
      out.push(`| ${q.replace(/\|/g, "¦")} | ${land} | ${r.position.toFixed(1)} | ${Math.round(r.impressions)}${trend} | ${Math.round(r.clicks)} | ${state}${split[q] >= 2 ? `, ${split[q]} pages` : ""} |`);
    }
    out.push("");
  }
  out.push(END);
  return out.join("\n");
}

function writeCore(file, D, old) {
  const block = standing(D, old);
  let text = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : `# Keyword core\n\nPer site: the head keyword, the query clusters the site is built to win, and the standing below.\n\n${START}\n${END}\n`;
  // A hand-written core that has no block yet gets one at its end; a
  // broken pair (one marker, or the end before the start) is a question
  // for whoever edited the file, not something to guess at.
  const a = text.indexOf(START), b = text.indexOf(END);
  if (a < 0 && b < 0) text = text.replace(/\s*$/, "\n\n") + block + "\n";
  else if (a < 0 || b < 0 || b < a) throw new Error(`${file}: the ${START} … ${END} pair is broken`);
  else text = text.slice(0, a) + block + text.slice(b + END.length);
  fs.writeFileSync(file, text);
  console.error(`core: ${file} refreshed`);
}

// ---------------------------------------------------------------- main

const D = option("--from") ? JSON.parse(fs.readFileSync(option("--from"), "utf8")) : await snapshot();
if (option("--json") && !option("--from")) {
  fs.mkdirSync(path.dirname(option("--json")), { recursive: true });
  fs.writeFileSync(option("--json"), JSON.stringify(D, null, 1));
  console.error(`saved ${option("--json")}`);
}
const old = option("--compare") && fs.existsSync(option("--compare")) ? JSON.parse(fs.readFileSync(option("--compare"), "utf8")) : null;
console.log(tables(D, old));
if (option("--core")) writeCore(option("--core"), D, old);
