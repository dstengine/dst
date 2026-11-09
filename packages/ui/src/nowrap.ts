// A date stays whole where a line ends: "November 2", "2 November 2026",
// "Nov 1–2", "2 de noviembre de 2026", "13. Jänner", "հոկտեմբերի 31-ը".
// The house rule (visual-qa, ~/mind/ai/dubai/DESIGN.md) is a
// <span class="nowrap">, never &nbsp;: the span is markup, so the text a
// reader copies, the feeds and the API output keep their plain spaces.
//
// Written for the section ledes, which are plain strings from each site's
// `copy()` in sections.ts and were set as text, so nothing held a date on
// any site: nyc42's /day-of-the-dead/ read "November | 2" at 375px
// (9 Nov 2026). A lede string stays plain text and carries no markup; the
// page renders it through `holdDates` with set:html, and the spans exist
// only in the HTML.
//
// What is held is the date itself — day, month and the year when it is
// there. A weekday before it is not: "Thursday, | 31 December 2026" breaks
// after its comma, which is where a reader pauses anyway, and a nowrap run
// is a promise that it fits a 288px line at 320.

// An abbreviation may carry its full stop ("Nov. 1"); a full month name
// may not, or "3 January." takes the sentence's own stop into the span.
const EN = "(?:January|February|March|April|May|June|July|August|September|October|November|December|(?:Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sept|Sep|Oct|Nov|Dec)\\.?)";
// Spanish writes its months in lower case, except where one opens a
// sentence.
const ES = "enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|setiembre|octubre|noviembre|diciembre"
  .split("|")
  .map((m) => `[${m[0]}${m[0].toUpperCase()}]${m.slice(1)}`)
  .join("|");
// Vienna writes Jänner, and now and then Feber.
const DE = "Januar|Jänner|Februar|Feber|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember";
// The genitive "-ի" is what a date carries: "նոյեմբերի 2".
const HY = "հունվար|փետրվար|մարտ|ապրիլ|մայիս|հունիս|հուլիս|օգոստոս|սեպտեմբեր|հոկտեմբեր|նոյեմբեր|դեկտեմբեր";

const S = "[ \\u00a0]";
const DAY = "\\d{1,2}(?:st|nd|rd|th)?";
const DAYS = `${DAY}(?:[–-]${DAY})?`;
const YEAR = "\\d{4}";

// Longest form first at each place: an alternation takes the first branch
// that matches, not the longest one.
const FORMS = [
  // "December 2, 2026", "Nov 1–2", "November 1"
  `${EN}${S}${DAYS}(?:,${S}${YEAR})?`,
  // "1–2 November 2026", "31 October"
  `${DAYS}${S}${EN}(?:${S}${YEAR})?`,
  // "13. November 2026", "13.–15. November", "6. Jänner"
  `\\d{1,2}\\.(?:[–-]\\d{1,2}\\.)?${S}(?:${DE})(?:${S}${YEAR})?`,
  // "2 de noviembre de 2026", "1–2 de noviembre"
  `${DAYS}${S}de${S}(?:${ES})(?:${S}de${S}${YEAR})?`,
  // "noviembre de 2026"
  `(?:${ES})${S}de${S}${YEAR}`,
  // "December 2026", "Dezember 2026"
  `(?:${EN}|${DE})${S}${YEAR}`,
  // "2026 թ. նոյեմբերի 2-ին", "հոկտեմբերի 31-ը", "նոյեմբերի 1–2"
  `(?:${YEAR}${S}թ\\.${S})?(?:${HY})ի${S}${DAYS}(?:-\\p{L}+)?`,
];

// Not inside a longer word or number: "Mayor 20" is not May 20, and
// "12026" holds no year. JavaScript's \b knows only ASCII letters.
const DATE = new RegExp(`(?<![\\p{L}\\d])(?:${FORMS.join("|")})(?![\\p{L}\\d])`, "gu");

const ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
// The same escaping Astro gives `{text}`, so a lede with no date in it
// comes out byte for byte as it did before.
const escape = (text: string) => text.replace(/[&<>"']/g, (c) => ESCAPES[c]);

const hold = (text: string, esc: (t: string) => string) => {
  let out = "";
  let at = 0;
  for (const m of text.matchAll(DATE)) {
    const i = m.index ?? 0;
    out += esc(text.slice(at, i)) + `<span class="nowrap">${esc(m[0])}</span>`;
    at = i + m[0].length;
  }
  return out + esc(text.slice(at));
};

/** Plain text in, HTML out, every date held on one line. For set:html. */
export function holdDates(text: string): string {
  return hold(text, escape);
}

/** The same for a string that is HTML already (DistrictLayout's `lede`):
    only the text between tags is touched, never a tag or its attributes. */
export function holdDatesInHtml(html: string): string {
  return html
    .split(/(<[^>]*>)/)
    .map((part) => (part.startsWith("<") ? part : hold(part, (t) => t)))
    .join("");
}
