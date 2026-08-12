import test from 'node:test';
import assert from 'node:assert/strict';
import { sendToPlanfix, formatTaskName, formatTaskDescription } from '../lib/adapters/planfix.mjs';

test('sendToPlanfix fails cleanly when unconfigured', async () => {
  delete process.env.PLANFIX_API_TOKEN;
  delete process.env.PLANFIX_ACCOUNT;
  const result = await sendToPlanfix({ contacts: { phone: '1' } });
  assert.equal(result.ok, false);
  assert.match(result.error, /not configured/);
});

test('formatTaskName falls back through name/phone/email/whatsapp/telegram', () => {
  assert.equal(formatTaskName({ name: 'Dev', contacts: {} }), 'Lead: Dev');
  assert.equal(formatTaskName({ contacts: { phone: '+971501234567' } }), 'Lead: +971501234567');
  assert.equal(formatTaskName({ contacts: { email: 'a@b.com' } }), 'Lead: a@b.com');
});

test('formatTaskDescription includes contacts, ref, geo, and meta', () => {
  const description = formatTaskDescription({
    name: 'Dev',
    contacts: { phone: '+971501234567', email: 'a@b.com' },
    ref: { domain: 'riviera.dst.llc' },
    geo: { city: 'Dubai', country: 'UAE' },
    meta: { unitType: '2BR' },
  });
  assert.match(description, /Name: Dev/);
  assert.match(description, /Phone: \+971501234567/);
  assert.match(description, /Email: a@b\.com/);
  assert.match(description, /Source: riviera\.dst\.llc/);
  assert.match(description, /Location: Dubai, UAE/);
  assert.match(description, /unitType: 2BR/);
});
