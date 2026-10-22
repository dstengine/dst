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
import { blocksMd, inlineMd, pathOf, SITE, type Ctx } from "./copy";
import { eventOf, hubOrder, mainPage, today } from "./rules";
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
    const sections = page.sections.flatMap((s) => {
      const body = blocksMd(s.body, ctx);
      return body ? [`## ${s.heading}`, "", body, ""] : [];
    });
    const faq = page.faq.flatMap((row) => {
      const a = inlineMd(row.a, ctx);
      return a ? [`### ${row.q}`, "", a, ""] : [];
    });
    return {
      path: pathOf(page),
      title: page.title,
      summary: page.description,
      markdown: join([
        `# ${page.h1}`,
        "",
        `> ${page.description}`,
        "",
        inlineMd(page.lede, ctx),
        "",
        ...sections,
        ...(faq.length ? [`## ${page.faqHeading ?? "FAQ"}`, "", ...faq] : []),
        page.sources !== undefined && `## ${page.sourcesHeading ?? "Sources"}`,
        page.sources !== undefined && "",
        page.sources !== undefined && inlineMd(page.sources, ctx),
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
  const entries = hubOrder(guides, events, day).flatMap((guide) => {
    const event = eventOf(events, guide);
    const main = mainPage(guide);
    const ctx: Ctx = { event, guide, today: day, where: "/festivals/ (Markdown)" };
    return [
      `## [${event.name}](${abs(`${guide.path.replace(/\/$/, "")}.md`)}) (${guide.hubLabel})`,
      "",
      inlineMd(guide.hubBlurb, ctx),
      "",
      ...guide.pages.filter((p) => p !== main).map((p) => `- [${p.label}](${abs(`/${p.slug}.md`)}): ${p.description}`),
      "",
    ];
  });
  return {
    path: hub.path,
    title: hub.title,
    summary: hub.description,
    markdown: join([`# ${hub.h1}`, "", `> ${hub.description}`, "", hub.intro, "", ...entries]),
  };
}

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
    `- [${hub.h1}](${abs("/festivals.md")}): ${site.en.homeTitle}`,
    "",
  ];
  for (const guide of hubOrder(guides, events, day)) {
    const event = eventOf(events, guide);
    lines.push(`## ${event.name}, ${guide.hubLabel}`, "");
    for (const page of guide.pages) lines.push(`- [${page.title}](${abs(`/${page.slug}.md`)}): ${page.description}`);
    lines.push("");
  }
  return lines.join("\n");
}
