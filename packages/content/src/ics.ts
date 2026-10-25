import type { EventItem } from "./types.ts";
import { endDay, eachDay, runDays } from "./when.ts";

// iCalendar file for a single event, so "add to calendar" works without
// the visitor holding an account anywhere. Ticketing platforms treat this
// as table stakes; a static site can serve it as a plain file.

/** RFC 5545 §3.3.11: backslash, semicolon and comma are escaped, newlines become \n. */
function escapeText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/** RFC 5545 §3.1: lines are folded at 75 octets, continuations start with a space. */
function fold(line: string): string {
  const bytes = Buffer.from(line, "utf8");
  if (bytes.length <= 75) return line;
  const out: string[] = [];
  let start = 0;
  while (start < bytes.length) {
    // Step back to a character boundary so a multi-byte character is never
    // split across a fold.
    let end = Math.min(start + (start === 0 ? 75 : 74), bytes.length);
    while (end > start && end < bytes.length && (bytes[end] & 0xc0) === 0x80) end--;
    out.push((start === 0 ? "" : " ") + bytes.subarray(start, end).toString("utf8"));
    start = end;
  }
  return out.join("\r\n");
}

/** Sites whose host isn't `<site>.dst.llc`. */
// dst is deliberately absent: its UIDs have gone out as dst.dst.llc, and a
// changed UID reads as a second event in a calendar that already has the
// first one.
const UID_HOSTS: Record<string, string> = {
  fwf: "fwf.lol",
  musical: "musical.today",
  // The five city experiments, each on its own domain rather than under
  // dst.llc — and deliberately not linked to it. A UID naming the group
  // would say in a calendar file what the sites do not say on the page.
  nyc42: "nyc42.lol",
  sol2go: "sol2go.lol",
  vien: "vien.lol",
  ldn: "ldn.lol",
  lnd: "lnd.lol",
  cmx: "cmx.lol",
  mxo: "mxo.lol",
  // Where tick launched, and still ours. The site moved to tick.am on
  // 6 Oct 2026, but its UIDs had gone out by then, and a changed UID reads
  // as a second event in a calendar that has the first — as with dst above.
  // Both languages share one UID per event, so subscribing to both
  // calendars merges, not doubles.
  tick: "tick.lnd.lol",
};

// Sites whose events sit in a zone that moves its clocks. A daily run is
// written as a UTC start repeated every day, and a UTC recurrence keeps the
// UTC clock: across the last Sunday of October a 10:30 opening in London
// would show at 09:30 for the rest of the run. Such a run stays one block
// from its first morning to its last evening, which is what the file said
// before; repeating it at the local hour needs TZID and a VTIMEZONE, which
// is a later change. Every other site is in a zone without a clock change:
// the Gulf, Armenia, and Mexico except the northern border, which follows
// US summer time and would be mapped here the day a run there is listed.
// sol2go's cities vary; its runs are checked by the data test instead.
export const CLOCK_ZONES: Record<string, string> = {
  ldn: "Europe/London",
  lnd: "Europe/London",
  l0n: "Europe/London",
  vien: "Europe/Vienna",
  nyc42: "America/New_York",
};

/** The zone's UTC offset at one instant, as "+01:00" — the form `utcOffset` takes. */
function zoneOffset(zone: string, at: Date): string {
  const name = new Intl.DateTimeFormat("en-US", { timeZone: zone, timeZoneName: "longOffset" })
    .formatToParts(at)
    .find((part) => part.type === "timeZoneName")?.value;
  // ICU writes GMT itself as a bare "GMT", every other offset as "GMT+01:00".
  return !name || name === "GMT" ? "+00:00" : name.slice(3);
}

/**
 * Whether any occurrence of the run starts or ends at a local time other
 * than the one its `utcOffset` states. Every occurrence, not the first and
 * the last: a run from October to April has the same offset at both ends
 * and a different one all winter. It also catches an entry whose offset is
 * simply wrong for its days.
 */
export function crossesClockChange(item: EventItem, days: string[]): boolean {
  const zone = CLOCK_ZONES[item.site];
  if (!zone || !item.startTime) return false;
  const offset = item.utcOffset ?? "+04:00";
  const { startTime, endTime } = item;
  return days.some((day) => {
    const instants = [new Date(`${day}T${startTime}:00${offset}`)];
    if (endTime) instants.push(new Date(`${endDay({ start: day, startTime, endTime })}T${endTime}:00${offset}`));
    return instants.some((at) => zoneOffset(zone, at) !== offset);
  });
}

const stampUtc = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const dateOnly = (iso: string) => iso.replace(/-/g, "");

/** The day after `iso` — DTEND is exclusive for all-day events (RFC 5545 §3.6.1). */
function dayAfter(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return dateOnly(d.toISOString().slice(0, 10));
}

/**
 * The VEVENT block for one entry, without the calendar wrapper around it.
 * Both outputs below are the same event data — a single download and a
 * subscribable calendar — so the mapping from an EventItem to iCalendar
 * lives here once.
 */
function vevent(item: EventItem, pageUrl: string, now: Date): string[] {
  const offset = item.utcOffset ?? "+04:00";
  const timed = Boolean(item.startTime);

  const lines: string[] = [
    "BEGIN:VEVENT",
    // The UID's domain part has to be a host we actually own, and not every
    // site is a *.dst.llc vertical — fwf.lol is its own domain.
    `UID:${item.slug}@${UID_HOSTS[item.site] ?? `${item.site}.dst.llc`}`,
    `DTSTAMP:${stampUtc(now)}`,
  ];

  if (timed) {
    const startTime = item.startTime as string;
    const at = (day: string, time: string) => stampUtc(new Date(`${day}T${time}:00${offset}`));
    const days = runDays(item);
    if (days && !crossesClockChange(item, days)) {
      // A run: the first occurrence, repeated daily until the last one
      // starts, minus the days it does not run. UNTIL is a UTC stamp because
      // DTSTART is one (RFC 5545 §3.3.10), and each EXDATE sits on the same
      // UTC clock as DTSTART, or a client matches none of them (§3.8.5.1).
      const [first, last] = [days[0], days[days.length - 1]];
      lines.push(`DTSTART:${at(first, startTime)}`);
      if (item.endTime) {
        lines.push(`DTEND:${at(endDay({ start: first, startTime, endTime: item.endTime }), item.endTime)}`);
      }
      lines.push(`RRULE:FREQ=DAILY;UNTIL=${at(last, startTime)}`);
      const runs = new Set(days);
      const skipped = eachDay(first, last).filter((day) => !runs.has(day));
      if (skipped.length > 0) lines.push(`EXDATE:${skipped.map((day) => at(day, startTime)).join(",")}`);
    } else {
      lines.push(`DTSTART:${at(item.start, startTime)}`);
      // A single day with a start and nothing published about its end has
      // no DTEND at all. DTEND equal to DTSTART breaks RFC 5545 §3.8.2.2,
      // which wants it later; without one, §3.6.1 reads the event as
      // ending when it starts, which is all the entry knows.
      if (item.endTime || (item.end && item.end !== item.start)) {
        lines.push(`DTEND:${at(endDay(item), item.endTime ?? startTime)}`);
      }
    }
  } else {
    // No clock time published, so this is an all-day entry rather than an
    // invented 00:00 start.
    lines.push(`DTSTART;VALUE=DATE:${dateOnly(item.start)}`);
    lines.push(`DTEND;VALUE=DATE:${dayAfter(item.end ?? item.start)}`);
  }

  lines.push(`SUMMARY:${escapeText(item.title)}`);
  lines.push(`DESCRIPTION:${escapeText(item.summary)}`);
  const location = [item.venue, item.city].filter(Boolean).join(", ");
  if (location) lines.push(`LOCATION:${escapeText(location)}`);
  if (item.geo) lines.push(`GEO:${item.geo.lat};${item.geo.lng}`);
  lines.push(`URL:${pageUrl}`);
  lines.push("END:VEVENT");
  return lines;
}

/** CRLF throughout — Outlook rejects bare LF. */
const serialise = (lines: string[]) => lines.map(fold).join("\r\n") + "\r\n";

export function toIcs(item: EventItem, pageUrl: string, now: Date = new Date()): string {
  return serialise([
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//DST//events//EN",
    "CALSCALE:GREGORIAN",
    // A single file is handed to a calendar app to import, which is what
    // METHOD:PUBLISH describes. The subscribable calendar below carries no
    // METHOD: that property belongs to iTIP transport, not to a feed a
    // client re-fetches on its own schedule.
    "METHOD:PUBLISH",
    ...vevent(item, pageUrl, now),
    "END:VCALENDAR",
  ]);
}

/** What a whole-site calendar needs beyond the events themselves. */
export interface CalendarMeta {
  /** Shown as the calendar's name once someone has subscribed. */
  name: string;
  /** One line on what is in it, in the site's own language. */
  description: string;
  /** The site's events page — where a reader goes to see the same thing. */
  url: string;
  /** This file's own address, so a client knows where to re-fetch it. */
  source: string;
}

/**
 * Every published event on one site as a single subscribable calendar.
 *
 * Two audiences, both of which already exist. A reader subscribes once and
 * the site keeps their calendar current without an account anywhere — a far
 * stickier subscription than a feed, because nobody unsubscribes from a
 * calendar and it speaks up the day before. And community listings software
 * (Mobilizon, Gancio) imports events from exactly this: an ICS feed it
 * re-reads on a schedule. There we are a source rather than a promoter,
 * which is the only footing worth having with a local calendar.
 *
 * Everything with a page goes in, past included. The archives here run to a
 * few dozen entries at most, and a past event on these sites carries its
 * `outcome` rather than being left as a dead date — so a cut-off would be a
 * policy invented ahead of any need for one.
 */
export function toIcsCalendar(
  items: EventItem[],
  pageUrlFor: (item: EventItem) => string,
  meta: CalendarMeta,
  now: Date = new Date(),
): string {
  const ordered = [...items].sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0));
  return serialise([
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//DST//events//EN",
    "CALSCALE:GREGORIAN",
    // RFC 7986 names these; the X-WR-* twins are what Google and Apple have
    // read since long before that RFC, and both still win in some clients.
    `NAME:${escapeText(meta.name)}`,
    `X-WR-CALNAME:${escapeText(meta.name)}`,
    `DESCRIPTION:${escapeText(meta.description)}`,
    `X-WR-CALDESC:${escapeText(meta.description)}`,
    `URL:${meta.url}`,
    `SOURCE;VALUE=URI:${meta.source}`,
    // How often a subscriber should come back. Twice a day is honest for a
    // listings site that publishes a few times a week: often enough that a
    // new date lands before it matters, rare enough to cost nobody anything.
    "REFRESH-INTERVAL;VALUE=DURATION:PT12H",
    "X-PUBLISHED-TTL:PT12H",
    ...ordered.flatMap((item) => vevent(item, pageUrlFor(item), now)),
    "END:VCALENDAR",
  ]);
}
