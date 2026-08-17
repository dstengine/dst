import test from 'node:test';
import assert from 'node:assert/strict';
import { parseLead } from '../lib/lead-dto.mjs';

test('rejects a missing body', () => {
  const result = parseLead(null);
  assert.equal(result.ok, false);
});

test('rejects a lead with no contacts', () => {
  const result = parseLead({ lead: { name: 'Dev', contacts: {} } });
  assert.equal(result.ok, false);
});

test('rejects a lead with only whitespace contacts', () => {
  const result = parseLead({ lead: { contacts: { phone: '   ' } } });
  assert.equal(result.ok, false);
});

test('accepts a lead with just a phone number', () => {
  const result = parseLead({ lead: { contacts: { phone: '+971501234567' } } });
  assert.equal(result.ok, true);
  assert.equal(result.lead.contacts.phone, '+971501234567');
});

test('accepts a lead with only telegram as contact', () => {
  const result = parseLead({ lead: { contacts: { telegram: '@someone' } } });
  assert.equal(result.ok, true);
});

test('rejects a lead with the honeypot field filled', () => {
  const result = parseLead({ lead: { contacts: { phone: '+971501234567' }, company: 'Acme Inc' } });
  assert.equal(result.ok, false);
});

test('rejects the honeypot the same way as a missing contact, so a bot can\'t tell the two apart', () => {
  const honeypot = parseLead({ lead: { contacts: { phone: '+971501234567' }, company: 'Acme Inc' } });
  const noContact = parseLead({ lead: { contacts: {} } });
  assert.equal(honeypot.error, noContact.error);
});

test('accepts a lead with an empty honeypot field', () => {
  const result = parseLead({ lead: { contacts: { phone: '+971501234567' }, company: '' } });
  assert.equal(result.ok, true);
});

test('passes through optional fields unchanged', () => {
  const input = {
    lead: {
      name: 'Dev',
      contacts: { email: 'a@b.com' },
      meta: { source: 'riviera' },
      ref: { domain: 'riviera.dst.llc', utm_source: 'google' },
    },
  };
  const result = parseLead(input);
  assert.equal(result.ok, true);
  assert.deepEqual(result.lead.meta, { source: 'riviera' });
  assert.equal(result.lead.ref.domain, 'riviera.dst.llc');
});
