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

const stampUtc = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const dateOnly = (iso: string) => iso.replace(/-/g, "");

/** The day after `iso` — DTEND is exclusive for all-day events (RFC 5545 §3.6.1). */
function dayAfter(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return dateOnly(d.toISOString().slice(0, 10));
}

export function toIcs(item: EventItem, pageUrl: string, now: Date = new Date()): string {
  const offset = item.utcOffset ?? "+04:00";
  const timed = Boolean(item.startTime);

  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//DST//events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${item.slug}@${item.site}.dst.llc`,
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
  lines.push("END:VEVENT", "END:VCALENDAR");

  // CRLF throughout — Outlook rejects bare LF.
  return lines.map(fold).join("\r\n") + "\r\n";
}
