import test from 'node:test';
import assert from 'node:assert/strict';
import { sendToUspacy, formatTitle, formatComments } from '../lib/adapters/uspacy.mjs';

test('sendToUspacy fails cleanly when unconfigured', async () => {
  delete process.env.USPACY_WEBHOOK_URL;
  const result = await sendToUspacy({ contacts: { phone: '1' } });
  assert.equal(result.ok, false);
  assert.match(result.error, /not configured/);
});

test('formatTitle falls back through name/phone/email/whatsapp/telegram', () => {
  assert.equal(formatTitle({ name: 'Dev', contacts: {} }), 'Lead: Dev');
  assert.equal(formatTitle({ contacts: { phone: '+971501234567' } }), 'Lead: +971501234567');
  assert.equal(formatTitle({ contacts: { email: 'a@b.com' } }), 'Lead: a@b.com');
});

test('formatComments includes whatsapp, telegram, geo, and meta but not phone/email', () => {
  const comments = formatComments({
    contacts: { phone: '+971501234567', email: 'a@b.com', whatsapp: '+971500000000', telegram: '@dev' },
    geo: { city: 'Dubai', country: 'UAE' },
    meta: { unitType: '2BR' },
  });
  assert.match(comments, /WhatsApp: \+971500000000/);
  assert.match(comments, /Telegram: @dev/);
  assert.match(comments, /Location: Dubai, UAE/);
  assert.match(comments, /unitType: 2BR/);
  assert.doesNotMatch(comments, /\+971501234567/);
  assert.doesNotMatch(comments, /a@b\.com/);
});
