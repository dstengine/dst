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
const NETWORK_HOSTS = SITES.map((s) => s.host);

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

  // Third-party links must run through /go/ so external domains collect no
  // link equity. Network-internal links stay direct on purpose.
  test("third-party links go through /go/, not straight out", () => {
    const direct = [];
    for (const p of contentPages()) {
      for (const tag of anchorsOf(p.html)) {
        const href = hrefOf(tag);
        if (!href?.startsWith("http")) continue;
        const host = new URL(href).host;
        if (!NETWORK_HOSTS.includes(host)) direct.push(`${p.app}${p.url} -> ${href}`);
      }
    }
    assert.deepEqual(direct, [], `direct outbound links: ${JSON.stringify(direct, null, 1)}`);
  });
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
    const districtPages = pages.filter(
      (p) => p.app === "riviera" && !p.url.startsWith("/go/") && !p.url.startsWith("/coffee/homebrew"),
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
          assert.ok(block["@type"], `${p.app}${p.url}: JSON-LD without @type`);
        }
      }
    }
  });
});
