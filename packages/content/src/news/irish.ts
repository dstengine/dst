import type { NewsItem } from "../types.ts";

// sensation.irish: dance music festivals in Ireland, one guide per festival —
// dates, venue, line-up as announced and how tickets are sold. Guides rather
// than news, filed under /guides/. A subject page (apps/irish/src/sections.ts)
// is built from `tags` once two guides share one, so a tag here is a promise
// that the piece is about that subject.
//
// The voice is Irish English. Every detail comes from the organiser or the
// ticket seller, and the guide names which in `source`, with the date it was
// checked. The site is independent of every festival, promoter and seller.

export const items: NewsItem[] = [];
