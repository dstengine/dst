// Every third-party destination this site links to, keyed by the slug that
// /go/<slug>/ resolves to. Outbound links run through that hop so external
// domains collect no link equity from our pages, and /go/ is disallowed in
// robots.txt so the hops never get crawled or indexed themselves.
import { siteId } from "./content";
import { newsBySite } from "@dst/content/news";

export const outbound: Record<string, string> = {};

// `<slug>-action` is a news item's one button — see `action` in
// @dst/content/types: the model card, the release, the download.
for (const item of newsBySite(siteId)) {
  if (item.action) outbound[`${item.slug}-action`] = item.action.url;
}

/** Path for an outbound link, e.g. go("ltx-2-5-open-weights-action") -> "/go/ltx-2-5-open-weights-action/" */
export function go(slug: string): string {
  return `/go/${slug}/`;
}
