// Google Maps, for a place we hold coordinates for.
//
// Google rather than OpenStreetMap because it is the map our readers already
// use: in Yerevan, Vienna or Mexico City the route, the opening hours and the
// photos of the door are all in Google Maps, and a reader who has found the
// event wants to get there, not to learn a second map.
//
// With PUBLIC_GOOGLE_MAPS_KEY in the build's environment the frame is the
// Maps Embed API — documented, free, the key restricted to our domains in
// the Cloud console. The key is in every page's HTML by design, so it lives
// in each Vercel project's environment rather than in git, where GitHub's
// secret scanning would take it for a leak. Without it (a local build) the
// frame falls back to the classic keyless `output=embed` URL, which draws the
// same map but is nowhere promised to keep working.
//
// Either way the pin is put by coordinates, never by the venue's name: a name
// is geocoded, and a geocoder can pick the wrong one. And the labels are in
// the page's language — Armenian street names on /am/.

const KEY = process.env.PUBLIC_GOOGLE_MAPS_KEY?.trim();

/** Language subtag: "hy-AM" → "hy". */
const lang = (locale?: string) => (locale ? encodeURIComponent(locale.split("-")[0]!) : undefined);

/** The iframe source: a pin at the point, `zoom` 15 being a few streets round it. */
export function mapEmbedUrl(lat: number, lng: number, { zoom = 15, locale }: { zoom?: number; locale?: string } = {}): string {
  const l = lang(locale);
  if (KEY) return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(KEY)}&q=${lat},${lng}&zoom=${zoom}${l ? `&language=${l}` : ""}`;
  return `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}${l ? `&hl=${l}` : ""}&output=embed`;
}

/** The way there, as Google's documented Maps URL: opens the app on a phone,
    with the route from wherever the reader stands. Needs no key. */
export function directionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}
