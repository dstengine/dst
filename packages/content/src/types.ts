// Shared shape for every site's news/events feed. A separate workspace
// package rather than living in @dst/ui or an app, because dst.llc's hub
// aggregates every vertical's feed and cross-importing between apps/*
// would break each app's isolated Vercel build (own Root Directory per app).

export interface Source {
  name: string; // rendered as plain text
  // Audit trail: never rendered as a link in body copy or in JSON-LD. An
  // event page may send a reader here through its /go/ hop when there is no
  // seller to send them to instead — see the ticket button in
  // @dst/ui/EventArticle.astro.
  url: string;
  verifiedOn?: string; // ISO date the claim was last checked against the source; rendered
}

// Whether a picture is evidence or an impression. Property listings across
// this market routinely present renders as photographs; saying which is
// which costs nothing and is the whole difference between the two.
// "diagram" is a drawing of real figures; "illustration" is a picture that
// isn't. Calling a chart an illustration reads as if the numbers in it were
// invented too.
// "render" is a developer's visualisation of something not built yet;
// "generated" is a machine-made image of no particular place. Naming the
// second separately matters — calling it an illustration would hide the
// one thing a reader would want to know about it.
export type ImageKind = "photo" | "diagram" | "illustration" | "render" | "generated";

// Maps onto @dst/ui/VentureGrid.astro's VentureCardItem.
export interface RelatedCard {
  href: string;
  title: string;
  text: string;
  image?: string;
  imageAlt?: string;
  eyebrow?: string;
}

export interface Geo {
  name: string;
  lat: number;
  lng: number;
  mapUrl?: string;
}

// Title/description/label live here, not derived from the item's own
// title — a lead form asks its own question, not a rephrasing of the
// headline above it.
export interface ItemForm {
  title?: string;
  description?: string;
  submitLabel?: string;
  meta?: Record<string, string>; // -> lead.meta.* via LeadForm's slot
}

interface ItemBase {
  slug: string;
  site: string;
  title: string;
  summary: string; // list blurb + meta description
  body?: string[]; // absent -> no detail page (rule 7)
  source?: Source;
  category?: string;
  image?: string;
  imageAlt?: string;
  imageKind?: ImageKind; // absent -> no claim is made either way
  imageCredit?: string; // who made or supplied it
  // Intrinsic size, so the browser reserves the space before the file
  // arrives. Without it the article reflows as the picture loads, which is
  // what Core Web Vitals measures as layout shift.
  imageWidth?: number;
  imageHeight?: number;
  // Portrait variant served to narrow screens. A diagram legible on a
  // desktop is unreadable scaled into a phone column, and a landscape
  // viewBox has no room for type large enough to fix that.
  imageNarrow?: string;
  related?: RelatedCard[];
  geo?: Geo;
  form?: ItemForm;
  expertise?: string;
  jsonLd?: Record<string, unknown>; // manual override of the auto-built block
}

export interface NewsItem extends ItemBase {
  date: string; // ISO "YYYY-MM-DD"
}

export interface EventItem extends ItemBase {
  start: string; // ISO "YYYY-MM-DD"
  end?: string;
  // Local clock time, "HH:MM". A date alone answers "which day" but not
  // "morning or evening", which is the first thing anyone deciding whether
  // to attend needs. Omitted rather than guessed when the organiser hasn't
  // published it.
  startTime?: string;
  endTime?: string;
  // Fixed offset, not an IANA zone: the UAE has no daylight saving, so
  // +04:00 is correct year-round and needs no zone database to resolve.
  // Set explicitly for an event held outside the Gulf.
  utcOffset?: string;
  venue?: string;
  city?: string;
  organizer?: string;
  ticket?: { url: string; label?: string }; // -> /go/<slug>/, visible button
  // What a seat costs and until when. A ticketing platform puts this at the
  // top of its page because it is the second question after the date, and a
  // listing that makes someone click through to a third party to learn the
  // price has sent them away before it was any use to them. It also feeds
  // the AggregateOffer in the event's markup, which is what puts a price
  // range in a search result.
  tickets?: {
    priceFrom?: number;
    priceTo?: number;
    currency?: string; // ISO 4217, e.g. "USD" — defaults to AED for a UAE event
    salesEnd?: string; // ISO "YYYY-MM-DD"
    refundPolicy?: string;
  };
  // The programme as the organiser frames it: one entry per track, theme or
  // session. Separate from `body` because these are a list of parallel
  // things, and a list set as running paragraphs reads as neither.
  programme?: { heading: string; text: string }[];
  // Who the event is addressed to, in the organiser's own terms. Short
  // phrases, not sentences — this renders as a row of tags.
  audience?: string[];
  // Where this sits among the site's events, for the front page. 1 is the
  // one to lead with, and only a handful of events on a site get a number
  // at all — a feed where everything is highlighted highlights nothing.
  // Ranked rather than a boolean because "the most important event that
  // hasn't happened yet" is a different question from "is this important",
  // and the front page has to answer the first one.
  featured?: number;
  // What actually came of it, written after the fact. Ticketing platforms
  // leave a past event as a dead page advertising a date that has gone;
  // an entry that says what happened stays worth landing on.
  outcome?: string[];
}
