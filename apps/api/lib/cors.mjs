// Every lead route is called cross-origin, from browser fetch() on each
// *.dst.llc site - there's no shared origin with api.dst.llc, so every
// public route needs to answer the CORS preflight and echo an allowed
// origin, or the browser blocks the request before it ever reaches here.
const ALLOWED_ORIGIN = /^https:\/\/([a-z0-9-]+\.)*dst\.llc$/;
const DEV_ORIGIN = /^http:\/\/localhost(:\d+)?$/;

/**
 * Sets CORS headers for a lead-submission route and answers an OPTIONS
 * preflight directly.
 *
 * @param {{ method?: string, headers?: Record<string, string> }} req
 * @param {{ setHeader: Function, status: Function }} res
 * @returns {boolean} true if this was a preflight and the caller already
 *   responded - the route handler should return immediately.
 */
export function applyCors(req, res) {
  const origin = req.headers?.origin;
  if (origin && (ALLOWED_ORIGIN.test(origin) || DEV_ORIGIN.test(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }
  return false;
}
