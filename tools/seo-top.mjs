// The tops: what the network is found for, clicked on and visited — host
// by host and as a whole — against the last time this was asked.
//
//   node tools/seo-top.mjs                    snapshot and report for today
//   node tools/seo-top.mjs --days 28          a shorter window (90 by default)
//   node tools/seo-top.mjs --compare FILE     against that snapshot; the default is the newest earlier one in the folder
//   node tools/seo-top.mjs --gsc FILE         Search Console from a saved gsc.mjs snapshot, not the API
//   node tools/seo-top.mjs --from FILE        the report again from a saved top snapshot, no API at all
//   node tools/seo-top.mjs --dir DIR          where snapshots live (~/mind/ai/dubai/seo/top)
//   node tools/seo-top.mjs --lang FILE        the report's strings (DIR/ru.json; English without it)
//
// Search Console comes from tools/gsc.mjs, run as a child with --json so
// its sign-in and its tables stay in one place; this reads the file it
// writes. GA4 is read here, over REST, with the same service account and
// the same JWT as gsc.mjs and idx-check.mjs, only for the analytics
// scope — tools/ga.py and ga-report.py ask the same questions through the
// Python client, which this does not need. Every GA4 property the account
// can list is read (accountSummaries); today that is one, "DST Network",
// where a host is the hostName dimension. rss.mobi, dmnr.uk and fest.one
// have no property the account reads, and the report says so.
//
// The snapshot is { period, days, fetchedAt, gsc, ga }: gsc is gsc.mjs's
// own file, unchanged, so the first run can compare against the /seopush
// series in ~/mind/ai/dubai/seo/queries/; ga is per host — totals,
// landing pages, channels, sources, countries — plus the hosts that are
// not sites (localhost, previews), kept apart so they inflate nothing.
//
// The report is Markdown, printed and written beside the snapshot. Its
// strings come from DIR/ru.json, because the report is read in Russian
// and nothing under ~/dst is; without that file it comes out in English.
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { HOSTS } from "./hosts.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------- args

const argv = process.argv.slice(2);
const option = (name) => {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : undefined;
};
const DIR = option("--dir") ?? path.join(os.homedir(), "mind/ai/dubai/seo/top");
const QUERIES = path.join(os.homedir(), "mind/ai/dubai/seo/queries");
const TOP = 10;
// A host earns a section of its own with any of these; the rest share the quiet table.
const FULL = { clicks: 3, impressions: 50, engaged: 30 };
// A mover is a change past these; smaller ones are the window sliding.
const MOVE = { clicks: 2, impressions: 10, position: 2, positionImpressions: 10 };

// The user's properties beyond the repo, named when the account does not read them.
const BEYOND = ["rss.mobi", "dmnr.uk", "fest.one"];
// A GA4 hostName that is a site under another name: tick's address until 6 Oct 2026.
const ALIASES = { "tick.lnd.lol": "tick.am" };

const localDate = (d = new Date()) => new Date(d.getTime() - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
const SNAP = /^\d{4}-\d{2}-\d{2}\.json$/;
const snapshotsBefore = (dir, date) =>
  fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => SNAP.test(f) && f.slice(0, 10) < date).sort().map((f) => path.join(dir, f)) : [];

// ---------------------------------------------------------------- Google

async function googleToken(scope) {
  const file = process.env.GA4_KEY ?? process.env.GSC_KEY ?? path.join(os.homedir(), "dst/.secrets/ga4-reader.json");
  if (!fs.existsSync(file)) throw new Error(`no service-account key at ${file}`);
  const key = JSON.parse(fs.readFileSync(file, "utf8"));
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({ iss: key.client_email, scope, aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 })}`;
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

function searchConsole() {
  if (option("--gsc")) return JSON.parse(fs.readFileSync(option("--gsc"), "utf8"));
  const tmp = path.join(os.tmpdir(), `seo-top-gsc-${process.pid}.json`);
  const args = [path.join(HERE, "gsc.mjs"), "--json", tmp, ...(option("--days") ? ["--days", option("--days")] : [])];
  // Its tables go to stdout and are not this report; its progress stays on stderr.
  execFileSync(process.execPath, args, { stdio: ["ignore", "ignore", "inherit"] });
  const D = JSON.parse(fs.readFileSync(tmp, "utf8"));
  fs.unlinkSync(tmp);
  return D;
}

const canon = (host, known) => {
  const h = ALIASES[host] ?? host;
  const bare = h.replace(/^www\./, "");
  return known.has(bare) ? bare : h;
};

async function analytics(period, known) {
  const auth = await googleToken("https://www.googleapis.com/auth/analytics.readonly");
  const headers = { authorization: `Bearer ${auth.token}`, "content-type": "application/json" };
  const summaries = await fetch("https://analyticsadmin.googleapis.com/v1beta/accountSummaries?pageSize=200", { headers }).then((r) => r.json());
  if (summaries.error) throw new Error(`GA4 admin: ${summaries.error.message}`);
  const properties = (summaries.accountSummaries ?? []).flatMap((a) =>
    (a.propertySummaries ?? []).map((p) => ({ id: p.property.replace("properties/", ""), name: p.displayName, account: a.displayName })),
  );
  const out = { account: auth.email, period, properties, hosts: {}, other: {} };
  const rows = (r) => (r.rows ?? []).map((row) => ({ keys: row.dimensionValues.map((d) => d.value), v: row.metricValues.map((m) => Number(m.value)) }));
  const record = (host) => {
    const where = known.has(host) ? out.hosts : out.other;
    return (where[host] ??= { sessions: 0, users: 0, engaged: 0, views: 0, duration: 0, landing: {}, channels: {}, sources: {}, countries: {} });
  };
  const add = (map, key, v) => {
    const x = (map[key] ??= { sessions: 0, users: 0, engaged: 0 });
    x.sessions += v[0];
    x.users += v[1] ?? 0;
    x.engaged += v[2] ?? 0;
  };
  for (const p of properties) {
    const req = (dims, mets, limit) => ({
      dateRanges: [{ startDate: period[0], endDate: period[1] }],
      dimensions: dims.map((name) => ({ name })),
      metrics: mets.map((name) => ({ name })),
      limit,
    });
    const batch = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${p.id}:batchRunReports`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        requests: [
          req(["hostName"], ["sessions", "totalUsers", "engagedSessions", "screenPageViews", "averageSessionDuration"], 500),
          req(["hostName", "landingPage"], ["sessions", "totalUsers", "engagedSessions"], 20000),
          req(["hostName", "sessionDefaultChannelGroup"], ["sessions", "engagedSessions"], 2000),
          req(["hostName", "sessionSource", "sessionMedium"], ["sessions"], 5000),
          req(["hostName", "country"], ["sessions", "totalUsers"], 5000),
        ],
      }),
    }).then((r) => r.json());
    if (batch.error) throw new Error(`GA4 ${p.id}: ${batch.error.message}`);
    const [hosts, landing, channels, sources, countries] = batch.reports.map(rows);
    for (const r of hosts) {
      const x = record(canon(r.keys[0], known));
      x.property = p.id;
      x.sessions += r.v[0];
      x.users += r.v[1];
      x.engaged += r.v[2];
      x.views += r.v[3];
      x.duration += r.v[4] * r.v[0]; // a mean, reweighted by sessions and divided below
    }
    for (const r of landing) add(record(canon(r.keys[0], known)).landing, r.keys[1], r.v);
    for (const r of channels) add(record(canon(r.keys[0], known)).channels, r.keys[1], [r.v[0], 0, r.v[1]]);
    for (const r of sources) add(record(canon(r.keys[0], known)).sources, `${r.keys[1]} / ${r.keys[2]}`, r.v);
    for (const r of countries) add(record(canon(r.keys[0], known)).countries, r.keys[1], r.v);
    process.stderr.write(`ga4 ${p.id} ${p.name}: ${hosts.length} hosts, ${landing.length} landing pages\n`);
  }
  const list = (map, cap) =>
    Object.entries(map)
      .map(([key, v]) => ({ key, ...v }))
      .sort((a, b) => b.sessions - a.sessions || b.users - a.users)
      .slice(0, cap);
  for (const where of [out.hosts, out.other])
    for (const x of Object.values(where)) {
      x.duration = x.sessions ? x.duration / x.sessions : 0;
      x.landing = list(x.landing, 200);
      x.channels = list(x.channels, 20);
      x.sources = list(x.sources, 40);
      x.countries = list(x.countries, 30);
    }
  return out;
}

// ---------------------------------------------------------------- strings

const EN = {
  decimal: ".",
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  date: "{d} {month} {y}",
  span: "{a} to {b}",
  minutes: "{m}m {s}s",
  title: "Tops report — {date}",
  intro:
    "Search Console and GA4, {period} ({days} days){compare}. The raw data is beside this file: [`{json}`]({json}); the instrument is `npm run seo-top` (`dst_draft/tools/seo-top.mjs`), which runs `tools/gsc.mjs` for Search Console and reads GA4 over REST with the same service account.",
  compare_with: ", against the snapshot of {date} ({period})",
  compare_none: "; the first snapshot, so nothing has moved yet",
  ga_properties: "GA4 properties the account reads: {list}.",
  ga_none_for: "No GA4 data for {list}: no property in the account, or the host sends nothing to it.",
  ga_first: "GA4 has no earlier snapshot; its changes start with the next run.",
  h_network: "## Network",
  h_sites: "### Sites",
  c_site: "site",
  c_host: "host",
  c_query: "query",
  c_clicks: "clicks",
  c_impressions: "impressions",
  c_ctr: "CTR",
  c_position: "position",
  c_page: "lands on",
  c_sessions: "sessions",
  c_engaged: "engaged",
  c_users: "users",
  c_change: "since {date}: clicks / impressions / sessions",
  c_change_q: "since {date}",
  c_channel: "channel",
  c_share: "share",
  c_rate: "engaged",
  c_country: "country",
  c_source: "source / medium",
  c_best: "best query",
  network: "network",
  new: "new",
  leaders: "Leaders — by clicks: {clicks}; by impressions: {impressions}; by engaged sessions: {sessions}.",
  not_sites: "Not a site, excluded from every total: {list}.",
  h_q_clicks: "### Top {n} queries by clicks",
  h_q_impr: "### Top {n} queries by impressions",
  no_clicks: "No query with a click.",
  no_impressions: "Nothing shown in the period.",
  h_pages: "### Top {n} pages",
  pages_note: "Search Console clicks beside GA4 sessions; a dash is a page the other source does not see.",
  h_movers: "### Since {date}",
  m_clicks_up: "Clicks up",
  m_clicks_down: "Clicks down",
  m_impr_up: "Impressions up",
  m_impr_down: "Impressions down",
  m_pos_up: "Position up",
  m_pos_down: "Position down",
  m_new: "New in the top",
  m_out: "Out of the top",
  m_pages_new: "Pages new in the top",
  m_pages_out: "Pages out of the top",
  p_clicks_up: "Pages: clicks up",
  p_clicks_down: "Pages: clicks down",
  p_impr_up: "Pages: impressions up",
  p_impr_down: "Pages: impressions down",
  p_pos_up: "Pages: position up",
  p_pos_down: "Pages: position down",
  m_none: "Nothing moved past the thresholds (clicks ±{clicks}, impressions ±{impressions}, position ±{position} with {positionImpressions} impressions).",
  m_was: "was {clicks} / {impressions} at {position}",
  m_now: "now {clicks} / {impressions} at {position}",
  m_gone: "not in the data now",
  m_entered: "{clicks} / {impressions} at {position}",
  h_ga: "### What only GA4 sees",
  ga_channels: "Channels",
  ga_countries: "Countries, GA4 (sessions / users)",
  sc_countries: "Countries, Search Console (clicks / impressions)",
  ga_sources: "Referrals and social (source / medium)",
  ga_sources_none: "No referral or social session.",
  ga_engagement: "Engagement: {engaged} engaged sessions of {sessions} ({rate}), {duration} a session on average, {views} page views.",
  ga_none_host: "GA4: no data for this host.",
  host_search: "Search: {clicks} clicks from {impressions} impressions, CTR {ctr}, position {position}; {queries} queries, {pages} pages shown.{delta}",
  host_search_delta: " Since {date}: clicks {clicks}, impressions {impressions}.",
  host_ga: "GA4: {sessions} sessions, {engaged} engaged ({rate}), {users} users, {duration} a session.{delta}",
  host_ga_delta: " Since {date}: sessions {sessions}, users {users}.",
  h_quiet: "## Quiet hosts",
  quiet_note: "Under {clicks} clicks, {impressions} impressions and {engaged} engaged sessions in the period: one line each.",
  h_notes: "### Notes",
  note_bots: "Direct visits are {share} of sessions on {list}, and only {rate} of them engaged — the pattern of automated traffic, not readers (`tools/ga-report.py` leads with engaged sessions for this reason).",
  note_no_ga: "{host}: shown in search, nothing in GA4 — the tag does not report to the property.",
  note_no_impr: "{list}: not shown once in {days} days — a question for `/idx`, not for this report.",
  note_beyond: "{list}: no GA4 property in the account; their numbers are not here.",
};

const LANG = option("--lang") ?? path.join(DIR, "ru.json");
const T = fs.existsSync(LANG) ? { ...EN, ...JSON.parse(fs.readFileSync(LANG, "utf8")) } : EN;
const t = (key, vars = {}) => String(T[key] ?? EN[key] ?? key).replace(/\{(\w+)\}/g, (_, n) => (vars[n] ?? ""));

// ---------------------------------------------------------------- numbers

const THIN = " ";
const num = (x) => {
  const r = Math.round(x);
  return (r < 0 ? "−" : "") + String(Math.abs(r)).replace(/\B(?=(\d{3})+(?!\d))/g, THIN);
};
const signed = (x) => (Math.round(x) > 0 ? "+" : "") + num(x);
const f1 = (x) => x.toFixed(1).replace(".", t("decimal"));
const pct = (a, b) => (b ? f1((100 * a) / b) + "%" : "—");
const dur = (s) => t("minutes", { m: Math.floor(s / 60), s: String(Math.round(s % 60)).padStart(2, "0") });
const ruDate = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return t("date", { d, month: T.months[m - 1], y });
};
const span = ([a, b]) => {
  const [ya, ma, da] = a.split("-").map(Number);
  const [yb, mb, db] = b.split("-").map(Number);
  const one = (d, m, y) => `${d} ${T.months[m - 1]}${ya !== yb ? ` ${y}` : ""}`;
  return t("span", { a: one(da, ma, ya), b: one(db, mb, yb) });
};
const cell = (s) => String(s).replace(/\|/g, "¦").replace(/\n/g, " ");
const short = (host) => host.split(".")[0];
const pathOf = (url, host) => url.split(host, 2)[1] ?? url;
const normPath = (p) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

function table(columns, rows) {
  // columns: [label, align]; align "r" for numbers.
  const out = [`| ${columns.map(([l]) => l).join(" | ")} |`, `|${columns.map(([, a]) => (a === "r" ? "---:" : "---")).join("|")}|`];
  for (const r of rows) out.push(`| ${r.map(cell).join(" | ")} |`);
  return out;
}

// ---------------------------------------------------------------- analysis

const byClicks = (a, b) => b.clicks - a.clicks || b.impressions - a.impressions;
const byImpressions = (a, b) => b.impressions - a.impressions || b.clicks - a.clicks;

function site(host, S) {
  const sc = S.gsc.sites[host];
  const ga = S.ga?.hosts?.[host] ?? null;
  const web = sc?.types?.web ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  const lands = {};
  for (const r of sc?.qp ?? []) if (!lands[r.keys[0]] || r.impressions > lands[r.keys[0]].impressions) lands[r.keys[0]] = r;
  const queries = (sc?.query ?? []).map((r) => ({ host, query: r.keys[0], clicks: r.clicks, impressions: r.impressions, position: r.position, page: lands[r.keys[0]] ? pathOf(lands[r.keys[0]].keys[1], host) : "—" }));
  const pages = (sc?.page ?? []).map((r) => ({ host, page: pathOf(r.keys[0], host), clicks: r.clicks, impressions: r.impressions, position: r.position }));
  return { host, sc, ga, web, queries, pages, note: sc?.note };
}

const topQueries = (q) => ({
  clicks: q.filter((r) => r.clicks > 0).sort(byClicks).slice(0, TOP),
  impressions: q.filter((r) => r.impressions > 0).sort(byImpressions).slice(0, TOP),
});

function movers(now, before, key) {
  // Queries (or pages) both snapshots have, by the size of the change.
  const prev = Object.fromEntries(before.map((r) => [r[key], r]));
  const both = now.filter((r) => prev[r[key]]).map((r) => ({ ...r, prev: prev[r[key]] }));
  const pick = (f, cmp) => both.filter(f).sort(cmp).slice(0, 8);
  return {
    clicksUp: pick((r) => r.clicks - r.prev.clicks >= MOVE.clicks, (a, b) => b.clicks - b.prev.clicks - (a.clicks - a.prev.clicks)),
    clicksDown: pick((r) => r.prev.clicks - r.clicks >= MOVE.clicks, (a, b) => b.prev.clicks - b.clicks - (a.prev.clicks - a.clicks)),
    imprUp: pick((r) => r.impressions - r.prev.impressions >= MOVE.impressions, (a, b) => b.impressions - b.prev.impressions - (a.impressions - a.prev.impressions)),
    imprDown: pick((r) => r.prev.impressions - r.impressions >= MOVE.impressions, (a, b) => b.prev.impressions - b.impressions - (a.prev.impressions - a.impressions)),
    posUp: pick((r) => r.impressions >= MOVE.positionImpressions && r.prev.position - r.position >= MOVE.position, (a, b) => b.prev.position - b.position - (a.prev.position - a.position)),
    posDown: pick((r) => r.impressions >= MOVE.positionImpressions && r.position - r.prev.position >= MOVE.position, (a, b) => b.position - b.prev.position - (a.position - a.prev.position)),
  };
}

const topSet = (top) => new Set([...top.clicks, ...top.impressions].map((r) => `${r.host} ${r.query}`));

// ---------------------------------------------------------------- report

function report(S, P, jsonName) {
  const date = S.date;
  const known = Object.keys(S.gsc.sites);
  const sites = known.map((h) => site(h, S));
  const prevSites = P ? Object.fromEntries(Object.keys(P.gsc.sites).map((h) => [h, site(h, P)])) : {};
  const order = sites.sort((a, b) => byClicks(a.web, b.web) || (b.ga?.sessions ?? 0) - (a.ga?.sessions ?? 0));
  const L = [];

  L.push(`# ${t("title", { date: ruDate(date) })}`, "");
  const compare = P ? t("compare_with", { date: ruDate(P.date), period: span(P.period) }) : t("compare_none");
  L.push(t("intro", { period: span(S.period), days: S.days, compare, json: jsonName }));
  const props = (S.ga?.properties ?? []).map((p) => `${p.name} (${p.id})`).join(", ");
  const noGa = known.filter((h) => !S.ga?.hosts?.[h]);
  L.push("", t("ga_properties", { list: props || "—" }) + (noGa.length ? " " + t("ga_none_for", { list: noGa.join(", ") }) : ""));
  const beyond = BEYOND.filter((h) => !S.ga?.hosts?.[h] && !S.gsc.sites[h]);
  if (beyond.length) L.push(t("note_beyond", { list: beyond.join(", ") }));
  if (P && !P.ga) L.push(t("ga_first"));
  L.push("");

  // ---- network
  L.push(t("h_network"), "", t("h_sites"), "");
  const cols = [[t("c_site")], [t("c_clicks"), "r"], [t("c_impressions"), "r"], [t("c_ctr"), "r"], [t("c_position"), "r"], [t("c_sessions"), "r"], [t("c_engaged"), "r"], [t("c_users"), "r"]];
  if (P) cols.push([t("c_change", { date: ruDate(P.date) }), "r"]);
  const tot = { clicks: 0, impressions: 0, sessions: 0, engaged: 0, users: 0, pc: 0, pi: 0, ps: 0 };
  const rows = [];
  const quiet = [];
  for (const s of order) {
    const g = s.ga;
    tot.clicks += s.web.clicks;
    tot.impressions += s.web.impressions;
    tot.sessions += g?.sessions ?? 0;
    tot.engaged += g?.engaged ?? 0;
    tot.users += g?.users ?? 0;
    const ps = prevSites[s.host];
    const pg = P?.ga?.hosts?.[s.host];
    let delta = "";
    if (P) {
      const dc = ps ? s.web.clicks - ps.web.clicks : null;
      const di = ps ? s.web.impressions - ps.web.impressions : null;
      const dsess = P.ga ? (g?.sessions ?? 0) - (pg?.sessions ?? 0) : null;
      tot.pc += dc ?? 0;
      tot.pi += di ?? 0;
      tot.ps += dsess ?? 0;
      delta = `${dc == null ? "—" : signed(dc)} / ${di == null ? "—" : signed(di)} / ${dsess == null ? "—" : signed(dsess)}`;
    }
    if (!(s.web.clicks >= FULL.clicks || s.web.impressions >= FULL.impressions || (g?.engaged ?? 0) >= FULL.engaged)) quiet.push(s);
    const row = [s.host, num(s.web.clicks), num(s.web.impressions), s.web.impressions ? pct(s.web.clicks, s.web.impressions) : "—", s.web.impressions ? f1(s.web.position) : "—", g ? num(g.sessions) : "—", g ? num(g.engaged) : "—", g ? num(g.users) : "—"];
    if (P) row.push(delta);
    rows.push(row);
  }
  const total = [`**${t("network")}**`, `**${num(tot.clicks)}**`, `**${num(tot.impressions)}**`, pct(tot.clicks, tot.impressions), "", `**${num(tot.sessions)}**`, num(tot.engaged), num(tot.users)];
  if (P) total.push(`**${signed(tot.pc)} / ${signed(tot.pi)} / ${P.ga ? signed(tot.ps) : "—"}**`);
  rows.push(total);
  L.push(...table(cols, rows), "");
  const top5 = (f) => [...order].sort((a, b) => f(b) - f(a)).filter((s) => f(s) > 0).slice(0, 5).map((s) => `${short(s.host)} ${num(f(s))}`).join(", ") || "—";
  L.push(t("leaders", { clicks: top5((s) => s.web.clicks), impressions: top5((s) => s.web.impressions), sessions: top5((s) => s.ga?.engaged ?? 0) }));
  const other = Object.entries(S.ga?.other ?? {}).sort((a, b) => b[1].sessions - a[1].sessions);
  if (other.length) L.push("", t("not_sites", { list: other.map(([h, x]) => `${h} ${num(x.sessions)}`).join(", ") }));
  L.push("");

  const allQ = order.flatMap((s) => s.queries);
  const prevQ = Object.values(prevSites).flatMap((s) => s.queries);
  const netTop = topQueries(allQ);
  const prevNetTop = P ? topQueries(prevQ) : null;
  const qCols = (withSite) => [[t("c_query")], ...(withSite ? [[t("c_site")]] : []), [t("c_clicks"), "r"], [t("c_impressions"), "r"], [t("c_position"), "r"], [t("c_page")], ...(P ? [[t("c_change_q", { date: ruDate(P.date) }), "r"]] : [])];
  const qRow = (r, withSite, prevList) => {
    const row = [r.query, ...(withSite ? [short(r.host)] : []), num(r.clicks), num(r.impressions), f1(r.position), r.page];
    if (P) {
      const p = prevList.find((x) => x.host === r.host && x.query === r.query);
      row.push(p ? `${signed(r.clicks - p.clicks)} / ${signed(r.impressions - p.impressions)} / ${f1(p.position)}→${f1(r.position)}` : t("new"));
    }
    return row;
  };
  const queryTables = (top, withSite, prevList) => {
    const out = [t("h_q_clicks", { n: TOP }), ""];
    out.push(...(top.clicks.length ? table(qCols(withSite), top.clicks.map((r) => qRow(r, withSite, prevList))) : [t("no_clicks")]), "");
    out.push(t("h_q_impr", { n: TOP }), "");
    out.push(...(top.impressions.length ? table(qCols(withSite), top.impressions.map((r) => qRow(r, withSite, prevList))) : [t("no_impressions")]), "");
    return out;
  };
  L.push(...queryTables(netTop, true, prevQ));

  // Pages: Search Console's top by clicks and GA4's top by sessions, merged on host + path.
  const pageTable = (list, withSite) => {
    const cols = [[t("c_page")], ...(withSite ? [[t("c_site")]] : []), [t("c_clicks"), "r"], [t("c_impressions"), "r"], [t("c_position"), "r"], [t("c_sessions"), "r"], [t("c_users"), "r"], [t("c_engaged"), "r"]];
    return table(cols, list.map((r) => [r.page, ...(withSite ? [short(r.host)] : []), r.sc ? num(r.sc.clicks) : "—", r.sc ? num(r.sc.impressions) : "—", r.sc ? f1(r.sc.position) : "—", r.ga ? num(r.ga.sessions) : "—", r.ga ? num(r.ga.users) : "—", r.ga ? num(r.ga.engaged) : "—"]));
  };
  const mergedPages = (list) => {
    // list: sites; the union of each source's top, each row filled from the
    // other source's full list, sorted by clicks and sessions. GA4 writes a
    // landing page without the trailing slash Search Console keeps, so the
    // key is the path with the slash off and the row shows Search Console's.
    const m = {};
    const slot = (host, page) => (m[`${host} ${normPath(page)}`] ??= { host, page });
    for (const s of list) {
      for (const r of s.pages.filter((p) => p.clicks > 0).sort(byClicks).slice(0, TOP)) slot(s.host, r.page).sc = r;
      for (const r of (s.ga?.landing ?? []).slice(0, TOP)) slot(s.host, r.key).ga = r;
    }
    for (const x of Object.values(m)) {
      const s = list.find((s) => s.host === x.host);
      x.sc ??= s?.pages.find((p) => normPath(p.page) === normPath(x.page)) ?? null;
      x.ga ??= s?.ga?.landing.find((r) => normPath(r.key) === normPath(x.page)) ?? null;
      if (x.sc) x.page = x.sc.page;
    }
    return Object.values(m).sort((a, b) => (b.sc?.clicks ?? 0) - (a.sc?.clicks ?? 0) || (b.ga?.sessions ?? 0) - (a.ga?.sessions ?? 0) || (b.sc?.impressions ?? 0) - (a.sc?.impressions ?? 0));
  };
  L.push(t("h_pages", { n: TOP }), "", t("pages_note"), "");
  L.push(...pageTable(mergedPages(order).slice(0, TOP * 2), true), "");

  const moverLines = (M, MP, top, prevTop, pagesNow, pagesPrev, withSite) => {
    // M moves queries, MP moves pages; each gets its own headings.
    const out = [];
    const name = (r) => `\`${r.query ?? r.page}\`${withSite ? ` · ${short(r.host)}` : ""}`;
    const block = (label, list, f) => {
      if (!list.length) return;
      out.push(`**${label}**`, "");
      for (const r of list) out.push(`- ${name(r)} — ${f(r)}`);
      out.push("");
    };
    const clicks = (r) => `${num(r.prev.clicks)} → ${num(r.clicks)} (${num(r.impressions)}, ${f1(r.position)})`;
    const impressions = (r) => `${num(r.prev.impressions)} → ${num(r.impressions)} (${num(r.clicks)}, ${f1(r.position)})`;
    const position = (r) => `${f1(r.prev.position)} → ${f1(r.position)} (${num(r.impressions)})`;
    block(t("m_clicks_up"), M.clicksUp, clicks);
    block(t("m_clicks_down"), M.clicksDown, clicks);
    block(t("m_impr_up"), M.imprUp, impressions);
    block(t("m_impr_down"), M.imprDown, impressions);
    block(t("m_pos_up"), M.posUp, position);
    block(t("m_pos_down"), M.posDown, position);
    block(t("p_clicks_up"), MP.clicksUp, clicks);
    block(t("p_clicks_down"), MP.clicksDown, clicks);
    block(t("p_impr_up"), MP.imprUp, impressions);
    block(t("p_impr_down"), MP.imprDown, impressions);
    block(t("p_pos_up"), MP.posUp, position);
    block(t("p_pos_down"), MP.posDown, position);
    if (prevTop) {
      const was = topSet(prevTop);
      const now = topSet(top);
      const entered = [...top.clicks, ...top.impressions].filter((r, i, a) => !was.has(`${r.host} ${r.query}`) && a.findIndex((x) => x.host === r.host && x.query === r.query) === i);
      const left = [...prevTop.clicks, ...prevTop.impressions].filter((r, i, a) => !now.has(`${r.host} ${r.query}`) && a.findIndex((x) => x.host === r.host && x.query === r.query) === i);
      const allNow = Object.fromEntries(pagesNow.q.map((r) => [`${r.host} ${r.query}`, r]));
      block(t("m_new"), entered, (r) => t("m_entered", { clicks: num(r.clicks), impressions: num(r.impressions), position: f1(r.position) }));
      block(t("m_out"), left, (r) => {
        const n = allNow[`${r.host} ${r.query}`];
        return `${t("m_was", { clicks: num(r.clicks), impressions: num(r.impressions), position: f1(r.position) })}; ${n ? t("m_now", { clicks: num(n.clicks), impressions: num(n.impressions), position: f1(n.position) }) : t("m_gone")}`;
      });
      const pw = new Set(pagesPrev.top.map((r) => `${r.host} ${r.page}`));
      const pn = new Set(pagesNow.top.map((r) => `${r.host} ${r.page}`));
      block(t("m_pages_new"), pagesNow.top.filter((r) => !pw.has(`${r.host} ${r.page}`)), (r) => t("m_entered", { clicks: num(r.clicks), impressions: num(r.impressions), position: f1(r.position) }));
      block(t("m_pages_out"), pagesPrev.top.filter((r) => !pn.has(`${r.host} ${r.page}`)), (r) => {
        const n = pagesNow.all.find((x) => x.host === r.host && x.page === r.page);
        return `${t("m_was", { clicks: num(r.clicks), impressions: num(r.impressions), position: f1(r.position) })}; ${n ? t("m_now", { clicks: num(n.clicks), impressions: num(n.impressions), position: f1(n.position) }) : t("m_gone")}`;
      });
    }
    if (!out.length) out.push(t("m_none", MOVE), "");
    return out;
  };
  const pagesOf = (list) => {
    const all = list.flatMap((s) => s.pages);
    return { q: list.flatMap((s) => s.queries), all, top: all.filter((p) => p.clicks > 0).sort(byClicks).slice(0, TOP) };
  };
  if (P) {
    L.push(t("h_movers", { date: ruDate(P.date) }), "");
    const pagesNow = pagesOf(order);
    const pagesPrev = pagesOf(Object.values(prevSites));
    L.push(...moverLines(movers(allQ, prevQ, "query"), pageMovers(pagesNow.all, pagesPrev.all), netTop, prevNetTop, pagesNow, pagesPrev, true));
  }

  // GA4 only: channels, countries, sources, engagement — for the sites together.
  const gaBlock = (list, withSite) => {
    const out = [t("h_ga"), ""];
    const with_ = list.filter((s) => s.ga);
    if (!with_.length) return [...out, t("ga_none_host"), ""];
    const sum = (f) => with_.reduce((a, s) => a + f(s.ga), 0);
    const sessions = sum((g) => g.sessions);
    const merge = (f) => {
      const m = {};
      for (const s of with_) for (const r of f(s.ga)) (m[r.key] ??= { key: r.key, sessions: 0, users: 0, engaged: 0, hosts: {} }), (m[r.key].sessions += r.sessions), (m[r.key].users += r.users), (m[r.key].engaged += r.engaged), (m[r.key].hosts[s.host] = (m[r.key].hosts[s.host] ?? 0) + r.sessions);
      return Object.values(m).sort((a, b) => b.sessions - a.sessions);
    };
    const channels = merge((g) => g.channels);
    out.push(`**${t("ga_channels")}**`, "", ...table([[t("c_channel")], [t("c_sessions"), "r"], [t("c_share"), "r"], [t("c_rate"), "r"]], channels.map((c) => [c.key, num(c.sessions), pct(c.sessions, sessions), pct(c.engaged, c.sessions)])), "");
    const countries = merge((g) => g.countries).slice(0, 8);
    out.push(`**${t("ga_countries")}**: ${countries.map((c) => `${c.key} ${num(c.sessions)} / ${num(c.users)}`).join(", ")}`, "");
    const scC = {};
    for (const s of list) for (const r of s.sc?.country ?? []) (scC[r.keys[0]] ??= { clicks: 0, impressions: 0 }), (scC[r.keys[0]].clicks += r.clicks), (scC[r.keys[0]].impressions += r.impressions);
    const scTop = Object.entries(scC).sort((a, b) => b[1].clicks - a[1].clicks || b[1].impressions - a[1].impressions).slice(0, 8);
    if (scTop.length) out.push(`**${t("sc_countries")}**: ${scTop.map(([c, v]) => `${c.toUpperCase()} ${num(v.clicks)} / ${num(v.impressions)}`).join(", ")}`, "");
    // Everything Search Console cannot see: not direct, not a search engine's
    // organic, and not a dev preview linking to production.
    const referral = merge((g) => g.sources)
      .filter((r) => !r.key.startsWith("(direct)") && !r.key.startsWith("(not set)") && !r.key.endsWith(" / organic") && !/^(localhost|127\.0\.0\.1)/.test(r.key))
      .slice(0, TOP);
    out.push(`**${t("ga_sources")}**`, "");
    if (referral.length) out.push(...table([[t("c_source")], [t("c_sessions"), "r"], ...(withSite ? [[t("c_site")]] : [])], referral.map((r) => [r.key, num(r.sessions), ...(withSite ? [Object.entries(r.hosts).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([h, n]) => `${short(h)} ${num(n)}`).join(", ")] : [])])), "");
    else out.push(t("ga_sources_none"), "");
    const engaged = sum((g) => g.engaged);
    const views = sum((g) => g.views);
    const duration = sessions ? sum((g) => g.duration * g.sessions) / sessions : 0;
    out.push(t("ga_engagement", { engaged: num(engaged), sessions: num(sessions), rate: pct(engaged, sessions), duration: dur(duration), views: num(views) }), "");
    return out;
  };
  L.push(...gaBlock(order, true));

  // Notes the numbers justify on their own.
  const notes = [];
  const bots = [];
  for (const s of order) {
    const g = s.ga;
    if (g && g.sessions >= 20) {
      const direct = g.channels.find((c) => c.key === "Direct");
      if (direct && direct.sessions / g.sessions >= 0.6 && direct.engaged / direct.sessions < 0.25) bots.push({ host: s.host, share: direct.sessions / g.sessions, rate: direct.engaged / direct.sessions });
    }
    if (!g && s.web.impressions >= FULL.impressions && Object.values(HOSTS).includes(s.host)) notes.push(t("note_no_ga", { host: s.host }));
  }
  if (bots.length) {
    const range = (f) => {
      const v = bots.map(f).sort((a, b) => a - b);
      return `${Math.round(100 * v[0])}–${Math.round(100 * v[v.length - 1])}%`;
    };
    notes.unshift(t("note_bots", { list: bots.map((b) => `${short(b.host)} ${Math.round(100 * b.share)}%`).join(", "), share: range((b) => b.share), rate: range((b) => b.rate) }));
  }
  const unseen = order.filter((s) => !s.web.impressions && !s.note).map((s) => s.host);
  if (unseen.length) notes.push(t("note_no_impr", { list: unseen.join(", "), days: S.days }));
  if (notes.length) L.push(t("h_notes"), "", ...notes.map((n) => `- ${n}`), "");

  // ---- each host
  for (const s of order) {
    if (quiet.includes(s)) continue;
    L.push(`## ${s.host}`, "");
    if (s.note) L.push(s.note, "");
    const ps = prevSites[s.host];
    const pg = P?.ga?.hosts?.[s.host];
    L.push(
      t("host_search", {
        clicks: num(s.web.clicks),
        impressions: num(s.web.impressions),
        ctr: s.web.impressions ? pct(s.web.clicks, s.web.impressions) : "—",
        position: s.web.impressions ? f1(s.web.position) : "—",
        queries: num(s.queries.length),
        pages: num(s.pages.length),
        delta: ps ? t("host_search_delta", { date: ruDate(P.date), clicks: signed(s.web.clicks - ps.web.clicks), impressions: signed(s.web.impressions - ps.web.impressions) }) : "",
      }),
    );
    L.push(
      s.ga
        ? t("host_ga", {
            sessions: num(s.ga.sessions),
            engaged: num(s.ga.engaged),
            rate: pct(s.ga.engaged, s.ga.sessions),
            users: num(s.ga.users),
            duration: dur(s.ga.duration),
            delta: P?.ga ? t("host_ga_delta", { date: ruDate(P.date), sessions: signed(s.ga.sessions - (pg?.sessions ?? 0)), users: signed(s.ga.users - (pg?.users ?? 0)) }) : "",
          })
        : t("ga_none_host"),
      "",
    );
    const top = topQueries(s.queries);
    L.push(...queryTables(top, false, ps?.queries ?? []));
    L.push(t("h_pages", { n: TOP }), "");
    L.push(...pageTable(mergedPages([s]).slice(0, TOP), false), "");
    if (ps) {
      L.push(t("h_movers", { date: ruDate(P.date) }), "");
      const pagesNow = pagesOf([s]);
      const pagesPrev = pagesOf([ps]);
      L.push(...moverLines(movers(s.queries, ps.queries, "query"), pageMovers(pagesNow.all, pagesPrev.all), top, topQueries(ps.queries), pagesNow, pagesPrev, false));
    }
    L.push(...gaBlock([s], false));
  }

  // ---- the quiet ones
  if (quiet.length) {
    L.push(t("h_quiet"), "", t("quiet_note", FULL), "");
    L.push(
      ...table(
        [[t("c_host")], [t("c_clicks"), "r"], [t("c_impressions"), "r"], [t("c_position"), "r"], [t("c_sessions"), "r"], [t("c_engaged"), "r"], [t("c_best")]],
        quiet.map((s) => {
          const best = [...s.queries].sort(byImpressions)[0];
          return [s.host + (s.note ? ` (${s.note})` : ""), num(s.web.clicks), num(s.web.impressions), s.web.impressions ? f1(s.web.position) : "—", s.ga ? num(s.ga.sessions) : "—", s.ga ? num(s.ga.engaged) : "—", best ? `${best.query} (${num(best.impressions)}, ${f1(best.position)})` : "—"];
        }),
      ),
      "",
    );
  }
  return L.join("\n");
}

// Pages move like queries, keyed by host + path; moverLines names a row by
// .query or else .page.
const pageMovers = (now, before) => {
  const key = (r) => `${r.host} ${r.page}`;
  return movers(now.map((r) => ({ ...r, k: key(r) })), before.map((r) => ({ ...r, k: key(r) })), "k");
};

// ---------------------------------------------------------------- main

let S, jsonFile;
if (option("--from")) {
  jsonFile = option("--from");
  S = JSON.parse(fs.readFileSync(jsonFile, "utf8"));
  S.date ??= path.basename(jsonFile).slice(0, 10);
} else {
  const gsc = searchConsole();
  const known = new Set([...Object.values(HOSTS), ...Object.keys(gsc.sites), ...BEYOND]);
  let ga = null;
  try {
    ga = await analytics(gsc.period, known);
  } catch (e) {
    // The search half is already here; GA4 being down costs its sections, not the report.
    process.stderr.write(`ga4: ${e.message}\n`);
  }
  S = { date: localDate(), period: gsc.period, days: gsc.days, fetchedAt: new Date().toISOString(), gsc, ga };
  fs.mkdirSync(DIR, { recursive: true });
  jsonFile = path.join(DIR, `${S.date}.json`);
  fs.writeFileSync(jsonFile, JSON.stringify(S, null, 1));
  process.stderr.write(`saved ${jsonFile}\n`);
}

let P = null;
{
  const file = option("--compare") ?? snapshotsBefore(DIR, S.date).pop() ?? snapshotsBefore(QUERIES, S.date).pop();
  if (file && fs.existsSync(file) && path.resolve(file) !== path.resolve(jsonFile)) {
    const raw = JSON.parse(fs.readFileSync(file, "utf8"));
    // A gsc.mjs snapshot (the /seopush series) has sites at its top: wrap it.
    P = raw.sites ? { date: path.basename(file).slice(0, 10), period: raw.period, gsc: raw, ga: null } : raw;
    P.date ??= path.basename(file).slice(0, 10);
    process.stderr.write(`compared with ${file}\n`);
  }
}

const md = report(S, P, path.basename(jsonFile));
const mdFile = jsonFile.replace(/\.json$/, ".md");
fs.writeFileSync(mdFile, md + "\n");
console.log(md);
process.stderr.write(`report ${mdFile}\n`);
