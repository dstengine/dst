import test from 'node:test';
import assert from 'node:assert/strict';
import { formatLeadText, formatLeadTitle } from '../lib/lead-text.mjs';

test('formatLeadTitle falls back through name/phone/email/whatsapp/telegram', () => {
  assert.equal(formatLeadTitle({ name: 'Dev', contacts: {} }), 'Lead: Dev');
  assert.equal(formatLeadTitle({ contacts: { phone: '+971501234567' } }), 'Lead: +971501234567');
  assert.equal(formatLeadTitle({ contacts: {} }), 'Lead: undefined');
  assert.equal(formatLeadTitle({ contacts: { phone: '1' } }, 'New: '), 'New: 1');
});

test('formatLeadText includes name, contacts, form, source, and location as Markdown', () => {
  const text = formatLeadText({
    name: 'Dev',
    contacts: { phone: '+971501234567', email: 'a@b.com', whatsapp: '+971500000000', telegram: '@dev' },
    form: { name: 'Golden Visa consultation', description: 'Shortlist request' },
    ref: { domain: 'visas.dst.llc' },
    geo: { city: 'Dubai', country: 'UAE' },
  });
  assert.match(text, /\*\*Name:\*\* Dev/);
  assert.match(text, /\*\*Phone:\*\* \+971501234567/);
  assert.match(text, /\*\*Email:\*\* a@b\.com/);
  assert.match(text, /\*\*WhatsApp:\*\* \+971500000000/);
  assert.match(text, /\*\*Telegram:\*\* @dev/);
  assert.match(text, /\*\*Form:\*\* Golden Visa consultation — Shortlist request/);
  assert.match(text, /\*\*Source:\*\* visas\.dst\.llc/);
  assert.match(text, /\*\*Location:\*\* Dubai, UAE/);
});

test('formatLeadText includes Page title right after Source when ref.title is present', () => {
  const text = formatLeadText({ contacts: { phone: '1' }, ref: { url: 'https://dst.llc/villa-42', title: 'Villa 42 — Palm Jumeirah' } });
  assert.match(text, /\*\*Source:\*\* https:\/\/dst\.llc\/villa-42\n\*\*Page title:\*\* Villa 42 — Palm Jumeirah/);
});

test('formatLeadText omits Page title when ref.title is absent', () => {
  const text = formatLeadText({ contacts: { phone: '1' }, ref: { url: 'https://dst.llc/' } });
  assert.doesNotMatch(text, /Page title:/);
});

test('formatLeadText renders Source as plain text when no `link` option is given (Markdown adapters)', () => {
  const text = formatLeadText({ contacts: { phone: '1' }, ref: { url: 'https://dst.llc/' } });
  assert.match(text, /\*\*Source:\*\* https:\/\/dst\.llc\//);
  assert.doesNotMatch(text, /<a /);
});

test('formatLeadText routes the Source value through a custom `link` renderer', () => {
  const text = formatLeadText(
    { contacts: { phone: '1' }, ref: { url: 'https://dst.llc/' } },
    { link: (url, text) => `<a href="${url}">${text}</a>` }
  );
  assert.match(text, /\*\*Source:\*\* <a href="https:\/\/dst\.llc\/">https:\/\/dst\.llc\/<\/a>/);
});

test('formatLeadText prefers the full URL over the bare domain for Source', () => {
  const withUrl = formatLeadText({ contacts: { phone: '1' }, ref: { url: 'https://dst.llc/contact/', domain: 'dst.llc' } });
  assert.match(withUrl, /\*\*Source:\*\* https:\/\/dst\.llc\/contact\//);

  const domainOnly = formatLeadText({ contacts: { phone: '1' }, ref: { domain: 'dst.llc' } });
  assert.match(domainOnly, /\*\*Source:\*\* dst\.llc/);
});

test('formatLeadText joins with a custom lineBreak instead of "\\n"', () => {
  const text = formatLeadText(
    { name: 'Dev', contacts: { phone: '1' }, meta: { a: '1' } },
    { lineBreak: '<br>' }
  );
  assert.match(text, /\*\*Name:\*\* Dev<br>\*\*Phone:\*\* 1<br><br>\*\*Meta\*\*/);
  assert.doesNotMatch(text, /\n/);
});

test('formatLeadText renders every meta.history entry as a bulleted list, in order', () => {
  const history = Array.from({ length: 7 }, (_, i) => ({ type: 'page', url: `https://dst.llc/${i}`, title: `Page ${i}`, ts: i }));
  const text = formatLeadText({ contacts: { phone: '1' }, meta: { history } });
  assert.match(text, /\*\*Activity \(7 event\(s\)\)\*\*/);
  assert.match(text, /- page: Page 0/);
  assert.match(text, /- page: Page 6/);
  assert.doesNotMatch(text, /\[object Object\]/);
});

test('formatLeadText renders click history entries by label, not url', () => {
  const text = formatLeadText({
    contacts: { phone: '1' },
    meta: { history: [{ type: 'click', label: 'Register interest', url: 'https://dst.llc/#interest', ts: 1 }] },
  });
  assert.match(text, /- click: Register interest/);
});

test('formatLeadText applies a custom escape to values, not the template markup', () => {
  const text = formatLeadText(
    { contacts: { phone: 'abc' } },
    { escape: (v) => String(v).toUpperCase() }
  );
  assert.match(text, /\*\*Phone:\*\* ABC/); // value escaped, ** markers untouched
});

test('formatLeadText respects includeName, excludeContacts, and includeSource', () => {
  const text = formatLeadText(
    { name: 'Dev', contacts: { phone: '1', email: 'a@b.com' }, ref: { domain: 'dst.llc' } },
    { includeName: false, excludeContacts: ['email'], includeSource: false }
  );
  assert.doesNotMatch(text, /Name:/);
  assert.doesNotMatch(text, /Email:/);
  assert.doesNotMatch(text, /Source:/);
  assert.match(text, /\*\*Phone:\*\* 1/);
});

test('formatLeadText renders plain text (no markdown) when bold/section are overridden to no-ops', () => {
  const text = formatLeadText(
    {
      name: 'Dev',
      contacts: { phone: '1' },
      meta: { history: [{ type: 'page', url: 'https://dst.llc/', title: 'DST', ts: 1 }] },
    },
    { bold: (label) => label, section: (title) => `${title}:` }
  );
  assert.match(text, /^Name: Dev$/m);
  assert.match(text, /^Phone: 1$/m);
  assert.match(text, /^Activity \(1 event\(s\)\):$/m);
  assert.doesNotMatch(text, /\*/);
});
