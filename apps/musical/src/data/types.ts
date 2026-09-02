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
/** What a seller is asking, as read off their own page on a named day.
    Never estimated, never carried over from another stop, never averaged:
    a made-up "from" price is the one thing on this site a reader could act
    on and be wrong about at the till.

    `from` is the cheapest seat the seller advertises for this run, in the
    major unit of `currency`. `checkedOn` is not optional, because a price
    without a date is a claim the site cannot stand behind three months
    later — see PRICE_STALE_DAYS in ../rules.ts, which stops showing it. */
export interface Price {
  from: number;
  /** Top of the advertised range, when the seller publishes one. */
  to?: number;
  /** ISO 4217: GBP, EUR, USD, AED, JPY. */
  currency: string;
  /** ISO day the number was read. Required. */
  checkedOn: string;
  /** What the number leaves out, in the seller's own terms — almost always
      the booking fee. Printed next to the price, not hidden in a tooltip. */
  note?: string;
  /** Premium, VIP and package tiers, when the seller names and prices them.
      A tier with no price is still worth listing: it tells a reader the
      option exists. */
  tiers?: { name: string; from?: number; note?: string }[];
}

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
  /** What they are asking, when somebody has looked. */
  price?: Price;
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
      a picture of *this* building — a photograph of the wrong theatre is a
      factual error on a page that names the architect. */
  image?: string;
  imageAlt?: string;
  /** CSS object-position, when the building is not in the middle of the
      frame and the opener's crop would cut it off. */
  imagePosition?: string;
  /** Attribution, and only where the source asks for it. A picture taken
      from a file page under CC BY or CC BY-SA publishes with these fields
      filled in, because being named is the one condition those licences
      set. A picture from anywhere else leaves them out and no line renders:
      we mark a licence when we know we are under one, not by default.
      The two addresses are keys in outbound.ts, not URLs: every external
      address on this site lives there and is reached through /go/,
      attribution included. */
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
  /** The city page in its own words: which houses here take a touring
      musical, and how this season sits in them. Hand-written per city and
      built only out of what the venue and run data already say, because the
      one thing a city page has that a run page has not is a reason to read
      it. Without it the page is a heading over two cards. */
  intro?: string[];
  /** A cover for the run pages set here: the view a reader recognises as
      this place, not the theatre — the theatre has its own page and its own
      photograph. Verified to be this city, because a page that names the
      city and shows another one is a factual error. */
  image?: string;
  imageAlt?: string;
  /** CSS object-position, when the subject is not in the middle and the
      cover's crop would lose it. */
  imagePosition?: string;
  /** See the same fields on Venue: credit where the licence asks for it,
      and the two addresses are outbound.ts keys, not URLs. */
  imageCredit?: string;
  imageLicense?: string;
  imageLicenseSlug?: string;
  imageSourceSlug?: string;
}

/** A tour: many runs sold as one season. It gets an overview page, but not a
    level in anyone's URL. */
export interface RunGroup {
  slug: string;
  /** The show the season belongs to. Two shows can both call their tour
      "uk" — the slug is only unique inside a show, exactly as a run's is. */
  show: string;
  name: string;
  title: string;
  blurb: string;
  body: string[];
  /** As on Section: a drawn cover, depicting nothing. */
  image?: string;
  imageAlt?: string;
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
  /** The page's cover. Drawn, not photographed, and it depicts nothing —
      there is no production photography licensed for this site, and a
      picture that looked like one would be a claim we cannot make. */
  image?: string;
  imageAlt?: string;
}

export interface Show {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  /** The show this site is built around. It gets the front page's own
      section and the header; everything else is listed in full and linked,
      which is a different job from being the site's subject. */
  featured?: boolean;
  /** The line above the title, saying what this site does with this show.
      Not every show gets the full treatment, and the page should not imply
      it does. */
  eyebrow: string;
  /** The front page's card for the show, written for that show. Not the
      summary: the summary is a description of a listing, and this is the
      line that has to make someone open it. */
  hubCard: string;
  /** When this show's listings were last read at their source. Per show,
      because they are read on the day the show is added: one date across
      two shows would be a claim about a reading that never happened.
      Pages covering both shows keep the site-wide constant, which is the
      older of the dates and therefore the safe one. */
  checkedOn: string;
  /** The opening of the show's own page: the surprising true thing first,
      the listing second. Kept in the data because it is editorial, and
      editorial belongs where the facts are, not inside a template. */
  hook: string[];
  sections: Section[];
  clips?: Clip[];
}
