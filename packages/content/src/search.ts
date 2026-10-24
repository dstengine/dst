// The records a site's search box reads.
//
// The sites are static, so search is the reader's browser filtering a list
// the build wrote out: one JSON file per site and language, fetched the
// first time the box is focused, never before. The records are short on
// purpose — a title, a summary, a venue, a kind, a date and an address —
// because the file is downloaded by every reader who touches the box, and
// a hundred events are a few tens of kilobytes at this size.
//
// Only entries with a page of their own go in: a result that cannot be
// opened is a result that lies. Events still to come lead, soonest first,
// then the ones that have gone, then the news, newest first — the order the
// box shows them in before a reader has typed a word.
import type { EventItem, NewsItem } from "./types.ts";
import { eventHref, newsHref } from "./paths.ts";
import { hasEnded } from "./when.ts";

export interface SearchRecord {
  /** Where it opens. */
  h: string;
  /** Title. */
  t: string;
  /** Summary, cut to a line. */
  s?: string;
  /** Venue and city, for an event. */
  w?: string;
  /** Category. */
  c?: string;
  /** ISO date: an event's first day, a news item's publication. */
  d: string;
  /** An event's last day, when it has one. */
  x?: string;
  /** 1 for an event; absent for news. */
  e?: 1;
  /** 1 for an event that is over. */
  p?: 1;
}

const hasPage = (i: { body?: string[] }) => Array.isArray(i.body) && i.body.length > 0;
const line = (s: string | undefined, max = 160) => (s && s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s);

export function searchRecords(
  events: EventItem[],
  news: NewsItem[],
  { eventsBase, newsBase, today }: { eventsBase: string; newsBase: string; today: string },
): SearchRecord[] {
  const ev = events
    .filter(hasPage)
    .sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0));
  const ahead = ev.filter((e) => !hasEnded(e, today));
  const gone = ev.filter((e) => hasEnded(e, today)).reverse();
  const toEvent = (e: EventItem): SearchRecord => ({
    h: eventHref(e, eventsBase),
    t: e.title,
    s: line(e.summary),
    w: [e.venue, e.city].filter(Boolean).join(" · ") || undefined,
    c: e.category,
    d: e.start,
    ...(e.end && e.end !== e.start ? { x: e.end } : {}),
    e: 1,
    ...(hasEnded(e, today) ? { p: 1 } : {}),
  });
  const toNews = (n: NewsItem): SearchRecord => ({
    h: newsHref(n, newsBase),
    t: n.title,
    s: line(n.summary),
    c: n.category,
    d: n.date,
  });
  return [
    ...ahead.map(toEvent),
    ...gone.map(toEvent),
    ...news.filter(hasPage).sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)).map(toNews),
  ];
}
