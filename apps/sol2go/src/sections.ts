// Root-level sections: /serbia/, /hackathons/. Two questions a reader
// arrives with that the one long calendar cannot answer — "what is on near
// me" and "what is on of the kind I go to" — and two queries ("solana
// events serbia", "solana hackathons") that the calendar page cannot rank
// for because it is about neither.
//
// A country page exists once two events are in it; a kind needs three. The
// difference is whose word the heading is. A country is where a reader
// already is, and "what is on in Armenia" is a question asked whether the
// answer is two dates or twenty — two of them is already the comparison the
// page is opened for. A kind is a label we chose, and a page for a label
// with two entries under it is a slice of our own taxonomy rather than an
// answer to anything: it repeats the calendar at a second address, which is
// how a small site spends its crawl budget arguing with itself. Both
// thresholds are checked at build time, so a section appears the day it is
// earned and disappears again if an event is removed.
//
// Both kinds live in the root rather than under /country/ or /tag/: the
// words a reader searches for are "solana hackathons", and a path segment
// wedged in front of them is a segment that matches nothing anyone types.
// The cost is a shared namespace, hence RESERVED below.
import type { EventItem } from "@dst/content/types";

// Slugs the site already spends on pages of its own. A section that
// collided with one would either lose the route or silently shadow it.
const RESERVED = new Set(["about", "events", "news", "go", "li"]);

// Countries whose slug or heading the default would get wrong. "uk" rather
// than "united-kingdom" because it is what people type and what the country
// is called in a URL everywhere else; `the` because a heading that reads
// "events in United Kingdom" reads like a form field. Everything not listed
// here takes the slugified name and no article, which is right for most
// countries and is why this table is small.
const COUNTRIES: Record<string, { slug?: string; the?: boolean; short?: string }> = {
  "United Kingdom": { slug: "uk", the: true, short: "UK" },
  "United Arab Emirates": { slug: "uae", the: true, short: "UAE" },
  "United States": { slug: "usa", the: true, short: "USA" },
  Netherlands: { the: true },
  Philippines: { the: true },
  "Czech Republic": { the: true },
};

// The plural a section is named by, and the phrase its heading is built
// from. Derived rather than tabulated, a "Co-working" section would be at
// /co-workings/ and a "Residency" at /residencys/ — so it is tabulated.
const CATEGORIES: Record<string, { slug: string; plural: string }> = {
  Summit: { slug: "summits", plural: "summits" },
  Hackathon: { slug: "hackathons", plural: "hackathons" },
  Conference: { slug: "conferences", plural: "conferences" },
  Meetup: { slug: "meetups", plural: "meetups" },
  Forum: { slug: "forums", plural: "forums" },
  Residency: { slug: "residencies", plural: "residencies" },
  "Hacker House": { slug: "hacker-houses", plural: "hacker houses" },
  "Co-working": { slug: "co-working", plural: "co-working days" },
  "Side event": { slug: "side-events", plural: "side events" },
  Online: { slug: "online", plural: "calls and online events" },
};

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export interface Section {
  slug: string;
  kind: "country" | "category";
  /** Menu and breadcrumb label — the country, or the plural of the kind. */
  label: string;
  title: string;
  description: string;
  h1: string;
  lede: string;
  items: EventItem[];
}

/** Per the rule at the top of this file. */
const ENOUGH_COUNTRY = 2;
const ENOUGH_KIND = 3;

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

const byStart = (a: EventItem, b: EventItem) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0);

export function sections(items: EventItem[]): Section[] {
  const out: Section[] = [];

  for (const [country, list] of group(items, (e) => e.country)) {
    if (list.length < ENOUGH_COUNTRY) continue;
    const named = COUNTRIES[country] ?? {};
    const slug = named.slug ?? slugify(country);
    if (RESERVED.has(slug)) continue;
    // "in the UK", "in Serbia" — the article belongs to the country, so it
    // is carried with the country rather than written into each string.
    const where = `${named.the ? "the " : ""}${named.short ?? country}`;
    out.push({
      slug,
      kind: "country",
      label: named.short ?? country,
      title: `Events in ${where}`,
      description: `Solana and crypto events in ${where}, on dates confirmed with the organiser and with the source on every entry.`,
      h1: `Solana events in ${where}`,
      lede: `Every event on this calendar that happens in ${where} — the date as the organiser published it, and a link to where we read it.`,
      items: [...list].sort(byStart),
    });
  }

  for (const [category, list] of group(items, (e) => e.category)) {
    if (list.length < ENOUGH_KIND) continue;
    const named = CATEGORIES[category];
    if (!named) continue;
    if (RESERVED.has(named.slug)) continue;
    out.push({
      slug: named.slug,
      kind: "category",
      label: named.plural[0].toUpperCase() + named.plural.slice(1),
      title: `Solana ${named.plural}`,
      description: `Solana ${named.plural} from across the ecosystem, on dates confirmed with the organiser and with the source on every entry.`,
      h1: `Solana ${named.plural}`,
      lede: `The ${named.plural} on this calendar — the date as the organiser published it, and a link to where we read it.`,
      items: [...list].sort(byStart),
    });
  }

  // Countries first, then kinds; alphabetical within each so the row of
  // links does not reshuffle itself every time an event is added.
  return out.sort((a, b) =>
    a.kind === b.kind ? a.label.localeCompare(b.label) : a.kind === "country" ? -1 : 1,
  );
}
