// The whole site as one subscribable calendar. A tour is the case the
// network's other calendars do not have: the same show in thirty-odd cities
// over a year, where the question is not "what is on this weekend" but "when
// does it reach me". Subscribing answers that once, and keeps answering it
// as stops are added.
//
// No Content-Disposition. An attachment header is what turns a subscription
// URL back into a file someone saves once and never hears from again.
import type { APIRoute } from "astro";
import { toIcsCalendar } from "@dst/content/ics";
import { asEvent, datedRuns } from "../content";

const SITE = "https://musical.today";

export const GET: APIRoute = () => {
  const entries = datedRuns().map((run) => ({ run, item: asEvent(run) }));
  // The page each entry belongs to, looked up rather than reconstructed: the
  // UID slug glues show and run together, and a show slug may hold a hyphen
  // of its own, so taking it apart again would eventually split the wrong one.
  const pages = new Map(entries.map(({ run, item }) => [item.slug, `${SITE}/${run.show}/${run.slug}/`]));
  const body = toIcsCalendar(
    entries.map((e) => e.item),
    (item) => pages.get(item.slug)!,
    {
      name: "Musicals on sale — every dated run",
      description:
        "Every run this site tracks that has dates: the city, the theatre and the nights it plays, read from the production's own listing.",
      url: `${SITE}/`,
      source: `${SITE}/events.ics`,
    },
  );
  return new Response(body, { headers: { "Content-Type": "text/calendar; charset=utf-8" } });
};
