// Every page of this site as plain Markdown, built from the same entries
// the HTML is built from. Served two ways — /llms-full.txt (everything in
// one file) and /<page>.md (one page, at its own address plus ".md") — and
// both call docs() below, so a fact cannot say one thing on a page and
// another in the file a model reads. /llms.txt, the map, stays where it
// is: tools/llms.mjs writes it from llms.head.md and the same entries.
//
// The same rules as the pages hold here: the source is named as text,
// never as a link.
import type { NewsItem } from "@dst/content/types";
import { newsBySite } from "@dst/content/news";
import { newsHref } from "@dst/content/paths";
import { about, guides, home, schedule, siteId } from "./content";
import { moments } from "./schedule";
import { sections } from "./sections";

export const SITE = "https://tea.ceo";
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
const faq = (list: NewsItem["faq"] = []) =>
  list.length ? ["## Questions", "", ...list.flatMap((f) => [`### ${md(f.q)}`, "", md(f.a), ""])] : [];
const updates = (list: NewsItem["updates"] = []) =>
  list.length ? ["## Updates", "", ...list.map((u) => `- ${u.on}: ${md(u.text)}`), ""] : [];
const source = (item: NewsItem) =>
  item.source
    ? `Source: ${item.source.name}${item.source.verifiedOn ? `, checked ${item.source.verifiedOn}` : ""}`
    : undefined;

const hasPage = <T extends { body?: string[] }>(i: T) => Array.isArray(i.body) && i.body.length > 0;

export function newsMarkdown(n: NewsItem): string {
  return join([
    `# ${md(n.title)}`,
    "",
    `> ${md(n.summary)}`,
    "",
    line("Published", n.date),
    line("Kind", n.category),
    line("Topics", n.tags?.join(", ")),
    line("Page", abs(newsHref(n, "/guides/"))),
    "",
    ...body(n.body),
    ...updates(n.updates),
    ...faq(n.faq),
    source(n),
  ]);
}

const listing = <T extends { slug: string; path?: string; title: string; summary: string }>(base: string, items: T[], date: (i: T) => string) =>
  items.map((i) => `- ${date(i)} — [${md(i.title)}](${abs(newsHref(i, base))}): ${md(i.summary)}`);

export interface Doc {
  /** The HTML page's path, "/guides/x/"; the Markdown copy is that plus ".md". */
  path: string;
  markdown: string;
}

export function docs(): Doc[] {
  const all = newsBySite(siteId);
  const nw = all.filter(hasPage).sort((a, b) => b.date.localeCompare(a.date));
  const nwList = listing("/guides/", nw, (n) => n.date);
  const sectionDocs = sections(all).map((s) => ({
    path: `/${s.slug}/`,
    markdown: join([`# ${s.h1}`, "", `> ${s.lede}`, "", ...listing("/guides/", s.items.filter(hasPage), (n) => n.date)]),
  }));
  // The calendar in words: the countdown is the browser's, and a model
  // reading this file needs when each moment comes round, not how long
  // until it did on the day the file was built.
  const calendar = moments.flatMap((m) => [
    `## ${m.name}`,
    "",
    line("When", m.when),
    line("Where it comes from", m.origin),
    line("Calendar file", abs(`/schedule/${m.slug}.ics`)),
    "",
    md(m.text),
    "",
  ]);
  return [
    { path: "/", markdown: join([`# ${home.h1}`, "", `> ${home.lede}`, "", "## Newest first", "", ...nwList]) },
    { path: "/guides/", markdown: join([`# ${guides.h1}`, "", `> ${guides.lede}`, "", ...nwList]) },
    { path: "/schedule/", markdown: join([`# ${schedule.h1}`, "", `> ${schedule.lede}`, "", ...calendar]) },
    ...sectionDocs,
    { path: "/about/", markdown: join([`# ${about.h1}`, "", `> ${about.lede}`]) },
    ...nw.map((n) => ({ path: newsHref(n, "/guides/"), markdown: newsMarkdown(n) })),
  ];
}
