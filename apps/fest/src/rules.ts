// The decisions the pages make from the data, in one place and with no
// markup: which day it is, what has expired, the order of the hub and what
// each of its cards says, what the event's structured data says, and what a
// title must be.
import { hasEnded, lastDay } from "@dst/content/when";
import type { FestEvent, Guide, GuidePage, Offer } from "./data/types";
import { expired, inline, pathOf, resolve, SITE, withoutSuffix, zoneOffset, type Ctx } from "./copy";
import { coverStyle } from "./cover";
import { hub } from "./hub";

/** The day the build is for, ISO. `FEST_TODAY` sets it, so the expiry of a
    price can be built and tested before the day comes (and a session on
    another card can run the suites green on the day it does). UTC, which is
    what Vercel builds in. */
export function today(): string {
  const set = process.env.FEST_TODAY;
  if (set && !/^\d{4}-\d{2}-\d{2}$/.test(set)) throw new Error(`FEST_TODAY=${set}: not an ISO day`);
  return set || new Date().toISOString().slice(0, 10);
}

export const eventOf = (events: FestEvent[], guide: Guide): FestEvent => {
  const event = events.find((e) => e.slug === guide.event);
  if (!event) throw new Error(`guide ${guide.slug} names event "${guide.event}", which no file has`);
  return event;
};

export const mainPage = (guide: Guide): GuidePage => {
  const main = guide.pages.find((p) => pathOf(p) === guide.path);
  if (!main) throw new Error(`${guide.event}/${guide.slug}: no page at the guide's own path ${guide.path}`);
  return main;
};

/** The first guide of each event, in data order: the one whose page is
    the event's x-default (routes.ts, alternatesFor) and whose card the hub
    prints. An event's further guides are its twins, each a chip on that
    card (twinsOf), never a card of their own. */
export const firstGuides = (guides: Guide[]): Guide[] =>
  guides.filter((guide, i) => guides.findIndex((g) => g.event === guide.event) === i);

/** The guides of the same event after this one, in data order: Zamna
    Tulum's English twin, after its Mexican Spanish guide. */
export const twinsOf = (guides: Guide[], guide: Guide): Guide[] =>
  guides.filter((g, i) => g.event === guide.event && i > guides.indexOf(guide));

/** The hub's order: editions still to come or on now by their first day,
    soonest first; then the ones that have ended, the most recent first;
    ties by the event's name, then the guide's locale. A reader looking for
    their festival finds the next ones at the top, and a guide whose edition
    is over does not sit above one that is about to start because it was
    written later. */
export function hubOrder(guides: Guide[], events: FestEvent[], day: string): Guide[] {
  return [...guides].sort((a, b) => {
    const ea = eventOf(events, a).edition;
    const eb = eventOf(events, b).edition;
    const enda = hasEnded(ea, day);
    const endb = hasEnded(eb, day);
    if (enda !== endb) return enda ? 1 : -1;
    const by = enda ? lastDay(eb).localeCompare(lastDay(ea)) : ea.start.localeCompare(eb.start);
    return by || eventOf(events, a).name.localeCompare(eventOf(events, b).name) || a.slug.localeCompare(b.slug);
  });
}

/** The hub's sections: the editions not yet ended by the month they start,
    in hubOrder's order, each headed by the month's name as Intl prints it
    ("November 2026"); then the ended ones under "Past editions", most
    recent first. A season that has begun stays under the month it opened,
    and its card's own dates say when it ends. The ids are the jump list's
    anchors: "m-2026-11", ..., "past". One card per event: each event's
    first guide, its twins in the card's row (firstGuides). */
export interface HubSection { id: string; heading: string; title: string; guides: Guide[] }
export function hubSections(guides: Guide[], events: FestEvent[], day: string): HubSection[] {
  const monthName = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
  const sections: HubSection[] = [];
  for (const guide of hubOrder(firstGuides(guides), events, day)) {
    const edition = eventOf(events, guide).edition;
    const ended = hasEnded(edition, day);
    const month = edition.start.slice(0, 7);
    const id = ended ? "past" : `m-${month}`;
    let section = sections.find((s) => s.id === id);
    if (!section) {
      const heading = ended ? hub.pastHeading : monthName.format(new Date(`${month}-01T00:00:00Z`));
      section = { id, heading, title: ended ? hub.pastTitle : hub.monthTitle(heading), guides: [] };
      sections.push(section);
    }
    section.guides.push(guide);
  }
  return sections;
}

/** The jump list's items, one per section, each link's title saying more
    than its label (OnThisPage renders them from five sections up). */
export const hubJumps = (sections: HubSection[]) => sections.map((s) => ({ id: s.id, label: s.heading, title: s.title }));

/** An edition's dates as the card prints them, in the guide's language and
    the Gregorian calendar (a Thai date says 2026, not 2569): the whole
    string as Intl prints it, and its two ends, each a <time> that never
    splits, with what Intl puts between them cut at the space after the
    dash, the one place the line may break ("31 de dic de 2026 – 10 de ene
    de 2027" is wider than a 292 px card). A range Intl joins with no space
    ("3–7 ธ.ค. 2026") has no gap and stays whole. `datetime` is the ISO day
    or the interval, for the tests and the Markdown twin: HTML's datetime
    has no interval, so the page gives each end its own. */
export interface HubDates {
  text: string;
  datetime: string;
  ends: { text: string; datetime: string }[];
  joint: string;
  gap: string;
}
export function hubDates(edition: FestEvent["edition"], lang: string): HubDates {
  const format = new Intl.DateTimeFormat(lang, { day: "numeric", month: "short", year: "numeric", calendar: "gregory", timeZone: "UTC" });
  const at = (iso: string) => new Date(`${iso}T00:00:00Z`);
  const { start, end } = edition;
  if (!end || end === start) {
    const text = format.format(at(start));
    return { text, datetime: start, ends: [{ text, datetime: start }], joint: "", gap: "" };
  }
  const parts = format.formatRangeToParts(at(start), at(end));
  const text = parts.map((p) => p.value).join("");
  const dash = parts.findIndex((p) => p.source === "shared" && p.type === "literal" && /[\u2013\u2014-]/.test(p.value));
  // A locale that joins its range some other way: each end in full, as
  // Intl prints a single day, around an en dash.
  if (dash < 0)
    return { text, datetime: `${start}/${end}`, ends: [{ text: format.format(at(start)), datetime: start }, { text: format.format(at(end)), datetime: end }], joint: " \u2013", gap: " " };
  const literal = parts[dash].value;
  const gap = /\s+$/u.exec(literal)?.[0] ?? "";
  const side = (from: number, to?: number) => parts.slice(from, to).map((p) => p.value).join("");
  return {
    text,
    datetime: `${start}/${end}`,
    ends: [{ text: side(0, dash), datetime: start }, { text: side(dash + 1), datetime: end }],
    joint: literal.slice(0, literal.length - gap.length),
    gap,
  };
}

/** Where the edition is, on its card: the guide's own `hubPlace` where it
    has one, else the locality the MusicEvent prints (the markup's address,
    or the Australian venue's address read in parts) and the country's name
    in the guide's language. */
function placeOf(event: FestEvent, guide: Guide): string {
  if (guide.hubPlace) return guide.hubPlace;
  const markup = event.markup;
  const venue = (markup.venue ? resolve(event.sheet, markup.venue) : event.sheet.venue) as Venue | undefined;
  const locality = markup.address?.addressLocality ?? (venue?.address ? australian(event.slug, venue.address).addressLocality : undefined);
  const code = markup.address?.addressCountry ?? venue?.country;
  const country = code ? new Intl.DisplayNames(guide.lang, { type: "region" }).of(code) : undefined;
  return [locality, country].filter(Boolean).join(", ");
}

/** One guide's card on the hub, everything HubEntry.astro prints and
    nothing it decides: the name and its link, the cover (absent: the dates
    go on the panel, and the meta line carries them as hidden text, since
    the panel is hidden from a screen reader), the dates, the place and the
    language, the blurb, and the row of the guide's other pages, ending in
    one chip for each of the event's guides in another language (`twins`,
    the caller's rules.twinsOf: Zamna Tulum's "English"), each with its
    language, its main page's link title, the event's name as that guide
    gives it, and that page's description for the Markdown twin. (The
    words between a page's label and the event's name, for a screen
    reader's list of links, are the language's chrome: HubEntry takes them
    from site.config.ts, which node's test runner cannot import from
    here.) */
export interface HubCard {
  name: string;
  href: string;
  lang: string;
  dir: "ltr" | "rtl";
  linkTitle: string;
  coverStyle?: string;
  onCover: boolean;
  dates: HubDates;
  when?: HubDates;
  place: string;
  label: string;
  blurb: string;
  pages: { href: string; label: string; title: string }[];
  twins: { href: string; label: string; lang: string; dir: "ltr" | "rtl"; title: string; name: string; description: string }[];
}
export function hubCard(event: FestEvent, guide: Guide, day: string, host: string, twins: Guide[]): HubCard {
  const main = mainPage(guide);
  const ctx: Ctx = { event, guide, today: day, where: `/ (${event.slug}/${guide.slug})` };
  const dates = hubDates(event.edition, guide.lang);
  const onCover = !guide.cover;
  return {
    name: guide.name ?? event.name,
    href: guide.path,
    lang: guide.lang,
    dir: guide.dir,
    linkTitle: main.linkTitle ?? withoutSuffix(main.title),
    ...(guide.cover ? { coverStyle: coverStyle(guide.cover, host) } : {}),
    onCover,
    dates,
    ...(onCover ? {} : { when: dates }),
    place: placeOf(event, guide),
    label: guide.hubLabel,
    blurb: inline(guide.hubBlurb, ctx),
    pages: guide.pages
      .filter((p) => p !== main)
      .map((p) => ({ href: pathOf(p), label: p.label, title: p.linkTitle ?? withoutSuffix(p.title) })),
    twins: twins.map((twin) => {
      const own = mainPage(twin);
      return {
        href: twin.path,
        label: twin.hubLabel,
        lang: twin.lang,
        dir: twin.dir,
        title: own.linkTitle ?? withoutSuffix(own.title),
        name: twin.name ?? event.name,
        description: own.description,
      };
    }),
  };
}

/** A guide page's trail below the hub: the guide's own page under the
    event's name as the guide gives it, then this page under its crumb, or
    its title without the suffix where it has none. GuidePage prints it and
    [...path].astro gives it to the structured data whole (BaseLayout's
    crumbTrail), so the two cannot part: a guide in a second language sits
    at /zamna-tulum/en/, where a trail walked from the address would name
    /zamna-tulum/ and a crumb "En". */
export function guideTrail(event: FestEvent, guide: Guide, page: GuidePage): { crumbs: { href: string; label: string; title: string }[]; current: string } {
  const main = mainPage(guide);
  return {
    crumbs: page === main ? [] : [{ href: guide.path, label: guide.name ?? event.name, title: main.linkTitle ?? withoutSuffix(main.title) }],
    current: page.crumb ?? withoutSuffix(page.title),
  };
}

/** A price row of the sheet. `total` is the seller's price with its fee,
    where the seller prints both (Moshtix): it is what a buyer pays, which
    is what Google's Event reference asks an offer's price to be. */
interface Price { label: string; amount: number; total?: number; currency: string; status?: string }

/** Sold out in the seller's own words: Megatix's "sold out", Moshtix's
    "Allocation Exhausted". */
const soldOut = (status = "") => status === "sold out" || status.startsWith("Allocation Exhausted");
interface Venue { name: string; address: string; lat: number; lon: number; country: string }

/** The MusicEvent for a guide's main page: one event, one URL, so the
    subpages carry none. A plain "MusicEvent" with Festival as its
    additionalType keeps Google's event parser reading it. Offers carry the
    seller's face value until the guide's `prices` expiry, then only their
    hop and availability; once the edition has ended, no offers at all. The
    expiry is the day we take our figures down, not a day the seller stops
    selling at them, so it is never printed as `priceValidUntil`: an offer
    names only the dates its sources give. Where a source does give the
    last day of a sale (Wonderfruit's November Sale, which its organiser
    ends on 9 November), the offer prints it, and from the next day is left
    out; with every offer gone, the event has none (the SEO lead's gate-3
    condition 4 on Wonderfruit). No performer (the organiser ranks no act).
    The image is the guide's cover, the abstract picture its main page
    shows (Google's Event reference recommends one), and none where the
    guide has no cover. Where the sheet splits the line-up
    by day (Primavera Sound São Paulo), each day is a subEvent at the same
    place, its acts the performers by name as the organiser lists them,
    each a PerformingGroup: the sheet does not say which act is one
    person. A subpage that is an edition of its own, at its own place and
    dates (Igloofest's Québec and Gatineau), carries its own MusicEvent
    from its own markup, with no offers: one event, one URL, three
    editions. The venue is the sheet's `venue`, or the item of its list
    of venues the markup names; a local time takes its offset from the
    markup's zone. */
export function musicEvent(event: FestEvent, guide: Guide, page: GuidePage, day: string): Record<string, unknown> {
  const url = `${SITE}${pathOf(page)}`;
  const markup: FestEvent["markup"] | NonNullable<GuidePage["markup"]> = page.markup ?? event.markup;
  const venue = (markup.venue ? resolve(event.sheet, markup.venue) : event.sheet.venue) as Venue;
  if (!venue?.name) throw new Error(`${event.slug}: the markup's venue "${markup.venue ?? "venue"}" names no venue in the sheet`);
  const prices = event.sheet.prices as Price[];
  const sold = "offers" in markup ? markup.offers : undefined;
  // An offer as this guide's copy gives it: its own hop and tier name where
  // the offer has an entry for the guide's language (Offer.perGuide), the
  // shared ones elsewhere. The first guide has none, so it prints what it
  // always did.
  const inGuide = (o: Offer): Offer => ({ ...o, ...o.perGuide?.[guide.lang] });
  // "2027-01-14T19:30" in America/Toronto is 19:30 at -05:00 that day. A
  // time with no offset and no zone to take one from is a time nobody can
  // place, and fails the build; a date alone stays a date.
  const placed = (value: string) => {
    if (!/T\d{2}:\d{2}(?::\d{2})?$/.test(value)) return value;
    if (!markup.timeZone) throw new Error(`${event.slug}: "${value}" has a time and no offset, and the markup names no timeZone`);
    const local = value.slice(0, 16);
    return `${local}:00${zoneOffset(markup.timeZone, local)}`;
  };
  // "4484 Hamilton Highway, Hesse VIC 3321": the street, then the locality,
  // the state and the postcode as Australia writes them. A venue elsewhere
  // gives its parts in markup.address ("Av. Blanco Encalada 2540, Santiago
  // Centro, Santiago, Chile" has no state and no postcode to read). A
  // later guide may write the parts in its own language (markup.perGuide:
  // Wonderfruit's English twin, "Pattaya", where the Thai guide has
  // "พัทยา"); a spread keeps the address's keys in their order, and a guide
  // with no entry spreads nothing, so its address is what it was.
  const postal = { ...(markup.address ?? { ...australian(event.slug, venue.address), addressCountry: venue.country }), ...markup.perGuide?.[guide.lang]?.address };
  // The point the markup names: the venue's own marker where the guide
  // took it (Creamfields Chile's club page), else the scout's pair.
  const at = markup.geo ? (resolve(event.sheet, markup.geo) as { lat: number; lon: number } | undefined) : venue;
  if (!at || typeof at.lat !== "number" || typeof at.lon !== "number")
    throw new Error(`${event.slug}: markup.geo "${markup.geo}" names no { lat, lon } in the sheet`);
  // The offers print the sheet's prices, so the guide must say when they
  // stop being true, as its price spans do.
  if (sold && !guide.expires.prices)
    throw new Error(`${guide.event}/${guide.slug}: the MusicEvent prints prices, and "expires" has no prices date`);
  const shown = sold ? !expired(guide, "prices", day) : false;
  const offers = hasEnded(event.edition, day) || !sold
    ? undefined
    : Array.isArray(sold)
      ? sold.filter((o) => !o.priceValidUntil || day <= o.priceValidUntil).map((o) => channel(event, inGuide(o), shown))
      : !("prices" in sold)
      ? [single(event, sold, shown)]
      : sold.prices.map((i) => {
          const row = prices[i];
          if (!row) throw new Error(`${event.slug}: markup.offers names prices.${i}, which the sheet lacks`);
          return {
            "@type": "Offer",
            name: row.label,
            ...(shown ? { price: row.total ?? row.amount, priceCurrency: row.currency } : {}),
            ...(soldOut(row.status) ? { availability: "https://schema.org/SoldOut" } : {}),
            validFrom: sold.validFrom,
            url: `${SITE}/go/${event.slug}-${sold.go}/`,
            seller: { "@type": "Organization", name: sold.seller },
          };
        });
  const place = {
    "@type": "Place",
    name: venue.name,
    address: { "@type": "PostalAddress", ...postal },
    geo: { "@type": "GeoCoordinates", latitude: at.lat, longitude: at.lon },
  };
  // Each day carries the place as well: Google reads a nested event as an
  // item of its own, and one without a location as incomplete (the SEO
  // lead's gate-3 condition 1 on Primavera Sound São Paulo).
  // A night sold on its own carries its own offers (Zamna Tulum), on the
  // same terms as the event's: figures while the guide's prices hold, none
  // at all once the edition has ended.
  const subEvents = markup.subEvents?.map((d) => {
    const acts = (Array.isArray(d.acts) ? d.acts : [d.acts]).flatMap((k) => {
      const list = resolve(event.sheet, k);
      if (!Array.isArray(list) || !list.every((a) => typeof a === "string"))
        throw new Error(`${event.slug}: markup.subEvents names "${k}", which is not a list of acts in the sheet`);
      return list as string[];
    });
    const own = d.offers && !hasEnded(event.edition, day) ? d.offers.map((o) => channel(event, inGuide(o), shown)) : [];
    return {
      "@type": "MusicEvent",
      // The day as this guide's copy names it, where the day has an entry
      // for the guide's language (perGuide), as an offer does.
      name: d.perGuide?.[guide.lang]?.name ?? d.name,
      startDate: d.startDate,
      location: place,
      performer: acts.map((name) => ({ "@type": "PerformingGroup", name })),
      ...(own.length ? { offers: own } : {}),
    };
  });
  return {
    "@type": "MusicEvent",
    additionalType: "https://schema.org/Festival",
    "@id": `${url}#event`,
    name: markup.name ?? page.h1,
    url,
    description: page.description,
    ...(guide.cover ? { image: `${SITE}${guide.cover}` } : {}),
    startDate: placed(markup.startDate),
    endDate: placed(markup.endDate),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: place,
    // The organiser's site as `sameAs`, not `url`: the network's structured
    // data names a third party only as an identity (tests/outbound-links).
    // None where the organiser has no site of its own (Creamfields Chile's
    // only channel is Instagram, a third party's page, which stays a hop).
    // An edition two companies put on names both (Igloofest Québec:
    // Gestev and Multicolore); one whose producer no source names names
    // none (Igloofest Gatineau).
    ...(markup.organizer
      ? {
          organizer: Array.isArray(markup.organizer)
            ? markup.organizer.map(organization)
            : organization(markup.organizer),
        }
      : {}),
    publisher: { "@id": "https://fest.one/#organization" },
    mainEntityOfPage: { "@id": `${url}#webpage` },
    ...(offers?.length ? { offers } : {}),
    ...(subEvents ? { subEvent: subEvents } : {}),
  };
}

const organization = (o: { name: string; url?: string }) => ({
  "@type": "Organization",
  name: o.name,
  ...(o.url ? { sameAs: o.url } : {}),
});

/** An Australian address in its parts, in the order the markup prints
    them. */
function australian(slug: string, address: string) {
  const parts = /^(.*), (.+) ([A-Z]{2,3}) (\d{4})$/.exec(address);
  if (!parts) throw new Error(`${slug}: venue.address "${address}" is not "street, locality STATE postcode"; give markup.address`);
  return { streetAddress: parts[1], addressLocality: parts[2], addressRegion: parts[3], postalCode: parts[4] };
}

/** One offer at one sheet figure, for a seller whose prices carry no fee
    and whose total no source prints (Creamfields Chile: Punto Ticket's
    tables, the 12,5% charge added at checkout). The figure is a cell the
    page prints; which cell moves only when the scout re-reads the tables.
    No name, no availability: the seller says nothing about stock. */
function single(event: FestEvent, offers: { price: { key: string; currency: string }; go: string; seller: string; validFrom: string }, shown: boolean) {
  const figure = resolve(event.sheet, offers.price.key) as { amount?: unknown } | undefined;
  if (typeof figure?.amount !== "number") throw new Error(`${event.slug}: markup.offers.price.key "${offers.price.key}" names no { amount } in the sheet`);
  return {
    "@type": "Offer",
    ...(shown ? { price: figure.amount, priceCurrency: offers.price.currency } : {}),
    validFrom: offers.validFrom,
    url: `${SITE}/go/${event.slug}-${offers.go}/`,
    seller: { "@type": "Organization", name: offers.seller },
  };
}

/** One channel's offer (markup.offers as a list): the seller and our hop
    to it, the day sales opened where the sheet has it, and the stock
    status and a price only while the guide's prices hold, since a status
    perishes as a price does. A channel whose prices no source shows
    (Ingresse's lots sit behind a login) names no price at all. */
function channel(event: FestEvent, o: Offer, shown: boolean) {
  let price: Record<string, unknown> = {};
  if (o.price) {
    const figure = resolve(event.sheet, o.price.key) as { amount?: unknown } | undefined;
    if (typeof figure?.amount !== "number") throw new Error(`${event.slug}: an offer's price.key "${o.price.key}" names no { amount } in the sheet`);
    price = { price: figure.amount, priceCurrency: o.price.currency };
  }
  return {
    "@type": "Offer",
    ...(o.name ? { name: o.name } : {}),
    ...(shown ? price : {}),
    ...(shown && o.availability ? { availability: `https://schema.org/${o.availability}` } : {}),
    ...(o.validFrom ? { validFrom: o.validFrom } : {}),
    ...(shown && o.priceValidUntil ? { priceValidUntil: o.priceValidUntil } : {}),
    url: `${SITE}/go/${event.slug}-${o.go}/`,
    seller: { "@type": "Organization", name: o.seller },
  };
}

/** Sixty code points is where a result's title is cut; the keyword is what
    the title is for. Checked on the title as printed, suffix included. */
export function assertTitle(printed: string, keyword: string, where: string) {
  const length = [...printed].length;
  if (length > 60) throw new Error(`${where}: the title "${printed}" is ${length} code points, over 60`);
  if (!printed.toLowerCase().includes(keyword.toLowerCase()))
    throw new Error(`${where}: the title "${printed}" lacks the keyword "${keyword}"`);
}
