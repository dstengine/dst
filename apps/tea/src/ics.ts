// The tea calendar as iCalendar: one file per moment and one with all of
// them, each a recurring entry with an alarm. A calendar is the reminder
// that works on every phone without an account anywhere, which is why the
// schedule's "remind me" is this.
//
// Daily tea times go out as floating times — no zone — so a reader's
// calendar puts afternoon tea at four wherever the reader is, which is
// exactly what the page promises. Tea days are all-day entries.
import { moments, type Moment } from "./schedule";

const HOST = "tea.ceo";
const SITE = `https://${HOST}`;

// The files are built, and a build that writes today's date into them
// changes every file on every deploy. A fixed origin keeps them stable: the
// first occurrence on or after the day the calendar was published.
const ORIGIN = new Date(2026, 9, 11);
const STAMP = "20261011T000000Z";

/** RFC 5545 §3.3.11: backslash, semicolon and comma are escaped, newlines become \n. */
const escapeText = (v: string) =>
  v.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

/** RFC 5545 §3.1: lines fold at 75 octets, continuations start with a space. */
function fold(line: string): string {
  const bytes = Buffer.from(line, "utf8");
  if (bytes.length <= 75) return line;
  const out: string[] = [];
  let start = 0;
  while (start < bytes.length) {
    let end = Math.min(start + (start === 0 ? 75 : 74), bytes.length);
    while (end > start && end < bytes.length && (bytes[end] & 0xc0) === 0x80) end--;
    out.push((start === 0 ? "" : " ") + bytes.subarray(start, end).toString("utf8"));
    start = end;
  }
  return out.join("\r\n");
}

const pad = (n: number) => String(n).padStart(2, "0");
const ymd = (d: Date) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
const nextDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
const DAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

/** The nth weekday of a month; -1 is the last. Same rule as clock.ts. */
function nthWeekday(year: number, month: number, weekday: number, nth: number): Date {
  if (nth > 0) {
    const first = new Date(year, month - 1, 1);
    return new Date(year, month - 1, 1 + ((weekday - first.getDay() + 7) % 7) + (nth - 1) * 7);
  }
  const last = new Date(year, month, 0);
  return new Date(year, month - 1, last.getDate() - ((last.getDay() - weekday + 7) % 7));
}

/** The first date on or after ORIGIN that `at(year)` lands on. */
function firstFrom(at: (year: number) => Date): Date {
  const y = ORIGIN.getFullYear();
  return at(y) >= ORIGIN ? at(y) : at(y + 1);
}

function alarm(description: string, trigger: string): string[] {
  return ["BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${escapeText(description)}`, `TRIGGER:${trigger}`, "END:VALARM"];
}

function vevents(m: Moment): string[][] {
  const url = `${SITE}/schedule/#${m.slug}`;
  const common = (uid: string) => [
    `UID:${uid}@${HOST}`,
    `DTSTAMP:${STAMP}`,
    `SUMMARY:${escapeText(m.name)}`,
    `DESCRIPTION:${escapeText(`${m.text}\n\n${url}`)}`,
    `URL:${url}`,
  ];
  const r = m.recurs;
  if ("daily" in r) {
    const [h, min] = r.daily.split(":");
    // The first morning after publication, at the moment's time, with no
    // zone: floating time is the reader's own clock.
    const first = ymd(nextDay(ORIGIN));
    return [[
      "BEGIN:VEVENT",
      ...common(m.slug),
      `DTSTART:${first}T${h}${min}00`,
      "DURATION:PT30M",
      "RRULE:FREQ=DAILY",
      // Five minutes is the time it takes a kettle to boil.
      ...alarm(`${m.name} in five minutes — kettle on`, "-PT5M"),
      "END:VEVENT",
    ]];
  }
  // An all-day entry's alarm fires at nine on the morning of the day: an
  // alarm at midnight is one nobody sees.
  const allDay = (uid: string, d: Date, rule?: string) => [
    "BEGIN:VEVENT",
    ...common(uid),
    `DTSTART;VALUE=DATE:${ymd(d)}`,
    `DTEND;VALUE=DATE:${ymd(nextDay(d))}`,
    ...(rule ? [`RRULE:${rule}`] : []),
    "TRANSP:TRANSPARENT",
    ...alarm(`${m.name} today`, "PT9H"),
    "END:VEVENT",
  ];
  if ("yearly" in r) {
    const [mo, d] = r.yearly.split("-").map(Number);
    return [allDay(m.slug, firstFrom((y) => new Date(y, mo - 1, d)), "FREQ=YEARLY")];
  }
  if ("month" in r) {
    const first = firstFrom((y) => nthWeekday(y, r.month, r.weekday, r.nth));
    return [allDay(m.slug, first, `FREQ=YEARLY;BYMONTH=${r.month};BYDAY=${r.nth}${DAYS[r.weekday]}`)];
  }
  // No rule fits: one entry per known date, each with its own UID so a
  // calendar holds them as separate days rather than one edited twice.
  return r.dates.map((iso) => {
    const [y, mo, d] = iso.split("-").map(Number);
    return allDay(`${m.slug}-${y}`, new Date(y, mo - 1, d));
  });
}

function calendar(name: string, list: Moment[]): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${HOST}//Tea calendar//EN`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeText(name)}`,
    ...list.flatMap((m) => vevents(m).flat()),
    "END:VCALENDAR",
  ];
  return lines.map(fold).join("\r\n") + "\r\n";
}

export const momentIcs = (m: Moment) => calendar(`${m.name} — tea.ceo`, [m]);
export const allIcs = () => calendar("Tea times — tea.ceo", moments);
