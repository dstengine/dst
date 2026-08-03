// Every third-party destination this site links to, keyed by the slug that
// /go/<slug>/ resolves to. Outbound links run through that hop so external
// domains collect no link equity from our pages, and /go/ is disallowed in
// robots.txt so the hops never get crawled or indexed themselves.
//
// Venue entries are derived from the venue data rather than listed by hand,
// so adding a venue with an externalHref registers its redirect automatically.
import { coffeeVenues } from "./content";

export const outbound: Record<string, string> = {};

for (const venue of Object.values(coffeeVenues)) {
  if (venue.externalHref) outbound[`${venue.slug}-social`] = venue.externalHref;
  if (venue.mapHref) outbound[`${venue.slug}-map`] = venue.mapHref;
}

/** Path for an outbound link, e.g. go("homebrew-social") -> "/go/homebrew-social/" */
export function go(slug: string): string {
  return `/go/${slug}/`;
}
