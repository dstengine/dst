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
  /** Where it goes now: a path on the same site, or a full URL when the
      page left for a site of its own. */
  to: string;
  /** ISO date the address moved — this register is also a history. */
  since: string;
  /** Why, in a sentence, for whoever finds it here in a year. */
  why: string;
}

export const redirects: Record<string, Redirect[]> = {
  sol2go: [
    {
      from: "/seedgen/",
      to: "https://seedgen.uk/",
      since: "2026-10-20",
      why: "The seed phrase generator opened at sol2go.lol/seedgen/, proxied from its own Vercel project while it waited for a name, and moved to seedgen.uk the same day the domain was pointed at it. It is a tool for five chains, not a page about Solana events.",
    },
  ],
  fwf: [
    {
      from: "/events/dubai-future-forum-2026/",
      to: "/events/dubai-future-week-2026/",
      since: "2026-09-23",
      why: "The Dubai Future Forum stopped being a separate event: its own 2026 page began redirecting to Dubai Future Week, 18\u201321 November, which absorbed it. Two cards for one event on the same day, so the forum's page merged into the week's, which now carries its history and its 2025 figures.",
    },
  ],
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
  // Written into tea's vercel.json by hand on 11 October 2026 and entered
  // here on the 17th, when running tools/redirects.mjs would have dropped it.
  tea: [
    {
      from: "/guides/the-story-of-4-20-high-tea/",
      to: "/420/",
      since: "2026-10-11",
      why: "The tale of 4:20 High Tea earned a short address of its own, tea.ceo/420/, the day it was published.",
    },
    {
      from: "/guides/the-story-of-4-20-high-tea.md",
      to: "/420.md",
      since: "2026-10-11",
      why: "The Markdown twin of the same page followed it.",
    },
    {
      from: "/schedule/four-twenty-night-tea.ics",
      to: "/schedule/four-twenty-high-tea.ics",
      since: "2026-10-22",
      why: "The night tea at 04:20 was its own tea time for about an hour before it became the second time of 4:20 High Tea, whose calendar file now carries both.",
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
  // One move, thirteen pages: English came to the root and took every
  // address the Armenian had held there, so what was /en/<page>/ is now
  // /<page>/. The Armenian went to /am/ and has no redirect of its own —
  // its old addresses are the English pages now, and each one names its
  // Armenian twin in hreflang.
  tick: [
    "/",
    "/about/",
    "/concerts/",
    "/events/",
    "/events/andru-donalds-enigma-yerevan-2026/",
    "/events/elgar-enigma-variations-yerevan-2026/",
    "/events/equinox-fest-autumn-chapter-2026/",
    "/events/harry-potter-film-music-yerevan-2026/",
    "/events/romeo-juliet-deja-vu-2026/",
    "/events/tata-simonyan-yerevan-2026/",
    "/news/",
    "/news/yerevan-fashion-week-2026/",
  ].map((to) => ({
    from: `/en${to}`,
    to,
    since: "2026-10-04",
    why: "tick launched in Armenian at the root and English under /en/; within hours English, the default, took the root and Armenian moved to /am/.",
  })).concat(
    [
      ["/en/events/lyubov-uspenskaya-yerevan-2027/", "/concerts/"],
      ["/events/lyubov-uspenskaya-yerevan-2027/", "/concerts/"],
      ["/am/events/lyubov-uspenskaya-yerevan-2027/", "/am/concerts/"],
    ].map(([from, to]) => ({
      from,
      to,
      since: "2026-10-13",
      why: "The Lyubov Uspenskaya concert was withdrawn, since tick keeps its ties to Russia to a minimum; its page goes to the concerts it was listed under.",
    })),
    [
      ["/events/devfest-armenia-2026/", "/devfest/"],
      ["/am/events/devfest-armenia-2026/", "/am/devfest/"],
      ["/news/snoop-dogg-yerevan-concert-status/", "/snoop-dogg/"],
      ["/am/news/snoop-dogg-yerevan-concert-status/", "/am/snoop-dogg/"],
    ].map(([from, to]) => ({
      from,
      to,
      since: "2026-10-17",
      why: "The two pages tick pushes hardest took short addresses of their own at the root, the words people type: tick.am/devfest and tick.am/snoop-dogg.",
    })),
  ),
};

export const redirectsFor = (site: string): Redirect[] => redirects[site] ?? [];

/** A host a site has left. Every path on it goes to the same path on the
    site's host now, so one rule moves the whole index. */
export interface HostMove {
  /** The old host: "tick.lnd.lol". */
  from: string;
  /** The host the site answers on now. */
  to: string;
  since: string;
  why: string;
}

export const hostMoves: Record<string, HostMove[]> = {
  tick: [
    {
      from: "tick.lnd.lol",
      to: "tick.am",
      since: "2026-10-06",
      why: "tick launched on a subdomain of lnd.lol while tick.am waited for the .am registry, which approves every registration by hand. It was approved on 6 October, and the site moved to its own name.",
    },
  ],
};

export const hostMovesFor = (site: string): HostMove[] => hostMoves[site] ?? [];
