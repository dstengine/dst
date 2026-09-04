// Every third-party destination this site links to, keyed by the slug that
// /go/<slug>/ resolves to. Outbound links run through that hop so external
// domains collect no link equity from our pages, and /go/ is disallowed in
// robots.txt so the hops never get crawled or indexed themselves.
//
// Written out rather than derived: this site has a handful of destinations,
// and each of them is a deliberate decision. A source we could not confirm
// resolves gets named on the page and given no slug here.
export const outbound: Record<string, string> = {
  "axs-wembley": "https://www.axs.com/uk/events/893660/tokio-hotel-tickets?skin=wembley",
  "ovo-arena-events": "https://www.ovoarena.co.uk/events",
  "wikipedia-tokio-hotel": "https://en.wikipedia.org/wiki/Tokio_Hotel",
  "wikipedia-discography": "https://en.wikipedia.org/wiki/Tokio_Hotel_discography",
};

/** Path for an outbound link, e.g. go("axs-wembley") -> "/go/axs-wembley/" */
export function go(slug: string): string {
  return `/go/${slug}/`;
}
