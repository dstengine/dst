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
import { redirects } from "../packages/content/src/redirects.ts";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Apps, and the host each one is served from. */
const SITES = [
  { app: "dst", host: "dst.llc" },
  { app: "llc", host: "llc.dst.llc" },
  { app: "visas", host: "visas.dst.llc" },
  { app: "riviera", host: "riviera.dst.llc" },
  { app: "mbr", host: "mbr.dst.llc" },
  { app: "palmcentral", host: "palmcentral.dst.llc" },
  { app: "fwf", host: "fwf.lol" },
  { app: "musical", host: "musical.today" },
  // The five .lol city experiments — separate sites, checked like the rest.
  { app: "nyc42", host: "nyc42.lol" },
  { app: "sol2go", host: "sol2go.lol" },
  { app: "vien", host: "vien.lol" },
  { app: "ldn", host: "ldn.lol" },
  { app: "lnd", host: "lnd.lol" },
  { app: "cmx", host: "cmx.lol" },
  { app: "mxo", host: "mxo.lol" },
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

// A page that renders no site chrome on purpose, and so is exempt from every
// check that is really a check on the chrome: a title and description, a nav
// with icons, the theme toggle, the district header image.
//
// Two of them, and they are bare for the same reason. A /go/ hop is a
// redirect, not a page. /li/ is the LiveInternet counter on its own address
// — it was pulled out of the shared footer, where it fired on every page of
// fourteen hosts, and giving it back a layout would quietly bring the nav,
// the footer and the analytics snippet along with it. The point of the
// address is to hit the counter without putting it in the template.
//
// Named rather than inlined twice: the district-image test below had already
// grown its own copy of the /go/ string, which is how a third bare page ends
// up exempt in one test and failing in another.
const isBarePage = (url) => url.startsWith("/go/") || url === "/li/";

const contentPages = () => pages.filter((p) => !isBarePage(p.url));

// A field that Astro escapes cannot carry an HTML entity: `&mdash;` written in
// a summary reaches the page as the six literal characters, because Astro has
// escaped the ampersand into `&amp;mdash;` on the way out. It is invisible in
// the source and obvious on the card, and it shipped on four sites before a
// screenshot caught it. The rule: single-line fields (title, cardTitle,
// summary, imageAlt) take the real character; only fields rendered with
// set:html — body, expertise, update text — take entities.
describe("escaped text", () => {
  test("no page prints an HTML entity as literal text", () => {
    const bad = [];
    for (const p of contentPages()) {
      for (const m of p.html.matchAll(/&amp;(?:[a-zA-Z][a-zA-Z0-9]{1,10}|#\d{2,5}|#x[0-9a-fA-F]{2,5});/g)) {
        bad.push(`${p.app}${p.url}: ${m[0]}`);
      }
    }
    assert.deepEqual(bad, [], `an entity was written where the renderer escapes it:\n  ${bad.join("\n  ")}`);
  });
});

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

describe("navigation", () => {
  /** The header nav, both halves of it: the inline row and the drawer that
      replaces it on a phone. Everything else on a page that is marked up as
      a <nav> — breadcrumbs, the jump list — is deliberately not included:
      those are text, and an icon beside every crumb would be noise. */
  const siteNavs = (html) => [...html.matchAll(/<nav class="site-nav[^"]*"[\s\S]*?<\/nav>/g)].map((m) => m[0]);

  // A menu of words is a wall of words. Icons went in so the eye can find
  // the row it wants without reading it, and a nav item added later without
  // one leaves a hole exactly where the eye was trained to look.
  test("every header nav link carries an icon", () => {
    const missing = [];
    for (const p of contentPages()) {
      const navs = siteNavs(p.html);
      assert.ok(navs.length > 0, `${p.app}${p.url}: no site nav`);
      for (const nav of navs) {
        for (const link of nav.match(/<a\s[\s\S]*?<\/a>/g) ?? []) {
          if (!/<svg/.test(link)) missing.push(`${p.app}${p.url} -> ${(link.match(/href="([^"]*)"/) || [])[1]}`);
        }
      }
    }
    assert.deepEqual(missing, [], `nav links without an icon: ${JSON.stringify([...new Set(missing)], null, 1)}`);
  });

  // Both halves have to hold the same menu: the drawer is what a phone gets,
  // and a link that exists only on desktop is a link half the traffic never
  // sees.
  test("the drawer holds the same links as the inline row", () => {
    for (const p of contentPages()) {
      for (const nav of siteNavs(p.html)) {
        const [row, drawer] = [
          nav.slice(0, nav.indexOf("<details")),
          nav.slice(nav.indexOf("<details")),
        ];
        const hrefs = (part) => [...part.matchAll(/<a[^>]*href="([^"]*)"/g)].map((m) => m[1]);
        assert.deepEqual(hrefs(drawer), hrefs(row), `${p.app}${p.url}: the drawer and the inline nav differ`);
      }
    }
  });

  // The wordmark and every menu link get a title, and none of them repeats
  // the word already under the cursor. These are the only tooltips on the
  // site that appear on every page of it, which makes them the cheapest
  // place to say what the site is and the most expensive place to say
  // nothing. The rule caught its own violation: the layout used to fall
  // back to the link's own text, so sixteen of seventeen sites shipped a
  // wordmark whose tooltip read the site name back.
  test("no header link's title repeats its own text", () => {
    const strip = (s) => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();
    const echoes = [];
    const untitled = [];
    for (const p of contentPages()) {
      const header = (p.html.match(/<header class="site-header"[\s\S]*?<\/header>/) || [])[0];
      assert.ok(header, `${p.app}${p.url}: no site header`);
      for (const link of header.match(/<a\s[\s\S]*?<\/a>/g) ?? []) {
        const label = strip(link);
        if (!label) continue; // the Instagram mark is an icon with an aria-label
        const title = (link.match(/title="([^"]*)"/) || [])[1];
        const where = `${p.app}${p.url} -> ${label}`;
        if (title === undefined) untitled.push(where);
        else if (strip(title).toLowerCase() === label.toLowerCase()) echoes.push(where);
      }
    }
    assert.deepEqual(echoes, [], `titles that say the label again: ${JSON.stringify([...new Set(echoes)], null, 1)}`);
    assert.deepEqual(untitled, [], `header links with no title: ${JSON.stringify([...new Set(untitled)], null, 1)}`);
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
      // A noindex page is unlinked on purpose — /go/ hops, and /li/, which
      // carries the LiveInternet counter and is opened by hand.
      const orphans = own
        .filter((p) => !/<meta name="robots" content="noindex/.test(p.html))
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
  // picture the page is about. Two things qualify: the logo marks beside the
  // site name, and the analytics counter in the footer — which is not a
  // picture at all but a 1x1 transparent GIF a script points at a logging
  // endpoint, and has nothing to describe to anybody.
  test("only site chrome is hidden from assistive technology", () => {
    for (const p of contentPages()) {
      for (const tag of imgsOf(p.html)) {
        if (!/aria-hidden="true"/.test(tag)) continue;
        if (/class="[^"]*\bcounter\b/.test(tag)) continue;
        const src = (tag.match(/src="([^"]+)"/) || [])[1] ?? "";
        assert.match(
          src,
          /logo/,
          `${p.app}${p.url}: a picture that isn't a logo is hidden from screen readers — ${tag}`,
        );
      }
    }
  });

  // The counter is exempted above, so it has to actually be the thing that
  // was exempted: invisible, undescribed, and not fetching anything until
  // its script runs.
  test("the analytics counter is an invisible placeholder, not an image", () => {
    for (const p of contentPages()) {
      for (const tag of imgsOf(p.html)) {
        if (!/class="[^"]*\bcounter\b/.test(tag)) continue;
        assert.match(tag, /aria-hidden="true"/, `${p.app}${p.url}: the counter must be hidden from screen readers`);
        assert.match(tag, /\salt=""/, `${p.app}${p.url}: the counter has nothing to describe`);
        assert.match(
          tag,
          /src="data:image\/gif;base64,/,
          `${p.app}${p.url}: the counter must ship as an inert placeholder and be pointed at a host by its script`,
        );
      }
    }
  });

  // A Cats page once credited chicagothemusical.com, and dated the reading
  // to the day Chicago was read rather than the day Cats was. Citing a
  // source that does not cover the page is worse than citing none: it looks
  // like diligence and is the opposite. The domain and the date both have to
  // belong to the show whose page it is.
  //
  // shows.ts is read as text rather than imported: it pulls in its
  // neighbours without file extensions, which Astro resolves and node does
  // not. The three fields wanted here are literals, so a regex over the
  // source is enough and does not need the module to load.
  test("a show's source line cites that show's own site", () => {
    const src = readFileSync("apps/musical/src/data/shows.ts", "utf8");
    const shows = [
      ...src.matchAll(
        /slug: "([a-z-]+)",\s*\n\s*title: "[^"]*",\s*\n\s*officialSlug: "([^"]+)",\s*\n\s*officialDomain: "([^"]+)",/g,
      ),
    ].map(([, slug, officialSlug, officialDomain]) => ({ slug, officialSlug, officialDomain }));
    assert.ok(shows.length >= 2, "could not read the shows' official sites out of shows.ts");
    for (const p of pages) {
      if (p.app !== "musical" || !p.html.includes("Listings read from")) continue;
      const show = shows.find((sh) => p.url.startsWith(`/${sh.slug}/`));
      if (!show) continue;
      const line = p.html.match(/Listings read from[\s\S]{0,400}?<\/p>/)[0];
      assert.ok(
        line.includes(show.officialDomain),
        `musical${p.url}: the source line does not name ${show.officialDomain}`,
      );
      assert.ok(
        line.includes(`/go/${show.officialSlug}/`),
        `musical${p.url}: the source link does not go to ${show.officialSlug}`,
      );
      for (const other of shows)
        if (other.slug !== show.slug)
          assert.ok(
            !line.includes(other.officialDomain),
            `musical${p.url}: cites ${other.officialDomain}, which does not cover this page`,
          );
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
        !isBarePage(p.url) &&
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

  // mbr's district pages each carry their own drawn cover now, so the old
  // form of this test — "mbr renders no photo hero anywhere" — no longer says
  // anything true. What still has to hold is the rule underneath it: the
  // photo hero is the treatment for a page that has a picture, and a page
  // without one gets a plain heading rather than an empty band.
  test("a photo hero appears only where the page has a picture", () => {
    for (const p of pages.filter((x) => x.app === "mbr")) {
      if (!/class="[^"]*photo-hero/.test(p.html)) continue;
      assert.match(p.html, /<img[^>]+src="\/covers\//, `${p.app}${p.url}: rendered a photo hero without an image`);
    }
    const home = pages.find((x) => x.app === "mbr" && x.url === "/");
    assert.doesNotMatch(home.html, /class="[^"]*photo-hero/, "mbr home has no cover of its own and should keep the plain heading");
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

describe("site identity", () => {
  // A site's own name, its title suffix, its language and its publisher used
  // to be spelled inline in each app's Layout.astro — and a new app is made
  // by copying an existing Layout.astro. A copy that keeps a sibling's
  // siteName or lang builds cleanly, passes every other check, and ships the
  // wrong name or the wrong language on every page it has. The strings live
  // in src/site.config.ts now and the layout spreads them, so a copied
  // layout carries no identity to forget to change.
  const OWNED = [
    "siteName", "titleSuffix", "footerSiteName", "lang", "publisher",
    "networkFooter", "partnerDisclosure", "complianceNote", "footerLinks",
    "footerSites", "instagram", "logoSrc",
  ];

  test("every app keeps its identity in site.config.ts, not in its layout", () => {
    for (const { app } of SITES) {
      assert.ok(
        existsSync(path.join(REPO, "apps", app, "src", "site.config.ts")),
        `apps/${app}: no src/site.config.ts`,
      );
      const layout = readFileSync(path.join(REPO, "apps", app, "src", "layouts", "Layout.astro"), "utf8");
      assert.match(layout, /\{\.\.\.site\}/, `apps/${app}: Layout.astro does not spread its site config`);
      for (const prop of OWNED) {
        assert.doesNotMatch(
          layout,
          new RegExp(`\\b${prop}=`),
          `apps/${app}: Layout.astro sets ${prop} itself — that belongs in site.config.ts`,
        );
      }
    }
  });
});

describe("theme", () => {
  // Two halves that have to travel together. The control is only useful if
  // the head script is there to read what it stored, and the head script is
  // only reachable if the control is there to store anything — and neither
  // failure shows up as a broken build, only as a dead button or a flash of
  // the wrong theme on the next page load.
  test("every page carries the toggle and the pre-paint script", () => {
    for (const p of contentPages()) {
      assert.match(p.html, /id="theme-toggle"/, `${p.url}: no theme toggle`);
      assert.match(
        p.html,
        /localStorage\.getItem\("theme"\)/,
        `${p.url}: no pre-paint theme script in the head`,
      );
    }
  });

  // Every site used to spell the light/dark switch out for itself: four
  // blocks in its own theme.css, with the dark triple written twice and the
  // light triple written twice. The switch now lives in tokens.css and a
  // site declares only its two palettes. A site that brings the mechanism
  // back is maintaining it by hand again, and the state nobody checks by eye
  // — an explicit light choice on a dark OS — is the one that breaks, with
  // the accent staying dark while the rest of the page goes light.
  test("each site declares two accent palettes and no switching of its own", () => {
    const NEEDED = [
      "--accent-light", "--accent-ink-light", "--accent-tint-light",
      "--accent-dark", "--accent-ink-dark", "--accent-tint-dark",
    ];
    for (const { app } of SITES) {
      const file = path.join(REPO, "apps", app, "src", "styles", "theme.css");
      const css = readFileSync(file, "utf8");
      for (const name of NEEDED) {
        assert.match(css, new RegExp(`${name}\\s*:`), `apps/${app}: theme.css does not declare ${name}`);
      }
      assert.doesNotMatch(
        css,
        /\[data-theme=/,
        `apps/${app}: theme.css switches themes itself — tokens.css does that for the whole network`,
      );
      assert.doesNotMatch(
        css,
        /--accent(-ink|-tint)?\s*:/,
        `apps/${app}: theme.css sets --accent directly — declare --accent-light / --accent-dark and let tokens.css pick`,
      );
    }
  });

  // The script has to run before the first paint. A module or deferred
  // script is exactly late enough to paint the default theme first.
  test("the pre-paint script is inline and blocking", () => {
    const html = contentPages()[0].html;
    const tag = html.slice(0, html.indexOf('localStorage.getItem("theme")')).lastIndexOf("<script");
    const open = html.slice(tag, html.indexOf(">", tag));
    assert.doesNotMatch(open, /\b(defer|async|type="module")/, `theme script is deferred: ${open}`);
  });
});

describe("page grid", () => {
  // EventsBlock and NewsBlock each render their own <section class="container">.
  // Six home pages wrapped one in a second container anyway, which doubles the
  // gutter — 48px instead of 24px on desktop, 28px instead of 14px on a phone —
  // so the top of the page and the feed under it sat on two different grids.
  // Nothing failed and no test caught it; it just looked slightly off, on six
  // sites at once, until someone measured.
  const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);

  test("no .container sits inside another .container", () => {
    const offenders = [];
    for (const p of contentPages()) {
      // Script and style bodies are not markup; a "<" in either would throw
      // the tag scan off.
      const html = p.html
        .replace(/<script\b[\s\S]*?<\/script>/g, "")
        .replace(/<style\b[\s\S]*?<\/style>/g, "");
      const stack = [];
      let depth = 0;
      for (const m of html.matchAll(/<(\/?)([a-zA-Z][a-zA-Z0-9-]*)([^>]*)>/g)) {
        const [, slash, tag, attrs] = m;
        const name = tag.toLowerCase();
        if (VOID.has(name)) continue;
        if (slash) {
          if (stack.length && stack.pop()) depth--;
          continue;
        }
        if (attrs.trimEnd().endsWith("/")) continue;
        const isContainer = /class="[^"]*\bcontainer\b/.test(attrs);
        if (isContainer && depth > 0) offenders.push(`${p.app}${p.url}`);
        stack.push(isContainer);
        if (isContainer) depth += 1;
      }
    }
    assert.deepEqual(
      [...new Set(offenders)],
      [],
      `a container inside a container doubles the page gutter: ${JSON.stringify([...new Set(offenders)], null, 1)}`,
    );
  });
});

describe("llms.txt", () => {
  // The convention (llmstxt.org) is a Markdown map of the site at its root.
  // It is only worth anything if it is true: a link to a page that no longer
  // exists is worse than no file, because whatever reads it quotes a 404.
  test("every site ships one, and every URL in it is a page that exists", () => {
    const missing = [];
    for (const { app, host } of SITES) {
      const file = path.join(REPO, "apps", app, "dist", "llms.txt");
      assert.ok(existsSync(file), `apps/${app}: no llms.txt in dist`);
      const text = readFileSync(file, "utf8");
      assert.ok(/^#\s/m.test(text), `apps/${app}/llms.txt: no "# name" line`);
      assert.ok(/^>\s/m.test(text), `apps/${app}/llms.txt: no "> summary" line`);
      for (const [, url] of text.matchAll(/\]\((https?:\/\/[^)]+)\)/g)) {
        const parsed = new URL(url);
        // Another site in the network is checked by its own run of this
        // test; what matters here is that a site's own map is honest.
        if (parsed.host !== host) continue;
        const built =
          pages.some((p) => p.app === app && p.url === parsed.pathname) ||
          existsSync(path.join(REPO, "apps", app, "dist", parsed.pathname.replace(/^\//, "")));
        if (!built) missing.push(`${app}: ${url}`);
      }
    }
    assert.deepEqual(missing, [], `llms.txt links to pages that were not built:\n${missing.join("\n")}`);
  });

  // The other direction, and the one that actually goes wrong: a map stops
  // being true by omission long before it breaks by a dead link. Every
  // article and event page has to appear in its own site's llms.txt — which
  // in practice means running `node tools/llms.mjs` after editing content.
  test("every article and event page appears in its site's llms.txt", () => {
    const absent = [];
    for (const { app } of SITES) {
      const file = path.join(REPO, "apps", app, "dist", "llms.txt");
      if (!existsSync(file)) continue;
      if (!existsSync(path.join(REPO, "apps", app, "llms.head.md"))) continue;
      const text = readFileSync(file, "utf8");
      const feeds = pages.filter(
        (p) => p.app === app && /^\/(news|events|noticias|eventos)\/[^/]+\/$/.test(p.url),
      );
      for (const page of feeds) if (!text.includes(page.url)) absent.push(`${app}: ${page.url}`);
    }
    assert.deepEqual(
      absent,
      [],
      `pages missing from llms.txt — run "node tools/llms.mjs":\n${absent.join("\n")}`,
    );
  });
});

// A moved address owes a 301, and nothing in the build remembers that the
// old one existed — so the register in packages/content/src/redirects.ts is
// the only record, and these keep it true. Each of them is a way for a
// redirect to be worse than none: one that lands nowhere, one the site
// shadows with a live page of the same name, one that hops twice, and a
// register that has not reached the file Vercel actually reads.
describe("redirects", () => {
  const entries = Object.entries(redirects).flatMap(([app, list]) =>
    list.map((r) => ({ app, ...r })),
  );
  const urlsOf = (app) => new Set(pages.filter((p) => p.app === app).map((p) => p.url));

  test("every redirect lands on a page that exists", () => {
    const broken = entries.filter((r) => !urlsOf(r.app).has(r.to)).map((r) => `${r.app}${r.from} -> ${r.to}`);
    assert.deepEqual(broken, [], `a redirect to nowhere:\n  ${broken.join("\n  ")}`);
  });

  test("no redirect is shadowed by a page at the same address", () => {
    const shadowed = entries.filter((r) => urlsOf(r.app).has(r.from)).map((r) => `${r.app}${r.from}`);
    assert.deepEqual(shadowed, [], `the site still builds a page here, so the redirect never fires:\n  ${shadowed.join("\n  ")}`);
  });

  test("no redirect points at another redirect", () => {
    const froms = new Set(entries.map((r) => `${r.app}${r.from}`));
    const chained = entries.filter((r) => froms.has(`${r.app}${r.to}`)).map((r) => `${r.app}${r.from} -> ${r.to}`);
    assert.deepEqual(chained, [], `a hop to a hop — point it at the destination:\n  ${chained.join("\n  ")}`);
  });

  test("every app's vercel.json says what the register says", () => {
    const stale = [];
    for (const { app } of SITES) {
      const file = path.join(REPO, "apps", app, "vercel.json");
      if (!existsSync(file)) continue;
      const served = JSON.parse(readFileSync(file, "utf8")).redirects ?? [];
      for (const r of redirects[app] ?? []) {
        // Both spellings of the old path are written, so each entry is two —
        // and each is a 301: `permanent: true` would leave a 308.
        const hops = served.filter((h) => h.destination === r.to && h.statusCode === 301);
        if (hops.length < 2) stale.push(`${app}${r.from} -> ${r.to}`);
      }
    }
    assert.deepEqual(stale, [], `in the register and not in vercel.json — run npm run redirects:\n  ${stale.join("\n  ")}`);
  });
});

describe("event calendars", () => {
  // app -> the path its events live under, which is also the calendar's name.
  const CALENDARS = {
    dst: "events", llc: "events", visas: "events", riviera: "events", mbr: "events",
    palmcentral: "events", eco: "events", fwf: "events", nyc42: "events", ldn: "events",
    lnd: "events", sol2go: "events", cmx: "eventos", mxo: "eventos", vien: "veranstaltungen",
  };
  const read = (app) => {
    const file = path.join(REPO, "apps", app, "dist", `${CALENDARS[app]}.ics`);
    assert.ok(existsSync(file), `apps/${app}: no ${CALENDARS[app]}.ics — the subscribable calendar was not built`);
    return readFileSync(file, "utf8");
  };
  // RFC 5545 §3.1 folds long lines and continues them with a leading space,
  // so a URL past 75 octets arrives in pieces. Reading the file without
  // undoing that reports a truncated address as a dead link.
  const unfolded = (app) => read(app).replace(/\r\n[ \t]/g, "");

  test("every site with events publishes one subscribable calendar", () => {
    for (const [app, base] of Object.entries(CALENDARS)) {
      const ics = read(app);
      const events = ics.split("\r\n").filter((l) => l === "BEGIN:VEVENT").length;
      // A calendar is worth subscribing to only if it says what it is and
      // where to come back for it; without SOURCE a client has no refresh URL.
      for (const required of ["X-WR-CALNAME:", "SOURCE;VALUE=URI:", "REFRESH-INTERVAL;"]) {
        assert.ok(ics.includes(required), `${app}/${base}.ics: missing ${required}`);
      }
      assert.ok(events > 0, `${app}/${base}.ics: no events in it`);
      console.log(`  ${app.padEnd(12)} ${String(events).padStart(2)} events`);
    }
  });

  test("every URL in a calendar leads to a page that was built", () => {
    // This file ends up inside someone's phone and outlives the visit that
    // produced it, so a dead link here is worse than a dead link on a page.
    const dead = [];
    for (const app of Object.keys(CALENDARS)) {
      for (const m of unfolded(app).matchAll(/^URL:(.*)$/gm)) {
        const url = m[1].trim();
        const file = path.join(REPO, "apps", app, "dist", new URL(url).pathname, "index.html");
        if (!existsSync(file)) dead.push(`${app}: ${url}`);
      }
    }
    assert.deepEqual(dead, [], `calendar entries pointing at pages that do not exist:\n  ${dead.join("\n  ")}`);
  });

  test("the events page offers the calendar, or nobody ever finds it", () => {
    const missing = [];
    for (const [app, base] of Object.entries(CALENDARS)) {
      const html = readFileSync(path.join(REPO, "apps", app, "dist", base, "index.html"), "utf8");
      // webcal:, not https: — the scheme is what makes a calendar app treat
      // this as a subscription rather than a one-off file to save.
      if (!html.includes(`webcal://`) || !html.includes(`/${base}.ics`)) missing.push(`${app}/${base}/`);
    }
    assert.deepEqual(missing, [], `events pages with no link to their own calendar:\n  ${missing.join("\n  ")}`);
  });
});

describe("news feeds", () => {
  const FEEDS = [
    "cmx", "dst", "eco", "fwf", "ldn", "llc", "lnd", "mbr", "musical", "mxo",
    "nyc42", "palmcentral", "riviera", "sol2go", "vien", "visas",
  ];
  const read = (app) => {
    const file = path.join(REPO, "apps", app, "dist", "rss.xml");
    assert.ok(existsSync(file), `apps/${app}: no rss.xml — the feed was not built`);
    return readFileSync(file, "utf8");
  };

  test("every site publishes a feed that says what it is", () => {
    for (const app of FEEDS) {
      const xml = read(app);
      const items = xml.split("\n").filter((l) => l.trim() === "<item>").length;
      // <language> is what keeps a reader from filing a Spanish site under
      // English; rel="self" is the feed's own address, which is how an
      // aggregator re-finds it after the page that advertised it moves.
      for (const required of ["<language>", 'rel="self"', "<lastBuildDate>"]) {
        assert.ok(xml.includes(required), `${app}/rss.xml: missing ${required}`);
      }
      assert.ok(items > 0, `${app}/rss.xml: no items in it`);
      console.log(`  ${app.padEnd(12)} ${String(items).padStart(2)} items`);
    }
  });

  test("every link in a feed leads to a page that was built", () => {
    // A feed entry is copied into readers and cached far from us; a dead link
    // in one is read long after the page it named stopped existing.
    const dead = [];
    for (const app of FEEDS) {
      const xml = read(app);
      for (const m of xml.matchAll(/<(?:link|guid[^>]*)>(https:[^<]+)</g)) {
        const url = m[1].trim();
        const { pathname } = new URL(url);
        if (pathname === "/") continue;
        const file = path.join(REPO, "apps", app, "dist", pathname, "index.html");
        if (!existsSync(file)) dead.push(`${app}: ${url}`);
      }
    }
    assert.deepEqual(dead, [], `feed entries pointing at pages that do not exist:\n  ${dead.join("\n  ")}`);
  });

  test("every page advertises the feed, because autodiscovery is the submission", () => {
    // Feedly and Inoreader do not have a submission form: they read this tag.
    // A feed nobody can discover from the page is a file nobody fetches.
    const missing = [];
    for (const app of FEEDS) {
      const html = readFileSync(path.join(REPO, "apps", app, "dist", "index.html"), "utf8");
      if (!/<link[^>]+type="application\/rss\+xml"[^>]+href="\/rss\.xml"/.test(html)) missing.push(app);
    }
    assert.deepEqual(missing, [], `home pages with no autodiscovery link:\n  ${missing.join("\n  ")}`);
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
      // Indexable means what it says: a page that asks robots to skip it —
      // a /go/ hop, or /li/ with the LiveInternet counter — belongs in
      // neither the sitemap nor this list.
      const indexable = pages
        .filter((p) => p.app === app && !p.url.startsWith("/go/"))
        .filter((p) => !/<meta name="robots" content="noindex/.test(p.html))
        .map((p) => p.url);

      assert.deepEqual(
        indexable.filter((url) => !listed.has(url)),
        [],
        `${app}: built pages missing from the sitemap`,
      );
      // The other direction is the weaker claim on purpose: everything the
      // sitemap names has to exist, but a noindex page being listed is a
      // separate (and milder) fault than one that was never built.
      const built = pages.filter((p) => p.app === app).map((p) => p.url);
      assert.deepEqual(
        [...listed].filter((url) => !built.includes(url)),
        [],
        `${app}: sitemap lists pages that were not built`,
      );
    }
  });

  // sitemaps.org/protocol.html defines four fields for a URL. Three of them
  // were missing for years and the fourth, lastmod, was on the URLs but not
  // on the index — so the index said nothing about whether anything below it
  // had moved.
  test("every sitemap URL carries loc, lastmod, changefreq and priority", () => {
    for (const { app } of SITES) {
      const dir = path.join(REPO, "apps", app, "dist");
      for (let i = 0; existsSync(path.join(dir, `sitemap-${i}.xml`)); i++) {
        const xml = readFileSync(path.join(dir, `sitemap-${i}.xml`), "utf8");
        const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
        assert.ok(entries.length, `${app}: sitemap-${i}.xml lists nothing`);
        const missing = entries
          .filter((e) => !/<lastmod>/.test(e) || !/<changefreq>/.test(e) || !/<priority>/.test(e))
          .map((e) => (e.match(/<loc>(.*?)<\/loc>/) || [])[1]);
        assert.deepEqual(missing, [], `${app}: sitemap entries missing fields`);
        // The order the schema requires, not merely the presence of each.
        for (const e of entries) {
          const order = [...e.matchAll(/<(loc|lastmod|changefreq|priority)>/g)].map((m) => m[1]);
          assert.deepEqual(order, ["loc", "lastmod", "changefreq", "priority"], `${app}: wrong element order`);
        }
      }
    }
  });

  // A crawler reads the index to decide which child sitemaps are worth
  // fetching. Without lastmod there it has nothing to decide on.
  test("the sitemap index dates every sitemap it names", () => {
    for (const { app } of SITES) {
      const xml = readFileSync(path.join(REPO, "apps", app, "dist", "sitemap-index.xml"), "utf8");
      const entries = [...xml.matchAll(/<sitemap>([\s\S]*?)<\/sitemap>/g)].map((m) => m[1]);
      assert.ok(entries.length, `${app}: empty sitemap index`);
      for (const e of entries) {
        const loc = (e.match(/<loc>(.*?)<\/loc>/) || [])[1];
        const date = (e.match(/<lastmod>(.*?)<\/lastmod>/) || [])[1];
        assert.ok(date, `${app}: no lastmod on ${loc} in sitemap-index.xml`);
        assert.ok(!Number.isNaN(Date.parse(date)), `${app}: unreadable lastmod ${date}`);
      }
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

  // The rule the recorded dates exist to keep, from AGENTS.md: lastmod is
  // per page, not per file. A site's whole feed lives in one source file, so
  // dating pages by that file makes every page claim to have changed
  // whenever any of them did — and a date that is always "now" is worse than
  // no date, because a crawler that learns the date means nothing stops
  // reading it.
  //
  // One shared date is the symptom, and on its own it is not proof: a sweep
  // through every app — a rename, an import moved — really does change every
  // page on the same afternoon, and the day this test was written was one of
  // those. So the comparison is against the rest of the network on the same
  // run. A site flat while its neighbours vary is dated by its file; a
  // network flat all at once is a network that was just swept.
  test("no site dates every page the same", () => {
    const spread = new Map();
    for (const { app } of SITES) {
      const urls = sitemapUrls(app);
      if (urls.length < 4) continue; // a site of three pages can honestly share a date
      const dates = new Set();
      const dir = path.join(REPO, "apps", app, "dist");
      for (let i = 0; existsSync(path.join(dir, `sitemap-${i}.xml`)); i++) {
        const xml = readFileSync(path.join(dir, `sitemap-${i}.xml`), "utf8");
        for (const m of xml.matchAll(/<lastmod>(.*?)<\/lastmod>/g)) dates.add(m[1].slice(0, 10));
      }
      spread.set(app, dates);
    }
    const varied = [...spread].filter(([, d]) => d.size > 1).map(([a]) => a);
    if (varied.length === 0) return; // the whole network was rebuilt at once
    const flat = [...spread]
      .filter(([, d]) => d.size === 1)
      .map(([a, d]) => `${a}: every page carries ${[...d][0]}`);
    assert.deepEqual(
      flat,
      [],
      `dated by file rather than by entry, while ${varied.join(", ")} vary — run node tools/lastmod.mjs:\n  ${flat.join("\n  ")}`,
    );
  });

  // The recorded dates are a file, and a file goes stale. Structure changes
  // — a route added, a slug renamed, a section earned — land in dist before
  // anything writes them into the map, and the tool that writes it reads git,
  // so it cannot run until the change is committed. Both directions are
  // faults, and each names the same fix, because the fix is the same.
  test("the recorded dates match the pages that exist", () => {
    const recorded = JSON.parse(
      readFileSync(path.join(REPO, "packages/content/src/lastmod.json"), "utf8"),
    );
    const undated = [];
    const orphaned = [];
    for (const { app, host } of SITES) {
      const map = recorded[host] ?? {};
      const listed = sitemapUrls(app).map((u) => new URL(u).pathname);
      for (const url of listed) if (!map[url]) undated.push(`${app}${url}`);
      // The other direction is checked against the pages on disk, not the
      // sitemap: /li/ is a real page that the sitemap leaves out on purpose,
      // and dating it is right. A /go/ hop is a redirect and is dated by
      // nothing.
      const built = new Set(pages.filter((q) => q.app === app && !q.url.startsWith("/go/")).map((q) => q.url));
      for (const url of Object.keys(map)) {
        if (!built.has(url)) orphaned.push(`${app}${url}`);
      }
    }
    const fix = "commit the change, then run node tools/lastmod.mjs and rebuild";
    assert.deepEqual(undated, [], `pages with no recorded date — ${fix}:\n  ${undated.join("\n  ")}`);
    assert.deepEqual(orphaned, [], `dates recorded for pages that no longer exist — ${fix}:\n  ${orphaned.join("\n  ")}`);
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
  // Matched on app as well as URL: a slug is unique within a site, not across
  // the network — the same real conference is covered by more than one site,
  // and matching on URL alone checked one site's data against another's page.
  test("an item whose source carries verifiedOn renders that date", () => {
    const withDate = [...allNews, ...allEvents].filter((i) => i.source?.verifiedOn && i.body?.length);
    assert.ok(withDate.length > 0, "expected at least one item with a verified date to exercise this");
    for (const item of withDate) {
      const kind = "date" in item ? "news" : "events";
      const page = neDetailPages().find((p) => p.app === item.site && p.url === `/${kind}/${item.slug}/`);
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
      const page = neDetailPages().find((p) => p.app === item.site && p.url === `/${kind}/${item.slug}/`);
      if (!page) continue;
      assert.ok(
        decode(page.html).includes(LABEL[item.imageKind]),
        `${page.app}${page.url}: imageKind="${item.imageKind}" but the caption never says "${LABEL[item.imageKind]}"`,
      );
    }
  });

  // Every event gets a page. An entry with no `body` renders as a card that
  // links nowhere: the reader is shown a date and a city and given no way to
  // find out anything else, which is worse than not listing the event at all.
  // Eleven of these had accumulated on sol2go before anyone said so out loud.
  // If a source is too thin to write a page from, the answer is to leave the
  // event out until it isn't — not to publish half of one.
  test("no event is listed without a page behind it", () => {
    const pageless = allEvents.filter((e) => !Array.isArray(e.body) || e.body.length === 0);
    assert.deepEqual(
      pageless.map((e) => `${e.site}/${e.slug}`),
      [],
      "events with no body render as dead cards — give them a page or drop them",
    );
  });

  // A page still presenting a finished event as upcoming is how these
  // listings rot. The build can't know the date, so the flag ships hidden
  // and a script reveals it — meaning the markup has to be there for every
  // event, not just the ones already past at build time.
  test("every event page ships the ended flag for the script to reveal", () => {
    for (const item of allEvents.filter((e) => e.body?.length)) {
      const page = neDetailPages().find((p) => p.app === item.site && p.url === `/events/${item.slug}/`);
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
      const page = neDetailPages().find((p) => p.app === item.site && p.url === `/events/${item.slug}/`);
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

// A site built from data drifts toward the template: every new page carries
// the same furniture, and one day the furniture outweighs the facts. That is
// the state a search engine reads as a doorway, and no other test on this
// repo can see it — each page is individually correct.
//
// The numbers below are a ratchet, not a target. Each is today's measured
// average with a little headroom. Raising one is allowed; doing it silently
// is not, which is the whole point of writing them down. musical's 35 is a
// recorded debt: sixty run stops share their venue paragraphs and their
// question list, and the fix for that is sixty written sentences, not code.
describe("how much of each site is the template", () => {
  // eco and llc were raised on 2 September 2026, deliberately. Both are small
  // sites, and both carry news card strips on the front page, the news index
  // and every article page. A card's headline and summary therefore land on
  // three or four pages at two items and on five or six at three — which is
  // exactly where MANY flips a run from "cross-link" to "template". The third
  // news article tipped them over a threshold that measures the card
  // furniture, not the prose: eco's flagged runs are its own three headlines,
  // llc's are "DIFC passes 10,000 companies" and a resolution number. The real
  // fix is fewer card repetitions per site, which is a shared-UI decision, not
  // an editorial one.
  //
  // visas, riviera, mbr and palmcentral were raised on 3 September 2026 for
  // exactly the reason recorded above for eco and llc: each gained a second
  // news article, and on a site of twenty-odd pages a card's headline and
  // summary now land on enough of them to read as furniture. What the
  // measure catches is the card strip, not the prose — the four sites' own
  // flagged runs are their own new headlines. Same real fix: fewer card
  // repetitions per site, which is a shared-UI decision.
  //
  // llc, visas, riviera and mbr were raised again on 6 September 2026, and for
  // the third time for the same reason: each gained two more news articles in
  // one pass. The flagged runs on all four are their own new card headlines
  // and summaries, which the strip repeats on the front page, the news index
  // and every article. Nothing in the prose repeats. The ratchet is doing its
  // job — it is telling us the card strip is now the single largest source of
  // duplicate text on a small site, and it will keep saying so until the strip
  // stops printing a full summary on every page that carries it.
  //
  // sol2go and vien launched on 6 September 2026 and start at 30, which is
  // where a site with a handful of entries sits: with few pages, the shared
  // chrome is a large share of every one of them, and the number falls on its
  // own as content arrives. It is a starting line, not a licence.
  // mbr went from 16 to 17 on 7 September 2026, when /transport/ earned its
  // page: a district site with seven feed items gains a page whose body is
  // three cards it already carries, and the shared chrome is a larger share
  // of a page that small. The number falls again as the district's feed
  // grows, which is the direction the site is going.
  const CEILING = {
    dst: 25, llc: 16, visas: 19, riviera: 13, mbr: 17, palmcentral: 24,
    eco: 30, fwf: 20, musical: 35, nyc42: 27, ldn: 25, lnd: 25, cmx: 32, mxo: 25,
    sol2go: 30, vien: 30,
  };

  test("no site is more template than the ceiling it recorded", async () => {
    const { analyse } = await import("../tools/text-dupes.mjs");
    const over = [];
    for (const [app, ceiling] of Object.entries(CEILING)) {
      const { boilerAvg } = analyse(path.join(REPO, "apps", app, "dist"));
      const pct = boilerAvg * 100;
      if (pct > ceiling) over.push(`${app}: ${pct.toFixed(1)}% boilerplate, ceiling ${ceiling}%`);
    }
    assert.deepEqual(over, [], `a template grew:\n  ${over.join("\n  ")}`);
  });
});
