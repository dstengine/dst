// One event as a plain file download: "add to calendar" with no account
// and no third-party calendar service involved.
import type { APIRoute } from "astro";
import type { EventItem } from "@dst/content/types";
import { icsPaths, oneEvent } from "../../feeds";

export function getStaticPaths() {
  return icsPaths("en");
}

export const GET: APIRoute = ({ props }) => oneEvent("en", (props as { item: EventItem }).item);
