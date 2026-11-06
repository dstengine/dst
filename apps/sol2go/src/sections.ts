// This site's sections: /serbia/, /hackathons/. The rules — how many
// entries a country needs, how many a kind needs, which slugs are already
// spoken for — live in @dst/content/sections. What is left here is the
// vocabulary and the wording, which is all a site should have to write.
import { buildSections, type Intent, type Section, type Vocabulary } from "@dst/content/sections";
import type { EventItem } from "@dst/content/types";

export type { Section };

// Slugs the site already spends on pages of its own.
const RESERVED = ["about", "events", "news", "go", "li", "epoch", "unstake"];

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

// The one section cut by a fact rather than a field. "Breakpoint" is the
// one word people type for a fortnight that the data files under six
// different kinds — a hacker house, a demo day, two technical days, the
// conference and its dinners — so no category could hold it. The fact is a
// tag written on each entry that belongs to the fortnight, in the same way
// tick marks its City Day; nothing is read off a title or a date range.
//
// The second is an organiser. Superteam is the name builders type, and its
// chapters run a large share of what this calendar holds — summits, the
// Friday co-working days, a residency, a monthly call — under a dozen kinds
// and four countries, so neither a kind nor a place page gathers them. The
// fact is the recorded `organizer` field, which names the chapter
// ("Superteam UK", "Anodos Labs and Superteam Balkan"); never a title or
// the prose of a body.
const INTENTS: Intent<EventItem>[] = [
  {
    slug: "breakpoint",
    label: "Breakpoint week",
    match: (e) => e.tags?.includes("breakpoint-week") ?? false,
  },
  {
    slug: "superteam",
    label: "Superteam",
    match: (e) => /\bSuperteam\b/.test(e.organizer ?? ""),
  },
];

export function sections(items: EventItem[]): Section<EventItem>[] {
  return buildSections<EventItem, Country>({
    items,
    reserved: RESERVED,
    places: COUNTRIES,
    tags: KINDS,
    intents: INTENTS,
    // A place page here is a country page. The city is in the data too, but
    // "solana events london" and "solana events uk" are the same reader,
    // and two pages answering one query compete with each other.
    placeOf: (e) => e.country,
    copy: (g) => {
      // Written to stay true as the dates pass: what the chapters run and
      // where, not which of it is next — the list below says that.
      if (g.kind === "intent" && g.key === "superteam") {
        return {
          title: "Superteam events: Solana summits, meetups and calls",
          description:
            "Superteam events on a Solana calendar: chapter summits in Toronto, Belgrade and Mumbai, coworking Fridays in London and Belgrade, Superteam Canada's monthly call — dates from each chapter.",
          h1: "Superteam's Solana events",
          lede: "Superteam calls itself the talent layer of Solana, and its country chapters organise a good part of what this calendar holds: the Solana summits in Toronto, Belgrade and Mumbai, coworking Fridays in London and Belgrade, Buildstation in Belgrade, a demo day in London and Superteam Canada's community call once a month. Every date is the one the chapter published, with a link to where we read it.",
        };
      }
      if (g.kind === "intent") {
        return {
          title: "Solana Breakpoint 2026 week in London: every event",
          description:
            "Solana Breakpoint week in London, 1 to 17 November 2026: the Hacker House, Demo Day, 200ms, Scale or Die, the conference at Olympia and the evening side events, with dates, prices and the source on every entry.",
          h1: "Solana Breakpoint 2026 week in London",
          lede: "Everything on this calendar that belongs to the Breakpoint fortnight — the Hacker House from 1 November, the technical days on the 13th and 14th, the conference at Olympia from the 15th and the evenings around it — each date as the organiser published it, and a link to where we read it.",
        };
      }
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

// The word a heading uses for a kind. The article components know which kind
// a block came out as; only this file knows what that kind is called, so it
// answers one question rather than handing over the table. A kind with no
// entry has no word, and the block keeps the generic heading — the same rule
// as rule 3 in @dst/content/sections, one level down.
export const pluralOf = (key: string): string | undefined => KINDS[key]?.plural;
