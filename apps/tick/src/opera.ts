// The /opera-ballet/ section's own title, summary and lede, read off its
// entries at build time.
//
// Opera and ballet is searched for as a programme: "yerevan opera ballet
// showings", "opera yerevan program", "yerevan opera tickets" were the
// page's queries in the 28 days to 4 November 2026, at positions 11 to 21
// with two clicks. So the page says the month and names what is on in it —
// a list typed by hand would be wrong by the next month. Which works are
// certainly on that month is monthOn's rule (@dst/content/when), and they
// are named in its order, the next first, as many as the summary has room
// for.
//
// This file stands apart from sections.ts so that tests can import it:
// everything it imports resolves under Node as it is.
import type { Copy, FeedItem } from "@dst/content/sections";
import type { EventItem } from "@dst/content/types";
import { isOn, monthOn } from "@dst/content/when";
import type { Lang } from "./content";

export const MONTHS: Record<Lang, string[]> = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  // The genitive, "of November". Without its -ի it is the nominative
  // (նոյեմբեր), with -ն the locative (նոյեմբերին), and the nominative with
  // -ից the ablative (նոյեմբերից սկսած).
  hy: ["հունվարի", "փետրվարի", "մարտի", "ապրիլի", "մայիսի", "հունիսի", "հուլիսի", "օգոստոսի", "սեպտեմբերի", "հոկտեմբերի", "նոյեմբերի", "դեկտեմբերի"],
};
// The house every opera entry so far plays in, as its `venue` names it.
const OPERA_HOUSE: Record<Lang, string> = { en: "Spendiaryan Opera and Ballet Theatre", hy: "Սպենդիարյանի անվան օպերայի և բալետի" };
// Room for the names in a summary a search result shows whole.
export const SUMMARY_MAX = 160;

/** The work's own name: «Կարմեն» out of "Բիզե. «Կարմեն»", Carmen out of
    "Bizet: Carmen", Sasuntsi Davit out of "Sasuntsi Davit, ballet-oratorio".
    A double bill keeps both works: «Պայացներ» և «Ջանի Սկիկի». */
export function workName(e: Pick<EventItem, "title" | "cardTitle">, lang: Lang): string {
  const card = e.cardTitle ?? e.title;
  if (lang === "hy") return card.match(/«[^»]+»(?:\s*(?:և|ու)\s*«[^»]+»)*/u)?.[0] ?? card;
  const composer = card.match(/^\p{Lu}[\p{L}'’-]+: (.+)$/u);
  return composer ? composer[1] : card.split(", ")[0];
}

/** "A, B and C" in the page's language, as many names as fit in `room`,
    closed by "and more" when the page lists entries the names leave out:
    a list that stops for want of room must not read as the whole bill.
    Empty when not even the first name fits. */
export function namesIn(names: string[], others: boolean, room: number, lang: Lang): string {
  const and = lang === "hy" ? " և " : " and ";
  const rest = lang === "hy" ? "այլ ներկայացումներ" : "more";
  const join = (list: string[], more: boolean) => {
    const all = more ? [...list, rest] : list;
    if (all.length < 2) return all.join("");
    // "The Dog and the Cat and Pagliacci" is one title or two: a name with
    // its own "and" before the last one takes the serial comma.
    const comma = lang === "en" && all.at(-2)!.includes(" and ") ? "," : "";
    return `${all.slice(0, -1).join(", ")}${comma}${and}${all.at(-1)}`;
  };
  let fit: string[] = [];
  for (const n of names) {
    const next = [...fit, n];
    if (join(next, others || next.length < names.length).length > room) break;
    fit = next;
  }
  return fit.length ? join(fit, others || fit.length < names.length) : "";
}

// The page's own words when anything on it is still to come; with nothing
// left, undefined, and the template's, which name no month. None of it says
// "programme" of the page itself: the section holds what has been filed
// under opera and ballet, and the house's Nutcracker is filed under New
// Year. The lowest price is the lowest of the works named for the month,
// not of the whole season.
export function operaCopy(items: FeedItem[], lang: Lang, today: string): Copy | undefined {
  const events = items.filter((i): i is EventItem => "start" in i);
  const on = monthOn(events, today);
  if (!on) return undefined;
  const still = events.filter((e) => isOn(e, today));
  const atOpera = still.every((e) => e.venue?.includes(OPERA_HOUSE[lang]));
  const from = Math.min(...on.certain.flatMap((e) => (e.tickets?.currency === "AMD" && e.tickets.priceFrom ? [e.tickets.priceFrom] : [])));
  const names = [...new Set(on.certain.map((e) => workName(e, lang)))];
  const others = still.length > on.certain.length;
  const m = MONTHS[lang][Number(on.month.slice(5, 7)) - 1];
  if (lang === "hy") {
    const nom = m.slice(0, -1);
    const head = `${m[0].toUpperCase()}${m.slice(1)}ն ${atOpera ? "Երևանի օպերային թատրոնում" : "Երևանում"}՝ `;
    const tail = Number.isFinite(from) ? `։ Ամսաթվեր և տոմսեր՝ ${from} դրամից։` : "։ Ամսաթվեր և տոմսերի գներ։";
    const list = namesIn(names, others, SUMMARY_MAX - head.length - tail.length, lang);
    return {
      title: `Օպերա և բալետ Երևանում ${m}ն․ ամսաթվեր և տոմսեր`,
      description: `${head}${list || "օպերա և բալետ"}${tail}`,
      h1: "Օպերա և բալետ Երևանում",
      lede: atOpera
        ? `Օպերաներ և բալետներ Երևանի օպերային թատրոնի խաղացանկից՝ ${nom}ից սկսած։ Ամսաթվերն ու տոմսերի գները՝ ըստ թատրոնի հրապարակածի, աղբյուրի հղումով։`
        : `Օպերա և բալետ Երևանում՝ ${nom}ից սկսած․ ամսաթվերը, տոմսերի գները և աղբյուրի հղումը։`,
    };
  }
  const head = `${m} ${atOpera ? "at the Yerevan Opera" : "in Yerevan"}: `;
  const tail = Number.isFinite(from)
    ? ` — opera and ballet with dates, and tickets from ${from.toLocaleString("en-GB")} drams.`
    : " — opera and ballet with dates and ticket prices.";
  const list = namesIn(names, others, SUMMARY_MAX - head.length - tail.length, lang);
  return {
    title: `Opera and ballet in Yerevan: ${m} dates and tickets`,
    description: list ? `${head}${list}${tail}` : `${head}${tail.slice(3)}`,
    h1: "Opera and ballet in Yerevan",
    lede: atOpera
      ? `Operas and ballets from the Yerevan Opera's programme, ${m} onwards: their dates, the ticket prices as the theatre published them, and a link to where we read it.`
      : `Opera and ballet in Yerevan, ${m} onwards: the dates, the ticket prices, and a link to where we read it.`,
  };
}
