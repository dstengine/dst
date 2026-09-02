// Generates one cover per event, news item and page that has none, through
// fal.ai.
//
//   node tools/covers.mjs            # generate what is missing
//   node tools/covers.mjs --dry      # list what would be generated
//   node tools/covers.mjs --force    # regenerate even what exists
//   node tools/covers.mjs --force --lead   # ... but only the front-page ones
//   node tools/covers.mjs --force <slug>   # ... or just the one that came back wrong
//
// Two tiers. Most covers are a one-line subject through flux/schnell, which
// is four steps and a third of a cent. An event the front page leads with
// gets a longer prompt through flux/dev at 28 steps — roughly ten times the
// price and worth it on the one picture a reader sees before they have read
// anything: schnell renders a serviceable poster, dev renders one with
// depth in the paper layers and edges that survive being shown at 1200px.
// A cover is in the second tier when its entry in covers.json is an object
// with a `detail` line rather than a bare string.
//
// Needs FAL_AI_API_KEY from ~/dst/.env. fal.ai authenticates with
// `Authorization: Key <token>` — not Bearer, which returns 401.
//
// Spend runs through tools/fal-budget.mjs, which stops the run at a dollar a
// day. The reservation happens before the request, not after: a total added
// up at the end tells you what you already spent.
//
// The pictures are deliberately abstract. A generated image that looked
// like reportage of a real event would be a lie no caption could undo, so
// none of them depicts its event: each carries the subject as flat shapes.
// That is also why items set imageKind "generated", which ImageNote prints
// no label for — how a picture was made is our business, not a caption.
//
// One image does both jobs: FeedCards uses it as the card cover in place of
// the date block, EventArticle as the article figure.
//
// After running: recompress (fal returns ~900KB jpegs), then
// `node tools/images.mjs` for the avif/webp variants, then add
// image/imageAlt/imageKind/imageWidth/imageHeight to the item.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { BudgetExceeded, LIMIT, headroom, spend, spentToday } from "./fal-budget.mjs";

const KEY = process.env.FAL_AI_API_KEY;
if (!KEY) {
  console.error("FAL_AI_API_KEY missing — run with: set -a && . ~/dst/.env && set +a");
  process.exit(1);
}
const DRY = process.argv.includes("--dry");
const FORCE = process.argv.includes("--force");
// --force on its own would redo all twenty-four; paired with --lead it redoes
// only the front-page covers, which is the case that actually comes up.
const LEAD_ONLY = process.argv.includes("--lead");
// Any bare arguments name the covers to act on, for redoing one that came
// back wrong without paying for the other ten.
const ONLY = new Set(process.argv.slice(2).filter((a) => !a.startsWith("--")));
const REPO = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const PROMPTS = JSON.parse(fs.readFileSync(path.join(REPO, "tools/covers.json"), "utf8"));

/** One house style, so a grid of cards reads as a set. The negatives are
    load-bearing: flux writes garbled lettering into anything that looks
    like a poster or a book unless told not to, and a stray caption is the
    one artefact a reader will notice. */
const STYLE =
  "flat cut-paper collage illustration, layered matte paper with visible fibre grain, " +
  "bold simple geometric shapes, screen-printed editorial poster, soft directional shadow, " +
  "generous negative space, no text, no letters, no numbers, no writing, no signage, " +
  "no picture frame border, no people, no faces, no logos";

const WIDTH = 1536, HEIGHT = 864;

const TIERS = {
  standard: { model: "fal-ai/flux/schnell", steps: 4, perMp: 0.003 },
  lead: { model: "fal-ai/flux/dev", steps: 28, perMp: 0.025 },
};

async function generate(site, slug, entry) {
  const subject = typeof entry === "string" ? entry : entry.subject;
  const detail = typeof entry === "string" ? undefined : entry.detail;
  const tier = detail ? TIERS.lead : TIERS.standard;
  if (LEAD_ONLY && !detail) return false;
  if (ONLY.size > 0 && !ONLY.has(slug)) return false;

  const out = path.join(REPO, "apps", site, "public", "covers", `${slug}.jpg`);
  if (fs.existsSync(out) && !FORCE) return false;
  if (DRY) { console.log(`would generate ${site}/${slug} (${tier.model})`); return tier; }

  // .filter(Boolean) would have quietly dropped a missing palette and
  // produced a cover in whatever colours the model felt like, which is the
  // one fault nobody notices until the card is on the page next to six that
  // match. A site without a palette is a mistake, not a default.
  const palette = PROMPTS.palettes[site];
  if (!palette) throw new Error(`no palette for ${site} — add one to covers.json`);
  const prompt = [subject, detail, palette, STYLE].filter(Boolean).join(". ");
  // Both models bill by megapixel. Reserved before the call — if this throws,
  // nothing has been asked for and nothing has been paid for.
  const cost = ((WIDTH * HEIGHT) / 1e6) * tier.perMp;
  spend(cost, `${site}/${slug}`);
  const res = await fetch(`https://fal.run/${tier.model}`, {
    method: "POST",
    headers: { Authorization: "Key " + KEY, "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt,
      image_size: { width: WIDTH, height: HEIGHT },
      num_images: 1,
      num_inference_steps: tier.steps,
    }),
  });
  if (!res.ok) {
    // Refunded: fal bills a generation, not a rejected request. Without this
    // a wrong key would burn the whole day's budget on 401s.
    spend(-cost);
    console.error(`FAIL ${site}/${slug}: ${res.status} ${(await res.text()).slice(0, 200)}`);
    return false;
  }
  const url = (await res.json()).images?.[0]?.url;
  if (!url) { console.error(`FAIL ${site}/${slug}: no image in response`); return false; }

  // fal returns ~900KB jpegs; committed at mozjpeg 82 they are about a tenth
  // of that and no different on screen.
  const raw = Buffer.from(await (await fetch(url)).arrayBuffer());
  const buf = await sharp(raw).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buf);
  console.log(`${site}/${slug} — ${(buf.length / 1024).toFixed(0)}KB via ${tier.model}`);
  return tier;
}

// Events and news are separate blocks in covers.json but share one output
// folder per site, so a slug used by both would silently overwrite. They do
// not collide today and this keeps it that way.
const jobs = [];
const seen = new Set();
// Three blocks now: an event, a news item, and a page that is neither —
// a service page, an about page, a section under a show. Same house style
// and same palette per site, because a cover's job is the same wherever it
// runs: to say which site you are on before you have read a word.
for (const block of [PROMPTS.covers, PROMPTS.news ?? {}, PROMPTS.pages ?? {}])
  for (const [site, entries] of Object.entries(block))
    for (const [slug, entry] of Object.entries(entries)) {
      const key = `${site}/${slug}`;
      if (seen.has(key)) throw new Error(`two prompts for ${key} — they would overwrite each other`);
      seen.add(key);
      jobs.push([site, slug, entry]);
    }

let n = 0, usd = 0, stopped = null;
try {
  for (const [site, slug, entry] of jobs) {
    const tier = await generate(site, slug, entry);
    if (!tier) continue;
    n++;
    usd += ((WIDTH * HEIGHT) / 1e6) * tier.perMp;
  }
} catch (err) {
  // Stop, do not skip on. The next job costs money too, and a run that
  // quietly generated the cheap half of a set is worse than one that halted.
  if (!(err instanceof BudgetExceeded)) throw err;
  stopped = err.message;
}

if (stopped) {
  console.error(`\n${stopped}`);
  if (n) console.error(`${n} generated before stopping — about $${usd.toFixed(3)}.`);
  process.exit(1);
}

if (!n) console.log("nothing missing");
else if (DRY) console.log(`\n${n} to generate — about $${usd.toFixed(3)}`);
else console.log(`\n${n} images — about $${usd.toFixed(3)}. Next: node tools/images.mjs`);
console.log(`fal.ai today: $${spentToday().toFixed(3)} of $${LIMIT.toFixed(2)}, $${headroom().toFixed(3)} left.`);
if (DRY && usd > headroom()) console.log("That does not fit in what is left today.");
