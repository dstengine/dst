// Every third-party destination this site links to, keyed by the slug that
// /go/<slug>/ resolves to. Outbound links run through that hop so external
// domains collect no link equity from our pages, and /go/ is disallowed in
// robots.txt so the hops never get crawled or indexed themselves.
import { stories } from "./data/stories";
import { siteId } from "./content";
import { eventsBySite } from "@dst/content/events";

export const outbound: Record<string, string> = {
  instagram: "https://www.instagram.com/eco.dst.llc/",
};

// `<slug>-ticket` is the network-wide convention, and the event template
// renders that href whenever an event carries a ticket. Without this loop
// the href is written and the hop does not exist: ADIPEC 2026 shipped a
// dead link on a live page because this app was assumed to have no
// ticketed events, and nothing checked — eco was missing from the test
// suite's site list until 3 October 2026.
for (const event of eventsBySite(siteId)) {
  if (event.ticket) outbound[`${event.slug}-ticket`] = event.ticket.url;
}

// A story's map link points at whichever map service the coordinates came
// from; `${slug}-map` is the slug the portfolio page looks up.
for (const story of stories) {
  if (story.location?.mapUrl) outbound[`${story.slug}-map`] = story.location.mapUrl;
}

/** Path for an outbound link, e.g. go("instagram") -> "/go/instagram/" */
export function go(slug: string): string {
  return `/go/${slug}/`;
}
