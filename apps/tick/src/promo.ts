// A promo code beside every page's intro: the site's own name, said at the
// door. It promises nothing — the block says so — and is the site's first
// try at learning whether a reader who found the page tells the venue
// where they came from. Site-wide, because every intro here leaves the
// right half of the row empty (31 Oct 2026). `until`, when set, is the
// first day the block is no longer built.
export const PROMO: { code: string; until?: string } = { code: "tick.am" };

export function promoFor(today: string) {
  return PROMO.until && today >= PROMO.until ? undefined : PROMO;
}
