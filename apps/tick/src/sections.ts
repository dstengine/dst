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

// "am" is a slug too: it is where the Armenian pages live.
const RESERVED = ["about", "events", "news", "go", "li", "am"];

const KINDS: { slug: string; hy: string; en: string }[] = [
  { slug: "concerts", hy: "Համերգներ", en: "Concerts" },
  { slug: "classical", hy: "Դասական երաժշտություն", en: "Classical" },
  { slug: "theatre", hy: "Թատրոն", en: "Theatre" },
  { slug: "festivals", hy: "Փառատոներ", en: "Festivals" },
  { slug: "fashion", hy: "Նորաձևություն", en: "Fashion" },
  { slug: "opera-ballet", hy: "Օպերա և բալետ", en: "Opera and ballet" },
  { slug: "parties", hy: "Երեկույթներ", en: "Parties" },
  // A season rather than a format: the daytime anime festival and the
  // evening club parties belong together for the question people ask.
  { slug: "halloween", hy: "Հելոուին", en: "Halloween" },
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
    intents: [{
      slug: "yerevan-city-day",
      label: lang === "hy" ? "Երևանի օր" : "Yerevan City Day",
      match: (item) => item.tags?.includes("yerevan-city-day") ?? false,
      min: 1,
    }],
    home: HOME[lang],
    copy: (g) => {
      if (g.key === "yerevan-city-day") {
        return lang === "hy"
          ? {
              title: "Երևանի օր 2026․ համերգներ և միջոցառումներ",
              description: "Երևանի օրվա միջոցառումների էջ․ հոկտեմբերի 9-ի համերգն ու գարեջրի փառատոնը, հոկտեմբերի 10-ի յոթ բեմերը և house երեկույթը դրանցից հետո, ժամերն ու վայրերը։",
              h1: "Երևանի օր 2026",
              lede: "Երևանի օրվա համերգներն ու փառատոները՝ ըստ օրվա և վայրի։ Բացեք յուրաքանչյուր միջոցառման էջը՝ ծրագրի, ժամի, քարտեզի և աղբյուրի համար։",
              headings: { events: "Երևանի օրվա միջոցառումներ", upcoming: "Ծրագիր", past: "Անցած միջոցառումներ" },
            }
          : {
              title: "Yerevan City Day 2026: concerts and events",
              description: "Yerevan City Day events: the 9 October concert and beer festival, seven stages on 10 October and a house after-party, with times and locations.",
              h1: "Yerevan City Day 2026",
              lede: "Yerevan City Day concerts and festivals by date and location. Open each event page for the line-up, time, map and source.",
              headings: { events: "Yerevan City Day events", upcoming: "Programme", past: "Past events" },
            };
      }
      if (g.key === "Հելոուին" || g.key === "Halloween") {
        return lang === "hy"
          ? {
              title: "Հելոուին Երևանում 2026․ փառատոն և երեկույթներ",
              description:
                "Հելոուին Երևանում․ անիմե փառատոն, ակումբային և բացօթյա երեկույթներ, մետալ համերգ և ղափամայի երեկո՝ ամսաթվերով, ժամերով ու գներով։",
              h1: "Հելոուին Երևանում",
              lede: "Որտե՞ղ նշել հոկտեմբերի 31-ը Երևանում՝ ցերեկային փառատոնից մինչև գիշերային ակումբ։ Տեսեք ժամերը, մուտքի կանոններն ու տոմսերի գները՝ մինչև ընտրելը։",
              headings: {
                events: "Որտե՞ղ նշել Հելոուինը",
                upcoming: "2026-ի ամսաթվերը",
                past: "Անցած միջոցառումներ",
                news: "Հելոուինի նորություններ",
              },
            }
          : {
              title: "Halloween in Yerevan 2026: events and parties",
              description:
                "Halloween in Yerevan: an anime festival, club nights, open-air parties, a metal gig and a ghapama night, with dates, times and prices.",
              h1: "Halloween in Yerevan",
              lede: "Where to spend 31 October in Yerevan, from a daytime festival to a club night. Check the hours, entry rules and prices before choosing.",
              headings: {
                events: "Where to go for Halloween",
                upcoming: "2026 dates",
                past: "Past events",
                news: "Halloween news",
              },
            };
      }
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
// It drops out of the nav and the event pages by itself once its last date
// has gone.
const PROMOTED: Record<Lang, string | undefined> = { hy: "Հելոուին", en: "Halloween" };

const today = new Date().toISOString().slice(0, 10);
export const promoted = {
  hy: promotedSection(allSections.hy, PROMOTED.hy, today, site.hy.keyword),
  en: promotedSection(allSections.en, PROMOTED.en, today, site.en.keyword),
};

// The way from the promoted cards to the tag's own page, worded per tag
// because Armenian wants the genitive (Հելոուինի), which no rule over the
// bare label would get right. A promoted tag with no words here gets no link.
const PROMOTED_ALL: Record<Lang, Record<string, string>> = {
  hy: { "Հելոուին": "Հելոուինի բոլոր միջոցառումները" },
  en: { Halloween: "All Halloween events" },
};
const linkTo = (lang: Lang) => {
  const hot = promoted[lang];
  const label = hot && PROMOTED_ALL[lang][hot.key];
  return hot && label ? { href: `${prefix(lang)}${hot.slug}/`, label, title: hot.title } : undefined;
};
export const promotedLink = { hy: linkTo("hy"), en: linkTo("en") };

// Whether Yerevan City Day still has a date to come. The nav links to its
// page only until then; the page itself stays, as the record of the day.
export const cityDayAhead: Record<Lang, boolean> = {
  hy: allSections.hy.some((s) => s.slug === "yerevan-city-day" && s.items.some((i) => "start" in i && (i.end ?? i.start) >= today)),
  en: allSections.en.some((s) => s.slug === "yerevan-city-day" && s.items.some((i) => "start" in i && (i.end ?? i.start) >= today)),
};

export const pluralOf = (lang: Lang) => (key: string): string | undefined => tags(lang)[key]?.plural;
