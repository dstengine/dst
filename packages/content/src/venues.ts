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
  /** The town or village, when the place is not simply in the entry's
      city — a winery in Sasunik, a lakeshore village. Structured data
      only; the page prints the entry's own city. */
  locality?: string;
  /** The province or state, for a place outside the city whose name alone
      a search engine may not place: "Aragatsotn Province". */
  region?: string;
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

// Where an event is, as structured data reads it: a place's name, and its
// street apart from it, because Google's event result wants the street in
// `address` and a name with the street folded into it reads as neither.
//
// A declared venue answers first (rule 1): its name and address were
// written by hand, in the page's language, and they know that "Armenian
// State Philharmonia, Babajanyan Concert Hall, 2 Abovyan Street" is one
// hall at one address. Without one, the `venue` line is read the way the
// network writes it — "Name, street" — but only as far as it proves it:
// the street begins at the first comma-separated part that looks like a
// street (a number, or a word for a street in one of the network's
// languages). A line with no such part — "Dubai Opera, Main Auditorium",
// "River Thames, Putney to Mortlake" — is a name, all of it, and no street
// is claimed. A wrong street is worse than none.

// JS \b is ASCII-only and fails on Armenian, so the word edges are
// lookarounds on any letter. Tested on the network's 440 venue lines.
const STREETISH =
  /\d|\bs\/n\b|(?<![\p{L}\d])(?:street|st|road|rd|avenue|ave|lane|ln|boulevard|blvd|drive|dr|square|sq|way|row|close|crescent|terrace|walk|circus|mews|wharf|quay|embankment|calle|av|avenida|paseo|calzada|calz|circuito|carretera|camino|eje|col|colonia|straße|strasse|str|gasse|platz|ring|allee|ufer|kai|փողոց|պողոտա|փող|պող|խճուղի|նրբանցք)(?![\p{L}\d])/iu;

// A number that counts rooms inside the venue — "Halls 4–8", "Hall 9" — is
// not a street number.
const INSIDE = /^(?:halls?|gates?|rooms?|levels?|floors?|stands?|stages?|piers?|sala|salón|saal)\s+\d/iu;

/** True when a part of a venue line reads as a street address. */
export const looksLikeStreet = (part: string): boolean =>
  STREETISH.test(part) && !INSIDE.test(part);

// What follows the street must still read as an address: dates in
// brackets or "and another place" mean the line is prose.
const PROSE = /[()]|(?<![\p{L}\d])and(?![\p{L}\d])/iu;

export interface PlaceFacts {
  /** schema.org type: Place, or the declared venue's own. */
  type: string;
  name: string;
  street?: string;
  locality?: string;
  region?: string;
  geo?: { lat: number; lng: number };
}

/** What the markup says about where an entry happens, or nothing when it
    names neither a venue nor a city. */
export function placeFacts(
  item: Pick<EventItem, "venue" | "city" | "geo">,
  declared?: VenueSpec,
): PlaceFacts | undefined {
  const geo = item.geo ? { lat: item.geo.lat, lng: item.geo.lng } : declared?.geo;
  if (declared) {
    return {
      type: declared.schemaType ?? "Place",
      name: declared.name,
      ...(declared.address ? { street: declared.address } : {}),
      ...(declared.locality ?? item.city ? { locality: declared.locality ?? item.city } : {}),
      ...(declared.region ? { region: declared.region } : {}),
      ...(geo ? { geo } : {}),
    };
  }
  const line = (item.venue ?? item.city ?? "").trim();
  if (!line) return undefined;
  const parts = line.split(",").map((p) => p.trim()).filter(Boolean);
  const found = parts.findIndex((p, i) => i > 0 && looksLikeStreet(p));
  const at = found > 0 && !PROSE.test(parts.slice(found).join(", ")) ? found : -1;
  return {
    type: "Place",
    name: at > 0 ? parts.slice(0, at).join(", ") : line,
    ...(at > 0 ? { street: parts.slice(at).join(", ") } : {}),
    ...(item.city ? { locality: item.city } : {}),
    ...(geo ? { geo } : {}),
  };
}
