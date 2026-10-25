// This site's sections: one page per subject — /algorithm/, /hardware/,
// /mining/ — once there are two guides to put on it. The rules — how many
// entries a section needs, which slugs are already spoken for — live in
// @dst/content/sections. What is left here is the vocabulary and the wording.
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
  /** The page's own words: a title, a description and an h1 that say RandomX. */
  title: string;
  description: string;
  h1: string;
  lede: string;
}

const SUBJECTS: Subject[] = [
  {
    tag: "Algorithm",
    slug: "algorithm",
    label: "Algorithm",
    title: "How RandomX works: the algorithm, v2 and the variants",
    description: "How the RandomX proof of work works: the virtual machine, the dataset and the cache, what RandomX v2 changes, and the rx/ variants other coins run.",
    h1: "How the RandomX algorithm works",
    lede: "The virtual machine and its random programs, the 2080 MiB dataset, RandomX v2, and the variants other coins have made by changing its parameters.",
  },
  {
    tag: "Hardware",
    slug: "hardware",
    label: "Hardware",
    title: "RandomX hardware: memory, huge pages and CPUs",
    description: "What a RandomX miner asks of a computer: how much memory, why cache per thread matters, huge pages, and how RandomX runs on Apple Silicon.",
    h1: "RandomX on real hardware",
    lede: "What a RandomX miner asks of the machine it runs on: memory, cache, large pages — and the platforms where some of that is not available.",
  },
  {
    tag: "Mining",
    slug: "mining",
    label: "Mining",
    title: "Mining RandomX: XMRig, P2Pool and the coins",
    description: "The software and the networks of RandomX mining: XMRig, P2Pool, and the coins that run RandomX or a variant of it.",
    h1: "Mining RandomX",
    lede: "The miner most people run, the pool that has no operator, and the coins that use RandomX or a variant of it.",
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
  allTitle: "Every RandomX guide on this site",
  label: "RandomX guides by subject",
};

export function sections(items: NewsItem[]): Section<NewsItem>[] {
  return buildSections<NewsItem>({
    items,
    reserved: [...RESERVED, ...items.flatMap((i) => (i.path ? [i.path.replace(/\//g, "")] : []))],
    intents: INTENTS,
    // No place sections: an algorithm has no city.
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
