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

// Whether the ticket link still gets a reader in, in schema.org's word for
// it. A seller is InStock; a full run or a sold-out sale is SoldOut; an
// announcement (`sells: false`) claims nothing, so it has no word at all.
// The event's offer and its button's ticket_click both read this, so the
// markup and the analytics say what the page says. Until 25 Oct 2026 every
// offer said InStock, on a full run and a free cemetery evening among them.
export function ticketAvailability(item: { ticket?: EventItem["ticket"] }): "InStock" | "SoldOut" | undefined {
  const t = item.ticket;
  if (!t) return undefined;
  if (t.soldOut) return "SoldOut";
  if (t.sells === false) return undefined;
  return "InStock";
}
