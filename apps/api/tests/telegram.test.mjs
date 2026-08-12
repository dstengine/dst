import test from 'node:test';
import assert from 'node:assert/strict';
import { formatLeadMessage } from '../lib/adapters/telegram.mjs';
import { sendToTelegram } from '../lib/adapters/telegram.mjs';

test('formatLeadMessage includes name and phone', () => {
  const text = formatLeadMessage({ name: 'Dev', contacts: { phone: '+971501234567' } });
  assert.match(text, /Dev/);
  assert.match(text, /\+971501234567/);
});

test('formatLeadMessage escapes HTML-significant characters', () => {
  const text = formatLeadMessage({ name: '<script>alert(1)</script>', contacts: { phone: '1' } });
  assert.doesNotMatch(text, /<script>/);
  assert.match(text, /&lt;script&gt;/);
});

test('formatLeadMessage omits sections with no data', () => {
  const text = formatLeadMessage({ contacts: { email: 'a@b.com' } });
  assert.doesNotMatch(text, /Meta/);
  assert.doesNotMatch(text, /Source/);
});

test('formatLeadMessage includes form name', () => {
  const text = formatLeadMessage({
    contacts: { email: 'a@b.com' },
    form: { name: 'Golden Visa consultation' },
  });
  assert.match(text, /Form: Golden Visa consultation/);
});

test('formatLeadMessage summarizes meta.history instead of dumping it raw', () => {
  const text = formatLeadMessage({
    contacts: { email: 'a@b.com' },
    meta: { history: [{ type: 'page', url: 'https://dst.llc/', title: 'DST', ts: 1 }] },
  });
  assert.match(text, /History: 1 page\/click event\(s\)/);
  assert.doesNotMatch(text, /\[object Object\]/);
});

test('sendToTelegram fails cleanly when env vars are missing', async () => {
  const savedToken = process.env.TELEGRAM_BOT_TOKEN;
  const savedChat = process.env.TELEGRAM_CHAT_ID;
  delete process.env.TELEGRAM_BOT_TOKEN;
  delete process.env.TELEGRAM_CHAT_ID;

  const result = await sendToTelegram({ contacts: { phone: '1' } });
  assert.equal(result.ok, false);
  assert.match(result.error, /not configured/);

  if (savedToken !== undefined) process.env.TELEGRAM_BOT_TOKEN = savedToken;
  if (savedChat !== undefined) process.env.TELEGRAM_CHAT_ID = savedChat;
});
