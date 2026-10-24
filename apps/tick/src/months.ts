// The calendar cut by month, in both languages — the rules are in
// @dst/content/months; this file holds the words and the dates.
import { buildMonths, monthHref as hrefFor, type Month } from "@dst/content/months";
import type { Lang } from "./content";
import { LOCALE, eventsFor, prefix } from "./i18n";

const today = new Date().toISOString().slice(0, 10);

/** Every month that has earned a page, per language, in calendar order. */
export const allMonths: Record<Lang, Month[]> = {
  hy: buildMonths({ items: eventsFor("hy"), today }),
  en: buildMonths({ items: eventsFor("en"), today }),
};

export const calendarBase = (lang: Lang) => `${prefix(lang)}calendar/`;
export const monthHref = (key: string, lang: Lang) => hrefFor(key, calendarBase(lang));

/** The month the site is in right now, as "YYYY-MM". */
export const thisMonth = today.slice(0, 7);

const first = (key: string) => new Date(`${key}-01T00:00:00Z`);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** "November 2026" / "Նոյեմբեր 2026": the page's name, and its crumb. */
export function monthLabel(key: string, lang: Lang): string {
  if (lang === "hy") {
    // Intl's own long form is "2026 թ. նոյեմբեր"; the name first reads as
    // a heading, the way a poster prints it.
    const name = new Intl.DateTimeFormat(LOCALE.hy, { month: "long", timeZone: "UTC" }).format(first(key));
    return `${cap(name)} ${key.slice(0, 4)}`;
  }
  return new Intl.DateTimeFormat(LOCALE.en, { month: "long", year: "numeric", timeZone: "UTC" }).format(first(key));
}

/** "Nov" / "նոյ", for a chip; the year only when it is not this one. */
export function monthChip(key: string, lang: Lang): string {
  const short = new Intl.DateTimeFormat(LOCALE[lang], { month: "short", timeZone: "UTC" }).format(first(key)).replace(/\.$/, "");
  const label = lang === "hy" ? cap(short) : short;
  return key.slice(0, 4) === today.slice(0, 4) ? label : `${label} ${key.slice(0, 4)}`;
}

/** "in November 2026" / "2026-ի նոյեմբերին": the month inside a sentence. */
export function monthIn(key: string, lang: Lang): string {
  if (lang === "hy") {
    const name = new Intl.DateTimeFormat(LOCALE.hy, { month: "long", timeZone: "UTC" }).format(first(key));
    return `${key.slice(0, 4)}-ի ${name}ին`;
  }
  return `in ${monthLabel(key, lang)}`;
}
