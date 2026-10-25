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
