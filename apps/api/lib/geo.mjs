// Where a request came from, according to Vercel's own edge.
//
// The sites used to ask ipapi.co from the browser on every page load. That
// sent every visitor's IP to a third party before the visitor had done
// anything, and the free tier is rated per client IP - once over it, the
// 429 comes back without CORS headers, which surfaces as a CORS error in
// the console rather than a rate limit. Vercel already puts the same facts
// on every request that reaches a function, for free and without a quota,
// so the network asks its own API instead.
//
// Only the DST network uses this. The partner's DKey site has its own
// mechanism and must not depend on this API.

/** Vercel's geo headers, lower-cased as Node delivers them. */
const HEADERS = {
  country: 'x-vercel-ip-country',
  region: 'x-vercel-ip-country-region',
  city: 'x-vercel-ip-city',
  lat: 'x-vercel-ip-latitude',
  lng: 'x-vercel-ip-longitude',
};

// The city header is percent-encoded ("Ras%20Al%20Khaimah").
function decode(value) {
  if (!value) return '';
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/**
 * Reads the geo headers off a request.
 *
 * @param {{ headers?: Record<string, string|string[]|undefined> }} req
 * @returns {{ source: string, country: string, region: string, city: string, lat: string, lng: string }}
 */
export function geoFromRequest(req) {
  const headers = req?.headers ?? {};
  const read = (name) => {
    const value = headers[name];
    return decode(Array.isArray(value) ? value[0] : value);
  };

  const geo = {
    country: read(HEADERS.country),
    region: read(HEADERS.region),
    city: read(HEADERS.city),
    lat: read(HEADERS.lat),
    lng: read(HEADERS.lng),
  };
  // Anything at all means the edge recognised the address; nothing means we
  // are running somewhere that doesn't set these (a local dev server, a
  // test) and the caller should treat the location as unknown rather than
  // as "somewhere with empty fields".
  const known = Object.values(geo).some(Boolean);
  return { source: known ? 'ip' : '', ...geo };
}

/**
 * Fills in a lead's location from the request when the browser didn't
 * supply a better one. GPS wins: it is precise and the visitor granted it
 * on purpose, so a lead that already carries it is returned untouched.
 *
 * @template {{ geo?: { source?: string } }} L
 * @param {L} lead
 * @param {{ headers?: Record<string, string|string[]|undefined> }} req
 * @returns {L}
 */
export function withRequestGeo(lead, req) {
  if (lead?.geo?.source === 'gps') return lead;
  const geo = geoFromRequest(req);
  if (!geo.source) return lead;
  return { ...lead, geo: { ...geo, accuracy: '' } };
}
