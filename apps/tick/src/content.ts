import { HY, EN } from "@dst/ui/labels";
import type { ArticleLabels } from "@dst/ui/labels";

// tick publishes in two languages: English at the root, Armenian under
// /am/. Every string below exists once per language and is picked by the
// page's own `lang` — see ./i18n.ts for how a page knows which it is.
//
// The English is written for a British reader with a light touch of the
// old school — a "rather", an impersonal "one" now and then — and never so
// much that it gets in the way of a date or a price.

export const siteId = "tick";

// In this order on purpose: the first is the default, the one hreflang
// sends a reader to when their language is neither (`x-default`).
export const LANGS = ["en", "hy"] as const;
export type Lang = (typeof LANGS)[number];

// The site publishes itself: it is independent of the DST group, so every
// block of structured data on it names this host rather than the group.
export const publisher = {
  id: "https://tick.lnd.lol/#organization",
  name: "Tick",
  url: "https://tick.lnd.lol/",
  // The mark in tools/marks/tick.svg, which is also the Google Business
  // Profile logo: one picture of the organisation wherever Google meets it.
  logo: { url: "https://tick.lnd.lol/logo-mini.png", width: 512, height: 512 },
};

type Page = { title: string; description: string; h1: string; lede: string };

export const home: Record<Lang, Page> = {
  hy: {
    title: "Միջոցառումներ Երևանում՝ համերգներ, թատրոն, տոմսեր",
    description:
      "Ինչ կա Երևանում՝ համերգներ, ներկայացումներ, փառատոներ և ցուցահանդեսներ։ Ամեն միջոցառում՝ ամսաթվով, տոմսի գնով և աղբյուրով։",
    h1: "Ինչ կա Երևանում",
    lede: "Համերգասրահներ և թատրոններ, փառատոներ քաղաքից դուրս և մի նորաձևության շաբաթ։ Ինչ կա Երևանում, որքան արժե տոմսը և որտեղ գնել այն՝ ամեն ամսաթիվ ստուգված տոմսարկղում։",
  },
  en: {
    title: "What's on in Yerevan: concerts, theatre and tickets",
    description:
      "What's on in Yerevan: concerts, theatre, festivals and exhibitions, each with its date, its price in drams and the source we checked it against.",
    h1: "What's on in Yerevan",
    lede: "Concert halls and theatres, festivals up in the hills and the odd fashion week — what is on in Yerevan, what it costs and where one buys a ticket, every date checked at the box office.",
  },
};

export const events: Record<Lang, Page> = {
  hy: {
    title: "Միջոցառումներ Երևանում՝ ըստ ամսաթվի",
    description:
      "Երևանի համերգները, ներկայացումները և փառատոները՝ ըստ ամսաթվի։ Ամեն ամսաթիվ ստուգված է կազմակերպչի կամ տոմսարկղի մոտ։",
    h1: "Երևանը՝ ըստ ամսաթվի",
    lede: "Ամսաթվերը ստուգում ենք կազմակերպչի կամ տոմսարկղի մոտ։ Ինչը չունի հաստատված ամսաթիվ, սպասում է, մինչև ունենա։",
  },
  en: {
    title: "Events in Yerevan by date",
    description:
      "Concerts, plays and festivals in Yerevan in date order, every one confirmed with the organiser or the box office.",
    h1: "Yerevan by date",
    lede: "Every date here has been confirmed with the organiser or the box office. Anything without a confirmed date waits until it has one — which is rather the point of a calendar.",
  },
};

export const news: Record<Lang, Page> = {
  hy: {
    title: "Երևանի մշակութային նորություններ",
    description:
      "Ինչ է փոխվում Երևանում՝ փառատոներ, ցուցահանդեսներ, նոր վայրեր։ Ամեն նորություն՝ աղբյուրով և ամսաթվով։",
    h1: "Երևանի նորությունները",
    lede: "Լրահոս չէ։ Շաբաթը մի քանի բան, որ արժե իմանալ և որ կարողացել ենք ստուգել աղբյուրով։",
  },
  en: {
    title: "Yerevan culture news",
    description:
      "What is changing in Yerevan: festivals, exhibitions and new venues, each item with its source and its date.",
    h1: "Yerevan culture news",
    lede: "Not a ticker. A few things a week that are worth knowing and that we could check against the source.",
  },
};

export const about: Record<Lang, Page> = {
  hy: {
    title: "Tick-ի մասին՝ Երևանի միջոցառումների օրացույց",
    description:
      "Tick-ը Երևանի միջոցառումների օրացույց է՝ աղբյուրով և ստուգման ամսաթվով ամեն գրառման մոտ։",
    h1: "Tick-ի մասին՝ Երևանի միջոցառումների օրացույց",
    lede: "Ինչ կա Երևանում և Հայաստանում՝ աղբյուրով և ստուգման ամսաթվով ամեն գրառման մոտ։",
  },
  en: {
    title: "About Tick, a Yerevan events calendar",
    description:
      "Tick is a calendar of what's on in Yerevan, with the source and the date it was last checked on every entry.",
    h1: "About Tick, a Yerevan events calendar",
    lede: "What is on in Yerevan and across Armenia, with the source and the date we last checked on every entry.",
  },
};

// The headings and links the front page and the listings put on the page.
export const words: Record<Lang, {
  upcoming: string; allEvents: string; news: string; allNews: string;
}> = {
  hy: { upcoming: "Առաջիկայում", allEvents: "Բոլոր միջոցառումները", news: "Նորություններ", allNews: "Բոլոր նորությունները" },
  en: { upcoming: "Coming up", allEvents: "All events", news: "News", allNews: "All news" },
};

// The words the shared article components put on the page.
export const labels: Record<Lang, Partial<ArticleLabels>> = { hy: HY, en: EN };

/**
 * The RSS channel, one per language. site.config.ts needs the title too —
 * the head's autodiscovery link is what a reader's tool reads to offer the
 * subscription, and a title written out twice is a title that drifts.
 */
export const feed: Record<Lang, { title: string; description: string; language: string }> = {
  hy: {
    title: "Tick · Երևան — նորություններ",
    description: "Ինչ է փոխվում Երևանում՝ փառատոներ, ցուցահանդեսներ և նոր վայրեր, աղբյուրով և ամսաթվով։",
    /** RFC 5646. Without it an aggregator files this site under the wrong language. */
    language: "hy",
  },
  en: {
    title: "Tick · Yerevan — news",
    description: "What is changing in Yerevan: festivals, exhibitions and new venues, with the source and the date.",
    language: "en-GB",
  },
};

/** The subscribable calendar at events.ics, one per language. */
export const calendar: Record<Lang, { name: string; description: string }> = {
  hy: {
    name: "Tick · Երևան",
    description: "Համերգներ, ներկայացումներ և փառատոներ Երևանում՝ աղբյուրով և հաստատված ամսաթվով։",
  },
  en: {
    name: "Tick · Yerevan",
    description: "Concerts, theatre and festivals in Yerevan, with the source and a confirmed date.",
  },
};
