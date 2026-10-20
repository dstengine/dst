// Tells the IndexNow engines which pages changed, so they re-read them
// within hours instead of when their crawler next comes round. One POST is
// shared across every engine in the protocol — Bing, Naver, Seznam.cz,
// Yandex, Yep and Amazon, as indexnow.org lists them. Google does not take
// part; its own route to the same news is the sitemap's lastmod, which
// this reads.
//
//   node tools/indexnow.mjs              every host whose pages moved since the last ping
//   node tools/indexnow.mjs tick lnd     some of them, by app name or host
//   node tools/indexnow.mjs --dry-run    what would be sent, sent nowhere
//   node tools/indexnow.mjs --all        everything in lastmod.json, as if never sent
//   node tools/indexnow.mjs --new-key tea   a key for a site that has none yet
//
// What counts as changed is packages/content/src/lastmod.json, the one
// map the sitemap and dateModified already read: a page whose date moved
// since tools/indexnow-sent.json last recorded it, a page that is new, and
// a page that is gone — the protocol takes those too, so the engine can
// drop them instead of discovering a 404 on its own.
//
// Two checks against production before anything is sent, because an engine
// told about a page fetches it at once, and a page the deploy has not
// reached yet would be read in its old form on our say-so:
//
//   1. https://<host>/<key>.txt serves the key. Until the deploy carrying the
//      key file is live, the engine rejects the host's URLs anyway.
//   2. The live sitemap dates each URL at least as late as lastmod.json
//      does. A URL it dates earlier is held for a later run; a gone URL is
//      reported gone only once the live sitemap has stopped listing it.
//
// So the right moment to run it is after a push has deployed, and running
// it early costs nothing: what is not live yet waits.
//
// One key per host, in tools/indexnow-keys.json and as apps/<app>/public/
// <key>.txt. Per host and not one for the network: the key file is public,
// and the five .lol sites are independent of the group and of each other
// (tools/deploy.sh) — one key on twenty hosts would be a shared footprint of
// exactly the kind the measurement IDs were split to remove.
//
// indexnow-sent.json is committed on purpose. It is the tool's memory of
// what has been told, and without it every run would resend the network.
import { randomBytes } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { HOSTS, appOfHost } from "./hosts.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LASTMOD = path.join(REPO, "packages/content/src/lastmod.json");
const KEYS = path.join(REPO, "tools/indexnow-keys.json");
const SENT = path.join(REPO, "tools/indexnow-sent.json");

export const ENDPOINT = "https://api.indexnow.org/indexnow";
/** The protocol's ceiling per request. */
export const BATCH = 10000;
const TIMEOUT_MS = 15000;

/** What the engine's status codes mean, from the protocol's own table. */
export const MEANING = {
  200: "accepted",
  202: "accepted, key validation pending",
  400: "bad request — the body is malformed",
  403: "key not valid — the key file is missing or does not hold the key",
  422: "URLs rejected — not on this host, or the key does not match",
  429: "too many requests",
};

const readJson = (file, fallback) => (existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : fallback);

/** What each host owes the engines: pages whose date moved or that are new
    since the last ping, and pages that have gone. Pure — the state comes in
    as arguments — so the test can hand it histories that never happened. */
export function plan({ lastmod, sent, hosts = Object.keys(lastmod), all = false }) {
  const out = {};
  for (const host of hosts) {
    const current = lastmod[host] ?? {};
    const told = all ? {} : (sent[host] ?? {});
    const changed = Object.entries(current)
      .filter(([url, date]) => !told[url] || Date.parse(told[url]) < Date.parse(date))
      .map(([url, date]) => ({ url, date }));
    const gone = Object.keys(told).filter((url) => !(url in current));
    if (changed.length || gone.length) out[host] = { changed, gone };
  }
  return out;
}

/** Splits one host's plan by what production serves. A changed page is
    ready once the live sitemap dates it at least as late as lastmod.json;
    a gone page once the live sitemap no longer lists it. The rest is held
    for a later run. `live` maps a path to its live lastmod, or null when the
    sitemap lists the page undated. */
export function ready({ changed, gone }, live) {
  const send = [];
  const held = [];
  for (const entry of changed) {
    const liveDate = live.get(entry.url);
    (liveDate && Date.parse(liveDate) >= Date.parse(entry.date) ? send : held).push(entry);
  }
  return {
    send,
    held,
    dropped: gone.filter((url) => !live.has(url)),
    kept: gone.filter((url) => live.has(url)),
  };
}

/** path → lastmod (or null), read out of a sitemap urlset. */
export function parseUrlset(xml) {
  const out = new Map();
  for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = m[1].match(/<loc>([^<]+)<\/loc>/)?.[1];
    if (!loc) continue;
    out.set(new URL(loc.trim()).pathname, m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? null);
  }
  return out;
}

async function fetchText(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`${res.status} on ${url}`);
  return res.text();
}

/** Every URL the host's live sitemap lists, with its date. */
export async function liveSitemap(host) {
  const index = await fetchText(`https://${host}/sitemap-index.xml`);
  const live = new Map();
  for (const m of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    for (const [p, d] of parseUrlset(await fetchText(m[1].trim()))) live.set(p, d);
  }
  // An index that fetches but names no page is not "every page is gone":
  // treated as such, it would strike the whole host off the sent record.
  if (!live.size) throw new Error("the sitemap lists no pages");
  return live;
}

async function keyServed(host, key) {
  try {
    return (await fetchText(`https://${host}/${key}.txt`)).trim() === key;
  } catch {
    return false;
  }
}

/** One request to the engine; returns its status code. */
export async function submit({ host, key, urls, endpoint = ENDPOINT }) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList: urls }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  return res.status;
}

/** A key the protocol accepts: 8–128 of [a-zA-Z0-9-]. 32 hex characters is
    plenty and reads as nothing in a directory listing. */
export const newKey = () => randomBytes(16).toString("hex");

/** Hosts in the order of tools/hosts.mjs, so the two state files diff by
    what changed rather than by what moved. */
const byHost = (state, inner = (v) => v) =>
  Object.fromEntries(
    Object.values(HOSTS)
      .filter((host) => state[host] !== undefined)
      .map((host) => [host, inner(state[host])]),
  );
const byPath = (pages) => Object.fromEntries(Object.entries(pages).sort(([a], [b]) => a.localeCompare(b)));

function addKey(app) {
  const host = HOSTS[app];
  if (!host) throw new Error(`no such app: ${app} — the names are in tools/hosts.mjs`);
  const keys = readJson(KEYS, {});
  if (keys[host]) throw new Error(`${host} already has a key: apps/${app}/public/${keys[host]}.txt`);
  const key = newKey();
  writeFileSync(path.join(REPO, "apps", app, "public", `${key}.txt`), `${key}\n`);
  keys[host] = key;
  writeFileSync(KEYS, JSON.stringify(byHost(keys), null, 2) + "\n");
  console.log(`${host}: key written to apps/${app}/public/${key}.txt and tools/indexnow-keys.json`);
}

async function main() {
  const argv = process.argv.slice(2);
  const flag = (name) => argv.includes(name);
  if (flag("--new-key")) {
    const app = argv[argv.indexOf("--new-key") + 1];
    if (!app) throw new Error("--new-key takes an app name");
    return addKey(app);
  }
  const dry = flag("--dry-run");
  const all = flag("--all");
  const names = argv.filter((a) => !a.startsWith("--"));
  const lastmod = readJson(LASTMOD, null);
  if (!lastmod) throw new Error("no lastmod.json — npm run build && node tools/lastmod.mjs first");
  const keys = readJson(KEYS, {});
  const sent = readJson(SENT, {});
  const known = Object.values(HOSTS);
  const hosts = names.length ? names.map((n) => HOSTS[n] ?? n) : known;
  for (const host of hosts) if (!known.includes(host)) throw new Error(`not a host of this repo: ${host}`);

  const todo = plan({ lastmod, sent, hosts, all });
  if (!Object.keys(todo).length) {
    console.log("nothing has moved since the last ping");
    return;
  }
  let moved = false;
  for (const host of hosts) {
    const p = todo[host];
    if (!p) continue;
    const owed = p.changed.length + p.gone.length;
    const key = keys[host];
    if (!key) {
      console.log(`${host}: ${owed} to tell, no key — node tools/indexnow.mjs --new-key ${appOfHost(host)}`);
      continue;
    }
    if (!(await keyServed(host, key))) {
      console.log(`${host}: ${owed} to tell, held — /${key}.txt is not served yet, deploy first`);
      continue;
    }
    let live;
    try {
      live = await liveSitemap(host);
    } catch (e) {
      console.log(`${host}: ${owed} to tell, held — sitemap unreadable (${e.message})`);
      continue;
    }
    const { send, held, dropped, kept } = ready(p, live);
    const parts = [`${send.length} changed`, `${dropped.length} gone`];
    if (held.length + kept.length) parts.push(`${held.length + kept.length} not deployed yet`);
    const urls = [...send.map((s) => s.url), ...dropped].map((u) => `https://${host}${u}`);
    if (!urls.length) {
      console.log(`${host}: ${parts.join(", ")}`);
      continue;
    }
    if (dry) {
      console.log(`${host}: ${parts.join(", ")} — dry run, nothing sent`);
      for (const u of urls) console.log(`   ${u}`);
      continue;
    }
    let status = 0;
    for (let i = 0; i < urls.length && (status === 0 || status === 200 || status === 202); i += BATCH) {
      status = await submit({ host, key, urls: urls.slice(i, i + BATCH) });
    }
    if (status !== 200 && status !== 202) {
      console.log(`${host}: ${status} ${MEANING[status] ?? ""} — nothing recorded`);
      continue;
    }
    sent[host] = { ...(sent[host] ?? {}) };
    for (const { url, date } of send) sent[host][url] = date;
    for (const url of dropped) delete sent[host][url];
    moved = true;
    console.log(`${host}: ${parts.join(", ")} — ${MEANING[status]}`);
  }
  if (moved) writeFileSync(SENT, JSON.stringify(byHost(sent, byPath), null, 2) + "\n");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error(`indexnow: ${e.message}`);
    process.exit(1);
  });
}
