import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { localize, localizeLinks } from "../src/i18n.ts";

const entry = {
  slug: "s",
  site: "x",
  title: "Հելոուին",
  body: [
    'Նույն օրը՝ <a href="/events/aki-fest/">Aki Fest-ը</a> և <a href="/am/events/boulder/">Boulderland-ը</a>։',
    '<a href="/go/artlav/">Տոմսեր</a>, <a href="/events.ics">օրացույց</a>, <a href="/rss.xml?x=1">RSS</a>, <a href="https://example.am/events/">կայքը</a>',
    '<a href="/">Գլխավոր</a> և <a href="/calendar/2026-11/#week">նոյեմբեր</a>',
  ],
  faq: [{ q: "Ե՞րբ", a: 'Տե՛ս <a href="/venues/artlav/">վայրը</a>' }],
  updates: [{ on: "2026-10-25", text: 'Նոր <a href="/news/x/">լուր</a>' }],
  path: "/halloween/",
  tickets: { priceFrom: 20000 },
  i18n: { en: { title: "Halloween", body: ['Same day: <a href="/events/aki-fest/">Aki Fest</a>'] } },
};

describe("localizeLinks", () => {
  const am = localizeLinks(localize(entry, "hy"), "/am/");

  test("a link to one of the site's pages moves under the prefix, wherever it sits", () => {
    assert.match(am.body[0], /href="\/am\/events\/aki-fest\/"/);
    assert.equal(am.faq[0].a, 'Տե՛ս <a href="/am/venues/artlav/">վայրը</a>');
    assert.equal(am.updates[0].text, 'Նոր <a href="/am/news/x/">լուր</a>');
    assert.match(am.body[2], /href="\/am\/"/);
    assert.match(am.body[2], /href="\/am\/calendar\/2026-11\/#week"/);
  });

  test("a link already under the prefix, a /go/ redirect, a file and another site stay", () => {
    assert.match(am.body[0], /href="\/am\/events\/boulder\/"/);
    assert.doesNotMatch(am.body[0], /\/am\/am\//);
    assert.equal(am.body[1], entry.body[1]);
  });

  test("everything that is not a link is left alone", () => {
    assert.equal(am.title, "Հելոուին");
    assert.equal(am.path, "/halloween/");
    assert.deepEqual(am.tickets, { priceFrom: 20000 });
    assert.equal(entry.body[0].includes('href="/events/aki-fest/"'), true, "the entry itself is not changed");
  });

  test("a language at the root changes nothing", () => {
    const en = localize(entry, "en");
    assert.equal(localizeLinks(en, "/"), en);
  });
});
