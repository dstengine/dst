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
      (Field Day's MobTix form), that seller's key (`sellers.2`). */
  source: string;
  kind: "organiser" | "seller" | "resale" | "venue" | "public-body" | "press" | "seller-document" | "maps";
  /** For `resale`: the organiser's sources that name it as the official
      resale. */
  namedBy?: string[];
  /** The anchor's tooltip: what the target answers, never the link's own
      words again. */
  title: string;
}

/** One festival: the scout's sheet and the hops out of the guide. */
export interface FestEvent extends Dated {
  slug: string;
  /** The name as the organiser writes it; the crumb between the hub and a
      guide's subpage. */
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
    startDate: string;
    endDate: string;
    organizer: { name: string; url: string };
    offers: { prices: number[]; go: string; seller: string; validFrom: string };
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
  /** Reserved for the price tables a later guide brings (Creamfields);
      every section is prose until a card ships one and checks it at 320. */
  kind?: "prose" | "table";
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
  text: string;
}

/** Blocks a guide's page may carry and this one does not: each is fed from
    the page's data, and GuidePage renders nothing for a slot left empty. */
export interface Slots {
  /** A ticket button: the seller's line under it and a second link. */
  cta?: { href: string; label: string; title: string; seller: string; secondary?: { href: string; label: string; title: string } };
  /** The facts at a glance, label and value. */
  glance?: { label: string; value: string }[];
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
  title: string;
  description: string;
  h1: string;
  lede: string;
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
      a row with a dot between them (copy.ts, sourcesHtml). */
  sources?: string;
  links?: string;
  foot?: string;
  anchors?: Anchor[];
  /** The heading over the jump list, when a guide's language needs its own
      word for it rather than the language's (site.config.ts). */
  onThisPage?: string;
}

/** One guide: an event in one language. */
export interface Guide extends Dated {
  /** The guide's locale; unique within its event's file. */
  slug: string;
  event: string;
  lang: string;
  dir: "ltr" | "rtl";
  /** Its home, "/beyond-the-valley/" for an event's first guide and
      "/<event>/<hl>/" for any later one. */
  path: string;
  /** The language named in itself, for the hub: "English (Australia)". */
  hubLabel: string;
  hubBlurb: string;
  /** From these days the build drops the matching {{until key}} spans. */
  expires: Record<string, string>;
  /** Links the footer carries on this guide's pages after the hub, and a
      sentence of its own. */
  footerLinks?: { href: string; label: string; title: string }[];
  footerNote?: string;
  pages: GuidePage[];
}
