// Creates a lead in Uspacy via its incoming-webhook CRM endpoint
// (POST <webhook>/crm/v1/entities/leads). The webhook URL itself accepts
// arbitrary paths per connected service - USPACY_WEBHOOK_URL must be the
// base incoming-webhook URL (Automation -> Webhooks -> Incoming in the
// Uspacy UI) with /crm/v1/entities/leads appended. Unlike Telegram/Planfix,
// Uspacy's lead fields are structured (phone/email are typed arrays), so
// this maps the DTO instead of forwarding it unchanged.

function formatTitle(lead) {
  return `Lead: ${lead.name || lead.contacts.phone || lead.contacts.email || lead.contacts.whatsapp || lead.contacts.telegram}`;
}

function formatComments(lead) {
  const lines = [];

  if (lead.contacts.whatsapp) lines.push(`WhatsApp: ${lead.contacts.whatsapp}`);
  if (lead.contacts.telegram) lines.push(`Telegram: ${lead.contacts.telegram}`);

  if (lead.form?.name) {
    lines.push(`Form: ${lead.form.name}${lead.form.description ? ` — ${lead.form.description}` : ''}`);
  }

  if (lead.geo && (lead.geo.city || lead.geo.country)) {
    lines.push(`Location: ${[lead.geo.city, lead.geo.country].filter(Boolean).join(', ')}`);
  }

  // meta.history is an array of {type, url/label, ts} objects, not a plain
  // value - skip it in the generic key: value dump below (it would print as
  // "[object Object]") and note just the count instead.
  const { history, ...restMeta } = lead.meta || {};
  if (Object.keys(restMeta).length > 0) {
    lines.push('', 'Meta:');
    for (const [key, value] of Object.entries(restMeta)) lines.push(`${key}: ${value}`);
  }
  if (Array.isArray(history) && history.length > 0) {
    lines.push(`History: ${history.length} page/click event(s) before this submission`);
  }

  return lines.join('\n');
}

/**
 * @param {import('../lead-dto.mjs').Lead} lead
 * @returns {Promise<{ ok: boolean, status?: number, error?: string }>}
 */
export async function sendToUspacy(lead) {
  const webhookUrl = process.env.USPACY_WEBHOOK_URL;

  if (!webhookUrl) {
    return { ok: false, error: 'USPACY_WEBHOOK_URL not configured' };
  }

  const body = {
    title: formatTitle(lead),
    ...(lead.name ? { first_name: lead.name } : {}),
    ...(lead.contacts.phone ? { phone: [{ value: lead.contacts.phone, type: 'work', main: true }] } : {}),
    ...(lead.contacts.email ? { email: [{ value: lead.contacts.email, type: 'work', main: true }] } : {}),
    ...(lead.ref?.domain ? { source: lead.ref.domain } : {}),
    ...(lead.ref?.utm_source ? { utm_source: lead.ref.utm_source } : {}),
    ...(lead.ref?.utm_medium ? { utm_medium: lead.ref.utm_medium } : {}),
    ...(lead.ref?.utm_campaign ? { utm_campaign: lead.ref.utm_campaign } : {}),
    comments: formatComments(lead),
  };

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const responseBody = await res.text().catch(() => '');
    return { ok: false, status: res.status, error: responseBody.slice(0, 500) };
  }

  const responseBody = await res.json().catch(() => null);
  if (responseBody?.errors) {
    return { ok: false, status: res.status, error: JSON.stringify(responseBody.errors).slice(0, 500) };
  }

  return { ok: true, status: res.status };
}

export { formatTitle, formatComments };
