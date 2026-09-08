// What our prose looks like from the outside, measured on the pages we serve.
//
//   node tools/style.mjs                    every site
//   node tools/style.mjs dst fwf            named sites
//   node tools/style.mjs --pages            per page, not per site
//   node tools/style.mjs --words            the words we over- and under-use
//
// The question this answers is not "was this written by a model" — nothing
// here can answer that, and a tool that claimed to would be lying. It
// answers the one question we can settle ourselves: does our writing sit
// where human writing sits, or does it stand out. A number on its own says
// nothing at all — 1.4 em dashes per thousand words is neither good nor bad
// until you know what a newsroom does. So every figure is printed beside a
// control figure measured from human journalism the same way, and the
// column that matters is the last one: how many standard deviations from
// the control we are. Under 2 is unremarkable. Over 3 is a habit.
//
// The control lives in tools/style-control.json as numbers only — counts,
// means, frequencies, and the URL each came from. The articles themselves
// are read once, measured and dropped; we do not keep other people's prose
// in this repo. tools/style-learn.mjs is what fills that file.
//
// Only what reaches a reader is measured. The text comes out of dist, from
// <p> inside <main>, so headings, navigation, tables and labels are out;
// and a paragraph that appears on five pages or more of the same site is
// dropped as template rather than counted five times, which would let one
// footer blurb set the tone of the whole report.
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

/** A paragraph on this many pages of one site is furniture, not writing. */
const TEMPLATE = 5;

/** Words whose frequency is a fingerprint: too common to be about subject
 *  matter, so what is left is habit. The list is fixed per language rather
 *  than taken from the corpus, because our side and the control side have
 *  to count the same vocabulary to be comparable at all. */
const FUNCTION_WORDS = {
  en: ("the of and to a in that is was it for on with as by at from but not are this have "
    + "be or an they which you one had has were their we all been when there would who so "
    + "if will more no out up about into than them can only other new some could time these "
    + "two may then do first any my now such like our over man me even most made after also "
    + "did many before must through back years where much your way well down should because "
    + "each just those people how too little state good very make world still own see men "
    + "work long get here between both life being under never same another know while last").split(" "),
  es: ("de la que el en y a los se del las un por con no una su para es al lo como más pero "
    + "sus le ya o este sí porque esta entre cuando muy sin sobre también me hasta hay donde "
    + "quien desde todo nos durante todos uno les ni contra otros ese eso ante ellos e esto "
    + "mí antes algunos qué unos yo otro otras otra él tanto esa estos mucho quienes nada "
    + "muchos cual poco ella estar estas algunas algo nosotros su tu te ti tuyo ellas nosotras").split(" "),
  de: ("der die und in den von zu das mit sich des auf für ist im dem nicht ein eine als auch "
    + "es an werden aus er hat dass sie nach wird bei einer um am sind noch wie einem über "
    + "einen so zum war haben nur oder aber vor zur bis mehr durch man sein wurde sei doch "
    + "ihre dann unter wir soll ich ihr kann gegen vom können schon wenn habe seine seiner "
    + "ihm uns ohne bereits alle wieder seit immer da diese ja jetzt zwei etwa dabei").split(" "),
};

/** Turns of phrase people name when they say a text reads like a machine.
 *  Impressionistic on purpose — the control corpus is what turns a hunch
 *  into a number, because a newsroom uses some of these too. */
const TELLS = {
  en: ["delve", "tapestry", "testament to", "navigate the", "landscape of", "crucial",
    "seamless", "vibrant", "boasts", "nestled", "in the heart of", "whether you're",
    "at its core", "that said", "it's worth noting", "a myriad", "underscore",
    "not just", "isn't just", "more than just", "when it comes to", "in today's",
    "ever-evolving", "robust", "leverage", "furthermore", "moreover", "in conclusion"],
  es: ["cabe destacar", "en el corazón de", "no solo", "sin duda", "en la actualidad",
    "es importante", "vibrante", "sumergirse", "un abanico", "en definitiva",
    "por otro lado", "además", "asimismo", "en resumen", "a la hora de"],
  de: ["nicht nur", "es ist wichtig", "im Herzen von", "vielfältig", "eintauchen",
    "darüber hinaus", "zudem", "letztlich", "zusammenfassend", "eine Vielzahl",
    "es lohnt sich", "in der heutigen", "spannend"],
};

const CONTROL = new URL("./style-control.json", import.meta.url).pathname;

// ─── reading what we serve ────────────────────────────────────────────────

/** Every built page of a site, as { url, lang, paragraphs }. */
export function pagesOf(dist) {
  const files = [];
  (function walk(dir) {
    for (const e of readdirSync(dir)) {
      const p = join(dir, e);
      if (statSync(p).isDirectory()) walk(p);
      else if (e === "index.html" && !p.includes("/go/")) files.push(p);
    }
  })(dist);

  const pages = files.map((f) => {
    const html = readFileSync(f, "utf8");
    const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? "";
    const paragraphs = [...main.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)]
      .map(([, inner]) => clean(inner))
      .filter((t) => t.split(/\s+/).length >= 5);
    return {
      url: "/" + relative(dist, f).replace(/index\.html$/, ""),
      lang: (html.match(/<html[^>]*\blang="([a-z]{2})/i)?.[1] ?? "en").toLowerCase(),
      paragraphs,
    };
  });

  // Drop the furniture: the same sentence on five pages is one decision,
  // not five, and counting it five times would let it outvote the articles.
  const seen = new Map();
  for (const p of pages) for (const t of new Set(p.paragraphs)) seen.set(t, (seen.get(t) ?? 0) + 1);
  for (const p of pages) p.paragraphs = p.paragraphs.filter((t) => seen.get(t) < TEMPLATE);
  return pages;
}

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", mdash: "—",
  ndash: "–", hellip: "…", rsquo: "’", lsquo: "‘", ldquo: "“", rdquo: "”", eacute: "é" };

function clean(fragment) {
  return fragment
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name] ?? " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ─── measuring ────────────────────────────────────────────────────────────

const WORD = /\p{L}[\p{L}\p{M}'’·-]*/gu;
const words = (text) => text.match(WORD) ?? [];

/** A full stop that ends a sentence rather than an abbreviation or a
 *  decimal: followed by space and something that starts a new sentence. */
const sentences = (text) =>
  text.split(/(?<=[.!?…])["”’)]?\s+(?=[«"“(\p{Lu}\d])/u).map((s) => s.trim()).filter(Boolean);

const mean = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
const sd = (xs) => {
  if (xs.length < 2) return 0;
  const m = mean(xs);
  return Math.sqrt(xs.reduce((a, x) => a + (x - m) ** 2, 0) / (xs.length - 1));
};

/** Type–token ratio is a function of length, so it is measured on fixed
 *  windows and averaged — otherwise a long site always looks poorer than a
 *  short one and the number compares nothing. */
const WINDOW = 500;
function msttr(tokens) {
  const chunks = [];
  for (let i = 0; i + WINDOW <= tokens.length; i += WINDOW)
    chunks.push(new Set(tokens.slice(i, i + WINDOW)).size / WINDOW);
  return chunks.length ? mean(chunks) : (tokens.length ? new Set(tokens).size / tokens.length : 0);
}

/** Every figure the report knows how to compare, from a body of prose.
 *  Exported so tools/style-learn.mjs measures the control with this exact
 *  code and not a second copy of it that drifts. */
export function measure(paragraphs, lang = "en") {
  const text = paragraphs.join("\n\n");
  const toks = words(text).map((w) => w.toLowerCase());
  const sents = paragraphs.flatMap((p) => sentences(p));
  const lens = sents.map((s) => words(s).length).filter((n) => n > 0);
  const paraLens = paragraphs.map((p) => sentences(p).length);
  const per = (n) => (toks.length ? (n * 1000) / toks.length : 0);
  const count = (re) => (text.match(re) ?? []).length;

  const freq = new Map();
  for (const t of toks) freq.set(t, (freq.get(t) ?? 0) + 1);
  const once = [...freq.values()].filter((n) => n === 1).length;

  const tells = {};
  for (const phrase of TELLS[lang] ?? []) {
    const n = count(new RegExp(`\\b${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "gi"));
    if (n) tells[phrase] = n;
  }

  return {
    lang,
    words: toks.length,
    sentences: sents.length,
    paragraphs: paragraphs.length,
    metrics: {
      "sentence length": mean(lens),
      "sentence length sd": sd(lens),
      "burstiness": mean(lens) ? sd(lens) / mean(lens) : 0,
      "sentences per para": mean(paraLens),
      "word length": mean(toks.map((w) => w.length)),
      "long words %": (100 * toks.filter((w) => w.length >= 8).length) / (toks.length || 1),
      "vocabulary (msttr)": msttr(toks),
      "hapax %": (100 * once) / (freq.size || 1),
      "em dash /1k": per(count(/—/g)),
      "en dash /1k": per(count(/–/g)),
      "semicolon /1k": per(count(/;/g)),
      "colon /1k": per(count(/:/g)),
      "comma /1k": per(count(/,/g)),
      "tells /1k": per(Object.values(tells).reduce((a, b) => a + b, 0)),
    },
    tells,
    profile: profileOf(freq, toks.length, lang),
  };
}

/** Frequency of each function word, per thousand tokens. */
function profileOf(freq, total, lang) {
  const out = {};
  for (const w of FUNCTION_WORDS[lang] ?? []) out[w] = total ? ((freq.get(w) ?? 0) * 1000) / total : 0;
  return out;
}

/** Burrows's Delta: the mean absolute z-score across the function-word
 *  profile, scored against the control's mean and spread. It is the number
 *  a stylometrist would actually reach for, and unlike the individual rows
 *  it cannot be gamed by editing out one punctuation mark. */
export function delta(profile, control) {
  const zs = [];
  for (const [w, v] of Object.entries(profile)) {
    const c = control.profile?.[w];
    if (!c || !c.sd) continue;
    zs.push(Math.abs((v - c.mean) / c.sd));
  }
  return zs.length ? mean(zs) : null;
}

// ─── the report ───────────────────────────────────────────────────────────

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const flags = new Set(args.filter((a) => a.startsWith("--")));
  const only = args.filter((a) => !a.startsWith("--"));

  const apps = readdirSync("apps")
    .filter((a) => existsSync(join("apps", a, "dist")))
    .filter((a) => !only.length || only.includes(a));
  if (!apps.length) {
    console.error("no built sites — run npm run build first");
    process.exit(1);
  }

  const control = existsSync(CONTROL) ? JSON.parse(readFileSync(CONTROL, "utf8")) : null;
  if (!control) {
    console.log("no control corpus — every figure below is a number without a baseline.");
    console.log("run  node tools/style-learn.mjs  to measure human journalism the same way.\n");
  }

  const standout = [];
  const sites = [];
  for (const app of apps) {
    const pages = pagesOf(join("apps", app, "dist"));
    const lang = pages[0]?.lang ?? "en";
    const m = measure(pages.flatMap((p) => p.paragraphs), lang);
    sites.push({ app, pages, ...m });
  }

  const rows = Object.keys(sites[0].metrics);
  const nameW = Math.max(...rows.map((r) => r.length), ...sites.map((s) => s.app.length), 7);

  for (const lang of [...new Set(sites.map((s) => s.lang))].sort()) {
    const group = sites.filter((s) => s.lang === lang);
    const ctl = control?.[lang];
    console.log(`\n═══ ${lang}  ·  ${group.map((s) => s.app).join(" ")}`);
    console.log(`${"".padEnd(nameW)}  ` + group.map((s) => s.app.padStart(8)).join("") +
      (ctl ? `  ${"control".padStart(9)}${"±sd".padStart(8)}` : ""));
    console.log(`${"words".padEnd(nameW)}  ` + group.map((s) => String(s.words).padStart(8)).join("") +
      (ctl ? `  ${String(ctl.words).padStart(9)}${String(ctl.articles + "a").padStart(8)}` : ""));
    console.log("─".repeat(nameW + 2 + group.length * 8 + (ctl ? 19 : 0)));

    for (const row of rows) {
      const cells = group.map((s) => fmt(s.metrics[row]).padStart(8)).join("");
      let tail = "";
      if (ctl?.metrics?.[row]) {
        const { mean: cm, sd: cs } = ctl.metrics[row];
        tail = `  ${fmt(cm).padStart(9)}${fmt(cs).padStart(8)}`;
      }
      console.log(row.padEnd(nameW) + "  " + cells + tail);
      if (ctl?.metrics?.[row]?.sd) {
        const z = group.map((s) => {
          const d = (s.metrics[row] - ctl.metrics[row].mean) / ctl.metrics[row].sd;
          if (Math.abs(d) >= 2) standout.push([lang, s.app, row, s.metrics[row], d]);
          return ((d > 0 ? "+" : "") + d.toFixed(1) + "σ").padStart(8);
        }).join("");
        console.log("".padEnd(nameW) + "  " + z);
      } else if (ctl?.metrics?.[row] && group.some((s) => s.metrics[row] > 0)) {
        // No spread to divide by, because the control never does this at
        // all. That is not a missing figure — it is the strongest reading
        // the report can produce, and it must not print as a blank line.
        console.log("".padEnd(nameW) + "  " +
          `not once in ${ctl.articles} control articles`.padStart(8 * group.length));
        for (const s of group) if (s.metrics[row] > 0) standout.push([lang, s.app, row, s.metrics[row], null]);
      }
    }

    if (ctl?.profile) {
      console.log("\n" + "delta".padEnd(nameW) + "  " +
        group.map((s) => fmt(delta(s.profile, ctl)).padStart(8)).join("") +
        "   (Burrows's Delta against the control profile)");
    }
  }

  if (standout.length) {
    console.log("\n— what stands out (2σ from the control, or something it never does)");
    const byRow = new Map();
    for (const [lang, app, row, v, z] of standout)
      byRow.set(`${row} · ${lang}`, [...(byRow.get(`${row} · ${lang}`) ?? []), [app, v, z]]);
    for (const [key, hits] of [...byRow].sort((a, b) => b[1].length - a[1].length)) {
      const worst = hits.reduce((a, b) => (Math.abs(b[2] ?? 99) > Math.abs(a[2] ?? 99) ? b : a));
      const all = hits.length;
      console.log(`  ${key}: ${all} site(s), worst ${worst[0]} at ${fmt(worst[1])}` +
        (worst[2] === null ? " where the control has none" : ` (${worst[2] > 0 ? "+" : ""}${worst[2].toFixed(1)}σ)`));
    }
  }

  console.log("\n— phrases flagged as tells, per site");
  for (const s of sites) {
    const hits = Object.entries(s.tells).sort((a, b) => b[1] - a[1]);
    if (!hits.length) continue;
    console.log(`  ${s.app}: ` + hits.map(([p, n]) => `${p} ×${n}`).join(", "));
  }

  if (flags.has("--pages")) {
    console.log("\n— per page (sentence length · burstiness · em dash /1k · words)");
    for (const s of sites) {
      for (const p of s.pages) {
        if (!p.paragraphs.length) continue;
        const m = measure(p.paragraphs, s.lang).metrics;
        console.log(`  ${fmt(m["sentence length"]).padStart(6)} ${fmt(m.burstiness).padStart(6)} ` +
          `${fmt(m["em dash /1k"]).padStart(6)}  ${s.app}${p.url}`);
      }
    }
  }

  if (flags.has("--words")) {
    console.log("\n— function words furthest from the control (per 1000 tokens)");
    for (const s of sites) {
      const ctl = control?.[s.lang];
      if (!ctl?.profile) continue;
      const far = Object.entries(s.profile)
        .map(([w, v]) => [w, v, ctl.profile[w]])
        .filter(([, , c]) => c?.sd)
        .map(([w, v, c]) => [w, v, c, (v - c.mean) / c.sd])
        .sort((a, b) => Math.abs(b[3]) - Math.abs(a[3]))
        .slice(0, 8);
      console.log(`  ${s.app}: ` + far.map(([w, v, c, z]) =>
        `${w} ${v.toFixed(1)}/${c.mean.toFixed(1)} (${z > 0 ? "+" : ""}${z.toFixed(1)}σ)`).join("  "));
    }
  }
}

function fmt(v) {
  if (v === null || v === undefined) return "—";
  return Math.abs(v) >= 100 ? v.toFixed(0) : Math.abs(v) >= 10 ? v.toFixed(1) : v.toFixed(2);
}
