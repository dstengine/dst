import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { buildVenues, venueOf, venueHrefFor, ENOUGH_VENUE } from "../src/venues.ts";

const event = (over) => ({ slug: "s", site: "x", title: "t", summary: "s", start: "2026-11-01", ...over });
const opera = { slug: "opera", match: ["Spendiaryan Opera", "Սպենդիարյանի"], name: "Spendiaryan Opera" };
const club = { slug: "tonelab", match: ["Tonelab"], name: "Tonelab" };
const today = "2026-11-10";

describe("venueOf", () => {
  test("matches the beginning of the venue line, case-insensitively, in either language", () => {
    assert.equal(venueOf(event({ venue: "Spendiaryan Opera and Ballet Theatre, Small Hall" }), [opera, club]), opera);
    assert.equal(venueOf(event({ venue: "tonelab, 19a Koryun" }), [opera, club]), club);
    assert.equal(venueOf(event({ venue: "Սպենդիարյանի անվան օպերա" }), [opera, club]), opera);
  });

  test("a venue line that matches nothing, or no line at all, is no venue", () => {
    assert.equal(venueOf(event({ venue: "Someone's living room" }), [opera, club]), undefined);
    assert.equal(venueOf(event({}), [opera, club]), undefined);
  });
});

describe("buildVenues", () => {
  test("a room needs ENOUGH_VENUE dates; the rest are left as text", () => {
    assert.equal(ENOUGH_VENUE, 2);
    const items = [event({ slug: "a", venue: "Tonelab" }), event({ slug: "b", venue: "Spendiaryan Opera" }), event({ slug: "c", venue: "Spendiaryan Opera" })];
    const out = buildVenues({ items, venues: [opera, club], today });
    console.log("dates per room: opera 2, tonelab 1 ->", out.map((v) => v.slug));
    assert.deepEqual(out.map((v) => v.slug), ["opera"]);
  });

  test("items soonest first, upcoming and past split by today, next = first upcoming", () => {
    const items = [
      event({ slug: "late", venue: "Tonelab", start: "2026-12-01" }),
      event({ slug: "gone", venue: "Tonelab", start: "2026-10-01" }),
      event({ slug: "soon", venue: "Tonelab", start: "2026-11-12" }),
    ];
    const [v] = buildVenues({ items, venues: [club], today });
    assert.deepEqual(v.items.map((i) => i.slug), ["gone", "soon", "late"]);
    assert.deepEqual(v.upcoming.map((i) => i.slug), ["soon", "late"]);
    assert.deepEqual(v.past.map((i) => i.slug), ["gone"]);
    assert.equal(v.next.slug, "soon");
  });

  test("rooms with dates still to come rank first, by how many; then by how much we hold", () => {
    const items = [
      event({ slug: "a", venue: "Spendiaryan Opera", start: "2026-09-01" }),
      event({ slug: "b", venue: "Spendiaryan Opera", start: "2026-09-02" }),
      event({ slug: "c", venue: "Spendiaryan Opera", start: "2026-09-03" }),
      event({ slug: "d", venue: "Tonelab", start: "2026-11-20" }),
      event({ slug: "e", venue: "Tonelab", start: "2026-09-02" }),
    ];
    const out = buildVenues({ items, venues: [opera, club], today });
    console.log("opera holds 3, all past; tonelab holds 2, one ahead ->", out.map((v) => v.slug));
    assert.deepEqual(out.map((v) => v.slug), ["tonelab", "opera"]);
  });
});

describe("venueHrefFor", () => {
  test("the page under the base for a room that has one, nothing otherwise", () => {
    const items = [event({ slug: "a", venue: "Tonelab" }), event({ slug: "b", venue: "Tonelab" })];
    const built = buildVenues({ items, venues: [opera, club], today });
    assert.equal(venueHrefFor(event({ venue: "Tonelab" }), built, "/am/venues/"), "/am/venues/tonelab/");
    assert.equal(venueHrefFor(event({ venue: "Spendiaryan Opera" }), built, "/venues/"), undefined);
  });
});
