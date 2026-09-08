// Addresses that used to exist, and where they went.
//
// A page that has ever been indexed is a page someone may still link to, so
// when its URL moves the old one owes a 301 — the reader lands where they
// meant to, and the search engine moves the page rather than dropping it and
// finding a new one. Guessing is not an option: nothing else on the site
// records that /art/ was ever a page, and once it is gone from the build
// there is no trace of it to redirect from.
//
// So this is the register. One entry per address that has moved, kept
// forever: a redirect is only useful for as long as an old link survives
// somewhere, and old links outlive the reasons they were made.
//
// The redirects themselves are served by Vercel, from each app's
// vercel.json, written by tools/redirects.mjs from this file. Astro's own
// static redirects are a meta refresh, which is not a 301 and does not move
// a page in an index — hence the host, not the build.

export interface Redirect {
  /** The old path, with both slashes: "/art/". */
  from: string;
  /** Where it goes now, on the same site. */
  to: string;
  /** ISO date the address moved — this register is also a history. */
  since: string;
  /** Why, in a sentence, for whoever finds it here in a year. */
  why: string;
}

export const redirects: Record<string, Redirect[]> = {
  nyc42: [
    {
      from: "/united-states/",
      to: "/usa/",
      since: "2026-09-08",
      why: "Two changes in one day. The page had been an accident \u2014 the place rule reads country before city, so the three New York entries that happened to record a country were filed under the site's own place a second time, under the heading \"United states in New York\" \u2014 and then it became a real section, /usa/, holding the events outside the city. Same subject, shorter address: nobody types \"united-states\".",
    },
  ],
  riviera: [
    {
      from: "/united-arab-emirates/",
      to: "/events/",
      since: "2026-09-08",
      why: "A Dubai site does not have a country section: the page existed only because three of the six Dubai events also carried a country, which split one place under two names. There is no /uae/ here to send it to \u2014 the whole site is the UAE \u2014 so it goes to the full list of events, which is what the page held.",
    },
  ],
  eco: [
    {
      from: "/united-arab-emirates/",
      to: "/events/",
      since: "2026-09-08",
      why: "Same split as riviera, and it reached the two-entry threshold for one build. As there, the country is the site, so the events index is the honest destination.",
    },
  ],
  ldn: [
    {
      from: "/art/",
      to: "/exhibitions/",
      since: "2026-09-07",
      why: "Art and Exhibitions were two labels on the same five entries; the section kept the name people search for.",
    },
  ],
};

export const redirectsFor = (site: string): Redirect[] => redirects[site] ?? [];
