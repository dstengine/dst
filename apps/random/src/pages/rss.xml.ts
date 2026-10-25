// This site's guides as RSS 2.0, at /rss.xml. Summaries, not full text — see
// the note in @dst/content/rss. Each item carries the subjects it is
// about as <category>, which is what a reader filters on.
import { siteId, feed } from "../content";
import type { APIRoute } from "astro";
import { toRss } from "@dst/content/rss";
import { newsBySite } from "@dst/content/news";
import { newsHref } from "@dst/content/paths";

const SITE = "https://random.directory";

export const GET: APIRoute = () => {
  // An entry with no page of its own has no URL to send a reader to.
  const items = newsBySite(siteId).filter((i) => Array.isArray(i.body) && i.body.length > 0);
  const body = toRss(items, (item) => `${SITE}${newsHref(item, "/guides/")}`, {
    ...feed,
    siteUrl: `${SITE}/`,
    self: `${SITE}/rss.xml`,
  });
  return new Response(body, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};
