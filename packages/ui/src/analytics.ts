// GA4 for the whole network.
//
// One measurement ID across all five sites on purpose. They are all
// *.dst.llc, so a single property with a single data stream keeps the
// cookie on .dst.llc and a session intact as someone moves between them —
// which is the whole point of cross-linking the verticals. Five separate
// properties would cut that one journey into five unrelated visits.
//
// The measurement ID is not a secret (it ships in the page source), so it
// can live here. PUBLIC_GA_ID overrides it if a deploy wants a different
// property — a staging one, say.
const CONFIGURED_ID = "G-JBB43WWXW9";

export const GA_MEASUREMENT_ID: string = import.meta.env.PUBLIC_GA_ID || CONFIGURED_ID;
