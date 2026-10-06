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
import { feed, calendar, type Lang } from "./content";
import { eventsFor, newsFor, eventsBase, newsBase, prefix } from "./i18n";

const SITE = "https://tick.am";

export function rss(lang: Lang): Response {
  // An entry with no page of its own has no URL to send a reader to.
  const items = newsFor(lang).filter((i) => Array.isArray(i.body) && i.body.length > 0);
  const body = toRss(items, (item) => `${SITE}${newsBase(lang)}${item.slug}/`, {
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
  const body = toIcsCalendar(items, (item) => `${SITE}${eventsBase(lang)}${item.slug}/`, {
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
  return new Response(toIcs(item, `${SITE}${eventsBase(lang)}${item.slug}/`), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${item.slug}.ics"`,
    },
  });
}
