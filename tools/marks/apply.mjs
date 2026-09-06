// Lays a mark from this directory over a cover that tools/covers.mjs has
// already made.
//
//   node tools/marks/apply.mjs <mark.svg> <cover.jpg> [--width 360] [--left n] [--top n]
//
// Two things have to be true of a mark and neither is something to ask a
// diffusion model for: it must be exact, and flux writes garbled lettering
// into anything logo-shaped. So the mark is drawn as SVG, committed beside
// this file, and composited here.
//
// It hangs rather than sticks: the mark's own alpha, dimmed and blurred,
// goes down first as a shadow, because these covers are lit scenes with
// real shadows in them and a flat mark pasted on one reads as a sticker.
//
// Re-running tools/covers.mjs regenerates the ground without the mark, so
// this step goes after it — the covers.json prompt and this command
// together are the recipe for the picture.
import fs from "node:fs";
import sharp from "sharp";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : Number(args[i + 1]);
};
const [mark, cover] = args.filter((a) => !a.startsWith("--") && !/^\d+$/.test(a));
if (!mark || !cover) throw new Error("usage: apply.mjs <mark.svg> <cover.jpg> [--width n] [--left n] [--top n]");

const WIDTH = flag("width", 360);
const PAD = 60; // room for the blur, or it is clipped square at the edges

const art = await sharp(fs.readFileSync(mark)).resize({ width: WIDTH }).png().toBuffer();
const { width: mw, height: mh } = await sharp(art).metadata();
const { width: cw, height: ch } = await sharp(cover).metadata();

const LEFT = flag("left", Math.round((cw - mw) / 2));
const TOP = flag("top", Math.round((ch - mh) / 2));

const mask = await sharp(art)
  .extend({ top: PAD, bottom: PAD, left: PAD, right: PAD, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .extractChannel("alpha")
  .linear(0.34, 0)
  .blur(16)
  .toBuffer();
const shadow = await sharp({
  create: { width: mw + PAD * 2, height: mh + PAD * 2, channels: 3, background: { r: 20, g: 8, b: 30 } },
})
  .joinChannel(mask)
  .png()
  .toBuffer();

const out = await sharp(cover)
  .composite([
    { input: shadow, left: LEFT - PAD + 10, top: TOP - PAD + 14 },
    { input: art, left: LEFT, top: TOP },
  ])
  .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
  .toBuffer();
fs.writeFileSync(cover, out);
console.log(`${mark} -> ${cover} at ${WIDTH}px, ${LEFT},${TOP}`);
