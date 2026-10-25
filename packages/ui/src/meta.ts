// An event page's <title> and meta description, with the "meta-hook" page
// test applied (@dst/content/experiments).
//
// The control is what every event page has shown so far: `datedTitle` over
// titleSeo/title, and the summary as the description. The hook variant
// rewrites both from the entry's own fields so that the search result
// reads like the answer to the query — "Krampuslauf Wien 2026: Termine,
// Preise & Tipps" / "28. Nov. 2026, Wien. Eintritt frei. …" — and nothing
// else: no adjective the entry does not carry, no date or price typed by
// hand. The SEO rules hold for both variants (CLAUDE.md, SEO): the site's
// keyword is in the title and the description, the title fits TITLE_LIMIT
// with the suffix, and a page whose hook will not fit shows the control.
//
// The variant is decided per page by its key — the page's address in its
// first language, the same key BaseLayout tags the page with — so a crawler
// and a reader see the same words, and tick's two language twins land in the
// same group. The result is read in Search Console by tools/ab-meta.mjs.

import { EXPERIMENTS, liveExperiments, variantOf } from "@dst/content/experiments";
import { datedTitle, withSuffix, saidAlready, TITLE_LIMIT } from "./title.ts";

export const META_TEST = "meta-hook";

/** What the hook variant says, per language of the site. Facts come from
    the entry; these are the few joining words. `unpriced` is the title's
    two lengths for an entry with no `tickets.priceFrom`: its page shows no
    price, so its title cannot promise one. A free entry has a price. */
const HOOKS: Record<string, {
  long: string; short: string; unpriced: { long: string; short: string };
  free: string; from: (price: string) => string; know: string;
}> = {
  en: { long: "dates, prices & tips", short: "dates & prices", unpriced: { long: "dates & what to know", short: "dates & tips" }, free: "Free entry", from: (p) => `Tickets from ${p}`, know: "What to know before you go." },
  de: { long: "Termine, Preise & Tipps", short: "Termine & Preise", unpriced: { long: "Termine & Wissenswertes", short: "Termine & Tipps" }, free: "Eintritt frei", from: (p) => `Tickets ab ${p}`, know: "Was man vorher wissen sollte." },
  es: { long: "fechas, precios y consejos", short: "fechas y precios", unpriced: { long: "fechas y lo que debes saber", short: "fechas y consejos" }, free: "Entrada gratis", from: (p) => `Boletos desde ${p}`, know: "Lo que hay que saber antes de ir." },
  hy: { long: "ամսաթվեր, գներ, խորհուրդներ", short: "ամսաթվեր և գներ", unpriced: { long: "ամսաթվեր, մանրամասներ, խորհուրդներ", short: "ամսաթվեր և խորհուրդներ" }, free: "Մուտքն ազատ է", from: (p) => `Տոմսերը՝ ${p}-ից`, know: "Ինչ արժե գիտենալ նախապես։" },
};

/** Google cuts a description around here on a phone. */
export const DESCRIPTION_LIMIT = 160;

export interface MetaEvent {
  slug?: string;
  title: string;
  titleSeo?: string;
  summary: string;
  start: string;
  end?: string;
  city?: string;
  tickets?: { priceFrom?: number; priceTo?: number; currency?: string };
}

export interface MetaSite { lang?: string; titleSuffix?: string; keyword?: string }

export interface MetaPage {
  /** The host the page is built for, as BaseLayout reads it from Astro.site. */
  host: string;
  /** The page's path on that host. */
  path: string;
  /** What the test splits on: the path in the page's first language. The
      path itself when the site has one language. */
  key?: string;
  /** The build's date; today when absent. */
  today?: string;
  /** The site's other event pages in this page's language — `more` in
      every template. A hook cut to the name before the title's colon must
      not be a name another page also carries. */
  siblings?: MetaEvent[];
}

export interface EventMeta { title: string; description: string; variant: string }

/** The title and description this page renders, and which variant they are. */
export function eventMeta(item: MetaEvent, site: MetaSite, page: MetaPage): EventMeta {
  const today = page.today ?? new Date().toISOString().slice(0, 10);
  const base = item.titleSeo ?? item.title;
  const plain = { title: datedTitle(base, item, site), description: item.summary, variant: "plain" };
  const exp = EXPERIMENTS.find((e) => e.id === META_TEST);
  if (!exp || !liveExperiments(page.host, page.path, today).some((e) => e.id === META_TEST)) return plain;
  const variant = variantOf(exp, page.key ?? page.path, today);
  if (variant !== "hook") return { ...plain, variant };
  const others = (page.siblings ?? []).filter((o) => o !== item && !(item.slug && o.slug === item.slug));
  const title = hookTitle(base, item, site, others) ?? plain.title;
  return { title, description: hookDescription(item, site), variant };
}

/** "Name 2026: dates, prices & tips" when it fits the search-result budget
    with the site's suffix; the shorter hook when only that fits; then the
    same two over the name alone when the base already carries a tail of its
    own ("Halloween im Prater 2026: fünf Tage, keine Parade" → "Halloween im
    Prater 2026: Termine & Preise"); nothing when none fits, and the page
    keeps its dated title.

    The name alone only when no other page of the site goes by it in the
    same year (`others`): six stages of Yerevan City Day are each "Yerevan
    City Day: <the stage>", and cut to the name they would be six pages
    under one title, none of them saying which stage it is.

    Without a price on the entry the words leave the price out ("Dubai
    Future Week 2026: dates & what to know"); a free entry keeps them,
    because "free" is its price. */
export function hookTitle(
  base: string,
  event: { start: string; tickets?: { priceFrom?: number } },
  site: MetaSite,
  others: { title: string; titleSeo?: string; start: string }[] = [],
): string | undefined {
  const locale = site.lang ?? "en";
  const lang = HOOKS[locale.slice(0, 2)] ?? HOOKS.en;
  const hook = event.tickets?.priceFrom === undefined ? lang.unpriced : lang;
  const head = headOf(base);
  const key = (name: string, start: string) => dated(name, start).toLocaleLowerCase(locale);
  const shared = others.some((o) => key(headOf(o.titleSeo ?? o.title), o.start) === key(head, event.start));
  const names = head.length >= 12 && head !== base && !shared
    ? [dated(base, event.start), dated(head, event.start)]
    : [dated(base, event.start)];
  for (const named of names) {
    for (const words of [hook.long, hook.short]) {
      const candidate = `${named}: ${words}`;
      if (withSuffix(candidate, site.titleSuffix, site.keyword, locale).length <= TITLE_LIMIT) return candidate;
    }
  }
  return undefined;
}

/** "24–26 Oct 2026, Wien. Free entry. <first sentence of the summary> What
    to know before you go." — trimmed to the description budget from the
    end, the summary sentence last, and never without the site's keyword. */
export function hookDescription(item: MetaEvent, site: MetaSite): string {
  const locale = site.lang ?? "en";
  const lang = locale.slice(0, 2);
  const hook = HOOKS[lang] ?? HOOKS.en;
  const place = item.city ?? site.keyword;
  const lead = [`${when(item, locale)}${place ? `, ${place}` : ""}.`, price(item, locale, hook)].filter(Boolean).join(" ");
  const sentence = firstSentence(item.summary);
  // Fitted once to the whole budget; when the keyword did not survive the
  // cut, fitted again with room reserved for the tail that carries it.
  const fit = (budget: number) => {
    const withKnow = `${lead} ${sentence} ${hook.know}`;
    const out = withKnow.length <= budget ? withKnow : `${lead} ${sentence}`;
    return out.length > budget ? `${lead} ${cut(sentence, budget - lead.length - 1)}` : out;
  };
  const said = (text: string) => !site.keyword || saidAlready(text, site.keyword, lang);
  const whole = fit(DESCRIPTION_LIMIT);
  if (said(whole)) return whole;
  const tail = ` — ${site.keyword}`;
  return `${fit(DESCRIPTION_LIMIT - tail.length)}${tail}`;
}

/** A title up to its own tail: "Halloween im Prater" of "Halloween im
    Prater: fünf Tage, keine Parade". The whole title when it has none. */
function headOf(base: string): string {
  return base.split(/:\s|\s[–—]\s/)[0];
}

/** The name with its year, unless it names one already. */
function dated(name: string, start: string): string {
  return /\b(19|20)\d\d\b/.test(name) ? name : `${name} ${start.slice(0, 4)}`;
}

function when(event: { start: string; end?: string }, locale: string): string {
  const fmt = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  const start = new Date(`${event.start}T00:00:00Z`);
  const end = event.end && event.end !== event.start ? new Date(`${event.end}T00:00:00Z`) : undefined;
  return (end ? fmt.formatRange(start, end) : fmt.format(start)).replace(/(^|\D)0(\d)/g, "$1$2");
}

function price(item: MetaEvent, locale: string, hook: (typeof HOOKS)[string]): string | undefined {
  const t = item.tickets;
  if (!t || t.priceFrom === undefined) return undefined;
  if (t.priceFrom === 0 && (t.priceTo ?? 0) === 0) return `${hook.free}.`;
  if (t.priceFrom <= 0) return undefined;
  const currency = t.currency ?? "AED";
  let amount: string;
  try {
    amount = new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(t.priceFrom);
  } catch {
    amount = `${t.priceFrom} ${currency}`;
  }
  return `${hook.from(amount)}.`;
}

/** The summary up to its first full stop — not the one after an ordinal
    ("vom 27. Oktober"), a month or other short abbreviation ("13. Nov. 2026",
    "St. Stephan", "ca. 300"), or a decimal. */
function firstSentence(text: string): string {
  const t = text.trim();
  const re = /[.!?։](?=\s|$)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(t))) {
    const before = t.slice(0, m.index);
    if (m[0] === "." && /(^|[^\p{L}\p{N}])(\d{1,2}|\p{L}{1,4}|\d+,\d+)$/u.test(before)) continue;
    return t.slice(0, m.index + 1).trim();
  }
  return t;
}

/** Cut at a word boundary with an ellipsis, never mid-word. */
function cut(text: string, max: number): string {
  if (text.length <= max || max < 12) return text.length <= max ? text : "";
  const head = text.slice(0, max - 1);
  const at = head.lastIndexOf(" ");
  return `${(at > 20 ? head.slice(0, at) : head).replace(/[,;:\s]+$/, "")}…`;
}
