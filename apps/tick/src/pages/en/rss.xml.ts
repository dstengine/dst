// News as RSS 2.0 — see ../../feeds.ts.
import type { APIRoute } from "astro";
import { rss } from "../../feeds";

export const GET: APIRoute = () => rss("en");
