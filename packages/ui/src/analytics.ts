// GA4 measurement IDs.
//
// DST network (*.dst.llc) shares a single property with a single data stream
// so the cookie on .dst.llc keeps sessions intact across all verticals.
//
// Non-DST and independent sites (*.lol, musical.today, tick.am, sol2go.net, etc.)
// use a separate measurement property so their event stream and visitor traffic
// do not mix with DST Group's real-estate / corporate verticals, and so page source
// does not expose an infrastructure tie between unrelated brands.
//
// A deploy overrides either property via PUBLIC_GA_ID or PUBLIC_GA_ID_NON_DST.
// Individual sites can also declare their own `gaId` in site.config.ts.
//
// The non-DST property is "Independent sites" (560638741) in the DST
// Analytics account, created 24 Oct 2026 and shared with the ga4-reader
// service account. Its predecessor G-8M9K2P4W7X (11–24 Oct 2026) belonged
// to no account of ours: a real stream somewhere, unreadable, and the
// two weeks it collected are gone.
const CONFIGURED_DST_ID = "G-JBB43WWXW9";
const CONFIGURED_NON_DST_ID = "G-SZ1C5XNM0Y";

export const GA_MEASUREMENT_ID: string = import.meta.env.PUBLIC_GA_ID || CONFIGURED_DST_ID;
export const GA_NON_DST_MEASUREMENT_ID: string =
  import.meta.env.PUBLIC_GA_ID_NON_DST || CONFIGURED_NON_DST_ID;

/**
 * Returns the appropriate GA4 measurement ID for a given host or site configuration.
 */
export function getMeasurementId(options?: {
  host?: string;
  networkFooter?: boolean;
  gaId?: string;
}): string {
  if (options?.gaId) return options.gaId;
  const host = options?.host ?? "";
  const isDst = (host === "dst.llc" || host.endsWith(".dst.llc")) && options?.networkFooter !== false;
  return isDst ? GA_MEASUREMENT_ID : GA_NON_DST_MEASUREMENT_ID;
}
