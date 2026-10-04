// The chain, read from the reader's own browser. These pages are built once
// and served static, so anything they say about the current epoch has to
// be asked for at the moment someone looks — a number baked in at build
// time is a number that was true on the day of the deploy.
//
// Two endpoints, tried in order. First this site's own /api/rpc (see
// api/rpc.mjs), which forwards to api.mainnet-beta.solana.com: that node
// keeps the full history, but refuses a browser outright — a 403 to any
// request carrying an Origin header — so the page cannot ask it directly.
// Then publicnode, which does answer a browser but keeps only about a day
// of transactions. It is the fallback for when the function is down, and
// what `astro preview` uses locally, where there is no function at all.
const ENDPOINTS = ["/api/rpc", "https://solana-rpc.publicnode.com"];

const TIMEOUT_MS = 12_000;

export class RpcError extends Error {}

export async function rpc<T>(method: string, params: unknown[] = []): Promise<T> {
  let last: unknown;
  for (const url of ENDPOINTS) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
        signal: ctrl.signal,
      });
      if (!res.ok && res.status !== 400) throw new RpcError(`HTTP ${res.status}`);
      const json = await res.json();
      if (json.error) throw new RpcError(json.error.message ?? `RPC error ${json.error.code}`);
      return json.result as T;
    } catch (err) {
      last = err;
    } finally {
      clearTimeout(timer);
    }
  }
  throw last instanceof Error ? last : new RpcError("No RPC endpoint answered");
}

export interface EpochClock {
  epoch: number;
  slotIndex: number;
  slotsInEpoch: number;
  absoluteSlot: number;
  /** Measured, not assumed: slot time has been moving — 400ms, 350, 300,
      250, with 200 still to come — and any constant written here would be
      the figure from one of those steps. */
  msPerSlot: number;
  /** Over how many minutes msPerSlot was measured. */
  sampleMinutes: number;
  /** Local clock reading when the answer arrived; what the ticking is counted from. */
  at: number;
  /** When the current epoch is expected to end, in local epoch ms. */
  endsAt: number;
}

interface EpochInfo {
  epoch: number;
  slotIndex: number;
  slotsInEpoch: number;
  absoluteSlot: number;
}
interface PerfSample {
  numSlots: number;
  samplePeriodSecs: number;
}

/** Thirty one-minute samples: long enough that a skipped slot or two does
    not swing the estimate, short enough to follow a slot-time step within
    the half hour after it lands. */
const SAMPLES = 30;

export async function epochClock(): Promise<EpochClock> {
  const [info, samples] = await Promise.all([
    rpc<EpochInfo>("getEpochInfo", [{ commitment: "confirmed" }]),
    rpc<PerfSample[]>("getRecentPerformanceSamples", [SAMPLES]),
  ]);
  const slots = samples.reduce((n, s) => n + s.numSlots, 0);
  const secs = samples.reduce((n, s) => n + s.samplePeriodSecs, 0);
  if (!slots) throw new RpcError("No performance samples to time the slots by");
  const msPerSlot = (secs * 1000) / slots;
  const at = Date.now();
  return {
    ...info,
    msPerSlot,
    sampleMinutes: Math.round(secs / 60),
    at,
    endsAt: at + (info.slotsInEpoch - info.slotIndex) * msPerSlot,
  };
}

/** When epoch `n` begins, by the clock above. Past epochs come out in the past. */
export const epochStartsAt = (clock: EpochClock, n: number) =>
  clock.endsAt + (n - clock.epoch - 1) * clock.slotsInEpoch * clock.msPerSlot;

// --- Unstaking -------------------------------------------------------------

/** u64::MAX: the deactivation epoch of a stake that has not been deactivated. */
const NEVER = "18446744073709551615";
const LAMPORTS = 1_000_000_000;
const BASE58 = /^[1-9A-HJ-NP-Za-km-z]+$/;

export type Lookup =
  | { kind: "invalid" }
  | { kind: "notFound" }
  | { kind: "notStake"; signature: string }
  | { kind: "withdrawn"; signature: string; stakeAccount: string }
  | { kind: "closed"; stakeAccount: string; deactivationEpoch?: number }
  | { kind: "active"; stakeAccount: string; sol: number; voter?: string }
  | {
      kind: "deactivating" | "inactive";
      stakeAccount: string;
      sol: number;
      voter?: string;
      deactivationEpoch: number;
      /** The epoch at whose first slot the stake is free to withdraw. */
      freeEpoch: number;
      lockupUntil?: number;
      lockupEpoch?: number;
      custodian?: string;
    };

/** A signature is 64 bytes and an address 32, which base58 makes 86–88
    and 32–44 characters. That is the whole of the input validation the
    form needs: anything else is a typo, and the chain is not asked. */
export function classify(input: string): "signature" | "address" | undefined {
  const s = input.trim();
  if (!BASE58.test(s)) return undefined;
  if (s.length >= 86 && s.length <= 88) return "signature";
  if (s.length >= 32 && s.length <= 44) return "address";
  return undefined;
}

interface ParsedIx {
  program?: string;
  parsed?: { type?: string; info?: Record<string, string> };
}

async function fromSignature(signature: string): Promise<Lookup> {
  const tx = await rpc<{
    transaction: { message: { instructions: ParsedIx[] } };
    meta: { innerInstructions?: { instructions: ParsedIx[] }[] } | null;
  } | null>("getTransaction", [
    signature,
    { encoding: "jsonParsed", maxSupportedTransactionVersion: 0, commitment: "confirmed" },
  ]);
  if (!tx) return { kind: "notFound" };
  // Inner instructions too: a deactivation sent through a wallet program or
  // a multisig arrives as a CPI, not as a top-level instruction.
  const all = [
    ...tx.transaction.message.instructions,
    ...(tx.meta?.innerInstructions ?? []).flatMap((i) => i.instructions),
  ].filter((ix) => ix.program === "stake");
  const deactivate = all.find((ix) => ix.parsed?.type === "deactivate" || ix.parsed?.type === "deactivateDelinquent");
  if (deactivate?.parsed?.info?.stakeAccount) return fromAccount(deactivate.parsed.info.stakeAccount);
  const withdraw = all.find((ix) => ix.parsed?.type === "withdraw");
  if (withdraw?.parsed?.info?.stakeAccount)
    return { kind: "withdrawn", signature, stakeAccount: withdraw.parsed.info.stakeAccount };
  return { kind: "notStake", signature };
}

interface StakeAccount {
  lamports: number;
  data: {
    program?: string;
    parsed?: {
      type: string;
      info: {
        meta: { lockup: { unixTimestamp: number; epoch: number; custodian: string } };
        stake?: { delegation: { voter: string; stake: string; deactivationEpoch: string } };
      };
    };
  };
}

async function fromAccount(stakeAccount: string, currentEpoch?: number): Promise<Lookup> {
  const [acct, epoch] = await Promise.all([
    rpc<{ value: StakeAccount | null }>("getAccountInfo", [stakeAccount, { encoding: "jsonParsed", commitment: "confirmed" }]),
    currentEpoch ?? rpc<EpochInfo>("getEpochInfo").then((e) => e.epoch),
  ]);
  const value = acct.value;
  // Withdrawn in full and closed: the account is gone, and with it the
  // deactivation epoch. Nothing is left to wait for.
  if (!value) return { kind: "closed", stakeAccount };
  if (value.data.program !== "stake" || !value.data.parsed) return { kind: "notStake", signature: stakeAccount };
  const { meta, stake } = value.data.parsed.info;
  const sol = value.lamports / LAMPORTS;
  const lockup = meta.lockup;
  const lockupUntil = lockup.unixTimestamp * 1000 > Date.now() ? lockup.unixTimestamp * 1000 : undefined;
  const lockupEpoch = lockup.epoch > epoch ? lockup.epoch : undefined;
  const custodian = lockupUntil || lockupEpoch ? lockup.custodian : undefined;
  // "initialized": never delegated, so free to withdraw already.
  if (!stake) return { kind: "inactive", stakeAccount, sol, deactivationEpoch: epoch, freeEpoch: epoch, lockupUntil, lockupEpoch, custodian };
  const { voter, deactivationEpoch } = stake.delegation;
  if (deactivationEpoch === NEVER) return { kind: "active", stakeAccount, sol, voter };
  const d = Number(deactivationEpoch);
  return {
    kind: d < epoch ? "inactive" : "deactivating",
    stakeAccount,
    sol,
    voter,
    deactivationEpoch: d,
    freeEpoch: d + 1,
    lockupUntil,
    lockupEpoch,
    custodian,
  };
}

export async function lookup(input: string): Promise<Lookup> {
  const s = input.trim();
  const type = classify(s);
  if (!type) return { kind: "invalid" };
  return type === "signature" ? fromSignature(s) : fromAccount(s);
}
