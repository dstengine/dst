// Every third-party destination this site links to, keyed by the slug that
// /go/<slug>/ resolves to. Outbound links run through that hop so external
// domains collect no link equity from our pages, and /go/ is disallowed in
// robots.txt so the hops are never crawled or indexed themselves.
//
// Ticket links are the one place a visible outbound button is right: a
// reader deciding whether to go needs one click to the seller. It still
// goes through the hop.
export const outbound: Record<string, string> = {
  "chicago-dubai": "https://www.ticketmaster.ae/event/chicago-the-musical-tickets/1998162905",
};

/** Path for an outbound link, e.g. go("chicago-dubai") -> "/go/chicago-dubai/" */
export function go(slug: string): string {
  return `/go/${slug}/`;
}
