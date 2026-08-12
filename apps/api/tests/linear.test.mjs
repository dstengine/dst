import test from 'node:test';
import assert from 'node:assert/strict';
import { sendToLinear, formatIssueTitle, formatIssueDescription } from '../lib/adapters/linear.mjs';

test('sendToLinear fails cleanly when unconfigured', async () => {
  delete process.env.LINEAR_API_KEY;
  delete process.env.LINEAR_TEAM_ID;
  const result = await sendToLinear({ contacts: { phone: '1' } });
  assert.equal(result.ok, false);
  assert.match(result.error, /not configured/);
});

test('formatIssueTitle falls back through name/phone/email/whatsapp/telegram', () => {
  assert.equal(formatIssueTitle({ name: 'Dev', contacts: {} }), 'Lead: Dev');
  assert.equal(formatIssueTitle({ contacts: { phone: '+971501234567' } }), 'Lead: +971501234567');
  assert.equal(formatIssueTitle({ contacts: { email: 'a@b.com' } }), 'Lead: a@b.com');
});

test('formatIssueDescription includes contacts, ref, geo, and meta', () => {
  const description = formatIssueDescription({
    name: 'Dev',
    contacts: { phone: '+971501234567', email: 'a@b.com' },
    ref: { domain: 'riviera.dst.llc' },
    geo: { city: 'Dubai', country: 'UAE' },
    meta: { unitType: '2BR' },
  });
  assert.match(description, /\*\*Name:\*\* Dev/);
  assert.match(description, /\*\*Phone:\*\* \+971501234567/);
  assert.match(description, /\*\*Email:\*\* a@b\.com/);
  assert.match(description, /\*\*Source:\*\* riviera\.dst\.llc/);
  assert.match(description, /\*\*Location:\*\* Dubai, UAE/);
  assert.match(description, /unitType:\*\* 2BR/);
});

test('formatIssueDescription includes form and lists all activity, not raw history', () => {
  const description = formatIssueDescription({
    contacts: { phone: '1' },
    form: { name: 'MBR City rent shortlist' },
    meta: {
      history: [{ type: 'page', url: 'https://mbr.dst.llc/', title: 'MBR City', ts: 1 }],
    },
  });
  assert.match(description, /\*\*Form:\*\* MBR City rent shortlist/);
  assert.match(description, /\*\*Activity \(1 event\(s\)\)\*\*/);
  assert.match(description, /- page: MBR City/);
  assert.doesNotMatch(description, /\[object Object\]/);
});
