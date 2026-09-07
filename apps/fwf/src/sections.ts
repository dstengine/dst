// This site's sections: /mobility/, /ai/, /tech/, /conferences/. The rules —
// how many entries a subject needs, which slugs are already spoken for —
// live in @dst/content/sections. What is left here is the vocabulary and
// the wording.
//
// No place sections: the forum is in Dubai and so is everything the site
// reports, so the place rule would produce a /dubai/ page holding the whole
// feed. `home` below is what stops it.
import { buildSections, type Section, type Vocabulary } from "@dst/content/sections";
import type { FeedItem } from "@dst/content/sections";

const RESERVED = ["about", "events", "news", "tickets", "programme", "venue", "faq", "go", "li"];

// The five sectors on the forum's programme, plus the shapes an entry comes
// in. Listed generously: an entry costs nothing until three items sit under
// it, and then the page appears without anyone editing this file.
const TAGS: Record<string, Vocabulary> = {
  Mobility: { slug: "mobility", plural: "mobility", label: "Mobility" },
  AI: { slug: "ai", plural: "AI", label: "AI" },
  Tech: { slug: "tech", plural: "technology", label: "Tech" },
  Conference: { slug: "conferences", plural: "conferences" },
  "Smart cities": { slug: "smart-cities", plural: "smart cities" },
  PropTech: { slug: "proptech", plural: "PropTech", label: "PropTech" },
  "Fintech & crypto": { slug: "fintech", plural: "fintech and crypto", label: "Fintech" },
  Foresight: { slug: "foresight", plural: "foresight", label: "Foresight" },
  Exhibition: { slug: "exhibitions", plural: "exhibitions" },
};

// No "all" chip: this site's feed is two feeds at two addresses, and one
// chip cannot honestly point at both. The header already carries News and
// Events, which is where "all of it" lives.
export const NAV = { label: "By subject" };

// The forum itself never appears in a section. Its page is the home page,
// not an entry under /events/, so a card for it would link to an address
// that does not exist — and a section about mobility listing the site's own
// subject as one of its items is filing the shop under its own shelves.
const FORUM = "future-world-forum-dubai-2026";

export function sections(items: FeedItem[]): Section[] {
  return buildSections({
    items: items.filter((i) => i.slug !== FORUM),
    reserved: RESERVED,
    tags: TAGS,
    home: "Dubai",
    copy: (g) => {
      const what = g.voc.plural ?? g.key.toLowerCase();
      const Title = `${what[0].toUpperCase()}${what.slice(1)}`;
      return {
        title: `${Title} in Dubai`,
        description: `${Title} in Dubai — the news and the dates on this subject, each one sourced from the body that announced it.`,
        h1: `${Title} in Dubai`,
        lede: `Everything on this site filed under ${what} — what was announced, who announced it, and when we checked it against them.`,
      };
    },
  });
}
