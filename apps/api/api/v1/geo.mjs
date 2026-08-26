// GET https://api.dst.llc/api/v1/geo
// Coarse location of the caller, from Vercel's edge headers.
//
// Exists so a form can know the visitor's country without the browser
// calling a third-party IP service - to preselect a phone prefix, say.
// Nothing here is secret: it is what the visitor's own address already
// tells any server they connect to, and it is the visitor's own.
//
// The DST network only. The partner's DKey site has its own mechanism and
// must not depend on this API.
import { applyCors } from '../../lib/cors.mjs';
import { geoFromRequest } from '../../lib/geo.mjs';

export default function handler(req, res) {
  if (applyCors(req, res, 'GET, OPTIONS')) return;

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Per-visitor and cheap to recompute; caching it at the edge would hand
  // one visitor's city to the next one.
  res.setHeader('Cache-Control', 'private, no-store');
  res.status(200).json(geoFromRequest(req));
}
