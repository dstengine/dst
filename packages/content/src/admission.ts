// What it costs to get in, as one question with one answer.
//
// "Free" is the single most searched qualifier a listings site can carry,
// and it is also the easiest thing to get wrong: half the entries in this
// network say the word somewhere in their copy and mean something else by
// it. "Members go free" is a discount. "Included in palace admission" is a
// paid ticket with a programme attached. "Scare-free" is not about money at
// all. And the great free spectacle of south-east London is ticketed now.
//
// So the fact is never read out of prose. It is `tickets.priceFrom: 0`,
// written down only where the organiser says admission costs nothing, and
// this function is the only place that decides what it means. The glance
// row on an event page and the /free/ page have to agree — if they ever
// disagree, one of them is lying to a reader who came for exactly this.
//
// `priceTo` must be absent or zero: an event whose cheapest ticket is free
// and whose dearest is ninety pounds is a paid event with a free tier, and
// putting it on a page called "free" is the sort of bait a reader only
// falls for once.
import type { EventItem } from "./types.ts";

export function isFree(item: { tickets?: EventItem["tickets"] }): boolean {
  const t = item.tickets;
  return t?.priceFrom === 0 && (t.priceTo ?? 0) === 0;
}
