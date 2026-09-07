import { feed } from "./content";

export const site = {
  siteName: "Azizi Riviera",
  titleSuffix: "Azizi Riviera Guide",
  // What this site is for, in one phrase, for tools/seo-check.mjs and for
  // BaseLayout: the words that have to appear in the title, the h1 and the
  // description of every page a reader could arrive on from a search — and
  // the words the title suffix exists to supply when they are missing.
  keyword: "Azizi Riviera",
  complianceNote:
    "Independent local guide, not affiliated with Azizi Developments. Shops, amenities and transit change; check anything time-sensitive.",
  partnerDisclosure: true,
  // Default page opener for the whole site. Any page can override it by
  // setting its own `image` (and `imageAlt`) in content.ts.
  headerImage: "/riviera.jpg",
  headerImageAlt:
    "Illustration of the Azizi Riviera promenade at night: lit low-rise blocks along a canal, palms and walkways at the water's edge.",
  // Machine-made, of no particular building. Said on the page rather than
  // only in the alt text, since an opener this size reads as a photograph.
  headerImageKind: "generated" as const,
  /** Turns on the RSS autodiscovery link in the head. */
  feedTitle: feed.title,
};
