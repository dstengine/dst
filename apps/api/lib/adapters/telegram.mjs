// Sends a lead to a Telegram chat via the Bot API. One adapter among several
// the webhook fans out to (see ~/mind/local/dubai/crm/webhook.md) - every
// adapter gets the exact same lead object, so this file only needs to know
// how to turn *a* lead into *a* Telegram message.

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatLeadMessage(lead) {
  const lines = ['<b>New lead</b>'];

  if (lead.name) {
    lines.push(`Name: ${escapeHtml(lead.name)}`);
  }

  const contactLines = [];
  if (lead.contacts.phone) contactLines.push(`Phone: ${escapeHtml(lead.contacts.phone)}`);
  if (lead.contacts.email) contactLines.push(`Email: ${escapeHtml(lead.contacts.email)}`);
  if (lead.contacts.whatsapp) contactLines.push(`WhatsApp: ${escapeHtml(lead.contacts.whatsapp)}`);
  if (lead.contacts.telegram) contactLines.push(`Telegram: ${escapeHtml(lead.contacts.telegram)}`);
  lines.push(...contactLines);

  if (lead.ref && (lead.ref.domain || lead.ref.url)) {
    lines.push(`Source: ${escapeHtml(lead.ref.domain || lead.ref.url)}`);
  }

  if (lead.geo && (lead.geo.city || lead.geo.country)) {
    lines.push(`Location: ${escapeHtml([lead.geo.city, lead.geo.country].filter(Boolean).join(', '))}`);
  }

  if (lead.meta && Object.keys(lead.meta).length > 0) {
    const metaText = Object.entries(lead.meta)
      .map(([key, value]) => `${escapeHtml(key)}: ${escapeHtml(value)}`)
      .join('\n');
    lines.push('', '<b>Meta</b>', metaText);
  }

  return lines.join('\n');
}

/**
 * @param {import('../lead-dto.mjs').Lead} lead
 * @returns {Promise<{ ok: boolean, status?: number, error?: string }>}
 */
export async function sendToTelegram(lead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { ok: false, error: 'TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not configured' };
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatLeadMessage(lead),
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    return { ok: false, status: res.status, error: body.slice(0, 500) };
  }

  return { ok: true, status: res.status };
}

export { formatLeadMessage };
