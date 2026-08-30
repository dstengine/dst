// Serves /events/<slug>.ics so "add to calendar" is a plain file download,
// with no account and no third-party calendar service involved.
//
// The button for this has been on every event page here since the site
// launched; the route it points at had not been written, so it answered 404.
import type { APIRoute } from "astro";
import { toIcs } from "@dst/content/ics";
import { eventsBySite } from "@dst/content/events";

const SITE = "https://ldn.lol";

export function getStaticPaths() {
  const items = eventsBySite("ldn").filter((i) => Array.isArray(i.body) && i.body.length > 0);
  return items.map((item) => ({ params: { slug: item.slug }, props: { item } }));
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
