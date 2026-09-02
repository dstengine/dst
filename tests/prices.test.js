// A price is the one thing on this site a reader can act on and be wrong
// about at the till. These tests are about not letting one through.
//
// They run against the data and against the built pages rather than against
// rules.ts, which imports its neighbours without file extensions and so does
// not load outside Astro. Testing the built output is the stronger check
// anyway: it is what ships.
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const { runs } = await import("../apps/musical/src/data/runs.ts");
const { cities } = await import("../apps/musical/src/data/cities.ts");

// Must match CURRENCY_BY_COUNTRY in apps/musical/src/rules.ts.
const CURRENCY = {
  "United Kingdom": "GBP",
  Ireland: "EUR",
  Japan: "JPY",
  "United Arab Emirates": "AED",
  "United States": "USD",
};

const STALE_DAYS = 42; // must match PRICE_STALE_DAYS in apps/musical/src/rules.ts
const today = new Date().toISOString().slice(0, 10);
const ageOf = (iso) =>
  Math.floor((Date.parse(`${today}T00:00:00Z`) - Date.parse(`${iso}T00:00:00Z`)) / 86400000);

const priced = runs.flatMap((run) =>
  (run.sellers ?? []).filter((s) => s.price).map((s) => ({ run, seller: s, price: s.price })),
);

const pages = [];
if (existsSync("apps/musical/dist")) {
  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.name === "index.html") pages.push(full);
    }
  };
  walk("apps/musical/dist");
}

describe("ticket prices", () => {
  test("every price says when it was read", () => {
    for (const { run, price } of priced)
      assert.match(
        price.checkedOn ?? "",
        /^\d{4}-\d{2}-\d{2}$/,
        `${run.show}/${run.slug}: a price with no checked date cannot be shown honestly`,
      );
  });

  test("no price is dated in the future, and none is a placeholder", () => {
    for (const { run, price } of priced) {
      assert.ok(price.checkedOn <= today, `${run.show}/${run.slug}: checked in the future`);
      assert.ok(price.from > 0 && price.from < 5000, `${run.show}/${run.slug}: ${price.from} is not a ticket price`);
      assert.match(price.currency, /^[A-Z]{3}$/, `${run.show}/${run.slug}: currency must be ISO 4217`);
      if (price.to !== undefined)
        assert.ok(price.to >= price.from, `${run.show}/${run.slug}: range runs backwards`);
    }
  });

  test("a price is in the currency of the country it is sold in", () => {
    for (const { run, price } of priced) {
      const city = cities.find((c) => c.slug === run.city);
      assert.ok(city, `${run.show}/${run.slug}: no city record`);
      const expected = CURRENCY[city.country];
      assert.ok(expected, `${city.country} has no currency on file — add it to CURRENCY_BY_COUNTRY`);
      assert.equal(
        price.currency,
        expected,
        `${run.show}/${run.slug} is in ${city.country}, so ${price.currency} is a typo for ${expected}`,
      );
    }
  });

  test("every country a run plays in has a currency on file", () => {
    const playing = new Set(runs.filter((r) => r.status !== "ended").map((r) => r.city));
    for (const city of cities.filter((c) => playing.has(c.slug)))
      assert.ok(
        CURRENCY[city.country],
        `${city.name} is in ${city.country}, which has no currency — a price there could not be written`,
      );
  });

  // Must match ZERO_DECIMAL in apps/musical/src/rules.ts. These render with
  // no fractional part, so a fraction in the data would be rounded away on
  // the page and the reader would be quoted a price nobody is asking.
  test("prices in a currency written without decimals are whole numbers", () => {
    for (const { run, price } of priced)
      if (["JPY", "AED"].includes(price.currency))
        assert.equal(
          price.from % 1,
          0,
          `${run.show}/${run.slug}: ${price.from} ${price.currency} would be rounded on the page`,
        );
  });

  test("a run that is over does not carry a live price", () => {
    for (const { run, price } of priced)
      if (run.end && run.end < today)
        assert.ok(
          ageOf(price.checkedOn) > STALE_DAYS,
          `${run.show}/${run.slug}: the run has ended and the price is still being offered`,
        );
  });

  test("no page quotes a price it does not also show a reader", () => {
    for (const file of pages) {
      const html = readFileSync(file, "utf8");
      for (const m of html.matchAll(/"price":\s*([\d.]+),"priceCurrency":"GBP"/g)) {
        const n = Number(m[1]);
        const shown = `£${n % 1 === 0 ? n : n.toFixed(2)}`;
        assert.ok(html.includes(shown), `${file}: markup offers ${shown} but no reader is ever shown it`);
      }
    }
  });

  test("every price in the markup carries the day it expires", () => {
    for (const file of pages) {
      const html = readFileSync(file, "utf8");
      const offers = [...html.matchAll(/"price":\s*[\d.]+,"priceCurrency":"[A-Z]{3}"([^}]*)/g)];
      for (const m of offers)
        assert.match(
          m[1],
          /"priceValidUntil":"\d{4}-\d{2}-\d{2}"/,
          `${file}: a price in the markup with no expiry outlives the check behind it`,
        );
    }
  });

  test("a stale price reaches neither the page nor the markup", () => {
    const stale = priced.filter(({ price }) => ageOf(price.checkedOn) > STALE_DAYS);
    for (const { run, price } of stale) {
      const file = `apps/musical/dist/${run.show}/${run.slug}/index.html`;
      if (!existsSync(file)) continue;
      const html = readFileSync(file, "utf8");
      assert.ok(
        !html.includes(`"price":${price.from},`),
        `${run.show}/${run.slug}: price checked on ${price.checkedOn} is past its ${STALE_DAYS} days and still in the markup`,
      );
    }
  });
});
