import test from 'node:test';
import assert from 'node:assert/strict';
import telegramRoute from '../api/v1/lead/telegram.mjs';
import leadRoute from '../api/v1/lead.mjs';

function fakeReqRes(method, body, headers = {}) {
  const req = { method, body, headers };
  const res = {
    _status: 200,
    _body: null,
    _headers: {},
    status(code) {
      this._status = code;
      return this;
    },
    json(body) {
      this._body = body;
      return this;
    },
    setHeader(name, value) {
      this._headers[name] = value;
    },
    end() {},
  };
  return { req, res };
}

test('lead/telegram rejects non-POST', async () => {
  const { req, res } = fakeReqRes('GET', null);
  await telegramRoute(req, res);
  assert.equal(res._status, 405);
});

test('lead/telegram rejects a lead with no contacts', async () => {
  const { req, res } = fakeReqRes('POST', { lead: { contacts: {} } });
  await telegramRoute(req, res);
  assert.equal(res._status, 400);
});

test('lead/telegram reports a clean failure when env vars are missing', async () => {
  delete process.env.TELEGRAM_BOT_TOKEN;
  delete process.env.TELEGRAM_CHAT_ID;
  const { req, res } = fakeReqRes('POST', { lead: { contacts: { phone: '1' } } });
  await telegramRoute(req, res);
  assert.equal(res._status, 502);
  assert.equal(res._body.ok, false);
});

test('lead rejects non-POST', async () => {
  const { req, res } = fakeReqRes('GET', null);
  await leadRoute(req, res);
  assert.equal(res._status, 405);
});

test('lead rejects a body with no lead', async () => {
  const { req, res } = fakeReqRes('POST', {});
  await leadRoute(req, res);
  assert.equal(res._status, 400);
});

test('lead fans out to the telegram adapter with the same lead object', async () => {
  delete process.env.TELEGRAM_BOT_TOKEN;
  delete process.env.TELEGRAM_CHAT_ID;
  const { req, res } = fakeReqRes('POST', { lead: { name: 'Dev', contacts: { phone: '+971501234567' } } });
  await leadRoute(req, res);

  assert.equal(res._body.received, true);
  const byAdapter = Object.fromEntries(res._body.results.map((r) => [r.adapter, r]));
  assert.deepEqual(Object.keys(byAdapter).sort(), ['linear', 'planfix', 'telegram', 'uspacy']);
  // No env configured for any adapter in this test run, so all report
  // ok:false - what matters here is that they were actually invoked with
  // the lead (missing-config is a clean failure, not a crash), and the
  // overall route reflects that as a 207 partial-failure rather than a 500.
  assert.equal(byAdapter.telegram.ok, false);
  assert.equal(byAdapter.planfix.ok, false);
  assert.equal(byAdapter.uspacy.ok, false);
  assert.equal(byAdapter.linear.ok, false);
  assert.equal(res._status, 207);
});

test('lead answers an OPTIONS preflight from an allowed dst.llc origin', async () => {
  const { req, res } = fakeReqRes('OPTIONS', null, { origin: 'https://palmcentral.dst.llc' });
  await leadRoute(req, res);
  assert.equal(res._status, 204);
  assert.equal(res._headers['Access-Control-Allow-Origin'], 'https://palmcentral.dst.llc');
});

test('lead does not echo a disallowed origin', async () => {
  const { req, res } = fakeReqRes('OPTIONS', null, { origin: 'https://evil.example' });
  await leadRoute(req, res);
  assert.equal(res._status, 204);
  assert.equal(res._headers['Access-Control-Allow-Origin'], undefined);
});
