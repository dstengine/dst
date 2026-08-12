import test from 'node:test';
import assert from 'node:assert/strict';
import { formatLeadText, formatLeadTitle } from '../lib/lead-text.mjs';

test('formatLeadTitle falls back through name/phone/email/whatsapp/telegram', () => {
  assert.equal(formatLeadTitle({ name: 'Dev', contacts: {} }), 'Lead: Dev');
  assert.equal(formatLeadTitle({ contacts: { phone: '+971501234567' } }), 'Lead: +971501234567');
  assert.equal(formatLeadTitle({ contacts: {} }), 'Lead: undefined');
  assert.equal(formatLeadTitle({ contacts: { phone: '1' } }, 'New: '), 'New: 1');
});

test('formatLeadText includes name, contacts, form, source, and location', () => {
  const text = formatLeadText({
    name: 'Dev',
    contacts: { phone: '+971501234567', email: 'a@b.com', whatsapp: '+971500000000', telegram: '@dev' },
    form: { name: 'Golden Visa consultation', description: 'Shortlist request' },
    ref: { domain: 'visas.dst.llc' },
    geo: { city: 'Dubai', country: 'UAE' },
  });
  assert.match(text, /Name: Dev/);
  assert.match(text, /Phone: \+971501234567/);
  assert.match(text, /Email: a@b\.com/);
  assert.match(text, /WhatsApp: \+971500000000/);
  assert.match(text, /Telegram: @dev/);
  assert.match(text, /Form: Golden Visa consultation — Shortlist request/);
  assert.match(text, /Source: visas\.dst\.llc/);
  assert.match(text, /Location: Dubai, UAE/);
});

test('formatLeadText renders meta.history as a bulleted list, most recent last, capped at 5', () => {
  const history = Array.from({ length: 7 }, (_, i) => ({ type: 'page', url: `https://dst.llc/${i}`, title: `Page ${i}`, ts: i }));
  const text = formatLeadText({ contacts: { phone: '1' }, meta: { history } });
  assert.match(text, /Recent activity \(7 total\)/);
  assert.match(text, /- page: Page 6/);
  assert.doesNotMatch(text, /Page 0/); // oldest of 7 falls outside the 5-entry cap
  assert.doesNotMatch(text, /\[object Object\]/);
});

test('formatLeadText renders click history entries by label, not url', () => {
  const text = formatLeadText({
    contacts: { phone: '1' },
    meta: { history: [{ type: 'click', label: 'Register interest', url: 'https://dst.llc/#interest', ts: 1 }] },
  });
  assert.match(text, /- click: Register interest/);
});

test('formatLeadText applies a custom escape and section template', () => {
  const text = formatLeadText(
    { contacts: { phone: '<b>1</b>' } },
    { escape: (v) => String(v).toUpperCase(), section: (t) => `## ${t}` }
  );
  assert.match(text, /Phone: <B>1<\/B>/);
});

test('formatLeadText respects includeName, excludeContacts, and includeSource', () => {
  const text = formatLeadText(
    { name: 'Dev', contacts: { phone: '1', email: 'a@b.com' }, ref: { domain: 'dst.llc' } },
    { includeName: false, excludeContacts: ['email'], includeSource: false }
  );
  assert.doesNotMatch(text, /Name: Dev/);
  assert.doesNotMatch(text, /Email/);
  assert.doesNotMatch(text, /Source/);
  assert.match(text, /Phone: 1/);
});
