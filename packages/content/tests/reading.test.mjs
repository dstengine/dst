import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readingMinutes } from "../src/reading.ts";
import { allNews, allEvents } from "../src/index.ts";

const words = (n) => Array.from({ length: n }, (_, i) => `word${i}`).join(" ");

describe("reading time", () => {
  test("an item with no prose gets no estimate rather than '1 min'", () => {
    const m = readingMinutes({ slug: "x", site: "dst", title: "t", summary: "s", date: "2026-01-01" });
    console.log("  no body ->", m);
    assert.equal(m, 0);
  });

  test("anything with prose rounds up to at least a minute", () => {
    const m = readingMinutes({ slug: "x", site: "dst", title: "t", summary: "s", date: "2026-01-01", body: [words(12)] });
    console.log("  12 words ->", m, "min");
    assert.equal(m, 1);
  });

  test("600 words at 200wpm is 3 minutes", () => {
    const m = readingMinutes({ slug: "x", site: "dst", title: "t", summary: "s", date: "2026-01-01", body: [words(300), words(300)] });
    console.log("  600 words ->", m, "min");
    assert.equal(m, 3);
  });

  test("the expertise note and an outcome count toward the estimate", () => {
    const base = { slug: "x", site: "dst", title: "t", summary: "s", start: "2026-01-01", body: [words(200)] };
    const plain = readingMinutes(base);
    const withExtras = readingMinutes({ ...base, expertise: words(200), outcome: [words(200)] });
    console.log(`  body only -> ${plain} min; with expertise + outcome -> ${withExtras} min`);
    assert.equal(plain, 1);
    assert.equal(withExtras, 3);
  });

  test("the summary is excluded — it repeats the opening", () => {
    const base = { slug: "x", site: "dst", title: "t", summary: words(1000), date: "2026-01-01", body: [words(200)] };
    console.log("  1000-word summary, 200-word body ->", readingMinutes(base), "min");
    assert.equal(readingMinutes(base), 1);
  });

  test("every published item gets a sane estimate", () => {
    for (const item of [...allNews, ...allEvents]) {
      const m = readingMinutes(item);
      assert.ok(Number.isInteger(m) && m >= 0 && m < 60, `${item.site}/${item.slug}: implausible estimate ${m}`);
      if (item.body?.length) assert.ok(m >= 1, `${item.site}/${item.slug}: has prose but estimate is ${m}`);
      console.log(`  ${item.site}/${item.slug}: ${m} min`);
    }
  });
});
