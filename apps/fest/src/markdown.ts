// Every page of this site as plain Markdown, built from the same data and
// the same renderer as the HTML (copy.ts), so a figure cannot say one thing
// on a page and another in the file a model reads. Served as /llms.txt (the
// map) and as /<page>.md (one page). An expired price is dropped from both
// on the same day it leaves the page.
//
// Links out go straight to their target here, as on musical.today: a model
// reading the file should be able to name the seller and reach it without
// following our hop.
import { events, guides } from "./data/events/index";
import type { Guide } from "./data/types";
import { applySpans, blocksMd, inlineMd, pathOf, SITE, sourcesMd, type Ctx } from "./copy";
import { eventOf, hubCard, hubOrder, hubSections, mainPage, today } from "./rules";
import { hub } from "./hub";
import { chrome, site } from "./site.config";

export const abs = (path: string) => `${SITE}${path}`;

export interface Doc {
  /** The HTML page's path; the twin is at the same path plus ".md". */
  path: string;
  title: string;
  summary: string;
  markdown: string;
}

const join = (parts: (string | undefined | false)[]) => parts.filter((p) => p !== undefined && p !== false).join("\n");

function guideDocs(guide: Guide, day: string): Doc[] {
  const event = eventOf(events, guide);
  return guide.pages.map((page) => {
    const ctx: Ctx = { event, guide, page, today: day, where: `${pathOf(page)} (Markdown)` };
    // Headings and questions as the page prints them that day (GuidePage).
    const plain = (text: string) => applySpans(text, guide, day, ctx.where).trim();
    const sections = page.sections.flatMap((s) => {
      const body = blocksMd(s.body, ctx, s.kind);
      return body ? [`## ${plain(s.heading)}`, "", body, ""] : [];
    });
    const faq = page.faq.flatMap((row) => {
      const a = inlineMd(row.a, ctx);
      return a ? [`### ${plain(row.q)}`, "", a, ""] : [];
    });
    // The questions under the page's heading for them; a page that opens on
    // its questions and prints no heading over them (Field Day's FAQ) has
    // them straight under its lede here too.
    const questions = faq.length
      ? page.faqHeading === undefined && page.faqFirst
        ? faq
        : [`## ${page.faqHeading ?? "FAQ"}`, "", ...faq]
      : [];
    return {
      path: pathOf(page),
      title: page.title,
      summary: page.description,
      markdown: join([
        `# ${page.h1}`,
        "",
        `> ${page.description}`,
        "",
        // The lede and, after a blank line, the line on why the guide
        // exists (GuidePage), each a paragraph.
        page.lede.split(/\n{2,}/).map((p) => inlineMd(p, ctx)).filter(Boolean).join("\n\n"),
        "",
        ...(page.faqFirst ? questions : []),
        ...sections,
        ...(page.faqFirst ? [] : questions),
        page.sources !== undefined && `## ${page.sourcesHeading ?? "Sources"}`,
        page.sources !== undefined && "",
        page.sources !== undefined && page.sourcesNote !== undefined && inlineMd(page.sourcesNote, ctx),
        page.sources !== undefined && page.sourcesNote !== undefined && "",
        page.sources !== undefined && sourcesMd(page.sources, ctx),
        page.sources !== undefined && "",
        page.links !== undefined && inlineMd(page.links, ctx),
        page.links !== undefined && "",
        page.foot,
        "",
        `Page: ${abs(pathOf(page))}`,
        "",
      ]),
    };
  });
}

function hubDoc(day: string): Doc {
  // The page's months, each guide under its month with its dates and place
  // on a line of their own (the card's meta line), then how the guides are
  // made and the archive's three fronts, which the page itself reduces to
  // one line.
  const months = hubSections(guides, events, day).flatMap((section) => [
    `## ${section.heading}`,
    "",
    ...section.guides.flatMap((guide) => {
      const event = eventOf(events, guide);
      const main = mainPage(guide);
      const card = hubCard(event, guide, day, "");
      const ctx: Ctx = { event, guide, today: day, where: "/ (Markdown)" };
      return [
        `### [${card.name}](${abs(`${guide.path.replace(/\/$/, "")}.md`)}) (${guide.hubLabel})`,
        "",
        `${card.dates.text} · ${card.place}`,
        "",
        inlineMd(guide.hubBlurb, ctx),
        "",
        ...guide.pages.filter((p) => p !== main).map((p) => `- [${p.label}](${abs(`/${p.slug}.md`)}): ${p.description}`),
        "",
      ];
    }),
  ]);
  return {
    path: hub.path,
    title: hub.title,
    summary: hub.description,
    markdown: join([`# ${hub.h1}`, "", `> ${hub.description}`, "", hub.intro, "", ...months, `## ${hub.aboutHeading}`, "", hub.about, "", ...archiveMd()]),
  };
}

/** The hub's foot, the archive of the old festival site: its three
    sections, linked to their pages (they have no Markdown twin). */
function archiveMd(): string[] {
  return [
    `## ${hub.archive.heading}`,
    "",
    hub.archive.intro,
    "",
    ...hub.archive.links.map((l) => `- [${l.label}](${abs(l.href)}): ${l.line}`),
    "",
  ];
}

/** The address of a page's Markdown twin: /beyond-the-valley.md, and the
    hub's, at the root, /index.md. */
export const mdPath = (path: string) => (path === "/" ? "/index.md" : `${path.replace(/\/$/, "")}.md`);

export function docs(): Doc[] {
  const day = today();
  return [hubDoc(day), ...guides.flatMap((g) => guideDocs(g, day))];
}

/** /llms.txt: the site's map, every guide and its pages, each linked to its
    Markdown twin. */
export function llms(): string {
  const day = today();
  const lines = [
    `# ${chrome.en.llmsHeading}`,
    "",
    `> ${hub.description}`,
    "",
    hub.intro,
    "",
    // The sentence on how the guides are sourced, which the hub prints at
    // its foot: the map keeps the promise the pages make.
    hub.about,
    "",
    `- [${hub.h1}](${abs(mdPath(hub.path))}): ${site.en.homeTitle}`,
    "",
  ];
  for (const guide of hubOrder(guides, events, day)) {
    const event = eventOf(events, guide);
    lines.push(`## ${guide.name ?? event.name}, ${guide.hubLabel}`, "");
    for (const page of guide.pages) lines.push(`- [${page.title}](${abs(`/${page.slug}.md`)}): ${page.description}`);
    lines.push("");
  }
  lines.push(...archiveMd());
  return lines.join("\n");
}
