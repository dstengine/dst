// tools/igloofest-shop-diff.mjs without the network: three saved answers of
// the Igloofest shop (three of its twelve nights, pruned to what the parser
// reads) against a sheet written to differ from them in known places.
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FIXTURES = path.join(REPO, "tests/fixtures/igloofest-shop");
const TOOL = path.join(REPO, "tools/igloofest-shop-diff.mjs");
const { parseShop, diffSheet, CALLS } = await import("../tools/igloofest-shop-diff.mjs");

const read = (name) => JSON.parse(fs.readFileSync(path.join(FIXTURES, name), "utf8"));
const responses = () => ({
  series: read(`${CALLS.series}.json`),
  prices: read(`${CALLS.prices}.json`),
  avail: read(`${CALLS.avail}.json`),
});
const sheet = () => read("sheet.json");

describe("the parser", () => {
  const shop = parseShop(responses());

  test("reads one row per night, the Igloopass left out", () => {
    assert.deepEqual(Object.keys(shop.nights), ["2027-01-14", "2027-01-21", "2027-01-30"]);
    assert.deepEqual(shop.unpriced, []);
  });

  test("an area shows the prices of the levels on sale: one, or a range", () => {
    assert.equal(shop.nights["2027-01-14"].ga, "89.00");
    assert.equal(shop.nights["2027-01-14"].multicolore, "135.00–145.00");
    assert.equal(shop.nights["2027-01-21"].ga, "59.00–69.00");
  });

  test("an area whose listed levels have no tickets left reads SOLD OUT", () => {
    assert.equal(shop.nights["2027-01-21"].intelcom, "SOLD OUT");
    assert.equal(shop.nights["2027-01-30"].sapporo, "SOLD OUT");
  });

  test("a night with no level on sale is unpriced", () => {
    const r = responses();
    r.avail.result[Object.keys(r.avail.result)[0]].avail["IGLOOMTL20270114"] = [];
    assert.deepEqual(parseShop(r).unpriced, ["2027-01-14"]);
  });
});

describe("the comparison", () => {
  const shop = parseShop(responses());
  const { lines, ranges, differs } = diffSheet(shop, sheet());

  test("prints one line per night that moved, and none for one that did not", () => {
    assert.equal(lines.filter((l) => l.startsWith("2027-01-14")).length, 0);
    const night = lines.find((l) => l.startsWith("2027-01-21"));
    assert.match(night, /multicolore 99\.00–125\.00 → SOLD OUT/);
    assert.match(night, /intelcom 99\.00–125\.00 → SOLD OUT/);
    assert.match(night, /nyx_west 159\.00–169\.00 → 169\.00/);
    assert.match(night, /lowest\.vip 99\.00 → 101\.00/);
  });

  test("a night the sheet lists as unpriced that now has prices gets a line", () => {
    assert.match(lines.find((l) => l.startsWith("2027-01-30")), /was unpriced in the sheet/);
  });

  test("a night the sheet prices and the shop does not gets a line", () => {
    assert.match(lines.find((l) => l.startsWith("2027-02-06")), /the shop shows no price; the sheet has/);
  });

  test("re-derives the three ranges and says which differ", () => {
    assert.deepEqual(
      ranges.map((r) => [r.group, r.same, r.now]),
      [
        ["ga", true, "59.00–89.00"],
        ["vip", false, "101.00–166.75"],
        ["baddie", true, "159.00–237.00"],
      ],
    );
    assert.equal(differs, true);
  });

  test("a hyphen in the sheet is the same range as the dash the shop yields", () => {
    const s = sheet();
    s.nights = [s.nights.find((n) => n.key === "2027-01-14")];
    s.nights[0].multicolore = "135.00-145.00";
    s.unpriced.dates = [];
    const only = parseShop(responses());
    delete only.nights["2027-01-21"];
    delete only.nights["2027-01-30"];
    assert.deepEqual(diffSheet(only, s).lines, []);
  });
});

describe("the command", () => {
  const run = (...args) => spawnSync(process.execPath, [TOOL, ...args], { encoding: "utf8" });

  test("exits 1 and prints the differences", () => {
    const r = run("--from", FIXTURES, "--sheet", path.join(FIXTURES, "sheet.json"));
    assert.equal(r.status, 1);
    assert.match(r.stdout, /^2027-01-21 {2}multicolore/m);
    assert.match(r.stdout, /^ranges\.vip {2}sheet 91\.75–166\.75 → shop 101\.00–166\.75$/m);
  });

  test("exits 2 when the answers are not the shop's", () => {
    const r = run("--from", path.join(REPO, "tests"), "--sheet", path.join(FIXTURES, "sheet.json"));
    assert.equal(r.status, 2);
  });
});
