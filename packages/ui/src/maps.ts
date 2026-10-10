// Google Maps, keyless, for a place we hold coordinates for.
//
// Google rather than OpenStreetMap because it is the map our readers already
// use: in Yerevan, Vienna or Mexico City the route, the opening hours and the
// photos of the door are all in Google Maps, and a reader who has found the
// event wants to get there, not to learn a second map.
//
// The embed is the classic `output=embed` URL: no API key, no Cloud project,
// no billing account, and `hl` gives the labels in the page's language —
// Armenian street names on /am/. The official Embed API would need all three
// of the things it doesn't. The pin is put by coordinates, never by the
// venue's name: a name is geocoded, and a geocoder can pick the wrong one.

/** Language subtag for `hl`: "hy-AM" → "hy". */
const hl = (locale?: string) => (locale ? `&hl=${encodeURIComponent(locale.split("-")[0]!)}` : "");

/** The iframe source: a pin at the point, `zoom` 15 being a few streets round it. */
export function mapEmbedUrl(lat: number, lng: number, { zoom = 15, locale }: { zoom?: number; locale?: string } = {}): string {
  return `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}${hl(locale)}&output=embed`;
}

/** The way there, as Google's documented Maps URL: opens the app on a phone,
    with the route from wherever the reader stands. */
export function directionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}
