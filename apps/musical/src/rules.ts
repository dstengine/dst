// Every decision this site makes about its own data, in one place: what a
// run's status is, what its ticket buttons say, whether a city earns a page,
// what a run page opens with when nobody has written it an opening.
//
// Components do not repeat any of this. A template that decides for itself
// whether to show a ticket button is a template that will disagree with the
// next one.
import type { City, Run, Seller, Venue } from "./data/types";
import { cities } from "./data/cities";
import { runs } from "./data/runs";
import { venues } from "./data/venues";
import { groups } from "./data/groups";
import { go } from "./outbound";

export type RunStatus = "open-run" | "on-sale" | "announced" | "ended";

/** Build date, as a plain ISO day. Static site: "now" is when it was built,
    and the lastmod pipeline already tells search engines when that was. */
export const today = (): string => new Date().toISOString().slice(0, 10);

export const runBySlug = (show: string, slug: string) =>
  runs.find((r) => r.show === show && r.slug === slug);
export const venueBySlug = (slug: string) => venues.find((v) => v.slug === slug);
export const cityBySlug = (slug: string) => cities.find((c) => c.slug === slug);
export const groupBySlug = (show: string, slug: string) =>
  groups.find((g) => g.show === show && g.slug === slug);
export const runsFor = (show: string) => runs.filter((r) => r.show === show);
export const runsInGroup = (show: string, group: string) =>
  runs.filter((r) => r.show === show && r.group === group);
export const runsInCity = (city: string) => runs.filter((r) => r.city === city);
export const runsAtVenue = (venue: string) => runs.filter((r) => r.venue === venue);
export const venuesInCity = (city: string) => venues.filter((v) => v.city === city);

export function statusOf(run: Run): RunStatus {
  if (run.openRun) return "open-run";
  if (run.end && run.end < today()) return "ended";
  return run.sellers.length > 0 ? "on-sale" : "announced";
}

/** Wording for the status badge. "Announced" alone reads like a non-answer;
    say what the reader can do about it. */
export const statusLabel = (run: Run): string =>
  ({ "open-run": "Open run", "on-sale": "On sale", announced: "On sale soon", ended: "Ended" })[statusOf(run)];

/** The rule the whole site turns on: one seller and the button is just
    "Tickets", because there is nothing to choose between. More than one and
    the reader is choosing, so the button has to say who it is sending them
    to. */
export function ticketButtons(run: Run): { href: string; label: string; seller: Seller }[] {
  const sellers = [...run.sellers].sort((a, b) => Number(!!b.official) - Number(!!a.official));
  if (sellers.length === 1) return [{ href: go(sellers[0]!.slug), label: "Tickets", seller: sellers[0]! }];
  return sellers.map((seller) => ({ href: go(seller.slug), label: `Tickets on ${seller.name}`, seller }));
}

/** Nights a run plays, counting both ends. Undefined for an open run. */
export function nights(run: Run): number | undefined {
  if (!run.start || !run.end) return undefined;
  const ms = Date.parse(`${run.end}T00:00:00Z`) - Date.parse(`${run.start}T00:00:00Z`);
  return Math.round(ms / 86_400_000) + 1;
}

/** A city earns its own page once it has two events to list, or when it is
    marked featured. One event and one city page would be the same facts at a
    second address — which is a duplicate, not a listing. */
export const cityHasPage = (city: City): boolean =>
  Boolean(city.featured) || runsInCity(city.slug).length >= 2;

export const citiesWithPages = (): City[] => cities.filter(cityHasPage);

/** Runs of the same show elsewhere: the stops on either side of this one,
    because they are the nearest other chance to see it, then the rest of the
    calendar by date.

    Nearest, not first. Sorting the whole tour by date put the same six
    opening stops on all thirty-three pages — a hundred and fifty words of
    identical text per page, under a heading that promised nearby ones. */
export function otherRuns(run: Run, limit = 6): Run[] {
  const byDate = (a: Run, b: Run) => (a.start ?? "").localeCompare(b.start ?? "");
  const rest = runsFor(run.show).filter((r) => r.slug !== run.slug);
  if (!run.group) return rest.sort(byDate).slice(0, limit);

  const ordered = runsInGroup(run.show, run.group).sort(byDate);
  const here = ordered.findIndex((r) => r.slug === run.slug);
  const near = ordered
    .filter((r) => r.slug !== run.slug)
    .sort((a, b) => Math.abs(ordered.indexOf(a) - here) - Math.abs(ordered.indexOf(b) - here))
    .slice(0, limit)
    .sort(byDate);
  // Padding a tour stop with the runs outside its tour looks generous and
  // is not: the same two cards then sit on forty pages. The link to every
  // date is underneath, and it goes to the whole calendar rather than to
  // the two of it that happen to be first.
  const elsewhere = rest.filter((r) => r.group !== run.group).sort(byDate);
  return (near.length >= 2 ? near : [...near, ...elsewhere]).slice(0, limit);
}

/** Other events worth showing next to this one: anything else in the same
    city first, then runs sharing a tag. Empty until the site carries a
    second show, and the block simply does not render then. */
export function relatedRuns(run: Run, limit = 3): Run[] {
  const scored = runs
    .filter((r) => !(r.show === run.show && r.slug === run.slug))
    .filter((r) => r.city === run.city || (run.tags ?? []).some((t) => (r.tags ?? []).includes(t)))
    .filter((r) => r.show !== run.show || r.city === run.city);
  return scored.slice(0, limit);
}

/** Everything still to come, soonest first. Open runs sort in as playing
    now, because they are. */
export const upcomingRuns = (): Run[] =>
  runs
    .filter((r) => statusOf(r) !== "ended")
    .sort((a, b) => (a.openRun ? "" : a.start ?? "9999").localeCompare(b.openRun ? "" : b.start ?? "9999"));

/** Small numbers are words in running text — the hand-written summaries say
    "Twelve days", and a composed one should not answer "5 nights" beside them. */
const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
export const spell = (n: number): string => {
  const word = WORDS[n];
  return word ? word[0]!.toUpperCase() + word.slice(1) : String(n);
};

/** True when the only seller is the theatre's own box office — half the tour
    is booked that way, and repeating the building's name as if it were a
    third party reads like a mistake. */
export const sellsItsOwn = (run: Run): boolean => {
  if (run.sellers.length !== 1 || !run.venue) return false;
  return venueBySlug(run.venue)?.name === run.sellers[0]!.name;
};

/** The clauses an unwritten run can honestly be described with, kept apart
    because different places want different ones: a run page opens with all
    of them, a card wants only the ones its own meta line has not said. */
function introClauses(run: Run): { placing: string; tour?: string; selling?: string } {
  const city = cityBySlug(run.city)?.name ?? run.city;
  const venue = run.venue ? venueBySlug(run.venue)?.name : undefined;
  const n = nights(run);
  const group = run.group ? groupBySlug(run.show, run.group) : undefined;
  const parts: string[] = [];

  const length = n === 1 ? "One night" : n ? `${spell(n)} nights` : "Dates announced";
  // "Theatre Royal Plymouth, Plymouth" — a venue named after its city says the
  // city already, and the sentence should not say it twice.
  const named = venue?.toLowerCase().includes(city.toLowerCase());
  const placing = run.openRun
    ? `An open run: no closing date has been announced.`
    : venue
      ? `${length} at ${venue}${named ? "" : `, ${city}`}.`
      : `${length} in ${city}.`;

  if (group) {
    const ordered = runsInGroup(run.show, group.slug).sort((a, b) => (a.start ?? "").localeCompare(b.start ?? ""));
    const index = ordered.findIndex((r) => r.slug === run.slug);
    if (index === 0) parts.push(`It opens the ${group.name}.`);
    else if (index === ordered.length - 1) parts.push(`It closes the ${group.name}.`);
    else {
      const next = ordered[index + 1];
      const nextCity = next ? cityBySlug(next.city)?.name : undefined;
      parts.push(
        nextCity
          ? `Stop ${index + 1} of ${ordered.length} on the ${group.name}; ${nextCity} is next.`
          : `Stop ${index + 1} of ${ordered.length} on the ${group.name}.`,
      );
    }
  }

  const status = statusOf(run);
  const selling =
    status === "announced"
      ? "No seller has been listed against these dates yet."
      : status === "on-sale" && run.sellers.length === 1
        ? sellsItsOwn(run)
          ? "The theatre is selling the tickets itself."
          : `${run.sellers[0]!.name} is selling it.`
        : status === "on-sale"
          ? `${spell(run.sellers.length)} sellers list it.`
          : undefined;

  return { placing, tour: parts[0], selling };
}

/** An opening sentence for a run nobody has written one for. Never a template
    with holes — every clause is a fact or it is left out. */
export function runIntro(run: Run): string {
  if (run.summary) return run.summary;
  const { placing, tour, selling } = introClauses(run);
  return [placing, tour, selling].filter(Boolean).join(" ");
}

/** The card line for a grid of stops on one tour, where the cards sit six
    across and their sentences are read as a block. The full line would be
    "Stop 5 of 33 on the UK & Ireland Tour 2027; Newcastle is next" six
    times over, on thirty-three pages that differ by two words a card — so
    a stop among its own tour says only who is selling it. */
export function runSellerLine(run: Run): string {
  const { selling, placing } = introClauses(run);
  return selling ?? placing;
}

/** What a card says under the title. The card already prints the dates and
    the theatre on its own meta line, so a composed line that says "Five
    nights at Theatre Royal Plymouth" tells the reader nothing twice: it
    takes the tour position and the seller instead. */
export function runCardLine(run: Run): string {
  if (run.summary) return run.summary.match(/^.*?[.?!](?=\s|$)/)?.[0] ?? run.summary;
  const { placing, tour, selling } = introClauses(run);
  return [tour, selling].filter(Boolean).join(" ") || placing;
}

/** "5–13 February 2027", "27 July – 7 August 2027", "since 14 November 1996". */
export function formatRun(run: Run): string {
  const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { timeZone: "UTC", ...opts });
  if (run.openRun && run.start) return `Playing since ${fmt(run.start, { day: "numeric", month: "long", year: "numeric" })}`;
  if (!run.start) return "Dates not announced";
  if (!run.end) return fmt(run.start, { day: "numeric", month: "long", year: "numeric" });
  const sameMonth = run.start.slice(0, 7) === run.end.slice(0, 7);
  const from = sameMonth ? fmt(run.start, { day: "numeric" }) : fmt(run.start, { day: "numeric", month: "long" });
  return `${from} – ${fmt(run.end, { day: "numeric", month: "long", year: "numeric" })}`;
}

/** The run's dates with their weekdays: "Tuesday 16 to Saturday 20 February
    2027". Arithmetic, not a claim — but it is the first thing anyone works
    out for themselves when deciding whether a run covers a weekend, and it
    is different on every page. */
export function formatRunDays(run: Run): string | undefined {
  if (!run.start || run.openRun) return undefined;
  // Built from parts rather than one format: en-GB puts a comma after the
  // weekday ("Saturday, 20 February"), which reads as a dateline.
  const part = (iso: string, opts: Intl.DateTimeFormatOptions) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { timeZone: "UTC", ...opts });
  const named = (iso: string, opts: Intl.DateTimeFormatOptions) =>
    `${part(iso, { weekday: "long" })} ${part(iso, opts)}`;
  const full = { day: "numeric", month: "long", year: "numeric" } as const;
  if (!run.end || run.end === run.start) return named(run.start, full);
  const sameMonth = run.start.slice(0, 7) === run.end.slice(0, 7);
  const from = named(run.start, sameMonth ? { day: "numeric" } : { day: "numeric", month: "long" });
  return `${from} to ${named(run.end, full)}`;
}

/** Where a venue lives. A venue important enough to carry rootSlug is served
    from the root and from nowhere else — one canonical address each. */
export const venuePath = (venue: Venue): string =>
  venue.rootSlug ? `/${venue.rootSlug}/` : `/venue/${venue.slug}/`;
