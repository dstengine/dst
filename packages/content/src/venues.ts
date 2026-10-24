// Cutting one feed by where it happens.
//
// A city site's events gather in a dozen rooms. Twenty-five of tick's are
// at the Aram Khachaturian Concert Hall and twenty-two at the Opera, and
// the question a reader asks about such a room — "what is on at the Opera
// this month" — is one the long list cannot answer and one that is typed
// into a search box with the hall's name in it. A venue page answers it:
// the room, where it is, how to get there, and every date we hold for it.
//
// Three rules, in the spirit of ./sections.ts:
//
// 1. **A venue is declared, never inferred.** `venue` on an entry is prose
//    — "Spendiaryan Opera and Ballet Theatre, Small Hall, 54 Tumanyan
//    Street" — and a page built by slugifying prose is a page with a wrong
//    address the first time an address is written differently. So a site
//    tabulates its venues: the slug, the name, the address, the point on
//    the map, and the beginnings of the `venue` strings that mean it. An
//    entry whose `venue` begins with one of them belongs to it; one that
//    matches nothing is a line of text on a card, as before.
// 2. **Two entries make a page.** A room is where a reader already is,
//    and "what is on at Tonelab" is asked whether the answer is two dates
//    or twenty — the same threshold as a place section (`ENOUGH_PLACE`).
// 3. **The words are the site's.** Names, addresses and kinds are written
//    per language by the site; this file holds only the grouping.
import type { EventItem } from "./types.ts";
import { hasEnded, isOn } from "./when.ts";

export interface VenueSpec {
  /** The address segment: /venues/<slug>/. One per place, in every language. */
  slug: string;
  /** Beginnings of the `venue` field that mean this place, in every
      language the site writes, compared case-insensitively. A hall inside
      a building matches the building's prefix, which is the point: the
      Opera's small hall is still the Opera. */
  match: readonly string[];
  /** The place's name, in the page's language. */
  name: string;
  /** Street address, in the page's language. Optional: a park has none. */
  address?: string;
  /** What kind of room it is, in the site's words: "Concert hall". */
  kind?: string;
  geo?: { lat: number; lng: number };
  /** The venue's own site, printed as a line and linked through the hop. */
  url?: string;
  /** The schema.org type the page claims. Defaults to Place, which is
      always true; a site that knows better says so — PerformingArtsTheater,
      MusicVenue, Park, Museum, StadiumOrArena. */
  schemaType?: string;
}

export interface Venue extends VenueSpec {
  /** Every entry held for the place, soonest first. */
  items: EventItem[];
  /** Still to come or on now, soonest first. */
  upcoming: EventItem[];
  /** Over, most recent first. */
  past: EventItem[];
  /** The next date, if any: the first of `upcoming`. */
  next?: EventItem;
}

/** Per rule 2. */
export const ENOUGH_VENUE = 2;

const starts = (venue: string | undefined, prefix: string) =>
  venue !== undefined && venue.toLowerCase().startsWith(prefix.toLowerCase());

/** The declared venue an entry's `venue` names, or nothing. */
export function venueOf<V extends VenueSpec>(item: Pick<EventItem, "venue">, venues: readonly V[]): V | undefined {
  return venues.find((v) => v.match.some((m) => starts(item.venue, m)));
}

const byStart = (a: EventItem, b: EventItem) => (a.start < b.start ? -1 : a.start > b.start ? 1 : a.slug.localeCompare(b.slug));

export interface VenuesInput<V extends VenueSpec> {
  items: EventItem[];
  venues: readonly V[];
  /** ISO "YYYY-MM-DD"; passed in for the reason ./when.ts gives. */
  today: string;
  min?: number;
}

/** The venues that have earned a page, those with a date still to come
    first (most dates first), then the rest by how much we hold for them. */
export function buildVenues<V extends VenueSpec>({ items, venues, today, min = ENOUGH_VENUE }: VenuesInput<V>): (Venue & V)[] {
  const out: (Venue & V)[] = [];
  for (const spec of venues) {
    const mine = items.filter((i) => spec.match.some((m) => starts(i.venue, m)));
    if (mine.length < min) continue;
    const upcoming = mine.filter((i) => isOn(i, today)).sort(byStart);
    const past = mine.filter((i) => hasEnded(i, today)).sort((a, b) => -byStart(a, b));
    out.push({ ...spec, items: [...mine].sort(byStart), upcoming, past, next: upcoming[0] });
  }
  return out.sort((a, b) =>
    b.upcoming.length - a.upcoming.length || b.items.length - a.items.length || a.name.localeCompare(b.name),
  );
}

/** The venue page for an entry, under `base` ("/venues/"), or nothing when
    its room has no page — the same contract as `sectionHrefFor`. */
export function venueHrefFor(item: Pick<EventItem, "venue">, built: readonly Venue[], base: string): string | undefined {
  const found = venueOf(item, built);
  return found ? `${base}${found.slug}/` : undefined;
}
