// sol2go covers drawn rather than generated, for the pictures that say
// something exact — here, the slot at which one consensus handed over to
// another. Same cut-paper palette as tools/covers.json gives the generator
// for this site (deep violet ground, lilac and pale mint, small cream
// highlights), rendered to the same 1536×864 jpeg, and kept out of
// covers.json so a regeneration never overwrites them.
// Run from the repo root: node apps/sol2go/covers-src/draw.mjs [slug ...]
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const W = 1536, H = 864;
const GROUND = "#2A1A4E", VIOLET = "#3D2A6B", LILAC = "#B9A6E8", MINT = "#BFEFD8", CREAM = "#F6EFD8";
const OUT = "apps/sol2go/public/covers";

// Cut paper: a flat sheet with a soft drop shadow under it.
const shadow = `<filter id="cut" x="-10%" y="-10%" width="130%" height="140%">
  <feDropShadow dx="0" dy="10" stdDeviation="8" flood-color="#120826" flood-opacity="0.55"/>
</filter>`;
const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>${shadow}</defs>
<rect width="${W}" height="${H}" fill="${GROUND}"/>
<path d="M0 ${H} L0 560 Q 400 500 760 585 T ${W} 540 L${W} ${H} Z" fill="${VIOLET}"/>
${body}</svg>`;

const covers = {
  // Alpenglow switched on: a long row of lilac paper blocks, the chain of
  // slots, until one mint block — slot 459,653,000 — after which every block
  // sits closer to the next, the way blocks do at 200ms instead of 400ms.
  "alpenglow-is-live-votor-finality-150ms": (() => {
    let b = `<g filter="url(#cut)">`;
    let x = 96;
    for (let i = 0; i < 6; i++) {
      b += `<rect x="${x}" y="${352 - (i % 2) * 6}" width="112" height="160" rx="6" fill="${LILAC}"/>`;
      x += 112 + 54;
    }
    // The handover block, taller and in mint.
    b += `<rect x="${x}" y="312" width="124" height="240" rx="6" fill="${MINT}"/>`;
    x += 124 + 26;
    for (let i = 0; i < 9 && x < W - 60; i++) {
      b += `<rect x="${x}" y="${352 - (i % 2) * 6}" width="56" height="160" rx="5" fill="${LILAC}"/>`;
      x += 56 + 26;
    }
    b += `</g>`;
    // A small cream disc high on the right: the certificate, one round.
    b += `<circle cx="1340" cy="178" r="34" fill="${CREAM}" filter="url(#cut)"/>`;
    return svg(b);
  })(),
};

const only = process.argv.slice(2);
for (const [slug, source] of Object.entries(covers)) {
  if (only.length && !only.includes(slug)) continue;
  const out = path.join(OUT, `${slug}.jpg`);
  const buf = await sharp(Buffer.from(source)).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  fs.writeFileSync(out, buf);
  console.log(`${out} — ${(buf.length / 1024).toFixed(0)}KB`);
}
