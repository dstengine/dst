// When a tea moment next comes round, on the clock of whoever is reading.
// Runs in the browser: the build has no idea where the reader is, and
// "afternoon tea at four" means four where they are sitting. Everything here
// works in the runtime's local time, which in a browser is the reader's.
import type { Recurrence } from "./schedule";

/** A timed moment counts as happening for this long after it starts — long
    enough to brew and pour, short enough that "now" still means now. */
const TIMED_WINDOW_MS = 30 * 60 * 1000;

export interface Occurrence {
  start: Date;
  end: Date;
  /** A whole day rather than a time of day. */
  allDay: boolean;
}

const atDay = (y: number, m: number, d: number) => new Date(y, m - 1, d);
const nextDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);

/** The nth `weekday` of a month; -1 is the last one. */
function nthWeekday(year: number, month: number, weekday: number, nth: number): Date {
  if (nth > 0) {
    const first = atDay(year, month, 1);
    const offset = (weekday - first.getDay() + 7) % 7;
    return atDay(year, month, 1 + offset + (nth - 1) * 7);
  }
  const last = atDay(year, month + 1, 0);
  const offset = (last.getDay() - weekday + 7) % 7;
  return atDay(year, month, last.getDate() - offset);
}

/** The occurrence that has not finished yet: the one on now, or the next. */
export function nextOccurrence(r: Recurrence, now: Date = new Date()): Occurrence | undefined {
  if ("daily" in r) {
    const [h, m] = r.daily.split(":").map(Number);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
    const start = now.getTime() < today.getTime() + TIMED_WINDOW_MS
      ? today
      : new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, h, m);
    return { start, end: new Date(start.getTime() + TIMED_WINDOW_MS), allDay: false };
  }
  const day = (start: Date): Occurrence => ({ start, end: nextDay(start), allDay: true });
  if ("yearly" in r) {
    const [mo, d] = r.yearly.split("-").map(Number);
    const thisYear = day(atDay(now.getFullYear(), mo, d));
    return now < thisYear.end ? thisYear : day(atDay(now.getFullYear() + 1, mo, d));
  }
  if ("month" in r) {
    const thisYear = day(nthWeekday(now.getFullYear(), r.month, r.weekday, r.nth));
    return now < thisYear.end ? thisYear : day(nthWeekday(now.getFullYear() + 1, r.month, r.weekday, r.nth));
  }
  return r.dates
    .map((iso) => {
      const [y, mo, d] = iso.split("-").map(Number);
      return day(atDay(y, mo, d));
    })
    .find((o) => now < o.end);
}

const pad = (n: number) => String(n).padStart(2, "0");

/** "3 h 04 m 31 s"; "12 days 06 h" once it is more than a couple of days off,
    where the seconds would only be noise. */
export function duration(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (d >= 2) return `${d} days ${pad(h)} h`;
  if (d === 1) return `1 day ${pad(h)} h ${pad(m)} m`;
  if (h > 0) return `${h} h ${pad(m)} m ${pad(sec)} s`;
  return `${m} m ${pad(sec)} s`;
}

/** What the countdown says right now. */
export function status(o: Occurrence, now: Date = new Date()): { text: string; live: boolean } {
  const ms = o.start.getTime() - now.getTime();
  if (ms <= 0) return { text: o.allDay ? "Today" : "Now — the kettle is on", live: true };
  return { text: `in ${duration(ms)}`, live: false };
}

/** "Tue 12 Jan" for a day, "16:00" today, "Tue 16:00" otherwise — in the
    reader's own conventions for the clock, but always in UK English words. */
export function when(o: Occurrence, now: Date = new Date()): string {
  if (o.allDay) {
    return new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" }).format(o.start);
  }
  const time = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit" }).format(o.start);
  const sameDay = o.start.toDateString() === now.toDateString();
  return sameDay ? `today at ${time}` : `tomorrow at ${time}`;
}
