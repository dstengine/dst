// POST https://api.dst.llc/api/v1/lead
// Vercel Functions convention: this file's path under api/ *is* the route.
// Accepts the universal lead DTO and fans it out, unchanged, to every
// configured adapter. Today that's just Telegram; Planfix/Uspacy/DKey/
// MongoDB adapters slot in the same way later (see ~/mind/local/dubai/
// crm/webhook.md) - each just needs a sendToX(lead) function added to the
// `adapters` list below.

import { parseLead } from '../../lib/lead-dto.mjs';
import { sendToTelegram } from '../../lib/adapters/telegram.mjs';

const adapters = [{ name: 'telegram', send: sendToTelegram }];

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

  const results = await Promise.all(
    adapters.map(async (adapter) => {
      try {
        const result = await adapter.send(parsed.lead);
        return { adapter: adapter.name, ...result };
      } catch (err) {
        return { adapter: adapter.name, ok: false, error: err instanceof Error ? err.message : String(err) };
      }
    })
  );

  const anyFailed = results.some((r) => !r.ok);
  res.status(anyFailed ? 207 : 200).json({ received: true, results });
}
