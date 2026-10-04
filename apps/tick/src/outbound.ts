// Every third-party destination this site links to, keyed by the slug that
// /go/<slug>/ resolves to. Outbound links run through that hop so external
// domains collect no link equity from our pages, and /go/ is disallowed in
// robots.txt so the hops never get crawled or indexed themselves.
//
// One hop serves both languages: the destination is the same box office
// whichever language the button was pressed in.
import { siteId } from "./content";
import { eventsBySite } from "@dst/content/events";

export const outbound: Record<string, string> = {};

// `<slug>-ticket` is a seller we have on file; `<slug>-source` is where the
// facts came from, and the button's fallback when there is no seller.
for (const event of eventsBySite(siteId)) {
  if (event.ticket) outbound[`${event.slug}-ticket`] = event.ticket.url;
  if (event.source?.url) outbound[`${event.slug}-source`] = event.source.url;
}

/** Path for an outbound link, e.g. go("equinox-fest-autumn-chapter-2026-ticket") */
export function go(slug: string): string {
  return `/go/${slug}/`;
}
