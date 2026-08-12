// POST https://api.dst.llc/api/v1/lead/uspacy
// Standalone route for the Uspacy.com adapter - see
// api/v1/lead/telegram.mjs for why this exists as its own route rather than
// only living inside the /api/v1/lead fan-out.

import { parseLead } from '../../../lib/lead-dto.mjs';
import { applyCors } from '../../../lib/cors.mjs';
import { sendToUspacy } from '../../../lib/adapters/uspacy.mjs';

export default async function handler(req, res) {
  if (applyCors(req, res)) return;

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const parsed = parseLead(req.body);
  if (!parsed.ok) {
    res.status(400).json({ error: parsed.error });
    return;
  }

  const result = await sendToUspacy(parsed.lead);
  res.status(result.ok ? 200 : 502).json(result);
}
