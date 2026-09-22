// Every third-party destination this site links to, keyed by the slug that
// /go/<slug>/ resolves to. Outbound links run through that hop so external
// domains collect no link equity from our pages, and /go/ is disallowed in
// robots.txt so the hops never get crawled or indexed themselves.
//
// The ticket link is the exception to this site's own rule about outbound
// links: a reader deciding whether to attend needs one click to the seller,
// so it renders as a visible button — through the hop like everything else.
import { forum, otherEvents } from "./content";

export const outbound: Record<string, string> = {
  tickets: forum.ticket!.url,
  organiser: "https://www.eventbrite.com/o/futur-world-expo-97005235433",
};

// The other events' pages, same convention as the rest of the network:
// `<slug>-ticket` for a seller or a registration form we have on file,
// `<slug>-source` for where the facts came from when there is neither. An
// event page with no button answers "should I go?" and then strands the
// reader; every one of these had none until the Dubai Future Week
// registration opened and made the gap obvious.
for (const event of otherEvents) {
  if (event.ticket) outbound[`${event.slug}-ticket`] = event.ticket.url;
  if (event.source?.url) outbound[`${event.slug}-source`] = event.source.url;
}

/** Path for an outbound link, e.g. go("tickets") -> "/go/tickets/" */
export function go(slug: string): string {
  return `/go/${slug}/`;
}
