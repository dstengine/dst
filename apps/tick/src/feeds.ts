// The site's machine-readable feeds, once per language: news as RSS at
// rss.xml, the calendar as .ics — one file per event to import, and the
// whole of it at events.ics to subscribe to. The route files under pages/
// and pages/am/ are one line each and call into here.
//
// Summaries, not full text — see the note in @dst/content/rss. Events are
// not in the RSS: they have no publication date to sort by, which is what
// the subscribable calendar is for.
import { toRss } from "@dst/content/rss";
import { toIcs, toIcsCalendar } from "@dst/content/ics";
import type { EventItem } from "@dst/content/types";
import { eventHref, newsHref } from "@dst/content/paths";
import { searchRecords } from "@dst/content/search";
import { feed, calendar, type Lang } from "./content";
import { eventsFor, newsFor, eventsBase, newsBase, prefix } from "./i18n";

const SITE = "https://tick.am";

export function rss(lang: Lang): Response {
  // An entry with no page of its own has no URL to send a reader to.
  const items = newsFor(lang).filter((i) => Array.isArray(i.body) && i.body.length > 0);
  const body = toRss(items, (item) => `${SITE}${newsHref(item, newsBase(lang))}`, {
    ...feed[lang],
    siteUrl: `${SITE}${prefix(lang)}`,
    self: `${SITE}${prefix(lang)}rss.xml`,
  });
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}

// No Content-Disposition: an attachment header tells the browser to save
// the file, which is the opposite of what a subscription URL is for.
export function wholeCalendar(lang: Lang): Response {
  const items = eventsFor(lang).filter((i) => Array.isArray(i.body) && i.body.length > 0);
  const body = toIcsCalendar(items, (item) => `${SITE}${eventHref(item, eventsBase(lang))}`, {
    ...calendar[lang],
    url: `${SITE}${eventsBase(lang)}`,
    source: `${SITE}${prefix(lang)}events.ics`,
  });
  return new Response(body, { headers: { "Content-Type": "text/calendar; charset=utf-8" } });
}

export function icsPaths(lang: Lang) {
  const items = eventsFor(lang).filter((i) => Array.isArray(i.body) && i.body.length > 0);
  return items.map((item) => ({ params: { slug: item.slug }, props: { item } }));
}

export function oneEvent(lang: Lang, item: EventItem): Response {
  return new Response(toIcs(item, `${SITE}${eventHref(item, eventsBase(lang))}`), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${item.slug}.ics"`,
    },
  });
}

// The search box's records, one file per language — see
// @dst/content/search for what is in them and why so little.
export function searchIndex(lang: Lang): Response {
  const today = new Date().toISOString().slice(0, 10);
  const records = searchRecords(eventsFor(lang), newsFor(lang), { eventsBase: eventsBase(lang), newsBase: newsBase(lang), today });
  return new Response(JSON.stringify(records), { headers: { "Content-Type": "application/json; charset=utf-8" } });
}
