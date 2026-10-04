// The whole calendar, to subscribe to — see ../../feeds.ts.
import type { APIRoute } from "astro";
import { wholeCalendar } from "../../feeds";

export const GET: APIRoute = () => wholeCalendar("hy");
