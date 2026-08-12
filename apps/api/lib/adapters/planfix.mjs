// Forwards a lead to Planfix's inbound webhook. Same shape as the Telegram
// adapter (lib/adapters/telegram.mjs): one function, POSTs the lead
// unchanged, fails cleanly (never throws) when unconfigured.

/**
 * @param {import('../lead-dto.mjs').Lead} lead
 * @returns {Promise<{ ok: boolean, status?: number, error?: string }>}
 */
export async function sendToPlanfix(lead) {
  const webhookUrl = process.env.PLANFIX_WEBHOOK_URL;

  if (!webhookUrl) {
    return { ok: false, error: 'PLANFIX_WEBHOOK_URL not configured' };
  }

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lead }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    return { ok: false, status: res.status, error: body.slice(0, 500) };
  }

  return { ok: true, status: res.status };
}
