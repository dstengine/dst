// The site's data, its rules and its routes, re-exported from one place so a
// page imports "../content" and gets what it needs. The layers themselves
// live apart on purpose: data in ./data, decisions in ./rules.ts, URLs in
// ./routes.ts. Adding a city or a seller is a change to one file in ./data
// and to nothing else.
export type { City, Clip, Run, RunGroup, Section, Seller, Show, Venue } from "./data/types";
export { cities } from "./data/cities";
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
  "Independent listings site. Not a producer, not a venue and not a ticket seller — every booking happens on the seller's own page, and prices and dates should be confirmed there.";

/** The run the cross-site promo block leads with. */
export const featuredRun = { show: "chicago", run: "dubai" };
