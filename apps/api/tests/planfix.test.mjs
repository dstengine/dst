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

test('formatTaskDescription renders real HTML - <b> labels, <br> line breaks (confirmed against the live API)', () => {
  const description = formatTaskDescription({
    name: 'Dev',
    contacts: { phone: '+971501234567', email: 'a@b.com' },
    ref: { domain: 'riviera.dst.llc' },
    geo: { city: 'Dubai', country: 'UAE' },
    meta: { unitType: '2BR' },
  });
  assert.match(description, /<b>Name:<\/b> Dev/);
  assert.match(description, /<b>Phone:<\/b> \+971501234567/);
  assert.match(description, /<b>Email:<\/b> a@b\.com/);
  assert.match(description, /<b>Source:<\/b> riviera\.dst\.llc/);
  assert.match(description, /<b>Location:<\/b> Dubai, UAE/);
  assert.match(description, /unitType:<\/b> 2BR/);
  assert.match(description, /<br>/);
  assert.doesNotMatch(description, /\*/);
});

test('formatTaskDescription escapes HTML-significant characters in values', () => {
  const description = formatTaskDescription({ name: '<script>alert(1)</script>', contacts: { phone: '1' } });
  assert.doesNotMatch(description, /<script>/);
  assert.match(description, /&lt;script&gt;/);
});

test('formatTaskDescription prefers the full page URL over the bare domain for Source', () => {
  const description = formatTaskDescription({
    contacts: { phone: '1' },
    ref: { url: 'https://riviera.dst.llc/rent/?utm_source=x', domain: 'riviera.dst.llc' },
  });
  assert.match(description, /<b>Source:<\/b> https:\/\/riviera\.dst\.llc\/rent\/\?utm_source=x/);
});

test('formatTaskDescription includes form and lists all activity, not raw history', () => {
  const description = formatTaskDescription({
    contacts: { phone: '1' },
    form: { name: 'Riviera rent shortlist', description: 'Rent-shortlist request for Azizi Riviera' },
    meta: {
      history: [
        { type: 'page', url: 'https://riviera.dst.llc/', title: 'Riviera', ts: 1 },
        { type: 'click', label: 'Rent', url: 'https://riviera.dst.llc/rent/', ts: 2 },
      ],
    },
  });
  assert.match(description, /<b>Form:<\/b> Riviera rent shortlist — Rent-shortlist request for Azizi Riviera/);
  assert.match(description, /<b>Activity \(2 event\(s\)\)<\/b>/);
  assert.match(description, /- click: Rent/);
  assert.doesNotMatch(description, /\[object Object\]/);
});
