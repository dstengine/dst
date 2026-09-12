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
  //
  // Optional, because some things worth publishing have no address to point
  // at: an organiser whose domain no longer resolves, a programme announced
  // on paper, a fact that came from somewhere that cannot be linked. The
  // rule the URL was standing in for is not "there is a link" but "the
  // reader is told where this came from", and `name` carries that on its
  // own — it is the part that renders. What a missing URL costs is the
  // /go/ hop and nothing else: SourceLine prints the name either way.
  url?: string;
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
  // When this entry was first published and when its text last changed,
  // full ISO with offset. These are the two dates the sitemap is built
  // from, and they are written down rather than inferred.
  //
  // They used to be read out of git: the entry was located by its slug and
  // dated by `git log -L` over its own lines. That worked for an entry and
  // for nothing else. An index page has no lines of its own, so it was
  // dated by whichever file happened to name it — a routing vocabulary
  // entry, in the case of a section — and a page created today could claim
  // to be four days old. Worse, the inference needed a cache to keep its
  // own noise down, and a run made before the change was committed froze a
  // wrong date behind a matching hash, permanently and silently.
  //
  // A field cannot be wrong about which lines belong to it. What it can be
  // is forgotten, so `npm run test:content` fails when an entry's text
  // moved and `updatedAt` did not, and `node tools/item-dates.mjs` fills in
  // what is missing from history.
  createdAt: string;
  updatedAt: string;
  title: string;
  // Shown on the feed card instead of `title`. The card column is about
  // 215px wide, and a headline past roughly 45 characters wraps to four
  // lines there: the row grows to match and the summary beneath it is
  // clamped to three lines and cut mid-sentence. The full `title` stays on
  // the card's own anchor as its title attribute, and remains the h1 on the
  // page the card leads to — this shortens what is drawn, not what is said.
  cardTitle?: string;
  // Used for <title> and og:title instead of `title`. Those compete in a
  // search result against a 60-character budget that the site's own suffix
  // eats into first, which is a constraint the h1 does not have: the h1 sits
  // under a header that has already said which site this is. Set this only
  // when the headline genuinely does not fit — a title that differs from the
  // h1 for no reason is a title Google is more likely to rewrite.
  titleSeo?: string;
  summary: string; // list blurb + meta description
  // Facts added after publication, oldest first. A story that is still
  // moving is better served by one page that grows than by a second page
  // repeating it: the URL keeps whatever it has earned, and a reader coming
  // back can see what is new without rereading the rest. Each entry carries
  // the date the fact arrived, not the date it was written about.
  updates?: { on: string; text: string }[];
  body?: string[]; // absent -> no detail page (rule 7)
  source?: Source;
  category?: string;
  image?: string;
  imageAlt?: string;
  imageKind?: ImageKind; // absent -> no claim is made either way
  imageCredit?: string; // who made or supplied it
  // When and where the picture was taken. A photograph of a past show on
  // the page of a future one is honest only if the page says so: without
  // this line the reader takes it for a picture of the night being sold.
  imageCaption?: string;
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
  // Where it is. On an event that is the venue's city; on an article it is
  // the place the piece is about, which is why both live here rather than
  // on the event alone — a report on a festival in another state is as
  // much a thing with a location as the festival is, and the section pages
  // are built from this field.
  city?: string;
  // Named rather than derived from the city, because a lookup table of every
  // city a listing might carry is a table that is wrong the first time an
  // event happens somewhere new. It is what the country section pages are
  // built from, so a missing one silently drops an event out of its own
  // country — hence: fill it in whenever a city is filled in.
  country?: string;
  // The questions a reader types instead of reading the page: on an event,
  // what it costs, what time it starts, whether a ticket is needed in
  // advance; on an article, whatever it is the piece actually settles.
  // Each one is a search of its own, and an answer written as a whole
  // sentence is the answer a search engine can lift — which is the only
  // reason to keep them separate from `body` rather than folding them into
  // it. `generic` marks an answer that is the same on every page; those show
  // to a reader and stay out of the markup. Same rule as everywhere else:
  // only what the source says, and no question invented to have four of them.
  faq?: { q: string; a: string; generic?: boolean }[];
  // Where this sits among the site's items of this kind, for the front page.
  // 1 is the one to lead with, and only a handful on a site get a number at
  // all — a feed where everything is highlighted highlights nothing.
  // Ranked rather than a boolean because "the most important thing that
  // hasn't happened yet" is a different question from "is this important",
  // and the front page has to answer the first one.
  featured?: number;
}

/** One person on an event's programme, as their organiser publishes them. */
export interface Speaker {
  name: string;
  /** Their title, in the organiser's own words: "Executive Director of Markets". */
  role?: string;
  /** The body they speak for. Separate from `role` so the markup can say `affiliation`. */
  org?: string;
  /** One clause on why this name matters. Plain text — this is not a body block. */
  note?: string;
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
  // An event that happens on a call rather than in a room. The glance table
  // used to tell every reader an event was "In person", which for a Discord
  // community call is simply untrue, and the markup said the same thing to
  // search engines. Set this and both say Online instead.
  online?: boolean;
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

  // The people on the programme, as the organiser publishes them. A named
  // speaker is the one fact on a conference page that a reader recognises —
  // "140+ speakers" tells nobody whether to go, and one regulator's name
  // does. Everything here is copied from a source that names them; a person
  // is never inferred from a job title or a past edition, and a line-up that
  // has not been announced simply has no entry.
  //
  // `role` and `org` stay separate so the markup can say `affiliation`, and
  // `note` carries the reason this person is worth the line — that is the
  // part a listing normally leaves out and the part a reader is deciding on.
  speakers?: Speaker[];
  // What to call them, when "Speakers" is the wrong word: a jury, a
  // line-up, the states taking part. Written in the site's own language,
  // because it replaces a translated label.
  speakersHeading?: string;
  // Who the event is addressed to, in the organiser's own terms. Short
  // phrases, not sentences — this renders as a row of tags.
  audience?: string[];
  // What actually came of it, written after the fact. Ticketing platforms
  // leave a past event as a dead page advertising a date that has gone;
  // an entry that says what happened stays worth landing on.
  outcome?: string[];
}
