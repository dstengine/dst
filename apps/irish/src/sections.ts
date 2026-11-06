// This site's sections: one page per subject, once there are two guides to
// put on it. The rules — how many entries a section needs, which slugs are
// already spoken for — live in @dst/content/sections. What is left here is
// the vocabulary and the wording.
//
// Three subjects, each a question a reader arrives with: is there a tent in
// it, can it be done in a day, is it in Belfast. Every entry carries the
// tags it answers in `tags`, and each page's title, description and h1 say
// "dance music festivals Ireland".
import { buildSections, type Intent, type Section } from "@dst/content/sections";
import type { NewsItem } from "@dst/content/types";

export type { Section };

// Slugs the site already spends on pages of its own.
const RESERVED = ["about", "guides", "go", "li"];

/** A subject, and how its page talks about it. */
interface Subject {
  /** As it stands in `tags` on the entries. */
  tag: string;
  slug: string;
  /** The chip. */
  label: string;
  /** The page's own words: a title, a description and an h1 that say "dance music festivals Ireland". */
  title: string;
  description: string;
  h1: string;
  lede: string;
}

const SUBJECTS: Subject[] = [
  {
    tag: "Camping",
    slug: "camping",
    label: "Camping",
    title: "Dance music festivals Ireland: the camping weekends",
    description: "The dance music festivals Ireland hosts as camping weekends: what the ticket includes, when the gates open, what to pack and how to reach the field without a car.",
    h1: "Camping weekends among the dance music festivals Ireland hosts",
    lede: "Festivals where the ticket comes with a pitch for a tent, from an island in West Cork to an estate in the Wicklow mountains. Each guide says what the organiser includes, what to bring and how to get there by bus, train or ferry.",
  },
  {
    tag: "Day festivals",
    slug: "day-festivals",
    label: "Day festivals",
    title: "Dance music festivals Ireland: the day and city events",
    description: "The dance music festivals Ireland hosts as day events, in a city or a short ride from one: gate times, last entry, the ID asked for and the way home by bus or train.",
    h1: "Day festivals among the dance music festivals Ireland hosts",
    lede: "One or two days and no tent: gates in the afternoon, the last act before midnight and a bus, train or Luas home. Each guide gives the times the organiser publishes and the ID it asks for at the gate.",
  },
  {
    tag: "Belfast",
    slug: "belfast",
    label: "Belfast",
    title: "Dance music festivals Ireland: the Belfast open-airs",
    description: "The dance music festivals Ireland hosts in Belfast: the venues, the dates, the age rules and the ID accepted, and how to get there by Translink bus or train.",
    h1: "Belfast and the dance music festivals Ireland hosts",
    lede: "Two open-air weekends in Belfast, one on the slipways in the Titanic Quarter and one on the playing fields off Boucher Road. Prices are in pounds sterling, and the buses and trains are Translink's.",
  },
];

// Two guides make a page: one alone is a link to itself with a heading on
// top, and the guides index already lists it.
const INTENTS: Intent<NewsItem>[] = SUBJECTS.map((s) => ({
  slug: s.slug,
  label: s.label,
  match: (item) => item.tags?.includes(s.tag) ?? false,
  min: 2,
}));

const bySlug = new Map(SUBJECTS.map((s) => [s.slug, s]));

// What the row of chips says, kept beside the vocabulary it describes.
export const NAV = {
  allLabel: "All",
  allTitle: "Every guide to the dance music festivals Ireland hosts",
  label: "Festival guides by subject",
};

export function sections(items: NewsItem[]): Section<NewsItem>[] {
  return buildSections<NewsItem>({
    items,
    reserved: [...RESERVED, ...items.flatMap((i) => (i.path ? [i.path.replace(/\//g, "")] : []))],
    intents: INTENTS,
    // No place sections.
    placeOf: () => undefined,
    copy: (g) => {
      const s = bySlug.get(g.slug)!;
      return { title: s.title, description: s.description, h1: s.h1, lede: s.lede };
    },
  });
}

/** The page for a tag, when it has earned one — for the chips under an
    article. Read off the built sections, so a chip never points at a 404. */
export function tagLinks(item: NewsItem, all: Section<NewsItem>[]) {
  return (item.tags ?? []).flatMap((tag) => {
    const subject = SUBJECTS.find((s) => s.tag === tag);
    const built = subject && all.find((s) => s.kind === "intent" && s.slug === subject.slug);
    return built ? [{ href: `/${built.slug}/`, label: built.label, title: built.h1 }] : [];
  });
}
