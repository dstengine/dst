import type { EventItem } from "./types.ts";

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
};

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
    lines.push(`DTSTART:${stampUtc(new Date(`${item.start}T${item.startTime}:00${offset}`))}`);
    const endDay = item.end ?? item.start;
    const endTime = item.endTime ?? item.startTime;
    lines.push(`DTEND:${stampUtc(new Date(`${endDay}T${endTime}:00${offset}`))}`);
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
