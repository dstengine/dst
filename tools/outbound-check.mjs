// Every link that leaves the network, and whether it still arrives.
//
// Outbound links rot silently. A ticket seller takes its page down within days
// of a run ending, a theatre reorganises its site, a venue drops a listing —
// and the link keeps sitting on our page looking exactly as it did when it
// worked. Nothing in the build can catch this, because the HTML is fine; the
// other end is what changed.
//
// Reads the built /go/ stubs, so it checks what shipped. Run a build first.
//
//   node tools/outbound-check.mjs          the whole network
//   node tools/outbound-check.mjs musical  one site
//
// The hard part is not fetching, it is not crying wolf. A great many of these
// hosts answer a scripted request with 403 or a Cloudflare interstitial while
// serving a browser perfectly — trch.co.uk answered a redirect-to-root for
// pages that were demonstrably live. So the report has three buckets and only
// one of them is an accusation:
//
//   dead     404, 410, or a host that does not resolve — act on these
//   blocked  403, 429, 503, or a timeout — unknown, check by hand if it matters
//   ok       anything that answered
//
// Exit code is 1 only when something is dead, so this can gate a build without
// failing on every bot wall on the internet.

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const APPS = "apps";
const only = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const CONCURRENCY = 16;
const TIMEOUT_MS = 12000;

/** The stub carries its destination twice; the meta refresh is the one that
    is there even when the script tag changes shape. */
function targetOf(html) {
  const meta = html.match(/http-equiv="refresh"[^>]*content="0;\s*url=([^"]+)"/i);
  if (!meta) return null;
  // The attribute is HTML, so a query string arrives with its ampersands
  // escaped. Probing the escaped form asks for a URL that was never ours.
  return meta[1]
    .replace(/&(?:amp|#38);/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

async function stubs(app) {
  const dir = join(APPS, app, "dist", "go");
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    try {
      const html = await readFile(join(dir, e.name, "index.html"), "utf8");
      const url = targetOf(html);
      if (url) out.push({ app, slug: e.name, url });
    } catch {
      /* a stub without an index.html is a build problem, not a link problem */
    }
  }
  return out;
}

async function probe(url) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS);
  const opts = {
    signal: ctl.signal,
    redirect: "follow",
    headers: {
      // A plain fetch is refused by a good share of these hosts. Presenting a
      // browser's own header set is not evasion — it asks for the same page a
      // reader gets, which is the page we are actually checking.
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36",
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "accept-language": "en-GB,en;q=0.9",
    },
  };
  try {
    let r = await fetch(url, { ...opts, method: "HEAD" });
    // A fair few hosts treat HEAD as unsupported rather than as a question.
    if (r.status === 405 || r.status === 501) r = await fetch(url, { ...opts, method: "GET" });
    clearTimeout(timer);
    if (r.status === 404 || r.status === 410) return { bucket: "dead", detail: String(r.status) };
    if ([403, 401, 429, 503].includes(r.status)) return { bucket: "blocked", detail: String(r.status) };
    return { bucket: "ok", detail: `${r.status}${r.url !== url ? " →" : ""}` };
  } catch (err) {
    clearTimeout(timer);
    const msg = String(err?.cause?.code ?? err?.name ?? err?.message ?? err);
    // A name that does not resolve is a domain that is gone. A timeout is not.
    if (/ENOTFOUND|EAI_AGAIN|ERR_NAME/.test(msg)) return { bucket: "dead", detail: "no such host" };
    return { bucket: "blocked", detail: msg.replace(/^Error:\s*/, "").slice(0, 40) };
  }
}

const apps = only.length
  ? only
  : (await readdir(APPS, { withFileTypes: true })).filter((e) => e.isDirectory()).map((e) => e.name).sort();

const all = (await Promise.all(apps.map(stubs))).flat();
if (all.length === 0) {
  console.log("No built /go/ stubs found — run a build first.");
  process.exit(0);
}

// One probe per distinct URL: several sites legitimately point at the same
// official page, and asking the same host four times is rude and no more true.
const byUrl = new Map();
for (const s of all) (byUrl.get(s.url) ?? byUrl.set(s.url, []).get(s.url)).push(s);
const urls = [...byUrl.keys()];

const results = new Map();
let cursor = 0;
await Promise.all(
  Array.from({ length: Math.min(CONCURRENCY, urls.length) }, async () => {
    while (cursor < urls.length) {
      const url = urls[cursor++];
      results.set(url, await probe(url));
    }
  }),
);

const buckets = { dead: [], blocked: [], ok: [] };
for (const [url, r] of results) {
  for (const s of byUrl.get(url)) buckets[r.bucket].push({ ...s, detail: r.detail });
}

console.log(
  `${all.length} outbound link${all.length === 1 ? "" : "s"}, ${urls.length} distinct destination${urls.length === 1 ? "" : "s"}\n`,
);
const show = (name, list, note) => {
  console.log(`${String(list.length).padStart(4)} ${name}${note ? `  — ${note}` : ""}`);
  for (const s of list.sort((a, b) => (a.app + a.slug).localeCompare(b.app + b.slug))) {
    console.log(`     ${s.app.padEnd(11)} ${s.slug.padEnd(38)} ${s.detail.padEnd(12)} ${s.url}`);
  }
  if (list.length) console.log("");
};
show("dead", buckets.dead, "fix or remove these");
show("blocked", buckets.blocked, "the host refused a script; unknown, not broken");
console.log(`${String(buckets.ok.length).padStart(4)} ok`);

process.exit(buckets.dead.length ? 1 : 0);
