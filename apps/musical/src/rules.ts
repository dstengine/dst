// Every decision this site makes about its own data, in one place: what a
// run's status is, what its ticket buttons say, whether a city earns a page,
// what a run page opens with when nobody has written it an opening.
//
// Components do not repeat any of this. A template that decides for itself
// whether to show a ticket button is a template that will disagree with the
// next one.
import type { City, Price, Run, Seller, Venue } from "./data/types";
import { cities } from "./data/cities";
import { runs } from "./data/runs";
import { venues } from "./data/venues";
import { groups } from "./data/groups";
import { go } from "./outbound";

export type RunStatus = "open-run" | "on-sale" | "announced" | "ended";

/** Build date, as a plain ISO day. Static site: "now" is when it was built,
    and the lastmod pipeline already tells search engines when that was. */
export const today = (): string => new Date().toISOString().slice(0, 10);

export const runBySlug = (show: string, slug: string) =>
  runs.find((r) => r.show === show && r.slug === slug);
export const venueBySlug = (slug: string) => venues.find((v) => v.slug === slug);
export const cityBySlug = (slug: string) => cities.find((c) => c.slug === slug);
export const groupBySlug = (show: string, slug: string) =>
  groups.find((g) => g.show === show && g.slug === slug);
export const runsFor = (show: string) => runs.filter((r) => r.show === show);
export const runsInGroup = (show: string, group: string) =>
  runs.filter((r) => r.show === show && r.group === group);
export const runsInCity = (city: string) => runs.filter((r) => r.city === city);
export const runsAtVenue = (venue: string) => runs.filter((r) => r.venue === venue);
export const venuesInCity = (city: string) => venues.filter((v) => v.city === city);

export function statusOf(run: Run): RunStatus {
  if (run.openRun) return "open-run";
  if (run.end && run.end < today()) return "ended";
  return run.sellers.length > 0 ? "on-sale" : "announced";
}

/** Wording for the status badge. "Announced" alone reads like a non-answer;
    say what the reader can do about it. */
export const statusLabel = (run: Run): string =>
  ({ "open-run": "Open run", "on-sale": "On sale", announced: "On sale soon", ended: "Ended" })[statusOf(run)];

/** The rule the whole site turns on: one seller and the button is just
    "Tickets", because there is nothing to choose between. More than one and
    the reader is choosing, so the button has to say who it is sending them
    to. */
export function ticketButtons(run: Run): { href: string; label: string; seller: Seller }[] {
  const sellers = [...run.sellers].sort((a, b) => Number(!!b.official) - Number(!!a.official));
  if (sellers.length === 1) return [{ href: go(sellers[0]!.slug), label: "Tickets", seller: sellers[0]! }];
  return sellers.map((seller) => ({ href: go(seller.slug), label: `Tickets on ${seller.name}`, seller }));
}

/** Nights a run plays, counting both ends. Undefined for an open run. */
export function nights(run: Run): number | undefined {
  if (!run.start || !run.end) return undefined;
  const ms = Date.parse(`${run.end}T00:00:00Z`) - Date.parse(`${run.start}T00:00:00Z`);
  return Math.round(ms / 86_400_000) + 1;
}

/** A city earns its own page once it has two events to list, or when it is
    marked featured. One event and one city page would be the same facts at a
    second address — which is a duplicate, not a listing. */
export const cityHasPage = (city: City): boolean =>
  Boolean(city.featured) || runsInCity(city.slug).length >= 2;

export const citiesWithPages = (): City[] => cities.filter(cityHasPage);

/** Runs of the same show elsewhere: the stops on either side of this one,
    because they are the nearest other chance to see it, then the rest of the
    calendar by date.

    Nearest, not first. Sorting the whole tour by date put the same six
    opening stops on all thirty-three pages — a hundred and fifty words of
    identical text per page, under a heading that promised nearby ones. */
export function otherRuns(run: Run, limit = 6): Run[] {
  const byDate = (a: Run, b: Run) => (a.start ?? "").localeCompare(b.start ?? "");
  const rest = runsFor(run.show).filter((r) => r.slug !== run.slug);
  if (!run.group) return rest.sort(byDate).slice(0, limit);

  const ordered = runsInGroup(run.show, run.group).sort(byDate);
  const here = ordered.findIndex((r) => r.slug === run.slug);
  const near = ordered
    .filter((r) => r.slug !== run.slug)
    .sort((a, b) => Math.abs(ordered.indexOf(a) - here) - Math.abs(ordered.indexOf(b) - here))
    .slice(0, limit)
    .sort(byDate);
  // Padding a tour stop with the runs outside its tour looks generous and
  // is not: the same two cards then sit on forty pages. The link to every
  // date is underneath, and it goes to the whole calendar rather than to
  // the two of it that happen to be first.
  const elsewhere = rest.filter((r) => r.group !== run.group).sort(byDate);
  return (near.length >= 2 ? near : [...near, ...elsewhere]).slice(0, limit);
}

/** Other events worth showing next to this one: anything else in the same
    city first, then runs sharing a tag. Empty until the site carries a
    second show, and the block simply does not render then. */
export function relatedRuns(run: Run, limit = 3): Run[] {
  const scored = runs
    .filter((r) => !(r.show === run.show && r.slug === run.slug))
    .filter((r) => r.city === run.city || (run.tags ?? []).some((t) => (r.tags ?? []).includes(t)))
    .filter((r) => r.show !== run.show || r.city === run.city);
  return scored.slice(0, limit);
}

/** Everything still to come, soonest first. Open runs sort in as playing
    now, because they are. */
export const upcomingRuns = (): Run[] =>
  runs
    .filter((r) => statusOf(r) !== "ended")
    .sort((a, b) => (a.openRun ? "" : a.start ?? "9999").localeCompare(b.openRun ? "" : b.start ?? "9999"));

/** Small numbers are words in running text — the hand-written summaries say
    "Twelve days", and a composed one should not answer "5 nights" beside them. */
const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
export const spell = (n: number): string => {
  const word = WORDS[n];
  return word ? word[0]!.toUpperCase() + word.slice(1) : String(n);
};

/** True when the only seller is the theatre's own box office — half the tour
    is booked that way, and repeating the building's name as if it were a
    third party reads like a mistake. */
export const sellsItsOwn = (run: Run): boolean => {
  if (run.sellers.length !== 1 || !run.venue) return false;
  return venueBySlug(run.venue)?.name === run.sellers[0]!.name;
};

/** The clauses an unwritten run can honestly be described with, kept apart
    because different places want different ones: a run page opens with all
    of them, a card wants only the ones its own meta line has not said. */
function introClauses(run: Run): { placing: string; tour?: string; selling?: string } {
  const city = cityBySlug(run.city)?.name ?? run.city;
  const venue = run.venue ? venueBySlug(run.venue)?.name : undefined;
  const n = nights(run);
  const group = run.group ? groupBySlug(run.show, run.group) : undefined;
  const parts: string[] = [];

  const length = n === 1 ? "One night" : n ? `${spell(n)} nights` : "Dates announced";
  // "Theatre Royal Plymouth, Plymouth" — a venue named after its city says the
  // city already, and the sentence should not say it twice.
  const named = venue?.toLowerCase().includes(city.toLowerCase());
  const placing = run.openRun
    ? `An open run: no closing date has been announced.`
    : venue
      ? `${length} at ${venue}${named ? "" : `, ${city}`}.`
      : `${length} in ${city}.`;

  if (group) {
    const ordered = runsInGroup(run.show, group.slug).sort((a, b) => (a.start ?? "").localeCompare(b.start ?? ""));
    const index = ordered.findIndex((r) => r.slug === run.slug);
    if (index === 0) parts.push(`It opens the ${group.name}.`);
    else if (index === ordered.length - 1) parts.push(`It closes the ${group.name}.`);
    else {
      const next = ordered[index + 1];
      const nextCity = next ? cityBySlug(next.city)?.name : undefined;
      parts.push(
        nextCity
          ? `Stop ${index + 1} of ${ordered.length} on the ${group.name}; ${nextCity} is next.`
          : `Stop ${index + 1} of ${ordered.length} on the ${group.name}.`,
      );
    }
  }

  const status = statusOf(run);
  const selling =
    status === "announced"
      ? "No seller has been listed against these dates yet."
      : status === "on-sale" && run.sellers.length === 1
        ? sellsItsOwn(run)
          ? "The theatre is selling the tickets itself."
          : `${run.sellers[0]!.name} is selling it.`
        : status === "on-sale"
          ? `${spell(run.sellers.length)} sellers list it.`
          : undefined;

  return { placing, tour: parts[0], selling };
}

/** An opening sentence for a run nobody has written one for. Never a template
    with holes — every clause is a fact or it is left out. */
export function runIntro(run: Run): string {
  if (run.summary) return run.summary;
  const { placing, tour, selling } = introClauses(run);
  return [placing, tour, selling].filter(Boolean).join(" ");
}

/** The card line for a grid of stops on one tour, where the cards sit six
    across and their sentences are read as a block. The full line would be
    "Stop 5 of 33 on the UK & Ireland Tour 2027; Newcastle is next" six
    times over, on thirty-three pages that differ by two words a card — so
    a stop among its own tour says only who is selling it. */
export function runSellerLine(run: Run): string {
  const { selling, placing } = introClauses(run);
  return selling ?? placing;
}

/** What a card says under the title. The card already prints the dates and
    the theatre on its own meta line, so a composed line that says "Five
    nights at Theatre Royal Plymouth" tells the reader nothing twice: it
    takes the tour position and the seller instead. */
export function runCardLine(run: Run): string {
  if (run.summary) return run.summary.match(/^.*?[.?!](?=\s|$)/)?.[0] ?? run.summary;
  const { placing, tour, selling } = introClauses(run);
  return [tour, selling].filter(Boolean).join(" ") || placing;
}

/** "5–13 February 2027", "27 July – 7 August 2027", "since 14 November 1996". */
export function formatRun(run: Run): string {
  const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { timeZone: "UTC", ...opts });
  if (run.openRun && run.start) return `Playing since ${fmt(run.start, { day: "numeric", month: "long", year: "numeric" })}`;
  if (!run.start) return "Dates not announced";
  if (!run.end) return fmt(run.start, { day: "numeric", month: "long", year: "numeric" });
  const sameMonth = run.start.slice(0, 7) === run.end.slice(0, 7);
  const from = sameMonth ? fmt(run.start, { day: "numeric" }) : fmt(run.start, { day: "numeric", month: "long" });
  return `${from} – ${fmt(run.end, { day: "numeric", month: "long", year: "numeric" })}`;
}

/** The run's dates with their weekdays: "Tuesday 16 to Saturday 20 February
    2027". Arithmetic, not a claim — but it is the first thing anyone works
    out for themselves when deciding whether a run covers a weekend, and it
    is different on every page. */
export function formatRunDays(run: Run): string | undefined {
  if (!run.start || run.openRun) return undefined;
  // Built from parts rather than one format: en-GB puts a comma after the
  // weekday ("Saturday, 20 February"), which reads as a dateline.
  const part = (iso: string, opts: Intl.DateTimeFormatOptions) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { timeZone: "UTC", ...opts });
  const named = (iso: string, opts: Intl.DateTimeFormatOptions) =>
    `${part(iso, { weekday: "long" })} ${part(iso, opts)}`;
  const full = { day: "numeric", month: "long", year: "numeric" } as const;
  if (!run.end || run.end === run.start) return named(run.start, full);
  const sameMonth = run.start.slice(0, 7) === run.end.slice(0, 7);
  const from = named(run.start, sameMonth ? { day: "numeric" } : { day: "numeric", month: "long" });
  return `${from} to ${named(run.end, full)}`;
}

/** Where a venue lives. A venue important enough to carry rootSlug is served
    from the root and from nowhere else — one canonical address each. */
export const venuePath = (venue: Venue): string =>
  venue.rootSlug ? `/${venue.rootSlug}/` : `/venue/${venue.slug}/`;

/** FNV-1a. Only used to shuffle, never to pick directly. */
function hash(seed: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

/** A stable choice among n wordings, spread evenly over every run on the site.
    Taking the hash modulo n looked right and was not: one phrasing landed on
    twenty-two of sixty pages and another on three, which is the lopsidedness
    it was supposed to remove. So the runs are ranked by a hash of their slug
    and the field name, and the rank picks the wording — even by construction,
    and uncorrelated between fields because each field ranks them differently.

    Ranking, not shuffling per page, because the result has to be identical on
    every build: prose that reshuffled itself would churn lastmod on sixty
    pages and tell search engines the site changed when it had not. */
const rankings = new Map<string, Map<string, number>>();

export function variant(run: Run, field: string, n: number): number {
  const key = `${field}/${n}`;
  let table = rankings.get(key);
  if (!table) {
    const order = runs
      .map((r) => ({ id: `${r.show}/${r.slug}`, h: hash(`${field}:${r.show}/${r.slug}`) }))
      .sort((a, b) => a.h - b.h || a.id.localeCompare(b.id));
    table = new Map(order.map((r, i) => [r.id, i % n]));
    rankings.set(key, table);
  }
  return table.get(`${run.show}/${run.slug}`) ?? 0;
}

/** The heading over the questions. Sixty pages that all say "Questions" read
    as one template with the nouns swapped, which is what it was. */
const FAQ_HEADINGS = [
  "Questions",
  "Before you book",
  "Worth knowing",
  "The practical bit",
  "Details",
  "Things people ask",
  "Good to know",
];

export const faqHeading = (run: Run): string =>
  FAQ_HEADINGS[variant(run, "heading", FAQ_HEADINGS.length)]!;

/** The three questions every stop answers, asked differently from stop to
    stop. Naming the show in the question helps a reader who arrived from a
    search and is not certain what they are looking at; on a page whose title
    already says it twice it is noise. So some pages name it and some do not,
    and which is which is fixed by the run's own slug. */
export function runFaq(
  run: Run,
  show: { title: string },
  city: City,
  venue: Venue | undefined,
): { q: string; a: string; generic?: boolean }[] {
  if (run.faq) return run.faq;
  const v = (kind: string, n: number) => variant(run, kind, n);

  const whenQ = [
    `When is ${show.title} in ${city.name}?`,
    "What are the dates?",
    `When does it play in ${city.name}?`,
    `Which nights is ${show.title} on?`,
    "When is it on?",
  ][v("when-q", 5)]!;

  const whereQ = [
    "Which theatre is it in?",
    `Where in ${city.name} is it playing?`,
    "Which venue?",
    `Where does ${show.title} play here?`,
    "Where is it?",
  ][v("where-q", 5)]!;

  const buyQ = [
    "Where do I buy tickets?",
    "How do I book?",
    "Where are tickets sold?",
    "Who is selling tickets?",
    `How do I get tickets for ${show.title}?`,
  ][v("buy-q", 5)]!;

  const found = priceFrom(run);
  const tiers = priceTiers(run);

  // One seller, one sentence, and until now the same sentence on fifty-six
  // pages. The fact is unavoidable; the wording is not.
  const one = (name: string) =>
    [
      `From ${name}, on their own site. Nothing is sold on this page.`,
      `${name} sell them. Booking is completed on their site, not this one.`,
      `Through ${name}. This page lists the run; it does not sell it.`,
      `${name} handle the sale. You finish the booking on their own page.`,
      `From ${name} directly. We list the dates and link out; the transaction is theirs.`,
    ][v("buy-a", 5)]!;

  // A fourth question, and only where there is a checked price to answer it
  // with. "How much are tickets?" answered with "it depends" is the kind of
  // question a listings site adds to look complete; this one either has the
  // number or does not ask.
  const money = found ? formatPrice(found.price.from, found.price.currency) : "";
  const where = found?.price.note ? `, ${found.price.note}` : "";
  const also =
    tiers.length > 0
      ? `. They also list ${tiers.map((t) => (t.from ? `${t.name} from ${formatPrice(t.from, t.currency)}` : t.name)).join(" and ")}`
      : "";

  const priceQ = found
    ? [
        {
          q: [
            "How much are tickets?",
            "What do they cost?",
            `What does ${show.title} cost here?`,
            "What is the cheapest seat?",
            "How much am I looking at?",
          ][v("price-q", 5)]!,
          a: [
            `The cheapest seat on sale with ${found.seller.name} for the ${city.name} dates is ${money}${where}. That was on their page on ${formatDay(found.price.checkedOn)}${also}; prices move, and theirs is the one that counts.`,
            `${money} is the lowest ${found.seller.name} were asking for ${city.name} when the page was read, on ${formatDay(found.price.checkedOn)}${where}${also}. Theirs is the price that counts, not this one.`,
            `${found.seller.name} start at ${money} for ${city.name}${where}${also}. Checked on ${formatDay(found.price.checkedOn)} — a run sells from the cheap seats up, so expect the figure to have moved.`,
          ][v("price-a", 3)]!
        },
      ]
    : [];

  return [
    {
      q: whenQ,
      a: run.openRun
        ? `It plays an open run — ${formatRun(run).toLowerCase()}, with no closing date announced.`
        : `${formatRun(run)}${venue ? `, at ${venue.name}` : ""}. Dates are local to ${city.name}.`,
    },
    {
      q: whereQ,
      a: venue
        ? `${venue.name}${venue.address ? `, ${venue.address}` : ""}.`
        : "The theatre has not been announced. The dates are published; the venue is not, and this page will not guess at one.",
    },
    {
      // Still generic, and still kept out of the JSON-LD: five wordings across
      // fifty-six pages is better than one, but it is not a fact about a stop.
      q: buyQ,
      generic: true,
      a:
        run.sellers.length === 0
          ? "Nowhere yet. These dates are announced without a seller; when one is listed it will appear here."
          : run.sellers.length === 1
            ? one(run.sellers[0]!.name)
            : `From ${run.sellers.map((s) => s.name).join(" or ")}. Both sell the same run; nothing is sold on this page.`,
    },
    ...priceQ,
  ];
}


/** How long a ticket price is allowed to speak for itself. Sellers move
    prices constantly and this site is rebuilt, not live: past this many days
    the number stops being shown and stops appearing in the markup, and the
    page falls back to saying who sells rather than what it costs.

    Six weeks is the compromise. Shorter and a run checked once a month is
    silent most of the time; longer and the site is quoting a price nobody
    can still buy. A wrong price is the one error here a reader finds out
    about at the till, so it expires rather than ages. */
export const PRICE_STALE_DAYS = 42;

const daysSince = (iso: string): number =>
  Math.floor((Date.parse(`${today()}T00:00:00Z`) - Date.parse(`${iso}T00:00:00Z`)) / 86400000);

export const priceIsFresh = (price: Price): boolean => {
  const age = daysSince(price.checkedOn);
  return age >= 0 && age <= PRICE_STALE_DAYS;
};

/** "2 September 2026". A price is a claim with a date on it, and an ISO
    string in running prose reads like a log line. */
export const formatDay = (iso: string): string =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/** The currency a stop is priced in, decided by where the stop is rather
    than typed by hand. Five countries, five currencies, and no way to write
    GBP on a Dublin price by accident — tests/prices.test.js checks the data
    against this rather than trusting the literal in runs.ts. */
const CURRENCY_BY_COUNTRY: Record<string, string> = {
  "United Kingdom": "GBP",
  Ireland: "EUR",
  Japan: "JPY",
  "United Arab Emirates": "AED",
  "United States": "USD",
};

export const currencyFor = (city: City): string | undefined => CURRENCY_BY_COUNTRY[city.country];

/** Each market's own way of writing its money. Formatting every currency in
    en-GB gave "JP¥13,000" and "US$99" — correct, and not how a page about a
    Tokyo run should read.

    en-JP rather than ja-JP for yen: ja-JP returns the full-width ￥ (U+FFE5),
    which is right inside Japanese text and a foreign body in an English
    sentence. en-JP gives the half-width ¥ and the same grouping. The page is
    in English about a Japanese theatre, so the number is Japanese and the
    typography is not. */
const LOCALE: Record<string, string> = {
  GBP: "en-GB",
  EUR: "en-IE",
  JPY: "en-JP",
  AED: "en-AE",
  USD: "en-US",
};

/** Money as the seller's own market writes it. No currency conversion, ever:
    a Tokyo run priced in yen is quoted in yen, because that is the number on
    the seller's page and the only one a reader can check at the till. A
    converted figure would be the one number here nobody could verify, and it
    would be wrong by the time it was read. */
/** Currencies written without a fractional part. Yen has none. The dirham
    has fils, and nobody prices in them: dkeyproperties.ae, which sells in
    this market every day, prints "AED <number_format(price)>" — code first,
    thousands separated, no decimals at all — and AED is one of the audiences
    this site is for, so it is written the way that audience reads it.

    Rounding a real fraction away would be dishonest rather than tidy, so
    tests/prices.test.js requires prices in these currencies to be whole
    numbers in the data instead of quietly rounding them here. */
const ZERO_DECIMAL = new Set(["JPY", "AED"]);

export function formatPrice(amount: number, currency: string): string {
  const zeroDecimal = ZERO_DECIMAL.has(currency);
  return new Intl.NumberFormat(LOCALE[currency] ?? "en-GB", {
    style: "currency",
    currency,
    minimumFractionDigits: zeroDecimal ? 0 : amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: zeroDecimal ? 0 : 2,
  }).format(amount);
}

/** The day this quote stops being one, in the markup. Google reads
    priceValidUntil as "after this, do not show the number" — which is
    exactly the staleness rule, published rather than kept private. */
export function priceValidUntil(price: Price): string {
  const d = new Date(`${price.checkedOn}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + PRICE_STALE_DAYS);
  return d.toISOString().slice(0, 10);
}

/** The cheapest fresh price across a run's sellers, with the seller it came
    from. Undefined when nobody has checked, or when everything on file has
    expired — both of which the page renders as silence, not as a guess. */
export function priceFrom(run: Run): { price: Price; seller: Seller } | undefined {
  const live = run.sellers.filter((s): s is Seller & { price: Price } => !!s.price && priceIsFresh(s.price));
  if (live.length === 0) return undefined;

  // Cheapest, but only among sellers quoting the same money. Sorting on the
  // number alone made 25 EUR cheaper than 24 GBP, which it is not — the site
  // does not convert, so it must not compare across currencies either. The
  // run's own market wins; where a seller quotes something else, it is left
  // to the sellers table rather than picked because its number looked small.
  const city = cityBySlug(run.city);
  const home = city ? currencyFor(city) : undefined;
  const inHome = home ? live.filter((s) => s.price.currency === home) : [];
  const pool = inHome.length > 0 ? inHome : live.filter((s) => s.price.currency === live[0]!.price.currency);
  const best = [...pool].sort((a, b) => a.price.from - b.price.from)[0]!;
  return { price: best.price, seller: best };
}

/** "from £25" for a button or a badge. */
export const priceLabel = (run: Run): string | undefined => {
  const found = priceFrom(run);
  return found ? `from ${formatPrice(found.price.from, found.price.currency)}` : undefined;
};

/** Named premium tiers across every fresh price on the run. Sellers call
    them different things — VIP, Premium, Meet the Cast — so the seller's own
    word is kept rather than flattened into one of ours. */
export function priceTiers(run: Run): { name: string; from?: number; currency: string; note?: string }[] {
  return run.sellers
    .filter((s) => s.price && priceIsFresh(s.price))
    .flatMap((s) => (s.price!.tiers ?? []).map((t) => ({ ...t, currency: s.price!.currency })));
}
