// Generates one cover per event that has none, through fal.ai.
//
//   node tools/covers.mjs            # generate what is missing
//   node tools/covers.mjs --dry      # list what would be generated
//
// Needs FAL_AI_API_KEY from ~/dst/.env. fal.ai authenticates with
// `Authorization: Key <token>` — not Bearer, which returns 401.
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

const KEY = process.env.FAL_AI_API_KEY;
if (!KEY) {
  console.error("FAL_AI_API_KEY missing — run with: set -a && . ~/dst/.env && set +a");
  process.exit(1);
}
const DRY = process.argv.includes("--dry");
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

async function generate(site, slug, subject) {
  const out = path.join(REPO, "apps", site, "public", "covers", `${slug}.jpg`);
  if (fs.existsSync(out)) return false;
  if (DRY) { console.log("would generate", `${site}/${slug}`); return true; }

  const res = await fetch("https://fal.run/fal-ai/flux/schnell", {
    method: "POST",
    headers: { Authorization: "Key " + KEY, "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: `${subject}. ${PROMPTS.palettes[site]}. ${STYLE}`,
      image_size: { width: WIDTH, height: HEIGHT },
      num_images: 1,
      num_inference_steps: 4,
    }),
  });
  if (!res.ok) {
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
  console.log(`${site}/${slug} — ${(buf.length / 1024).toFixed(0)}KB`);
  return true;
}

let n = 0;
for (const [site, entries] of Object.entries(PROMPTS.covers))
  for (const [slug, subject] of Object.entries(entries))
    if (await generate(site, slug, subject)) n++;

if (!n) console.log("nothing missing");
else if (DRY) console.log(`\n${n} to generate`);
else {
  // flux/schnell bills by megapixel.
  const usd = n * ((WIDTH * HEIGHT) / 1e6) * 0.003;
  console.log(`\n${n} images — about $${usd.toFixed(3)}. Next: node tools/images.mjs`);
}
