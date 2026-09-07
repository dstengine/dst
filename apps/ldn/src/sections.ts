// This site's sections: /music/, /festivals/, /art/. The rules — how many
// entries a slice needs before it earns a page, which slugs are already
// spoken for — live in @dst/content/sections. What is left here is the
// vocabulary and the wording.
//
// No place sections. Every entry on this site is tagged "London", so the
// place rule would hand us a /london/ page holding precisely what /events/
// holds; `home` below is what stops it. That is not a limitation of the
// data, it is what a single-city site is.
import { buildSections, type Section, type Vocabulary } from "@dst/content/sections";
import type { FeedItem } from "@dst/content/sections";

const RESERVED = ["about", "events", "news", "go", "li"];

// A tag earns a page only if it is written down here, because the slug and
// the heading are both guesses otherwise — "Exhibitions" would be fine and
// "Architecture" would come out as /architecture/ meaning the buildings
// rather than the walks. Listed generously: an entry costs nothing until
// three items sit under it, and then the page appears on its own.
//
// "Days out" is deliberately absent. It is a useful label on a card and a
// terrible page: it describes how we filed something, not what a reader
// came looking for.
const TAGS: Record<string, Vocabulary> = {
  Music: { slug: "music", plural: "music", label: "Music" },
  Festival: { slug: "festivals", plural: "festivals" },
  Art: { slug: "art", plural: "art", label: "Art" },
  Exhibitions: { slug: "exhibitions", plural: "exhibitions" },
  Museums: { slug: "museums", plural: "museums" },
  Theatre: { slug: "theatre", plural: "theatre", label: "Theatre" },
  Film: { slug: "film", plural: "film", label: "Film" },
  Carnival: { slug: "carnival", plural: "carnival", label: "Carnival" },
  Architecture: { slug: "architecture", plural: "architecture", label: "Architecture" },
  Transport: { slug: "transport", plural: "transport", label: "Transport" },
  Science: { slug: "science", plural: "science", label: "Science" },
  Procession: { slug: "processions", plural: "processions" },
};

export const NAV = {
  allLabel: "All",
  allTitle: "Everything on in central London",
  label: "By subject",
};

export function sections(items: FeedItem[]): Section[] {
  return buildSections({
    items,
    reserved: RESERVED,
    tags: TAGS,
    home: "London",
    copy: (g) => {
      const what = g.voc.plural ?? g.key.toLowerCase();
      return {
        title: `${what[0].toUpperCase()}${what.slice(1)} in central London`,
        description: `${what[0].toUpperCase()}${what.slice(1)} in central London — dates confirmed with the organiser, and the source on every entry.`,
        h1: `${what[0].toUpperCase()}${what.slice(1)} in central London`,
        lede: `Everything on this site filed under ${what} — what is on, when it is on, and where we read it.`,
      };
    },
  });
}
