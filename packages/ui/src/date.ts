import { endDay, hasEnded, lastDay } from "@dst/content/when";

// Shared "Jan 3, 2026" formatter for news/events dates — parsed with an
// explicit UTC time-of-day so a plain "YYYY-MM-DD" string never lands on
// the wrong side of midnight depending on the visitor's local timezone.
//
// The locale defaults to the network's English. A site writing in another
// language passes its own, or its dates come out in a language its readers
// did not ask for — which is how "Sep 5, 2026" ended up on a Spanish page.
export function formatDate(iso: string, locale = "en-US"): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** An event card's date: day and month, and the year only for a date more
    than eleven months off, either way. Nearer than that the year is the
    one the reader is in, and on a card four to a row it was the part that
    pushed the hours onto a line of their own: "10 հոկ, 2026 թ. 12:00–23:00"
    is 27 characters in a line that holds 26. The `datetime` keeps it. */
export function formatCardDate(iso: string, locale = "en-US", todayIso = new Date().toISOString().slice(0, 10)): string {
  const days = Math.abs(Date.parse(`${iso}T00:00:00Z`) - Date.parse(`${todayIso}T00:00:00Z`)) / 86400000;
  if (days > 330) return formatDate(iso, locale);
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(locale, { month: "short", day: "numeric", timeZone: "UTC" });
}

/** The hours an event's card shows: its start, and its end when the event
    is one day long. Undefined unless the event set `displayHours`. */
export function cardHours(e: {
  displayHours?: boolean;
  startTime?: string;
  endTime?: string;
  start: string;
  end?: string;
}): string | undefined {
  if (!e.displayHours || !e.startTime) return undefined;
  const oneDay = !e.end || e.end === e.start;
  return oneDay && e.endTime ? `${e.startTime}–${e.endTime}` : e.startTime;
}

/** What a card with `displayHours` counts down to: the start and the end as
    full stamps, clock time and offset included, so the card can say "in 3
    hours" and then "under way" — the same live count as the event's own
    page. Undefined for every other event, whose card counts days: a bare
    date has no hour to count to. */
export function cardCountdown(e: {
  displayHours?: boolean;
  startTime?: string;
  endTime?: string;
  start: string;
  end?: string;
  utcOffset?: string;
}): { start: string; end: string } | undefined {
  if (!e.displayHours || !e.startTime) return undefined;
  const offset = e.utcOffset ?? "+04:00";
  const stamp = (day: string, time?: string) => (time ? `${day}T${time}:00${offset}` : day);
  return { start: stamp(e.start, e.startTime), end: stamp(endDay(e), e.endTime) };
}

/** The day a running event's card is dated by: its last day, when it
    opened before `todayIso` and has not closed. Undefined for an event
    still to come, one that starts today (its card counts the hours), and
    one that is over. FeedCards then prints "until <day>" on the plate and
    in the meta line. `todayIso` is passed in, never read here: the caller
    has taken the date once for the whole page (see @dst/content/when). */
export function cardUntil(e: { start: string; end?: string }, todayIso: string): string | undefined {
  return e.start < todayIso && !hasEnded(e, todayIso) ? lastDay(e) : undefined;
}

/** What a card's chip needs to say "under way" and "ended" from the reader's
    clock, whatever group the build put the card in.
    - `end`: the last day, read as `hasEnded` and the index read it
      (`lastDay`); for a night that runs past midnight, the end stamp, so
      Crypto After Dark (19:00–02:00) is still on at 00:30 instead of
      "ended" at midnight. The stamp takes `cardCountdown`'s offset rule.
    - `utcOffset`: the entry's own, or nothing. The chip then reads the
      reader's day, not Dubai's. That departs on purpose from types.ts, where
      an entry with no offset is a Gulf event: 22 nyc42 entries are American
      events that carry none.
    - `gaps`: the entry lists its days (`dates`), so the days between them
      are not "under way" (Merton's fireworks, 5 and 7 Nov, not the 6th). */
export function cardClock(e: {
  start: string;
  end?: string;
  startTime?: string;
  endTime?: string;
  utcOffset?: string;
  dates?: string[];
}): { end: string; utcOffset?: string; gaps?: boolean } {
  const overnight = Boolean(e.startTime && e.endTime && e.endTime < e.startTime);
  return {
    end: overnight ? `${endDay(e)}T${e.endTime}:00${e.utcOffset ?? "+04:00"}` : lastDay(e),
    utcOffset: e.utcOffset,
    gaps: e.dates ? true : undefined,
  };
}
