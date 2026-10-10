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
  return { start: stamp(e.start, e.startTime), end: stamp(e.end ?? e.start, e.endTime) };
}
