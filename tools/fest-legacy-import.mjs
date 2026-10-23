// Brings the archive of the old festival site into apps/fest as content.
//
// fest.one served two sites on one host: the 2010s archive, restored into
// ~/dst/revive/dist/fest.one, at / and 109 other paths, and this app's
// guides through a catch-all rewrite beside it. From 23 Oct 2026 the app
// serves the whole host (card 2026-10-23-fest-one-new-engine), and every
// archive page keeps its address as one of the app's pages: the app's
// chrome, title, description and breadcrumbs around the archive's own
// body, which is kept as it was written. The archive itself is read only
// and never rebuilt; this reads its built files.
//
// What it writes:
//   apps/fest/legacy/pages.json   one record per page (src/routes.ts reads it)
//   apps/fest/public/_assets/...  every picture an archive page names, at
//                                 the same path, so no body needs rewriting
//   apps/fest/public/<root file>  the feed, the placeholder picture and the
//                                 Search Console token, as they are
//
// The body is the archive's, and it is changed only where a test of the
// network would fail it, each change counted in the summary: a link to "/"
// meant the archive's front page, which is /archive/ now; a link to a page
// the archive lost, or to another host, is left as plain text (the
// archive's own rule for lost pages, and the network's for outbound
// links); a link gets the title of the page it opens; an empty alt gets
// the title of the page the picture stands for. The archive's own trail
// and h1 are taken out of the body, because the page renders both; its
// header bar and its footer are its chrome, which the app's replaces.
//
// Not imported: the 17 paging pages behind query strings (/node?page=N,
// /mainpage?page=N, /sensation2015/node?page=N), which vercel.json
// redirects to the listings they paged; the archive's stylesheet.
//
//   node tools/fest-legacy-import.mjs [archive dir]
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { withSuffix } from "../packages/ui/src/title.ts";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ARCHIVE = path.resolve(process.argv[2] ?? path.join(process.env.HOME, "dst/revive/dist/fest.one"));
const APP = path.join(REPO, "apps/fest");
const OUT = path.join(APP, "legacy/pages.json");
const PUBLIC = path.join(APP, "public");
const ORIGIN = "https://fest.one";
/** The day the archive was restored, which every page of it carries. */
const RESTORED = "2026-10-04";
/** The day /archive/ first existed: a new address, whose content (the old
    front page and the list of every page under it) was put together for
    this app, so the restore date would date it before it was made. */
const ARCHIVE_HOME_MADE = "2026-10-23";
/** The archive's files that the app serves as they are, at the same path:
    its two feeds, the placeholder picture and the Search Console token.
    A feed reader that holds /sensation2015/rss.xml keeps reading it. */
const ROOT_FILES = ["archive.svg", "rss.xml", "sensation2015/rss.xml", "google4a741a6201736f1b.html", "favicon.ico"];
/** What the archive's front page is called in a trail, and where it lives. */
const ARCHIVE_HOME = { href: "/archive/", label: "Archive" };
/** The three pages that had no trail of their own: their crumb is the
    label the archive's header gave them. */
const HUB_CRUMBS = { "/archive/": "Archive", "/concert/": "Concert", "/sensation2015/": "Sensation 2015" };

/** What a legacy page's <title> ends in where it lacks "festival": true
    of every page here, which a guide's suffix ("festival guide") is not.
    apps/fest/src/legacy.ts says the same; the build holds both to 60. */
const SUFFIX = "festival archive";
const KEYWORD = "festival";
const MONTHS = { January: "Jan", February: "Feb", March: "Mar", April: "Apr", August: "Aug", September: "Sept", October: "Oct", November: "Nov", December: "Dec" };
const MONTH = `(${Object.keys(MONTHS).join("|")})`;
const FULL_MONTH = "(January|February|March|April|May|June|July|August|September|October|November|December)";
/** A month as part of a date: after a day ("6 November") or before a year
    ("January 2016"). A month word anywhere else is a name: the band Dead
    by April lost its "April" to a pass over the whole title (QA, round 1). */
const DATE_MONTH = new RegExp(`(?<=\\b\\d{1,2} )${MONTH}\\b|\\b${MONTH}(?= \\d{4}\\b)`, "g");
/** The titles that do not fit in 60 with the suffix even with the month
    shortened: the archive's title cut down by hand, saying the same. */
const SHORT = {
  "/aurora-concert-hall/": "Aurora Concert Hall concerts, 2015–2016",
  "/concert/": "Concert and festival listings in Russia, 2015–2017",
  "/dead-by-april/ekaterinburg2016/": "Dead by April, Yekaterinburg, 6 Nov 2016",
  "/dobrynin/moskva2016/": "Vyacheslav Dobrynin, Moscow, 29 Jan 2016",
  "/dom-hudozhnika/": "Central House of Artists, 2015–2016",
  "/dom-muziki/": "Moscow House of Music concerts, 2015–2016",
  "/infected-mushroom/spb2016/": "Infected Mushroom, St Petersburg 2016",
  "/kaspijskij-gruz/ekaterinburg2016/": "Kaspiyskiy Gruz in Yekaterinburg, 2016",
  "/russkaya-filarmonia/moskva2016/": "Russian Philharmonic, Moscow, 27 Jan 2016",
  "/sensation2015/en/video/2014/amsterdam/crisd/": "Sensation Amsterdam 2014: video by Cris D",
  "/sensation2015/ru/whiteflashmob/": "The white flash mob, 12 June 2015",
  "/sensation2015/video/2011/greatbritain/sigitasb/": "Sensation White London 2011 video",
  "/sensation2015/video/2014/russia/martingarrix/norov/": "Martin Garrix at Sensation Russia 2014",
  "/taxonomy/term/311/": "Variety Theatre concerts, 2015–2016",
  "/taxonomy/term/451/": "Hall of Church Councils concerts, 2016",
  "/taxonomy/term/535/": "Nizhegorodskaya Yarmarka concerts, 2016",
  "/the-prodigy/nizhny-novgorod2016/": "The Prodigy, Nizhny Novgorod, 8 Nov 2016",
  "/today/": "The Today page, 2016–2017",
};
const fits = (title) => [...withSuffix(title, SUFFIX, KEYWORD, "en")].length <= 60;
/** The archive's title, or where it does not fit, the month of its date
    shortened, or where that does not either, the short one above. */
function fitTitle(path, title) {
  if (fits(title)) return title;
  const short = title.replace(DATE_MONTH, (m) => MONTHS[m]);
  if (fits(short)) return short;
  if (SHORT[path] && fits(SHORT[path])) return SHORT[path];
  throw new Error(`${path}: "${title}" does not fit in 60 with " — ${SUFFIX}"; give it a short title in SHORT`);
}

const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&");
const escapeAttr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const text = (html) => decode(html.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.name === "index.html") out.push(full);
  }
  return out;
}

const all = walk(ARCHIVE).sort();
// A paging page sits in a folder named for its query: node___page=2.
const paging = all.filter((f) => f.includes("___"));
const files = all.filter((f) => !f.includes("___"));

// First pass: what each page is, so links between them can be checked and
// titled in the second.
const raw = files.map((file) => {
  const html = readFileSync(file, "utf8");
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!canonical) throw new Error(`${file}: no canonical`);
  const was = new URL(canonical).pathname;
  const graph = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .flatMap((m) => JSON.parse(m[1])["@graph"] ?? []);
  const fullTitle = decode(html.match(/<title>([\s\S]*?)<\/title>/)[1]).trim();
  const cut = fullTitle.lastIndexOf(" — ");
  return {
    file,
    html,
    was,
    path: was === "/" ? ARCHIVE_HOME.href : was,
    title: cut > 0 ? fullTitle.slice(0, cut) : fullTitle,
    description: decode(html.match(/<meta name="description" content="([^"]*)"/)[1]),
    noindex: /<meta name="robots" content="noindex/.test(html),
    // The share picture, where its address needs no percent-encoding: one
    // is named with a Cyrillic letter, and its encoded og:image names a
    // file that is not on disk under that spelling. That page shares the site's
    // card instead.
    image: html.match(/<meta property="og:image" content="https:\/\/fest\.one(\/_assets\/[^"%\u0080-\uffff]+)"/)?.[1],
    webPage: graph.find((n) => n["@type"] === "WebPage"),
    trail: graph.find((n) => n["@type"] === "BreadcrumbList")?.itemListElement ?? [],
  };
});
const byPath = new Map(raw.map((r) => [r.path, r]));

/** Where an archive href leads now: a record's path, or undefined for a
    page the archive does not have. */
function resolve(href) {
  const url = href.split("#")[0].split("?")[0];
  if (url === "/") return ARCHIVE_HOME.href;
  if (url === "/festivals/" || url === "/festivals") return "/";
  const slashed = url.endsWith("/") ? url : `${url}/`;
  return byPath.has(slashed) ? slashed : undefined;
}

/** A link's tooltip: the title of the page it opens, or, where that is
    the link's own text, its summary. */
function titleFor(target, label) {
  if (target === "/") return "Festival guides: dates, tickets, lineups and how to get there";
  const r = byPath.get(target);
  return r.title !== label ? r.title : r.description;
}

const counts = { relinked: 0, lost: 0, outbound: 0, titled: 0, alts: 0, banners: 0 };

function cleanBody(record) {
  const { html } = record;
  // The page's content: the archive's <main>, or on the three pages built
  // without one, everything between the header bar and the footer.
  let body = html.match(/<main id="main">([\s\S]*?)<\/main>/)?.[1];
  if (body === undefined) {
    const start = html.indexOf("</header>", html.indexOf('<header class="rv-bar"')) + "</header>".length;
    body = html.slice(start, html.indexOf("<footer"));
    // These three section fronts end on a footer of their own, saying what
    // their restore kept and left out: kept, as a block. Every other page's
    // footer is one text, the original site's credits and the same note,
    // the archive's chrome rather than the page's, and is left out with it.
    const foot = html.match(/<footer>([\s\S]*?)<\/footer>/)?.[1];
    if (foot) body += `\n<div class="legacy-foot">${foot}</div>\n`;
  }
  // The trail and the h1 are the page's (LegacyPage renders both).
  body = body.replace(/<nav class="crumbs"[\s\S]*?<\/nav>\n?/, "");
  body = body.replace(/<h1[\s>][\s\S]*?<\/h1>\n?/, "");

  body = body.replace(/<a\s([^>]*)>([\s\S]*?)<\/a>/g, (whole, attrs, inner) => {
    const href = attrs.match(/href="([^"]*)"/)?.[1] ?? "";
    const cls = attrs.match(/\sclass="[^"]*"|^class="[^"]*"/)?.[0]?.trim();
    const plain = () => `<span${cls ? ` ${cls}` : ""}>${inner}</span>`;
    if (href.startsWith("#")) return whole;
    if (/^(https?:)?\/\//.test(href) || /^[a-z]+:/.test(href)) {
      counts.outbound++;
      return plain();
    }
    if (href.startsWith("/_assets/") || href === "/archive.svg") return whole;
    const target = resolve(href);
    if (!target) {
      counts.lost++;
      return plain();
    }
    const label = text(inner);
    // A picture that is the link: its alt is the page it opens.
    const title = titleFor(target, label);
    inner = inner.replace(/(<img\s[^>]*?)alt=""/g, (_, head) => {
      counts.alts++;
      return `${head}alt="${escapeAttr(byPath.get(target)?.title ?? title)}"`;
    });
    if (target !== href) counts.relinked++;
    let rest = attrs.replace(/href="[^"]*"/, `href="${target}"`);
    if (!/\stitle="|^title="/.test(rest)) {
      counts.titled++;
      rest += ` title="${escapeAttr(title)}"`;
    }
    return `<a ${rest}>${inner}</a>`;
  });
  // A ticket seller's banner the restore missed (one, on the Spanish
  // Sensation page): the archive says its ticket-sale widgets were left
  // out, and the network links to no Russian shop.
  body = body.replace(/<img\s[^>]*src="\/_assets\/ponominalu\.ru\/[^"]*"[^>]*>/g, () => {
    counts.banners++;
    return "";
  });
  // The restore's note on a page ("Restored from a snapshot of 24
  // February 2017") keeps its date on one line: at 320 px it broke "24 |
  // February 2017" on nine pages (QA, round 1).
  body = body.replace(/<p class="archived">[\s\S]*?<\/p>/g, (note) =>
    note.replace(new RegExp(`\\b(\\d{1,2}) ${FULL_MONTH} (\\d{4})\\b`, "g"), "$1\u00a0$2\u00a0$3"),
  );
  // Any other empty alt is the page's own picture.
  body = body.replace(/(<img\s[^>]*?)alt=""/g, (_, head) => {
    counts.alts++;
    return `${head}alt="${escapeAttr(record.title)}"`;
  });
  return body.trim();
}

/** The language of the page's own text: a Sensation page says it in its
    path (/sensation2015/es/), the rest in the archive's WebPage, and the
    three pages written for the restore are English. */
function langOf(record) {
  const seg = record.path.match(/^\/sensation2015\/(en|es|ru)\//)?.[1];
  return seg ?? record.webPage?.inLanguage ?? "en";
}

/** The trail between the app's root crumb and the page: the archive's
    own, with its front page called the Archive. */
function crumbsOf(record) {
  const items = record.trail.slice(0, -1).map((item) => {
    const p = new URL(item.item).pathname;
    return p === "/" ? ARCHIVE_HOME : { href: resolve(p) ?? p, label: item.name };
  });
  if (!record.trail.length && record.path !== ARCHIVE_HOME.href) items.unshift(ARCHIVE_HOME);
  return items.map((c) => ({ ...c, title: titleFor(c.href, c.label) }));
}

const pages = raw.map((r) => {
  const body = cleanBody(r);
  const times = [...body.matchAll(/<time datetime="(\d{4}-\d{2}-\d{2})/g)].map((m) => m[1]).sort();
  // The archive kept a heading's date on one line (<span class="nowrap">9
  // November 2016</span>). In this app's display face that is 402 px, wider
  // than the 292 px column at 320, and the h1 ran off the screen (QA, round
  // 1). Here the day stays with its month and the year may take the next
  // line: "9 November" fits the column, a whole date may not.
  const h1Html = (r.html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.trim() ?? r.title).replace(
    /<span class="nowrap">([^<]*)<\/span>/g,
    (_, date) => date.replace(/^(\d{1,2}) /, "$1\u00a0"),
  );
  // The site's subject belongs in every summary. An archive summary that
  // does not name it gets one true sentence saying where the page is.
  const description = /festival/i.test(r.description)
    ? r.description
    : `${r.description} From the fest.one festival and concert archive.`;
  return {
    path: r.path,
    ...(r.was !== r.path ? { was: r.was } : {}),
    title: fitTitle(r.path, r.title),
    ...(fitTitle(r.path, r.title) !== r.title ? { archiveTitle: r.title } : {}),
    description,
    h1: h1Html,
    lang: langOf(r),
    crumbs: crumbsOf(r),
    current: r.trail.at(-1)?.name ?? HUB_CRUMBS[r.path] ?? r.title,
    ...(r.noindex ? { noindex: true } : {}),
    ...(r.image ? { image: r.image } : {}),
    createdAt: times[0] ?? RESTORED,
    updatedAt: r.path === ARCHIVE_HOME.href ? ARCHIVE_HOME_MADE : RESTORED,
    body,
  };
});

mkdirSync(path.dirname(OUT), { recursive: true });
writeFileSync(OUT, `${JSON.stringify(pages, null, 1)}\n`);

// Every picture any archive page names, the paging pages' too: an image
// URL is an address as much as a page's, and an image search may hold it.
const assets = new Set();
for (const file of all)
  for (const m of readFileSync(file, "utf8").matchAll(/\/_assets\/[^"' )?#]+/g)) assets.add(decodeURI(m[0]));
let copied = 0;
for (const asset of [...assets].sort()) {
  const from = path.join(ARCHIVE, asset);
  if (!existsSync(from)) throw new Error(`${asset}: named by a page, missing from the archive`);
  const to = path.join(PUBLIC, asset);
  mkdirSync(path.dirname(to), { recursive: true });
  copyFileSync(from, to);
  copied++;
}
const roots = ROOT_FILES.filter((name) => existsSync(path.join(ARCHIVE, name)));
for (const name of roots) {
  mkdirSync(path.dirname(path.join(PUBLIC, name)), { recursive: true });
  copyFileSync(path.join(ARCHIVE, name), path.join(PUBLIC, name));
}

console.log(`${pages.length} pages to ${path.relative(REPO, OUT)} (${paging.length} paging pages left to vercel.json)`);
console.log(`${pages.filter((p) => p.noindex).length} noindex, ${pages.filter((p) => p.was).length} moved (${pages.filter((p) => p.was).map((p) => `${p.was} -> ${p.path}`).join(", ")})`);
console.log(`${copied} assets to apps/fest/public/_assets; root files: ${roots.join(", ")}`);
console.log(`links: ${counts.relinked} re-pointed, ${counts.titled} titled, ${counts.lost} to lost pages and ${counts.outbound} to other hosts left as text; ${counts.alts} empty alts filled; ${counts.banners} seller's banner left out`);
console.log(`titles shortened to fit: ${pages.filter((p) => p.archiveTitle).length}`);
console.log(`summaries given the keyword: ${pages.filter((p, i) => p.description !== raw[i].description).length}`);
