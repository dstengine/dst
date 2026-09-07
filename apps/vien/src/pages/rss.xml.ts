// This site's news as RSS 2.0, at /rss.xml.
//
// Summaries, not full text — see the note in @dst/content/rss. Events are
// not in here: they have no publication date to sort by. The events feed
// is published as a subscribable calendar instead — see @dst/content/ics.
import { siteId, feed } from "../content";
import type { APIRoute } from "astro";
import { toRss } from "@dst/content/rss";
import { newsBySite } from "@dst/content/news";

const SITE = "https://vien.lol";

export const GET: APIRoute = () => {
  // An entry with no page of its own has no URL to send a reader to.
  const items = newsBySite(siteId).filter((i) => Array.isArray(i.body) && i.body.length > 0);
  const body = toRss(items, (item) => `${SITE}/nachrichten/${item.slug}/`, {
    ...feed,
    siteUrl: `${SITE}/`,
    self: `${SITE}/rss.xml`,
  });
  return new Response(body, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};
