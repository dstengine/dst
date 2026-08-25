// Serves /events/<slug>.ics so "add to calendar" is a plain file download,
// with no account and no third-party calendar service involved.
import type { APIRoute } from "astro";
import { eventsBySite } from "@dst/content/events";
import { toIcs } from "@dst/content/ics";

const SITE = "https://llc.dst.llc";

export function getStaticPaths() {
  return eventsBySite("llc").map((item) => ({ params: { slug: item.slug }, props: { item } }));
}

export const GET: APIRoute = ({ props }) => {
  const { item } = props as { item: Parameters<typeof toIcs>[0] };
  return new Response(toIcs(item, `${SITE}/events/${item.slug}/`), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${item.slug}.ics"`,
    },
  });
};
