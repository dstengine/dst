// What goes in a page's <title>, worked out before the layout sees it.
//
// The rule for the suffix lives here rather than in BaseLayout because an
// event page needs it too: whether "Yerevan" is about to be appended
// decides how many characters are left for the date.

// The search-result budget, the same number tests/build-output.test.js
// holds every built title to.
export const TITLE_LIMIT = 60;

// Is the site's suffix already said in the title? Only as a word —
// "Art in central London" and not inside a longer word, and
// case-insensitively, because "DST events — DST" is the same duplication.
//
// "Word boundary" means letters, not `\b`: `\b` only knows the 63 ASCII
// word characters, so to it every Armenian letter is punctuation and an
// Armenian keyword was never found in an Armenian title — the suffix went
// on every page of tick, saying Yerevan twice. And Armenian declines its
// nouns where English puts a preposition: "in Yerevan" is Երևանում, one
// word, so in a language listed here the keyword counts as said when a
// case ending follows it. Not German, where "Wiener" is an adjective and
// the suffix "Wien" says something it does not.
const INFLECTED = new Set(["hy"]);
export function saidAlready(title: string, needle: string | undefined, lang = "en"): boolean {
  if (!needle) return false;
  const word = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const after = INFLECTED.has(lang.slice(0, 2)) ? "" : "(?![\\p{L}\\p{N}])";
  return new RegExp(`(?<![\\p{L}\\p{N}])${word}${after}`, "iu").test(title);
}

/** The <title> as the layout writes it: the page's own title, then the
    site's suffix unless the title has said it already. */
export function withSuffix(title: string, suffix?: string, keyword?: string, lang = "en"): string {
  const said = saidAlready(title, suffix, lang) || saidAlready(title, keyword, lang);
  return suffix && !said ? `${title} — ${suffix}` : title;
}

/** An event's search title with its date: "Carmen at the Yerevan Opera,
    7 Nov 2026".

    The queries that find event pages carry the year, "concert", "dates",
    "tickets" — and the result above ours is a box office whose title shows
    the date. Ours showed it only in the description, which a phone cuts.
    A date is not a status: it stays true until the event moves, and then
    it moves with the entry, because it is read from `start` and `end`
    rather than typed into the headline.

    Left as it was when the title already names a year ("Coachella 2027"
    has answered the question) or when the date would push the full title,
    suffix included, past the limit: a cut title loses its last words, and
    the last words would be the date. Left too when the headline already
    gives the day — "in Yerevan, 22 October" — because a second date after
    the first is a template showing. `site` is the app's site.config
    object as it stands: its language, suffix and keyword. */
export function datedTitle(
  title: string,
  event: { start: string; end?: string },
  site: { lang?: string; titleSuffix?: string; keyword?: string },
): string {
  const locale = site.lang ?? "en";
  if (/\b(19|20)\d\d\b/.test(title)) return title;
  if (namesDay(title, event.start, locale)) return title;
  const fmt = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  const start = new Date(`${event.start}T00:00:00Z`);
  const end = event.end && event.end !== event.start ? new Date(`${event.end}T00:00:00Z`) : undefined;
  // Armenian pads the days of a range ("07–09 նոյ"), and nothing else on
  // the site writes a day that way.
  const when = (end ? fmt.formatRange(start, end) : fmt.format(start)).replace(/(^|\D)0(\d)/g, "$1$2");
  const dated = `${title}, ${when}`;
  return withSuffix(dated, site.titleSuffix, site.keyword, locale).length <= TITLE_LIMIT ? dated : title;
}

// Does the title already say the event's day: its day of the month as a
// number of its own, and its month by name, short or long? Substrings on
// purpose, so the Armenian genitive (հոկտեմբերի) and the German short form
// with its dot (Nov.) both count.
function namesDay(title: string, iso: string, locale: string): boolean {
  const d = new Date(`${iso}T00:00:00Z`);
  const day = String(d.getUTCDate());
  if (!new RegExp(`(?<!\\d)${day}(?!\\d)`).test(title)) return false;
  const lower = title.toLocaleLowerCase(locale);
  return (["short", "long"] as const).some((month) => {
    const name = d.toLocaleDateString(locale, { month, timeZone: "UTC" }).replace(/\.$/, "").toLocaleLowerCase(locale);
    return lower.includes(name);
  });
}
