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

  test("next is the entry on soonest by its next night, not the one that opened first", () => {
    // Pagliacci opened in October and plays 17 November; Carmen plays the
    // 14th. On 10 November the Opera is next at Carmen, on the 14th.
    const items = [
      event({ slug: "pagliacci", venue: "Spendiaryan Opera", start: "2026-10-08", end: "2027-02-17", startTime: "19:00", dates: ["2026-10-08", "2026-11-17", "2027-01-31", "2027-02-17"], times: { "2027-01-31": "18:00" } }),
      event({ slug: "carmen", venue: "Spendiaryan Opera", start: "2026-10-10", end: "2027-02-06", startTime: "18:00", dates: ["2026-10-10", "2026-11-14", "2027-01-10", "2027-02-06"] }),
      event({ slug: "gala", venue: "Spendiaryan Opera", start: "2026-11-20" }),
      // A run without a list is on every day it runs, so it is next today.
      event({ slug: "exhibition", venue: "Spendiaryan Opera", start: "2026-11-01", end: "2026-11-30" }),
    ];
    const [v] = buildVenues({ items, venues: [opera], today });
    console.log("next nights 17, 14, 20 Nov and a run on today ->", v.upcoming.map((i) => i.slug));
    assert.deepEqual(v.upcoming.map((i) => i.slug), ["exhibition", "carmen", "pagliacci", "gala"]);
    const [w] = buildVenues({ items: items.slice(0, 3), venues: [opera], today });
    assert.equal(w.next.slug, "carmen");
    // The whole list stays in start order.
    assert.deepEqual(w.items.map((i) => i.slug), ["pagliacci", "carmen", "gala"]);
  });

  test("two entries next on the same day go by that day's hour, then start, then slug", () => {
    const run = { slug: "run", venue: "Tonelab", start: "2026-11-01", end: "2026-11-12", startTime: "20:00", dates: ["2026-11-01", "2026-11-12"] };
    const items = [
      event({ slug: "b", venue: "Tonelab", start: "2026-11-12" }),
      event(run),
      event({ slug: "a", venue: "Tonelab", start: "2026-11-12" }),
      event({ slug: "matinee", venue: "Tonelab", start: "2026-11-12", startTime: "13:00" }),
    ];
    const [v] = buildVenues({ items, venues: [club], today });
    console.log("12 Nov: two with no hour, one at 13:00, a run at 20:00 ->", v.upcoming.map((i) => i.slug));
    assert.deepEqual(v.upcoming.map((i) => i.slug), ["a", "b", "matinee", "run"]);
    assert.equal(v.next.slug, "a");
    // A run's hour that night comes from `times`, not its usual startTime.
    items[1] = event({ ...run, times: { "2026-11-12": "12:00" } });
    const [w] = buildVenues({ items, venues: [club], today });
    assert.deepEqual(w.upcoming.map((i) => i.slug), ["a", "b", "run", "matinee"]);
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

const { placeFacts, looksLikeStreet } = await import("../src/venues.ts");

describe("placeFacts", () => {
  const at = (venue, city = "London") => placeFacts({ venue, city });

  test("a street after the name goes to the street, the name keeps the rest", () => {
    assert.deepEqual(at("Chelsea Physic Garden, 66 Royal Hospital Road"), { type: "Place", name: "Chelsea Physic Garden", street: "66 Royal Hospital Road", locality: "London" });
    assert.deepEqual(at("Armenian State Philharmonia, Babajanyan Concert Hall, 2 Abovyan Street", "Yerevan"), { type: "Place", name: "Armenian State Philharmonia, Babajanyan Concert Hall", street: "2 Abovyan Street", locality: "Yerevan" });
    assert.equal(at("Forty44, Ղազար Փարպեցու փողոց 16", "Երևան").street, "Ղազար Փարպեցու փողոց 16");
    assert.equal(at("Centro Deportivo, Francisco Goitia S/N, Xochimilco", "CDMX").street, "Francisco Goitia S/N, Xochimilco");
  });

  test("a tail that is not a street stays in the name and no street is claimed", () => {
    for (const v of ["Dubai Opera, Main Auditorium", "River Thames, Putney to Mortlake", "Curva 4, Autódromo Hermanos Rodríguez", "Explanada del Estadio Akron, Zapopan", "Dubai World Trade Centre, Halls 4–8", "ADNEC, Hall 9", "Wimbledon Park, SW19 (5 November) and Morden Park (7 November)"]) {
      const f = at(v);
      assert.equal(f.name, v);
      assert.equal(f.street, undefined);
    }
  });

  test("the street test reads Armenian, German and Spanish street words, not lookalikes", () => {
    for (const s of ["Տիգրան Պետրոսյան փողոց", "Straße des 17. Juni", "Calle Museo", "SE1 8XX", "Ashtarak Highway 30"]) assert.ok(looksLikeStreet(s), s);
    for (const s of ["Main Auditorium", "Expo City", "Strand", "Prater", "Stadium"]) assert.ok(!looksLikeStreet(s), s);
  });

  test("a declared venue answers first, with its own type, street, town and region", () => {
    const winery = { slug: "w", match: ["Van Ardi"], name: "Van Ardi Winery", schemaType: "Winery", locality: "Sasunik", region: "Aragatsotn Province" };
    assert.deepEqual(placeFacts({ venue: "Van Ardi Winery, Sasunik, Aragatsotn province", city: "Sasunik" }, winery), { type: "Winery", name: "Van Ardi Winery", locality: "Sasunik", region: "Aragatsotn Province" });
    const hall = { slug: "h", match: ["Armenian State"], name: "Babajanyan Concert Hall", address: "2 Abovyan Street", schemaType: "MusicVenue", geo: { lat: 1, lng: 2 } };
    assert.deepEqual(placeFacts({ venue: "Armenian State Philharmonia, Babajanyan Concert Hall", city: "Yerevan" }, hall), { type: "MusicVenue", name: "Babajanyan Concert Hall", street: "2 Abovyan Street", locality: "Yerevan", geo: { lat: 1, lng: 2 } });
  });

  test("nothing to say is nothing", () => {
    assert.equal(placeFacts({}), undefined);
    assert.deepEqual(placeFacts({ city: "Dubai" }), { type: "Place", name: "Dubai", locality: "Dubai" });
  });
});
