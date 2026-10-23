// A guide's cover as CSS: the two image-sets theme.css picks between, from
// tools/images.mjs's variants in the manifest Photo.astro reads. The guide's
// main page (GuidePage.astro) and its card on the hub (HubEntry.astro) both
// draw the cover as a background, being decorative (GuidePage says why), and
// both take it from here, so the two cannot drift.
//
// The variants: 480 and 768 px wide for a phone's 292 px band at one and two
// device pixels, 768 and 1024 for the 736 px column (theme.css picks by
// width: the guide page by the viewport's, a hub card by its own).
//
// The host is an argument because the manifest is keyed by it and only a
// component knows it (Astro.site).
//
// Not yet: a background cannot be lazy-loaded, so the hub loads every card's
// cover on first paint (76 KB for seven at 1280 and one device pixel, 133 KB
// at two). Before the hub passes about twenty guides, a later card defers
// the ones below the first screen (content-visibility on the month sections
// after the first, or a cap on the hub): the CTO's note 4 on the front-page
// card of 23 Oct 2026.
import { imagesByHost } from "@dst/content/images";

export function coverStyle(cover: string, host: string): string {
  const variants = imagesByHost[host]?.[cover];
  const at = (format: "avif" | "webp", width: number) => variants?.[format].find(([w]) => w === width)?.[1];
  const set = (one: number, two: number) =>
    variants && at("avif", one) && at("avif", two) && at("webp", one) && at("webp", two)
      ? `image-set(url(${at("avif", one)}) type('image/avif') 1x, url(${at("avif", two)}) type('image/avif') 2x, url(${at("webp", one)}) type('image/webp') 1x, url(${at("webp", two)}) type('image/webp') 2x, url(${cover}) type('image/jpeg') 1x)`
      : `url(${cover})`;
  return `--cover-narrow: ${set(480, 768)}; --cover-wide: ${set(768, 1024)}`;
}
