// Every third-party destination this site links to, keyed by the slug that
// /go/<slug>/ resolves to. Outbound links run through that hop so external
// domains collect no link equity from our pages, and /go/ is disallowed in
// robots.txt so the hops never get crawled or indexed themselves.
import { siteId } from "./content";
import { newsBySite } from "@dst/content/news";

export const outbound: Record<string, string> = {};

// `<slug>-action` is a guide's one button — see `action` in
// @dst/content/types: the project's own page.
for (const item of newsBySite(siteId)) {
  if (item.action) outbound[`${item.slug}-action`] = item.action.url;
}

/**
 * A guide's ticket link, where the organiser names one seller and the sale
 * is open: the hop is `/go/<slug>-ticket/`, and the button carries
 * `data-ticket` so the click counts as a ticket click, not a generic hop.
 * Only the seller the organiser names, never a reseller; a festival whose
 * sale has not opened has no entry here, and its guide says so instead.
 */
export const tickets: Record<string, { url: string; label: string; title: string }> = {
  "beyond-the-pale": {
    url: "https://www.ticketmaster.ie/beyond-the-pale-tickets/artist/1475979",
    label: "Tickets on Ticketmaster",
    title: "Beyond The Pale 2027 tickets on Ticketmaster Ireland, the festival's ticket seller",
  },
  "fuinneamh": {
    url: "https://fuinneamh.ticketr.events/2027",
    label: "Tickets on Ticketr",
    title: "Fuinneamh 2027 tickets on Ticketr, the festival's own ticket shop",
  },
};

for (const [slug, ticket] of Object.entries(tickets)) outbound[`${slug}-ticket`] = ticket.url;

/** Path for an outbound link, e.g. go("<slug>-action") -> "/go/<slug>-action/" */
export function go(slug: string): string {
  return `/go/${slug}/`;
}
