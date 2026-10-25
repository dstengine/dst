// How a page knows its language, and how it finds itself in the other one.
//
// One entry carries both languages: Armenian in its own fields, English
// in `i18n.en` — whichever of them has the root (see @dst/content/i18n). So every page exists in both or in
// neither, and the address of its twin is its own with the prefix swapped —
// which is what makes the hreflang pair and the switch in the header safe
// to derive rather than declare.
import { localize, localizeLinks } from "@dst/content/i18n";
import { eventsBySite } from "@dst/content/events";
import { newsBySite } from "@dst/content/news";
import { siteId, LANGS, type Lang } from "./content";

/** <html lang> and Intl: the language and where it is spoken. */
export const LOCALE: Record<Lang, string> = { hy: "hy-AM", en: "en-GB" };

/** Where a language keeps its pages. English has the root; Armenian is
    under /am/ — the country's code, the one the site's own domain is meant
    to be under, and the one a reader in Yerevan would guess. The language
    code stays hy everywhere a machine reads it (<html lang>, hreflang,
    the feeds): "am" is Amharic, and hreflang="am" would tell a crawler
    these pages are in Ethiopian. */
export const PATH: Record<Lang, string> = { en: "", hy: "am" };
export const prefix = (lang: Lang): string => (PATH[lang] ? `/${PATH[lang]}/` : "/");

export const eventsBase = (lang: Lang) => `${prefix(lang)}events/`;
export const newsBase = (lang: Lang) => `${prefix(lang)}news/`;

// An entry with a short address of its own (`path`: "/devfest/") has it in
// both languages, under each one's prefix — /devfest/ and /am/devfest/ —
// so its twin is found the way every other page's is.
const at = <T extends { path?: string }>(item: T, lang: Lang): T =>
  item.path ? { ...item, path: `${prefix(lang)}${item.path.replace(/^\//, "")}` } : item;

// The links inside an entry's words point at pages in its language too:
// an Armenian body typed with "/events/aki-fest/" sends its reader to
// "/am/events/aki-fest/", the twin, rather than to the English page.
const inLang = <T extends { path?: string }>(item: T, lang: Lang): T => at(localizeLinks(item, prefix(lang)), lang);

/** The site's feeds, in the page's language. */
export const eventsFor = (lang: Lang) => eventsBySite(siteId).map((i) => inLang(localize(i, lang), lang));
export const newsFor = (lang: Lang) => newsBySite(siteId).map((i) => inLang(localize(i, lang), lang));

// What the switch in the header says. The label is the language's own
// name for itself, short; the tooltip is in that language too, since it is
// read by the person who wants to switch to it.
const SWITCH: Record<Lang, { label: string; title: string }> = {
  hy: { label: "ՀԱՅ", title: "Այս էջը հայերեն" },
  en: { label: "EN", title: "This page in English" },
};

/** The page at `pathname` in every language, its own included. */
export function alternates(pathname: string) {
  const rest = pathname.replace(/^\/am(\/|$)/, "/").replace(/^\//, "");
  return LANGS.map((lang) => ({ lang, href: `${prefix(lang)}${rest}`, ...SWITCH[lang] }));
}

/** Detail pages for a language: an entry with no body has no page. */
export function eventPaths(lang: Lang) {
  const items = eventsFor(lang).filter((i) => Array.isArray(i.body) && i.body.length > 0);
  return items.filter((i) => !i.path).map((item) => ({ params: { slug: item.slug }, props: { item, more: items } }));
}

export function newsPaths(lang: Lang) {
  const items = newsFor(lang).filter((i) => Array.isArray(i.body) && i.body.length > 0);
  return items.filter((i) => !i.path).map((item) => ({ params: { slug: item.slug }, props: { item, more: items } }));
}

/** The entries built at a short address of their own instead (`path`). */
export function shortPaths(lang: Lang) {
  const events = eventsFor(lang).filter((i) => Array.isArray(i.body) && i.body.length > 0);
  const news = newsFor(lang).filter((i) => Array.isArray(i.body) && i.body.length > 0);
  const page = (path: string) => path.split("/").filter(Boolean).at(-1)!;
  return [
    ...events.filter((i) => i.path).map((item) => ({ params: { page: page(item.path!) }, props: { kind: "event" as const, item, more: events } })),
    ...news.filter((i) => i.path).map((item) => ({ params: { page: page(item.path!) }, props: { kind: "news" as const, item, more: news } })),
  ];
}
