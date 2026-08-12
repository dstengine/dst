import test from 'node:test';
import assert from 'node:assert/strict';
import { sendToUspacy } from '../lib/adapters/uspacy.mjs';

test('sendToUspacy fails cleanly when unconfigured', async () => {
  delete process.env.USPACY_WEBHOOK_URL;
  const result = await sendToUspacy({ contacts: { phone: '1' } });
  assert.equal(result.ok, false);
  assert.match(result.error, /not configured/);
});
