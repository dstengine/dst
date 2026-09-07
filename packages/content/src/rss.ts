import type { NewsItem } from "./types.ts";

// RSS 2.0 for a site's news feed.
//
// News only, deliberately. RSS is built around pubDate — when this item was
// published — and that is a fact we hold for news (`NewsItem.date`, taken
// from the source) and do not hold for events: an EventItem carries `start`,
// which is when the thing happens, not when we wrote it up. Putting `start`
// in pubDate would drop a December conference to the bottom of every reader's
// timeline for three months, and inventing a publication date for a hundred
// existing entries would be inventing content. Events have their own feed in
// the format built for them — the subscribable calendar in ./ics.ts.

/** XML text content. Five characters, no exceptions, no entities anywhere else. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RFC 822 as RSS 2.0 requires it: "Sun, 06 Sep 2026 00:00:00 GMT". */
function rfc822(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${days[d.getUTCDay()]}, ${pad(d.getUTCDate())} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()} 00:00:00 GMT`;
}

/** What a feed needs beyond the items. */
export interface FeedMeta {
  /** The channel title — what a reader sees in their reader's sidebar. */
  title: string;
  /** One line on what this feed carries, in the site's own language. */
  description: string;
  /** The site itself, which is the channel's link. */
  siteUrl: string;
  /** This file's own address, for atom:link rel="self". */
  self: string;
  /** RFC 5646: "en-GB", "es-MX", "de-AT". Without it an aggregator files a
      Spanish site on an English shelf. */
  language: string;
}

/** The newest this many items. Twenty is what a reader's first fetch should
    hold: enough to show what the site is, short enough to stay inside the
    sixty-day window aggregators like NewsNow require of a headline feed. */
export const FEED_LIMIT = 20;

/**
 * One site's news as RSS 2.0.
 *
 * Summaries, never full text. A full-text feed is how a scraper republishes
 * an article and outranks the site that wrote it — and for a network whose
 * only channel is search, that is the one asset there is to lose. It also
 * happens to be what the machines we care about prefer: RSS Parrot, which
 * relays a feed into the fediverse, uses `description` when it is a summary
 * rather than pushing a whole article into a timeline.
 */
export function toRss(
  items: NewsItem[],
  pageUrlFor: (item: NewsItem) => string,
  meta: FeedMeta,
  now: Date = new Date(),
): string {
  const newest = [...items]
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    .slice(0, FEED_LIMIT);

  const entries = newest.map((item) => {
    const url = pageUrlFor(item);
    return [
      "    <item>",
      `      <title>${escapeXml(item.title)}</title>`,
      `      <link>${escapeXml(url)}</link>`,
      // The canonical URL is the identity, and it never changes for an entry
      // that has already gone out: a changed guid reads as a second article.
      // A moved address owes a 301 and an entry in ./redirects.ts instead.
      `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
      `      <pubDate>${rfc822(item.date)}</pubDate>`,
      ...(item.category ? [`      <category>${escapeXml(item.category)}</category>`] : []),
      `      <description>${escapeXml(item.summary)}</description>`,
      "    </item>",
    ].join("\n");
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(meta.title)}</title>`,
    `    <link>${escapeXml(meta.siteUrl)}</link>`,
    `    <description>${escapeXml(meta.description)}</description>`,
    `    <language>${escapeXml(meta.language)}</language>`,
    `    <atom:link href="${escapeXml(meta.self)}" rel="self" type="application/rss+xml" />`,
    `    <lastBuildDate>${newest.length > 0 ? rfc822(newest[0]!.date) : rfc822(now.toISOString().slice(0, 10))}</lastBuildDate>`,
    ...entries,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}
