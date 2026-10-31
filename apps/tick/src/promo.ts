// A promo code beside a section's intro: the site's own name, said at the
// door. It promises nothing — the block says so — and is the site's first
// try at learning whether a reader who found the page tells the venue
// where they came from. One line per section that carries it; `until` is
// the first day the block is no longer built, so a code for one night
// does not sit over a hub for a month.
export const PROMO: Record<string, { code: string; until: string }> = {
  halloween: { code: "tick.am", until: "2026-11-02" },
};

export function promoFor(slug: string, today: string) {
  const p = PROMO[slug];
  return p && today < p.until ? p : undefined;
}
