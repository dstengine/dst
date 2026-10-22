// One page as Markdown, at its own address plus ".md": /beyond-the-valley.md,
// /beyond-the-valley/tickets.md, /festivals.md. Generated from the data, not
// scraped back out of the HTML.
import type { APIRoute } from "astro";
import { docs, type Doc } from "../markdown";

export function getStaticPaths() {
  return docs().map((doc) => ({
    params: { path: doc.path.replace(/^\/|\/$/g, "") },
    props: { doc },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const { doc } = props as { doc: Doc };
  return new Response(doc.markdown, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
};
