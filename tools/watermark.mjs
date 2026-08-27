// Stamps the DST mark into a corner of a picture.
//
//   node tools/watermark.mjs <source> <destination> [--corner br|bl|tr|tl]
//
// Pictures we publish should be identifiable as ours once they leave the
// site — in a search result, a share card, someone's screenshot. The mark
// is the same 64px logo the header uses, scaled to a fixed share of the
// image width so it lands the same size relative to the frame whatever the
// source resolution is, and rounded to match how it renders in the header.
//
// It says nothing about how the picture was made. That belongs in the
// caption or the body text when it matters, not burned into the pixels.
import path from "node:path";
import sharp from "sharp";

const LOGO = new URL("../apps/dst/public/logo-mini.png", import.meta.url).pathname;

/** Mark width as a share of the image width, and the margin as a share of it. */
const MARK_SHARE = 0.075;
const MARGIN_SHARE = 0.025;
/** Enough to read as deliberate, not so much that it fights the picture. */
const OPACITY = 0.9;

const CORNERS = new Set(["br", "bl", "tr", "tl"]);

export async function watermark(source, destination, corner = "br") {
  if (!CORNERS.has(corner)) throw new Error(`corner must be one of ${[...CORNERS].join(", ")}`);

  const image = sharp(source);
  const { width, height } = await image.metadata();
  if (!width || !height) throw new Error(`${source}: could not read dimensions`);

  const size = Math.round(width * MARK_SHARE);
  const margin = Math.round(size * (MARGIN_SHARE / MARK_SHARE));
  const radius = Math.round(size * 0.22);

  // The logo file is opaque, so the rounded corners have to be cut in with
  // a mask rather than assumed from the source.
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`,
  );
  const mark = await sharp(LOGO)
    .resize(size, size, { fit: "cover" })
    .composite([{ input: mask, blend: "dest-in" }])
    .ensureAlpha(OPACITY)
    .png()
    .toBuffer();

  const top = corner.startsWith("t") ? margin : height - size - margin;
  const left = corner.endsWith("l") ? margin : width - size - margin;

  const output = await image
    .composite([{ input: mark, top, left }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  await sharp(output).toFile(destination);
  return { width, height, size, corner, destination };
}

const [, , source, destination, ...rest] = process.argv;
if (source && destination) {
  const flag = rest.indexOf("--corner");
  const corner = flag === -1 ? "br" : rest[flag + 1];
  const result = await watermark(source, destination, corner);
  console.log(
    `${path.relative(process.cwd(), destination)} — ${result.width}×${result.height}, ` +
      `mark ${result.size}px in the ${result.corner} corner`,
  );
}
