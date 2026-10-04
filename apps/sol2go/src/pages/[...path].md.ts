// One page as Markdown, at its own address plus ".md": /epoch.md,
// /news/<slug>.md, /index.md for the front page. The llmstxt.org convention
// asks for exactly this, and it costs nothing because the Markdown comes
// from the entries rather than being scraped back out of the HTML.
import type { APIRoute } from "astro";
import { docs, type Doc } from "../markdown";

export function getStaticPaths() {
  return docs().map((doc) => ({
    params: { path: doc.path.replace(/^\/|\/$/g, "") || "index" },
    props: { doc },
  }));
}

export const GET: APIRoute = ({ props }) =>
  new Response((props as { doc: Doc }).doc.markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
