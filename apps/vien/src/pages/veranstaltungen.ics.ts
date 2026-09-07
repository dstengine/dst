// The site's whole events feed as one subscribable calendar, at /veranstaltungen.ics.
//
// Different job from veranstaltungen/<slug>.ics next door: that file is downloaded
// once and imported, this one is subscribed to and re-read. A reader
// subscribes and the site keeps their calendar current with no account
// anywhere — and community listings software (Mobilizon, Gancio) imports
// events from exactly this shape of file, which puts us there as a source
// rather than as someone asking for attention.
//
// No Content-Disposition: an attachment header tells the browser to save the
// file, which is the opposite of what a subscription URL is for.
import { siteId } from "../content";
import type { APIRoute } from "astro";
import { toIcsCalendar } from "@dst/content/ics";
import { eventsBySite } from "@dst/content/events";

const SITE = "https://vien.lol";

export const GET: APIRoute = () => {
  // Same filter as the single-event route: an entry with no page of its own
  // has no URL to send a subscriber to.
  const items = eventsBySite(siteId).filter((i) => Array.isArray(i.body) && i.body.length > 0);
  const body = toIcsCalendar(items, (item) => `${SITE}/veranstaltungen/${item.slug}/`, {
    name: "Veranstaltungen Wien",
    description: "Ausstellungen, Konzerte und Festivals in Wien — mit Quelle und bestätigtem Datum.",
    url: `${SITE}/veranstaltungen/`,
    source: `${SITE}/veranstaltungen.ics`,
  });
  return new Response(body, {
    headers: { "Content-Type": "text/calendar; charset=utf-8" },
  });
};
