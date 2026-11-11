// Every third-party destination this site links to, keyed by the slug that
// /go/<slug>/ resolves to. Outbound links run through that hop so external
// domains collect no link equity from our pages, and /go/ is disallowed in
// robots.txt so the hops never get crawled or indexed themselves.
//
// One hop serves both languages: the destination is the same box office
// whichever language the button was pressed in.
import { siteId } from "./content";
import { mapPlaceUrl } from "@dst/ui/maps";
import { eventsBySite } from "@dst/content/events";
import { guideOutbound } from "./guides";

export const outbound: Record<string, string> = {};

// `<slug>-ticket` is a seller we have on file; `<slug>-source` is where the
// facts came from, and the button's fallback when there is no seller.
for (const event of eventsBySite(siteId)) {
  if (event.ticket) outbound[`${event.slug}-ticket`] = event.ticket.url;
  // `<slug>-map` is the venue on Google Maps, for the address in the facts.
  if (event.geo) outbound[`${event.slug}-map`] = mapPlaceUrl(event.geo.lat, event.geo.lng);
  if (event.source?.url) outbound[`${event.slug}-source`] = event.source.url;
}

// The places a section guide points at (./guides.ts).
Object.assign(outbound, guideOutbound);

// The sources the New Year guide (news/tick.ts, new-year-yerevan-2026-2027)
// links to: the law on days off, last season's city tree and fair, and the
// Mother See's schedule. A language each where the source has two.
Object.assign(outbound, {
  "new-year-guide-holidays-law": "https://www.arlis.am/hy/acts/233309",
  "new-year-guide-fair-2025": "https://www.yerevan.am/hy/announcement/hravirowm-enk-masnakts-elow-nor-tarva-tonavacharh-2025-2026-in/",
  "new-year-guide-tree-2025-hy": "https://www.yerevan.am/hy/news/varhvets-in-erewani-glkhavor-tonatsarhi-lowysere/",
  "new-year-guide-tree-2025-en": "https://www.yerevan.am/en/news/varhvets-in-erewani-glkhavor-tonatsarhi-lowysere/",
  "new-year-guide-mother-see-hy": "https://www.armenianchurch.org/hy/news/amanor-30-12-2025/12105",
  "new-year-guide-mother-see-en": "https://www.armenianchurch.org/en/news/amanor-en-30-12-2025/12105",
});

/** Path for an outbound link, e.g. go("equinox-fest-autumn-chapter-2026-ticket") */
export function go(slug: string): string {
  return `/go/${slug}/`;
}
