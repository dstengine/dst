// Everything this draft knows, in one file. The site is a listings site for
// musicals: cities at the root (/dubai/), shows one level down (/chicago/)
// with their own sub-pages. Both sets of URLs are generated from the arrays
// below, so adding a city or a show is a data change, not a new page.
//
// Nothing here is invented. Where a fact has not been published yet — dates,
// venue, prices — the field is simply absent and the page says so, because a
// listings site that guesses is worth less than one that admits the gap.

export interface Section {
  /** URL segment under the show: /chicago/<slug>/ */
  slug: string;
  label: string;
  title: string;
  description: string;
  body: string[];
}

export interface Run {
  city: string;          // city slug
  /** Set once a run is confirmed with dates; until then the run is "announced". */
  start?: string;
  end?: string;
  venue?: string;
  ticketSlug?: string;   // key in outbound.ts, rendered through /go/
  note: string;
}

export interface Show {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  runs: Run[];
  sections: Section[];
}

export interface City {
  slug: string;
  name: string;
  country: string;
  summary: string;
}

export const cities: City[] = [
  {
    slug: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    summary:
      "Touring musicals play Dubai in the cooler half of the year, and the 2026 season leads with Chicago. This page tracks what has actually been listed for sale rather than what has been rumoured.",
  },
];

export const shows: Show[] = [
  {
    slug: "chicago",
    title: "Chicago The Musical",
    tagline: "Kander and Ebb's 1975 vaudeville, and the longest-running American musical on Broadway.",
    summary:
      "Chicago The Musical in 2026: where it plays, what is on sale, and what the show is — with the Dubai run tracked from the day it appeared on Ticketmaster AE.",
    runs: [
      {
        city: "dubai",
        ticketSlug: "chicago-dubai",
        note: "Listed on Ticketmaster AE. Dates, venue and prices are not repeated here until they are read off that listing.",
      },
    ],
    sections: [
      {
        slug: "dubai",
        label: "Dubai 2026",
        title: "Chicago The Musical in Dubai, 2026",
        description:
          "What is known about the Chicago The Musical run in Dubai in 2026: the listing it appears on, and the details that have not been announced.",
        body: [
          "Chicago The Musical is listed for Dubai on Ticketmaster AE. That listing is the only thing this page treats as a fact; everything else about the run — the venue, the exact dates, the price bands, the cast — is either unannounced or has not been checked here yet.",
          "The button above goes to that listing. It is the seller's page, not ours: this site sells nothing and takes no booking. If a page elsewhere gives you a hall and a date for this run, check where it got them before you book a flight around them.",
        ],
      },
      {
        slug: "about",
        label: "About the show",
        title: "What Chicago The Musical is",
        description:
          "Chicago The Musical explained: the story, the songs, the running time to expect, and whether it suits the night out you had in mind.",
        body: [
          "Chicago is a musical with music by John Kander, lyrics by Fred Ebb, and a book by Ebb and Bob Fosse, based on Maurine Dallas Watkins's 1926 play. It follows Roxie Hart, a chorus girl who shoots her lover, and Velma Kelly, a vaudeville performer on the same murderers' row — both of them working the press and a showman lawyer to turn a trial into a career.",
          "The staging is deliberately bare: the band sits on stage, the numbers are announced like vaudeville turns, and the dancing is Fosse's — angled hips, turned-in knees, a hat and a held pause. If you know one thing from it, it is \"All That Jazz\"; the others people leave humming are \"Cell Block Tango\" and \"Razzle Dazzle\".",
          "It is a satire about celebrity and crime, played for laughs and sex rather than sentiment. Touring productions usually run about two and a half hours with an interval, and it is normally billed for teenagers and up rather than for small children — confirm the age guidance with the venue for the run you are booking.",
        ],
      },
      {
        slug: "history",
        label: "History",
        title: "Chicago The Musical: a short history",
        description:
          "From the 1926 courtroom play to the 1975 original, the 1996 revival that never closed, and the 2002 film.",
        body: [
          "The source is journalism. Maurine Dallas Watkins covered the 1924 Chicago murder trials of Beulah Annan and Belva Gaertner for the Chicago Tribune, then turned them into a 1926 play — Roxie and Velma are those two defendants with the names changed.",
          "Kander, Ebb and Fosse's musical version opened on Broadway in 1975 with Gwen Verdon and Chita Rivera. It ran respectably and was largely overshadowed at the time by A Chorus Line, which opened the same year.",
          "The 1996 revival is the one that turned Chicago into a fixture. Staged as a concert with the orchestra on stage, it became the longest-running American musical on Broadway and seeded the touring and West End productions that still play worldwide. The 2002 film adaptation won the Academy Award for Best Picture and brought a second wave of audiences to the stage show.",
        ],
      },
      {
        slug: "online",
        label: "Watch online",
        title: "Chicago The Musical online",
        description:
          "Where Chicago The Musical can be watched or heard legally, and why there is no full stage recording to stream.",
        body: [
          "There is no authorised full recording of the stage production to stream. What exists legally is the 2002 film, the original and revival cast albums, and the clips the productions publish themselves — award-show numbers, trailers and rehearsal footage on official channels.",
          "This page will embed those official clips rather than link out to reuploads. Until each one has been checked as an official upload, it stays empty: a page of dead or infringing embeds is worse than a page that says there is nothing to show yet.",
        ],
      },
    ],
  },
];

export const showBySlug = (slug: string) => shows.find((s) => s.slug === slug);
export const cityBySlug = (slug: string) => cities.find((c) => c.slug === slug);
export const showsInCity = (city: string) => shows.filter((s) => s.runs.some((r) => r.city === city));

/** When the listings behind this site were last read. One constant rather
    than a date typed into five pages. */
export const checkedOn = "29 August 2026";

/** What this site is, wherever it has to be said again. */
export const disclaimer =
  "Independent listings site. Not a producer, not a venue and not a ticket seller — every booking happens on the seller's own page, and prices and dates should be confirmed there.";
