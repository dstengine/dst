// Every /go/ hop: "<event>-<target>" to where it leads. The event's slug in
// front of every hop is what keeps two events' "tickets" apart and keeps a
// hop off any path the archive on this host might answer.
import { events } from "./data/events/index";
import type { GoTarget } from "./data/types";

export interface Hop extends GoTarget {
  event: string;
}

export const outbound: Record<string, Hop> = {};
for (const event of events) {
  for (const [key, target] of Object.entries(event.go)) {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(key)) throw new Error(`${event.slug}: go.${key} is not a slug`);
    const slug = `${event.slug}-${key}`;
    if (outbound[slug]) throw new Error(`/go/${slug}/ is defined twice`);
    outbound[slug] = { ...target, event: event.slug };
  }
}
