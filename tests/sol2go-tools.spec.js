// sol2go's two live pages, /epoch/ and /unstake/, against a mocked chain.
// The real one moves under the test — the epoch number changes every thirty
// hours and a stake's state with it — so every RPC call is answered here,
// and what is asserted is what the page makes of the answer.
import { test, expect } from "@playwright/test";
import { baseUrl } from "./servers.js";

const BASE = baseUrl("sol2go");
const SIG = "5AihePn79M36tpq6nVuWJ4BNW1JWyWFh24kNXFCW3gHb2yoHRVFSgbAChA115m12rtRACwkspG5Viw4WTxwqTxSQ";
const STAKE = "D7Pv3AnZ6MZAnX6ycRm6iSgtQPcgDbCuN4YixPvAdhx6";

/** Answers every RPC endpoint the pages may try, by method. */
async function mockChain(page, { deactivationEpoch = "1049", epoch = 1049 } = {}) {
  const answers = {
    getEpochInfo: { epoch, slotIndex: 216000, slotsInEpoch: 432000, absoluteSlot: 453384000 },
    // 250ms a slot: 240 slots in each of thirty one-minute samples.
    getRecentPerformanceSamples: Array.from({ length: 30 }, () => ({ numSlots: 240, samplePeriodSecs: 60 })),
    getTransaction: {
      slot: 453008446,
      transaction: {
        message: {
          instructions: [{ program: "stake", parsed: { type: "deactivate", info: { stakeAccount: STAKE } } }],
        },
      },
      meta: { innerInstructions: [] },
    },
    getAccountInfo: {
      value: {
        lamports: 4_205_334_708,
        data: {
          program: "stake",
          parsed: {
            type: "delegated",
            info: {
              meta: { lockup: { unixTimestamp: 0, epoch: 0, custodian: "11111111111111111111111111111111" } },
              stake: { delegation: { voter: "AS3nKBQfKs8fJ8ncyHrdvo4FDT6S8HMRhD75JjCcyr1t", stake: "4202000000", deactivationEpoch } },
            },
          },
        },
      },
    },
  };
  const reply = async (route) => {
    const { id, method } = route.request().postDataJSON();
    await route.fulfill({ json: { jsonrpc: "2.0", id, result: answers[method] } });
  };
  await page.route("**/api/rpc", reply);
  await page.route("https://solana-rpc.publicnode.com/**", reply);
}

test.describe("sol2go /epoch/", () => {
  test("shows the epoch, the share done and a ticking countdown", async ({ page }) => {
    await mockChain(page);
    await page.goto(`${BASE}/epoch/`);
    await expect(page.locator("[data-epoch-n]")).toHaveText("1,049");
    await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "50");
    await expect(page.locator("[data-ms]")).toHaveText("250 ms");
    // 216,000 slots left at 250ms is fifteen hours.
    const left = page.locator("[data-left]");
    await expect(left).toHaveText(/^1[45] h \d\d m \d\d s$/);
    const first = await left.textContent();
    await expect(left).not.toHaveText(first);
  });

  test("says so when the chain does not answer", async ({ page }) => {
    await page.route("**/api/rpc", (r) => r.abort());
    await page.route("https://solana-rpc.publicnode.com/**", (r) => r.abort());
    await page.goto(`${BASE}/epoch/`);
    await expect(page.locator("[data-status]")).toHaveText(/did not answer/);
  });
});

test.describe("sol2go /unstake/", () => {
  test("counts down to the epoch after the deactivation", async ({ page }) => {
    await mockChain(page, { deactivationEpoch: "1049", epoch: 1049 });
    await page.goto(`${BASE}/unstake/`);
    await page.getByLabel("Transaction signature or stake account").fill(SIG);
    await page.getByRole("button", { name: "Check" }).click();
    const result = page.locator("[data-result]");
    await expect(result).toContainText("Withdrawable in");
    await expect(result).toContainText("epoch 1050 begins");
    await expect(result).toContainText("4.205 SOL");
    await expect(result.locator("[data-left]")).toHaveText(/^1[45] h \d\d m \d\d s$/);
    // The lookup is in the fragment, so a reload asks again.
    expect(new URL(page.url()).hash).toBe(`#${SIG}`);
  });

  test("a stake deactivated in an earlier epoch is free now", async ({ page }) => {
    await mockChain(page, { deactivationEpoch: "1048", epoch: 1049 });
    await page.goto(`${BASE}/unstake/#${STAKE}`);
    await expect(page.locator("[data-result]")).toContainText("Free to withdraw now");
  });

  test("rejects what is neither a signature nor an address", async ({ page }) => {
    await mockChain(page);
    await page.goto(`${BASE}/unstake/`);
    await page.getByLabel("Transaction signature or stake account").fill("not-a-signature");
    await page.keyboard.press("Enter");
    await expect(page.locator("[data-result]")).toContainText("neither a transaction signature nor an account address");
  });
});
