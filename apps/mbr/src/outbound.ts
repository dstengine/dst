// Every third-party destination this site links to, keyed by the slug that
// /go/<slug>/ resolves to. Outbound links run through that hop so external
// domains collect no link equity from our pages, and /go/ is disallowed in
// robots.txt so the hops never get crawled or indexed themselves.
import { eventsBySite } from "@dst/content/events";

export const outbound: Record<string, string> = {};

// Same derivation as riviera's outbound.ts — `${slug}-ticket` is the
// convention events/[slug].astro looks up when building ticketHref.
for (const event of eventsBySite("mbr")) {
  if (event.ticket) outbound[`${event.slug}-ticket`] = event.ticket.url;
}

/** Path for an outbound link, e.g. go("dubai-world-cup-2027-ticket") -> "/go/dubai-world-cup-2027-ticket/" */
export function go(slug: string): string {
  return `/go/${slug}/`;
}
