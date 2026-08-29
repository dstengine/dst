// One page, as Markdown, at its own address plus ".md" — /chicago/dubai.md.
// The llmstxt.org convention calls for exactly this, and it costs nothing
// here because the Markdown is generated from the data rather than scraped
// back out of the HTML.
import type { APIRoute } from "astro";
import { docs } from "../markdown";

export function getStaticPaths() {
  return docs().map((doc) => ({
    // "/chicago/dubai/" -> "chicago/dubai", which the route renders as
    // /chicago/dubai.md.
    params: { path: doc.path.replace(/^\/|\/$/g, "") || "index" },
    props: { doc },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const { doc } = props as { doc: ReturnType<typeof docs>[number] };
  return new Response(doc.markdown, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
};
