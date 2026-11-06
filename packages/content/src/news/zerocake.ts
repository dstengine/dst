import type { NewsItem } from "../types.ts";

// zerocake.org: Monzero, plain guides to Monero for readers starting from
// zero. Guides rather than news — an explanation stays true after the next
// release — filed under /guides/. A subject page (apps/zerocake/src/
// sections.ts) is built from `tags` once two guides share one, so a tag here
// is a promise that the piece is about that subject.
//
// The voice is plain English for a newcomer. Every figure comes from the
// project, the code or whoever published it, and the guide names which in
// `source`, with the date it was checked. No prices and no promise of
// returns.

export const items: NewsItem[] = [];
