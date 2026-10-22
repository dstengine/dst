// The map of the site for anything reading it as text (llmstxt.org's
// convention), from the same data as the pages.
import type { APIRoute } from "astro";
import { llms } from "../markdown";

export const GET: APIRoute = () =>
  new Response(llms(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
