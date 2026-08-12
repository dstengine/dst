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

test('formatComments renders real HTML - <b> labels, <br> line breaks (confirmed against the live API)', () => {
  const comments = formatComments({
    contacts: { phone: '+971501234567', email: 'a@b.com', whatsapp: '+971500000000', telegram: '@dev' },
    geo: { city: 'Dubai', country: 'UAE' },
    meta: { unitType: '2BR' },
  });
  assert.match(comments, /<b>WhatsApp:<\/b> \+971500000000/);
  assert.match(comments, /<b>Telegram:<\/b> @dev/);
  assert.match(comments, /<b>Location:<\/b> Dubai, UAE/);
  assert.match(comments, /unitType:<\/b> 2BR/);
  assert.match(comments, /<br>/);
  assert.doesNotMatch(comments, /\+971501234567/); // phone excluded - already a structured field
  assert.doesNotMatch(comments, /a@b\.com/); // email excluded - already a structured field
  assert.doesNotMatch(comments, /\*/);
});

test('formatComments renders Source as a real clickable link, and Page title when present', () => {
  const comments = formatComments({
    contacts: { phone: '1' },
    ref: { url: 'https://dstdkey.ae/villa-42', title: 'Villa 42 — Palm Jumeirah' },
  });
  assert.match(comments, /<b>Source:<\/b> <a href="https:\/\/dstdkey\.ae\/villa-42">https:\/\/dstdkey\.ae\/villa-42<\/a>/);
  assert.match(comments, /<b>Page title:<\/b> Villa 42 — Palm Jumeirah/);
});

test('formatComments escapes HTML-significant characters in values', () => {
  const comments = formatComments({ contacts: { whatsapp: '<script>alert(1)</script>' } });
  assert.doesNotMatch(comments, /<script>/);
  assert.match(comments, /&lt;script&gt;/);
});

test('formatComments includes Source as a link in comments (the structured `source` field is a closed dictionary and silently drops non-dictionary values)', () => {
  const comments = formatComments({ contacts: { phone: '1' }, ref: { domain: 'dst.llc' } });
  assert.match(comments, /<b>Source:<\/b> <a href="dst\.llc">dst\.llc<\/a>/);
});

test('formatComments includes form and lists all activity, not raw history', () => {
  const comments = formatComments({
    contacts: { phone: '1' },
    form: { name: 'Palm Central register interest' },
    meta: { history: [{ type: 'page', url: 'https://palmcentral.dst.llc/', title: 'Palm Central', ts: 1 }] },
  });
  assert.match(comments, /<b>Form:<\/b> Palm Central register interest/);
  assert.match(comments, /<b>Activity \(1 event\(s\)\)<\/b>/);
  assert.match(comments, /- page: Palm Central/);
  assert.doesNotMatch(comments, /\[object Object\]/);
});

test('formatComments omits Name (already the structured first_name/last_name fields)', () => {
  const comments = formatComments({ name: 'Dev', contacts: { whatsapp: '+971500000000' } });
  assert.doesNotMatch(comments, /Name:/);
});
