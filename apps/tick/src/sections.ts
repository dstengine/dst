// The site's sections, in both languages. The rules — how many entries a
// section needs, which slugs are taken — live in @dst/content/sections;
// this file holds the vocabulary and the words.
//
// A section has one slug and two names: Համերգներ and Concerts are both
// /concerts/, so the Armenian page and the English one are twins at the
// same address under their prefixes, like every other page here. That is
// why the table is one list with both words on each row rather than a
// table per language — a row cannot be added to one and forgotten in the
// other.
//
// No place sections: everything here is in Yerevan, and a page /yerevan/
// would be the front page at a second address. `home` says so.
import { buildSections, promotedSection, type Section, type Vocabulary } from "@dst/content/sections";
import type { FeedItem } from "@dst/content/sections";
import { type Lang } from "./content";
import { eventsFor, newsFor, prefix } from "./i18n";
import { site } from "./site.config";

// "en" is a slug too: it is where the English pages live.
const RESERVED = ["about", "events", "news", "go", "li", "en"];

const KINDS: { slug: string; hy: string; en: string }[] = [
  { slug: "concerts", hy: "Համերգներ", en: "Concerts" },
  { slug: "classical", hy: "Դասական երաժշտություն", en: "Classical" },
  { slug: "theatre", hy: "Թատրոն", en: "Theatre" },
  { slug: "festivals", hy: "Փառատոներ", en: "Festivals" },
  { slug: "fashion", hy: "Նորաձևություն", en: "Fashion" },
];

const tags = (lang: Lang): Record<string, Vocabulary> =>
  Object.fromEntries(KINDS.map((k) => [k[lang], { slug: k.slug, plural: k[lang] }]));

export const NAV: Record<Lang, { allLabel: string; allTitle: string; label: string }> = {
  hy: { allLabel: "Բոլորը", allTitle: "Ամեն ինչ, որ կա Երևանում", label: "Ըստ թեմայի" },
  en: { allLabel: "All", allTitle: "Everything on in Yerevan", label: "By subject" },
};

const HOME: Record<Lang, string[]> = { hy: ["Երևան", "Հայաստան"], en: ["Yerevan", "Armenia"] };

export function sections(items: FeedItem[], lang: Lang): Section[] {
  return buildSections({
    items,
    reserved: RESERVED,
    tags: tags(lang),
    home: HOME[lang],
    copy: (g) => {
      const what = g.voc.plural ?? g.key;
      return lang === "hy"
        ? {
            title: `${what} Երևանում՝ ամսաթվեր և տոմսեր`,
            description: `${what} Երևանում՝ ամսաթվով, ինչպես հայտարարել են կազմակերպիչները, տոմսի գնով և աղբյուրով ամեն գրառման մոտ։`,
            h1: `${what} Երևանում`,
            lede: `Այս էջում ամեն ինչ «${what}» թեմայից է՝ ամսաթվով, ինչպես հայտարարել են կազմակերպիչները, և հղումով այնտեղ, որտեղ կարդացել ենք։`,
          }
        : {
            title: `${what} in Yerevan: dates and tickets`,
            description: `${what} in Yerevan, with the date as the organisers gave it, the price of a ticket and the source on every entry.`,
            h1: `${what} in Yerevan`,
            lede: `Everything filed under ${what.toLowerCase()} — the date as the organisers gave it, and a link to where we read it.`,
          };
    },
  });
}

// Every section, per language, computed once.
export const allSections: Record<Lang, Section[]> = {
  hy: sections([...eventsFor("hy"), ...newsFor("hy")], "hy"),
  en: sections([...eventsFor("en"), ...newsFor("en")], "en"),
};

/** The section page for an entry's category, under the page's prefix. */
export function sectionHref(item: FeedItem, lang: Lang): string | undefined {
  if (!item.category) return undefined;
  const found = allSections[lang].find((s) => s.kind === "tag" && s.key === item.category);
  return found ? `${prefix(lang)}${found.slug}/` : undefined;
}

// The tag this site is pushing right now, if any — see `promotedSection`.
// Nothing yet: a promotion needs a season with enough dates under it.
const PROMOTED: Record<Lang, string | undefined> = { hy: undefined, en: undefined };

const today = new Date().toISOString().slice(0, 10);
export const promoted = {
  hy: promotedSection(allSections.hy, PROMOTED.hy, today, site.hy.keyword),
  en: promotedSection(allSections.en, PROMOTED.en, today, site.en.keyword),
};

export const pluralOf = (lang: Lang) => (key: string): string | undefined => tags(lang)[key]?.plural;
