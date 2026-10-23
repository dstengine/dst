// One page as Markdown, at its own address plus ".md": /beyond-the-valley.md,
// /beyond-the-valley/tickets.md, and the hub's at /index.md (/festivals.md
// until the hub moved to the root; it redirects). Generated from the data, not
// scraped back out of the HTML.
import type { APIRoute } from "astro";
import { docs, mdPath, type Doc } from "../markdown";

export function getStaticPaths() {
  return docs().map((doc) => ({
    params: { path: mdPath(doc.path).replace(/^\/|\.md$/g, "") },
    props: { doc },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const { doc } = props as { doc: Doc };
  return new Response(doc.markdown, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
};
