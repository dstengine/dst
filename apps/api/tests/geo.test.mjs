import test from 'node:test';
import assert from 'node:assert/strict';
import { geoFromRequest, withRequestGeo } from '../lib/geo.mjs';
import geoHandler from '../api/v1/geo.mjs';

const edgeHeaders = {
  'x-vercel-ip-country': 'AE',
  'x-vercel-ip-country-region': 'DU',
  'x-vercel-ip-city': 'Ras%20Al%20Khaimah',
  'x-vercel-ip-latitude': '25.2048',
  'x-vercel-ip-longitude': '55.2708',
};

function fakeRes() {
  return {
    headers: {},
    _status: 200,
    setHeader(k, v) {
      this.headers[k.toLowerCase()] = v;
    },
    status(code) {
      this._status = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
    end() {
      return this;
    },
  };
}

test('reads the edge headers, decoding the city', () => {
  const geo = geoFromRequest({ headers: edgeHeaders });
  assert.deepEqual(geo, {
    source: 'ip',
    country: 'AE',
    region: 'DU',
    city: 'Ras Al Khaimah',
    lat: '25.2048',
    lng: '55.2708',
  });
});

// Somewhere without the edge - a local dev server, a test - the location is
// unknown, not "known and empty".
test('reports no source when the edge set nothing', () => {
  assert.equal(geoFromRequest({ headers: {} }).source, '');
  assert.equal(geoFromRequest({}).source, '');
});

test('a lead with no location gets the request one', () => {
  const lead = withRequestGeo({ contacts: { phone: '+971501234567' } }, { headers: edgeHeaders });
  assert.equal(lead.geo.source, 'ip');
  assert.equal(lead.geo.city, 'Ras Al Khaimah');
});

// GPS is precise and the visitor granted it on purpose; the coarse address
// of their network must not overwrite it.
test('a GPS location is left alone', () => {
  const gps = { source: 'gps', lat: 25.1, lng: 55.2, accuracy: 12, country: '', city: '', region: '' };
  const lead = withRequestGeo({ contacts: { phone: '+971501234567' }, geo: gps }, { headers: edgeHeaders });
  assert.deepEqual(lead.geo, gps);
});

test('a lead is untouched where the edge knows nothing', () => {
  const lead = { contacts: { phone: '+971501234567' } };
  assert.deepEqual(withRequestGeo(lead, { headers: {} }), lead);
});

test('GET /api/v1/geo answers with the location and is not cached', () => {
  const res = fakeRes();
  geoHandler({ method: 'GET', headers: { ...edgeHeaders, origin: 'https://visas.dst.llc' } }, res);
  assert.equal(res._status, 200);
  assert.equal(res.body.country, 'AE');
  assert.equal(res.headers['access-control-allow-origin'], 'https://visas.dst.llc');
  assert.match(res.headers['cache-control'], /no-store/);
});

test('an origin outside the network gets no CORS grant', () => {
  const res = fakeRes();
  geoHandler({ method: 'GET', headers: { ...edgeHeaders, origin: 'https://example.com' } }, res);
  assert.equal(res.headers['access-control-allow-origin'], undefined);
});

test('a preflight is answered without a body', () => {
  const res = fakeRes();
  const handled = geoHandler({ method: 'OPTIONS', headers: { origin: 'https://dst.llc' } }, res);
  assert.equal(res._status, 204);
  assert.equal(res.body, undefined);
  assert.equal(handled, undefined);
  assert.match(res.headers['access-control-allow-methods'], /GET/);
});

test('anything but GET is refused', () => {
  const res = fakeRes();
  geoHandler({ method: 'POST', headers: {} }, res);
  assert.equal(res._status, 405);
});
