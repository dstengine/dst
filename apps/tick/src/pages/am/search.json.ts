// The records the search box reads — see ../../feeds.ts.
import type { APIRoute } from "astro";
import { searchIndex } from "../../feeds";

export const GET: APIRoute = () => searchIndex("hy");
