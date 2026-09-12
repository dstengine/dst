// The site's data, its rules and its routes, re-exported from one place so a
// page imports "../content" and gets what it needs. The layers themselves
// live apart on purpose: data in ./data, decisions in ./rules.ts, URLs in
// ./routes.ts. Adding a city or a seller is a change to one file in ./data
// and to nothing else.
// The key this site's entries carry in @dst/content. One copy, because a
// site id typed into a page is a site id that can be typed wrong there.
export const siteId = "musical";

export type { City, Clip, Collection, Price, Run, RunGroup, Section, Seller, Show, Venue } from "./data/types";
export { cities } from "./data/cities";
export { collections } from "./data/collections";
export { venues } from "./data/venues";
export { runs } from "./data/runs";
export { groups } from "./data/groups";
export { shows } from "./data/shows";
export { milestones } from "./data/history";
export { songs } from "./data/songs";
export type { Song } from "./data/songs";
export type { Milestone } from "./data/history";
export * from "./rules";
export * from "./routes";

export const showBySlug = (slug: string) => shows.find((s) => s.slug === slug);

import { shows } from "./data/shows";

/** When the listings behind this site were last read. One constant rather
    than a date typed into thirty-seven pages. */
export const checkedOn = "29 August 2026";

/** What this site is, wherever it has to be said again. */
export const disclaimer =
  "Independent listings site. Every booking happens on the seller's own page, and the price and dates there are the ones that count.";

/** Where this site keeps its feed, and what the index page says it is. */
export const newsBase = "/news/";

export const news = {
  title: "Musical theatre news: what changed in the listings",
  description: "What changed in the listings on this site, each entry checked against the source that published it.",
  h1: "What changed in the listings",
  lede: `Runs announced, theatres renamed, productions that set the terms for the ones after them — each entry checked against the source that published it.`,
};

/** The run the cross-site promo block leads with. */
export const featuredRun = { show: "chicago", run: "dubai" };

/**
 * The site's RSS channel. It lives here rather than in the route because
 * site.config.ts needs the title too — the head's autodiscovery link is
 * what a reader's tool reads to offer the subscription, and a title written
 * out twice is a title that drifts.
 */
export const feed = {
  title: "Musical Today — news",
  description: "What changed in the listings: dates, venues and sellers, each entry checked against the source that published it.",
  /** RFC 5646. Without it an aggregator files this site under the wrong language. */
  language: "en",
};
