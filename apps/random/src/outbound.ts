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

// The sources the wallet page names, one per coin or project.
Object.assign(outbound, {
  "wallet-cake": "https://github.com/cake-tech/cake_wallet",
  "wallet-salvium": "https://github.com/salvium/salvium",
  "wallet-tari-rfc": "https://rfc.tari.com/RFC-0131_Mining.html",
  "wallet-monzero": "https://github.com/Nightglass-Protocol1/Monzero-source",
  "wallet-wownero": "https://codeberg.org/wownero/wownero",
  "wallet-cake-wownero": "https://github.com/cake-tech/cake_wallet/pull/3186",
  "wallet-cake-tari-pr": "https://github.com/cake-tech/cake_wallet/pull/2862",
  "wallet-salvium-docs": "https://docs.salvium.io/THE%20PROJECT/sal-one",
});

/** Path for an outbound link, e.g. go("xmrig-action") -> "/go/xmrig-action/" */
export function go(slug: string): string {
  return `/go/${slug}/`;
}
