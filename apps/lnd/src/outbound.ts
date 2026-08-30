// Every third-party destination this site links to, keyed by the slug that
// /go/<slug>/ resolves to. Outbound links run through that hop so external
// domains collect no link equity from our pages, and /go/ is disallowed in
// robots.txt so the hops never get crawled or indexed themselves.
import { eventsBySite } from "@dst/content/events";

export const outbound: Record<string, string> = {};

// Two kinds of destination, and the event page picks between them.
//
// `<slug>-ticket` is the network-wide convention: a seller we have on file.
// None of the events here has one yet.
//
// `<slug>-source` is the fallback, and it is the reason every event on this
// site now has something to press. A source URL is otherwise an audit trail
// that never reaches rendered HTML — but an event page with no way out is a
// page that answers "should I go?" and then strands the reader, so where
// there is no seller the hop goes to where the facts came from. What the
// button is allowed to say depends on `source.official`.
for (const event of eventsBySite("lnd")) {
  if (event.ticket) outbound[`${event.slug}-ticket`] = event.ticket.url;
  if (event.source?.url) outbound[`${event.slug}-source`] = event.source.url;
}

/** Path for an outbound link, e.g. go("filij-2026-source") -> "/go/filij-2026-source/" */
export function go(slug: string): string {
  return `/go/${slug}/`;
}
