// POST https://api.dst.llc/api/v1/lead
// The one endpoint every site posts a lead to. Fans it out, byte-for-byte
// unchanged, to each adapter's own route handler (api/v1/lead/<adapter>.mjs)
// - calling the same handler function the standalone route uses, not a
// separate copy of the logic, so /api/v1/lead/telegram and the Telegram leg
// of /api/v1/lead can never drift apart. Adding Planfix/Uspacy/DKey/MongoDB
// later is a new api/v1/lead/<name>.mjs route plus one import here.

import { parseLead } from '../../lib/lead-dto.mjs';
import telegramHandler from './lead/telegram.mjs';

const adapters = [{ name: 'telegram', handler: telegramHandler }];

// Runs an adapter's own Vercel handler in-process against the same request
// body, instead of an HTTP call back into the deployment - same "unchanged
// object" guarantee, without the extra network hop or needing to know this
// deployment's own URL.
function invokeAdapter(handler, lead) {
  return new Promise((resolve) => {
    const fakeReq = { method: 'POST', body: { lead } };
    const fakeRes = {
      _status: 200,
      status(code) {
        this._status = code;
        return this;
      },
      json(body) {
        resolve({ status: this._status, body });
      },
      setHeader() {},
    };
    Promise.resolve(handler(fakeReq, fakeRes)).catch((err) => {
      resolve({ status: 500, body: { ok: false, error: err instanceof Error ? err.message : String(err) } });
    });
  });
}

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
      const { body } = await invokeAdapter(adapter.handler, parsed.lead);
      return { adapter: adapter.name, ...body };
    })
  );

  const anyFailed = results.some((r) => !r.ok);
  res.status(anyFailed ? 207 : 200).json({ received: true, results });
}
