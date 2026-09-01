// Finds events the network does not have yet.
//
//   node tools/events-scan.mjs                    # every source, only what is new
//   node tools/events-scan.mjs nyc42 ldn          # one or more sites
//   node tools/events-scan.mjs --all              # everything, unranked and unfiltered
//   node tools/events-scan.mjs --min 1            # widen the net (default 2)
//   node tools/events-scan.mjs --json             # machine-readable, for a writer
//   node tools/events-scan.mjs --probe <url>      # what does this source expose?
//   node tools/events-scan.mjs --forget           # empty the seen list
//
// Why a script. Looking for events by hand means opening the same fifteen
// calendars, reading past everything already published, and remembering
// which of the rest was rejected last week. All three are mechanical. What
// is not mechanical — is this worth a page, what angle, whose words —
// stays with whoever writes it.
//
// What it does NOT do: write content. Every candidate comes out with the URL
// it was read from and nothing else invented, because a listing is a lead,
// not a source. The page is written from the source, after someone has
// opened it. See CLAUDE.md: only what a named source confirms.
//
// Sources live in tools/events-sources.json, one entry per calendar:
//
//   { "site": "new-york", "for": ["nyc42"], "name": "…", "url": "…",
//     "kind": "jsonld", "city": "New York",
//     "match": "/events/",        // which paths or lines are listings
//     "require": "/newyork/",     // and which candidates belong to this city
//     "off": true }               // retired, kept for the record
//
// `kind` is how the page hands over its listings — jsonld, rss, ics,
// sitemap, or watch, which keeps a copy of the page and reports the lines
// that were not on it last time. `auto` tries the first four in order. --probe reports what a
// candidate source actually publishes, so adding one is a single command
// rather than an afternoon of reading someone's markup.
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCES = path.join(REPO, "tools/events-sources.json");
const SEEN = path.join(REPO, "tools/events-seen.json");
// What each watched page said last time. Separate from the seen list because
// it is a snapshot rather than a decision, and it is the file to delete when
// a page is redesigned and every line reads as new.
const WATCH = path.join(REPO, "tools/events-watch.json");

// Identify the caller and give every host room to breathe: one request at a
// time per host, a pause between them, and a hard timeout so one hanging
// calendar cannot hold up the other fourteen.
const UA = "dst-network-event-scan/1.0 (+https://dst.llc)";
const HOST_PAUSE = 1200;
const TIMEOUT = 20_000;
// How far ahead a listing is still worth reading. Past this the dates move
// too often to be worth writing down, and a calendar that publishes three
// years out fills the report with placeholders.
const HORIZON_DAYS = 420;
// A run that started before today can still be worth a page; one that ended
// last month cannot.
const BACKSTOP_DAYS = 7;
// Per source, so one busy feed cannot fill the report on its own. What did
// not fit is not marked as seen, so the report is a queue: the next run
// brings the next twelve rather than losing them.
const PER_SOURCE = 12;

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(`--${name}`);
const value = (name) => { const i = argv.indexOf(`--${name}`); return i < 0 ? undefined : argv[i + 1]; };
const sites = argv.filter((a) => !a.startsWith("--") && argv[argv.indexOf(a) - 1] !== "--probe");

const today = new Date().toISOString().slice(0, 10);
const iso = (d) => new Date(Date.now() + d * 86_400_000).toISOString().slice(0, 10);

/* ------------------------------------------------------------------ fetch */

const lastHit = new Map();
async function get(url) {
  const host = new URL(url).host;
  const wait = (lastHit.get(host) ?? 0) + HOST_PAUSE - Date.now();
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastHit.set(host, Date.now());
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml,application/xml,text/calendar;q=0.9,*/*;q=0.8" },
    redirect: "follow",
    signal: AbortSignal.timeout(TIMEOUT),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return { body: await res.text(), url: res.url, type: res.headers.get("content-type") ?? "" };
}

/* --------------------------------------------------------------- parsing */

const unescape = (s) => String(s)
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
  .replace(/<[^>]+>/g, " ")
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
  .replace(/&(ndash|mdash|rsquo|lsquo|ldquo|rdquo|hellip|middot|eacute|aacute|oacute|iacute|uacute|ntilde);/g,
    (_, n) => ({ ndash: "–", mdash: "—", rsquo: "’", lsquo: "‘", ldquo: "“", rdquo: "”", hellip: "…", middot: "·", eacute: "é", aacute: "á", oacute: "ó", iacute: "í", uacute: "ú", ntilde: "ñ" })[n])
  .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, " ")
  .replace(/\s+/g, " ").trim();

/** Every JSON-LD block on the page, flattened: @graph, arrays and the
    nested objects an Event hangs off (an ItemList of them is the common
    shape) all come out as one list of plain objects. */
function jsonLdNodes(html) {
  const out = [];
  const walk = (node) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== "object") return;
    out.push(node);
    for (const key of ["@graph", "itemListElement", "item", "subEvent", "event", "hasPart"]) {
      if (node[key]) walk(node[key]);
    }
  };
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    try { walk(JSON.parse(m[1].trim().replace(/^﻿/, ""))); } catch { /* a broken block is not a reason to lose the page */ }
  }
  return out;
}

const typeOf = (node) => [].concat(node["@type"] ?? []).join(" ");
const isEvent = (node) => /Event/.test(typeOf(node)) && typeof node.name === "string";

function fromJsonLd(html, base) {
  return jsonLdNodes(html).filter(isEvent).map((e) => ({
    title: unescape(e.name),
    start: String(e.startDate ?? "").slice(0, 10) || undefined,
    end: String(e.endDate ?? "").slice(0, 10) || undefined,
    where: unescape(e.location?.name ?? e.location?.address?.addressLocality ?? ""),
    url: absolute(e.url ?? e["@id"] ?? "", base),
    note: e.offers ? "has offers" : undefined,
  }));
}

/** RSS and Atom, which most news and some venue calendars publish. These are
    leads rather than events: an item has a headline and a date of
    publication, and whether it is an event at all is the reader's call. */
function fromFeed(xml, base) {
  const items = [...xml.matchAll(/<(item|entry)\b[\s\S]*?<\/\1>/gi)].map((m) => m[0]);
  return items.map((it) => {
    const pick = (tag) => it.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"))?.[1];
    const link = pick("link") ?? it.match(/<link[^>]+href="([^"]+)"/i)?.[1] ?? "";
    return {
      title: unescape(pick("title") ?? ""),
      start: (pick("pubDate") || pick("published") || pick("updated") || "").trim()
        ? new Date(unescape(pick("pubDate") || pick("published") || pick("updated"))).toISOString().slice(0, 10)
        : undefined,
      where: "",
      url: absolute(unescape(link), base),
      note: "feed item",
      dateIsPublication: true,
    };
  });
}

/** iCalendar, which is the only one of these formats that was designed for
    the job. Line folding is undone first — a long SUMMARY is split across
    lines with a leading space, and reading them separately loses the title. */
function fromIcs(text, base) {
  const lines = text.replace(/\r\n[ \t]/g, "").split(/\r?\n/);
  const out = [];
  let cur = null;
  for (const line of lines) {
    if (line.startsWith("BEGIN:VEVENT")) cur = {};
    else if (line.startsWith("END:VEVENT") && cur) { out.push(cur); cur = null; }
    else if (cur) {
      const [rawKey, ...rest] = line.split(":");
      const key = rawKey.split(";")[0];
      const v = rest.join(":");
      if (key === "SUMMARY") cur.title = unescape(v.replace(/\\,/g, ","));
      if (key === "DTSTART") cur.start = v.replace(/[^0-9]/g, "").slice(0, 8).replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
      if (key === "DTEND") cur.end = v.replace(/[^0-9]/g, "").slice(0, 8).replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
      if (key === "LOCATION") cur.where = unescape(v);
      if (key === "URL") cur.url = absolute(v, base);
    }
  }
  return out.map((e) => ({ ...e, url: e.url ?? base }));
}

/** A sitemap, filtered to the paths that hold listings. No title and no
    date — but a URL that was not in the sitemap last week is a new page,
    which is exactly the question being asked, and most calendars worth
    reading are rendered in the browser and give up nothing else.

    A sitemap index is followed one level, and only into the child sitemaps
    whose own address looks like it holds the wanted paths — a news site's
    index points at forty of them and thirty-nine are archives. */
async function fromSitemap(xml, base, match) {
  const re = match ? new RegExp(match) : /event/i;
  if (/<sitemapindex/i.test(xml)) {
    const children = [...xml.matchAll(/<sitemap>([\s\S]*?)<\/sitemap>/g)]
      .map((m) => unescape(m[1].match(/<loc>([\s\S]*?)<\/loc>/)?.[1] ?? ""))
      .filter(Boolean);
    // A big index is forty archives and one calendar, so it is filtered by
    // name; a small one is the site handing over everything it has, and its
    // single child is rarely called what the pages under it are.
    const wanted = children.length <= 3 ? children
      : children.filter((u) => re.test(u) || /event|whats-on|calendar|news/i.test(u)).slice(0, 4);
    const out = [];
    for (const child of wanted) {
      try { out.push(...await fromSitemap((await get(child)).body, child, match)); }
      catch { /* one unreadable child is not the end of the sitemap */ }
    }
    return out;
  }
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
    url: unescape(m[1].match(/<loc>([\s\S]*?)<\/loc>/)?.[1] ?? ""),
    lastmod: m[1].match(/<lastmod>([\s\S]*?)<\/lastmod>/)?.[1]?.slice(0, 10),
  })).filter((u) => u.url && re.test(u.url)).map((u) => ({
    title: decodeURIComponent(u.url.replace(/\/$/, "").split("/").pop() ?? "").replace(/[-_]/g, " "),
    start: undefined,
    where: "",
    url: absolute(u.url, base),
    start: u.lastmod,
    note: u.lastmod ? "page updated" : "sitemap entry",
    dateIsPublication: true,
  })).sort((a, b) => (b.start ?? "").localeCompare(a.start ?? "")).slice(0, 60);
}

/** The last resort, and the one that works everywhere: keep a copy of the
    lines a page shows and report the ones that were not there last time.

    Tour listings are the case it was written for. A production's own dates
    page publishes no structured data and no feed, but a new stop is a new
    line on it — and "what changed" is the whole question. Nothing here
    understands the line; it is reported as the page printed it. */
function fromWatch(html, base, match, remembered) {
  const text = html
    .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<\/(p|div|li|tr|h[1-6]|section)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n");
  const re = match ? new RegExp(match, "i") : /\b(19|20)\d{2}\b/;
  // Long enough to be a line and not a fragment: a bare year, a price or a
  // stray number is not news about a tour, and reporting one wastes the run.
  const lines = [...new Set(text.split("\n").map(unescape)
    .filter((l) => l.length >= 12 && l.length < 200 && /[A-Za-zÀ-ÿ]{3}/.test(l) && re.test(l)))];
  const before = new Set(remembered ?? []);
  const added = remembered ? lines.filter((l) => !before.has(l)) : [];
  return {
    lines,
    // A first run has nothing to compare against: it records the page and
    // says so, rather than reporting three hundred lines as news.
    items: added.map((l) => ({ title: l, url: base, where: "", note: "new line on the page", dateIsPublication: true })),
    fresh: !remembered,
  };
}

function absolute(href, base) {
  try { return new URL(href, base).toString(); } catch { return base; }
}

/* -------------------------------------------------------------- the probe */

/** What a candidate source actually publishes. Run before adding it to the
    registry: the answer decides `kind`, and "nothing" saves a source that
    would have failed silently on every scan. */
async function probe(url) {
  console.log(`\n${url}`);
  let page;
  try { page = await get(url); } catch (err) { console.log(`  unreachable: ${err.message}`); return; }
  const { body, url: final } = page;
  if (final !== url) console.log(`  redirects to ${final}`);

  // The address may already be the machine-readable thing, in which case
  // nothing else about it matters.
  if (/^\s*(<\?xml|<rss\b|<feed\b)/i.test(body) && /<(rss|feed)\b/i.test(body)) {
    const items = fromFeed(body, final);
    console.log(`  this IS a feed: ${items.length} item(s)`);
    for (const e of items.slice(0, 3)) console.log(`    · ${e.start ?? "no date"}  ${e.title}`);
    console.log(`  suggested kind: "rss"`);
    return;
  }
  if (/<(urlset|sitemapindex)\b/i.test(body)) {
    const n = (body.match(/<loc>/g) ?? []).length;
    console.log(`  this IS a sitemap: ${n} entr${n === 1 ? "y" : "ies"}${/sitemapindex/i.test(body) ? " (index)" : ""}`);
    console.log(`  suggested kind: "sitemap"  (set "match" to the path that holds listings)`);
    return;
  }
  if (/^BEGIN:VCALENDAR/m.test(body)) {
    const items = fromIcs(body, final);
    console.log(`  this IS an iCalendar: ${items.length} event(s)`);
    for (const e of items.slice(0, 3)) console.log(`    · ${e.start ?? "no date"}  ${e.title}`);
    console.log(`  suggested kind: "ics"`);
    return;
  }

  const events = fromJsonLd(body, final);
  const nodes = jsonLdNodes(body);
  console.log(`  json-ld: ${nodes.length} node(s), ${events.length} Event(s)` +
    (nodes.length && !events.length ? ` — types: ${[...new Set(nodes.map(typeOf).filter(Boolean))].slice(0, 8).join(", ")}` : ""));
  for (const e of events.slice(0, 3)) console.log(`    · ${e.start ?? "no date"}  ${e.title}`);

  const feeds = [...body.matchAll(/<link[^>]+type="application\/(?:rss|atom)\+xml"[^>]*>/gi)]
    .map((m) => absolute(m[0].match(/href="([^"]+)"/i)?.[1] ?? "", final));
  console.log(`  feeds: ${feeds.length ? feeds.join("\n         ") : "none advertised"}`);

  const ics = [...body.matchAll(/href="([^"]*\.ics[^"]*)"/gi)].map((m) => absolute(m[1], final));
  console.log(`  ics: ${ics.length ? ics.slice(0, 3).join(", ") : "none linked"}`);

  const origin = new URL(final).origin;
  try {
    const sm = await get(`${origin}/sitemap.xml`);
    const n = (sm.body.match(/<loc>/g) ?? []).length;
    console.log(`  sitemap.xml: ${n} entr${n === 1 ? "y" : "ies"}${/sitemapindex/.test(sm.body) ? " (index of sitemaps)" : ""}`);
  } catch (err) { console.log(`  sitemap.xml: ${err.message}`); }

  const kind = events.length ? "jsonld" : feeds.length ? "rss" : ics.length ? "ics" : "sitemap";
  console.log(`  suggested kind: "${kind}"`);
}

/* --------------------------------------------------------------- ranking */

// A city feed is mostly not events. These three lists decide what reaches
// the report: something that is going to happen, ideally with a when, and
// not another ranked list of the best bakeries. They are deliberately blunt
// — the cost of a wrong keep is one line to read, and the cost of a wrong
// drop is a story missed, so the thresholds lean towards keeping.
const HAPPENING = /\b(festival|fest|exhibition|exhibit|concert|gig|tour|opens|opening|returns|premiere|parade|carnival|season|takeover|pop-?up|tickets?|on sale|debut|celebrat\w*|anniversar\w*|screening|marathon|summit|conference|expo|residency|retrospective|showcase)\b|\b(christmas|night|food|street|book|art|farmers.?) (market|fair)\b/i;
const SUCEDE = /\b(festival|exposici\w+|concierto\w*|gira|estreno|temporada|boletos|entradas|inaugura\w*|desfile|muestra|feria|cartelera|funci\w+n|homenaje|aniversario|ciclo)\b/i;
const WHEN = /\b(january|february|march|april|may|june|july|august|september|october|november|december|monday|tuesday|wednesday|thursday|friday|saturday|sunday|tonight|weekend|next month|this year|20\d{2})\b|\b(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|fin de semana|pr\w+ximo mes)\b/i;
// Service journalism, rankings and reviews: real work, and never an event.
const NOISE = /\b(best|ranked|ranking|according to|top \d+|guide|review|why|how|these are|named among|crowned|things to do|shortlisted|longlist|mejores|rese\w+a|por qu\w+|c\w+mo|as\w+ es)\b/i;

// The five .lol sites are not allowed near politics, crime, tragedy or a
// named person being called out — a standing rule about what those domains
// are for, not a judgement about the story. Filtering here means the rule is
// applied before anybody spends twenty minutes on a piece that cannot run.
const OFF_LIMITS = /\b(kill\w*|dead|death|died|murder|shot|shooting|stabb\w*|assault|rape|arrest\w*|police|crime|court|trial|lawsuit|sued|jail|prison|war|attack|terror\w*|crash|collision|fire|blaze|flood|earthquake|evacuat\w*|protest|riot|election|minister|president|parliament|sanction\w*|racist|abuse|scandal|backlash|cancel\w*|missing|appeal|victim|injur\w*|hospital\w*)\b/i;
const PROHIBIDO = /\b(muert\w+|asesin\w+|homicidio|balac\w+|polic\w+a|delito|juicio|c\w+rcel|guerra|atentado|choque|incendio|inundaci\w+n|sismo|protesta|elecci\w+n|presidente|diputad\w+|esc\w+ndalo|racis\w+|abuso)\b/i;

const offLimits = (item) => OFF_LIMITS.test(item.title) || PROHIBIDO.test(item.title);

function score(item) {
  // A line that appeared on a watched page since the last run is the signal
  // the source was added for, whatever words are in it.
  if (item.kind === "watch") return 5;
  // Anything that came with a real start date has already said it is an
  // event; the keywords are only there to read headlines with.
  if (!item.dateIsPublication && item.start) return 5;
  const t = item.title;
  let n = 0;
  if (HAPPENING.test(t) || SUCEDE.test(t)) n += 2;
  if (WHEN.test(t)) n += 1;
  if (NOISE.test(t)) n -= 2;
  return n;
}

/* ------------------------------------------------------- what we have now */

/** Every source URL and every headline the network has already published,
    so the report is what is new rather than what exists. Read out of the
    content files themselves: a second list would go stale the first time
    somebody added an item without updating it. */
function published() {
  const urls = new Set();
  const titles = new Set();
  for (const dir of ["packages/content/src/events", "packages/content/src/news"]) {
    const full = path.join(REPO, dir);
    if (!existsSync(full)) continue;
    for (const file of readdirSync(full).filter((f) => f.endsWith(".ts"))) {
      const src = readFileSync(path.join(full, file), "utf8");
      for (const m of src.matchAll(/url:\s*"(https?:\/\/[^"]+)"/g)) urls.add(canonical(m[1]));
      for (const m of src.matchAll(/title:\s*"([^"]+)"/g)) titles.add(key(m[1]));
    }
  }
  return { urls, titles };
}

// Trailing slashes, tracking parameters and http/https are not differences
// between two pages, and treating them as such reports the same event every
// week for the rest of the year.
function canonical(url) {
  try {
    const u = new URL(url);
    u.protocol = "https:";
    u.hash = "";
    u.host = u.host.replace(/^www\./, "");
    for (const p of [...u.searchParams.keys()]) if (/^(utm_|fbclid|gclid|ref)/.test(p)) u.searchParams.delete(p);
    u.pathname = u.pathname.replace(/\/+$/, "");
    return u.toString();
  } catch { return url; }
}

const key = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
  .replace(/[^a-z0-9]+/g, " ").trim();

/* ------------------------------------------------------------------ scan */

async function readSource(src, watched) {
  const kinds = src.kind && src.kind !== "auto" ? [src.kind] : ["jsonld", "rss", "ics", "sitemap"];
  const page = await get(src.url);
  if (src.kind === "watch") {
    const w = fromWatch(page.body, page.url, src.match, watched[src.url]);
    watched[src.url] = w.lines;
    if (w.fresh) return [{ title: `${w.lines.length} lines recorded; the next run reports what changed`, url: src.url, where: "", note: "first look", dateIsPublication: true, kind: "watch" }];
    return w.items.map((f) => ({ ...f, kind: "watch" }));
  }
  for (const kind of kinds) {
    let found = [];
    if (kind === "jsonld") found = fromJsonLd(page.body, page.url);
    else if (kind === "rss") {
      const xml = /<(rss|feed)\b/i.test(page.body) ? page.body
        : await feedBehind(page.body, page.url);
      found = xml ? fromFeed(xml, page.url) : [];
    } else if (kind === "ics") found = fromIcs(page.body, page.url);
    else if (kind === "sitemap") found = await fromSitemap(page.body, page.url, src.match);
    if (found.length) return found.map((f) => ({ ...f, kind }));
  }
  return [];
}

/** A page given as an HTML address that advertises a feed: follow it once,
    so the registry can hold the address a person would open. */
async function feedBehind(html, base) {
  const href = html.match(/<link[^>]+type="application\/(?:rss|atom)\+xml"[^>]*>/i)?.[0]
    ?.match(/href="([^"]+)"/i)?.[1];
  if (!href) return null;
  try { return (await get(absolute(href, base))).body; } catch { return null; }
}

async function main() {
  if (flag("probe")) return probe(value("probe"));

  const registry = JSON.parse(readFileSync(SOURCES, "utf8"));
  const seen = flag("forget") || !existsSync(SEEN) ? {} : JSON.parse(readFileSync(SEEN, "utf8"));
  const have = published();
  const wanted = registry.filter((s) => (sites.length === 0 || sites.includes(s.site)) && !s.off);
  if (wanted.length === 0) {
    console.error(`No sources for ${sites.join(", ") || "any site"}. Sites in the registry: ${[...new Set(registry.map((s) => s.site))].join(", ")}`);
    process.exit(1);
  }

  const horizon = iso(HORIZON_DAYS);
  const backstop = iso(-BACKSTOP_DAYS);
  const report = [];
  const failures = [];
  const quiet = [];
  const kept = new Map();
  let blocked = 0;
  const min = Number(value("min") ?? 2);
  const watched = existsSync(WATCH) && !flag("forget") ? JSON.parse(readFileSync(WATCH, "utf8")) : {};

  // Hosts in parallel, each host serially — the pause in get() does the
  // second half, and one slow calendar should not decide how long the run
  // takes.
  const byHost = new Map();
  for (const src of wanted) {
    const host = new URL(src.url).host;
    if (!byHost.has(host)) byHost.set(host, []);
    byHost.get(host).push(src);
  }

  await Promise.all([...byHost.values()].map(async (group) => {
    for (const src of group) {
      let found;
      try { found = await readSource(src, watched); }
      catch (err) { failures.push(`${src.site}  ${src.name}: ${err.message}`); continue; }
      if (found.length === 0) {
        if (src.kind === "watch") quiet.push(`${src.site}  ${src.name}: unchanged`);
        else failures.push(`${src.site}  ${src.name}: nothing readable as ${src.kind ?? "auto"}`);
        continue;
      }

      kept.set(src.name, 0);
      for (const item of found) {
        if (!item.title || !item.url) continue;
        const when = item.end ?? item.start;
        // A dated event outside the window is not a candidate. An undated
        // lead (a feed item, a sitemap page) has no window to be outside of.
        if (!item.dateIsPublication && when && (when < backstop || item.start > horizon)) continue;
        if (item.dateIsPublication && item.start && item.start < iso(-45)) continue;
        const url = canonical(item.url);
        const k = `${src.site}:${key(item.title)}`;
        const isNew = !have.urls.has(url) && !have.titles.has(key(item.title)) && !seen[k];
        if (!isNew && !flag("all")) continue;
        if (report.some((r) => r.url === url && r.site === src.site)) continue;
        if (src.require && !new RegExp(src.require).test(url)) continue;
        if (!flag("all") && src.site !== "musical" && offLimits(item)) { blocked += 1; continue; }
        const rank = score(item);
        // Not recorded as seen: the seen list is what has been reported, and
        // a lower --min later should still be able to surface this.
        if (!flag("all") && rank < min) continue;
        if (!flag("all") && kept.get(src.name) >= PER_SOURCE) continue;
        kept.set(src.name, (kept.get(src.name) ?? 0) + 1);
        report.push({ ...item, url, rank, site: src.site, source: src.name, city: src.city, seenBefore: Boolean(seen[k]) });
        seen[k] = { url, first: seen[k]?.first ?? today, last: today };
      }
    }
  }));

  writeFileSync(SEEN, `${JSON.stringify(seen, null, 2)}\n`);
  writeFileSync(WATCH, `${JSON.stringify(watched, null, 2)}\n`);

  if (flag("json")) { console.log(JSON.stringify(report, null, 2)); return; }

  report.sort((a, b) => a.site.localeCompare(b.site) || b.rank - a.rank || (a.start ?? "9").localeCompare(b.start ?? "9"));
  let site = "";
  for (const r of report) {
    if (r.site !== site) { site = r.site; console.log(`\n=== ${site}${r.city ? `  (${r.city})` : ""}`); }
    const date = r.start ? (r.end && r.end !== r.start ? `${r.start}..${r.end}` : r.start) : "no date";
    console.log(`  ${r.dateIsPublication ? "~" : " "}${date.padEnd(21)} ${r.title}`);
    console.log(`   ${" ".repeat(21)} ${r.url}`);
    if (r.where || r.note) console.log(`   ${" ".repeat(21)} ${[r.where, r.note].filter(Boolean).join(" · ")}  [${r.source}]`);
  }

  console.log(`\n${report.length} candidate${report.length === 1 ? "" : "s"} from ${wanted.length} source${wanted.length === 1 ? "" : "s"}` +
    `${flag("all") ? "" : " not already published or reported"}.`);
  if (blocked) console.log(`${blocked} dropped as politics, crime or tragedy — off limits on the .lol sites (--all shows them).`);
  if (quiet.length) for (const q of quiet) console.log(`  ${q}`);
  if (failures.length) {
    console.log(`\n${failures.length} source${failures.length === 1 ? "" : "s"} gave nothing:`);
    for (const f of failures) console.log(`  ${f}`);
    console.log(`  (--probe <url> says what a source publishes; "off": true in the registry retires one.)`);
  }
  console.log(`\nA candidate is a lead. Open the URL and write from it — the listing is not the source.`);
}

await main();
