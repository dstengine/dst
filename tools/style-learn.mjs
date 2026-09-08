// Measures human journalism so the figures in tools/style.mjs mean something.
//
//   node tools/style-learn.mjs            all languages
//   node tools/style-learn.mjs en de      named ones
//   node tools/style-learn.mjs --list     the outlets it reads
//
// A stylometric figure on its own is decoration. "1.4 em dashes per
// thousand words" is neither high nor low until a newsroom has been counted
// the same way, and the newsroom has to be counted with the same code, on
// the same kind of text, or the comparison is between two methods rather
// than two writers. So this reads recent articles from the outlets below,
// runs them through `measure()` from tools/style.mjs — the very function the
// report uses on us — and writes the mean and spread of each figure to
// tools/style-control.json.
//
// What it does not write is the articles. They are fetched, measured and
// dropped; the file holds counts, means and frequencies, plus the URL each
// one came from so the sample can be audited or refreshed. Other people's
// prose does not belong in this repo, and for this purpose we never needed
// it — only its shape.
//
// The outlets are the ones our sites are written against: British and
// American general news for the English sites, Spanish-language dailies for
// cmx and mxo, Austrian and German ones for vien.
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { measure } from "./style.mjs";

const FEEDS = {
  en: [
    "https://www.theguardian.com/uk/rss",
    "https://feeds.bbci.co.uk/news/rss.xml",
    "https://www.standard.co.uk/rss",
  ],
  es: [
    "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada",
    "https://www.eldiario.es/rss/",
    "https://www.jornada.com.mx/rss/edicion.xml",
    "https://www.20minutos.es/rss/",
  ],
  de: [
    "https://www.tagesschau.de/index~rss2.xml",
    "https://www.spiegel.de/schlagzeilen/index.rss",
    "https://newsfeed.zeit.de/index",
    "https://rss.orf.at/news.xml",
  ],
};

/** Below this an article is a stub, a video page or a paywall teaser, and
 *  its figures are noise rather than a sample. */
const MIN_WORDS = 250;
/** Enough that one long feature cannot set the mean on its own. */
const PER_FEED = 16;

const OUT = new URL("./style-control.json", import.meta.url).pathname;
const UA = "Mozilla/5.0 (compatible; dst-style-check/1.0; +https://dst.llc/)";

async function get(url) {
  const r = await fetch(url, {
    headers: { "user-agent": UA },
    redirect: "follow",
    // A newsroom that will not answer in fifteen seconds is not a sample.
    signal: AbortSignal.timeout(15000),
  });
  if (!r.ok) throw new Error(`${r.status}`);
  return await r.text();
}

/** Article links out of an RSS or Atom feed. */
function links(xml) {
  const rss = [...xml.matchAll(/<link>\s*(?:<!\[CDATA\[)?\s*(https?:\/\/[^<\]\s]+)/g)].map((m) => m[1]);
  const atom = [...xml.matchAll(/<link[^>]+href="(https?:\/\/[^"]+)"[^>]*\/?>/g)].map((m) => m[1]);
  return [...new Set([...rss, ...atom])]
    .filter((u) => !/\.(xml|rss|jpg|png)$/.test(u))
    // A feed also carries its own channel link and its section fronts. Those
    // are index pages: their <main> is a wall of headlines and card blurbs
    // with no full stops in it, so an extractor reads the lot as one
    // four-hundred-word sentence and the control's spread goes to pieces.
    // A front sits at the root or one segment down; an article is filed
    // deeper. What that misses, the sentence-length gate below catches.
    .filter((u) => {
      const parts = new URL(u).pathname.split("/").filter(Boolean);
      return parts.length >= 2;
    });
}

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", mdash: "—",
  ndash: "–", hellip: "…", rsquo: "’", lsquo: "‘", ldquo: "“", rdquo: "”" };

/** The same shape of text style.mjs takes from our own pages: the <p>
 *  elements of the article body, and nothing else on the page. */
function paragraphs(html) {
  const body = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i)?.[1]
    ?? html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1]
    ?? "";
  return [...body.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map(([, inner]) => inner
      .replace(/<[^>]+>/g, " ")
      .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
      .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
      .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n] ?? " ")
      .replace(/\s+/g, " ")
      .trim())
    .filter((t) => t.split(" ").length >= 8);
}

const mean = (xs) => xs.reduce((a, b) => a + b, 0) / (xs.length || 1);
const sd = (xs) => {
  if (xs.length < 2) return 0;
  const m = mean(xs);
  return Math.sqrt(xs.reduce((a, x) => a + (x - m) ** 2, 0) / (xs.length - 1));
};

const args = process.argv.slice(2);
if (args.includes("--list")) {
  for (const [lang, feeds] of Object.entries(FEEDS)) console.log(`${lang}: ${feeds.join("\n    ")}`);
  process.exit(0);
}
const langs = args.filter((a) => !a.startsWith("--"));

const out = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : {};

for (const [lang, feeds] of Object.entries(FEEDS)) {
  if (langs.length && !langs.includes(lang)) continue;
  const samples = [];
  const sources = [];
  for (const feed of feeds) {
    let urls = [];
    try {
      urls = links(await get(feed)).slice(0, PER_FEED);
    } catch (e) {
      console.log(`  ${feed} — feed unreadable (${e.message})`);
      continue;
    }
    let taken = 0;
    for (const url of urls) {
      try {
        const paras = paragraphs(await get(url));
        const m = measure(paras, lang);
        if (m.words < MIN_WORDS) continue;
        // If the longest sentence runs past this, the page was not parsed as
        // prose — a caption list, a live blog, a cookie wall. Measuring it
        // would put a fault of ours into the baseline we judge ourselves by.
        if (Math.max(...paras.map((t) => t.split(" ").length)) > 200) continue;
        samples.push(m);
        sources.push({ url, words: m.words });
        taken++;
      } catch { /* a page that will not load is not a sample */ }
    }
    console.log(`  ${new URL(feed).hostname}: ${taken} article(s)`);
  }

  if (samples.length < 8) {
    console.log(`${lang}: only ${samples.length} article(s) — too few to be a baseline, not written`);
    continue;
  }

  const metrics = {};
  for (const key of Object.keys(samples[0].metrics)) {
    const xs = samples.map((s) => s.metrics[key]);
    metrics[key] = { mean: mean(xs), sd: sd(xs) };
  }
  const profile = {};
  for (const w of Object.keys(samples[0].profile)) {
    const xs = samples.map((s) => s.profile[w]);
    profile[w] = { mean: mean(xs), sd: sd(xs) };
  }
  const tells = {};
  for (const s of samples) for (const [p, n] of Object.entries(s.tells)) tells[p] = (tells[p] ?? 0) + n;

  out[lang] = {
    measuredOn: new Date().toISOString().slice(0, 10),
    articles: samples.length,
    words: samples.reduce((a, s) => a + s.words, 0),
    metrics,
    profile,
    tells,
    sources,
  };
  console.log(`${lang}: ${samples.length} articles, ${out[lang].words} words`);
}

writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
console.log(`\nwritten to ${OUT}`);
