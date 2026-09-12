// Cutting one feed into pages a reader would actually ask for. Two
// questions the long list cannot answer — "what is on near me" and "what is
// there of the kind I care about" — and two queries ("solana hackathons",
// "london music events") that the list page cannot rank for because it is
// about neither.
//
// This file holds only the mechanics: what counts as enough, which slugs
// are already taken, and the order the row of links comes out in. The words
// stay with the site, because half the network writes Spanish and one site
// writes German, and a heading assembled here would be assembled in the
// wrong language. A site passes its vocabulary and a `copy` function and
// gets sections back.
//
// Three rules, each of which cost something to learn:
//
// 1. **A place needs two entries, a kind needs three.** The difference is
//    whose word the heading is. A place is where a reader already is, and
//    "what is on in Armenia" is a question asked whether the answer is two
//    dates or twenty. A kind is a label we chose, and a page for a label
//    with two entries under it is a slice of our own taxonomy rather than
//    an answer to anything: it repeats the feed at a second address, which
//    is how a small site spends its crawl budget arguing with itself.
//
// 2. **The site's own place is never a section.** Every city site in this
//    network tags every event with the one city it is about, so the
//    threshold would hand ldn a /london/ page holding exactly what
//    /events/ holds. That is not a section, it is the front page at a
//    second address — the purest kind of duplicate a site can publish
//    against itself. `home` names that place so the rule can skip it, and
//    a site with two cities in it starts getting real place sections the
//    day the second one arrives.
//
// 3. **An unlisted kind gets no page.** A place we have never heard of
//    still slugifies correctly — a country is a country. A kind is a word
//    we invented, and its plural, its slug and its heading are all
//    guesses: "Co-working" would become /co-workings/ and "Residency"
//    /residencys/. So tags are tabulated, and a tag nobody has written a
//    plural for stays a label on a card.
//
// Sections live at the root — /hackathons/, /transport/ — rather than under
// /tag/ or /country/: the words a reader searches for are "solana
// hackathons", and a path segment wedged in front of them is a segment that
// matches nothing anyone types. The cost is a shared namespace with the
// site's own pages, which is what `reserved` is for.
import type { EventItem, NewsItem } from "./types.ts";

export type FeedItem = NewsItem | EventItem;

/** What a section is called and where it lives, where the default is wrong. */
export interface Vocabulary {
  /** Overrides the slugified key. "uk", not "united-kingdom". */
  slug?: string;
  /** Overrides the key in the chip and the breadcrumb. "UAE", not the full name. */
  label?: string;
  /** The plural the heading is built from: "hacker houses", "días de museo". */
  plural?: string;
}

export interface Group<T extends FeedItem, V extends Vocabulary = Vocabulary> {
  kind: "place" | "tag";
  /** The value as it stands in the data: "United Kingdom", "Transport". */
  key: string;
  slug: string;
  label: string;
  /** The site's entry for this key, so `copy` can reach fields of its own. */
  voc: V;
  items: T[];
}

/** The headings inside a section page, where the default words are wrong. */
export interface Headings {
  /** Over the events half. Default: the site's word for "Events". */
  events?: string;
  /** Over the news half. Default: the site's word for "News". */
  news?: string;
  /** Over the dates still to come. Default: "Upcoming", in the site's language. */
  upcoming?: string;
  /** Over the dates already gone. Default: "Past". */
  past?: string;
}

/** The four strings a section page needs, in the site's own language. */
export interface Copy {
  title: string;
  description: string;
  h1: string;
  lede: string;
  /**
   * A section whose subject is searched for by name wants its own words over
   * the two halves of the feed: on a Día de Muertos page "Eventos" and
   * "Próximos" are filing labels, while "Dónde ver el Día de Muertos en
   * 2026" is the question the page is being asked. Optional, because on a
   * section named after a kind — ferias, exhibitions — the generic word is
   * already the right one, and a heading that repeats the h1 is furniture.
   */
  headings?: Headings;
}

export interface Section<T extends FeedItem = FeedItem> extends Group<T>, Copy {}

export interface SectionsInput<T extends FeedItem, V extends Vocabulary> {
  items: T[];
  /** Slugs the site already spends on pages of its own. */
  reserved: Iterable<string>;
  /** Place vocabulary. A place absent from here still gets a section. */
  places?: Record<string, V>;
  /** Tag vocabulary. A tag absent from here gets none — see rule 3. */
  tags?: Record<string, V>;
  /**
   * The place the site is about, which never becomes a section \u2014 and every
   * other name for that same place. It takes a list because `placeOf`
   * defaults to `country ?? city`, so one field filled in on some entries
   * and not others splits a single place under two names: riviera had
   * three of its six Dubai events also carrying a country, which asked for
   * a /united-arab-emirates/ page holding half the site under a heading
   * nobody would search for. A city site that ever records a country needs
   * both words here.
   */
  home?: string | readonly string[];
  /** Which field is the place. Defaults to country, then city. */
  placeOf?: (item: T) => string | undefined;
  minPlace?: number;
  minTag?: number;
  copy: (group: Group<T, V>) => Copy;
}

export const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Countries whose slug the default gets wrong, shared because the answer is
// the same on every site: nobody types "united-arab-emirates", and a country
// that has a short form in every other URL on the web should have it here
// too. It lives with the mechanics rather than in each site's vocabulary
// because a slug is an address — if two sites in one network disagree about
// what the UAE's page is called, one of them is wrong, and the site that
// happens to be written second is not the one that should decide.
//
// A site's own `places` entry still wins, key by key: this sets the slug and
// the label, and a site that needs a third field on the same country keeps
// it. Any country not listed takes its slugified name, which is right for
// most of them and is why the table is short.
export const COUNTRY_SLUGS: Record<string, Vocabulary> = {
  "United Kingdom": { slug: "uk", label: "UK" },
  "United Arab Emirates": { slug: "uae", label: "UAE" },
  "United States": { slug: "usa", label: "USA" },
};

/** Per rule 1 at the top of this file. */
export const ENOUGH_PLACE = 2;
export const ENOUGH_TAG = 3;

function group<T>(items: T[], key: (item: T) => string | undefined): Map<string, T[]> {
  const out = new Map<string, T[]>();
  for (const item of items) {
    const k = key(item);
    if (!k) continue;
    const bucket = out.get(k);
    if (bucket) bucket.push(item);
    else out.set(k, [item]);
  }
  return out;
}

// An event sorts by when it happens, a news item by when it was written,
// and the two want opposite directions: the next thing first, the newest
// thing first. Both fall back to the slug so a build is reproducible.
function ordered<T extends FeedItem>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const [x, y] = [a, b].map((i) => ("start" in i ? i.start : i.date));
    if (x !== y) return "start" in a ? (x < y ? -1 : 1) : x < y ? 1 : -1;
    return a.slug.localeCompare(b.slug);
  });
}

/** The subject page an item belongs on, or nothing when it has none.
 *
 *  A detail page knows its category and prints it; what it cannot know on
 *  its own is whether that word has earned a page — three items is the
 *  threshold, and below it a chip would point at a 404. So the answer is
 *  read off the sections the site actually built, which is the same list the
 *  nav is built from and cannot drift from it.
 *
 *  Only kinds, not places: a place section on a city site is the site, and
 *  the sites where it is not have yet to ask for the link. */
export function sectionHrefFor<T extends FeedItem>(
  item: T,
  all: Section<T>[],
): string | undefined {
  if (!item.category) return undefined;
  const found = all.find((s) => s.kind === "tag" && s.key === item.category);
  return found ? `/${found.slug}/` : undefined;
}

export function buildSections<T extends FeedItem, V extends Vocabulary = Vocabulary>(
  input: SectionsInput<T, V>,
): Section<T>[] {
  const {
    items,
    reserved,
    places = {},
    tags = {},
    home,
    placeOf = (i) => ("country" in i ? (i.country ?? i.city) : undefined),
    minPlace = ENOUGH_PLACE,
    minTag = ENOUGH_TAG,
    copy,
  } = input;

  const isHome = new Set(typeof home === "string" ? [home] : (home ?? []));
  const taken = new Set(reserved);
  const out: Section<T>[] = [];

  const push = (g: Group<T, V>) => {
    if (taken.has(g.slug)) return;
    // A place and a tag can want the same word — "Online" is both a city
    // and a kind on sol2go. First one wins and the second is dropped rather
    // than silently shadowing it in the route.
    taken.add(g.slug);
    out.push({ ...g, ...copy(g), items: ordered(g.items) });
  };

  for (const [key, list] of group(items, placeOf)) {
    if (isHome.has(key) || list.length < minPlace) continue;
    const voc = { ...COUNTRY_SLUGS[key], ...places[key] } as V;
    push({
      kind: "place",
      key,
      slug: voc.slug ?? slugify(key),
      label: voc.label ?? key,
      voc,
      items: list,
    });
  }

  for (const [key, list] of group(items, (i) => i.category)) {
    if (list.length < minTag) continue;
    const voc = tags[key];
    if (!voc) continue;
    const plural = voc.plural ?? key.toLowerCase();
    push({
      kind: "tag",
      key,
      slug: voc.slug ?? slugify(plural),
      label: voc.label ?? plural[0].toUpperCase() + plural.slice(1),
      voc,
      items: list,
    });
  }

  // Places first, then kinds; alphabetical within each, so the row of links
  // does not reshuffle itself every time an entry is added.
  return out.sort((a, b) =>
    a.kind === b.kind ? a.label.localeCompare(b.label) : a.kind === "place" ? -1 : 1,
  );
}
