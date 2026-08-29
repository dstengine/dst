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
export const groupBySlug = (slug: string) => groups.find((g) => g.slug === slug);
export const runsFor = (show: string) => runs.filter((r) => r.show === show);
export const runsInGroup = (group: string) => runs.filter((r) => r.group === group);
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

/** Runs of the same show elsewhere: tour neighbours first, because that is
    the next chance to see it, then everything else by date. */
export function otherRuns(run: Run, limit = 6): Run[] {
  const rest = runsFor(run.show).filter((r) => r.slug !== run.slug);
  const sameGroup = (r: Run) => Boolean(run.group) && r.group === run.group;
  return rest
    .sort((a, b) => {
      if (sameGroup(a) !== sameGroup(b)) return sameGroup(a) ? -1 : 1;
      return (a.start ?? "").localeCompare(b.start ?? "");
    })
    .slice(0, limit);
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

/** An opening sentence for a run nobody has written one for, composed from
    what is true about it: how long it plays, where it sits in its tour, and
    who is selling. Never a template with holes — every clause is a fact or
    it is left out. */
export function runIntro(run: Run): string {
  if (run.summary) return run.summary;
  const city = cityBySlug(run.city)?.name ?? run.city;
  const venue = run.venue ? venueBySlug(run.venue)?.name : undefined;
  const n = nights(run);
  const group = run.group ? groupBySlug(run.group) : undefined;
  const parts: string[] = [];

  const length = n === 1 ? "One night" : n ? `${n} days` : "Dates announced";
  parts.push(venue ? `${length} at ${venue}, ${city}.` : `${length} in ${city}.`);

  if (group) {
    const ordered = runsInGroup(group.slug).sort((a, b) => (a.start ?? "").localeCompare(b.start ?? ""));
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
  if (status === "announced") parts.push("No seller has been listed against these dates yet.");
  else if (status === "on-sale" && run.sellers.length === 1) parts.push(`${run.sellers[0]!.name} is selling it.`);
  else if (status === "on-sale") parts.push(`${run.sellers.length} sellers list it.`);

  return parts.join(" ");
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

/** Where a venue lives. A venue important enough to carry rootSlug is served
    from the root and from nowhere else — one canonical address each. */
export const venuePath = (venue: Venue): string =>
  venue.rootSlug ? `/${venue.rootSlug}/` : `/venue/${venue.slug}/`;
