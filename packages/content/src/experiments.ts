// A/B/n tests across the network: what is being tried, on which hosts, and
// which variant a page or a visitor gets.
//
// Two kinds, because the network has two audiences and they cannot be tested
// the same way.
//
// A `page` test is for what search sees: a title template, a description.
// The unit is the page, split by its slug at build time, so a crawler and a
// reader always see the same words on the same page — anything else is
// cloaking. The result is read in Search Console, as click-through rate per
// group of pages. Both language twins of a page share a slug and so share a
// variant. It needs many pages of one template to say anything; a site with
// seven event pages has nothing to split.
//
// A `visitor` test is for what a reader does: the words on a button, the
// order of a block. The unit is the browser. Every variant is in the HTML,
// a pre-paint script picks one from a random id kept in localStorage, and
// CSS hides the rest — so nothing flickers, nothing shifts, and with no
// JavaScript the reader gets the control. The result is read in GA4: an
// `experience_impression` when a page shows the test, and an `exp`
// parameter on every event after it.
//
// The tags each test leaves on a page:
//   <html data-experiments="ticket-price:buy">   every test the page is in
//   <html data-exp-ticket-price="buy">            one per visitor test, for CSS
//   <meta name="experiments" content="…">        the page tests, for crawlers
//                                                 and for anyone auditing
//   [data-variant="ticket-price:buy"]             each variant's markup
//
// ?exp=ticket-price:buy forces a variant for one page view, unrecorded, so
// any of them can be looked at, screenshotted and tested. The visitor's own
// bucket is untouched by it.
//
// A test ends one of two ways: `end` passes and every page goes back to
// the control, or `winner` is set and every page renders the winner. Either
// way the markup stays put until someone removes it, and nothing more is
// counted.

export interface Experiment {
  /** Short and kebab-case: it is an HTML attribute, a meta tag and a GA4
      parameter value, and GA4 truncates long ones. */
  id: string;
  unit: "page" | "visitor";
  /** Where it runs, by hostname — the one thing every page already knows
      about itself. */
  hosts: string[];
  /** Which pages, as a RegExp source matched against the path. Every page
      on the host when absent. A page outside it renders the control and
      says nothing about the test — no tags, no impression. */
  paths?: string;
  /** The first is the control: what the page shows without the test. */
  variants: string[];
  /** Relative, one per variant. Equal when absent. */
  weights?: number[];
  /** ISO dates. Live from `start`, and no longer on `end`. */
  start: string;
  end?: string;
  /** Once decided, every page renders this and the test is over. */
  winner?: string;
  /** What we expect and why, written before the numbers arrive — a test
      whose question is decided afterwards finds whatever it finds. */
  hypothesis: string;
  /** The one number that settles it. */
  metric: string;
  /** The same number as tools/ab.mjs reads it. A page test's is always
      Search Console clicks per impression and needs nothing here. A
      visitor test's is the GA4 event that counts as success, per visitor
      who saw the variant — optionally only where the event's `param`
      matches `match` (a RegExp source). GA4 reports `param`, `exp` and
      `exp_variant_string` only once they are registered as custom
      dimensions, and from that day on, never backwards. */
  goal?: { event: string; param?: string; match?: string };
  /** The decision rule, fixed before launch, so that reading the numbers
      early cannot move it. `lift`: the smallest relative gain worth
      shipping (0.2 is a fifth) — it sizes the sample. `sample`: units per
      arm at which the test is read and decided (impressions for a page
      test, visitors for a visitor test). `decideBy`: the date it is
      decided whatever the sample reached. */
  lift?: number;
  sample?: number;
  decideBy?: string;
}

export const EXPERIMENTS: Experiment[] = [
  {
    id: "ticket-price",
    unit: "visitor",
    hosts: ["tick.am"],
    paths: "^/(?:am/)?events/[^/]+/$",
    variants: ["label", "buy", "price"],
    start: "2026-10-04",
    hypothesis:
      "The ticket button is pressed more often when it answers the question a reader presses it to answer. " +
      "\"Tickets\" (control) names the destination; \"Buy tickets\" names the act; \"Tickets from AMD 3,000\" " +
      "gives the price, which is what most readers leave the page to find out. Expect price ≥ buy > label.",
    metric: "ticket_click ÷ experience_impression, per variant, on event pages with a price",
    goal: { event: "ticket_click" },
  },
  {
    // Underpowered on tick alone, and launched knowing it (31 Oct 2026, the
    // user's call): the planner gives share clicks at ~3% of 20 visitors a
    // day 252 days to see +50%. The split is in place so the words are
    // not chosen by taste alone, and so the same test can widen to every
    // host that gets the button, where the sample arrives.
    id: "share-label",
    unit: "visitor",
    hosts: ["tick.am"],
    // Event pages and the subject pages that carry the control (Section.astro).
    paths: "^/(?:am/)?(?:events/[^/]+/|(?:classical|concerts|festivals|halloween|new-year|opera-ballet|parties|tech|theatre|wine|yerevan-city-day)/)$",
    variants: ["share", "invite"],
    start: "2026-10-31",
    hypothesis:
      "A share button is pressed more often when it names the people than the act: " +
      "\"Share\" (control) says what the button does, \"Invite friends\" says who it is for and why. " +
      "Expect invite > share, by half or more — anything less is not worth the longer label.",
    metric: "share_click with cta_kind=button ÷ experience_impression, per variant, on event and subject pages",
    goal: { event: "share_click", param: "cta_kind", match: "^button$" },
    lift: 0.5,
    sample: 2515,
    decideBy: "2027-01-02",
  },
  {
    id: "action-label",
    unit: "visitor",
    hosts: ["aivideo.zone"],
    paths: "^/news/[^/]+/$",
    variants: ["label", "title"],
    // The launch build, which runs on UTC's date: still the 5th.
    start: "2026-10-05",
    hypothesis:
      "The button under an aivideo.zone headline is pressed more often when it says where it goes. " +
      "\"Release notes\" (control) is the short label; the title variant reads \"ComfyUI 0.38.0 release notes on GitHub\" — " +
      "longer, but it names the destination and what is found there, which is what a reader weighing a click away wants to know. " +
      "Expect title > label, by enough to pay for a button that wraps on a phone.",
    metric: "outbound_click on the entry's /go/<slug>-action/ hop ÷ experience_impression, per variant",
    goal: { event: "outbound_click", param: "hop", match: "-action$" },
  },
  {
    // Search-result copy: does a title and description that promise the
    // reader what they came for (dates, prices, how to get there) get
    // clicked more than the plain dated title and the summary? Within the
    // SEO rules all the same: the site's keyword stays in both, the title
    // stays inside TITLE_LIMIT, every word is a fact read from the entry.
    // The variant is built in @dst/ui/meta from the entry's own fields, so
    // nothing is typed per page and nothing can be stale.
    id: "meta-hook",
    unit: "page",
    hosts: ["tick.am", "vien.lol", "lnd.lol", "ldn.lol", "nyc42.lol", "cmx.lol", "mxo.lol", "fwf.lol", "sol2go.lol"],
    paths: "^/(?:am/)?(?:events|veranstaltungen|eventos)/[^/]+/$",
    variants: ["plain", "hook"],
    start: "2026-10-24",
    hypothesis:
      "An event page is clicked more often when its search result reads like the answer rather than the heading: " +
      "\"Name 2026: dates, prices & tips\" over \"Name, 7 Nov 2026\", and a description opening with the dates, the city and the price " +
      "over the summary's first sentence. Expect hook > plain by a fifth or more at the same position; a smaller lift is not worth " +
      "a title Google is likelier to rewrite. Decided after eight weeks, on 2026-12-19 " +
      "(the launch rule also stopped at 2,000 impressions per arm, if sooner; dropped on 2026-10-25, see below), " +
      "by tools/ab.mjs.",
    metric: "Search Console clicks ÷ impressions per variant on the event pages, since 2026-10-24, compared at matching average position",
    // The launch rule was "2,000 impressions per arm or 19 Dec, whichever
    // first". At the pages' 3.1% CTR in the 28 days before the start,
    // 2,000 per arm can only tell a lift of +49% or more from noise, and
    // it would have arrived around 6 Nov — the test would have been
    // decided where the fifth it is about cannot be seen. Dropped on
    // 2026-10-25 by the owner's decision, after one day of data (four
    // clicks), before any outcome could steer it. By 19 Dec the test
    // sees about +24%; a +20% lift needs about 13,400 per arm.
    //
    // A treatment fix on 2026-10-25, before any outcome could steer it:
    // the hook title said "dates, prices & tips" or "dates & prices" on
    // every page, and 34 of the 127 upcoming hook-arm pages carry no
    // tickets.priceFrom, so 18 of them promised prices their page does not
    // show. Without a price the title now says "dates & what to know" or
    // "dates & tips", and the same in de, es and hy (@dst/ui/meta); priced
    // and free entries keep their words, and every description is as it
    // was. One page, lnd.lol's Queen's House Ice Rink, gains a hook title
    // it could not fit before, because the price-less words are shorter.
    // A fix of harm, not a change of the question: the arms, the metric
    // and the rule stay as they are.
    lift: 0.2,
    decideBy: "2026-12-19",
  },
];

/** Every test running on this page today that has not been decided.
    `today` is the build's date: a test starts and ends with the first
    build on or after its dates, not at midnight. */
export function liveExperiments(
  host: string,
  path: string,
  today: string,
  all: Experiment[] = EXPERIMENTS,
): Experiment[] {
  return all.filter(
    (e) =>
      e.hosts.includes(host) &&
      (!e.paths || new RegExp(e.paths).test(path)) &&
      e.start <= today &&
      (!e.end || today < e.end) &&
      !e.winner,
  );
}

/** 32-bit FNV-1a. Not for security — for spreading slugs and visitor ids
    evenly over buckets, the same way in the build and in the browser. */
export function fnv1a(text: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/** The variant `key` falls into: a slug for a page test, a visitor id for a
    visitor test. Hashed with the test's id, so one page is not in the
    control of every test at once. */
export function bucket(exp: Pick<Experiment, "id" | "variants" | "weights">, key: string): string {
  const weights = exp.weights ?? exp.variants.map(() => 1);
  const total = weights.reduce((a, b) => a + b, 0);
  let point = (fnv1a(`${exp.id}:${key}`) % 10000) / 10000 * total;
  for (let i = 0; i < exp.variants.length; i++) {
    point -= weights[i];
    if (point < 0) return exp.variants[i];
  }
  return exp.variants[exp.variants.length - 1];
}

/** What a page renders for a page test: the winner once there is one, the
    control once it has ended, its bucket while it runs. */
export function variantOf(exp: Experiment, key: string, today: string): string {
  if (exp.winner) return exp.winner;
  if (today < exp.start || (exp.end && today >= exp.end)) return exp.variants[0];
  return bucket(exp, key);
}

/** The same bucketing as `bucket`, as browser source for the pre-paint
    script: a visitor test is decided in the browser, before the first
    paint, from an id the build never sees. Written out rather than taken
    from `bucket.toString()`, which would hand the page whatever the bundler
    renamed things to; the tests hold the two to the same answers. */
export const BUCKET_JS = `function bucket(id, variants, weights, key) {
  var s = id + ":" + key, h = 0x811c9dc5, total = 0, point, i;
  for (i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  weights = weights || variants.map(function () { return 1; });
  for (i = 0; i < weights.length; i++) total += weights[i];
  point = (h % 10000) / 10000 * total;
  for (i = 0; i < variants.length; i++) { point -= weights[i]; if (point < 0) return variants[i]; }
  return variants[variants.length - 1];
}`;
