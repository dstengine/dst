// Every third-party destination this site links to, keyed by the slug that
// /go/<slug>/ resolves to. Outbound links run through that hop so external
// domains collect no link equity from our pages, and /go/ is disallowed in
// robots.txt so the hops never get crawled or indexed themselves.
import { stories } from "./data/stories";

export const outbound: Record<string, string> = {
  instagram: "https://www.instagram.com/eco.dst.llc/",
};

// A story's map link points at whichever map service the coordinates came
// from; `${slug}-map` is the slug the portfolio page looks up.
for (const story of stories) {
  if (story.location?.mapUrl) outbound[`${story.slug}-map`] = story.location.mapUrl;
}

/** Path for an outbound link, e.g. go("instagram") -> "/go/instagram/" */
export function go(slug: string): string {
  return `/go/${slug}/`;
}
