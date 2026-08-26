// The shape of the link graph between the seven hosts.
//
// The graph used to run one way: every vertical linked to the hub from
// every page, and the hub linked back two to four times from its home page
// only. Everything flowed inward to dst.llc, which is one reason the hub
// held its place in search while the verticals did not. These checks keep
// the traffic flowing both ways, keep the curated deep links pointing at
// pages that exist, and keep eco out of the cross-linking entirely.
//
//   npm run build && node --test tests/network-links.test.js
import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HOSTS = {
  dst: "dst.llc",
  llc: "llc.dst.llc",
  visas: "visas.dst.llc",
  riviera: "riviera.dst.llc",
  mbr: "mbr.dst.llc",
  palmcentral: "palmcentral.dst.llc",
  eco: "eco.dst.llc",
};
const APPS = Object.keys(HOSTS);
const appOfHost = (host) => APPS.find((a) => HOSTS[a] === host);

/** Cross-host links: { from, fromUrl, to, toPath } */
const links = [];
const built = new Map(APPS.map((a) => [a, new Set()]));

before(async () => {
  for (const app of APPS) {
    const dist = path.join(REPO, "apps", app, "dist");
    assert.ok(existsSync(dist), `apps/${app}/dist is missing — run "npm run build" first`);
    const files = [];
    for (const e of await readdir(dist, { recursive: true, withFileTypes: true })) {
      if (!e.isFile() || e.name !== "index.html") continue;
      const file = path.join(e.parentPath ?? e.path, e.name);
      const url = "/" + path.relative(dist, file).replace(/index\.html$/, "");
      built.get(app).add(url);
      if (!url.startsWith("/go/")) files.push({ url, html: readFileSync(file, "utf8") });
    }
    for (const { url, html } of files) {
      for (const [, href] of html.matchAll(/<a\s[^>]*href="(https?:\/\/[^"]+)"/g)) {
        let target;
        try {
          target = new URL(href);
        } catch {
          continue;
        }
        const to = appOfHost(target.hostname);
        if (!to || to === app) continue;
        links.push({ from: app, fromUrl: url, to, toPath: target.pathname });
      }
    }
  }
  assert.ok(links.length > 50, `expected a linked network, found ${links.length} cross-host links`);
});

const inbound = (app) => links.filter((l) => l.to === app);

describe("the network link graph", () => {
  // eco is deliberately outside this: it links to dst.llc and back and to
  // no vertical, because an environmental record has nothing to do with
  // visas or off-plan property.
  const VERTICALS = ["llc", "visas", "riviera", "mbr", "palmcentral"];

  test("every vertical is linked to from the rest of the network, not just linking out", () => {
    for (const app of VERTICALS) {
      const to = inbound(app);
      const deep = to.filter((l) => l.toPath !== "/");
      const sources = new Set(to.map((l) => l.from));
      assert.ok(to.length >= 10, `${app}: only ${to.length} inbound cross-host links`);
      assert.ok(deep.length >= 5, `${app}: only ${deep.length} of ${to.length} inbound links reach an inner page`);
      assert.ok(sources.size >= 2, `${app}: linked from only ${[...sources]}`);
    }
    for (const app of VERTICALS) {
      const to = inbound(app);
      console.log(`  ${app.padEnd(12)} ${String(to.length).padStart(3)} inbound, ${to.filter((l) => l.toPath !== "/").length} deep, from ${new Set(to.map((l) => l.from)).size} sites`);
    }
  });

  test("the hub points at every site in the network", () => {
    const fromHub = new Set(links.filter((l) => l.from === "dst").map((l) => l.to));
    for (const app of APPS.filter((a) => a !== "dst")) {
      assert.ok(fromHub.has(app), `dst.llc links to nothing on ${HOSTS[app]}`);
    }
    const deepFromHub = links.filter((l) => l.from === "dst" && l.toPath !== "/");
    assert.ok(deepFromHub.length >= 10, `the hub reaches only ${deepFromHub.length} inner pages network-wide`);
  });

  test("eco stays out of the cross-linking", () => {
    const ecoLinks = links.filter((l) => l.from === "eco" || l.to === "eco");
    const strays = ecoLinks.filter((l) => (l.from === "eco" ? l.to !== "dst" : l.from !== "dst"));
    assert.deepEqual(
      strays.map((l) => `${l.from}${l.fromUrl} -> ${HOSTS[l.to]}${l.toPath}`),
      [],
      "eco links only to dst.llc and is linked only from it",
    );
  });

  // A curated deep link is written by hand and rots by hand: rename a page
  // and the link survives the build, pointing at a 404 on another host.
  test("every cross-host link points at a page that exists", () => {
    const broken = links
      .filter((l) => !built.get(l.to).has(l.toPath))
      .map((l) => `${l.from}${l.fromUrl} -> ${HOSTS[l.to]}${l.toPath}`);
    assert.deepEqual([...new Set(broken)], [], `cross-host links with no target:\n${broken.join("\n")}`);
  });
});
