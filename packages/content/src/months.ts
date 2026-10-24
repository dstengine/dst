// Cutting one feed by when.
//
// "Events in Yerevan in November" is the other question the long list
// cannot answer and the search box is asked: a reader planning a trip, or a
// month ahead, wants one page with that month on it and nothing else. The
// list page is sorted by date already, which is why it never ranks for a
// month — it is about every month at once.
//
// A month holds every event that is on for at least one day of it. A run
// that opened in September and closes in December is on in October and
// November too, and a reader who opens November's page is asking what they
// can go to in November, not what starts then.
//
// Past months stay. The page for a month that has gone is the record of
// it — what the city had on — and a record is what a search engine can
// still send a reader to a year later. The threshold is a kind's
// (`ENOUGH_TAG`): a month with two dates in it is a slice of the calendar
// rather than a page about the month.
import type { EventItem } from "./types.ts";
import { lastDay } from "./when.ts";
import { ENOUGH_TAG } from "./sections.ts";

export interface Month {
  /** "2026-11": the address segment and the sort key. */
  key: string;
  year: number;
  /** 1–12. */
  month: number;
  /** First and last day, ISO. */
  first: string;
  last: string;
  /** Every event on for a day of the month, soonest first. */
  items: EventItem[];
  /** Whether any day of the month is still to come, as of `today`. */
  ahead: boolean;
}

/** "2026-11-14" → "2026-11". */
export const monthOf = (iso: string): string => iso.slice(0, 7);

/** The first and last day of "YYYY-MM". */
export function monthBounds(key: string): { first: string; last: string } {
  const [y, m] = key.split("-").map(Number);
  const last = new Date(Date.UTC(y, m, 0)).getUTCDate();
  return { first: `${key}-01`, last: `${key}-${String(last).padStart(2, "0")}` };
}

/** Whether an event is on for at least one day of the month. */
export function inMonth(event: Pick<EventItem, "start" | "end">, key: string): boolean {
  const { first, last } = monthBounds(key);
  return event.start <= last && lastDay(event) >= first;
}

export interface MonthsInput {
  items: EventItem[];
  /** ISO "YYYY-MM-DD"; see ./when.ts for why it is passed in. */
  today: string;
  min?: number;
}

/** The months that have earned a page, in calendar order. */
export function buildMonths({ items, today, min = ENOUGH_TAG }: MonthsInput): Month[] {
  const keys = new Set<string>();
  for (const e of items) {
    // Every month the run touches, not only the one it starts in.
    let cursor = monthOf(e.start);
    const end = monthOf(lastDay(e));
    while (cursor <= end) {
      keys.add(cursor);
      const [y, m] = cursor.split("-").map(Number);
      cursor = `${m === 12 ? y + 1 : y}-${String(m === 12 ? 1 : m + 1).padStart(2, "0")}`;
    }
  }
  const out: Month[] = [];
  for (const key of [...keys].sort()) {
    const mine = items.filter((e) => inMonth(e, key)).sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : a.slug.localeCompare(b.slug)));
    if (mine.length < min) continue;
    const { first, last } = monthBounds(key);
    const [year, month] = key.split("-").map(Number);
    out.push({ key, year, month, first, last, items: mine, ahead: last >= today });
  }
  return out;
}

/** The month's page under `base` ("/calendar/"). */
export const monthHref = (key: string, base: string): string => `${base}${key}/`;
