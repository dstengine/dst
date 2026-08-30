import type { EventItem } from "../types.ts";
import { items as dst } from "./dst.ts";
import { items as llc } from "./llc.ts";
import { items as visas } from "./visas.ts";
import { items as riviera } from "./riviera.ts";
import { items as mbr } from "./mbr.ts";
import { items as palmcentral } from "./palmcentral.ts";
import { items as eco } from "./eco.ts";
import { items as fwf } from "./fwf.ts";
// The five .lol city domains — independent of the group and of each other,
// but their feeds share this package's shape and helpers like every other.
import { items as nyc42 } from "./nyc42.ts";
import { items as ldn } from "./ldn.ts";
import { items as lnd } from "./lnd.ts";
import { items as cmx } from "./cmx.ts";
import { items as mxo } from "./mxo.ts";

const BY_SITE: Record<string, EventItem[]> = { dst, llc, visas, riviera, mbr, palmcentral, eco, fwf, nyc42, ldn, lnd, cmx, mxo };

export const allEvents: EventItem[] = Object.values(BY_SITE).flat();

export function eventsBySite(site: string): EventItem[] {
  return BY_SITE[site] ?? [];
}

/** Ascending by start date, only start >= now, capped at n. */
export function upcomingEvents(items: EventItem[], n: number, now: Date = new Date()): EventItem[] {
  const cutoff = now.toISOString().slice(0, 10);
  return items
    .filter((e) => e.start >= cutoff)
    .sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0))
    .slice(0, n);
}

/** Descending by start date — everything before now, most recent first. */
export function pastEvents(items: EventItem[], now: Date = new Date()): EventItem[] {
  const cutoff = now.toISOString().slice(0, 10);
  return items
    .filter((e) => e.start < cutoff)
    .sort((a, b) => (a.start < b.start ? 1 : a.start > b.start ? -1 : 0));
}
