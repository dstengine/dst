// The map of the site for anything reading it as text rather than rendering
// it — llmstxt.org's convention. Generated from the same data as the pages,
// so it cannot fall behind them: a run added to src/data appears here on the
// next build.
import type { APIRoute } from "astro";
import { abs, docs, preamble } from "../markdown";

export const GET: APIRoute = () => {
  const byGroup = new Map<string, typeof allDocs>();
  const allDocs = docs();
  for (const doc of allDocs) {
    const list = byGroup.get(doc.group) ?? [];
    list.push(doc);
    byGroup.set(doc.group, list);
  }

  const sections = [...byGroup].map(([group, items]) =>
    [`## ${group}`, "", ...items.map((d) => `- [${d.title}](${abs(d.path)}): ${d.summary}`)].join("\n"),
  );

  const body = [
    preamble,
    "",
    ["## Site", "", `- [What's on](${abs("/")}): Every run on sale, soonest first.`,
      `- [Venues](${abs("/venues/")}): Every theatre and arena, with what plays in each.`,
      `- [Online](${abs("/online/")}): What can be watched legally, embedded on the page.`,
      `- [About](${abs("/about/")}): How a listing gets here.`,
      `- [Everything in one file](${abs("/llms-full.txt")}): The whole site as Markdown.`].join("\n"),
    "",
    ...sections.flatMap((s) => [s, ""]),
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
