// Every third-party destination this site links to, keyed by the slug that
// /go/<slug>/ resolves to. Outbound links run through that hop so external
// domains collect no link equity from our pages, and /go/ is disallowed in
// robots.txt so the hops never get crawled or indexed themselves.
//
// The list is written out rather than derived: this site has a handful of
// destinations, and each of them is a deliberate decision.
export const outbound: Record<string, string> = {
  "axs-wembley": "https://www.axs.com/uk/events/893660/tokio-hotel-tickets?skin=wembley",
  "ovo-arena-events": "https://www.ovoarena.co.uk/events",
};

/** Path for an outbound link, e.g. go("axs-wembley") -> "/go/axs-wembley/" */
export function go(slug: string): string {
  return `/go/${slug}/`;
}
