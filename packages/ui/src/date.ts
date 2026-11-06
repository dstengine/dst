import { endDay, isRunning, lastDay, timeOn } from "@dst/content/when";

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

/** The hours an entry's nights start at, distinct and in clock order. One
    hour, `startTime`, for every entry but a listed run whose nights differ
    (`times`): a theatre's 18:00 at the weekend and 19:00 on weekdays is
    ["18:00", "19:00"], and printing either alone is wrong for half the
    run. Empty without a `startTime`. Where a page prints one line of hours
    it joins these with " / ". */
export function nightHours(e: { startTime?: string; times?: Record<string, string>; dates?: string[] }): string[] {
  if (!e.startTime) return [];
  if (!e.times || !e.dates) return [e.startTime];
  return [...new Set(e.dates.map((day) => timeOn(e, day) as string))].sort();
}

/** The hours an event's card shows: its start, and its end when the event
    is one day long. Undefined unless the event set `displayHours`. A card
    dated by one night of a listed run (`day`, see `cardDay`) shows that
    night's, which is one day long; a run with `times` read without a night
    shows each of its hours. */
export function cardHours(
  e: {
    displayHours?: boolean;
    startTime?: string;
    endTime?: string;
    times?: Record<string, string>;
    dates?: string[];
    start: string;
    end?: string;
  },
  day?: string,
): string | undefined {
  if (!e.displayHours || !e.startTime) return undefined;
  if (day && e.dates) {
    const hour = timeOn(e, day) as string;
    return e.endTime ? `${hour}–${e.endTime}` : hour;
  }
  if (e.times) return nightHours(e).join(" / ");
  const oneDay = !e.end || e.end === e.start;
  return oneDay && e.endTime ? `${e.startTime}–${e.endTime}` : e.startTime;
}

/** What a card with `displayHours` counts down to: the start and the end as
    full stamps, clock time and offset included, so the card can say "in 3
    hours" and then "under way" — the same live count as the event's own
    page. Undefined for every other event, whose card counts days: a bare
    date has no hour to count to. `day` is the night the card is dated by
    (`cardDay`), the first unless the caller says otherwise. */
export function cardCountdown(
  e: {
    displayHours?: boolean;
    startTime?: string;
    endTime?: string;
    times?: Record<string, string>;
    start: string;
    end?: string;
    utcOffset?: string;
  },
  day: string = e.start,
): { start: string; end: string } | undefined {
  if (!e.displayHours || !e.startTime) return undefined;
  const offset = e.utcOffset ?? "+04:00";
  const stamp = (d: string, time?: string) => (time ? `${d}T${time}:00${offset}` : d);
  // That night at its own hour (`times`), else `startTime`.
  return { start: stamp(day, timeOn(e, day)), end: stamp(endDay(e), e.endTime) };
}

/** The day a running event's card is dated by: its last day, when it
    opened before `todayIso` and has not closed (`isRunning`). Undefined for
    an event still to come, one that starts today (its card counts the
    hours), one that is over, and a run that lists its nights, whose card
    is dated by the next of them instead (`cardDay`). FeedCards then prints
    "until <day>" on the plate and in the meta line. `todayIso` is passed
    in, never read here: the caller has taken the date once for the whole
    page (see @dst/content/when). */
export function cardUntil(e: { start: string; end?: string; dates?: string[] }, todayIso: string): string | undefined {
  return isRunning(e, todayIso) ? lastDay(e) : undefined;
}

/** What a card's chip needs to say "under way" and "ended" from the reader's
    clock, whatever group the build put the card in.
    - `end`: the last day, read as `hasEnded` and the index read it
      (`lastDay`); with a closing hour, the end stamp, so Crypto After Dark
      (19:00–02:00) is still on at 00:30 instead of "ended" at midnight, and
      a party that closes at 23:00 is over at 23:00. The stamp takes
      `cardCountdown`'s offset rule.
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
  // A known closing hour is the end, before midnight as well as after it:
  // a party that closes at 23:00 is over at 23:00, not at the day's end, so
  // the card says "ended" and the bars still open are the ones that glow
  // (Halloween night on tick, 31 Oct 2026). Without a closing hour the
  // last day stands, read as `hasEnded` and the index read it.
  return {
    end: e.endTime ? `${endDay(e)}T${e.endTime}:00${e.utcOffset ?? "+04:00"}` : lastDay(e),
    utcOffset: e.utcOffset,
    gaps: e.dates ? true : undefined,
  };
}
