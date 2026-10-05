// The whole site as one Markdown file, the companion to /llms.txt: the
// written head that file opens with, then every page from src/markdown.ts.
import type { APIRoute } from "astro";
import { readFileSync } from "node:fs";
import { abs, docs } from "../markdown";

const head = readFileSync(new URL("../../llms.head.md", import.meta.url), "utf8").trimEnd();

export const GET: APIRoute = () => {
  const body = [
    head,
    "",
    "Every page below is also served as Markdown at its own address with `.md` appended, e.g. https://aivideo.zone/news.md.",
    "",
    ...docs().flatMap((doc) => ["---", "", `URL: ${abs(doc.path)}`, "", doc.markdown]),
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
