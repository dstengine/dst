// Assertions over the built HTML in each app's dist/. Every case here is a
// bug that actually shipped at some point — the comment on each one says
// which, so a failure tells you what regressed rather than just what broke.
//
//   npm run build && node --test tests/build-output.test.js
import { test, describe, before } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { allNews } from "../packages/content/src/news/index.ts";
import { allEvents } from "../packages/content/src/events/index.ts";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Apps, and the host each one is served from. */
const SITES = [
  { app: "dst", host: "dst.llc" },
  { app: "llc", host: "llc.dst.llc" },
  { app: "visas", host: "visas.dst.llc" },
  { app: "riviera", host: "riviera.dst.llc" },
  { app: "mbr", host: "mbr.dst.llc" },
  { app: "palmcentral", host: "palmcentral.dst.llc" },
];
const TITLE_LIMIT = 60;

/** Every built page: { app, url, file, html }. */
const pages = [];

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&middot;/g, "·")
    .replace(/&copy;/g, "©")
    .replace(/&rarr;/g, "→")
    .replace(/&larr;/g, "←")
    .replace(/&mdash;/g, "—");
}

const titleOf = (html) => {
  const m = html.match(/<title>([\s\S]*?)<\/title>/);
  return m ? decode(m[1]).trim() : null;
};
const metaDescOf = (html) => {
  const m = html.match(/<meta name="description" content="([\s\S]*?)"/);
  return m ? decode(m[1]) : null;
};
const anchorsOf = (html) => [...html.matchAll(/<a\s[^>]*>/g)].map((m) => m[0]);
const hrefOf = (tag) => (tag.match(/href="([^"]*)"/) || [])[1];
const imgsOf = (html) => [...html.matchAll(/<img\s[^>]*>/g)].map((m) => m[0]);

before(async () => {
  for (const { app } of SITES) {
    const dist = path.join(REPO, "apps", app, "dist");
    assert.ok(existsSync(dist), `apps/${app}/dist is missing — run "npm run build" first`);
    const entries = await readdir(dist, { recursive: true, withFileTypes: true });
    for (const e of entries) {
      if (!e.isFile() || e.name !== "index.html") continue;
      const file = path.join(e.parentPath ?? e.path, e.name);
      const url = "/" + path.relative(dist, file).replace(/index\.html$/, "");
      pages.push({ app, url, file, html: readFileSync(file, "utf8") });
    }
  }
  assert.ok(pages.length > 30, `expected the whole network to be built, found ${pages.length} pages`);
});

const contentPages = () => pages.filter((p) => !p.url.startsWith("/go/"));

describe("page metadata", () => {
  test("every page has a title, a description and exactly one h1", () => {
    for (const p of contentPages()) {
      const where = `${p.app}${p.url}`;
      assert.ok(titleOf(p.html), `${where}: no <title>`);
      assert.ok(metaDescOf(p.html), `${where}: no meta description`);
      assert.equal((p.html.match(/<h1[\s>]/g) || []).length, 1, `${where}: expected exactly one <h1>`);
    }
  });

  // Titles ran to 92 chars because the page title repeated words already in
  // the site suffix ("… in Dubai — Company Formation in Dubai").
  test(`no title runs past ${TITLE_LIMIT} characters`, () => {
    const over = contentPages()
      .map((p) => ({ where: `${p.app}${p.url}`, title: titleOf(p.html) }))
      .filter((p) => p.title.length > TITLE_LIMIT);
    assert.deepEqual(over, [], `titles over ${TITLE_LIMIT} chars: ${JSON.stringify(over, null, 1)}`);
  });

  // dst.llc rendered "DST — AI, Crypto & Real Estate Ventures — DST": the
  // page title already carried the brand the layout appends. Repeating a
  // word across the separator is fine and often unavoidable ("Coffee in
  // Azizi Riviera — Azizi Riviera Guide"); repeating a whole segment is the
  // bug.
  test("no title repeats a whole segment", () => {
    for (const p of contentPages()) {
      const title = titleOf(p.html);
      const parts = title.split("—").map((s) => s.trim().toLowerCase()).filter(Boolean);
      assert.equal(
        new Set(parts).size,
        parts.length,
        `${p.app}${p.url}: a segment appears twice in "${title}"`,
      );
    }
  });
});

describe("links", () => {
  // Every link got a descriptive title attribute; coverage was 5% before.
  test("every anchor carries a title attribute", () => {
    const missing = [];
    for (const p of contentPages()) {
      for (const tag of anchorsOf(p.html)) {
        // A link to a place on this same page is not a destination anyone
        // needs described, and the one we have — the skip link — would only
        // get a title repeating its own text, which some screen readers then
        // announce twice. Same reason the logos carry alt="".
        if (hrefOf(tag)?.startsWith("#")) continue;
        if (!/\stitle="/.test(tag)) missing.push(`${p.app}${p.url} -> ${hrefOf(tag)}`);
      }
    }
    assert.deepEqual(missing, [], `anchors without title: ${JSON.stringify(missing, null, 1)}`);
  });

  // /financing/ was built and live with no inbound link from anywhere.
  test("no page is orphaned", () => {
    for (const { app } of SITES) {
      const own = pages.filter((p) => p.app === app);
      const linked = new Set();
      for (const p of own) {
        for (const tag of anchorsOf(p.html)) {
          const href = hrefOf(tag);
          if (href?.startsWith("/")) linked.add(href.split("#")[0]);
        }
      }
      const orphans = own
        .map((p) => p.url)
        .filter((url) => url !== "/" && !url.startsWith("/go/") && !linked.has(url));
      assert.deepEqual(orphans, [], `${app}: pages nothing links to: ${orphans.join(", ")}`);
    }
  });

  test("internal links all resolve to a built page", () => {
    const broken = [];
    for (const p of contentPages()) {
      const built = new Set(pages.filter((x) => x.app === p.app).map((x) => x.url));
      for (const tag of anchorsOf(p.html)) {
        const href = hrefOf(tag);
        if (!href?.startsWith("/") || href.startsWith("//")) continue;
        const url = href.split("#")[0];
        if (url.includes(".")) continue; // asset, not a page
        if (!built.has(url)) broken.push(`${p.app}${p.url} -> ${href}`);
      }
    }
    assert.deepEqual(broken, [], `internal links with no target: ${JSON.stringify(broken, null, 1)}`);
  });

  // Links out of the network are checked in tests/outbound-links.test.js,
  // which crawls all seven apps rather than the six listed here.
});

describe("outbound hops", () => {
  test("each /go/ page is noindex and links out with rel=nofollow", () => {
    const hops = pages.filter((p) => p.url.startsWith("/go/"));
    assert.ok(hops.length > 0, "expected at least one /go/ hop to be built");
    for (const hop of hops) {
      assert.match(hop.html, /<meta name="robots" content="noindex, nofollow">/, `${hop.app}${hop.url}: not noindex`);
      assert.match(hop.html, /rel="nofollow noopener external"/, `${hop.app}${hop.url}: outbound link not nofollowed`);
    }
  });

  test("every site's robots.txt disallows /go/", () => {
    for (const { app } of SITES) {
      const robots = path.join(REPO, "apps", app, "dist", "robots.txt");
      assert.ok(existsSync(robots), `apps/${app}: no robots.txt`);
      assert.match(readFileSync(robots, "utf8"), /^Disallow: \/go\/$/m, `apps/${app}: robots.txt does not disallow /go/`);
    }
  });
});

describe("images", () => {
  test("every image has an alt attribute", () => {
    for (const p of contentPages()) {
      for (const tag of imgsOf(p.html)) {
        assert.match(tag, /\salt="/, `${p.app}${p.url}: <img> without alt — ${tag}`);
      }
    }
  });

  // Every content photo here illustrates something specific (a venue, a
  // hero render) rather than sitting next to unrelated text, so alt="" is
  // never correct — it would just drop the image from image search with
  // nothing gained on the accessibility side.
  //
  // aria-hidden is the exception, and it is the same distinction stated the
  // other way: the header and footer marks sit immediately beside the site
  // name, so describing them made the link announce itself twice. An empty
  // alt there is a decision, not an omission — and it has to be declared to
  // count as one.
  test("no content image has an empty alt", () => {
    for (const p of contentPages()) {
      for (const tag of imgsOf(p.html)) {
        if (/aria-hidden="true"/.test(tag)) continue;
        assert.doesNotMatch(tag, /\salt=""/, `${p.app}${p.url}: <img> has an empty alt — ${tag}`);
      }
    }
  });

  // The pair above only holds if a decorative image really is decorative.
  // Anything hidden from assistive technology must be chrome, never a
  // picture the page is about.
  test("only site chrome is hidden from assistive technology", () => {
    for (const p of contentPages()) {
      for (const tag of imgsOf(p.html)) {
        if (!/aria-hidden="true"/.test(tag)) continue;
        const src = (tag.match(/src="([^"]+)"/) || [])[1] ?? "";
        assert.match(
          src,
          /logo/,
          `${p.app}${p.url}: a picture that isn't a logo is hidden from screen readers — ${tag}`,
        );
      }
    }
  });

  // The header art is generated, on a site people use to pick where to rent,
  // so its alt has to say it isn't a photograph of the place.
  test("the generated header image is described as an illustration", () => {
    const home = pages.find((p) => p.app === "riviera" && p.url === "/");
    const alt = (home.html.match(/<img[^>]*src="\/riviera\.jpg"[^>]*alt="([^"]*)"/) || [])[1];
    assert.ok(alt, "riviera home: header image has no alt");
    assert.match(decode(alt), /illustration|generated/i, `riviera home: alt does not flag the image as generated — "${alt}"`);
  });
});

describe("district header image", () => {
  // It was a property of the index page's content, so only the index had it.
  // It belongs to the site: every page gets it unless the page overrides.
  test("riviera's site header image is on every district page", () => {
    // News/event detail pages follow the same pattern as a venue detail
    // page (e.g. /coffee/homebrew/, excluded below too): they render their
    // own single h1 in the body via NewsArticle/EventArticle rather than
    // through DistrictLayout's own header, so there's no site-default
    // image slot on them to begin with — the list pages above them still
    // carry it.
    const districtPages = pages.filter(
      (p) =>
        p.app === "riviera" &&
        !p.url.startsWith("/go/") &&
        !p.url.startsWith("/coffee/homebrew") &&
        !/^\/(news|events)\/[^/]+\/$/.test(p.url),
    );
    assert.ok(districtPages.length >= 9, `expected the full district page set, got ${districtPages.length}`);
    for (const p of districtPages) {
      assert.match(p.html, /src="\/riviera\.jpg"/, `${p.app}${p.url}: missing the site header image`);
    }
  });

  test("a page with its own image overrides the site default", () => {
    const venue = pages.find((p) => p.app === "riviera" && p.url === "/coffee/homebrew/");
    assert.match(venue.html, /src="\/venues\/homebrew\.jpg"/, "venue page lost its own image");
    assert.doesNotMatch(venue.html, /src="\/riviera\.jpg"/, "venue page also got the site default — override failed");
  });

  test("a site with no header image falls back to a plain heading", () => {
    for (const p of pages.filter((x) => x.app === "mbr")) {
      assert.doesNotMatch(p.html, /class="[^"]*photo-hero/, `${p.app}${p.url}: rendered a photo hero without an image`);
    }
  });
});

describe("config", () => {
  // llc and visas shipped with `site` still pointing at .example placeholders,
  // which is what Astro builds absolute URLs from.
  test("no astro.config points at a placeholder domain", () => {
    for (const { app, host } of SITES) {
      const config = readFileSync(path.join(REPO, "apps", app, "astro.config.mjs"), "utf8");
      const site = (config.match(/site:\s*"([^"]+)"/) || [])[1];
      assert.ok(site, `apps/${app}: no site in astro.config.mjs`);
      assert.doesNotMatch(site, /\.example/, `apps/${app}: site is a placeholder — ${site}`);
      assert.equal(new URL(site).host, host, `apps/${app}: site does not match its host`);
    }
  });
});

describe("sitemap", () => {
  const sitemapUrls = (app) => {
    const dir = path.join(REPO, "apps", app, "dist");
    const index = path.join(dir, "sitemap-index.xml");
    assert.ok(existsSync(index), `apps/${app}: no sitemap-index.xml`);
    const urls = [];
    for (let i = 0; existsSync(path.join(dir, `sitemap-${i}.xml`)); i++) {
      const xml = readFileSync(path.join(dir, `sitemap-${i}.xml`), "utf8");
      urls.push(...[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]));
    }
    return urls;
  };

  test("every site ships a sitemap listing exactly its indexable pages", () => {
    for (const { app, host } of SITES) {
      const listed = new Set(sitemapUrls(app).map((u) => new URL(u).pathname));
      const indexable = pages.filter((p) => p.app === app && !p.url.startsWith("/go/")).map((p) => p.url);

      assert.deepEqual(
        indexable.filter((url) => !listed.has(url)),
        [],
        `${app}: built pages missing from the sitemap`,
      );
      assert.deepEqual(
        [...listed].filter((url) => !indexable.includes(url)),
        [],
        `${app}: sitemap lists pages that were not built`,
      );
    }
  });

  // robots.txt disallows /go/; listing a hop in the sitemap would ask Google
  // to crawl the exact thing we just told it to skip.
  test("no sitemap lists a /go/ hop", () => {
    for (const { app } of SITES) {
      const hops = sitemapUrls(app).filter((u) => u.includes("/go/"));
      assert.deepEqual(hops, [], `${app}: outbound hops in the sitemap`);
    }
  });

  test("robots.txt points at a sitemap that exists", () => {
    for (const { app, host } of SITES) {
      const robots = readFileSync(path.join(REPO, "apps", app, "dist", "robots.txt"), "utf8");
      const declared = (robots.match(/^Sitemap:\s*(\S+)$/m) || [])[1];
      assert.ok(declared, `apps/${app}: robots.txt declares no sitemap`);
      assert.equal(new URL(declared).host, host, `apps/${app}: sitemap URL points at the wrong host`);
      const file = path.join(REPO, "apps", app, "dist", new URL(declared).pathname.slice(1));
      assert.ok(existsSync(file), `apps/${app}: robots.txt points at ${declared}, which is not built`);
    }
  });
});

describe("analytics", () => {
  // The tag comes from BaseLayout so the network is measured from one place.
  // Either every site carries it or none does — a site quietly missing it
  // shows up as a hole in the funnel rather than as an error.
  test("the tag is all-or-nothing across the network", () => {
    const tagged = SITES.filter(({ app }) =>
      pages.some((p) => p.app === app && p.url === "/" && p.html.includes("googletagmanager.com/gtag/js")),
    ).map((s) => s.app);
    assert.ok(
      tagged.length === 0 || tagged.length === SITES.length,
      `analytics is on some sites but not others: ${tagged.join(", ") || "(none)"}`,
    );
  });

  // Search Console's ownership check scans the markup for a literal
  // gtag('config', 'G-…'). Passing the id as a variable — which is what
  // Astro's define:vars forces — makes it report finding no Analytics code
  // at all, and verification fails.
  test("the config call carries a literal measurement id", () => {
    const home = pages.find((p) => p.app === "riviera" && p.url === "/");
    const loader = home.html.match(/gtag\/js\?id=(G-[A-Z0-9]+)/);
    if (!loader) return; // no measurement ID configured in this build
    assert.match(
      home.html,
      new RegExp(`gtag\\(\\s*['"]config['"]\\s*,\\s*['"]${loader[1]}['"]`),
      "config call does not use a literal measurement id",
    );
  });

  // Redirect hops are noindex and exist only to bounce the visitor onward.
  // Tagging them would book a pageview for a page nobody sees.
  test("redirect hops are never tagged", () => {
    for (const hop of pages.filter((p) => p.url.startsWith("/go/"))) {
      assert.doesNotMatch(hop.html, /googletagmanager/, `${hop.app}${hop.url}: analytics on a redirect hop`);
    }
  });
});

describe("structured data", () => {
  test("every JSON-LD block parses and is typed", () => {
    for (const p of contentPages()) {
      for (const m of p.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
        let data;
        assert.doesNotThrow(() => (data = JSON.parse(m[1])), `${p.app}${p.url}: JSON-LD does not parse`);
        for (const block of [data].flat()) {
          assert.ok(block["@context"], `${p.app}${p.url}: JSON-LD without @context`);
          // The page graph holds its typed nodes in @graph; a standalone
          // block is typed at the top level.
          for (const n of block["@graph"] ?? [block]) {
            assert.ok(n["@type"], `${p.app}${p.url}: JSON-LD node without @type`);
          }
        }
      }
    }
  });
});

// News/events-specific checks, scoped to their own site list rather than
// the shared SITES above. `pages`/`contentPages()` above
// deliberately exclude eco (adding it would newly apply unrelated
// pre-existing checks — e.g. "every anchor carries a title attribute" —
// to eco's existing portfolio pages, which is out of scope here). This
// block builds its own local page set covering all 7 sites instead.
describe("news and events", () => {
  const NEWS_EVENTS_SITES = [...SITES, { app: "eco", host: "eco.dst.llc" }];
  const NEWS_EVENTS_HOSTS = NEWS_EVENTS_SITES.map((s) => s.host);

  /** Every built page across all 7 sites, including eco. */
  const nePages = [];

  before(async () => {
    for (const { app } of NEWS_EVENTS_SITES) {
      const dist = path.join(REPO, "apps", app, "dist");
      assert.ok(existsSync(dist), `apps/${app}/dist is missing — run "npm run build" first`);
      const entries = await readdir(dist, { recursive: true, withFileTypes: true });
      for (const e of entries) {
        if (!e.isFile() || e.name !== "index.html") continue;
        const file = path.join(e.parentPath ?? e.path, e.name);
        const url = "/" + path.relative(dist, file).replace(/index\.html$/, "");
        nePages.push({ app, url, file, html: readFileSync(file, "utf8") });
      }
    }
  });

  const isNewsOrEventDetail = (p) => /^\/(news|events)\/[^/]+\/$/.test(p.url);
  const isNewsOrEventList = (p) => p.url === "/news/" || p.url === "/events/";
  const neDetailPages = () => nePages.filter(isNewsOrEventDetail);

  test("news/event detail pages carry no direct external link except through /go/", () => {
    // Scoped to the <article> content itself, not the whole page — the
    // header/footer chrome (e.g. eco's Instagram icon) is shared,
    // pre-existing site furniture unrelated to this feature, not something
    // this pass is responsible for routing through /go/.
    const direct = [];
    for (const p of neDetailPages()) {
      const m = p.html.match(/<article[^>]*>[\s\S]*?<\/article>/);
      if (!m) continue;
      for (const tag of anchorsOf(m[0])) {
        const href = hrefOf(tag);
        if (!href?.startsWith("http")) continue;
        const host = new URL(href).host;
        if (!NEWS_EVENTS_HOSTS.includes(host)) direct.push(`${p.app}${p.url} -> ${href}`);
      }
    }
    assert.deepEqual(direct, [], `direct outbound links inside a news/event article body (should route through /go/): ${JSON.stringify(direct, null, 1)}`);
  });

  test("a news/event JSON-LD block is typed NewsArticle/Article for news and Event for events, with the minimum fields for that type", () => {
    for (const p of neDetailPages()) {
      const isEvent = p.url.startsWith("/events/");
      for (const m of p.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
        let data;
        assert.doesNotThrow(() => (data = JSON.parse(m[1])), `${p.app}${p.url}: JSON-LD does not parse`);
        const blocks = [data].flat().filter((b) => (isEvent ? b["@type"] === "Event" : b["@type"] === "NewsArticle" || b["@type"] === "Article"));
        if (blocks.length === 0) continue; // some other JSON-LD block (e.g. from the layout) — not this page's item block
        for (const block of blocks) {
          if (isEvent) {
            assert.ok(block.name, `${p.app}${p.url}: Event JSON-LD missing "name" — ${JSON.stringify(block)}`);
            assert.ok(block.startDate, `${p.app}${p.url}: Event JSON-LD missing "startDate" — ${JSON.stringify(block)}`);
            assert.ok(block.eventStatus, `${p.app}${p.url}: Event JSON-LD missing "eventStatus" — ${JSON.stringify(block)}`);
          } else {
            assert.ok(block.headline, `${p.app}${p.url}: ${block["@type"]} JSON-LD missing "headline" — ${JSON.stringify(block)}`);
            assert.ok(block.datePublished, `${p.app}${p.url}: ${block["@type"]} JSON-LD missing "datePublished" — ${JSON.stringify(block)}`);
          }
        }
      }
    }
  });

  test("a thin item (no body) produced no detail page, and no list page links to a missing slug", () => {
    for (const p of nePages.filter(isNewsOrEventList)) {
      const kind = p.url === "/news/" ? "news" : "events";
      const built = new Set(nePages.filter((x) => x.app === p.app && x.url.startsWith(`/${kind}/`)).map((x) => x.url));
      for (const tag of anchorsOf(p.html)) {
        const href = hrefOf(tag);
        if (!href || !href.startsWith(`/${kind}/`)) continue;
        assert.ok(built.has(href), `${p.app}${p.url}: links to "${href}", which has no built detail page (thin items must not get a link)`);
      }
    }
  });

  test("a site with an empty news/events array renders no block on its homepage", () => {
    for (const { app } of NEWS_EVENTS_SITES) {
      const home = nePages.find((p) => p.app === app && p.url === "/");
      if (!home) continue;
      // Matched on the card markup rather than a list class: the blocks render
      // the same FeedCards as the listings and the article feed, so "the
      // section has something in it" is one check for all of them.
      const section = (cls) => {
        const start = home.html.indexOf(`<section class="container ${cls}"`);
        if (start === -1) return null;
        return home.html.slice(start, start + 8000);
      };
      const newsSection = section("news-block");
      const eventsSection = section("events-block");
      const hasNewsSection = newsSection !== null;
      const hasEventsSection = eventsSection !== null;
      const hasNewsList = hasNewsSection && /class="feed-card[ "]/.test(newsSection);
      const hasEventsList = hasEventsSection && /class="feed-card[ "]/.test(eventsSection);
      console.log(`${app} homepage: news-block=${hasNewsSection} events-block=${hasEventsSection}`);
      // The components themselves already guarantee "empty array -> no
      // markup" (unit-testable in isolation); this just confirms the real
      // per-site data feeding the homepage doesn't accidentally contradict
      // that — a site whose homepage shows a block must have at least one
      // item behind it.
      if (hasNewsSection) assert.ok(hasNewsList, `${app}: homepage shows a news-block section with no list markup inside it`);
      if (hasEventsSection) assert.ok(hasEventsList, `${app}: homepage shows an events-block section with no list markup inside it`);
    }
  });

  test("a detail page with no image/geo/form leaves no empty wrapper behind", () => {
    for (const p of neDetailPages()) {
      assert.doesNotMatch(p.html, /<figure class="(news|event)-article-figure">\s*<\/figure>/, `${p.app}${p.url}: empty figure wrapper with no image`);
      assert.doesNotMatch(p.html, /<section class="locate">\s*<h2>Locate<\/h2>\s*<div class="locate-map">\s*<\/div>\s*<\/section>/, `${p.app}${p.url}: empty locate/map wrapper`);
      if (!/class="locate"/.test(p.html)) {
        assert.doesNotMatch(p.html, /Locate<\/h2>/, `${p.app}${p.url}: "Locate" heading present without the locate section`);
      }
      assert.doesNotMatch(p.html, /<section class="(news|event)-article-form">\s*<\/section>/, `${p.app}${p.url}: empty form wrapper`);
    }
  });

  test("source, when present, is rendered as plain text, never as a link to source.url", () => {
    for (const p of neDetailPages()) {
      const m = p.html.match(/Source:\s*([^<]+)</);
      if (!m) continue;
      // If a "Source: X" line exists, X must not itself be wrapped in an <a>
      // pointing at an external URL right next to it — the audit-trail URL
      // must never reach rendered HTML at all.
      assert.doesNotMatch(p.html.slice(p.html.indexOf("Source:") - 50, p.html.indexOf("Source:") + 200), /<a\s[^>]*href="https?:\/\//, `${p.app}${p.url}: source line appears to carry a live external link`);
    }
  });

  // The verified date is the one thing here no competing site publishes —
  // it was collected in the data for a while but rendered nowhere, which is
  // exactly the kind of silent regression worth a test.
  test("an item whose source carries verifiedOn renders that date", () => {
    const withDate = [...allNews, ...allEvents].filter((i) => i.source?.verifiedOn && i.body?.length);
    assert.ok(withDate.length > 0, "expected at least one item with a verified date to exercise this");
    for (const item of withDate) {
      const kind = "date" in item ? "news" : "events";
      const page = neDetailPages().find((p) => p.url === `/${kind}/${item.slug}/`);
      if (!page) continue;
      assert.match(
        page.html,
        /class="source-line-checked"/,
        `${page.app}${page.url}: source has verifiedOn=${item.source.verifiedOn} but the page renders no verified date`,
      );
      assert.match(
        page.html,
        new RegExp(`<time datetime="${item.source.verifiedOn}"`),
        `${page.app}${page.url}: verified date is not marked up as <time datetime="${item.source.verifiedOn}">`,
      );
    }
  });

  // A render presented as a photograph is the default failure mode of this
  // market; if a kind is declared, the page has to say so in visible text.
  test("a declared image kind is stated in the visible caption", () => {
    // No entry for "generated": that kind is deliberately left uncaptioned.
    const LABEL = { photo: "Photograph", diagram: "Diagram", illustration: "Illustration", render: "Render" };
    for (const item of [...allNews, ...allEvents].filter((i) => LABEL[i.imageKind] && i.body?.length)) {
      const kind = "date" in item ? "news" : "events";
      const page = neDetailPages().find((p) => p.url === `/${kind}/${item.slug}/`);
      if (!page) continue;
      assert.ok(
        decode(page.html).includes(LABEL[item.imageKind]),
        `${page.app}${page.url}: imageKind="${item.imageKind}" but the caption never says "${LABEL[item.imageKind]}"`,
      );
    }
  });

  // A page still presenting a finished event as upcoming is how these
  // listings rot. The build can't know the date, so the flag ships hidden
  // and a script reveals it — meaning the markup has to be there for every
  // event, not just the ones already past at build time.
  test("every event page ships the ended flag for the script to reveal", () => {
    for (const item of allEvents.filter((e) => e.body?.length)) {
      const page = neDetailPages().find((p) => p.url === `/events/${item.slug}/`);
      if (!page) continue;
      const last = item.end ?? item.start;
      assert.match(
        page.html,
        new RegExp(`data-event-ended[^>]*datetime="${last}"`),
        `${page.app}${page.url}: no ended flag carrying the event's last day (${last})`,
      );
      assert.match(page.html, /data-event-ended[^>]*hidden/, `${page.app}${page.url}: ended flag is not hidden by default`);
    }
  });

  test("an event with an outcome renders it, and one without leaves no empty block", () => {
    for (const item of allEvents.filter((e) => e.body?.length)) {
      const page = neDetailPages().find((p) => p.url === `/events/${item.slug}/`);
      if (!page) continue;
      const has = Array.isArray(item.outcome) && item.outcome.length > 0;
      if (has) {
        assert.match(page.html, /class="event-article-outcome"/, `${page.app}${page.url}: outcome set but not rendered`);
        assert.ok(decode(page.html).includes(item.outcome[0].slice(0, 40)), `${page.app}${page.url}: outcome text missing`);
      } else {
        assert.doesNotMatch(page.html, /What happened<\/h2>/, `${page.app}${page.url}: "What happened" heading with no outcome behind it`);
      }
    }
  });

  // Broader than the check above: source.url must not leak anywhere in the
  // page at all, not just next to the "Source:" line — this caught a real
  // bug where NewsArticle's auto-built JSON-LD put it in `isBasedOn`.
  test("source.url never appears anywhere in a news/event page's HTML", () => {
    const sourceUrls = [...allNews, ...allEvents].map((item) => item.source?.url).filter(Boolean);
    for (const p of neDetailPages()) {
      for (const url of sourceUrls) {
        assert.ok(!p.html.includes(url), `${p.app}${p.url}: contains a source.url that should only ever be an audit trail — ${url}`);
      }
    }
  });
});
