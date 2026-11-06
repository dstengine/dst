// This site's sections: one page per subject, once there are two guides to
// put on it. The rules — how many entries a section needs, which slugs are
// already spoken for — live in @dst/content/sections. What is left here is
// the vocabulary and the wording.
//
// Three subjects, each with a tag the entries carry in `tags` and a
// title, a description and an h1 that say "Monzero".
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
  /** The page's own words: a title, a description and an h1 that say "Monzero". */
  title: string;
  description: string;
  h1: string;
  lede: string;
}

const SUBJECTS: Subject[] = [
  {
    tag: "Cake Wallet",
    slug: "cake-wallet",
    label: "Cake Wallet",
    title: "Guides to the Monzero patch: build, seeds, pull request",
    description: "The Monzero guides about Cake Wallet: what the XMZ integration patch adds, how its seeds work, how it was built and tested, and where its pull request stands.",
    h1: "The Monzero patch for Cake Wallet",
    lede: `What the patch that adds Monzero to Cake Wallet does, how it was built and tested, and what has to happen before Cake Wallet could ship it.`,
  },
  {
    tag: "Network",
    slug: "network",
    label: "Network",
    title: "The Monzero network: the coin, its figures and its nodes",
    description: "The Monzero guides about the network itself: the XMZ coin and its figures, its ports and public node, and what a wallet's connection to it exposes.",
    h1: "The Monzero network",
    lede: `The coin a Cake Wallet Monzero wallet holds, and the nodes it talks to: the figures from Monzero's own specification, and what we saw on its public node.`,
  },
  {
    tag: "Security",
    slug: "security",
    label: "Security",
    title: "Monzero wallet security: shared seeds and plain-HTTP nodes",
    description: "The Monzero guides about keeping an XMZ wallet safe in Cake Wallet: why a BIP39 phrase gives Monero's keys, and what a plain-HTTP node connection exposes.",
    h1: "Monzero wallet security",
    lede: `Two things to know before trusting a Monzero wallet with anything: a seed shared with Monero shares its keys, and the default node is reached over plain HTTP.`,
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
  allTitle: "Every Monzero guide on this site, on every subject",
  label: "Monzero guides by subject",
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
