// POST https://sol2go.lol/api/rpc — a same-origin door to Solana mainnet
// for the epoch and unstake pages.
//
// Why it exists: api.mainnet-beta.solana.com keeps the chain's full
// history and answers a server, but refuses a browser — any request with
// an Origin header gets a 403. The CORS-friendly public nodes answer a
// browser but keep about a day of transactions, so a deactivation from the
// day before yesterday came back "not found". This function is the
// browser's way to the node that remembers.
//
// It is not a general RPC: four read-only methods, one call per request,
// nothing stored and nothing logged. Anything else is refused, so the
// endpoint is no use to anyone but these two pages.
const UPSTREAM = "https://api.mainnet-beta.solana.com";
const METHODS = new Set(["getEpochInfo", "getRecentPerformanceSamples", "getTransaction", "getAccountInfo"]);
const MAX_BODY = 2048;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "POST only" });
  }
  const raw = typeof req.body === "string" ? req.body : JSON.stringify(req.body ?? {});
  if (raw.length > MAX_BODY) return res.status(413).json({ error: "Too large" });
  let call;
  try {
    call = JSON.parse(raw);
  } catch {
    return res.status(400).json({ error: "Not JSON" });
  }
  if (Array.isArray(call) || !METHODS.has(call?.method) || !Array.isArray(call.params ?? [])) {
    return res.status(400).json({ jsonrpc: "2.0", id: call?.id ?? null, error: { code: -32601, message: "Method not allowed here" } });
  }
  try {
    const upstream = await fetch(UPSTREAM, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: call.id ?? 1, method: call.method, params: call.params ?? [] }),
      signal: AbortSignal.timeout(10_000),
    });
    const text = await upstream.text();
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Content-Type", "application/json");
    return res.status(upstream.ok ? 200 : 502).send(text);
  } catch {
    return res.status(502).json({ jsonrpc: "2.0", id: call.id ?? null, error: { code: -32000, message: "Upstream did not answer" } });
  }
}
