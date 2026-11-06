// UTM tags on the hops that lead to a box office. With them a seller sees,
// in its own analytics, which site and which event sent the buyer, and that
// is the figure a per-click agreement with a seller is priced on. A hop to a
// map, a source page or a venue's own site carries none: nobody there counts
// our readers, and an untagged link is the quieter default.
//
// utm_source is the site's host, utm_medium is "referral", utm_campaign is
// the hop's slug, which already names the event and the seller
// (`<event>-ticket`). The tags are appended to the query as it is, so a
// seller's own parameters keep their bytes.

/**
 * A hop to a seller, by the network's slug conventions: `<event>-ticket` on
 * the event sites, `tickets-<show>-<run>` on musical, `<event>-tickets` on
 * fest (whose hops also say their kind, and pass it instead).
 */
export const TICKET_HOP = /(?:^|-)tickets?(?:-|$)/;

export function isTicketHop(slug: string | undefined): boolean {
  return typeof slug === "string" && TICKET_HOP.test(slug);
}

export interface TicketTag {
  /** The hop's slug. */
  campaign?: string;
  /** The site's host, e.g. Astro.site?.hostname. */
  host?: string;
}

const bare = (host: string) => host.toLowerCase().replace(/^www\./, "");

/**
 * The seller's URL with utm_source, utm_medium and utm_campaign appended.
 * Returned unchanged when there is no slug or host to tag with, when it is
 * not an http(s) URL, when it leads back to the site itself, or when it
 * already carries a utm_ parameter (a seller's own campaign link wins).
 */
export function tagTicketUrl(to: string, { campaign, host }: TicketTag): string {
  if (!campaign || !host) return to;
  let url: URL;
  try {
    url = new URL(to);
  } catch {
    return to;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return to;
  if (bare(url.hostname) === bare(host)) return to;
  if ([...url.searchParams.keys()].some((key) => key.toLowerCase().startsWith("utm_"))) return to;
  const tags = `utm_source=${encodeURIComponent(bare(host))}&utm_medium=referral&utm_campaign=${encodeURIComponent(campaign)}`;
  url.search = url.search.length > 1 ? `${url.search}&${tags}` : `?${tags}`;
  return url.href;
}
