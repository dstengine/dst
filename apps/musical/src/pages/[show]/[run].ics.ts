// Serves /<show>/<run>.ics so "add to calendar" is a file download rather
// than an account somewhere. Same generator the other sites use, so a run of
// a musical and a conference session produce the same shape of file.
import type { APIRoute } from "astro";
import { toIcs } from "@dst/content/ics";
import { cityBySlug, formatRun, runIntro, runs, shows, venueBySlug } from "../../content";

const SITE = "https://musical.today";

export function getStaticPaths() {
  // An open run has no dates to add: a calendar entry on the day it opened
  // in 1996 is noise in someone's diary, not a reminder.
  return runs
    .filter((run) => run.start && !run.openRun)
    .map((run) => ({ params: { show: run.show, run: run.slug }, props: { run } }));
}

export const GET: APIRoute = ({ props }) => {
  const run = props.run as (typeof runs)[number];
  const show = shows.find((s) => s.slug === run.show)!;
  const city = cityBySlug(run.city);
  const venue = run.venue ? venueBySlug(run.venue) : undefined;

  const item = {
    slug: `${run.show}-${run.slug}`,
    site: "musical",
    title: `${show.title} — ${city?.name ?? run.city}`,
    summary: `${formatRun(run)}. ${runIntro(run)}`,
    start: run.start!,
    ...(run.end ? { end: run.end } : {}),
    ...(venue ? { venue: venue.name } : {}),
    ...(city ? { city: city.name } : {}),
    ...(venue?.lat && venue?.lon ? { geo: { lat: venue.lat, lng: venue.lon } } : {}),
  };

  return new Response(toIcs(item as Parameters<typeof toIcs>[0], `${SITE}/${run.show}/${run.slug}/`), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${run.show}-${run.slug}.ics"`,
    },
  });
};
