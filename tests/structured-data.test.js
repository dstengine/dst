// The graph every page carries: who published it, which site it belongs
// to, where it sits, and when it last changed.
//
// Before this existed the network's markup described individual events and
// news items and never said who published them — seven hosts each looking
// like an unowned site. These checks keep the graph present, consistent
// across hosts, and honest about dates.
//
//   npm run build && node --test tests/structured-data.test.js
import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const APPS = ["dst", "llc", "visas", "riviera", "mbr", "palmcentral", "eco", "fwf"];
const ORGANIZATION_ID = "https://dst.llc/#organization";

/** Every built page: { app, url, canonical, html, blocks, graph } */
const pages = [];

const attr = (html, re) => (html.match(re) || [])[1];

before(async () => {
  for (const app of APPS) {
    const dist = path.join(REPO, "apps", app, "dist");
    assert.ok(existsSync(dist), `apps/${app}/dist is missing — run "npm run build" first`);
    for (const e of await readdir(dist, { recursive: true, withFileTypes: true })) {
      if (!e.isFile() || e.name !== "index.html") continue;
      const file = path.join(e.parentPath ?? e.path, e.name);
      const url = "/" + path.relative(dist, file).replace(/index\.html$/, "");
      if (url.startsWith("/go/")) continue;
      const html = readFileSync(file, "utf8");
      const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) =>
        JSON.parse(m[1]),
      );
      const graph = blocks.find((b) => Array.isArray(b["@graph"]));
      pages.push({
        app,
        url,
        html,
        blocks,
        graph,
        canonical: attr(html, /<link rel="canonical" href="([^"]*)"/),
      });
    }
  }
  console.log(`${pages.length} pages across ${APPS.length} apps`);
});

const node = (page, type) => page.graph?.["@graph"].find((n) => n["@type"] === type);

describe("the network graph", () => {
  test("every page names the same organization as its publisher", () => {
    for (const p of pages) {
      const where = `${p.app}${p.url}`;
      assert.ok(p.graph, `${where}: no @graph block`);
      const org = node(p, "Organization");
      assert.ok(org, `${where}: no Organization node`);
      assert.equal(org["@id"], ORGANIZATION_ID, `${where}: organization has a different @id`);
      const site = node(p, "WebSite");
      assert.ok(site, `${where}: no WebSite node`);
      assert.equal(site.publisher?.["@id"], ORGANIZATION_ID, `${where}: site names no publisher`);
    }
  });

  test("the page node matches the page it is on", () => {
    for (const p of pages) {
      const webpage = node(p, "WebPage");
      assert.ok(webpage, `${p.app}${p.url}: no WebPage node`);
      assert.equal(webpage.url, p.canonical, `${p.app}${p.url}: WebPage url differs from the canonical`);
    }
  });

  // Crawlers build the breadcrumb trail in the results page from this, and
  // from the raw URL when it is missing — which on a vertical means the
  // bare hostname.
  test("every page below the home page carries breadcrumbs that lead to it", () => {
    const deep = pages.filter((p) => p.url !== "/");
    assert.ok(deep.length > 50, `expected the network's inner pages, found ${deep.length}`);
    for (const p of deep) {
      const where = `${p.app}${p.url}`;
      const crumbs = node(p, "BreadcrumbList");
      assert.ok(crumbs, `${where}: no BreadcrumbList`);
      const items = crumbs.itemListElement;
      assert.deepEqual(
        items.map((i) => i.position),
        items.map((_, i) => i + 1),
        `${where}: breadcrumb positions are not 1..n`,
      );
      assert.equal(items.at(-1).item, p.canonical, `${where}: the last crumb is not this page`);
      assert.match(items[0].item, /^https:\/\/[^/]+\/$/, `${where}: the first crumb is not a site home`);
      for (const item of items) {
        assert.ok(item.name?.trim(), `${where}: a crumb has no name`);
      }
    }
    console.log(`  ${deep.length} inner pages, all with a full trail`);
  });

  test("home pages carry no breadcrumbs", () => {
    for (const p of pages.filter((p) => p.url === "/")) {
      assert.equal(node(p, "BreadcrumbList"), undefined, `${p.app}: home page has a one-item breadcrumb`);
    }
  });

  // A relative URL in JSON-LD resolves against nothing — the block is read
  // out of the page, not in it. This shipped once as offers.url = "/go/…".
  test("every URL in structured data is absolute", () => {
    const relative = [];
    for (const p of pages) {
      const visit = (value, field) => {
        if (typeof value === "string") {
          if (/^\//.test(value)) relative.push(`${p.app}${p.url}: ${field} = ${value}`);
        } else if (Array.isArray(value)) value.forEach((v) => visit(v, field));
        else if (value && typeof value === "object") for (const k of Object.keys(value)) visit(value[k], k);
      };
      p.blocks.forEach((b) => visit(b, "$"));
    }
    assert.deepEqual(relative, [], `relative URLs in structured data:\n${relative.join("\n")}`);
  });

  test("an article or event block names its publisher and its page", () => {
    const items = pages.flatMap((p) =>
      p.blocks
        .filter((b) => ["NewsArticle", "Article", "Event"].includes(b["@type"]))
        .map((b) => ({ p, b })),
    );
    assert.ok(items.length > 10, `expected the feed's item pages, found ${items.length}`);
    for (const { p, b } of items) {
      const where = `${p.app}${p.url} (${b["@type"]})`;
      assert.equal(b.publisher?.["@id"], ORGANIZATION_ID, `${where}: no publisher`);
      assert.equal(b.mainEntityOfPage?.["@id"], `${p.canonical}#webpage`, `${where}: not tied to its page`);
    }
    console.log(`  ${items.length} article and event blocks, all attributed`);
  });
});

describe("share pictures", () => {
  test("every page has an og:image that exists", () => {
    for (const p of pages) {
      const image = attr(p.html, /<meta property="og:image" content="([^"]*)"/);
      assert.ok(image, `${p.app}${p.url}: no og:image`);
      assert.match(image, /^https:\/\//, `${p.app}${p.url}: og:image is not absolute`);
      const file = path.join(REPO, "apps", p.app, "dist", new URL(image).pathname);
      assert.ok(existsSync(file), `${p.app}${p.url}: og:image ${image} is not in dist`);
    }
  });

  test("every site ships its own share card", () => {
    for (const app of APPS) {
      const card = path.join(REPO, "apps", app, "dist", "share.png");
      assert.ok(existsSync(card), `apps/${app}: no share.png — run "node tools/share-cards.mjs"`);
    }
  });
});

describe("freshness", () => {
  test("every sitemap entry carries a lastmod that is a real date in the past", () => {
    const now = Date.now();
    let entries = 0;
    for (const app of APPS) {
      const xml = readFileSync(path.join(REPO, "apps", app, "dist", "sitemap-0.xml"), "utf8");
      const urls = [...xml.matchAll(/<url><loc>([^<]+)<\/loc>(?:<lastmod>([^<]+)<\/lastmod>)?/g)];
      assert.ok(urls.length > 0, `apps/${app}: empty sitemap`);
      for (const [, loc, lastmod] of urls) {
        assert.ok(lastmod, `apps/${app}: ${loc} has no lastmod`);
        const t = Date.parse(lastmod);
        assert.ok(!Number.isNaN(t), `apps/${app}: ${loc} has an unparseable lastmod "${lastmod}"`);
        assert.ok(t <= now, `apps/${app}: ${loc} claims a lastmod in the future`);
        entries++;
      }
    }
    console.log(`  ${entries} sitemap entries, all dated`);
  });

  // The failure this guards against is a build that stamps today's date on
  // everything: technically a lastmod, useless as a signal, and it teaches
  // the crawler to disregard the field.
  test("the dates differ between pages", () => {
    const dates = new Set();
    for (const app of APPS) {
      const xml = readFileSync(path.join(REPO, "apps", app, "dist", "sitemap-0.xml"), "utf8");
      for (const [, d] of xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) dates.add(d.slice(0, 10));
    }
    assert.ok(dates.size > 1, `every page in the network claims the same lastmod (${[...dates]})`);
    console.log(`  ${dates.size} distinct dates across the network: ${[...dates].sort().join(", ")}`);
  });

  test("the page's own dateModified agrees with its sitemap entry", () => {
    for (const app of APPS) {
      const xml = readFileSync(path.join(REPO, "apps", app, "dist", "sitemap-0.xml"), "utf8");
      const byUrl = new Map(
        [...xml.matchAll(/<url><loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod>/g)].map(([, loc, d]) => [loc, d]),
      );
      for (const p of pages.filter((p) => p.app === app)) {
        const webpage = node(p, "WebPage");
        const sitemapDate = byUrl.get(p.canonical);
        if (!webpage?.dateModified || !sitemapDate) continue;
        assert.equal(
          Date.parse(webpage.dateModified),
          Date.parse(sitemapDate),
          `${app}${p.url}: dateModified and sitemap lastmod disagree`,
        );
      }
    }
  });
});
