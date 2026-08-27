// Serves /forum.ics so "add to calendar" is a plain file download, with no
// account and no third-party calendar service involved. One event, one
// route: this site exists for a single date.
import type { APIRoute } from "astro";
import { toIcs } from "@dst/content/ics";
import { forum } from "../content";

const SITE = "https://fwf.lol";

export const GET: APIRoute = () =>
  new Response(toIcs(forum, `${SITE}/`), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="future-world-forum-dubai-2026.ics"',
    },
  });
