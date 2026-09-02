// A hard daily ceiling on fal.ai spend, kept in a file so it survives the
// process, the terminal and the week.
//
// Every tool that bills fal must go through here, and must reserve *before*
// it calls: a limit checked after the request has already been paid for is
// not a limit. `spend()` throws when the day's total would cross the cap,
// and the caller is expected to stop rather than skip ahead to the next
// item — the next item costs money too.
//
//   import { headroom, spend, LIMIT } from "./fal-budget.mjs";
//   spend(0.004, "dst/gitex");        // throws BudgetExceeded past the cap
//
// The ledger is committed. One line a day is nothing to carry, and the
// record of what the pictures cost is worth more than the tidiness of an
// ignored file. Days older than the window are dropped on write so it does
// not grow without end.
import fs from "node:fs";
import path from "node:path";

/** Dollars a day, all fal models together. Deliberately a constant and not
    an environment variable: a ceiling that can be raised by exporting a
    variable is a suggestion. Changing it is a commit. */
export const LIMIT = 1;

const KEEP_DAYS = 90;
// The path is overridable so the test can use a scratch file; the LIMIT is
// not. Where the ledger lives is a detail, what the ceiling is is the point.
const FILE =
  process.env.FAL_SPEND_FILE ||
  path.join(new URL("..", import.meta.url).pathname.replace(/\/$/, ""), "tools/fal-spend.json");

export class BudgetExceeded extends Error {}

/** Local date, not UTC: the cap exists so a day's work cannot run away, and
    the day meant is the one the person at the keyboard is having. */
export const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

function read() {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch {
    // A missing or unreadable ledger must not read as "nothing spent yet" in
    // silence — but it also must not stop the run on a first ever use, so the
    // empty day is returned and the caller's own reporting shows the zero.
    return { days: {} };
  }
}

/** What is left today, in dollars. Never negative. */
export function headroom() {
  return Math.max(0, LIMIT - (read().days[today()] ?? 0));
}

export function spentToday() {
  return read().days[today()] ?? 0;
}

/**
 * Record `usd` against today, or throw if that would cross the cap.
 * @param {number} usd  what the call is about to cost
 * @param {string} what appears in the error, so the run says where it stopped
 */
export function spend(usd, what = "") {
  const ledger = read();
  const day = today();
  const before = ledger.days[day] ?? 0;
  // Rounded to a millionth of a dollar, not to the tenth of a cent. Float
  // drift over hundreds of additions has to be cut off somewhere, but round
  // coarser than the price of one image — $0.00398 — and every charge is
  // rounded up to $0.004, which over a batch of two hundred invents half a
  // cent of spending that never happened.
  const after = Math.round((before + usd) * 1e6) / 1e6;
  if (after > LIMIT) {
    throw new BudgetExceeded(
      `fal.ai daily limit: $${before.toFixed(3)} of $${LIMIT.toFixed(2)} spent today, ` +
        `${what ? `"${what}" ` : ""}needs $${usd.toFixed(3)}. Nothing was generated. ` +
        `Wait for tomorrow, or raise LIMIT in tools/fal-budget.mjs on purpose.`,
    );
  }
  const cutoff = new Date(Date.now() - KEEP_DAYS * 86400e3).toISOString().slice(0, 10);
  const days = Object.fromEntries(Object.entries(ledger.days).filter(([d]) => d >= cutoff));
  days[day] = after;
  fs.writeFileSync(FILE, JSON.stringify({ days }, null, 2) + "\n");
  return after;
}
