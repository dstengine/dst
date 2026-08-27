// Every third-party destination this site links to, keyed by the slug that
// /go/<slug>/ resolves to. Outbound links run through that hop so external
// domains collect no link equity from our pages, and /go/ is disallowed in
// robots.txt so the hops never get crawled or indexed themselves.
//
// The ticket link is the exception to this site's own rule about outbound
// links: a reader deciding whether to attend needs one click to the seller,
// so it renders as a visible button — through the hop like everything else.
import { forum } from "./content";

export const outbound: Record<string, string> = {
  tickets: forum.ticket!.url,
  organiser: "https://www.eventbrite.com/o/futur-world-expo-97005235433",
};

/** Path for an outbound link, e.g. go("tickets") -> "/go/tickets/" */
export function go(slug: string): string {
  return `/go/${slug}/`;
}
