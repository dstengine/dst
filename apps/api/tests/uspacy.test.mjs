import test from 'node:test';
import assert from 'node:assert/strict';
import { sendToUspacy, formatTitle, formatComments, splitName } from '../lib/adapters/uspacy.mjs';

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

test('splitName splits on the first space, single-word names go to first_name only', () => {
  assert.deepEqual(splitName('Vladimir Maximally Detailed'), { first_name: 'Vladimir', last_name: 'Maximally Detailed' });
  assert.deepEqual(splitName('Dev'), { first_name: 'Dev' });
  assert.deepEqual(splitName(undefined), {});
});

test('formatComments is plain text (no markdown) - Uspacy fields do not render markdown', () => {
  const comments = formatComments({
    contacts: { phone: '+971501234567', email: 'a@b.com', whatsapp: '+971500000000', telegram: '@dev' },
    geo: { city: 'Dubai', country: 'UAE' },
    meta: { unitType: '2BR' },
  });
  assert.match(comments, /^WhatsApp: \+971500000000$/m);
  assert.match(comments, /^Telegram: @dev$/m);
  assert.match(comments, /^Location: Dubai, UAE$/m);
  assert.match(comments, /unitType: 2BR/);
  assert.doesNotMatch(comments, /\+971501234567/); // phone excluded - already a structured field
  assert.doesNotMatch(comments, /a@b\.com/); // email excluded - already a structured field
  assert.doesNotMatch(comments, /\*/);
});

test('formatComments includes Source as text (the structured field silently drops non-dictionary values)', () => {
  const comments = formatComments({ contacts: { phone: '1' }, ref: { domain: 'dst.llc' } });
  assert.match(comments, /^Source: dst\.llc$/m);
});

test('formatComments includes form and lists all activity, not raw history', () => {
  const comments = formatComments({
    contacts: { phone: '1' },
    form: { name: 'Palm Central register interest' },
    meta: { history: [{ type: 'page', url: 'https://palmcentral.dst.llc/', title: 'Palm Central', ts: 1 }] },
  });
  assert.match(comments, /^Form: Palm Central register interest$/m);
  assert.match(comments, /^Activity \(1 event\(s\)\):$/m);
  assert.match(comments, /- page: Palm Central/);
  assert.doesNotMatch(comments, /\[object Object\]/);
});

test('formatComments omits Name (already the structured first_name/last_name fields)', () => {
  const comments = formatComments({ name: 'Dev', contacts: { whatsapp: '+971500000000' } });
  assert.doesNotMatch(comments, /Name:/);
});
