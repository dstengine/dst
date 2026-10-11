// This site's sections: one page per family of tea — /black-tea/,
// /green-tea/ — once there are two guides to put on it. The rules — how many
// entries a section needs, which slugs are already spoken for — live in
// @dst/content/sections. What is left here is the vocabulary and the wording.
import { buildSections, type Intent, type Section } from "@dst/content/sections";
import type { NewsItem } from "@dst/content/types";

export type { Section };

// Slugs the site already spends on pages of its own.
const RESERVED = ["about", "guides", "schedule", "go", "li"];

/** A family of tea, and how its page talks about it. */
interface Family {
  /** As it stands in `tags` on the entries. */
  tag: string;
  slug: string;
  /** The chip. */
  label: string;
  /** What makes it that family, in a clause, for the page's opening line. */
  what: string;
}

// The word a reader types is "green tea", not "unoxidised Camellia
// sinensis", so that is the slug and the heading.
const FAMILIES: Family[] = [
  { tag: "Black tea", slug: "black-tea", label: "Black tea", what: "the fully oxidised leaf behind every builder's mug, from Assam and Darjeeling to Earl Grey" },
  { tag: "Green tea", slug: "green-tea", label: "Green tea", what: "leaf heated soon after picking so it never oxidises — steamed in Japan, pan-fired in China" },
  { tag: "Oolong", slug: "oolong", label: "Oolong", what: "the partly oxidised teas between green and black, rolled or twisted and built for many infusions" },
  { tag: "White tea", slug: "white-tea", label: "White tea", what: "buds and young leaves withered and dried with as little handling as tea gets" },
  { tag: "Pu-erh", slug: "pu-erh", label: "Pu-erh", what: "Yunnan's aged and fermented tea, raw or ripe, usually pressed into cakes" },
];

// Two guides make a page: one alone is a link to itself with a heading on
// top, and the guides index already lists it.
const INTENTS: Intent<NewsItem>[] = FAMILIES.map((f) => ({
  slug: f.slug,
  label: f.label,
  match: (item) => item.tags?.includes(f.tag) ?? false,
  min: 2,
}));

const bySlug = new Map(FAMILIES.map((f) => [f.slug, f]));

// What the row of chips says, kept beside the vocabulary it describes.
export const NAV = {
  allLabel: "All",
  allTitle: "Every tea guide on this site",
  label: "Tea guides by kind of tea",
};

export function sections(items: NewsItem[]): Section<NewsItem>[] {
  return buildSections<NewsItem>({
    items,
    reserved: RESERVED,
    intents: INTENTS,
    // No place sections: a guide to Darjeeling is about the tea, and a
    // reader in Darjeeling wants the same page as a reader in Leeds.
    placeOf: () => undefined,
    copy: (g) => {
      const f = bySlug.get(g.slug)!;
      // "oolong tea", "pu-erh tea": the chip can be short, the heading says
      // what the reader typed.
      const lower = f.label.toLowerCase();
      const name = lower.endsWith(" tea") ? lower : `${lower} tea`;
      return {
        title: `How to brew ${name}: temperatures, times and the teas`,
        description: `How to brew ${name}, ${f.what}. Water temperature, steeping time and how much leaf, tea by tea.`,
        h1: `How to brew ${name}`,
        lede: `${f.label}: ${f.what}. The general method first, then the named teas, each with its own temperature and time.`,
      };
    },
  });
}

/** The page for a tag, when it has earned one — for the chips under an
    article. Read off the built sections, so a chip never points at a 404. */
export function tagLinks(item: NewsItem, all: Section<NewsItem>[]) {
  return (item.tags ?? []).flatMap((tag) => {
    const family = FAMILIES.find((f) => f.tag === tag);
    const built = family && all.find((s) => s.kind === "intent" && s.slug === family.slug);
    return built ? [{ href: `/${built.slug}/`, label: built.label, title: built.h1 }] : [];
  });
}
