// How a page knows its language, and how it finds itself in the other one.
//
// One entry carries both languages: Armenian in its own fields, English
// in `i18n.en` (see @dst/content/i18n). So every page exists in both or in
// neither, and the address of its twin is its own with the prefix swapped —
// which is what makes the hreflang pair and the switch in the header safe
// to derive rather than declare.
import { localize } from "@dst/content/i18n";
import { eventsBySite } from "@dst/content/events";
import { newsBySite } from "@dst/content/news";
import { siteId, LANGS, type Lang } from "./content";

/** <html lang> and Intl: the language and where it is spoken. */
export const LOCALE: Record<Lang, string> = { hy: "hy-AM", en: "en-GB" };

/** Where a language keeps its pages. Armenian has the root. */
export const prefix = (lang: Lang): string => (lang === "hy" ? "/" : "/en/");

export const eventsBase = (lang: Lang) => `${prefix(lang)}events/`;
export const newsBase = (lang: Lang) => `${prefix(lang)}news/`;

/** The site's feeds, in the page's language. */
export const eventsFor = (lang: Lang) => eventsBySite(siteId).map((i) => localize(i, lang));
export const newsFor = (lang: Lang) => newsBySite(siteId).map((i) => localize(i, lang));

// What the switch in the header says. The label is the language's own
// name for itself, short; the tooltip is in that language too, since it is
// read by the person who wants to switch to it.
const SWITCH: Record<Lang, { label: string; title: string }> = {
  hy: { label: "ՀԱՅ", title: "Այս էջը հայերեն" },
  en: { label: "EN", title: "This page in English" },
};

/** The page at `pathname` in every language, its own included. */
export function alternates(pathname: string) {
  const rest = pathname.replace(/^\/en(\/|$)/, "/").replace(/^\//, "");
  return LANGS.map((lang) => ({ lang, href: `${prefix(lang)}${rest}`, ...SWITCH[lang] }));
}

/** Detail pages for a language: an entry with no body has no page. */
export function eventPaths(lang: Lang) {
  const items = eventsFor(lang).filter((i) => Array.isArray(i.body) && i.body.length > 0);
  return items.map((item) => ({ params: { slug: item.slug }, props: { item, more: items } }));
}

export function newsPaths(lang: Lang) {
  const items = newsFor(lang).filter((i) => Array.isArray(i.body) && i.body.length > 0);
  return items.map((item) => ({ params: { slug: item.slug }, props: { item, more: items } }));
}
