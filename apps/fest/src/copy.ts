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
//   the target's `linkTitle`, or its own title without the suffix.
// - `[label](/field-day/faq/#cant-bring)`: a link to a section of a guide's
//   page. Its title is that section's heading, which says more than "the
//   section below" does.
// - `**label**`: the label a price card opens with (Field Day's tickets
//   page), or a list item's lead words (Primavera Sound São Paulo's ticket
//   types and editions). Bold on the page and in the Markdown twin; plain
//   words in the structured data.
// - `{{until key}}…{{/until}}`: words that stop being true on a date the
//   guide names in `expires` (a price, a fare). From that day the build
//   drops them from the page, the Markdown twin and llms.txt. A span may
//   run across paragraphs, so a sentence and the link on the line under it
//   go together; it may also sit in a heading or a question.
// - `{{read}}` before a group of tags: the day the facts those tags name
//   were read, printed where the mark stands ("อ่านเมื่อ 22 ตุลาคม 2026"),
//   on Wonderfruit's price, sale-state, gate-hours, transport and hotel
//   lines whose words carry no date (the session after its gate 2). The
//   words are the language's (READ_WORDS), the year always the Gregorian.
// - Lines that each open with a number and a full stop ("1. ", "2. "): a
//   numbered list, whose numbers the list prints (Wonderfruit's sale
//   rounds).
//
// The text outside the anchors is never changed: `inline` checks that what
// it renders reads exactly as the copy does with the marks taken out.
import type { FestEvent, Guide, GuidePage, Section } from "./data/types";

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

/** A span that runs over a line break, cut into one span a line with the
    same key: a body is read a paragraph and a line at a time, and each
    piece then drops on its own day like any other. A list item's "- " and
    a quotation's "> " stay outside, so a line whose words have gone is
    still an empty item, which the parser leaves out. A span on one line is
    returned as it was. */
function splitSpans(text: string): string {
  return text.replace(SPAN, (whole: string, key: string, body: string) => {
    if (!body.includes("\n")) return whole;
    return body
      .split(/(\n+)/)
      .map((seg) => {
        if (seg.startsWith("\n")) return seg;
        const [, mark = "", words] = /^(- |> )?([\s\S]*)$/.exec(seg)!;
        return words.trim() ? `${mark}{{until ${key}}}${words}{{/until}}` : seg;
      })
      .join("");
  });
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
    // A price and the word after it, which says what the price is: "$219.90
    // including fees" broke after the figure in Field Day's lede at 320 and
    // 360 px, and the line-break sweep holds a figure to its word.
    `(?:A?\\$)\\d[\\d,.]*\\d (?:including|plus|with|for|each|a|per)\\b`, // $219.90 including
    // A word whose first part is one letter, which a line would otherwise
    // break after its hyphen and strand: "alcohol, e-|cigarette liquids" in
    // Field Day's can't-bring list at 320 px.
    `\\b[A-Za-z](?:-[A-Za-z]+)+\\b`, // e-cigarette, A-to-Z
  ].join("|"),
  "g",
);
// Spanish, as Chile writes it (Creamfields Chile): a day with its month,
// and the year when "de 2026" follows ("14 de noviembre de 2026"); a time
// with its "horas"; an area with its unit ("5.000 m²"); a struck price with
// its "(tachado)", which says the figure is struck to a reader who cannot
// see the line through it; a count with its noun ("4 entradas", "85
// artistas").
const MES = "(?:enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|setiembre|octubre|noviembre|diciembre)";
const KEEP_ES = new RegExp(
  [
    `\\b\\d{1,2} de ${MES}(?: de \\d{4})?(?![\\p{L}\\d])`, // 14 de noviembre de 2026
    `\\b\\d{1,2}:\\d{2} horas\\b`, // 12:00 horas
    `\\b\\d[\\d.]* m²`, // 5.000 m²
    `\\$\\d[\\d.]*\\d \\(tachado\\)`, // $128.000 (tachado)
    `\\b\\d[\\d.,]*%? (?:años|meses|días|cuotas|abonos|entradas|personas|artistas|escenarios)(?!\\p{L})`, // 4 entradas
  ].join("|"),
  "gu",
);
// Portuguese, as Brazil writes it (Primavera Sound São Paulo): a day with
// its month, ordinal or not, and its year ("5 de dezembro de 2026", "1º de
// dezembro"); a time, or a range of two ("12h30", "das 13h às 17h"); a sum
// in reais with its sign ("R$ 765,45", the organiser's "R$1.200,00"); a
// count or an age with its noun ("40 nomes", "5 a 15 anos"); a law's
// number ("nº 10.741/2003"); a paragraph sign with its number ("§ 10"); a
// line with its number and name ("Linha 9-Esmeralda", which would strand
// "9-"); a phone number and a CEP, which a parent copies from the dates
// page (the fest director's gate-3 condition 6); and two the line-break
// sweep of 22 October 2026 found: "line-up", the guide's own word, which a
// browser breaks at its hyphen ("line-|up" in a link at 600 px), and a
// range of years ("de 2022 a | 2026" at 414).
const MES_PT = "(?:janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)";
const HORA = "\\d{1,2}h(?:\\d{2})?";
const KEEP_PT = new RegExp(
  [
    `\\b\\d{1,2}º? de ${MES_PT}(?: de \\d{4})?(?![\\p{L}\\d])`, // 5 de dezembro de 2026, 1º de dezembro
    `\\b${HORA}(?: às ${HORA})?(?![\\p{L}\\d])`, // 12h30, 13h às 17h
    `\\bR\\$ ?\\d[\\d.]*(?:,\\d{2})?`, // R$ 765,45, R$1.200,00
    `\\b\\d[\\d.,]*%?(?: a \\d[\\d.,]*)? (?:anos|meses|dias|nomes|artistas|pessoas|vagas|parcelas|ingressos|edições|shows)(?!\\p{L})`, // 40 nomes, 5 a 15 anos
    `\\bnº \\d[\\d./]*\\d`, // nº 10.741/2003
    `§ \\d+º?`, // § 10, § 2º
    `\\bLinha \\d+(?:-\\p{L}+)?`, // Linha 9-Esmeralda
    `\\(\\d{2}\\) \\d{4,5}-\\d{4}\\b`, // (11) 5666-8822
    `(?:\\bCEP )?\\b\\d{5}-\\d{3}\\b`, // CEP 04801-010
    `\\b[Ll]ine-up\\b`, // line-up
    `\\b\\d{4} a \\d{4}\\b`, // 2022 a 2026
  ].join("|"),
  "gu",
);
// Thai, as Thailand writes it (Wonderfruit): a day or a range of days with
// its month, and its year when one follows ("3–7 ธันวาคม 2026"); a sum
// with its baht ("12,900 บาท"); a time with its "น." ("16:00 น."); a
// distance, a span of time or a count with its noun ("135 กิโลเมตร", "3
// คน", "20–24 ปี"); "VAT 7%". Thai leaves no space between words, only
// between phrases and around a number or a Latin word, so the space inside
// "12,900 บาท" is exactly where a line breaks, and leaves the figure
// without its unit (the plan's "12,900 บาท never splits"). Lookbehinds,
// not \b, which knows no Thai letter. The month names are the table the
// read dates print from (READ_WORDS): Gregorian years throughout, never
// the Buddhist calendar a bare th-TH locale would print.
const THAI_MONTHS = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
const DUEAN = `(?:${THAI_MONTHS.join("|")})`;
const THAI_DATE = `(?<![\\d,])\\d{1,2}(?:–\\d{1,2})? ${DUEAN}(?: \\d{4}(?!\\d))?`;
const KEEP_TH = new RegExp(
  [
    THAI_DATE, // 3–7 ธันวาคม 2026, 2 พฤศจิกายน
    `(?<![\\d,.])\\d[\\d,]*(?:–\\d[\\d,]*)? ?บาท`, // 12,900 บาท
    `(?<![\\d.:])\\d{1,2}[:.]\\d{2}(?:–\\d{1,2}[:.]\\d{2})? น\\.`, // 16:00 น.
    `(?<![\\d,.])\\d[\\d,.]*(?:–\\d[\\d,.]*)? (?:กิโลเมตร|ชั่วโมง|นาที|คน|แห่ง|วัน|คืน|ปี|ใบ|หลัง|เตียง|เวที|ครั้ง)`, // 3 คน, 20–24 ปี
    `VAT \\d+%`, // VAT 7%
  ].join("|"),
  "gu",
);
// Mexican Spanish (Zamna Tulum) is Chile's list and the forms its copy
// adds: a sum with its currency code ("90 USD", "6.00 USD", "1,403.01
// USD": decimal point, comma thousands), a clock time on its own or with
// its "a. m." ("22:00", "3:00 a. m."), a sale phase with its ordinal ("1.er
// release", "4.º release"), a phone number ("+52 55 7200 0052") and the
// seller's three-word name, "Mr Nice VIP", which a 264 px card would
// otherwise break after its "Mr" (the fest director's gate-3 condition 4).
// A row of its own, so Chile's pages come out as they were.
const ES_MX_TOKENS = [
  `\\b\\d[\\d,]*(?:\\.\\d+)? USD\\b`, // 90 USD, 1,403.01 USD
  `\\b\\d{1,2}:\\d{2} [ap]\\. m\\.`, // 3:00 a. m.
  `\\b\\d\\.(?:er|º|ª|o) release\\b`, // 1.er release, 4.º release
  `\\+52(?: \\d{2,4}){3}\\b`, // +52 55 7200 0052
  `\\bMr Nice VIP\\b`, // Mr Nice VIP
];
const KEEP_ES_MX = new RegExp(
  [
    KEEP_ES.source,
    ...ES_MX_TOKENS,
    `\\b\\d{1,2}:\\d{2}\\b(?! horas| [ap]\\. m\\.)`, // 22:00
  ].join("|"),
  "gu",
);
/** Each language's keep-together list, by the guide's locale where it has
    a row of its own ("es-MX"), else by its language: "es-CL" reads es. A
    guide in a language with no row does not build. */
const KEEP: Record<string, RegExp> = { en: KEEP_TOGETHER, es: KEEP_ES, "es-mx": KEEP_ES_MX, pt: KEEP_PT, th: KEEP_TH };
// In a long run a split date is a nicety, but a sign and the number it
// belongs to are one token wherever they stand: the sweep found "R$ |
// 765,45", "(11) | 5666-8822", "nº | 12.933" and "Linha | 9-Esmeralda" in
// Primavera Sound São Paulo's paragraphs at 320 px, and a phone number
// split in two is the fault the fest director's condition 6 names. A
// no-break space holds each pair (the copy's words unchanged, as the
// Glance's date is held), not a span, which would cut the paragraph into
// pieces the sweep reads as short.
const GLUE_PT = /(R\$|\(\d{2}\)|\bnº|§|\bCEP|\bLinha) (?=\d)/gu;
// In Thai every item of the keep-together list is such a token: a Thai
// paragraph runs long between two links, and a date or a sum split at its
// space reads as two facts. Its spaces turn no-break, and a range's en
// dash takes a word joiner after it, since a browser breaks after a dash
// ("21– | 22 ตุลาคม 2026" in the stay lede at 320 px, 22 October 2026); the
// words unchanged.
// In Mexican Spanish the same holds for the forms its row adds, and for a
// date: a night card runs long between its lead and its link, and "90 |
// USD", "+52 55 | 7200 0052", "Mr | Nice VIP" or "22 de | octubre de 2026"
// split at a line's end read as two things. The line-break sweep of 22
// October 2026 measured 373 dates split from 320 to 1280 px on the three
// pages before the dates joined the glue; the longest, "31 de diciembre de
// 2026", is 211 px, inside the 262 px a card gives its text at 320.
const GLUE_ES_MX = new RegExp([...ES_MX_TOKENS, `\\b\\d{1,2} de ${MES}(?: de \\d{4})?(?![\\p{L}\\d])`].join("|"), "gu");
const GLUE: Record<string, (run: string) => string> = {
  pt: (run) => run.replace(GLUE_PT, "$1\u00a0"),
  "es-mx": (run) => run.replace(GLUE_ES_MX, (m) => m.replace(/ /g, "\u00a0")),
  th: (run) => run.replace(KEEP_TH, (m) => m.replace(/ /g, "\u00a0").replace(/–/g, "–\u2060")),
};
const unescaped = (s: string) => s.replace(/&(amp|lt|gt|quot);/g, "_");
/** The rendered HTML with its dates and counts kept whole, in each short
    run of text between two tags, and a language's glued pairs in the long
    ones. Tags are left alone: a title attribute never gets a span. */
const typeset = (html: string, lang: string) => {
  const keep = KEEP[lang.toLowerCase()] ?? KEEP[lang.slice(0, 2).toLowerCase()];
  if (!keep) throw new Error(`copy.ts has no keep-together list for "${lang}"`);
  const glue = GLUE[lang.toLowerCase()] ?? GLUE[lang.slice(0, 2).toLowerCase()];
  return html
    .split(/(<[^>]*>)/)
    .map((run) =>
      run.startsWith("<")
        ? run
        : [...unescaped(run)].length > 160
          ? glue ? glue(run) : run
          : run.replace(keep, (m) => `<span class="nowrap">${m}</span>`),
    )
    .join("");
};

// A heading is text Astro would escape, set as it always was, with three
// breaks kept out of it: a month parted from its year ("1 January | 2027,",
// Field Day's "When" heading at 600 to 944 px) and a price from the noun it
// prices ("$99.90 | tickets:", at 390 to 600), both found by the line-break
// sweep, and a range parted at its dash ("18– | 25s,", the same tickets
// heading at 1280, in the shots). Headings balance, and a balanced heading
// breaks wherever its halves come out even, so those go in a span as in a
// paragraph.
// Not the whole date: at 320 px a heading is 24 px type in a 292 px column,
// and "22 October 2026" alone measured wider than that, so a span around it
// pushed the FAQ page 13 px sideways. The day may take the line before its
// month there ("read 22 | October 2026"), which is where the heading broke
// before. A day with its month and no year ("Monday 28 December", Beyond
// The Valley's lineup days) is left as it was: Beyond The Valley's pages
// are to come out byte for byte as before (Field Day's card, the fest
// director's condition 11). The escaping is Astro's own (html-escaper), so
// a heading with no match prints the bytes {heading} always printed.
const HEADING_KEEP = new RegExp(
  [`\\b${MONTH} \\d{4}\\b`, `(?:A?\\$)\\d[\\d,.]*\\d \\p{L}+`, `\\b\\d+[–-]\\d+\\p{L}*`].join("|"),
  "gu",
);
// A Spanish heading adds a day with its month, and its year when one
// follows: "Domingo 15 de noviembre: seis escenarios", Creamfields Chile's
// lineup days, broke "15 | de noviembre" and "14 de | noviembre" from 320
// to 480 px in the line-break sweep. Not a nowrap: at the heading's 24 px,
// "15 de noviembre:" is 313 px, wider than the 292 px column at 320, which
// is the overflow a nowrap date caused on Field Day. It is an inline block
// from 360 px up (theme.css, .keep-date): whole wherever it fits, wrapping
// inside itself where it cannot, so it never overflows.
const HEADING_KEEP_ES = new RegExp(`\\b\\d{1,2} de ${MES}(?: de \\d{4})?(?![\\p{L}\\d])[:,.;]?`, "giu");
// Portuguese the same way ("Sábado, 5 de dezembro de 2026", Primavera
// Sound São Paulo's line-up days), the day's ordinal included.
const HEADING_KEEP_PT = new RegExp(`\\b\\d{1,2}º? de ${MES_PT}(?: de \\d{4})?(?![\\p{L}\\d])[:,.;]?`, "giu");
// Thai the same way, with the bracket a date may close ("ไลน์อัพ
// Wonderfruit 2026 (ประกาศ 1 กันยายน 2026)").
const HEADING_KEEP_TH = new RegExp(`${THAI_DATE}[:,.;)]?`, "gu");
const HEADING_KEEP_BY: Record<string, RegExp> = { es: HEADING_KEEP_ES, pt: HEADING_KEEP_PT, th: HEADING_KEEP_TH };
const ASTRO_ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" };
export const headingHtml = (text: string, lang = "en") => {
  const html = text.replace(/[&<>'"]/g, (c) => ASTRO_ESCAPES[c]).replace(HEADING_KEEP, (m) => `<span class="nowrap">${m}</span>`);
  const keep = HEADING_KEEP_BY[lang.slice(0, 2).toLowerCase()];
  return keep ? html.replace(keep, (m) => `<span class="keep-date">${m}</span>`) : html;
};

// A price card's total stays with the word before its "=": "$209.90 +
// $10.00 fees = $219.90" may break before "fees", never between "=" and the
// total, which alone on a line reads as a figure of its own (the fest
// director's condition 7 on Field Day). Cards only: the same figures in
// running prose are prose, and Beyond The Valley's "= $2,911" is set as it
// always was.
const TOTAL = /[^\s<>]+ = (?:A?\$)\d[\d,.]*\d/g;
const keepTotals = (html: string) =>
  html
    .split(/(<[^>]*>)/)
    .map((run) => (run.startsWith("<") ? run : run.replace(TOTAL, (m) => `<span class="nowrap">${m}</span>`)))
    .join("");

interface Piece { from: number; to: number; html: string; md: string; text: string }

const LINK = /\[([^\]\n]+)\]\(([^)\s]+)\)/g;
const ARROW = /\s*→ (\/[^\s]*\/)(?=\s|$)/g;
const BOLD = /\*\*([^*\n]+)\*\*/g;

// `{{read}}` and the words it prints: the language's "read on" and the day,
// from a month table, never the locale's calendar (a bare th-TH prints
// 2569 for 2026; the session after Wonderfruit's gate 3).
const READ = /\{\{read\}\}/g;
const READ_WORDS: Record<string, { word: string; months: string[] }> = {
  th: { word: "อ่านเมื่อ", months: THAI_MONTHS },
};
/** "อ่านเมื่อ 21–22 ตุลาคม 2026": when the facts named by the tags right
    after the mark were read, the oldest reading to the newest. A mark with
    no tag after it that has a reading dates nothing, and fails the build. */
function readWords(rest: string, ctx: Ctx): string {
  const words = READ_WORDS[ctx.guide.lang.slice(0, 2).toLowerCase()];
  if (!words) throw new Error(`${ctx.where}: {{read}} has no words for "${ctx.guide.lang}" in copy.ts`);
  const group = /^(?:\s+\[[A-Za-z_][\w.]*\](?!\())+/.exec(rest)?.[0] ?? "";
  const days = tags(group)
    .filter((k) => !isUndated(k))
    .map((k) => readOn(ctx.event, k))
    .filter((d): d is string => !!d)
    .sort();
  if (!days.length) throw new Error(`${ctx.where}: {{read}} is followed by no tag with a reading`);
  const [y1, m1, d1] = days[0].split("-").map(Number);
  const [y2, m2, d2] = days[days.length - 1].split("-").map(Number);
  const month = (n: number) => words.months[n - 1];
  const when =
    days[0] === days[days.length - 1] ? `${d1} ${month(m1)} ${y1}`
    : y1 === y2 && m1 === m2 ? `${d1}–${d2} ${month(m1)} ${y1}`
    : y1 === y2 ? `${d1} ${month(m1)} – ${d2} ${month(m2)} ${y2}`
    : `${d1} ${month(m1)} ${y1} – ${d2} ${month(m2)} ${y2}`;
  return `${words.word} ${when}`;
}

/** One string of copy (a paragraph, a list item, an answer) as inline HTML,
    Markdown and plain text, marks resolved. Expiry spans must already be
    applied. */
function marks(text: string, ctx: Ctx, site: string): { html: string; md: string; text: string } {
  const pieces: Piece[] = [];
  const pages = ctx.guide.pages;
  // Each {{read}} with the words it prints, which are the copy's from here
  // on: the check at the end expects them where the mark stands.
  const reads = [...text.matchAll(READ)].map((m) => ({ at: m.index!, words: readWords(text.slice(m.index! + m[0].length), ctx) }));
  let nth = 0;
  // The words as the copy has them, marks aside: what the rendering must
  // come back to (checked at the end).
  const expected = text
    .replace(READ, () => reads[nth++].words)
    .replace(ARROW, "")
    .replace(TAG, "")
    .replace(LINK, "$1")
    .replace(BOLD, "$1")
    .replace(/\s+/g, " ")
    .trim();

  for (const m of text.matchAll(BOLD))
    pieces.push({
      from: m.index!, to: m.index! + m[0].length,
      html: `<strong>${esc(m[1])}</strong>`,
      md: m[0],
      text: m[1],
    });

  // Muted on the page (theme.css, .read), words in the twins and the
  // structured data, where a reader takes them as the copy's.
  for (const r of reads)
    pieces.push({ from: r.at, to: r.at + "{{read}}".length, html: `<span class="read">${esc(r.words)}</span>`, md: r.words, text: r.words });

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
      const [path, id] = href.split("#");
      const page = pages.find((p) => pathOf(p) === path);
      if (!page) throw new Error(`${ctx.where}: [${label}](${href}) links to no page of this guide`);
      if (id === undefined) target = { href, title: page.linkTitle ?? withoutSuffix(page.title) };
      else {
        // A section of a page: named by its heading, as it reads that day.
        const section = page.sections.find((s) => s.id === id);
        if (!section) throw new Error(`${ctx.where}: [${label}](${href}) names no section of ${path}`);
        target = { href, title: applySpans(section.heading, ctx.guide, ctx.today, ctx.where).trim() };
      }
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
    const title = target.linkTitle ?? withoutSuffix(target.title);
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

  // A no-break space is the copy's own (a Glance date that must not part,
  // which prints this text), so the words-alone rendering keeps it; every
  // other run of space folds to one.
  return { html: typeset(html.trim(), ctx.guide.lang), md: md.trim(), text: plain.replace(/[^\S ]+/g, " ").trim() };
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

type Part = { html: string; md: string };
type Block =
  | { kind: "p" | "quote" | "h3"; parts: Part[] }
  | { kind: "list" | "ol" | "lines" | "links" | "cards" | "dot-row" | "guide-cards"; parts: Part[] }
  | { kind: "table"; rows: string[]; caption?: Part };

/** A line that is one link and nothing else but its tags: a hop the copy
    names by its label after the paragraph that cites it. */
const LINK_LINE = /^\[[^\]\n]+\]\([^)\s]+\)(?:\s+\[[A-Za-z_][\w.]*\])*$/;
/** A price card: "**Label**: $209.90 + $10.00 fees = $219.90. On sale; …".
    The label, then the figures up to the total's full stop, then the rest,
    which is the ticket's status. A list is a row of cards only when every
    item opens so, label and colon: a list whose items only lead with bold
    words ("**Passe Geral** (Primavera Pass, …): pista, …", "**2022** — …")
    stays a list. */
const CARD = /^\*\*([^*\n]+)\*\*(:?)\s*([\s\S]*)$/;
const CARD_OPENING = /^\*\*[^*\n]+\*\*:/;
const CARD_FIGURES = / = (?:A?\$)\d[\d,.]*\d\.(?=\s|$)/;
/** A step of a numbered list: "3. ". */
const ORDERED = /^\d+\. /;

/** One price card: each of its three parts rendered and checked on its
    own, set as a block of its own by the stylesheet (theme.css, ul.cards).
    The spaces between them stay, so the card copies and reads as the
    sentence the copy has. The Markdown is the item as written. */
function card(item: string, ctx: Ctx): Part {
  const m = CARD.exec(item);
  if (!m) throw new Error(`${ctx.where}: a card must open with its **label**: "${item.slice(0, 40)}"`);
  const [, label, colon, rest] = m;
  const end = CARD_FIGURES.exec(rest);
  const figures = end ? rest.slice(0, end.index + end[0].length) : rest;
  const status = end ? rest.slice(end.index + end[0].length).trim() : "";
  const parts = [
    `<span class="card-label">${marks(`**${label}**${colon}`, ctx, SITE).html}</span>`,
    `<span class="card-figures">${keepTotals(marks(figures, ctx, SITE).html)}</span>`,
    ...(status ? [`<span class="card-status">${marks(status, ctx, SITE).html}</span>`] : []),
  ];
  return { html: parts.join(" "), md: marks(item, ctx, SITE).md };
}

/** A card of a section of kind "cards": "**Jueves 31 de diciembre de 2026
    — RENAISSANCE Tulum NYE.** Sasha, … [Página de la noche en el
    organizador (en inglés)](/go/zamna-tulum-renaissance/)". The lead, then
    the words, then the link the item ends on, set on a line of its own
    (theme.css, ul.guide-cards). Five cards end on the same words, so each
    link also carries the card's name for a screen reader, after a colon
    (the native reader, es-MX, on the executor's strings): the lead after
    its dash, else the whole lead, less its full stop. Words only the
    hidden span adds are not the copy's and are not checked as it is. */
const CARD_LEAD = /^\*\*([^*\n]+)\*\*/;
const CARD_LINK = /\s*(\[[^\]\n]+\]\([^)\s]+\))$/;
function guideCard(item: string, ctx: Ctx): Part {
  const lead = CARD_LEAD.exec(item);
  if (!lead) throw new Error(`${ctx.where}: a card must open with its **lead**: "${item.slice(0, 40)}"`);
  const link = CARD_LINK.exec(item);
  const words = link ? item.slice(0, link.index) : item;
  let html = marks(words, ctx, SITE).html;
  if (link) {
    const name = (lead[1].split(" — ").at(-1) ?? lead[1]).replace(/\.$/, "").trim();
    const a = marks(link[1], ctx, SITE).html;
    if (!a.endsWith("</a>")) throw new Error(`${ctx.where}: a card's last link did not render as one: "${link[1]}"`);
    // A space before it, so the card's text copies and reads as the item's
    // words, though the link is set on a line of its own.
    html += ` <span class="card-link">${a.replace(/<\/a>$/, `<span class="visually-hidden">: ${esc(name)}</span></a>`)}</span>`;
  }
  return { html, md: marks(item, ctx, SITE).md };
}

/** A row of a table: "| Venta 2 | $98.000 | $78.400 (tachado) |". */
const TABLE_ROW = /^\|.*\|$/;
/** A lone "**Ticket General**" in a table section: the subheading over
    its group of tables. */
const SUBHEADING = /^\*\*([^*\n]+)\*\*$/;

/** A section body's blocks. Paragraphs are separated by a blank line; a
    paragraph whose lines all start "- " is a list, "> " a quotation, and
    one of several plain lines a list of lines (the lineup's stages). Two
    kinds Field Day brought: a list whose every item opens with a
    **label** and its colon is a row of price cards, and a paragraph whose
    every line is a single link is a run of link lines. Two more in a
    section of kind "table" (Creamfields Chile's prices): a paragraph of
    "|" rows is a table, with the one-line paragraph before it as its
    caption, and a lone **label** line is a subheading. One in a section of
    kind "row" (Primavera Sound São Paulo's acts of a day): a one-line
    paragraph of items joined by " · " is a list, each item drawing the dot
    before it, so the copy's " · " is a mark there, as it is between Field
    Day's sources. A paragraph or item whose spans have all expired is
    left out. */
function parse(text: string, ctx: Ctx, kind: Section["kind"] = "prose"): Block[] {
  const table = kind === "table";
  const blocks: Block[] = [];
  for (const para of splitSpans(text).split(/\n{2,}/)) {
    const lines = para.split("\n");
    const live = (s: string) => applySpans(s, ctx.guide, ctx.today, ctx.where).trim();
    const render = (s: string) => {
      const words = live(s);
      return words ? marks(words, ctx, SITE) : undefined;
    };
    const keep = (xs: (Part | undefined)[]) => xs.filter((x): x is Part => !!x);
    if (lines.every((l) => l.startsWith("- ") || l === "-")) {
      const items = lines.map((l) => live(l.slice(2))).filter(Boolean);
      if (!items.length) continue;
      if (kind === "cards" && items.every((i) => CARD_LEAD.test(i))) blocks.push({ kind: "guide-cards", parts: items.map((i) => guideCard(i, ctx)) });
      else if (items.every((i) => CARD_OPENING.test(i))) blocks.push({ kind: "cards", parts: items.map((i) => card(i, ctx)) });
      else blocks.push({ kind: "list", parts: keep(items.map(render)) });
    } else if (lines.every((l) => l.startsWith("> "))) {
      const part = render(lines.map((l) => l.slice(2)).join(" "));
      if (part) blocks.push({ kind: "quote", parts: [part] });
    } else if (table && lines.map(live).filter(Boolean).length && lines.map(live).filter(Boolean).every((l) => TABLE_ROW.test(l))) {
      const rows = lines.map(live).filter(Boolean);
      // The line before it, a paragraph of one line, names it.
      const before = blocks.at(-1);
      const caption = before?.kind === "p" ? (blocks.pop(), before.parts[0]) : undefined;
      blocks.push({ kind: "table", rows, caption });
    } else if (kind === "row" && lines.length === 1 && live(para).includes(" · ")) {
      // A tag closing the paragraph stays with the last item, where marks()
      // checks it and leaves it out.
      const parts = keep(live(para).split(" · ").map(render));
      if (parts.length) blocks.push({ kind: "dot-row", parts });
    } else if (table && lines.length === 1 && SUBHEADING.test(live(para))) {
      const part = render(SUBHEADING.exec(live(para))![1]);
      if (part) blocks.push({ kind: "h3", parts: [part] });
    } else if (lines.map(live).filter(Boolean).every((l) => LINK_LINE.test(l)) && lines.some((l) => live(l))) {
      blocks.push({ kind: "links", parts: keep(lines.map(render)) });
    } else if (lines.length > 1 && lines.every((l) => ORDERED.test(l))) {
      // Steps in their order (Wonderfruit's four sale rounds): a numbered
      // list, whose numbers the list prints, so they leave the words.
      const parts = keep(lines.map((l) => render(l.replace(ORDERED, ""))));
      if (parts.length) blocks.push({ kind: "ol", parts });
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

/** A table's cells, the separator row ("|---|") left out. */
const cells = (row: string) => row.slice(1, -1).split("|").map((c) => c.trim());
const isRule = (row: string) => cells(row).every((c) => /^:?-{3,}:?$/.test(c));
/** A price the seller strikes, as the copy writes it: "$128.000 (tachado)". */
const STRUCK = /^(\$\d[\d.]*\d) \(tachado\)$/;

/** A table: the header row as column heads, each row led by its first cell
    as the row's head, each other cell carrying its column's name in
    `data-label`, which the narrow layout prints before it (theme.css,
    .price-table). The roles are written out because that layout sets the
    parts as blocks, and a block loses the table's meaning for a screen
    reader. A struck price keeps its strike and its word: the line through
    the figure for the eye, "(tachado)" for everyone, both in the muted ink
    and kept on one line. */
function tableHtml(rows: string[], caption: Part | undefined, ctx: Ctx): string {
  const [head, ...body] = rows.filter((r) => !isRule(r));
  const heads = cells(head);
  const cell = (text: string) => {
    const struck = STRUCK.exec(text);
    return struck
      ? `<span class="nowrap"><s>${esc(struck[1])}</s> (tachado)</span>`
      : marks(text, ctx, SITE).html;
  };
  const tr = (row: string) => {
    const [first, ...rest] = cells(row);
    if (rest.length !== heads.length - 1) throw new Error(`${ctx.where}: a table row has ${rest.length + 1} cells and its head ${heads.length}: "${row}"`);
    const tds = rest.map((c, i) => `<td role="cell" data-label="${attr(heads[i + 1])}"${STRUCK.test(c) ? ' class="struck"' : ""}>${cell(c)}</td>`);
    return `<tr role="row"><th scope="row" role="rowheader">${cell(first)}</th>${tds.join("")}</tr>`;
  };
  return [
    `<table class="price-table" role="table">`,
    caption ? `<caption>${caption.html}</caption>` : "",
    `<thead role="rowgroup"><tr role="row">${heads.map((h) => `<th scope="col" role="columnheader">${cell(h)}</th>`).join("")}</tr></thead>`,
    `<tbody role="rowgroup">${body.map(tr).join("")}</tbody>`,
    `</table>`,
  ].join("");
}

export function blocks(text: string, ctx: Ctx, kind: Section["kind"] = "prose"): string {
  return parse(text, ctx, kind)
    .map((b) => {
      if (b.kind === "table") return tableHtml(b.rows, b.caption, ctx);
      if (b.kind === "h3") return `<h3>${b.parts[0].html}</h3>`;
      if (b.kind === "p") return `<p>${b.parts[0].html}</p>`;
      if (b.kind === "quote") return `<blockquote><p>${b.parts[0].html}</p></blockquote>`;
      if (b.kind === "ol") return `<ol>${b.parts.map((p) => `<li>${p.html}</li>`).join("")}</ol>`;
      // Links out, one to a line: a lone one is a paragraph of its own.
      if (b.kind === "links" && b.parts.length === 1) return `<p class="link-lines">${b.parts[0].html}</p>`;
      const cls = b.kind === "list" ? "" : ` class="${b.kind === "links" ? "link-lines" : b.kind}"`;
      return `<ul${cls}>${b.parts.map((p) => `<li>${p.html}</li>`).join("")}</ul>`;
    })
    .join("\n");
}

export function blocksMd(text: string, ctx: Ctx, kind: Section["kind"] = "prose"): string {
  return parse(text, ctx, kind)
    .map((b) => {
      // The table as the copy writes it, under its caption line.
      if (b.kind === "table") return [...(b.caption ? [b.caption.md, ""] : []), ...b.rows].join("\n");
      if (b.kind === "h3") return `### ${b.parts[0].md}`;
      if (b.kind === "p") return b.parts[0].md;
      if (b.kind === "quote") return `> ${b.parts[0].md}`;
      if (b.kind === "links" && b.parts.length === 1) return b.parts[0].md;
      // Numbered again from one: a step whose words have expired is gone.
      if (b.kind === "ol") return b.parts.map((p, i) => `${i + 1}. ${p.md}`).join("\n");
      // A row of names reads in Markdown as the copy writes it.
      if (b.kind === "dot-row") return b.parts.map((p) => p.md).join(" · ");
      return b.parts.map((p) => `- ${p.md}`).join("\n");
    })
    .join("\n\n");
}

// ---------------------------------------------------------------- sources

/** A page's sources. One line is one paragraph, as Beyond The Valley's
    are. Several lines are one source each (Field Day's): a row whose items
    each draw the "·" before them in the row's gap, so wrapping can never
    leave a dot at the end or the start of a line (theme.css, .sources-row).
    A source whose span has expired is left out of the row. */
export function sourcesHtml(text: string, ctx: Ctx): string {
  const lines = text.split("\n");
  // Sources written as a list, one "- " item each (Creamfields Chile's,
  // whose items are long sentences with their own reading dates): a list.
  if (lines.length > 1 && lines.every((l) => l.startsWith("- "))) return blocks(text, ctx);
  if (lines.length === 1) {
    const one = inline(text, ctx);
    return one ? `<p>${one}</p>` : "";
  }
  const items = lines.map((l) => inline(l, ctx)).filter(Boolean);
  return items.length ? `<p class="sources-row">${items.map((i) => `<span>${i}</span>`).join("")}</p>` : "";
}

/** The same in Markdown: the row's sources on one line, " · " between. */
export function sourcesMd(text: string, ctx: Ctx): string {
  const lines = text.split("\n");
  if (lines.length > 1 && lines.every((l) => l.startsWith("- "))) return blocksMd(text, ctx);
  return text
    .split("\n")
    .map((l) => inlineMd(l, ctx))
    .filter(Boolean)
    .join(" · ");
}
