// The approved copy, turned into HTML and Markdown.
//
// A guide's words are stored as the writer wrote them and the reviewers
// approved them, with the marks the review needed left in:
//
// - `[key.path]` after a space: the fact-sheet entry a sentence rests on.
//   Resolved against the event's sheet and dropped from the page; a tag
//   that names no entry fails the build, because a figure whose source was
//   renamed or removed is exactly the one nobody re-checked. A bracket that
//   follows a letter ("discourage[s]") is the writer's, and stays text.
// - `[label](/go/slug/)`: a link out, through the event's /go/ hop, with the
//   hop's title as its tooltip.
// - `… on the tickets page. → /beyond-the-valley/tickets/`: a link to
//   another page of the guide. The anchor is the noun phrase before the
//   arrow ("the tickets page", or the guide's own `anchors` entry where the
//   sentence has no such phrase), the arrow and the path go, and the title is
//   the target's own title without the suffix.
// - `{{until key}}…{{/until}}`: words that stop being true on a date the
//   guide names in `expires` (a price, a fare). From that day the build
//   drops them from the page, the Markdown twin and llms.txt.
//
// The text outside the anchors is never changed: `inline` checks that what
// it renders reads exactly as the copy does with the marks taken out.
import type { FestEvent, Guide, GuidePage } from "./data/types";

export interface Ctx {
  event: FestEvent;
  guide: Guide;
  /** The page the text sits on, for its arrow anchors; absent on the hub. */
  page?: GuidePage;
  /** ISO day the build is for: decides which expiry spans are dropped. */
  today: string;
  /** Where the text is, for the build's error messages. */
  where: string;
}

/** The title without its " — suffix", as schema.ts names a crumb. */
export const withoutSuffix = (title: string) => title.split(" — ")[0].trim();

export const pathOf = (page: GuidePage) => `/${page.slug}/`;

// ---------------------------------------------------------------- the sheet

const TAG = /(^|\s+)\[([A-Za-z_][\w.]*)\](?!\()/g;

/** Every sheet key a string cites. */
export function tags(text: string): string[] {
  return [...text.matchAll(TAG)].map((m) => m[2]);
}

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/** What a key names in the sheet. A list is indexed by number or by the
    `key` its items carry (`sellers.megatix`, `conflicts.c2`); `list.note`
    is the sheet's note on the list as a whole (`listNotes`). Undefined
    when it names nothing. */
export function resolve(sheet: Record<string, unknown>, key: string): unknown {
  const parts = key.split(".");
  let at: unknown = sheet;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (Array.isArray(at)) {
      if (/^\d+$/.test(part)) { at = at[Number(part)]; continue; }
      const byKey = at.find((item) => isObject(item) && item.key === part);
      if (byKey !== undefined) { at = byKey; continue; }
      if (i === 1 && part === "note") {
        const notes = sheet.listNotes;
        at = isObject(notes) ? notes[parts[0]] : undefined;
        continue;
      }
      return undefined;
    }
    if (isObject(at) && part in at) { at = at[part]; continue; }
    return undefined;
  }
  return at;
}

const day = (v: unknown) => (typeof v === "string" && /^\d{4}-\d{2}-\d{2}/.test(v) ? v.slice(0, 10) : undefined);

function readOns(v: unknown, into: string[] = []): string[] {
  if (Array.isArray(v)) v.forEach((x) => readOns(x, into));
  else if (isObject(v)) {
    const own = day(v.readOn);
    if (own) into.push(own);
    for (const [k, x] of Object.entries(v)) if (k !== "readOn") readOns(x, into);
  }
  return into;
}

/** Keys that are not facts with a reading: the source list itself, the
    scout's record of what no source says, and readers' questions. */
const UNDATED = [/^sources(\.|$)/, /^not_found(\.|$)/, /^questions\./];

/** When the fact a key names was read: its own `readOn`, else the nearest
    enclosing entry's, else the oldest reading inside it (a list is as old as
    its oldest row), else the event's `readOverrides`. Undefined only for
    the keys in UNDATED; any other key without a date is the sheet's fault. */
export function readOn(event: FestEvent, key: string): string | undefined {
  const parts = key.split(".");
  for (let n = parts.length; n > 0; n--) {
    const v = resolve(event.sheet, parts.slice(0, n).join("."));
    if (isObject(v) && day(v.readOn)) return day(v.readOn);
    if (n === parts.length) {
      const inside = readOns(v);
      if (inside.length) return inside.sort()[0];
    }
  }
  return event.readOverrides?.[key];
}

export const isUndated = (key: string) => UNDATED.some((re) => re.test(key));

// ------------------------------------------------------------------ spans

const SPAN = /\{\{until ([A-Za-z]+)\}\}([\s\S]*?)\{\{\/until\}\}/g;

/** True from the day the guide names for `key`. */
export const expired = (guide: Guide, key: string, today: string) => {
  const from = guide.expires[key];
  if (!from) throw new Error(`${guide.event}/${guide.slug}: a span names "${key}", which has no date in expires`);
  return today >= from;
};

/** The keys a string's spans name. */
export const spanKeys = (text: string) => [...text.matchAll(SPAN)].map((m) => m[1]);

/** The text as it reads on `today`: an expired span gone, a live one
    unwrapped. Whitespace a dropped span leaves behind is tidied. */
export function applySpans(text: string, guide: Guide, today: string, where = ""): string {
  const out = text.replace(SPAN, (_, key: string, body: string) => (expired(guide, key, today) ? "" : body));
  if (/\{\{\/?until/.test(out)) throw new Error(`${where}: an expiry span is not closed`);
  return out.replace(/[ \t]{2,}/g, " ").replace(/^[ \t]+|[ \t]+$/gm, "");
}

// ----------------------------------------------------------------- inline

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const attr = (s: string) => esc(s).replace(/"/g, "&quot;");

// A date stays whole and a count stays with its word: "21 Oct 2026",
// "October 2026", "December 1", "126 km". At 390 px a source line read
// "October|2026;". Each goes in a span the stylesheet keeps on one line, a
// class rather than a no-break space, so the Markdown twins, llms.txt and
// copied text keep plain spaces (DESIGN.md, "A count stays with its word").
// Short text only, as the line-break sweep judges it: a run of 160
// characters or less between two tags (a source line, a list item, the
// words before a link). In a long run a split date is a nicety, and the
// spans would cut prose into pieces that each read as short. English month
// names: a guide in another language adds its own.
const MONTH = "(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?|July?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)";
const KEEP_TOGETHER = new RegExp(
  [
    `\\b\\d{1,2} ${MONTH}\\b(?: \\d{4}\\b)?`, // 21 Oct 2026, 28 December
    `\\b${MONTH} \\d{1,2}(?:, \\d{4})?\\b`, // December 1, December 1, 2026
    `\\b${MONTH} \\d{4}\\b`, // October 2026
    `(?:A?\\$)?\\b\\d[\\d,.]*%? (?:km|min|mins|hrs?|hours?|minutes|days?|nights?|people|person|years?|tickets?|passes)\\b`, // 126 km, 4 people
  ].join("|"),
  "g",
);
const unescaped = (s: string) => s.replace(/&(amp|lt|gt|quot);/g, "_");
/** The rendered HTML with its dates and counts kept whole, in each short
    run of text between two tags. Tags are left alone: a title attribute
    never gets a span. */
const typeset = (html: string) =>
  html
    .split(/(<[^>]*>)/)
    .map((run) =>
      run.startsWith("<") || [...unescaped(run)].length > 160
        ? run
        : run.replace(KEEP_TOGETHER, (m) => `<span class="nowrap">${m}</span>`),
    )
    .join("");

interface Piece { from: number; to: number; html: string; md: string; text: string }

const LINK = /\[([^\]\n]+)\]\(([^)\s]+)\)/g;
const ARROW = /\s*→ (\/[^\s]*\/)(?=\s|$)/g;

/** One string of copy (a paragraph, a list item, an answer) as inline HTML,
    Markdown and plain text, marks resolved. Expiry spans must already be
    applied. */
function marks(text: string, ctx: Ctx, site: string): { html: string; md: string; text: string } {
  const pieces: Piece[] = [];
  const pages = ctx.guide.pages;
  // The words as the copy has them, marks aside: what the rendering must
  // come back to (checked at the end).
  const expected = text
    .replace(ARROW, "")
    .replace(TAG, "")
    .replace(LINK, "$1")
    .replace(/\s+/g, " ")
    .trim();

  for (const m of text.matchAll(TAG)) {
    if (resolve(ctx.event.sheet, m[2]) === undefined)
      throw new Error(`${ctx.where}: [${m[2]}] names nothing in the ${ctx.event.slug} sheet`);
    // The tag and the space before it. One that opens the string leaves
    // the space after it, which the final trim takes.
    pieces.push({ from: m.index!, to: m.index! + m[0].length, html: "", md: "", text: "" });
  }

  for (const m of text.matchAll(LINK)) {
    const [whole, label, href] = m;
    let target: { href: string; title: string; out?: string };
    if (href.startsWith("/go/")) {
      const slug = href.slice(4, -1);
      const prefix = `${ctx.event.slug}-`;
      const go = slug.startsWith(prefix) ? ctx.event.go[slug.slice(prefix.length)] : undefined;
      if (!go || !href.endsWith("/")) throw new Error(`${ctx.where}: ${href} is not one of ${ctx.event.slug}'s /go/ hops`);
      target = { href, title: go.title, out: go.url };
    } else {
      const page = pages.find((p) => pathOf(p) === href.replace(/#.*$/, ""));
      if (!page) throw new Error(`${ctx.where}: [${label}](${href}) links to no page of this guide`);
      target = { href, title: withoutSuffix(page.title) };
    }
    if (target.title === label) throw new Error(`${ctx.where}: the title of [${label}] repeats its label`);
    const rel = target.out ? ' rel="nofollow"' : "";
    pieces.push({
      from: m.index!, to: m.index! + whole.length,
      html: `<a href="${attr(target.href)}" title="${attr(target.title)}"${rel}>${esc(label)}</a>`,
      md: `[${label}](${target.out ?? site + target.href})`,
      text: label,
    });
  }

  // Tags masked to spaces, so a sentence ending in its tags still ends
  // where its words do.
  const masked = text.replace(TAG, (s) => " ".repeat(s.length));
  let regionStart = 0;
  for (const m of text.matchAll(ARROW)) {
    const href = m[1];
    const target = pages.find((p) => pathOf(p) === href);
    if (!target) throw new Error(`${ctx.where}: → ${href} is not a page of this guide`);
    const before = masked.slice(regionStart, m.index!).trimEnd();
    // The last sentence before the arrow: after the last full stop, question
    // or exclamation mark (a closing quote may follow it) that has more text
    // after it.
    let start = 0;
    for (const b of before.matchAll(/[.!?]["”’)]?\s+(?=\S)/g)) start = b.index! + b[0].length;
    const sentence = before.slice(start);
    const own = ctx.page?.anchors?.find((a) => a.target === href && sentence.includes(a.text));
    let phrase: string;
    if (own) phrase = own.text;
    else {
      const found = [...sentence.matchAll(/\bthe ([\p{L}-]+) page\b/gu)];
      if (!ctx.guide.lang.startsWith("en") || found.length !== 1)
        throw new Error(`${ctx.where}: the arrow to ${href} has no anchor in "${sentence.trim()}"; give the page an anchors entry`);
      if (found[0][1] !== target.label.toLowerCase())
        throw new Error(`${ctx.where}: "${found[0][0]}" points at ${href}, whose label is ${target.label}`);
      phrase = found[0][0];
    }
    const at = sentence.indexOf(phrase);
    if (at < 0 || sentence.indexOf(phrase, at + 1) >= 0)
      throw new Error(`${ctx.where}: "${phrase}" must occur exactly once in "${sentence.trim()}"`);
    const from = regionStart + start + at;
    const title = withoutSuffix(target.title);
    if (title === phrase) throw new Error(`${ctx.where}: the title of "${phrase}" repeats it`);
    pieces.push({
      from, to: from + phrase.length,
      html: `<a href="${attr(href)}" title="${attr(title)}">${esc(phrase)}</a>`,
      md: `[${phrase}](${site}${href})`,
      text: phrase,
    });
    pieces.push({ from: m.index!, to: m.index! + m[0].length, html: "", md: "", text: "" });
    regionStart = m.index! + m[0].length;
  }

  pieces.sort((a, b) => a.from - b.from);
  let html = "";
  let md = "";
  let plain = "";
  let at = 0;
  for (const p of pieces) {
    if (p.from < at) throw new Error(`${ctx.where}: two marks overlap at "${text.slice(p.from, p.from + 40)}"`);
    const between = text.slice(at, p.from);
    html += esc(between) + p.html;
    md += between + p.md;
    plain += between + p.text;
    at = p.to;
  }
  html += esc(text.slice(at));
  md += text.slice(at);
  plain += text.slice(at);

  // The words must be the copy's, marks aside: computed the blunt way at
  // the top, so a slip in the bookkeeping above fails the build instead of
  // shipping a sentence nobody approved.
  if (plain.replace(/\s+/g, " ").trim() !== expected)
    throw new Error(`${ctx.where}: the rendered words differ from the copy:\n${plain}\n${expected}`);

  return { html: typeset(html.trim()), md: md.trim(), text: plain.replace(/\s+/g, " ").trim() };
}

/** A single string of copy (a lede, an answer, a blurb, a source line) as
    inline HTML, or "" when its spans have all expired. */
export function inline(text: string, ctx: Ctx): string {
  const live = applySpans(text, ctx.guide, ctx.today, ctx.where);
  return live.trim() ? marks(live, ctx, SITE).html : "";
}

export function inlineMd(text: string, ctx: Ctx): string {
  const live = applySpans(text, ctx.guide, ctx.today, ctx.where);
  return live.trim() ? marks(live, ctx, SITE).md : "";
}

/** The same string as words alone: a link's label without the link, no
    span around a date, nothing escaped. For structured data, which is read
    off the page: a relative link inside it points nowhere, and a span is
    not one of the tags an FAQ answer may carry. */
export function inlineText(text: string, ctx: Ctx): string {
  const live = applySpans(text, ctx.guide, ctx.today, ctx.where);
  return live.trim() ? marks(live, ctx, SITE).text : "";
}

// ----------------------------------------------------------------- blocks

export const SITE = "https://fest.one";

type Block =
  | { kind: "p" | "quote"; parts: { html: string; md: string }[] }
  | { kind: "list" | "lines"; parts: { html: string; md: string }[] };

/** A section body's blocks. Paragraphs are separated by a blank line; a
    paragraph whose lines all start "- " is a list, "> " a quotation, and
    one of several plain lines a list of lines (the lineup's stages). A
    paragraph or item whose spans have all expired is left out. */
function parse(text: string, ctx: Ctx): Block[] {
  const blocks: Block[] = [];
  for (const para of text.split(/\n{2,}/)) {
    const lines = para.split("\n");
    const render = (s: string) => {
      const live = applySpans(s, ctx.guide, ctx.today, ctx.where);
      return live.trim() ? marks(live, ctx, SITE) : undefined;
    };
    const keep = (xs: ({ html: string; md: string } | undefined)[]) => xs.filter((x): x is { html: string; md: string } => !!x);
    if (lines.every((l) => l.startsWith("- "))) {
      const parts = keep(lines.map((l) => render(l.slice(2))));
      if (parts.length) blocks.push({ kind: "list", parts });
    } else if (lines.every((l) => l.startsWith("> "))) {
      const part = render(lines.map((l) => l.slice(2)).join(" "));
      if (part) blocks.push({ kind: "quote", parts: [part] });
    } else if (lines.length > 1) {
      const parts = keep(lines.map(render));
      if (parts.length) blocks.push({ kind: "lines", parts });
    } else {
      const part = render(para);
      if (part) blocks.push({ kind: "p", parts: [part] });
    }
  }
  return blocks;
}

export function blocks(text: string, ctx: Ctx): string {
  return parse(text, ctx)
    .map((b) => {
      if (b.kind === "p") return `<p>${b.parts[0].html}</p>`;
      if (b.kind === "quote") return `<blockquote><p>${b.parts[0].html}</p></blockquote>`;
      const cls = b.kind === "lines" ? ' class="lines"' : "";
      return `<ul${cls}>${b.parts.map((p) => `<li>${p.html}</li>`).join("")}</ul>`;
    })
    .join("\n");
}

export function blocksMd(text: string, ctx: Ctx): string {
  return parse(text, ctx)
    .map((b) => {
      if (b.kind === "p") return b.parts[0].md;
      if (b.kind === "quote") return `> ${b.parts[0].md}`;
      return b.parts.map((p) => `- ${p.md}`).join("\n");
    })
    .join("\n\n");
}
