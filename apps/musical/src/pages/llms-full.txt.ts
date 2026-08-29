// The whole site as one Markdown file, the companion to /llms.txt. Same
// source as the pages themselves — see src/markdown.ts.
import type { APIRoute } from "astro";
import { abs, docs, preamble } from "../markdown";

export const GET: APIRoute = () => {
  const body = [
    preamble,
    "",
    ...docs().flatMap((doc) => [`---`, "", `Source: ${abs(doc.path)}`, "", doc.markdown, ""]),
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
