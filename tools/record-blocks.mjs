// Where each dated record sits in its source file: the feed entries in
// packages/content and the records in apps/musical/src/data. Read by
// tools/item-dates.mjs, which dates the records that have no dates yet, and
// by tests/record-dates.test.js, which fails on an edit that left a
// record's `updatedAt` behind.

/** Every entry at one level of a file: its slug and the lines it occupies.
 *
 *  Read off the indentation rather than by matching braces. Brace matching
 *  has to step over strings to survive a `{` inside a sentence, and once it
 *  is doing that it also has to step over comments — an apostrophe in
 *  `// don't` opens a string that swallows the next several entries, which
 *  is exactly how the first version of this lost 25 of 327. These files are
 *  formatted, every entry opens on a line that is `  {` and closes on `  }`
 *  or `  },`, and that is checked by the callers rather than assumed.
 *
 *  `indent` is where the braces sit: 2 for the top level. Below it, only the
 *  arrays named in `within` hold entries — a run's sellers carry a slug too,
 *  and are part of their run rather than records of their own. */
export function entries(text, indent = 2, within = null) {
  const pad = " ".repeat(indent);
  const lines = text.split("\n");
  const out = [];
  let array = null;
  let open = -1;
  let slug = null;
  let slugLine = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (within && open < 0) {
      const a = new RegExp(`^${pad.slice(2)}([A-Za-z]+): \\[$`).exec(line);
      if (a) { array = a[1]; continue; }
    }
    if (within && !within.includes(array)) continue;
    if (line === `${pad}{`) { open = i; slug = null; slugLine = -1; continue; }
    if (open < 0) continue;
    if (slug === null) {
      const m = new RegExp(`^${pad}  slug: ["']([^"']+)["']`).exec(line);
      if (m) { slug = m[1]; slugLine = i; continue; }
    }
    if (line === `${pad}}` || line === `${pad}},`) {
      if (slug !== null) out.push({ slug, from: open + 1, to: i + 1, after: slugLine + 1, indent });
      open = -1;
      slug = null;
    }
  }
  return out;
}

/** The arrays inside a top-level record whose entries are records of their
    own: a show's sections and clips each have a page. */
export const NESTED = ["sections", "clips"];

/** A section exported on its own — `export const historySection: Section =
    {` — whose page is the whole file: the history section renders every
    milestone in history.ts, the songs section every song in songs.ts. So it
    is dated by the file, the one case here where the file is the record. */
export function wholeFile(text) {
  const lines = text.split("\n");
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    if (!/^export const [A-Za-z]+: Section = \{$/.test(lines[i])) continue;
    for (let j = i + 1; j < lines.length && lines[j] !== "};"; j++) {
      const m = /^ {2}slug: ["']([^"']+)["']/.exec(lines[j]);
      if (m) { out.push({ slug: m[1], from: 1, to: lines.length, after: j + 1, indent: 0, whole: true }); break; }
    }
  }
  return out;
}

/** The lines of [from, to] that no nested entry claims. */
export function ownRanges(e, kids) {
  const ranges = [];
  let start = e.from;
  for (const kid of kids.filter((k) => k.from > e.from && k.to < e.to).sort((a, b) => a.from - b.from)) {
    if (kid.from > start) ranges.push([start, kid.from - 1]);
    start = kid.to + 1;
  }
  if (start <= e.to) ranges.push([start, e.to]);
  return ranges;
}

/** Every record in a feed file or one of musical's data files, as what it
    says and when it says it changed. A feed has no nested records and no
    whole-file sections, so there it is simply every entry.

    `key` names the record across versions of the file: its slug, after its
    show where it has one — a run's slug is only unique inside its show — and
    after its parent's key for a section or clip. `text` is the record's own
    lines without its two dates, with runs of whitespace collapsed, so that
    re-indenting or re-wrapping a record is not an edit to it; a show's text
    leaves out its sections and clips, as its dates do. */
export function records(text) {
  const lines = text.split("\n");
  const top = entries(text);
  const kids = entries(text, 6, NESTED);
  const own = (e) => ownRanges(e, kids).flatMap(([from, to]) => lines.slice(from - 1, to));
  const field = (body, pad, name) => body.map((l) => new RegExp(`^${pad}${name}: "([^"]+)"`).exec(l)?.[1]).find(Boolean);

  const keyed = new Map();
  for (const e of top) {
    const show = field(own(e), "    ", "show");
    keyed.set(e, show ? `${show}/${e.slug}` : e.slug);
  }
  for (const kid of kids) {
    const parent = top.find((e) => e.from < kid.from && e.to > kid.to);
    keyed.set(kid, `${parent ? keyed.get(parent) : "?"}/${kid.slug}`);
  }
  for (const e of wholeFile(text)) keyed.set(e, e.slug);

  return [...keyed].map(([e, key]) => {
    const pad = " ".repeat(e.indent + 2);
    const body = own(e);
    const isDate = new RegExp(`^${pad}(createdAt|updatedAt): `);
    return {
      key,
      createdAt: field(body, pad, "createdAt"),
      updatedAt: field(body, pad, "updatedAt"),
      text: body.filter((l) => !isDate.test(l)).join("\n").replace(/\s+/g, " ").trim(),
    };
  });
}
