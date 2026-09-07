// The key this site's entries carry in @dst/content, and the whole of this
// file. The sites with editorial copy keep it in a content.ts of their own;
// this one has none, but the id still belongs in one place — a site id typed
// into a page is a site id that can be typed wrong there, and it was typed
// into six of them.
export const siteId = "visas";

/**
 * The site's RSS channel. It lives here rather than in the route because
 * site.config.ts needs the title too — the head's autodiscovery link is
 * what a reader's tool reads to offer the subscription, and a title written
 * out twice is a title that drifts.
 */
export const feed = {
  title: "Dubai Residency — news",
  description: "UAE visa and residency rules as they change, each entry checked against the authority that announced it.",
  /** RFC 5646. Without it an aggregator files this site under the wrong language. */
  language: "en",
};
