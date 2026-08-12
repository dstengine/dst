// POST https://api.dst.llc/api/v1/lead/telegram
// Standalone route for the Telegram adapter - callable directly (e.g. for
// testing, or if a site ever wants to skip the fan-out and post straight to
// Telegram), and this exact handler is what /api/v1/lead calls internally
// for its Telegram leg, so the two never drift apart.

import { parseLead } from '../../../lib/lead-dto.mjs';
import { sendToTelegram } from '../../../lib/adapters/telegram.mjs';

export default async function handler(req, res) {
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

  const result = await sendToTelegram(parsed.lead);
  res.status(result.ok ? 200 : 502).json(result);
}
