// This site's sections: one page per subject, once there are two guides to
// put on it. The rules — how many entries a section needs, which slugs are
// already spoken for — live in @dst/content/sections. What is left here is
// the vocabulary and the wording.
//
// Three subjects, one for each place a payment can give itself away: the
// protocol, the network and the wallet. Each tag is one the entries carry
// in `tags`, and each page's title, description and h1 say "Monero privacy".
// "Rules" is a tag without a page until a second guide carries it.
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
  /** The page's own words: a title, a description and an h1 that say "Monero privacy". */
  title: string;
  description: string;
  h1: string;
  lede: string;
}

const SUBJECTS: Subject[] = [
  {
    tag: "Protocol",
    slug: "protocol",
    label: "Protocol",
    title: "Monero privacy protocol: rings, addresses and FCMP++",
    description: "How the Monero privacy protocol hides sender, receiver and amount: ring signatures, one-time addresses, RingCT, the FCMP++ upgrade and a Zcash comparison.",
    h1: "The Monero privacy protocol",
    lede: "What the chain hides and how: rings and key images, one-time addresses and view tags, commitments and range proofs, and the full-chain proofs meant to replace the ring.",
  },
  {
    tag: "Network",
    slug: "network",
    label: "Network",
    title: "Monero privacy on the network: Dandelion++, Tor, I2P",
    description: "Monero privacy on the peer-to-peer network: how Dandelion++ hides which node a transaction started from, and how to run monerod over Tor or I2P.",
    h1: "Monero privacy on the network",
    lede: "The chain hides the sender; the network can still give away the IP address. Dandelion++, Tor and I2P, with the parameters from the code and the leaks the documentation lists.",
  },
  {
    tag: "Wallets",
    slug: "wallets",
    label: "Wallets",
    title: "Monero privacy in the wallet: keys, seeds and proofs",
    description: "Monero privacy in the wallet: what a view key reveals, the proofs that disclose less, seeds and Polyseed, checking a download, and hardware wallets.",
    h1: "Monero privacy in the wallet",
    lede: "The keys that hold everything the protocol hides: what each one discloses, how the seed encodes them, and how to check the software and hardware that keep them.",
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
  allTitle: "Every Monero privacy guide on this site",
  label: "Monero privacy guides by subject",
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
