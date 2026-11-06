// When an event is over, as one question with one answer.
//
// It is not the day it started. A run of dates is one event with a first
// day and a last one, and an entry that began yesterday and ends in three
// weeks is on — which the network spent a while telling readers otherwise:
// the feed split its two groups on `start`, so the whole of NYC Broadway
// Week sat under "Past" for the nine days it was actually running, next to
// a month-long Thames festival and a coffee festival that had two days
// left. Twelve entries on the day this was written.
//
// `end` is optional, and absent means a single day — so the last day is
// `end ?? start` and the comparison is against the last day, never the
// first. Both are plain ISO "YYYY-MM-DD", which compares correctly as a
// string; there is no Date involved and no timezone to get wrong.
//
// `today` is passed in rather than read here, because a component that
// renders a feed has already taken the date once and two calls either side
// of midnight would disagree with each other on the same page.
import type { EventItem } from "./types.ts";

type Dated = Pick<EventItem, "start" | "end">;

/** The last day an event is on. */
export const lastDay = (event: Dated): string => event.end ?? event.start;

// A night that runs past midnight — 20:00 to 01:00 — is one evening, and
// an entry writes it the way the poster does: one date, and an end time
// earlier than the start. Read literally that ends nineteen hours before it
// begins, which a calendar refuses (RFC 5545 §3.8.2.2: DTEND after DTSTART)
// and Search Console reports as an invalid endDate. The end time belongs to
// the next morning. An entry with its own `end` already says which day.
type Timed = Pick<EventItem, "start" | "end" | "startTime" | "endTime">;

/** `iso` moved by `n` calendar days, as ISO "YYYY-MM-DD". */
export function addDays(iso: string, n: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** Every calendar day from `first` to `last`, both included. */
export function eachDay(first: string, last: string): string[] {
  const days: string[] = [];
  for (let day = first; day <= last; day = addDays(day, 1)) days.push(day);
  return days;
}

/** The calendar day the clock's `endTime` falls on. */
export function endDay(event: Timed): string {
  if (event.end) return event.end;
  if (event.startTime && event.endTime && event.endTime < event.startTime) return addDays(event.start, 1);
  return event.start;
}

// The days a timed run actually happens on, which is not always every day
// between `start` and `end`. A run with a daily window — a market from 9am
// to 9pm, three evenings of rooftop films from 5.30 to 10 — repeats that
// window each day, and a calendar file written as one block from the first
// morning to the last night tells a phone it is one event fifty-two hours
// long. A run that skips days lists them: `dates` for the nights it runs,
// `closedDates` for the days a daily run is shut, whichever list is
// shorter. A span with a start time and no end time is something else — a
// run of performances, a park open from 4pm until a closing nobody has
// named — and stays one block until its entry lists its dates.
type Run = Timed & Pick<EventItem, "dates" | "closedDates">;

/**
 * The start day of every occurrence of a timed run, in order, or undefined
 * when the entry is a single occurrence. The calendar file repeats the
 * window on these days, and the glance table says its length is a day's.
 */
export function runDays(event: Run): string[] | undefined {
  if (!event.startTime) return undefined;
  if (event.dates) return event.dates;
  if (!event.end || event.end === event.start) return undefined;
  if (!event.endTime && !event.closedDates) return undefined;
  // An overnight window's `end` is its last morning, so its last night
  // starts the day before. When that is `start`, the entry is one night
  // written with its next-day end — New Year's Eve, a dome takeover — and
  // not a run at all.
  const last = event.endTime && event.endTime < event.startTime ? addDays(event.end, -1) : event.end;
  if (last === event.start) return undefined;
  const closed = new Set(event.closedDates ?? []);
  return eachDay(event.start, last).filter((day) => !closed.has(day));
}

/** Over, as of `today` (ISO "YYYY-MM-DD"). */
export const hasEnded = (event: Dated, today: string): boolean => lastDay(event) < today;

/** Still to come or on right now. The complement of `hasEnded`. */
export const isOn = (event: Dated, today: string): boolean => !hasEnded(event, today);

/** The clock time a timed entry starts on `day`: the night's own hour
    from `times`, else `startTime`. See `times` in types.ts. */
export const timeOn = (event: Pick<EventItem, "startTime" | "times">, day: string): string | undefined =>
  event.times?.[day] ?? event.startTime;

/** The day an event is next on, as of `today`, or undefined once it is
    over. A run that lists its nights is next on the first of them still to
    come — not today, which may be a gap between two — and any other entry
    on today while it runs, or on its first day before it opens. */
export function nextDay(event: Dated & Pick<EventItem, "dates">, today: string): string | undefined {
  if (hasEnded(event, today)) return undefined;
  if (event.dates) return event.dates.find((d) => d >= today);
  return event.start > today ? event.start : today;
}

// Which group a card goes in, and the day it is dated by. A span plays
// every day from its first to its last, so once it has opened it is on:
// its card goes under "On now", dated by the day it closes. A run that
// lists its nights plays only on them, and reading it as a span said what
// was not so: on 6 November Yerevan Opera's Pagliacci, which plays 8
// October, 17 November and 17 February, sat among the things on now as
// "8 Oct · until 17 Feb", as if it played every night of four months, and
// the January page gave Carmen "until 6 Feb" instead of its night in
// January. A listed run is never running. It is still to come while it has
// a night left, and its card is dated by that night, at that night's hour.
type Listed = Dated & Pick<EventItem, "dates">;

/** The day an entry's card is dated by, as of `asOf`: a listed run's next
    night (`nextDay`), or its first once none is left; any other entry's
    first day. */
export const cardDay = (event: Listed, asOf: string): string =>
  (event.dates && nextDay(event, asOf)) || event.start;

/** A run's last listed night on or before `until`; undefined for an
    entry without listed nights, or with none by then. A list about the
    days up to `until` — a month's page — dates the run's past card by
    it, whether the run is over or only done there (`lastNightBy`). */
export const lastNightIn = (event: Listed, until: string): string | undefined =>
  event.dates?.filter((d) => d <= until).sort().at(-1);

/** A run that lists its nights and has none left by `until`, as of
    `asOf`: on, but done as far as a list about the days up to `until`
    goes. Its last night by then (`lastNightIn`); undefined for anything
    else. On the October page, read on 6 November, Tamar (17 and
    18 October, 21 November) is October's 18th, not a card dated
    21 November. */
export const lastNightBy = (event: Listed, asOf: string, until: string): string | undefined =>
  event.dates && isOn(event, asOf) && cardDay(event, asOf) > until ? lastNightIn(event, until) : undefined;

/** Opened before `asOf` and not over: a span under way, filed under "On
    now" and dated by its last day. Never a run that lists its nights. */
export const isRunning = (event: Listed, asOf: string): boolean =>
  !event.dates && event.start < asOf && isOn(event, asOf);

// The month a list is being read in, and what certainly happens in it.
//
// A section page that names its month — "the November programme" — has to
// name only what is on in that month, and a span alone does not say which
// days it plays: Swan Lake from 9 October to 20 February may or may not
// have a night in December. The certain days are the ones an entry states:
// every day it lists in `dates`, its first day and its last. An entry is in
// a month when one of those still to come falls in it, and is placed by
// the earliest. The month is the one the soonest certain day falls in. It
// is not today's month just because some run spans today: on 30 November a
// span with no night left that month named November in the title of a page
// that had nothing on in it, and so did the last week of December.

type Certain = Dated & Pick<EventItem, "dates" | "slug">;

/** The certain days of an entry still to come, as of `today`, in order. */
const certainDays = (event: Certain, today: string): string[] =>
  [...new Set([...(event.dates ?? []), event.start, lastDay(event)])].filter((d) => d >= today).sort();

/** The month ("YYYY-MM") of the soonest certain day still to come, with the
    entries certainly on in it, in date order; undefined when none is left. */
export function monthOn<T extends Certain>(events: T[], today: string): { month: string; certain: T[] } | undefined {
  const ahead = events.map((e) => ({ e, days: certainDays(e, today) })).filter((x) => x.days.length > 0);
  if (ahead.length === 0) return undefined;
  const month = ahead.map((x) => x.days[0]).sort()[0].slice(0, 7);
  const certain = ahead
    .map((x) => ({ e: x.e, day: x.days.find((d) => d.slice(0, 7) === month) }))
    .filter((x): x is { e: T; day: string } => x.day !== undefined)
    .sort((a, b) => (a.day < b.day ? -1 : a.day > b.day ? 1 : a.e.slug.localeCompare(b.e.slug)))
    .map((x) => x.e);
  return { month, certain };
}

/** A news item still inside its promotion, as of `today`. See `promotedUntil`. */
export const isPromoted = (item: { promotedUntil?: string }, today: string): boolean =>
  item.promotedUntil !== undefined && today <= item.promotedUntil;

/** A news item still worth offering as news, as of `today`. See `until`. */
export const isCurrent = (item: { until?: string }, today: string): boolean =>
  item.until === undefined || today <= item.until;

/**
 * The first `limit` of `ranked`, except that every promoted item is in it.
 * A promoted item already above the line stays where it was; one below it
 * takes the place of the lowest-ranked item that is not promoted. The order
 * is `ranked`'s throughout, so a block that had no promotion to make comes
 * out exactly as it went in.
 */
export function withPromoted<T extends { promotedUntil?: string }>(ranked: T[], limit: number, today: string): T[] {
  const promoted = ranked.filter((i) => isPromoted(i, today)).slice(0, limit);
  const rest = ranked.filter((i) => !promoted.includes(i)).slice(0, limit - promoted.length);
  const keep = new Set([...promoted, ...rest]);
  return ranked.filter((i) => keep.has(i));
}

/** A sorted list with every item that names an `after` moved to sit right
    behind the item it names, when that item is in the list; the rest keep
    their order. Applied only where the editors' picks are lifted to the
    front — see `after` in types.ts. */
export function placedAfter<T extends { slug: string; after?: string }>(items: T[], self?: string): T[] {
  // On the named card's own page (`self`), the card that follows it leads
  // the tail: UFO's page offers Mut first.
  const lead = items.filter((i) => i.after !== undefined && i.after === self);
  const rest = items.filter((i) => !lead.includes(i));
  const out = lead.concat(rest.filter((i) => !i.after || !rest.some((o) => o.slug === i.after)));
  items = rest;
  // Two cards behind the same one keep their order: each goes after the
  // last one already placed there.
  const tail = new Map<string, T>();
  for (const i of items) {
    if (!i.after || out.includes(i)) continue;
    const anchor = tail.get(i.after) ?? out.find((o) => o.slug === i.after)!;
    out.splice(out.indexOf(anchor) + 1, 0, i);
    tail.set(i.after, i);
  }
  return out;
}
