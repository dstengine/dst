// The shapes every page on this site is built from. Data lives in the other
// files in this directory, the rules that read it live in ../rules.ts, and
// the URLs it turns into live in ../routes.ts. Nothing here reaches for the
// network or the filesystem: a page is a projection of these objects.
//
// Optional fields are genuinely optional. A run with no venue announced has
// no `venue`; it does not have an empty string. Every component is written
// so that a block appears together with its data and is absent otherwise —
// which is what lets one template serve a sold-out Broadway run and a stop
// whose theatre has not been named yet.

/** Somewhere tickets for a run can actually be bought. */
export interface Seller {
  /** Key in outbound.ts; the link is rendered as /go/<slug>/. */
  slug: string;
  /** As the seller calls itself — this is what a button says when a run has
      more than one of them. */
  name: string;
  /** The production's own seller, listed first. */
  official?: boolean;
  /** What this seller covers, when sellers split a run between them. */
  covers?: string;
}

export interface Venue {
  slug: string;
  name: string;
  /** City slug. */
  city: string;
  /** Set on a venue important enough to live at the root: /broadway/.
      Without it the venue is served from /venue/<slug>/. One address each,
      never both. */
  rootSlug?: string;
  address?: string;
  lat?: number;
  lon?: number;
  capacity?: number;
  /** Year or full date the venue opened, as its own source words it. */
  opened?: string;
  operator?: string;
  owner?: string;
  /** How people actually arrive: the station, the road, the car park. */
  transit?: string;
  /** Key in outbound.ts for the venue's own website. */
  officialSlug?: string;
  summary?: string;
  /** Photograph of the building, in this app's public/ folder. Every one is
      a licensed picture of *this* building, verified against the file page
      it came from — a photograph of the wrong theatre is a factual error on
      a page that names the architect. */
  image?: string;
  imageAlt?: string;
  /** CSS object-position, when the building is not in the middle of the
      frame and the opener's crop would cut it off. */
  imagePosition?: string;
  /** Attribution. The licences these pictures come under require the
      photographer's name, the licence and a way back to the original, so
      the four travel together or the picture does not ship. The two
      addresses are keys in outbound.ts, not URLs: every external address on
      this site lives there and is reached through /go/, attribution
      included. */
  imageCredit?: string;
  imageLicense?: string;
  imageLicenseSlug?: string;
  imageSourceSlug?: string;
  details?: { label: string; value: string }[];
  highlights?: { title: string; text: string }[];
  sections?: { heading?: string; paragraphs: string[] }[];
}

export interface City {
  slug: string;
  name: string;
  country: string;
  /** Forces a /<city>/ page even with a single event — see cityHasPage() in
      ../rules.ts for why that is off by default. */
  featured?: boolean;
  summary?: string;
}

/** A tour: many runs sold as one season. It gets an overview page, but not a
    level in anyone's URL. */
export interface RunGroup {
  slug: string;
  name: string;
  title: string;
  blurb: string;
  body: string[];
}

export interface Run {
  /** URL segment under the show: /chicago/<slug>/. Usually the city slug. */
  slug: string;
  show: string;
  city: string;
  group?: string;
  venue?: string;
  /** ISO dates. Absent while a run is announced without dates. */
  start?: string;
  end?: string;
  /** Playing with no closing date announced — Broadway, not a tour stop. */
  openRun?: boolean;
  sellers: Seller[];
  /** Where to ask when nothing is on sale yet — the theatre's own page for
      the run. Never rendered as a ticket button; it is not a sale. */
  infoSlug?: string;
  /** Hand-written opening for the stops worth writing about. Where it is
      absent, ../rules.ts composes one from the facts of the run. */
  summary?: string;
  runningTime?: string;
  language?: string;
  ageGuidance?: string;
  faq?: { q: string; a: string }[];
  tags?: string[];
}

/** A video that can be embedded because its uploader allows embedding —
    checked through YouTube's oEmbed endpoint before it is added. */
export interface Clip {
  id: string;
  slug: string;
  title: string;
  channel: string;
  checkedOn: string;
  /** One line under the embed, on the listing and on the clip's own page. */
  note?: string;
  /** The clip's own page. Without it the clip plays on the listing only —
      there is no page made of nothing but an embed. */
  body?: string[];
}

/** An editorial page under a show: /chicago/history/. */
export interface Section {
  slug: string;
  label: string;
  title: string;
  description: string;
  body: string[];
  /** Rendered by a template of its own rather than as plain prose. */
  template?: "history" | "online" | "tickets" | "songs";
}

export interface Show {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  /** The opening of the show's own page: the surprising true thing first,
      the listing second. Kept in the data because it is editorial, and
      editorial belongs where the facts are, not inside a template. */
  hook: string[];
  sections: Section[];
  clips?: Clip[];
}
