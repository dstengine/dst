// Serves /events/<slug>.ics so "add to calendar" is a plain file download,
// with no account and no third-party calendar service involved. The forum's
// own file is /forum.ics, since its page is the home page.
import type { APIRoute } from "astro";
import { toIcs } from "@dst/content/ics";
import { otherEvents } from "../../content";

const SITE = "https://fwf.lol";

export function getStaticPaths() {
  return otherEvents.map((item) => ({ params: { slug: item.slug }, props: { item } }));
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
