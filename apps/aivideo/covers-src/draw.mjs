// Three aivideo covers drawn rather than generated, because each says
// something exact — a strip twice the length of another, frames nested up
// to 4K, clips joined into a loop — and the image model kept missing it:
// the "twice as long" strips came back the same length. Rendered to the
// same 1536×864 jpeg the generator writes, and kept out of covers.json so a
// regeneration never overwrites them.
// Run from the repo root: node apps/aivideo/covers-src/draw.mjs [slug ...]
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const W = 1536, H = 864;
const GROUND = "#0D0717", MAGENTA = "#FF4FD8", CYAN = "#8FF7FF", YELLOW = "#E8FF3A";
const OUT = "apps/aivideo/public/covers";

const glow = `<filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
  <feGaussianBlur stdDeviation="9" result="b"/>
  <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
</filter>`;
const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>${glow}<radialGradient id="g" cx="50%" cy="50%" r="70%"><stop offset="0" stop-color="#1E0B2E"/><stop offset="1" stop-color="${GROUND}"/></radialGradient></defs>
<rect width="${W}" height="${H}" fill="url(#g)"/>${body}</svg>`;

/** A straight film strip: outline, frame dividers, two rows of sprockets. */
function strip(x, y, len, h, color, opacity) {
  const frame = 150, hole = 14, gap = 30;
  let s = `<g opacity="${opacity}" filter="url(#glow)" stroke="${color}" fill="none" stroke-width="5">`;
  s += `<rect x="${x}" y="${y}" width="${len}" height="${h}" rx="12"/>`;
  s += `<rect x="${x + 14}" y="${y + 34}" width="${len - 28}" height="${h - 68}" rx="6" stroke-width="4"/>`;
  for (let fx = x + 14 + frame; fx < x + len - 30; fx += frame)
    s += `<line x1="${fx}" y1="${y + 34}" x2="${fx}" y2="${y + h - 34}" stroke-width="4"/>`;
  for (let hx = x + 24; hx < x + len - 24; hx += gap) {
    s += `<rect x="${hx}" y="${y + 10}" width="${hole}" height="${hole}" rx="2" stroke-width="3"/>`;
    s += `<rect x="${hx}" y="${y + h - 24}" width="${hole}" height="${hole}" rx="2" stroke-width="3"/>`;
  }
  return s + "</g>";
}

const covers = {
  // Kling 3.0 to 4.0: the same strip, twice the length.
  "kling-4-vs-kling-3-what-changes": svg(
    strip(208, 250, 560, 150, MAGENTA, 0.45) +
    strip(208, 470, 1120, 150, CYAN, 1) +
    `<g filter="url(#glow)" fill="${YELLOW}"><circle cx="1328" cy="545" r="9"/></g>`,
  ),
  // One clip at the centre and every larger frame size round it, up to 4K.
  "gemini-omni-flash-ga-gemini-api": svg(
    [0.14, 0.3, 0.46, 0.62, 0.78, 0.94]
      .map((k, i) => {
        const w = Math.round(1536 * 0.78 * k), h = Math.round(w * 9 / 16);
        return `<rect x="${(W - w) / 2}" y="${(H - h) / 2}" width="${w}" height="${h}" rx="${8 + i * 3}" fill="none" stroke="${i % 2 ? MAGENTA : CYAN}" stroke-width="${6 - i * 0.5}" opacity="${1 - i * 0.1}" filter="url(#glow)"/>`;
      })
      .join("") +
    `<rect x="${W / 2 - 40}" y="${H / 2 - 22}" width="80" height="45" rx="6" fill="${YELLOW}" opacity="0.9" filter="url(#glow)"/>`,
  ),
  // Clips joined end to end into a loop, seen from directly overhead; the
  // yellow ticks are the joins.
  "comfyui-0-36-video-concatenate-flux-video-edit": (() => {
    const cx = W / 2, cy = H / 2, r = 300, half = 62;
    let b = `<g filter="url(#glow)" fill="none">`;
    b += `<circle cx="${cx}" cy="${cy}" r="${r + half}" stroke="${MAGENTA}" stroke-width="6"/>`;
    b += `<circle cx="${cx}" cy="${cy}" r="${r - half}" stroke="${MAGENTA}" stroke-width="6"/>`;
    b += `<circle cx="${cx}" cy="${cy}" r="${r + 40}" stroke="${CYAN}" stroke-width="14" stroke-dasharray="14 22"/>`;
    b += `<circle cx="${cx}" cy="${cy}" r="${r - 40}" stroke="${CYAN}" stroke-width="14" stroke-dasharray="14 18"/>`;
    for (let a = 0; a < 360; a += 20) {
      const t = (a * Math.PI) / 180, c = Math.cos(t), s = Math.sin(t);
      const join = a % 120 === 0;
      b += `<line x1="${cx + c * (r - 28)}" y1="${cy + s * (r - 28)}" x2="${cx + c * (r + 28)}" y2="${cy + s * (r + 28)}" stroke="${join ? YELLOW : MAGENTA}" stroke-width="${join ? 10 : 4}"/>`;
    }
    return svg(b + "</g>");
  })(),
  // Kling 4.0, fully available: the strip from the announcement, now with
  // ten keyframe pins along it and a play mark at its head — nothing holds
  // it at the corners any more.
  "kling-4-0-fully-available": (() => {
    let b = strip(168, 357, 1200, 150, CYAN, 1);
    b += `<g filter="url(#glow)" fill="${YELLOW}">`;
    for (let i = 0; i < 10; i++) b += `<circle cx="${236 + i * 118}" cy="${432}" r="9"/>`;
    b += `</g>`;
    b += `<g filter="url(#glow)" fill="none" stroke="${MAGENTA}" stroke-width="6" stroke-linejoin="round">`;
    b += `<polygon points="1392,392 1392,472 1462,432"/></g>`;
    b += `<g filter="url(#glow)" fill="none" stroke="${MAGENTA}" stroke-width="4" opacity="0.5">`;
    b += `<path d="M168 300 Q 768 240 1368 300"/><path d="M168 564 Q 768 624 1368 564"/></g>`;
    return svg(b);
  })(),
  // ComfyUI 0.41 and 0.42: a node graph — boxes joined by cables — with one
  // box glowing brighter than the rest, the HDR one.
  "comfyui-0-41-0-42-hdr-reference-latents-lightvae": (() => {
    const box = (x, y, w, h, c, o = 1, sw = 5) =>
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="none" stroke="${c}" stroke-width="${sw}" opacity="${o}"/>`;
    const cable = (x1, y1, x2, y2, c) =>
      `<path d="M${x1} ${y1} C ${x1 + 120} ${y1}, ${x2 - 120} ${y2}, ${x2} ${y2}" fill="none" stroke="${c}" stroke-width="4"/>`;
    let b = `<g filter="url(#glow)">`;
    b += box(120, 160, 300, 150, MAGENTA, 0.8) + box(120, 380, 300, 150, MAGENTA, 0.8) + box(120, 600, 300, 110, MAGENTA, 0.5);
    b += box(620, 300, 320, 260, CYAN, 1, 6);
    b += box(1130, 230, 290, 150, CYAN, 0.8) + box(1130, 500, 290, 150, MAGENTA, 0.8);
    b += cable(420, 235, 620, 370, CYAN) + cable(420, 455, 620, 430, CYAN) + cable(420, 655, 620, 490, MAGENTA);
    b += cable(940, 400, 1130, 305, CYAN) + cable(940, 470, 1130, 575, MAGENTA);
    b += `<circle cx="780" cy="430" r="44" fill="${YELLOW}" opacity="0.95"/>`;
    b += `<circle cx="780" cy="430" r="74" fill="none" stroke="${YELLOW}" stroke-width="5" opacity="0.5"/>`;
    b += `<circle cx="780" cy="430" r="104" fill="none" stroke="${YELLOW}" stroke-width="3" opacity="0.25"/>`;
    for (const [x, y] of [[420, 235], [420, 455], [420, 655], [620, 370], [620, 430], [620, 490], [940, 400], [940, 470], [1130, 305], [1130, 575]])
      b += `<circle cx="${x}" cy="${y}" r="8" fill="${YELLOW}"/>`;
    return svg(b + "</g>");
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
