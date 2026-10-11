// One tea moment as a calendar file, at /schedule/<slug>.ics: the "add to
// my calendar" button on the schedule and on the front page.
import type { APIRoute } from "astro";
import { moments, type Moment } from "../../schedule";
import { momentIcs } from "../../ics";

export function getStaticPaths() {
  return moments.map((moment) => ({ params: { slug: moment.slug }, props: { moment } }));
}

export const GET: APIRoute = ({ props }) =>
  new Response(momentIcs((props as { moment: Moment }).moment), {
    headers: { "Content-Type": "text/calendar; charset=utf-8" },
  });
