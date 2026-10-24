// The shape of an event and its guides. Declarations only: nothing here is
// a word of any page, so tools/lastmod.mjs leaves this file out of every
// page's date (see isChrome there).

/** Both dates of a record, full ISO with offset. tools/record-blocks.mjs
    reads them off their own lines, and tests/record-dates.test.js fails an
    edit that left `updatedAt` behind. */
export interface Dated {
  createdAt: string;
  updatedAt: string;
}

/** Where a /go/ hop leads, and what kind of page that is. The kind is what
    test:fest holds to the network's rules: no Russian host anywhere, a
    resale market only where the organiser names it (`namedBy`, sources that
    say so), a seller's document only as a plain Drive file view. */
export interface GoTarget {
  url: string;
  /** The sheet's source key (s1…); for a maps search, the sheet key of
      the organiser's instruction it follows; for an organiser's form that
      the sheet holds as an official seller with its own URL and reading
      (Field Day's MobTix form), that seller's key (`sellers.2`); for a
      seller's document, the sheet key of the link the seller's page gives
      to it (`age.links.0`), whose url, less its query, is the hop's
      (Primavera Sound São Paulo's two Drive files). */
  source: string;
  kind: "organiser" | "seller" | "resale" | "venue" | "public-body" | "press" | "seller-document" | "maps";
  /** For `resale`: the organiser's sources that name it as the official
      resale. */
  namedBy?: string[];
  /** The anchor's tooltip: what the target answers, never the link's own
      words again. In the language of `titleLang`'s guide. */
  title: string;
  /** The tooltip in each other language whose guide links the hop, keyed
      by that guide's `lang` ({ en: "…" } on a Spanish guide's hop that its
      English twin links too). A guide that links a hop with no title in
      its language fails the build (copy.ts), so no tooltip reaches a page
      in another language by accident. */
  titles?: Record<string, string>;
  /** The `lang` of the guide that `title` is written for: the first guide,
      in data order, that links the hop, else the event's first guide. Set
      by data/events/index.ts as it loads; the data never writes it. It is
      also the language of the hop's own page (pages/go/[slug].astro). */
  titleLang?: string;
}

/** A venue's address in its parts, as the markup prints it
    (FestEvent.markup.address). */
export interface PostalParts {
  streetAddress?: string;
  addressLocality: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry: string;
}

/** One channel's offer in a list (markup.offers). `availability` is the
    schema.org term without its URL ("InStock"); it perishes as a price
    does, so both print only until the guide's `prices` expiry. */
export interface Offer {
  seller: string;
  go: string;
  name?: string;
  validFrom?: string;
  /** The last day the seller sells at this price, where its source names
      one (Wonderfruit's November Sale, which its organiser ends on 9
      November): printed, and from the next day the offer is left out. */
  priceValidUntil?: string;
  availability?: "InStock" | "SoldOut";
  price?: { key: string; currency: string };
  /** The hop, the tier name and the seller as another guide's copy gives
      them, keyed by that guide's `lang`: Zamna Tulum's English twin sells
      the Multipass through its own hops and names Mr Nice VIP's tier
      "General 1st release", and Primavera Sound São Paulo's names the box
      office in English, "Working Title box office". There is one markup per
      event; what a guide does not override is shared, and the event's
      first guide never has an entry. */
  perGuide?: Record<string, { go?: string; name?: string; seller?: string }>;
}

/** One festival: the scout's sheet and the hops out of the guide. */
export interface FestEvent extends Dated {
  slug: string;
  /** The name as the organiser writes it; the crumb between the hub and a
      guide's subpage where the guide names the event no other way. */
  name: string;
  /** The edition the guides describe, ISO dates. It decides the hub's order
      and when the markup stops offering tickets (rules.ts). */
  edition: { start: string; end?: string };
  /** A read date for a sheet key that carries none of its own, with the
      reason beside it in the data. */
  readOverrides?: Record<string, string>;
  /** What the main page's MusicEvent says that the sheet holds only as
      prose: exact times with their offset, the organiser as an entity, and
      which price rows are the entry offers, sold through which /go/ hop.
      Each value names the sheet entry it was read from, beside it. */
  markup: {
    /** With its offset ("2026-12-03T16:00:00+07:00"), or, where `timeZone`
        is given, a local date and time whose offset rules.ts takes from the
        zone ("2027-01-14T19:30", Igloofest). A date alone stays a date. */
    startDate: string;
    endDate: string;
    /** The IANA zone the event's local times are in ("America/Toronto"):
        its offsets and its night cards' set times are computed from it at
        build, never written by hand. */
    timeZone?: string;
    /** The event's name in the markup, where it is not the page's h1:
        Igloofest's main page marks up Montréal's run as « Igloofest
        Montréal 2027 » (the SEO lead's D8). */
    name?: string;
    /** The sheet key of the venue ({ name, lat, lon, country }), where the
        sheet holds a list of venues rather than one `venue`
        ("venues.v1"). */
    venue?: string;
    /** The venue's address as the markup prints it, for a venue whose
        sheet address is not Australia's "street, locality STATE postcode",
        which rules.ts reads when this is absent. Region and postcode only
        where the sheet has them (Creamfields Chile's has neither). */
    address?: PostalParts;
    /** The address's parts as a later guide writes them, keyed by that
        guide's `lang` and shaped as Offer.perGuide: the event's first
        guide never has an entry, and what an entry does not name stays the
        address's. Wonderfruit's English twin names Pattaya and Chonburi,
        which the Thai guide's address gives in Thai script (the SEO lead's
        note 12, 24 October 2026). A country code and a postcode do not
        change with the language, so only the street, the locality and the
        region can. */
    perGuide?: Record<string, { address?: Partial<Pick<PostalParts, "streetAddress" | "addressLocality" | "addressRegion">> }>;
    /** The sheet key of the coordinates the markup prints ({ lat, lon }),
        where they are not the scout's venue.lat and venue.lon. */
    geo?: string;
    /** The organiser's site, where it has one, goes out as `sameAs`. */
    organizer: { name: string; url?: string };
    /** Either price rows of the sheet, one offer each, at the seller's
        price with its fee (Moshtix prints it), or one offer at one sheet
        figure (`price.key`, an { amount }), where the seller prints its
        prices without the fee and no source gives the total, or a list of
        offers, one per channel, each priced only where it names a sheet
        figure (Primavera Sound São Paulo: Ingresse and the box office,
        whose prices no source shows before a login). */
    offers:
      | { prices: number[]; go: string; seller: string; validFrom: string }
      | { price: { key: string; currency: string }; go: string; seller: string; validFrom: string }
      | Offer[];
    /** One event a day, where the guide's sheet splits the line-up by day:
        its name as the copy says it, its start with the offset, and the
        sheet key of the day's acts, each printed as a performer. Several
        keys where a night lists its acts in more than one place (Zamna
        Tulum's Anyma night: the headliner, then the ten supports), and the
        night's own offers where each night is sold on its own (Zamna
        Tulum: General and VIP through the night's page), priced as the
        event's channel offers are. A later guide names the day in its
        own words through the day's perGuide, keyed as Offer.perGuide is:
        Primavera Sound São Paulo's English twin, "Saturday 5 December". */
    subEvents?: { name: string; startDate: string; acts: string | string[]; offers?: Offer[]; perGuide?: Record<string, { name?: string }> }[];
  };
  /** Section 1 of the card, verbatim with every repair. Free-form on
      purpose: it is the scout's document, and copy.ts resolves the copy's
      [key] tags against it rather than against a schema of ours. */
  sheet: Record<string, unknown>;
  go: Record<string, GoTarget>;
}

/** A section of a page: a heading the copy gives and its text. Paragraphs
    are separated by a blank line; a paragraph of "- " lines is a list, of
    "> " lines a quotation, of several plain lines a list of lines. */
export interface Section {
  id: string;
  heading: string;
  body: string;
  /** "table" reads a paragraph of "|" lines as a table, the one-line
      paragraph before it as its caption and a lone "**label**" line as a
      subheading (copy.ts): Creamfields Chile's twelve price tables. "row"
      reads a one-line paragraph of items joined by " · " as a list whose
      items each draw the dot before them (theme.css, ul.dot-row): the
      acts of a day on Primavera Sound São Paulo's line-up page. "cards"
      reads a list whose items open with a **lead** as a column of cards,
      one a night (Zamna Tulum), each closed by the link its item ends on.
      "nights" reads a list of a line-up's nights, one line each, as
      cards: the day, each stage, each set time first (Igloofest Montréal's
      twelve, copy.ts). Every other section is prose. */
  kind?: "prose" | "table" | "row" | "cards" | "nights";
  /** In a section of kind "cards", each card's lead says whom the card is
      for (Igloofest's "Coming from abroad": "British citizens.", "US
      citizens."), so its link's hidden name reads "GOV.UK: Canada entry
      requirements, for British citizens" where it would read "…: British
      citizens" (copy.ts, guideCard; the en-GB reader on the executor's
      strings, card 2026-10-24-igloofest-en). English only. */
  cardsFor?: true;
  /** The page's ticket button opens this section, under its heading,
      instead of the top of the page (Wonderfruit: the copy puts it under
      "where to buy"). */
  cta?: true;
}

export interface FaqRow {
  q: string;
  a: string;
  /** The same answer on more than one page: shown, kept out of FAQPage. */
  generic?: boolean;
}

/** The anchor for an arrow whose sentence has no "the … page" in it: the
    director's words, held beside the copy so the copy stays verbatim. */
export interface Anchor {
  target: string;
  /** The phrase in the sentence before the arrow that becomes the link. */
  text?: string;
  /** Which occurrence of it, from 1, where the sentence says it more than
      once (Igloofest's Montréal row: « Montréal : … Vieux-Port de
      Montréal. »). */
  nth?: number;
  /** The sentence names no target of its arrow group, and the targets
      print after it under their labels (Igloofest's tickets page: « … sont
      sur sa page. » → Gatineau · Québec; the fest director's D5). */
  visible?: true;
}

/** Blocks a guide's page may carry and this one does not: each is fed from
    the page's data, and GuidePage renders nothing for a slot left empty. */
export interface Slots {
  /** A ticket button: the seller's line under it and a second link. */
  cta?: { href: string; label: string; title: string; seller?: string; secondary?: { href: string; label: string; title: string } };
  /** The facts at a glance, label and value. A value may carry [key]
      tags, which are checked and left out; it carries no link. It prints
      as text, out of typeset's reach, so a date that must not break takes
      no-break spaces in the value itself ("15 de noviembre…",
      Creamfields Chile; the fest director's gate-3 condition 3). */
  glance?: { label: string; value: string }[];
  /** The heading over them, where the guide gives one. */
  glanceHeading?: string;
  /** One small line under them: the reading date the facts share
      (Primavera Sound São Paulo's "Fontes lidas em …"). Inline copy, so
      its tags are checked and left out. */
  glanceNote?: string;
  /** A status badge and its countdown target. */
  badge?: { text: string; until?: string };
  /** A calendar file for the edition. */
  calendar?: { href: string; label: string; title: string };
  /** A map link (never a frame: the archive's CSP forbids them). */
  map?: { href: string; label: string; title: string };
}

export interface GuidePage extends Dated, Slots {
  /** The path without its slashes: "beyond-the-valley/tickets". The first
      segments are the guide's own path (routes.ts asserts it). */
  slug: string;
  kind: string;
  /** The page's name in the guide's sibling row and on the hub, in the
      guide's language. */
  label: string;
  /** The last crumb of the trail, visible and in the BreadcrumbList,
      where it is not the title less its suffix (Primavera Sound São
      Paulo's "Ingressos"). */
  crumb?: string;
  /** The tooltip of this page's link in the sibling row, which says what
      the page holds; the title less its suffix where absent. */
  navTitle?: string;
  /** The tooltip of every other link to this page: in the copy, the
      guide's crumb and the hub's row; the title less its suffix where
      absent. */
  linkTitle?: string;
  title: string;
  description: string;
  h1: string;
  /** The h1's id, where a block is labelled by it (Wonderfruit's FAQ page,
      whose questions sit under no heading of their own). */
  h1Id?: string;
  /** Runs of the h1 held on one line, each once in it (a nowrap span,
      copy.ts h1Html): a short hyphenated word strands no scrap (DESIGN.md),
      and Primavera Sound São Paulo's English line-up h1 broke "2026 line- |
      up by day" at 305 and 320 px (the line-break sweep, 24 October 2026).
      Per page, where the sweep finds the break: "line-up" in Creamfields
      Chile's, Igloofest's and Zamna Tulum's English h1s broke at none of
      its 17 widths, and those pages keep their bytes. */
  h1Keep?: string[];
  lede: string;
  /** How many of the lede's paragraphs print as the lede; the rest is the
      line on why the guide exists. One where absent. */
  ledeParas?: number;
  sections: Section[];
  faqHeading?: string;
  faq: FaqRow[];
  /** The questions before the sections, under no heading when the page
      has no `faqHeading`: a page that is its questions (Field Day's FAQ). */
  faqFirst?: boolean;
  sourcesHeading?: string;
  /** One small line under the Sources heading: the reading date most of
      them share, "(read 21 October 2026 unless dated)". */
  sourcesNote?: string;
  /** One line is one paragraph. Several lines are one source each, set as
      a row with a dot between them (copy.ts, sourcesHtml), unless every
      line opens "- ": then they are a list, one source an item. */
  sources?: string;
  links?: string;
  foot?: string;
  anchors?: Anchor[];
  /** The heading over the jump list, when a guide's language needs its own
      word for it rather than the language's (site.config.ts). */
  onThisPage?: string;
  /** The jump list, where the page names its own: a section's id or
      "questions", with a short label. Without it the list is the sections'
      headings, from five sections up. */
  jumps?: { id: string; label: string }[];
  /** A MusicEvent of the page's own, for a subpage that is an edition of
      its own at another place and time (Igloofest's Québec and Gatineau
      pages), as the event's markup is written, without offers. */
  markup?: Omit<FestEvent["markup"], "offers" | "subEvents" | "organizer"> & {
    organizer?: { name: string; url?: string } | { name: string; url?: string }[];
  };
}

/** One guide: an event in one language. */
export interface Guide extends Dated {
  /** The guide's locale; unique within its event's file. */
  slug: string;
  event: string;
  /** The event as this guide names it, year and all: the crumb between
      the hub and a subpage, the hub's heading and the guide's heading in
      llms.txt. The event's own name where absent. */
  name?: string;
  lang: string;
  dir: "ltr" | "rtl";
  /** Its home, "/beyond-the-valley/" for an event's first guide and
      "/<event>/<hl>/" for any later one. */
  path: string;
  /** The language named in itself, for the hub: "English (Australia)". */
  hubLabel: string;
  hubBlurb: string;
  /** The place on the guide's hub card, in the guide's language, where the
      locality the markup gives would mislead (Beyond The Valley's postal
      "Hesse"; Igloofest's "Montréal", one of four cities). From the
      guide's own copy. Absent, the card prints the locality and the
      country's name (rules.ts, hubCard). */
  hubPlace?: string;
  /** From these days the build drops the matching {{until key}} spans. */
  expires: Record<string, string>;
  /** Links the footer carries on this guide's pages after the hub, and a
      sentence of its own. */
  footerLinks?: { href: string; label: string; title: string; rel?: string }[];
  footerNote?: string;
  /** The row of pages' `aria-label`, where it names the event (« Pages du
      guide Igloofest ») rather than saying the language's "This guide". */
  navLabel?: string;
  /** The questions' `aria-label`, where it is not their heading
      (« Questions fréquentes sur Igloofest »). */
  faqLabel?: string;
  /** Each page says under its lede the day it last changed, the day its
      sitemap entry gives (« Mis à jour le 22 octobre 2026 »). */
  updatedLine?: true;
  /** The guide's cover, a path under public/ ("/covers/igloofest.jpg"),
      drawn by tools/covers.mjs from its line in tools/covers.json:
      abstract shapes in the site's palette, never the event's artwork, a
      logo, an act or a photograph. Decorative on the main page (a CSS
      background, aria-hidden, no caption), and the share picture of every
      page of the guide and the MusicEvent's `image`. Absent, the pages
      show none and share the site's card. */
  cover?: string;
  pages: GuidePage[];
}
