import test from 'node:test';
import assert from 'node:assert/strict';
import { sendToPlanfix } from '../lib/adapters/planfix.mjs';

test('sendToPlanfix fails cleanly when unconfigured', async () => {
  delete process.env.PLANFIX_WEBHOOK_URL;
  const result = await sendToPlanfix({ contacts: { phone: '1' } });
  assert.equal(result.ok, false);
  assert.match(result.error, /not configured/);
});
