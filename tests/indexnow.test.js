// tools/indexnow.mjs tells the IndexNow engines which pages moved. These
// hold the two things that can go quietly wrong: a host whose key file and
// key map have drifted apart (the engine then rejects every URL of that
// host with a 403, and nothing on our side notices), and the arithmetic
// of what to send — which is run here over histories that never happened,
// with no network.
//
//   node --test tests/indexnow.test.js
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { HOSTS, appOfHost } from "../tools/hosts.mjs";
import { plan, ready, parseUrlset, newKey, MEANING } from "../tools/indexnow.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const keys = JSON.parse(readFileSync(path.join(REPO, "tools/indexnow-keys.json"), "utf8"));
const KEY = /^[A-Za-z0-9-]{8,128}$/;

describe("keys", () => {
  test("every host has a key the protocol accepts", () => {
    for (const host of Object.values(HOSTS)) {
      assert.ok(keys[host], `${host}: no key — node tools/indexnow.mjs --new-key ${appOfHost(host)}`);
      assert.match(keys[host], KEY, `${host}: key is not 8–128 of [A-Za-z0-9-]`);
    }
  });

  test("no key names a host that is not in hosts.mjs", () => {
    const known = new Set(Object.values(HOSTS));
    for (const host of Object.keys(keys)) assert.ok(known.has(host), `${host} is in indexnow-keys.json but not in tools/hosts.mjs`);
  });

  test("each key file is in its site's public/ and holds its key", () => {
    for (const [host, key] of Object.entries(keys)) {
      const file = path.join(REPO, "apps", appOfHost(host), "public", `${key}.txt`);
      assert.ok(existsSync(file), `${host}: apps/${appOfHost(host)}/public/${key}.txt is missing`);
      assert.equal(readFileSync(file, "utf8").trim(), key, `${host}: ${file} does not hold the key`);
    }
  });

  // The key file is public, and the sites are meant to look unrelated.
  test("no two hosts share a key", () => {
    const seen = new Map();
    for (const [host, key] of Object.entries(keys)) {
      assert.ok(!seen.has(key), `${host} and ${seen.get(key)} share a key`);
      seen.set(key, host);
    }
  });

  test("a new key is one the protocol accepts, and never the same twice", () => {
    const a = newKey();
    assert.match(a, KEY);
    assert.notEqual(a, newKey());
  });
});

describe("plan", () => {
  const lastmod = {
    "tick.am": {
      "/": "2026-10-19T11:45:00+04:00",
      "/about/": "2026-10-17T19:14:56+04:00",
      "/new/": "2026-10-20T10:00:00+04:00",
    },
    "lnd.lol": { "/": "2026-10-01T00:00:00+04:00" },
  };

  test("a first run owes everything", () => {
    const p = plan({ lastmod, sent: {} });
    assert.deepEqual(Object.keys(p).sort(), ["lnd.lol", "tick.am"]);
    assert.equal(p["tick.am"].changed.length, 3);
    assert.deepEqual(p["tick.am"].gone, []);
  });

  test("a page already told at its current date owes nothing", () => {
    const sent = { "tick.am": { "/": "2026-10-19T11:45:00+04:00", "/about/": "2026-10-17T19:14:56+04:00", "/new/": "2026-10-20T10:00:00+04:00" } };
    assert.deepEqual(plan({ lastmod, sent, hosts: ["tick.am"] }), {});
  });

  test("the same instant in another zone is the same date", () => {
    const sent = { "tick.am": { "/": "2026-10-19T07:45:00.000Z", "/about/": "2026-10-17T15:14:56.000Z", "/new/": "2026-10-20T06:00:00.000Z" } };
    assert.deepEqual(plan({ lastmod, sent, hosts: ["tick.am"] }), {});
  });

  test("a moved date, a new page and a gone page are each owed", () => {
    const sent = { "tick.am": { "/": "2026-10-18T00:00:00+04:00", "/about/": "2026-10-17T19:14:56+04:00", "/old/": "2026-09-01T00:00:00+04:00" } };
    const p = plan({ lastmod, sent, hosts: ["tick.am"] })["tick.am"];
    assert.deepEqual(p.changed.map((c) => c.url), ["/", "/new/"]);
    assert.deepEqual(p.gone, ["/old/"]);
  });

  test("--all ignores what was told", () => {
    const sent = { "tick.am": { "/": "2026-10-19T11:45:00+04:00", "/about/": "2026-10-17T19:14:56+04:00", "/new/": "2026-10-20T10:00:00+04:00" } };
    assert.equal(plan({ lastmod, sent, hosts: ["tick.am"], all: true })["tick.am"].changed.length, 3);
  });

  test("hosts are taken as given, so one site can be pinged alone", () => {
    assert.deepEqual(Object.keys(plan({ lastmod, sent: {}, hosts: ["lnd.lol"] })), ["lnd.lol"]);
  });
});

describe("ready", () => {
  const owed = {
    changed: [
      { url: "/", date: "2026-10-19T11:45:00+04:00" },
      { url: "/about/", date: "2026-10-17T19:14:56+04:00" },
      { url: "/new/", date: "2026-10-20T10:00:00+04:00" },
    ],
    gone: ["/old/", "/older/"],
  };
  const live = new Map([
    ["/", "2026-10-19T07:45:00.000Z"], // the same instant: deployed
    ["/about/", "2026-10-10T00:00:00.000Z"], // older: the deploy has not landed
    ["/old/", "2026-09-01T00:00:00.000Z"], // still served, so not gone yet
    // /new/ is not listed: not deployed. /older/ is not listed: gone.
  ]);

  test("sends what production already serves at the recorded date", () => {
    const r = ready(owed, live);
    assert.deepEqual(r.send.map((s) => s.url), ["/"]);
    assert.deepEqual(r.held.map((s) => s.url), ["/about/", "/new/"]);
  });

  test("reports a page gone only once the sitemap has dropped it", () => {
    const r = ready(owed, live);
    assert.deepEqual(r.dropped, ["/older/"]);
    assert.deepEqual(r.kept, ["/old/"]);
  });

  test("a page the live sitemap lists without a date is not ready", () => {
    const r = ready({ changed: [{ url: "/", date: "2026-10-19T11:45:00+04:00" }], gone: [] }, new Map([["/", null]]));
    assert.deepEqual(r.send, []);
    assert.equal(r.held.length, 1);
  });

  test("a later live date still counts as deployed", () => {
    const r = ready({ changed: [{ url: "/", date: "2026-10-19T11:45:00+04:00" }], gone: [] }, new Map([["/", "2026-10-21T00:00:00.000Z"]]));
    assert.deepEqual(r.send.map((s) => s.url), ["/"]);
  });
});

describe("parseUrlset", () => {
  test("reads path and lastmod out of a urlset, undated pages as null", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://tick.am/</loc><lastmod>2026-10-19T07:45:00.000Z</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url><url><loc>https://tick.am/go/x/</loc><changefreq>monthly</changefreq></url></urlset>`;
    const m = parseUrlset(xml);
    assert.equal(m.get("/"), "2026-10-19T07:45:00.000Z");
    assert.equal(m.get("/go/x/"), null);
    assert.equal(m.size, 2);
  });
});

test("every status the protocol documents has a meaning here", () => {
  for (const code of [200, 202, 400, 403, 422, 429]) assert.ok(MEANING[code], `${code} has no meaning`);
});
