// The daily fal.ai ceiling. This guard costs money when it fails open, and
// nothing in the build exercises it — so it gets its own test.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ledger = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "fal-")), "spend.json");
process.env.FAL_SPEND_FILE = ledger;
const { spend, headroom, spentToday, today, LIMIT, BudgetExceeded } = await import("../tools/fal-budget.mjs");

const reset = (usd) => fs.writeFileSync(ledger, JSON.stringify({ days: usd == null ? {} : { [today()]: usd } }));

test("a missing ledger reads as a full day, not as an error", () => {
  fs.rmSync(ledger, { force: true });
  assert.equal(spentToday(), 0);
  assert.equal(headroom(), LIMIT);
});

test("spending is recorded against today and comes off the headroom", () => {
  reset();
  spend(0.25, "a");
  assert.equal(spentToday(), 0.25);
  assert.equal(headroom(), LIMIT - 0.25);
});

test("the cap is hard: the call that would cross it throws and records nothing", () => {
  reset(LIMIT - 0.001);
  assert.throws(() => spend(0.004, "one more cover"), BudgetExceeded);
  assert.equal(spentToday(), LIMIT - 0.001, "a refused call must not be written down");
});

test("landing exactly on the cap is allowed", () => {
  reset(LIMIT - 0.004);
  spend(0.004, "the last one");
  assert.equal(spentToday(), LIMIT);
  assert.equal(headroom(), 0);
});

test("a refund gives the money back, so a rejected request costs nothing", () => {
  reset(0.5);
  spend(0.004, "attempt");
  spend(-0.004);
  assert.equal(spentToday(), 0.5);
});

test("hundreds of small charges still add up to the right number", () => {
  reset();
  for (let i = 0; i < 200; i++) spend(0.00398);
  assert.equal(spentToday(), 0.796, "floating point drift would show here");
});

test("yesterday's spending does not count against today", () => {
  fs.writeFileSync(ledger, JSON.stringify({ days: { "2020-01-01": LIMIT } }));
  assert.equal(headroom(), LIMIT);
});
