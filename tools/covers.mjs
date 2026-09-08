// Generates one cover per event, news item and page that has none, through
// fal.ai.
//
//   node tools/covers.mjs            # generate what is missing
//   node tools/covers.mjs --dry      # list what would be generated
//   node tools/covers.mjs --force    # regenerate even what exists
//   node tools/covers.mjs --force --lead   # ... but only the front-page ones
//   node tools/covers.mjs --force --figure # ... or only the ones drawn from a photo
//   node tools/covers.mjs --force <slug>   # ... or just the one that came back wrong
//
// Three tiers, chosen by the shape of the entry in covers.json.
//
// A bare string is the standard tier: one line of subject through
// flux/schnell, four steps and a third of a cent. An object with a `detail`
// line is the lead tier — flux/dev at 28 steps, roughly ten times the price
// and worth it on the one picture a reader sees before they have read
// anything: schnell renders a serviceable poster, dev renders one with depth
// in the paper layers and edges that survive being shown at 1200px.
//
// An object with a `control` block is the figure tier, and it is the only one
// that draws people. It runs flux-pro/v1/canny: the geometry comes from a
// photograph, everything else from the prompt. Four things were learned the
// expensive way and are worth keeping:
//
//   - The control frame must be SPARSE. Two performers against a dark stage
//     leaves the model room and it renders our paper. A press wall gave it
//     edges everywhere, so it traced the photograph instead: a vector
//     likeness of four identifiable people, with the sponsors' roundels
//     showing through in defiance of `no logos`.
//   - Say who is in the frame, one by one, by hair and clothes. Given only
//     "a singer" the model got the subject's sex wrong from a photograph
//     that showed it plainly.
//   - Prefer a frame shot from behind or in silhouette. No face means no
//     caricature of a living person, which is the line this tier could
//     otherwise cross.
//   - The background belongs in the prompt, not the photograph — but it can
//     only fill the parts of the frame where the control image is empty.
//
// The control image must be CC0 or public domain. A licence that asks for
// credit or share-alike is not wrong to use, but it puts an obligation on
// every page the cover appears on, and that is a decision to take on purpose
// rather than inherit from a file path — so this throws instead.
//
// Needs FAL_AI_API_KEY from ~/dst/.env. fal.ai authenticates with
// `Authorization: Key <token>` — not Bearer, which returns 401.
//
// Spend runs through tools/fal-budget.mjs, which stops the run at a dollar a
// day. The reservation happens before the request, not after: a total added
// up at the end tells you what you already spent.
//
// None of the pictures depicts its event. What holds that line is the
// idiom, not the abstraction: a generated image that read as reportage
// would be a lie no caption could undo, and a linocut cannot be mistaken
// for a photograph whatever it shows. So the subject may be named outright
// — the cover names the thing the piece is about and leaves the conclusion
// to the text. Covers were abstract for a year because the idiom's job had
// been given to the subject as well, which cost thirteen wasted
// generations on one batch of five: schnell cannot count objects and
// cannot draw a relation between them, and it never had to.
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
const FIGURE_ONLY = process.argv.includes("--figure");
// Any bare arguments name the covers to act on, for redoing one that came
// back wrong without paying for the other ten.
const ONLY = new Set(process.argv.slice(2).filter((a) => !a.startsWith("--")));
const REPO = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const PROMPTS = JSON.parse(fs.readFileSync(path.join(REPO, "tools/covers.json"), "utf8"));

/** The negatives that are load-bearing, and only those.
 *
 *  Words are out for two reasons that have nothing to do with rendering:
 *  an invented word on a cover is an invented fact, and an invented mark
 *  can be read as some real organisation's. Numerals are neither, so they
 *  are allowed — the garbled figures that put `no numbers` in here for a
 *  year turned out to be schnell at four steps, not numerals: on the lead
 *  tier the same dial came back with a clean 1 to 12. Ask for them at the
 *  standard tier and check the picture, or send the entry to lead.
 *
 *  Signage came out for a different reason: every cover is looked at before
 *  its imageAlt can be written, so a stray shopfront is caught by the eye
 *  that has to describe the picture anyway. A negation earns its place by
 *  catching what inspection would miss, and each one it does not spends
 *  attention the subject could have had — element-level negations have
 *  already been seen to summon the thing they forbid.
 *
 *  `no logos` was too wide, and named the wrong thing. A currency sign or a
 *  scatter of token discs on a piece about crypto is the subject, and a
 *  cover cannot ask for its subject and forbid it in the same breath. What
 *  the negation was actually written against is a mark nobody chose: the
 *  plausible brand flux scrawls into a corner, and the sponsors' roundels
 *  the figure tier once traced off a press wall in defiance of the old
 *  wording. Those are barred because an unchosen mark is one no one
 *  checked, and because a real company's mark on our cover implies a
 *  relation we do not have. */
const NEGATIVES =
  "no words, no letters, no writing, no picture frame border, " +
  "no company logos, no brand marks, no trademarks, " +
  // A print idiom signs and numbers itself: the first linocut came back
  // with a pencilled edition mark in one corner and a signature in the
  // other, which is words on a cover that forbids them. These four help
  // and do not settle it — three of the next five linocuts signed
  // themselves anyway, with all four in the prompt: a name, a scrawled
  // "2046", a printed border. So the negation is not the control. Check
  // the corners of every print-idiom cover, and move the picture to vector
  // rather than reaching for a fifth negation, which is what fixed all
  // three.
  "no artist signature, no edition number, no handwriting, no paper margin";

/** How the picture is drawn. This, not the subject, is what keeps a cover
 *  honest: a generated image that read as reportage of a real event would
 *  be a lie no caption could undo, and every idiom here is plainly a
 *  drawing. The subject can therefore be named outright — a stopwatch may
 *  be a stopwatch.
 *
 *  What does not work is naming a MATERIAL over an object that has one of
 *  its own. "A sample vial cut from paper" asks the model to settle paper
 *  against glass, and glass wins: the probe came back a photograph of a
 *  bottle. An idiom is a claim about the drawing, not about the thing, so
 *  there is nothing for the object to contradict. */
const IDIOMS = {
  paper:
    "flat cut-paper collage illustration, layered matte paper with visible fibre grain, " +
    "bold simple geometric shapes, screen-printed editorial poster, soft directional shadow",
  lino:
    "bold hand-carved linocut print, visible gouge marks and uneven ink texture, " +
    "two flat ink colours, hand-printed edges",
  // Riso brings its own two inks and overrides the site palette — a slate
  // blue brief came back teal and yellow. Give it to a site whose colours
  // you are willing to lose, or not at all.
  riso:
    "two-colour risograph print, coarse halftone dot texture, slight misregistration " +
    "between the ink layers, flat matte inks",
  vector:
    "flat vector editorial illustration, clean geometric shapes, uniform flat fills, " +
    "no gradients, no shading",
};

/** One idiom per site, so a grid of cards reads as a set — and so that two
    sites that carry no link to each other do not arrive in the same hand.
    Absent means paper, which is where all sixteen started; a name that is
    not an idiom is a typo, and falling back to paper would hide it until
    the cover was on the page.

    An entry may name its own `idiom`, because a subject can defeat one. Paper
    holds against a pylon or a horse and loses against a cup seen from above,
    a phone and a shelf of books: those three came back as photographs, and
    what fixed them was a firmer idiom for that one picture — a linocut has
    no photographic reading available to it. The override is for that, not
    for variety; a site whose idiom is wrong should change the site's. */
function idiomFor(site, entry) {
  const name = (typeof entry === "object" ? entry.idiom : undefined) ?? PROMPTS.idioms?.[site] ?? "paper";
  if (!IDIOMS[name]) throw new Error(`${site}: no idiom "${name}" — one of ${Object.keys(IDIOMS).join(", ")}`);
  return IDIOMS[name];
}

/** The standard tier draws no one. */
const STYLE = (site, entry) =>
  `${idiomFor(site, entry)}, generous negative space, no people, no faces, ${NEGATIVES}`;

/** The figure tier is the one that draws people, and it stays on the right
    side of the reportage line by being plainly a cartoon. It keeps the paper
    whichever idiom the site otherwise uses: the caricature was tuned against
    it, and one more negative against the signature flux likes to scrawl in
    a corner. */
const FIGURE_STYLE =
  IDIOMS.paper +
  ", affectionate cartoon caricature, exaggerated hair and stage clothes, " +
  "faces reduced to a few simple paper shapes, " +
  `${NEGATIVES}, no roundels, no artist signature, no portrait detail, no realistic skin`;

/** A cover we decline to make: the entry is wrong, not the code. Printed as
    one line, because a stack trace tells the reader nothing they can act on. */
class Refused extends Error {}

/** Licences that put no obligation on the pages the cover ends up on. */
const OPEN_LICENCES = new Set(["CC0", "Public domain"]);

const WIDTH = 1536, HEIGHT = 864;

const TIERS = {
  standard: { model: "fal-ai/flux/schnell", steps: 4, perMp: 0.003 },
  lead: { model: "fal-ai/flux/dev", steps: 28, perMp: 0.025 },
  // Control models bill by megapixel like the others, at flux-pro's rate.
  figure: { model: "fal-ai/flux-pro/v1/canny", perMp: 0.05 },
};

/** Which tier an entry asks for, by its shape. A `control` block wins over a
    `detail` line: an entry with both is drawn from its photograph. */
const tierNameFor = (entry) =>
  typeof entry === "string" ? "standard" : entry.control ? "figure" : entry.detail ? "lead" : "standard";

/** Reads the figure tier's control image and refuses the ones that would
    commit us to something. Called before the dry-run returns, because the
    point of --dry is to learn what is wrong before paying to find out. */
function controlImage(site, slug, block = {}) {
  const { file, licence, source } = block;
  if (!OPEN_LICENCES.has(licence))
    throw new Refused(
      `${site}/${slug}: control image is ${licence || "unlicensed"}. ` +
        "Only CC0 and public domain are taken automatically — anything else puts a " +
        "credit or share-alike obligation on every page the cover runs on.",
    );
  if (!source) throw new Refused(`${site}/${slug}: control image needs a source line`);
  const abs = path.join(REPO, file ?? "");
  if (!file || !fs.existsSync(abs)) throw new Refused(`${site}/${slug}: no control image at ${file}`);
  return `data:image/jpeg;base64,${fs.readFileSync(abs).toString("base64")}`;
}

async function generate(site, slug, entry) {
  const subject = typeof entry === "string" ? entry : entry.subject;
  const detail = typeof entry === "string" ? undefined : entry.detail;
  const background = typeof entry === "string" ? undefined : entry.background;
  const kind = tierNameFor(entry);
  const tier = TIERS[kind];
  if (LEAD_ONLY && kind !== "lead") return false;
  if (FIGURE_ONLY && kind !== "figure") return false;
  if (ONLY.size > 0 && !ONLY.has(slug)) return false;

  const out = path.join(REPO, "apps", site, "public", "covers", `${slug}.jpg`);
  if (fs.existsSync(out) && !FORCE) return false;
  const control = kind === "figure" ? controlImage(site, slug, entry.control) : undefined;
  if (DRY) { console.log(`would generate ${site}/${slug} (${tier.model})`); return tier; }

  // .filter(Boolean) would have quietly dropped a missing palette and
  // produced a cover in whatever colours the model felt like, which is the
  // one fault nobody notices until the card is on the page next to six that
  // match. A site without a palette is a mistake, not a default.
  const palette = PROMPTS.palettes[site];
  if (!palette) throw new Error(`no palette for ${site} — add one to covers.json`);
  const prompt = [subject, background, detail, palette, kind === "figure" ? FIGURE_STYLE : STYLE(site, entry)]
    .filter(Boolean)
    .join(". ");

  const body = { prompt, image_size: { width: WIDTH, height: HEIGHT }, num_images: 1 };
  if (control) body.control_image_url = control;
  else body.num_inference_steps = tier.steps;

  // Both models bill by megapixel. Reserved before the call — if this throws,
  // nothing has been asked for and nothing has been paid for.
  const cost = ((WIDTH * HEIGHT) / 1e6) * tier.perMp;
  spend(cost, `${site}/${slug}`);
  // A dropped connection is not a generation either, and until the figure
  // tier there was nothing big enough to drop: it posts the control image
  // inline, so the request is a megabyte and the socket does sometimes go.
  // Without this the reservation stays on the ledger and the day's budget
  // leaks a little every time the network hiccups.
  let res;
  try {
    res = await fetch(`https://fal.run/${tier.model}`, {
      method: "POST",
      headers: { Authorization: "Key " + KEY, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    spend(-cost);
    console.error(`FAIL ${site}/${slug}: ${err.cause?.code ?? err.message}`);
    return false;
  }
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
  if (!(err instanceof BudgetExceeded) && !(err instanceof Refused)) throw err;
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
