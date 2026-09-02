// Nothing on the network links or reaches out to a third party.
//
// The rule for the whole network: a page may point at dst.llc and its
// subdomains, and at nothing else. Third-party destinations go through the
// /go/<slug>/ hop instead, which is noindex/nofollow and disallowed in
// robots.txt, so no external domain collects link equity from our pages.
//
// This file crawls every app's dist/, including eco — which the older
// build-output checks skip, and which is exactly where a direct outbound
// link to Instagram sat unnoticed in the site header.
//
//   npm run build && node --test tests/outbound-links.test.js
import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Every app in the network. eco included — see the note above. */
const APPS = ["dst", "llc", "visas", "riviera", "mbr", "palmcentral", "eco", "fwf", "musical",
  "nyc42", "ldn", "lnd", "cmx", "mxo"];

/** dst.llc itself and any subdomain of it, plus the network's own domains
    that don't sit under it — fwf.lol is published by DST but is a site
    about a third party's event, so it carries its own name. */
const OWN_DOMAINS = ["fwf.lol", "musical.today",
  // The five city experiments, each its own site on its own domain.
  "nyc42.lol", "ldn.lol", "lnd.lol", "cmx.lol", "mxo.lol"];
const isNetworkHost = (host) =>
  host === "dst.llc" ||
  host.endsWith(".dst.llc") ||
  OWN_DOMAINS.some((own) => host === own || host.endsWith(`.${own}`));

// The only third parties a built page is allowed to reach, each one a
// deliberate decision. A new host here is a decision too — it should be
// added consciously, with the reason, not discovered in production.
const ALLOWED = {
  "www.googletagmanager.com": "the analytics tag, loaded as a script",
  "www.openstreetmap.org": "the keyless map embed used on venue and event pages",
  "nominatim.openstreetmap.org": "names the place behind GPS coordinates, once the visitor has granted them",
  "www.youtube-nocookie.com": "video the uploader allows to be embedded, in YouTube's no-cookie player",
  "counter.yadro.ru": "the LiveInternet counter, now on dst.llc/li/ alone rather than in every footer",
};

// Fields of a VideoObject that say where the embedded media lives rather
// than sending a reader off the page. The host still has to be one the page
// is already allowed to embed, so this is not a way round ALLOWED.
const MEDIA_FIELDS = new Set(["embedUrl", "contentUrl"]);

// Attributes a browser follows or fetches. `content` is in the list for the
// meta refresh on /go/ hops and for og:image.
const URL_ATTRS = /(?:href|src|srcset|action|content)="([^"]*)"/g;
const TAGS = /<(a|link|script|iframe|img|source|form|meta)\s[^>]*>/g;

const decodeAttr = (s) => s.replace(/&amp;/g, "&").replace(/&#38;/g, "&");

/** The hosts a single attribute value points at, external ones only. */
function externalHosts(value) {
  const hosts = [];
  // srcset is a comma-separated list of "url descriptor" pairs; a plain
  // href is just the whole value, and both survive this split.
  for (const candidate of decodeAttr(value).split(",")) {
    const url = candidate.trim().split(/\s+/)[0].replace(/^0;\s*url=/, "");
    if (!/^https?:\/\//i.test(url)) continue;
    let host;
    try {
      host = new URL(url).host;
    } catch {
      continue;
    }
    if (!isNetworkHost(host)) hosts.push({ host, url });
  }
  return hosts;
}

/** Every built file: { app, rel, ext, url, text }. */
const files = [];

before(async () => {
  for (const app of APPS) {
    const dist = path.join(REPO, "apps", app, "dist");
    const entries = await readdir(dist, { recursive: true, withFileTypes: true }).catch(() => {
      assert.fail(`apps/${app}/dist is missing — run "npm run build" first`);
    });
    for (const e of entries) {
      if (!e.isFile()) continue;
      const file = path.join(e.parentPath ?? e.path, e.name);
      const rel = path.relative(dist, file);
      if (!/\.(html|css|js|xml)$/.test(e.name)) continue;
      files.push({
        app,
        rel,
        ext: path.extname(e.name),
        url: "/" + rel.replace(/index\.html$/, ""),
        text: readFileSync(file, "utf8"),
      });
    }
  }
  const html = files.filter((f) => f.ext === ".html");
  console.log(`crawled ${html.length} pages and ${files.length - html.length} assets across ${APPS.length} apps`);
  assert.ok(html.length > 40, `expected the whole network to be built, found ${html.length} pages`);
});

const pages = () => files.filter((f) => f.ext === ".html");
/** Content pages: the outbound hops under /go/ are the one place that links out. */
const contentPages = () => pages().filter((f) => !f.url.startsWith("/go/"));

describe("outbound links, network-wide", () => {
  test("no page links or embeds anything outside dst.llc", () => {
    const offenders = [];
    const allowedSeen = new Map();
    for (const p of contentPages()) {
      for (const [tag] of p.text.matchAll(TAGS)) {
        const element = tag.match(/^<(\w+)/)[1];
        for (const [, value] of tag.matchAll(URL_ATTRS)) {
          for (const { host, url } of externalHosts(value)) {
            if (ALLOWED[host]) {
              allowedSeen.set(host, (allowedSeen.get(host) ?? 0) + 1);
              continue;
            }
            offenders.push(`${p.app}${p.url}: <${element}> -> ${url}`);
          }
        }
      }
    }
    for (const [host, n] of [...allowedSeen].sort()) {
      console.log(`  allowed: ${host} × ${n} (${ALLOWED[host]})`);
    }
    assert.deepEqual(offenders, [], `links out of the network:\n${offenders.join("\n")}`);
  });

  // The escape hatch, kept honest: a hop may point anywhere, but only
  // because it is a dead end for crawlers.
  test("the /go/ hops are the only pages that point outward, and they are closed", () => {
    const hops = pages().filter((p) => p.url.startsWith("/go/"));
    assert.ok(hops.length > 0, "expected at least one /go/ hop to be built");
    for (const hop of hops) {
      const where = `${hop.app}${hop.url}`;
      assert.match(hop.text, /<meta name="robots" content="noindex, nofollow">/, `${where}: not noindex`);
      assert.match(hop.text, /rel="nofollow noopener external"/, `${where}: outbound link not nofollowed`);
    }
    console.log(`  ${hops.length} outbound hops, all noindex and nofollow`);
  });

  // A stylesheet can pull a font or a background off someone else's server
  // just as effectively as a tag can.
  test("no stylesheet loads anything off-network", () => {
    const offenders = [];
    for (const f of files.filter((f) => f.ext === ".css")) {
      for (const [, url] of f.text.matchAll(/url\(\s*["']?(https?:\/\/[^)"']+)/g)) {
        const host = new URL(url).host;
        if (!isNetworkHost(host) && !ALLOWED[host]) offenders.push(`${f.app}/${f.rel} -> ${url}`);
      }
    }
    assert.deepEqual(offenders, [], `stylesheets reaching off-network:\n${offenders.join("\n")}`);
  });

  // Scripts call out at runtime, where no amount of HTML checking sees it.
  test("no script calls a third party that is not on the allowed list", () => {
    const hosts = new Map();
    const offenders = [];
    for (const f of files.filter((f) => f.ext === ".js")) {
      for (const [, url] of f.text.matchAll(/fetch\(\s*[`"'](https?:\/\/[^`"'$)]+)/g)) {
        const host = new URL(url).host;
        if (isNetworkHost(host)) continue;
        hosts.set(host, (hosts.get(host) ?? 0) + 1);
        if (!ALLOWED[host]) offenders.push(`${f.app}/${f.rel} -> ${url}`);
      }
    }
    for (const [host, n] of [...hosts].sort()) {
      console.log(`  fetch: ${host} × ${n}${ALLOWED[host] ? ` (${ALLOWED[host]})` : " — NOT ALLOWED"}`);
    }
    assert.deepEqual(offenders, [], `scripts calling off-network:\n${offenders.join("\n")}`);
  });

  // Structured data carries URLs too. schema.org is a vocabulary name, not
  // a destination, and sameAs is the one field whose whole job is to name
  // an entity's profiles elsewhere — it is a statement about identity, not
  // a link a reader or a crawler follows off the page.
  test("structured data names no third party except through sameAs", () => {
    const offenders = [];
    const sameAs = [];
    const media = [];
    for (const p of pages()) {
      for (const [, json] of p.text.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
        let data;
        try {
          data = JSON.parse(json);
        } catch (err) {
          assert.fail(`${p.app}${p.url}: unparseable JSON-LD (${err.message})`);
        }
        const visit = (value, field) => {
          if (typeof value === "string" && /^https?:\/\//i.test(value)) {
            let host;
            try {
              host = new URL(value).host;
            } catch {
              return;
            }
            if (isNetworkHost(host) || host === "schema.org") return;
            if (field === "sameAs") sameAs.push(`${p.app}${p.url} -> ${value}`);
            else if (MEDIA_FIELDS.has(field) && ALLOWED[host]) media.push(`${p.app}${p.url} -> ${value}`);
            else offenders.push(`${p.app}${p.url}: ${field} -> ${value}`);
          } else if (Array.isArray(value)) value.forEach((v) => visit(v, field));
          else if (value && typeof value === "object") for (const k of Object.keys(value)) visit(value[k], k);
        };
        visit(data, "$");
      }
    }
    for (const s of sameAs) console.log(`  sameAs: ${s}`);
    for (const m of media) console.log(`  media: ${m}`);
    assert.deepEqual(offenders, [], `third-party URLs in structured data:\n${offenders.join("\n")}`);
  });
});
