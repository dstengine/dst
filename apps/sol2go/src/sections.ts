// This site's sections: /serbia/, /hackathons/. The rules — how many
// entries a country needs, how many a kind needs, which slugs are already
// spoken for — live in @dst/content/sections. What is left here is the
// vocabulary and the wording, which is all a site should have to write.
import { buildSections, type Section, type Vocabulary } from "@dst/content/sections";
import type { EventItem } from "@dst/content/types";

export type { Section };

// Slugs the site already spends on pages of its own.
const RESERVED = ["about", "events", "news", "go", "li"];

// Countries whose heading the default would get wrong. `the` because a
// heading that reads "events in United Kingdom" reads like a form field —
// which is an English wording question and so stays here, unlike the slugs
// for the UK, the UAE and the USA, which are the same address on every site
// in the network and live in @dst/content/sections with the rules.
// Everything not listed here takes the slugified name and no article, which
// is right for most countries and is why this table is small.
interface Country extends Vocabulary {
  the?: boolean;
}
const COUNTRIES: Record<string, Country> = {
  "United Kingdom": { the: true },
  "United Arab Emirates": { the: true },
  "United States": { the: true },
  Netherlands: { the: true },
  Philippines: { the: true },
  "Czech Republic": { the: true },
};

// The plural a section is named by. Derived rather than tabulated, a
// "Co-working" section would be at /co-workings/ and a "Residency" at
// /residencys/ — so it is tabulated. `label` is the chip, where the wording
// is read at a glance beside a dozen others: "Solana calls and online
// events" is the right heading and the wrong chip.
const KINDS: Record<string, Vocabulary> = {
  Summit: { plural: "summits" },
  Hackathon: { plural: "hackathons" },
  Conference: { plural: "conferences" },
  Meetup: { plural: "meetups" },
  Forum: { plural: "forums" },
  Residency: { slug: "residencies", plural: "residencies" },
  "Hacker House": { slug: "hacker-houses", plural: "hacker houses" },
  "Co-working": { slug: "co-working", plural: "co-working days" },
  "Side event": { slug: "side-events", plural: "side events" },
  Online: { slug: "online", plural: "calls and online events", label: "Online" },
};

// What the row of chips says, kept beside the vocabulary it describes
// rather than repeated at each of the three places the row is drawn.
export const NAV = {
  allLabel: "All",
  allTitle: "The whole Solana events calendar",
  label: "Events by country and kind",
};

export function sections(items: EventItem[]): Section<EventItem>[] {
  return buildSections<EventItem, Country>({
    items,
    reserved: RESERVED,
    places: COUNTRIES,
    tags: KINDS,
    // A place page here is a country page. The city is in the data too, but
    // "solana events london" and "solana events uk" are the same reader,
    // and two pages answering one query compete with each other.
    placeOf: (e) => e.country,
    copy: (g) => {
      if (g.kind === "place") {
        // "in the UK", "in Serbia" — the article belongs to the country, so
        // it is carried with the country rather than written into each
        // string.
        const where = `${g.voc.the ? "the " : ""}${g.label}`;
        return {
          title: `Events in ${where}`,
          description: `Solana and crypto events in ${where}, on dates confirmed with the organiser and with the source on every entry.`,
          h1: `Solana events in ${where}`,
          lede: `Every event on this calendar that happens in ${where} — the date as the organiser published it, and a link to where we read it.`,
        };
      }
      const plural = g.voc.plural ?? g.key.toLowerCase();
      return {
        title: `Solana ${plural}: dates from the organiser`,
        description: `Solana ${plural} from across the ecosystem, on dates confirmed with the organiser and with the source on every entry.`,
        h1: `Solana ${plural}`,
        lede: `The ${plural} on this calendar — the date as the organiser published it, and a link to where we read it.`,
      };
    },
  });
}
