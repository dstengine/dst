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
const APPS = ["dst", "llc", "visas", "riviera", "mbr", "palmcentral", "eco", "fwf", "musical",
  // The five .lol city experiments, each of which publishes itself.
  "nyc42", "ldn", "lnd", "cmx", "mxo"];
const ORGANIZATION_ID = "https://dst.llc/#organization";

// Who each host names as its publisher. Every site says DST unless it is
// deliberately not tied to the group — musical.today publishes itself, and
// the markup has to agree with the footer or one of them is lying. What the
// test still enforces is that a host names one publisher, the same one, on
// every page it serves.
const PUBLISHER = {
  musical: "https://musical.today/#organization",
  nyc42: "https://nyc42.lol/#organization",
  ldn: "https://ldn.lol/#organization",
  lnd: "https://lnd.lol/#organization",
  cmx: "https://cmx.lol/#organization",
  mxo: "https://mxo.lol/#organization",
};
const publisherFor = (app) => PUBLISHER[app] ?? ORGANIZATION_ID;

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
  test("every page names its host's publisher, and names it everywhere", () => {
    for (const p of pages) {
      const where = `${p.app}${p.url}`;
      const expected = publisherFor(p.app);
      assert.ok(p.graph, `${where}: no @graph block`);
      const org = node(p, "Organization");
      assert.ok(org, `${where}: no Organization node`);
      assert.equal(org["@id"], expected, `${where}: organization has a different @id`);
      const site = node(p, "WebSite");
      assert.ok(site, `${where}: no WebSite node`);
      assert.equal(site.publisher?.["@id"], expected, `${where}: site names no publisher`);
    }
  });

  // A site kept out of the group has to be kept out of it here too: naming
  // dst.llc anywhere in the graph would tie it back through the markup.
  test("a site with its own publisher names no other one", () => {
    for (const p of pages.filter((p) => PUBLISHER[p.app])) {
      const json = JSON.stringify(p.blocks);
      assert.ok(!json.includes("dst.llc"), `${p.app}${p.url}: names dst.llc in its structured data`);
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
        .filter((b) => ["NewsArticle", "Article", "Event", "TheaterEvent"].includes(b["@type"]))
        .map((b) => ({ p, b })),
    );
    assert.ok(items.length > 10, `expected the feed's item pages, found ${items.length}`);
    for (const { p, b } of items) {
      const where = `${p.app}${p.url} (${b["@type"]})`;
      assert.equal(b.publisher?.["@id"], publisherFor(p.app), `${where}: no publisher`);
      assert.equal(b.mainEntityOfPage?.["@id"], `${p.canonical}#webpage`, `${where}: not tied to its page`);
    }
    console.log(`  ${items.length} article and event blocks, all attributed`);
  });

  // Who wrote it, which is a different question from who published it, and
  // the one AI search engines weigh. The answer is the organisation on every
  // host — the same @id as the publisher, so the graph gains an edge and not
  // a second entity. It is deliberately not a person: nobody here signs a
  // byline, and inventing a plausible one would be a fabricated credential.
  //
  // The split below is schema.org's, not ours. `author` belongs to
  // CreativeWork, so a WebPage and a NewsArticle can carry one and an Event
  // cannot — an authored Event is markup a validator rejects. An event names
  // its `organizer` instead, which answers the same question truthfully.
  test("every page names the organisation as its author, and never a person", () => {
    for (const p of pages) {
      const page = node(p, "WebPage");
      assert.equal(
        page?.author?.["@id"],
        publisherFor(p.app),
        `${p.app}${p.url}: WebPage names no author, or the wrong one`,
      );
    }

    const articles = pages.flatMap((p) =>
      p.blocks.filter((b) => ["NewsArticle", "Article"].includes(b["@type"])).map((b) => ({ p, b })),
    );
    assert.ok(articles.length > 10, `expected the news pages, found ${articles.length}`);
    for (const { p, b } of articles) {
      assert.equal(
        b.author?.["@id"],
        publisherFor(p.app),
        `${p.app}${p.url}: the article names no author, or the wrong one`,
      );
    }

    // A Person anywhere in the graph would mean someone invented a byline.
    const people = [];
    for (const p of pages) {
      const seen = JSON.stringify(p.blocks);
      if (seen.includes('"Person"')) people.push(`${p.app}${p.url}`);
    }
    assert.deepEqual(people, [], `markup names a Person:\n${people.join("\n")}`);

    const authoredEvents = pages.flatMap((p) =>
      p.blocks
        .filter((b) => ["Event", "TheaterEvent"].includes(b["@type"]) && b.author)
        .map(() => `${p.app}${p.url}`),
    );
    assert.deepEqual(
      authoredEvents,
      [],
      `an Event is not a CreativeWork and cannot carry an author:\n${authoredEvents.join("\n")}`,
    );

    console.log(`  ${pages.length} pages and ${articles.length} articles authored by their own host`);
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

// Structured data is a claim about the page it sits on. The same claim
// repeated across dozens of pages stops being a claim and becomes a
// template — the thing a search engine reads as a doorway. These checks
// exist because sixty run pages once carried the same four answers, one of
// them word for word what the footer already said.
describe("markup that is about this page and not about the template", () => {
  /** Every Q&A published as FAQPage, and where. */
  const answers = () => {
    const seen = new Map();
    for (const p of pages)
      for (const block of p.blocks.filter((b) => b["@type"] === "FAQPage"))
        for (const q of block.mainEntity ?? []) {
          const key = `${q.name} || ${q.acceptedAnswer?.text}`;
          if (!seen.has(key)) seen.set(key, []);
          seen.get(key).push(`${p.app}${p.url}`);
        }
    return seen;
  };

  // Two is the honest maximum: one theatre, two shows, one true answer to
  // "which theatre is it in". Three is already a pattern, and a pattern
  // belongs on the page rather than in the markup — mark it `generic` in the
  // Faq item and it stays visible without being published as a claim.
  test("no FAQ answer is published as markup on more than two pages", () => {
    for (const [key, where] of answers())
      assert.ok(
        where.length <= 2,
        `this answer is in the FAQPage markup of ${where.length} pages — mark it generic:\n  ${key.slice(0, 120)}\n  ${where.slice(0, 3).join(", ")}…`,
      );
  });

  // The footer already says it on every page. Saying it again as a question
  // is a hundred and forty words of nothing, sixty times over.
  test("no FAQ answer repeats the site's own footer note", () => {
    const norm = (s) => s.replace(/<[^>]+>/g, " ").replace(/[^a-z0-9 ]/gi, " ").replace(/\s+/g, " ").trim().toLowerCase();
    const notes = new Map();
    for (const p of pages) {
      const note = norm((p.html.match(/<p class="footer-note"[^>]*>([\s\S]*?)<\/p>/) || [])[1] ?? "");
      if (note) notes.set(p.app, note);
    }
    for (const [key, where] of answers()) {
      const note = notes.get(where[0].split("/")[0]);
      if (!note) continue;
      const answer = norm(key.split(" || ")[1] ?? "");
      // Six words in common is the same sentence rephrased, not a coincidence.
      const words = answer.split(" ");
      const runs = words.map((_, i) => words.slice(i, i + 6).join(" ")).filter((r) => r.split(" ").length === 6);
      const echo = runs.find((r) => note.includes(r));
      assert.ok(!echo, `${where[0]}: an FAQ answer repeats the footer note — "${echo}"`);
    }
  });

  test("no two pages of a site share a title or a meta description", () => {
    for (const app of APPS) {
      for (const what of ["title", "description"]) {
        const seen = new Map();
        for (const p of pages.filter((p) => p.app === app)) {
          const v =
            what === "title"
              ? (p.html.match(/<title>([\s\S]*?)<\/title>/) || [])[1]
              : attr(p.html, /<meta name="description" content="([^"]*)"/);
          if (!v) continue;
          if (!seen.has(v)) seen.set(v, []);
          seen.get(v).push(p.url);
        }
        for (const [v, urls] of seen)
          assert.equal(urls.length, 1, `${app}: ${urls.length} pages share a ${what} — ${urls.slice(0, 3).join(", ")}\n  "${v.slice(0, 90)}"`);
      }
    }
  });
});
