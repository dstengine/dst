// Which pages of each site a search engine can index, read from production.
//
//   node tools/idx-check.mjs                    every host in tools/hosts.mjs, and EXTRA below
//   node tools/idx-check.mjs tick ldn.lol       some of them, by app name or by host
//   node tools/idx-check.mjs --gsc              and what Google itself says about each URL
//   node tools/idx-check.mjs --json out.json    the whole result, for the next run to compare with
//   node tools/idx-check.mjs --compare old.json what moved since that run
//
// seo-check.mjs reads dist/ and asks whether a page says what the site is
// about. This asks the question before that one: can the page get into the
// index at all? It reads what a crawler reads — robots.txt, the sitemaps it
// names, and every page those list — from the live hosts, because a build
// on this machine says nothing about what Vercel is serving.
//
// A sitemap URL is indexable when it answers 200 with HTML, carries no
// noindex in a meta tag or an X-Robots-Tag header, names itself (or nothing)
// as canonical, and is not disallowed by robots.txt. Everything else listed
// is a problem: a sitemap that offers a crawler a page it may not index
// spends the crawl on nothing and teaches it to trust the sitemap less.
//
// It also walks the links on every page it fetched. A page that is linked,
// indexable and missing from the sitemap is found by crawl alone, late; a
// link that answers 404 is a broken page in front of a reader.
//
// --gsc asks Search Console, as the service account in GSC_KEY (default
// ~/dst/.secrets/ga4-reader.json), for every property it has been given:
// the sitemaps Google has fetched, and the URL Inspection verdict for each
// sitemap URL — "Submitted and indexed", "Discovered - currently not
// indexed" and the rest. Inspection allows 2,000 calls a day per property,
// so answers are cached for 20 hours in ~/.cache/dst-idx/. The account is a
// verified owner of every repo host (its token file is in each
// apps/*/public/), so a repo host that is not its property, a sitemap named
// in robots.txt but never submitted, or one Google has not read in a week
// is a problem; the hosts built elsewhere only get a note.
//
// Exit 1 when any host has a problem.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { HOSTS } from "./hosts.mjs";

/** Ours, but not built from this repo: rss.mobi has its own, and the rest
    are the restored archives ~/dst/revive builds (fest.vvm.space and
    concert.vvm.space only 308 to fest.one, so they are not listed). */
const EXTRA = ["rss.mobi", "fest.one", "vvm.space", "sensation.vvm.space", "placebo.vvm.space", "d8.vvm.space", "maxidrom.vvm.space"];

const UA = "Mozilla/5.0 (compatible; dst-idx-check/1.0; +https://dst.llc/)";
const PER_HOST = 5; // parallel requests to one host
const HOSTS_AT_ONCE = 4;
const UNLISTED_CAP = 300; // linked-but-unlisted URLs fetched per host
const SKIP_EXT = /\.(xml|txt|json|rss|atom|ics|jpe?g|png|gif|webp|avif|svg|ico|pdf|css|js|mjs|map|mp4|webm|mp3|woff2?|ttf|zip|webmanifest)$/i;

// ---------------------------------------------------------------- args

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(name);
const option = (name) => {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : undefined;
};
const optionValues = new Set(["--json", "--compare", "--details"].map(option).filter(Boolean));
const names = argv.filter((a) => !a.startsWith("--") && !optionValues.has(a));
const DETAILS = Number(option("--details") ?? 8);

const ALL = [...Object.values(HOSTS), ...EXTRA];
const targets = names.length
  ? names.map((n) => HOSTS[n] ?? n).filter((h) => {
      if (!ALL.includes(h)) console.error(`warning: ${h} is not one of ours as far as hosts.mjs knows; checking anyway`);
      return true;
    })
  : ALL;

// ---------------------------------------------------------------- fetch

async function get(url, { manual = true, tries = 2 } = {}) {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, {
        redirect: manual ? "manual" : "follow",
        headers: { "user-agent": UA, accept: "text/html,application/xml;q=0.9,*/*;q=0.8" },
        signal: AbortSignal.timeout(25_000),
      });
      const type = res.headers.get("content-type") ?? "";
      const readable = /html|xml|text/i.test(type);
      const body = readable ? await res.text() : (await res.arrayBuffer(), "");
      return {
        status: res.status,
        type,
        body,
        location: res.headers.get("location"),
        xRobots: res.headers.get("x-robots-tag") ?? "",
      };
    } catch (err) {
      if (attempt >= tries) return { status: 0, type: "", body: "", error: String(err.cause?.code ?? err.name ?? err) };
      await new Promise((r) => setTimeout(r, 1500));
    }
  }
}

async function pool(items, size, fn) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(size, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await fn(items[i], i);
      }
    }),
  );
  return out;
}

// ---------------------------------------------------------------- robots.txt

/** Google's reading: the group naming googlebot if there is one, else `*`;
    the longest matching rule wins, Allow on a tie. */
function parseRobots(text) {
  const groups = [];
  const sitemaps = [];
  let current = null;
  let lastWasAgent = false;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, "").trim();
    const m = line.match(/^([a-z-]+)\s*:\s*(.*)$/i);
    if (!m) continue;
    const [, key, value] = [m[0], m[1].toLowerCase(), m[2].trim()];
    if (key === "sitemap") {
      sitemaps.push(value);
      continue;
    }
    if (key === "user-agent") {
      if (!lastWasAgent) groups.push((current = { agents: [], rules: [] }));
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
      continue;
    }
    lastWasAgent = false;
    if (current && (key === "allow" || key === "disallow")) current.rules.push({ allow: key === "allow", path: value });
  }
  const pick = groups.filter((g) => g.agents.some((a) => a === "googlebot"));
  const rules = (pick.length ? pick : groups.filter((g) => g.agents.includes("*"))).flatMap((g) => g.rules);
  return { rules, sitemaps };
}

function robotsAllows(rules, pathAndQuery) {
  let best = null;
  for (const rule of rules) {
    if (!rule.path) continue; // "Disallow:" with nothing allows everything
    const anchored = rule.path.endsWith("$");
    const body = anchored ? rule.path.slice(0, -1) : rule.path;
    const re = new RegExp("^" + body.split("*").map((s) => s.replace(/[.+?^${}()|[\]\\]/g, "\\$&")).join(".*") + (anchored ? "$" : ""));
    if (!re.test(pathAndQuery)) continue;
    if (!best || rule.path.length > best.path.length || (rule.path.length === best.path.length && rule.allow)) best = rule;
  }
  return !best || best.allow;
}

// ---------------------------------------------------------------- sitemaps

const tag = (block, name) => {
  const m = block.match(new RegExp(`<${name}>\\s*(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?\\s*</${name}>`, "i"));
  return m ? m[1].trim().replace(/&amp;/g, "&") : null;
};

async function readSitemaps(host, named) {
  const result = { files: [], urls: [], errors: [], indexWithoutLastmod: 0 };
  let start = named.filter(Boolean);
  if (!start.length) {
    for (const guess of [`https://${host}/sitemap-index.xml`, `https://${host}/sitemap.xml`]) {
      const res = await get(guess, { manual: false });
      if (res.status === 200 && /<(urlset|sitemapindex)/i.test(res.body)) {
        start = [guess];
        result.guessed = guess;
        break;
      }
    }
  }
  const seen = new Set();
  const visit = async (url, depth) => {
    if (seen.has(url) || depth > 3) return;
    seen.add(url);
    const res = await get(url, { manual: false });
    if (res.status !== 200 || !/<(urlset|sitemapindex)/i.test(res.body)) {
      result.errors.push(`${url} → ${res.status || res.error}`);
      return;
    }
    result.files.push(url);
    if (/<sitemapindex/i.test(res.body)) {
      for (const [block] of res.body.matchAll(/<sitemap>[\s\S]*?<\/sitemap>/gi)) {
        if (!tag(block, "lastmod")) result.indexWithoutLastmod++;
        const loc = tag(block, "loc");
        if (loc) await visit(loc, depth + 1);
      }
      return;
    }
    for (const [block] of res.body.matchAll(/<url>[\s\S]*?<\/url>/gi)) {
      const loc = tag(block, "loc");
      if (!loc) continue;
      result.urls.push({
        loc,
        lastmod: tag(block, "lastmod"),
        changefreq: tag(block, "changefreq"),
        priority: tag(block, "priority"),
        file: url,
      });
    }
  };
  for (const url of start) await visit(url, 0);
  return result;
}

// ---------------------------------------------------------------- pages

const attrs = (t) => Object.fromEntries([...t.matchAll(/([a-z-:]+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/gi)].map((m) => [m[1].toLowerCase(), m[3] ?? m[4] ?? m[5] ?? ""]));

function normal(u) {
  try {
    const x = new URL(u);
    x.hash = "";
    x.hostname = x.hostname.toLowerCase();
    return x.href;
  } catch {
    return u;
  }
}

function readPage(url, res) {
  const head = res.body.slice(0, res.body.search(/<\/head>/i) + 1 || 200_000);
  let noindex = /\b(noindex|none)\b/i.test(res.xRobots) ? "X-Robots-Tag" : null;
  let canonical = null;
  for (const [t] of head.matchAll(/<meta\b[^>]*>/gi)) {
    const a = attrs(t);
    if (/^(robots|googlebot)$/i.test(a.name ?? "") && /\b(noindex|none)\b/i.test(a.content ?? "")) noindex ??= `meta ${a.name}`;
  }
  for (const [t] of head.matchAll(/<link\b[^>]*>/gi)) {
    const a = attrs(t);
    if ((a.rel ?? "").toLowerCase().split(/\s+/).includes("canonical") && a.href) {
      canonical = normal(new URL(a.href, url).href);
      break;
    }
  }
  const links = new Set();
  const base = new URL(url);
  for (const [, href] of res.body.matchAll(/<a\b[^>]*?\shref\s*=\s*["']([^"'#][^"']*)["']/gi)) {
    let target;
    try {
      target = new URL(href.replace(/&amp;/g, "&"), url);
    } catch {
      continue;
    }
    if (target.hostname !== base.hostname || !/^https?:$/.test(target.protocol)) continue;
    if (target.search || SKIP_EXT.test(target.pathname)) continue;
    target.hash = "";
    links.add(target.href);
  }
  return { noindex, canonical, links };
}

async function checkUrl(url, robots) {
  const u = new URL(url);
  const blocked = !robotsAllows(robots.rules, u.pathname + u.search);
  const res = await get(url);
  const row = { url, status: res.status, blocked };
  if (res.error) row.error = res.error;
  if (res.status >= 300 && res.status < 400) row.location = res.location ? new URL(res.location, url).href : null;
  if (res.status === 200) {
    row.html = /html/i.test(res.type);
    if (row.html) {
      const page = readPage(url, res);
      row.noindex = page.noindex;
      row.canonical = page.canonical;
      row.links = page.links;
    }
  }
  row.canonicalElsewhere = !!(row.canonical && row.canonical !== normal(url));
  row.indexable = row.status === 200 && row.html && !row.noindex && !row.canonicalElsewhere && !blocked;
  return row;
}

// ---------------------------------------------------------------- one host

async function checkHost(host) {
  const report = { host, problems: {}, warnings: {}, notes: {}, counts: {} };
  const add = (bucket, key, item) => (report[bucket][key] ??= []).push(item);

  const robotsRes = await get(`https://${host}/robots.txt`, { manual: false });
  const robots = robotsRes.status === 200 ? parseRobots(robotsRes.body) : { rules: [], sitemaps: [] };
  if (robotsRes.status !== 200) add("warnings", "no robots.txt", `https://${host}/robots.txt → ${robotsRes.status || robotsRes.error}`);
  if (robots.rules.some((r) => !r.allow && r.path === "/")) add("problems", "robots.txt disallows the whole site", `https://${host}/robots.txt`);

  const maps = await readSitemaps(host, robots.sitemaps);
  report.sitemaps = maps.files;
  // What a crawler is told to start from — the one that should be submitted.
  report.declared = robots.sitemaps.length ? robots.sitemaps : [maps.guessed].filter(Boolean);
  if (!maps.files.length) add("problems", "no sitemap", robots.sitemaps.length ? robots.sitemaps.join(", ") : "none named in robots.txt, none at /sitemap-index.xml or /sitemap.xml");
  else if (!robots.sitemaps.length) add("warnings", "sitemap not named in robots.txt", maps.guessed);
  for (const e of maps.errors) add("problems", "sitemap file unreadable", e);
  if (maps.indexWithoutLastmod) add("warnings", "sitemap index entries without lastmod", `${maps.indexWithoutLastmod}`);

  const listed = new Map();
  for (const entry of maps.urls) {
    const key = normal(entry.loc);
    if (listed.has(key)) {
      add("problems", "listed twice", entry.loc);
      continue;
    }
    listed.set(key, entry);
    let entryHost;
    try {
      entryHost = new URL(entry.loc).hostname;
    } catch {
      add("problems", "not a URL", entry.loc);
      continue;
    }
    if (entryHost !== host) add("problems", "listed on another host", entry.loc);
    const missing = ["lastmod", "changefreq", "priority"].filter((f) => !entry[f]);
    if (missing.length) add("warnings", "entries missing " + missing.join("/"), entry.loc);
  }

  const urls = [...listed.keys()].filter((u) => {
    try {
      return new URL(u).hostname === host;
    } catch {
      return false;
    }
  });
  const rows = await pool(urls, PER_HOST, (u) => checkUrl(u, robots));
  const linked = new Set();
  for (const row of rows) {
    for (const l of row.links ?? []) linked.add(normal(l));
    delete row.links;
    if (row.indexable) continue;
    if (row.status === 0) add("problems", "listed, no answer", `${row.url} (${row.error})`);
    else if (row.status >= 300 && row.status < 400) add("problems", "listed, redirects", `${row.url} → ${row.location}`);
    else if (row.status !== 200) add("problems", `listed, answers ${row.status}`, row.url);
    else if (!row.html) add("warnings", "listed, not HTML", row.url);
    else if (row.blocked) add("problems", "listed, blocked by robots.txt", row.url);
    else if (row.noindex) add("problems", "listed, noindex", `${row.url} (${row.noindex})`);
    else if (row.canonicalElsewhere) add("problems", "listed, canonical points elsewhere", `${row.url} → ${row.canonical}`);
  }
  for (const row of rows) if (row.status === 200 && row.html && !row.canonical) add("warnings", "no canonical", row.url);

  // Linked from a listed page, on this host, not in the sitemap.
  const unlisted = [...linked].filter((u) => !listed.has(u) && robotsAllows(robots.rules, new URL(u).pathname));
  const sample = unlisted.slice(0, UNLISTED_CAP);
  if (unlisted.length > sample.length) add("warnings", `linked, not in the sitemap, not fetched past the cap of ${UNLISTED_CAP}`, `${unlisted.length - sample.length} more URLs`);
  const extra = await pool(sample, PER_HOST, (u) => checkUrl(u, robots));
  for (const row of extra) {
    if (row.indexable) add("problems", "indexable, linked, not in the sitemap", row.url);
    else if (row.status === 404 || row.status === 410 || row.status >= 500) add("problems", `internal link answers ${row.status}`, row.url);
    else if (row.status === 0) add("warnings", "internal link, no answer", `${row.url} (${row.error})`);
    else if (row.status >= 300 && row.status < 400) add("warnings", "internal link redirects", `${row.url} → ${row.location}`);
    else if (row.noindex) add("notes", "linked, noindex, rightly not in the sitemap", row.url);
    // The page is fine and out of the sitemap rightly, but the link should
    // name the address the page calls its own: every link to the other one
    // makes the crawler fetch a duplicate to learn where to go.
    else if (row.canonicalElsewhere) add("warnings", "internal links to a non-canonical address", `${row.url} → ${row.canonical}`);
  }

  report.rows = rows;
  report.counts = {
    listed: urls.length,
    indexable: rows.filter((r) => r.indexable).length,
    unlistedIndexable: report.problems["indexable, linked, not in the sitemap"]?.length ?? 0,
    problems: Object.values(report.problems).reduce((n, list) => n + list.length, 0),
  };
  return report;
}

// ---------------------------------------------------------------- Search Console

async function gscToken() {
  const file = process.env.GSC_KEY ?? path.join(os.homedir(), "dst/.secrets/ga4-reader.json");
  if (!fs.existsSync(file)) return { error: `no service-account key at ${file}` };
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
  return body.access_token ? { token: body.access_token, email: key.client_email } : { error: body.error_description ?? body.error ?? `token ${res.status}` };
}

const CACHE_DIR = path.join(os.homedir(), ".cache/dst-idx");
const CACHE_HOURS = 20;

async function gscHost(report, auth, properties) {
  const host = report.host;
  const labels = host.split(".");
  const candidates = [`https://${host}/`, ...labels.slice(0, -1).map((_, i) => `sc-domain:${labels.slice(i).join(".")}`)];
  const property = candidates.find((c) => properties.has(c));
  if (!property) return { property: null, note: `not shared with ${auth.email}` };
  const api = (p, init) =>
    fetch(`https://${p}`, { ...init, headers: { authorization: `Bearer ${auth.token}`, "content-type": "application/json", ...init?.headers } }).then((r) => r.json());

  const out = { property, sitemaps: [], coverage: {}, notIndexed: [], inspected: 0, cached: 0, errors: [] };
  const maps = await api(`www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/sitemaps`);
  for (const s of maps.sitemap ?? []) {
    out.sitemaps.push({ path: s.path, lastSubmitted: s.lastSubmitted, lastDownloaded: s.lastDownloaded, errors: Number(s.errors ?? 0), warnings: Number(s.warnings ?? 0), pending: !!s.isPending });
  }

  fs.mkdirSync(CACHE_DIR, { recursive: true });
  const cacheFile = path.join(CACHE_DIR, `${host}.json`);
  const cache = fs.existsSync(cacheFile) ? JSON.parse(fs.readFileSync(cacheFile, "utf8")) : {};
  const fresh = (e) => e && Date.now() - e.at < CACHE_HOURS * 3600_000;
  const urls = report.rows.map((r) => r.url);
  let quotaHit = false;
  await pool(urls, 3, async (url) => {
    if (fresh(cache[url])) {
      out.cached++;
      return;
    }
    if (quotaHit) return;
    const body = await api("searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
      method: "POST",
      body: JSON.stringify({ inspectionUrl: url, siteUrl: property, languageCode: "en-US" }),
    });
    if (body.error) {
      if (body.error.code === 429) quotaHit = true;
      out.errors.push(`${url}: ${body.error.message}`);
      return;
    }
    const s = body.inspectionResult?.indexStatusResult ?? {};
    cache[url] = { at: Date.now(), verdict: s.verdict, coverage: s.coverageState, lastCrawl: s.lastCrawlTime, googleCanonical: s.googleCanonical };
    out.inspected++;
  });
  fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 1));
  for (const url of urls) {
    const e = cache[url];
    if (!e) continue;
    const state = e.coverage ?? "unknown";
    out.coverage[state] = (out.coverage[state] ?? 0) + 1;
    if (e.verdict !== "PASS") out.notIndexed.push(`${url} — ${state}`);
  }
  out.indexed = urls.filter((u) => cache[u]?.verdict === "PASS").length;
  if (quotaHit) out.errors.unshift("inspection quota reached; the rest is from cache or missing");
  return out;
}

// A sitemap Google has not read is invisible from the outside: the file
// answers 200, every check above passes, and nothing gets crawled from it.
// dst.llc sat like that for five weeks, and eleven hosts were never in
// Search Console at all, so the property and its sitemap are checked here
// as problems rather than printed as a note nobody reads. A fresh submission
// shows as pending with no download for a day or two; a week of that is
// stuck, not slow.
const NEVER_READ_DAYS = 7;
const STALE_READ_DAYS = 21;
const REPO_HOSTS = new Set(Object.values(HOSTS));

function gscFindings(r) {
  const g = r.gsc;
  const add = (bucket, key, item) => (r[bucket][key] ??= []).push(item);
  const days = (iso) => (Date.now() - Date.parse(iso)) / 86400_000;
  // Only repo hosts carry the service account's token file, so only they
  // can be expected to be its properties; the rest stay a note.
  if (!g.property) {
    if (REPO_HOSTS.has(r.host)) add("problems", "not in Search Console", `${r.host} — add the property and submit the sitemap`);
  } else {
    const submitted = new Map(g.sitemaps.map((s) => [s.path, s]));
    for (const url of r.declared ?? []) if (!submitted.has(url)) add("problems", "sitemap not submitted to Search Console", url);
    for (const s of g.sitemaps) {
      if (!r.sitemaps.includes(s.path)) add("problems", "submitted sitemap is no longer served", s.path);
      if (s.errors) add("problems", "Search Console reports sitemap errors", `${s.path}: ${s.errors}`);
      if (!s.lastDownloaded && s.lastSubmitted && days(s.lastSubmitted) > NEVER_READ_DAYS)
        add("problems", `sitemap never read by Google, submitted over ${NEVER_READ_DAYS} days ago`, `${s.path} (submitted ${s.lastSubmitted.slice(0, 10)})`);
      if (s.lastDownloaded && days(s.lastDownloaded) > STALE_READ_DAYS)
        add("warnings", `Google has not read the sitemap in ${STALE_READ_DAYS} days`, `${s.path} (last read ${s.lastDownloaded.slice(0, 10)})`);
      if (s.warnings) add("warnings", "Search Console reports sitemap warnings", `${s.path}: ${s.warnings}`);
    }
  }
  r.counts.problems = Object.values(r.problems).reduce((n, list) => n + list.length, 0);
}

// ---------------------------------------------------------------- run

const started = Date.now();
const reports = [];
await pool(targets, HOSTS_AT_ONCE, async (host) => {
  const r = await checkHost(host);
  reports.push(r);
  process.stderr.write(`  ${host}: ${r.counts.indexable}/${r.counts.listed} indexable, ${r.counts.problems} problems\n`);
});
reports.sort((a, b) => targets.indexOf(a.host) - targets.indexOf(b.host));

let gscNote = null;
if (flag("--gsc")) {
  const auth = await gscToken();
  if (auth.error) gscNote = `Search Console: ${auth.error}`;
  else {
    const list = await fetch("https://www.googleapis.com/webmasters/v3/sites", { headers: { authorization: `Bearer ${auth.token}` } }).then((r) => r.json());
    const properties = new Set((list.siteEntry ?? []).filter((e) => e.permissionLevel !== "siteUnverifiedUser").map((e) => e.siteUrl));
    if (!properties.size) gscNote = `Search Console: ${auth.email} has been given no property yet`;
    for (const r of reports) {
      r.gsc = await gscHost(r, auth, properties);
      gscFindings(r);
    }
  }
}

// ---------------------------------------------------------------- print

const pad = (s, n, right = false) => (right ? String(s).padStart(n) : String(s).padEnd(n));
const lines = [];
lines.push(`Indexability, ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC, ${reports.length} hosts, ${Math.round((Date.now() - started) / 1000)} s`);
lines.push("");
lines.push(`${pad("host", 24)}${pad("listed", 8, true)}${pad("indexable", 11, true)}${pad("problems", 10, true)}${pad("unlisted", 10, true)}${flag("--gsc") ? pad("google", 10, true) : ""}`);
for (const r of reports) {
  const g = r.gsc ? (r.gsc.property ? `${r.gsc.indexed}/${r.counts.listed}` : "—") : "";
  lines.push(`${pad(r.host, 24)}${pad(r.counts.listed, 8, true)}${pad(r.counts.indexable, 11, true)}${pad(r.counts.problems, 10, true)}${pad(r.counts.unlistedIndexable, 10, true)}${flag("--gsc") ? pad(g, 10, true) : ""}`);
}
const total = (k) => reports.reduce((n, r) => n + r.counts[k], 0);
lines.push(`${pad("all", 24)}${pad(total("listed"), 8, true)}${pad(total("indexable"), 11, true)}${pad(total("problems"), 10, true)}${pad(total("unlistedIndexable"), 10, true)}`);
if (gscNote) lines.push("", gscNote);

for (const r of reports) {
  const problemKeys = Object.keys(r.problems);
  const warningKeys = Object.keys(r.warnings);
  const noteKeys = Object.keys(r.notes);
  const g = r.gsc;
  if (!problemKeys.length && !warningKeys.length && !noteKeys.length && !g?.property) continue;
  lines.push("", `## ${r.host}`);
  for (const [bucket, keys, mark] of [["problems", problemKeys, "✗"], ["warnings", warningKeys, "·"], ["notes", noteKeys, "◦"]]) {
    for (const k of keys) {
      const list = r[bucket][k];
      lines.push(`${mark} ${k}: ${list.length}`);
      for (const item of list.slice(0, DETAILS)) lines.push(`    ${item}`);
      if (list.length > DETAILS) lines.push(`    …and ${list.length - DETAILS} more`);
    }
  }
  if (g?.property) {
    lines.push(`◦ Google (${g.property}): ${g.indexed} of ${r.counts.listed} indexed; ${g.inspected} inspected now, ${g.cached} from cache`);
    for (const [state, n] of Object.entries(g.coverage).sort((a, b) => b[1] - a[1])) lines.push(`    ${pad(n, 5, true)}  ${state}`);
    for (const s of g.sitemaps) lines.push(`    sitemap ${s.path}: downloaded ${s.lastDownloaded?.slice(0, 10) ?? "never"}${s.errors ? `, ${s.errors} errors` : ""}${s.pending ? ", pending" : ""}`);
    for (const e of g.errors.slice(0, 3)) lines.push(`    ! ${e}`);
  } else if (g) lines.push(`◦ Google: ${g.note}`);
}

if (option("--compare") && fs.existsSync(option("--compare"))) {
  const old = JSON.parse(fs.readFileSync(option("--compare"), "utf8"));
  const before = new Map(old.reports.map((r) => [r.host, r]));
  const moved = [];
  for (const r of reports) {
    const o = before.get(r.host);
    if (!o) {
      moved.push(`${r.host}: new in this run`);
      continue;
    }
    const d = (k) => r.counts[k] - (o.counts[k] ?? 0);
    const parts = ["listed", "indexable", "problems"].filter((k) => d(k)).map((k) => `${k} ${d(k) > 0 ? "+" : ""}${d(k)}`);
    if (r.gsc?.property && o.gsc?.property) {
      const gi = r.gsc.indexed - o.gsc.indexed;
      if (gi) parts.push(`google ${gi > 0 ? "+" : ""}${gi}`);
    }
    if (parts.length) moved.push(`${r.host}: ${parts.join(", ")}`);
  }
  lines.push("", `Since ${old.at.slice(0, 10)}:`, ...(moved.length ? moved.map((m) => `  ${m}`) : ["  nothing moved"]));
}

console.log(lines.join("\n"));

if (option("--json")) {
  const file = option("--json");
  fs.mkdirSync(path.dirname(path.resolve(file)), { recursive: true });
  fs.writeFileSync(file, JSON.stringify({ at: new Date().toISOString(), reports, gscNote }, null, 1));
}
process.exit(reports.some((r) => r.counts.problems) ? 1 : 0);
