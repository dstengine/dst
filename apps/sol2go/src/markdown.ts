// Every page of this site as plain Markdown, built from the same entries
// the HTML is built from. Served two ways — /llms-full.txt (everything in
// one file) and /<page>.md (one page, at its own address plus ".md") — and
// both call docs() below, so a fact cannot say one thing on a page and
// another in the file a model reads. /llms.txt, the map, stays where it
// is: tools/llms.mjs writes it from llms.head.md and the same entries.
//
// The same rules as the pages hold here. The source is named as text,
// never as a link; a date the organiser has not given is not filled in.
import type { EventItem, NewsItem } from "@dst/content/types";
import { eventsBySite } from "@dst/content/events";
import { newsBySite } from "@dst/content/news";
import { about, epoch, events, home, news, siteId, unstake } from "./content";

export const SITE = "https://sol2go.lol";
export const abs = (path: string) => `${SITE}${path}`;

const ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  mdash: "—", ndash: "–", laquo: "«", raquo: "»", hellip: "…", ldquo: "“", rdquo: "”", lsquo: "‘", rsquo: "’", times: "×", euro: "€", pound: "£", middot: "·", rarr: "→", larr: "←",
};

/** The body strings carry the handful of inline tags the pages render.
    Those become their Markdown equivalents; anything else is dropped. */
export function md(html = ""): string {
  return html
    .replace(/<\/?(strong|b)>/g, "**")
    .replace(/<\/?(em|i)>/g, "*")
    .replace(/<code>(.*?)<\/code>/g, "`$1`")
    .replace(/<a\b[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/g, (_, href: string, text: string) =>
      `[${text}](${href.startsWith("/") ? abs(href) : href})`)
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&([a-z]+);/g, (m, name) => ENTITIES[name] ?? m)
    .trim();
}

const line = (label: string, value: string | number | undefined) =>
  value === undefined || value === "" ? undefined : `- ${label}: ${value}`;
// Only a missing line disappears; an empty string is a deliberate blank
// line between blocks, and Markdown needs it.
const join = (parts: (string | undefined)[]) =>
  parts.filter((p) => p !== undefined).join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";

const body = (list: string[] = []) => list.flatMap((p) => [md(p), ""]);
const faq = (list: EventItem["faq"] = []) =>
  list.length ? ["## Questions", "", ...list.flatMap((f) => [`### ${md(f.q)}`, "", md(f.a), ""])] : [];
const updates = (list: NewsItem["updates"] = []) =>
  list.length ? ["## Updates", "", ...list.map((u) => `- ${u.on}: ${md(u.text)}`), ""] : [];
const source = (item: NewsItem | EventItem) =>
  item.source
    ? `Source: ${item.source.name}${item.source.verifiedOn ? `, checked ${item.source.verifiedOn}` : ""}`
    : undefined;

const hasPage = <T extends { body?: string[] }>(i: T) => Array.isArray(i.body) && i.body.length > 0;

function when(e: EventItem): string {
  const days = e.end && e.end !== e.start ? `${e.start} to ${e.end}` : e.start;
  const time = e.startTime ? `, ${e.startTime}${e.endTime ? `–${e.endTime}` : ""}` : "";
  const zone = e.startTime && e.utcOffset ? ` (UTC${e.utcOffset})` : "";
  return `${days}${time}${zone}`;
}

function price(e: EventItem): string | undefined {
  const t = e.tickets;
  if (!t || (t.priceFrom === undefined && t.priceTo === undefined)) return undefined;
  const cur = t.currency ?? "";
  if (t.priceFrom === 0 && !t.priceTo) return "free";
  const range = t.priceTo && t.priceTo !== t.priceFrom ? `${t.priceFrom ?? 0}–${t.priceTo}` : `${t.priceFrom ?? t.priceTo}`;
  return `${range} ${cur}`.trim();
}

export function eventMarkdown(e: EventItem): string {
  return join([
    `# ${md(e.title)}`,
    "",
    `> ${md(e.summary)}`,
    "",
    line("When", when(e)),
    line("Where", e.online ? "Online" : [e.venue, e.city, e.country].filter(Boolean).join(", ") || undefined),
    line("Kind", e.category),
    line("Organiser", e.organizer),
    line("Tickets", price(e)),
    line("Page", abs(`/events/${e.slug}/`)),
    line("Calendar file", abs(`/events/${e.slug}.ics`)),
    "",
    ...body(e.body),
    ...(e.programme?.length ? ["## Programme", "", ...e.programme.flatMap((p) => [`### ${md(p.heading)}`, "", md(p.text), ""])] : []),
    ...(e.speakers?.length
      ? [`## ${e.speakersHeading ?? "Speakers"}`, "", ...e.speakers.map((s) => `- ${[s.name, s.role, s.org].filter(Boolean).join(", ")}${s.note ? ` — ${md(s.note)}` : ""}`), ""]
      : []),
    ...updates(e.updates),
    ...faq(e.faq),
    source(e),
  ]);
}

export function newsMarkdown(n: NewsItem): string {
  return join([
    `# ${md(n.title)}`,
    "",
    `> ${md(n.summary)}`,
    "",
    line("Published", n.date),
    line("Page", abs(`/news/${n.slug}/`)),
    "",
    ...body(n.body),
    ...updates(n.updates),
    ...faq(n.faq),
    source(n),
  ]);
}

const listing = <T extends { slug: string; title: string; summary: string }>(base: string, items: T[], date: (i: T) => string) =>
  items.map((i) => `- ${date(i)} — [${md(i.title)}](${abs(`${base}${i.slug}/`)}): ${md(i.summary)}`);

export interface Doc {
  /** The HTML page's path, "/news/x/"; the Markdown copy is that plus ".md". */
  path: string;
  markdown: string;
}

export function docs(): Doc[] {
  const ev = eventsBySite(siteId).filter(hasPage).sort((a, b) => a.start.localeCompare(b.start));
  const nw = newsBySite(siteId).filter(hasPage).sort((a, b) => b.date.localeCompare(a.date));
  const evList = listing("/events/", ev, (e) => e.start);
  const nwList = listing("/news/", nw, (n) => n.date);
  return [
    { path: "/", markdown: join([`# ${home.h1}`, "", `> ${home.lede}`, "", "## Events, soonest first", "", ...evList, "", "## News, newest first", "", ...nwList]) },
    { path: "/events/", markdown: join([`# ${events.h1}`, "", `> ${events.lede}`, "", ...evList, "", line("Whole calendar as iCalendar", abs("/events.ics"))]) },
    { path: "/news/", markdown: join([`# ${news.h1}`, "", `> ${news.lede}`, "", ...nwList]) },
    {
      path: "/epoch/",
      markdown: join([
        `# ${epoch.h1}`, "", `> ${epoch.lede}`, "",
        "The live figures on this page are read by the reader's browser from a Solana RPC node (getEpochInfo and getRecentPerformanceSamples) and are not part of this file. For the current epoch, ask an RPC node directly.",
        "",
        "A Solana epoch is 432,000 slots on mainnet. Staking rewards are paid at the boundary between two epochs, and stake activates and deactivates only on a boundary. At the 250ms slot time in effect since 18 September 2026 an epoch runs about thirty hours; at the original 400ms it ran about two days.",
      ]),
    },
    {
      path: "/unstake/",
      markdown: join([
        `# ${unstake.h1}`, "", `> ${unstake.lede}`, "",
        "The lookup runs in the reader's browser and is not part of this file.",
        "",
        "Unstaking native SOL is two transactions: deactivate, then withdraw. Deactivated stake cools down until the next epoch boundary, as a rule; if an unusually large share of all stake is deactivating at once, part of it waits an epoch longer. A lockup on the stake account blocks withdrawal until it ends, whatever the cooldown. Liquid staking tokens are unstaked through their own pools and are not covered.",
      ]),
    },
    { path: "/about/", markdown: join([`# ${about.h1}`, "", `> ${about.lede}`]) },
    ...ev.map((e) => ({ path: `/events/${e.slug}/`, markdown: eventMarkdown(e) })),
    ...nw.map((n) => ({ path: `/news/${n.slug}/`, markdown: newsMarkdown(n) })),
  ];
}
