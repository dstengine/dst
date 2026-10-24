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
// - `[list[selector].key]`: a list's item named by the selector the copy
//   writes (Igloofest: `editions[Gatineau 2027].note`, `sellers[0]`,
//   `transport[Montréal, métro]`), its `key` in the sheet or its index.
// - `… sur sa page. → /igloofest/gatineau/ · → /igloofest/quebec/`: an
//   arrow group, each target anchored in the same sentence; where the
//   sentence names none of them, the guide's `anchors` say so (`visible`)
//   and the targets print after it under their labels (Igloofest's tickets
//   page, the fest director's D5).
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

// A key may name a list's item by a selector, then go on into it:
// `editions[Gatineau 2027].note`, `sellers[0]` (Igloofest, whose copy
// addresses the scout's lists that way). The sheet gives each item a
// selector names a `key` equal to it; a number is an index.
const TAG_BODY = "[A-Za-z_][\\w.]*(?:\\[[^\\]\\n]+\\](?:\\.[\\w.]+)?)?";
const TAG = new RegExp(`(^|\\s+)\\[(${TAG_BODY})\\](?!\\()`, "g");
/** A key's steps: `editions[Gatineau 2027].note` is editions, the item
    keyed "Gatineau 2027", its note; `sellers.megatix` is two steps. */
const keyParts = (key: string) => [...key.matchAll(/\[([^\]]+)\]|([^.[\]]+)/g)].map((m) => m[1] ?? m[2]);

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
export function resolve(sheet: Record<string, unknown>, key: string | string[]): unknown {
  const parts = Array.isArray(key) ? key : keyParts(key);
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
  const parts = keyParts(key);
  for (let n = parts.length; n > 0; n--) {
    const v = resolve(event.sheet, parts.slice(0, n));
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
// French, as Quebec writes it (Igloofest): a day with its month, and its
// year when one follows ("14 janvier 2027", "1er janvier 2020"); an age or
// a count with its noun ("18 ans", "9 000 Igloosapiens"), which the
// line-break sweep of 22 October 2026 found split at 320 px ("réservés aux
// 18 | ans et plus", "plus de 9 000 | Igloosapiens"). A time, a sum, a
// grouped figure and an ordinal need no span: the OQLF's no-break spaces
// (oqlf, below) already hold each together, in long runs as well.
const MOIS = "(?:janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)";
const FR_DATE = `(?<!\\d)\\d{1,2}(?:er)?[ \\u00a0]${MOIS}(?:[ \\u00a0]\\d{4})?(?![\\p{L}\\d])`;
const FR_NOUN = "(?:ans|mois|jours|soirées|nuits|scènes|villes|billets|artistes|personnes|éditions|Igloosapiens)";
const FR_COUNT = `(?<![\\d,.])\\d[\\d\\u00a0]*(?: à \\d+)?[ \\u00a0]${FR_NOUN}(?![\\p{L}\\d])`;
const KEEP_FR = new RegExp([FR_DATE, FR_COUNT].join("|"), "gu");
// English, as Zamna Tulum's English guide writes it (the twin of its
// Mexican Spanish one, 24 October 2026): the forms ES_MX_TOKENS holds, as
// the English copy prints them. A sum with its currency code ("2,196 USD",
// "6.00 USD"), a clock time with its "a.m." ("3:00 a.m."), a sale phase
// with its ordinal ("1st release", "4th release"), a phone number ("+52 55
// 7200 0052") and the seller's three-word name, "Mr Nice VIP". A later
// English guide adds the forms its own sweep finds, each with the guide
// that needed it. Creamfields Chile's (24 October 2026) writes a sum with
// its code before it, as Chile's pesos and GOV.UK's dollars are printed
// for an English reader ("CLP 98,000", "USD 46"), and the club's phone
// ("+56 2 2693 9600"). Wonderfruit's (24 October 2026) writes the baht the
// same way ("THB 12,900"), which its sweep found split at 320 px.
const EN_TOKENS = [
  `\\b\\d[\\d,]*(?:\\.\\d+)? USD\\b`, // 2,196 USD, 6.00 USD (Zamna Tulum)
  `\\b\\d{1,2}:\\d{2} [ap]\\.m\\.`, // 3:00 a.m. (Zamna Tulum)
  `\\b\\d(?:st|nd|rd|th) release\\b`, // 1st release, 4th release (Zamna Tulum)
  `\\+52(?: \\d{2,4}){3}\\b`, // +52 55 7200 0052 (Zamna Tulum)
  `\\bMr Nice VIP\\b`, // Mr Nice VIP (Zamna Tulum)
  // A bonus with its word, ahead of the bare sum below so that it wins at
  // the same place: QA round 1 (24 October 2026) found the five short items
  // of the main page's bonus scale broken at 320 px, "CLP 6,000 | bonus".
  `\\bCLP \\d[\\d,]* bonus\\b`, // CLP 5,000 bonus (Creamfields Chile)
  `\\b(?:CLP|USD) \\d[\\d,]*\\b`, // CLP 98,000, USD 46 (Creamfields Chile)
  `\\+56(?: \\d{1,4}){3}\\b`, // +56 2 2693 9600 (Creamfields Chile)
  // The baht keeps the word after it that says what the sum prices, as
  // KEEP_TOGETHER holds a dollar price to its word: Wonderfruit's sweep
  // found "THB 1,700 | a guest" and "THB 5,000 | at the door" at 320 and
  // 390 px.
  `\\bTHB \\d[\\d,]*(?: (?:a|at|in|before|for|each|per)\\b)?`, // THB 12,900, THB 1,700 a guest (Wonderfruit)
  // The line-break sweep of Creamfields Chile's English pages (24 October
  // 2026) found each of these split at a line's end, from 320 to 480 px: a
  // size from its unit, a phase from its number, a share from its word, an
  // ordinal from its noun, the seller's quoted age from its word, and the
  // "line-" of a short link text stranding its "up" (DESIGN.md: a short
  // hyphenated word strands no scrap). A short run holds each in a span; in
  // a long one a no-break space holds the first five, and the hyphen is
  // prose's to break.
  `\\b\\d[\\d,.]* m²`, // 5,000 m², and the seller's own "5.000 m²" (Creamfields Chile)
  `\\bVenta \\d\\b`, // Venta 3 (Creamfields Chile)
  `\\b\\d+% off\\b`, // 20% off (Creamfields Chile)
  `\\b\\d+(?:st|nd|rd|th) anniversary\\b`, // 20th anniversary (Creamfields Chile)
  `\\b\\d+ años\\b`, // "mayores de 18 años", quoted (Creamfields Chile)
  `\\b[Ll]ine-up\\b`, // the line-up page (Creamfields Chile)
  `\\bthree-bed\\b`, // a shared three-bed tent stranded its "bed" at 320 px (Wonderfruit)
];
const KEEP_EN = new RegExp([KEEP_TOGETHER.source, ...EN_TOKENS].join("|"), "g");
/** Each language's keep-together list, by the guide's locale where it has
    a row of its own ("es-MX"), else by its language: "es-CL" reads es. A
    guide in a language with no row does not build.
    "en" is the house's English as it stands: the keep list and the tokens,
    and the glue below, as es-MX, th and fr have; an English guide in a
    locale with no row of its own (a bare "en", an "en-GB" to come) takes
    it. "en-au" is a frozen row: Beyond The Valley's and Field Day's pages
    as they were set before "en" took the tokens, so that a token added for
    a later English guide never re-sets them. */
const KEEP: Record<string, RegExp> = { en: KEEP_EN, "en-au": KEEP_TOGETHER, es: KEEP_ES, "es-mx": KEEP_ES_MX, pt: KEEP_PT, th: KEEP_TH, fr: KEEP_FR };
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
// In Quebec French the same holds for a date and for a count with its
// noun: the guide's paragraphs run long between two links, and the sweep
// of 22 October 2026 measured 83 dates split at 320 px on Igloofest's
// seven pages ("consultée le 22 | octobre 2026", "du jeudi 14 | janvier
// au samedi…") and "18 | ans", "21 | ans" in its age lines. The longest
// glued date, "31 décembre 2026", is well inside the 292 px column.
const GLUE_ES_MX = new RegExp([...ES_MX_TOKENS, `\\b\\d{1,2} de ${MES}(?: de \\d{4})?(?![\\p{L}\\d])`].join("|"), "gu");
// In English the same holds for the tokens and for a day with its month,
// as in Mexican Spanish: Zamna Tulum's English pages run long between two
// links, and "2,196 | USD", "Mr | Nice VIP" or "24 | October 2026" split
// at a line's end read as two things. The year stays free: the line-break
// sweep of 24 October 2026 found the whole date glued left "Announced on"
// alone on a 320 px card's line (three such lines on the main page, two on
// dates, against one each unglued), and "24 October | 2026" reads as one
// date still. "en-au" has its own row, the identity, since typeset falls
// back from a locale to its language and would give Beyond The Valley and
// Field Day this glue. A count keeps its unit too, as KEEP_TOGETHER does
// for short runs: the twin's lede broke "10 | years" at 320 px and
// "180 | days" survived to 1280 (QA round 1, 9d). "Years" is capitalised
// where it quotes a season's name.
const GLUE_EN = new RegExp([...EN_TOKENS, `\\b\\d{1,2} ${MONTH}\\b`, `\\b\\d[\\d,.]*%? (?:km|mins?|hrs?|hours?|minutes|days?|nights?|people|person|[Yy]ears?|tickets?|passes|artists)\\b`].join("|"), "g");
const GLUE: Record<string, (run: string) => string> = {
  en: (run) => run.replace(GLUE_EN, (m) => m.replace(/ /g, "\u00a0")),
  "en-au": (run) => run,
  pt: (run) => run.replace(GLUE_PT, "$1\u00a0"),
  "es-mx": (run) => run.replace(GLUE_ES_MX, (m) => m.replace(/ /g, "\u00a0")),
  th: (run) => run.replace(KEEP_TH, (m) => m.replace(/ /g, "\u00a0").replace(/–/g, "–\u2060")),
  fr: (run) => run.replace(KEEP_FR, (m) => m.replace(/ /g, "\u00a0")),
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
// French the same way ("Fin de semaine 1 : jeudi 14, vendredi 15 et
// samedi 16 janvier 2027", Igloofest's line-up weekends), with the
// weekday a heading opens on ("Jeudi 14 janvier 2027", a night card's
// day) and a count with its noun ("18 ans et plus", main's Montréal
// heading). A weekday inside a heading stays out of the span: from 360 px
// the span is a block, and "samedi 16 janvier 2027" at 24 px is wider
// than the column there, so the block would take a line of its own and
// leave "samedi" alone on it. French dates are wider than the column at
// 320 px too ("22 octobre 2026" is 305 px at 24 px, the column 292), so
// the span stays inline there as in English, and the day is joined to its
// month and a count to its noun by a no-break space instead: the line may
// break before the date or before its year, never between "14" and
// "janvier" (the sweep of 22 October 2026 found « Jeudi 14 | janvier 2027 »
// and « 18 | ans et plus » at 320).
const JOUR = "(?:Lundi|Mardi|Mercredi|Jeudi|Vendredi|Samedi|Dimanche)";
const HEADING_KEEP_FR = new RegExp(`(?:^${JOUR}[ \\u00a0])?${FR_DATE}[:,.;]?|${FR_COUNT}`, "gu");
// An English heading, the house's "en" and not Beyond The Valley's frozen
// "en-au", adds a day with its month and no year, and a share with its
// word: the line-break sweep of 24 October 2026 broke Creamfields Chile's
// line-up days ("Saturday 14 | November: six stages") from 320 to 480 px,
// and its tickets heading ("Banco de Chile: 20% | off and instalments") at
// 320 and from 430 to 480. "15 November:" is about 150 px at the heading's
// 24 px, half the 292 px column at 320, so a nowrap holds it whole at
// every width, as the date with its year above. A day with its year is
// left to the span above, as it was.
const HEADING_KEEP_EN = new RegExp(`\\b\\d{1,2} ${MONTH}\\b(?! \\d)[:,.;]?|\\b\\d+% off\\b`, "g");
const HEADING_KEEP_BY: Record<string, RegExp> = { es: HEADING_KEEP_ES, pt: HEADING_KEEP_PT, th: HEADING_KEEP_TH, fr: HEADING_KEEP_FR };
const HEADING_GLUE_FR = new RegExp(`(?<=\\d|\\der) (?=${MOIS}(?!\\p{L})|${FR_NOUN}(?!\\p{L}))`, "gu");
const HEADING_GLUE: Record<string, (span: string) => string> = { fr: (m) => m.replace(HEADING_GLUE_FR, "\u00a0") };
const ASTRO_ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" };
export const headingHtml = (text: string, lang = "en") => {
  const set = text.replace(/[&<>'"]/g, (c) => ASTRO_ESCAPES[c]).replace(HEADING_KEEP, (m) => `<span class="nowrap">${m}</span>`);
  const html = lang.toLowerCase() === "en" ? set.replace(HEADING_KEEP_EN, (m) => `<span class="nowrap">${m}</span>`) : set;
  const keep = HEADING_KEEP_BY[lang.slice(0, 2).toLowerCase()];
  const glue = HEADING_GLUE[lang.slice(0, 2).toLowerCase()] ?? ((m: string) => m);
  return keep ? html.replace(keep, (m) => `<span class="keep-date">${glue(m)}</span>`) : html;
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
/** The keys of an event's hops that a string links, as `](/go/<event>-
    <key>/)`: found with LINK itself, so the loader reads exactly the
    links that inline renders. */
export const goKeysIn = (text: string, eventSlug: string): string[] => {
  const prefix = `/go/${eventSlug}-`;
  return [...text.matchAll(LINK)].map((m) => m[2]).filter((href) => href.startsWith(prefix) && href.endsWith("/")).map((href) => href.slice(prefix.length, -1));
};
/** For each of an event's hops, the `lang` of the first of its guides, in
    data order, whose strings link it, else the first guide's: the
    language its `title` is written in (GoTarget.titleLang). Every string
    of the raw guide counts, walked before any typesetting, so a link in a
    field added later (an FAQ, a slot, a source line, a blurb) is found
    without a list of fields to keep. */
export function hopLanguages(event: { slug: string; go: Record<string, unknown> }, guides: Guide[]): Record<string, string> {
  const own = guides.filter((g) => g.event === event.slug);
  const langs: Record<string, string> = {};
  const walk = (value: unknown, lang: string): void => {
    if (typeof value === "string") {
      for (const key of goKeysIn(value, event.slug)) if (key in event.go && !(key in langs)) langs[key] = lang;
    } else if (Array.isArray(value)) for (const v of value) walk(v, lang);
    else if (value && typeof value === "object") for (const v of Object.values(value)) walk(v, lang);
  };
  for (const guide of own) walk(guide, guide.lang);
  if (own.length > 0) for (const key of Object.keys(event.go)) langs[key] ??= own[0].lang;
  return langs;
}
// One arrow, or a group of them joined by " · " (Igloofest: "→
// /igloofest/gatineau/ · → /igloofest/quebec/"), which is one mark.
const ARROW = /\s*→ (\/[^\s]*\/)((?: · → \/[^\s]*\/)*)(?=\s|$)/g;
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
  const group = new RegExp(`^(?:\\s+\\[${TAG_BODY}\\](?!\\())+`).exec(rest)?.[0] ?? "";
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
  // A mark TAG cannot read is neither stripped nor checked: a range such as
  // "[reread.prices.0-3]" stops TAG_BODY at its hyphen, passes the check at
  // the end (which strips the same pattern from both sides) and prints as
  // text. A key-like mark left once tags and links are out stops the build
  // instead (the CTO's gate-3 note 3, Wonderfruit's English twin, 24
  // October 2026).
  const unread = text.replace(TAG, "").replace(LINK, "").match(/\[[A-Za-z_]\w*\.[^\]\n]*\](?!\()/);
  if (unread) throw new Error(`${ctx.where}: ${unread[0]} is a mark the tag pattern cannot read`);

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
      // The tooltip in the guide's own language: `title` for the guide it
      // was written for, else that guide's entry in `titles`.
      const title = ctx.guide.lang === go.titleLang ? go.title : go.titles?.[ctx.guide.lang];
      if (title === undefined) throw new Error(`${ctx.where}: ${href} has no title in ${ctx.guide.lang}`);
      target = { href, title, out: go.url };
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
    const before = masked.slice(regionStart, m.index!).trimEnd();
    // The last sentence before the arrow: after the last full stop, question
    // or exclamation mark (a closing quote may follow it) that has more text
    // after it.
    let start = 0;
    for (const b of before.matchAll(/[.!?]["”’)]?\s+(?=\S)/g)) start = b.index! + b[0].length;
    const sentence = before.slice(start);
    // Each target of a group anchors in that one sentence.
    const hrefs = [m[1], ...[...m[2].matchAll(/→ (\/[^\s]*\/)/g)].map((x) => x[1])];
    const shown: { href: string; label: string; title: string }[] = [];
    for (const href of hrefs) {
      const target = pages.find((p) => pathOf(p) === href);
      if (!target) throw new Error(`${ctx.where}: → ${href} is not a page of this guide`);
      const title = target.linkTitle ?? withoutSuffix(target.title);
      const own =
        ctx.page?.anchors?.find((a) => a.target === href && a.text !== undefined && sentence.includes(a.text)) ??
        ctx.page?.anchors?.find((a) => a.target === href && a.visible);
      if (own?.visible) {
        shown.push({ href, label: target.label, title });
        continue;
      }
      let phrase: string;
      if (own?.text !== undefined) phrase = own.text;
      else {
        const found = [...sentence.matchAll(/\bthe ([\p{L}-]+) page\b/gu)];
        if (!ctx.guide.lang.startsWith("en") || found.length !== 1)
          throw new Error(`${ctx.where}: the arrow to ${href} has no anchor in "${sentence.trim()}"; give the page an anchors entry`);
        if (found[0][1] !== target.label.toLowerCase())
          throw new Error(`${ctx.where}: "${found[0][0]}" points at ${href}, whose label is ${target.label}`);
        phrase = found[0][0];
      }
      // Once in the sentence, or the occurrence the anchor names where a
      // phrase comes back (Igloofest's Montréal row: the row's own head
      // word, then "Vieux-Port de Montréal").
      const ats: number[] = [];
      for (let i = sentence.indexOf(phrase); i >= 0; i = sentence.indexOf(phrase, i + 1)) ats.push(i);
      const at = own?.nth !== undefined ? ats[own.nth - 1] : ats.length === 1 ? ats[0] : undefined;
      if (at === undefined)
        throw new Error(
          own?.nth !== undefined
            ? `${ctx.where}: "${phrase}" does not occur ${own.nth} times in "${sentence.trim()}"`
            : `${ctx.where}: "${phrase}" must occur exactly once in "${sentence.trim()}"`,
        );
      const from = regionStart + start + at;
      if (title === phrase) throw new Error(`${ctx.where}: the title of "${phrase}" repeats it`);
      pieces.push({
        from, to: from + phrase.length,
        html: `<a href="${attr(href)}" title="${attr(title)}">${esc(phrase)}</a>`,
        md: `[${phrase}](${site}${href})`,
        text: phrase,
      });
    }
    if (shown.length && shown.length !== hrefs.length)
      throw new Error(`${ctx.where}: an arrow group anchors all its targets in its sentence or shows all of them`);
    // The arrows leave the words. Where they are shown, each target prints
    // after the sentence under its label in the guide's row, its title the
    // one every link to it carries; the arrows and the dot between are
    // hidden from a screen reader, which says the two names (the fest
    // director's gate-3 condition 4). The Markdown keeps the arrows. The
    // words are not the copy's, so the words-only rendering leaves them out.
    pieces.push({
      from: m.index!, to: m.index! + m[0].length,
      html: shown.length
        ? ` <span class="arrow-links">${shown.map((s) => `<span aria-hidden="true">→ </span><a href="${attr(s.href)}" title="${attr(s.title)}">${esc(s.label)}</a>`).join('<span aria-hidden="true"> · </span>')}</span>`
        : "",
      md: shown.length ? ` ${shown.map((s) => `→ [${s.label}](${site}${s.href})`).join(" · ")}` : "",
      text: "",
    });
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
  | { kind: "list" | "ol" | "lines" | "links" | "cards" | "dot-row" | "guide-cards" | "nights"; parts: Part[] }
  | { kind: "table"; rows: string[]; caption?: Part };

/** A line that is one link and nothing else but its tags: a hop the copy
    names by its label after the paragraph that cites it. */
const LINK_LINE = new RegExp(`^\\[[^\\]\\n]+\\]\\([^)\\s]+\\)(?:\\s+\\[${TAG_BODY}\\])*$`);
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
      else if (kind === "nights" && items.every(isNight)) blocks.push({ kind: "nights", parts: items.map((i) => nightCard(i, ctx)) });
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
/** A price the seller strikes, as the copy writes it, with the word its
    guide's language says it in: "$128.000 (tachado)" on the Spanish
    tables, "128,000 (crossed out)" on the English twin's (Creamfields
    Chile, 24 October 2026). */
const STRUCK = /^(\$\d[\d.]*\d|\d{1,3}(?:,\d{3})+) \((tachado|crossed out)\)$/;
/** The struck word of each language that has a table. A cell in another
    language's word would print struck on the wrong page, so the build
    stops on it, as on a row with the wrong count of cells. */
const STRUCK_WORD: Record<string, string> = { es: "tachado", en: "crossed out" };

/** A table: the header row as column heads, each row led by its first cell
    as the row's head, each other cell carrying its column's name in
    `data-label`, which the narrow layout prints before it (theme.css,
    .price-table). The roles are written out because that layout sets the
    parts as blocks, and a block loses the table's meaning for a screen
    reader. A struck price keeps its strike and its word: the line through
    the figure for the eye, "(tachado)" or "(crossed out)" for everyone,
    both in the muted ink and kept on one line. */
function tableHtml(rows: string[], caption: Part | undefined, ctx: Ctx): string {
  const [head, ...body] = rows.filter((r) => !isRule(r));
  const heads = cells(head);
  const cell = (text: string) => {
    const struck = STRUCK.exec(text);
    if (struck && struck[2] !== STRUCK_WORD[ctx.guide.lang.split("-")[0]]) throw new Error(`${ctx.where}: a struck price says "(${struck[2]})" on a guide in ${ctx.guide.lang}: "${text}"`);
    return struck
      ? `<span class="nowrap"><s>${esc(struck[1])}</s> (${struck[2]})</span>`
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

// ------------------------------------------------------------- typography

// French as the OQLF sets it (Banque de dépannage linguistique,
// « Espacement avant et après les signes de ponctuation » and « Espace
// insécable »), in Quebec's usage: no space before « ; », « ? » and « ! »;
// a no-break space before « : », inside « », between a figure and « $ »
// or « % », before « cm », around the « h » of « 19 h 30 » and before it
// in « 11 h », inside a grouped figure (« 18 000 », a whole one only: the
// native reader's gate-3 note 6), after an ordinal (« 1er janvier »,
// « 5e édition »), and after « BUNT. », an act's name that must not end a
// line. The session's item 12 on Igloofest, as code. The copy keeps the
// plain spaces its reviewers read; this runs on a French guide's strings
// as the guide is loaded (data/events/index.ts). Every rule swaps a space
// for a no-break one or drops it, and none adds a character, so a title
// keeps its length or loses some.
// A mark, a link's target, a span's braces, an arrow's path, a URL and an
// e-mail address are not words, and keep their bytes.
const OQLF_SKIP = new RegExp(
  [
    `\\[${TAG_BODY}\\](?!\\()`, // [editions[Gatineau 2027].note]
    `\\]\\([^)\\s]+\\)`, // ](/go/igloofest-billets/)
    `\\{\\{[^}]*\\}\\}`, // {{until prices}}
    `→ \\/[^\\s]*\\/`, // → /igloofest/billets/
    `https?:\\/\\/[^\\s)\\]]+`, // https://igloofest.ca/fr
    `[\\w.+-]+@[\\w-]+(?:\\.[\\w-]+)+`, // info@igloofest.ca
  ].join("|"),
  "gu",
);
const OQLF_RULES: [RegExp, string][] = [
  [/[  ]+([;?!])/g, "$1"], // Igloovillage ; → Igloovillage;
  [/ :/g, " :"], // Montréal : → Montréal :
  [/« /g, "« "],
  [/ »/g, " »"],
  [/(\d) ([$%])/g, "$1 $2"], // 49,00 $
  [/(?<![\d,.])(\d{1,2}) h(?![\p{L}\d])/gu, "$1 h"], // 19 h, 11 h
  [/(\d h) (\d{2})(?!\d)/g, "$1 $2"], // 19 h 30
  [/(?<!\d)(\d{1,3}) (\d{3})(?!\d)/g, "$1 $2"], // 18 000
  [/(\d) cm(?!\p{L})/gu, "$1 cm"], // 35 cm
  [/(?<![\p{L}\d])(\d+(?:er|re|e)) (?=\p{L})/gu, "$1 "], // 1er janvier, 5e édition
  [/\bBUNT\. /g, "BUNT. "],
];
export function oqlf(text: string): string {
  const set = (s: string) => OQLF_RULES.reduce((t, [re, to]) => t.replace(re, to), s);
  let out = "";
  let at = 0;
  for (const m of text.matchAll(OQLF_SKIP)) {
    out += set(text.slice(at, m.index)) + m[0];
    at = m.index! + m[0].length;
  }
  return out + set(text.slice(at));
}

/** A guide's language is French: "fr-CA". */
export const isFrench = (lang: string) => lang.slice(0, 2).toLowerCase() === "fr";

/** Values that are paths, ids, dates, keys and the structured data's
    machine strings, not words: oqlf leaves them alone (the CTO's gate-3
    bound (a) on Igloofest). */
const MACHINE = new Set(["slug", "createdAt", "updatedAt", "event", "lang", "dir", "path", "href", "target", "id", "kind", "expires", "rel", "url", "source", "markup"]);
/** Every word of a record set by oqlf, its machine values as they were. */
export function typographed<T>(value: T, key = ""): T {
  if (MACHINE.has(key)) return value;
  if (typeof value === "string") return oqlf(value) as T;
  if (Array.isArray(value)) return value.map((v) => typographed(v)) as T;
  if (isObject(value)) return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, typographed(v, k)])) as T;
  return value;
}

// ------------------------------------------------------------------- dates

const MOIS_NOMS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
/** A day as the guide's language writes it in running text: "22 octobre
    2026", "1er novembre 2026" (« Mis à jour le », GuidePage). A language
    adds its row here before a guide in it asks for one. */
const LONG_DATE: Record<string, (y: number, m: number, d: number) => string> = {
  fr: (y, m, d) => oqlf(`${d === 1 ? "1er" : d} ${MOIS_NOMS[m - 1]} ${y}`),
};
export function longDate(iso: string, lang: string): string {
  const write = LONG_DATE[lang.slice(0, 2).toLowerCase()];
  if (!write) throw new Error(`copy.ts writes no dates in "${lang}"`);
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return write(y, m, d);
}

/** The UTC offset a zone keeps at a local date and time ("-05:00" in
    Montréal on 14 January 2027), from the zone data Node carries, so no
    offset is written by hand (Igloofest's plan 5.3; the CTO's gate-3
    item 6). The offset at the wall time read as UTC, then again at the
    instant that gives: right on either side of a change of clocks. */
export function zoneOffset(zone: string, local: string): string {
  const fmt = new Intl.DateTimeFormat("en-US", { timeZone: zone, timeZoneName: "longOffset" });
  const at = (t: number) => {
    const name = fmt.formatToParts(new Date(t)).find((p) => p.type === "timeZoneName")?.value ?? "";
    return name === "GMT" ? "+00:00" : name.slice(3);
  };
  const ms = (o: string) => (o.startsWith("-") ? -1 : 1) * (Number(o.slice(1, 3)) * 60 + Number(o.slice(4, 6))) * 60_000;
  const wall = Date.parse(`${local}Z`);
  if (Number.isNaN(wall)) throw new Error(`zoneOffset: "${local}" is not a local date and time`);
  return at(wall - ms(at(wall)));
}

// ------------------------------------------------------------------ nights

// A night of a line-up, one line each, as Igloofest Montréal's twelve are
// written: "Jeudi 14 janvier 2027 — Scène Sapporo : Taima 19 h 30 · Lou
// Phelps (DJ set) 20 h 30 · KAYTRANADA 22 h. Scène Vidéotron (Ferias) :
// silktits 19 h 30 · Make A Dance 20 h 45." and its tags. The day, each
// stage with the name the organiser sets over its night, and the stage's
// sets, each an act and its start. A section of kind "nights" sets each
// line as a card (theme.css, ul.nights): the day its heading, each stage
// under it, each set time first, as the chrome asks. The Markdown twin
// keeps the line as written, and a line the parse does not give back byte
// for byte fails the build, so a card holds the copy's words and no other.
interface Night {
  day: string;
  date: string;
  stages: { name: string; label?: string; sets: { act: string; time: string }[] }[];
}
const NIGHT = new RegExp(`^(\\p{L}+ (\\d{1,2}) (${MOIS}) (\\d{4})) — (.+)$`, "u");
const STAGE = /(Scène \S+)(?: \(([^)]+)\))? : (.*?)\.(?= Scène |$)/gu;
const SET_TIME = /^(.+) (\d{1,2} h(?: \d{2})?)$/u;
const TRAILING_TAGS = new RegExp(`(?:\\s+\\[${TAG_BODY}\\])+$`);

export function parseNight(line: string): Night | undefined {
  const m = NIGHT.exec(line);
  if (!m) return undefined;
  const [, day, d, month, y, rest] = m;
  const date = `${y}-${String(MOIS_NOMS.indexOf(month) + 1).padStart(2, "0")}-${d.padStart(2, "0")}`;
  const stages = [...rest.matchAll(STAGE)].map((s) => ({
    name: s[1],
    ...(s[2] ? { label: s[2] } : {}),
    sets: s[3].split(" · ").map((x) => {
      const t = SET_TIME.exec(x);
      if (!t) throw new Error(`a set without its start: "${x}"`);
      return { act: t[1], time: t[2] };
    }),
  }));
  return stages.length ? { day, date, stages } : undefined;
}

export function formatNight(n: Night): string {
  const stages = n.stages.map((s) => `${s.name}${s.label ? ` (${s.label})` : ""} : ${s.sets.map((x) => `${x.act} ${x.time}`).join(" · ")}.`);
  return `${n.day} — ${stages.join(" ")}`;
}

const isNight = (item: string) => NIGHT.test(item.replace(TRAILING_TAGS, ""));

/** One night's card. Its tags are checked as any are (marks), its words
    must come back as the line, its day must fall on the weekday the line
    names, and each start carries its offset from the event's zone. */
function nightCard(item: string, ctx: Ctx): Part {
  const md = marks(item, ctx, SITE).md;
  const line = item.replace(TRAILING_TAGS, "");
  const n = parseNight(line);
  if (!n || formatNight(n) !== line) throw new Error(`${ctx.where}: a night's line does not read back as written: "${line}"`);
  const [y, mo, d] = n.date.split("-").map(Number);
  if (JOURS[new Date(Date.UTC(y, mo - 1, d)).getUTCDay()] !== n.day.split(" ")[0].toLowerCase())
    throw new Error(`${ctx.where}: ${n.date} is not a ${n.day.split(" ")[0]}`);
  const zone = ctx.event.markup.timeZone;
  if (!zone) throw new Error(`${ctx.where}: a night's set times need the event's markup.timeZone`);
  const time = (t: string) => {
    const [, h, min = "00"] = /^(\d{1,2}) h(?: (\d{2}))?$/.exec(t)!;
    const local = `${n.date}T${h.padStart(2, "0")}:${min}`;
    return `<time datetime="${local}:00${zoneOffset(zone, local)}">${esc(t)}</time>`;
  };
  const stages = n.stages.map(
    (s) =>
      `<p class="night-stage">${esc(s.name)}${s.label ? ` <span class="night-label">(${esc(s.label)})</span>` : ""}</p>` +
      `<ul class="night-sets">${s.sets.map((x) => `<li>${time(x.time)} <span class="night-act">${esc(x.act)}</span></li>`).join("")}</ul>`,
  );
  // The day is a heading, set as one (headingHtml): « Jeudi 14 | janvier
  // 2027 » split at 320 px when it went in as plain text.
  return { html: `<h3><time datetime="${n.date}">${headingHtml(n.day, ctx.guide.lang)}</time></h3>${stages.join("")}`, md };
}
