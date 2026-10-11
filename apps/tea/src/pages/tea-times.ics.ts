// Every tea moment in one calendar, at /tea-times.ics — the one to
// subscribe to, so a tea day added here reaches the reader's calendar
// without a second download.
import type { APIRoute } from "astro";
import { allIcs } from "../ics";

export const GET: APIRoute = () =>
  new Response(allIcs(), { headers: { "Content-Type": "text/calendar; charset=utf-8" } });
