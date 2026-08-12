// Creates a task in Planfix for a lead. Planfix has no generic "inbound
// webhook URL" like Uspacy - leads go in via its REST API (POST /task/),
// authenticated with a per-account bearer token (Account management ->
// Access to API -> REST API in the Planfix UI). PLANFIX_TEMPLATE_ID is
// optional; without it the task is created untemplated.

function formatTaskName(lead) {
  return `Lead: ${lead.name || lead.contacts.phone || lead.contacts.email || lead.contacts.whatsapp || lead.contacts.telegram}`;
}

function formatTaskDescription(lead) {
  const lines = [];

  if (lead.name) lines.push(`Name: ${lead.name}`);
  if (lead.contacts.phone) lines.push(`Phone: ${lead.contacts.phone}`);
  if (lead.contacts.email) lines.push(`Email: ${lead.contacts.email}`);
  if (lead.contacts.whatsapp) lines.push(`WhatsApp: ${lead.contacts.whatsapp}`);
  if (lead.contacts.telegram) lines.push(`Telegram: ${lead.contacts.telegram}`);

  if (lead.ref && (lead.ref.domain || lead.ref.url)) {
    lines.push(`Source: ${lead.ref.domain || lead.ref.url}`);
  }

  if (lead.geo && (lead.geo.city || lead.geo.country)) {
    lines.push(`Location: ${[lead.geo.city, lead.geo.country].filter(Boolean).join(', ')}`);
  }

  if (lead.meta && Object.keys(lead.meta).length > 0) {
    lines.push('', 'Meta:');
    for (const [key, value] of Object.entries(lead.meta)) lines.push(`${key}: ${value}`);
  }

  return lines.join('\n');
}

/**
 * @param {import('../lead-dto.mjs').Lead} lead
 * @returns {Promise<{ ok: boolean, status?: number, error?: string }>}
 */
export async function sendToPlanfix(lead) {
  const token = process.env.PLANFIX_API_TOKEN;
  const account = process.env.PLANFIX_ACCOUNT;
  const templateId = process.env.PLANFIX_TEMPLATE_ID;

  if (!token || !account) {
    return { ok: false, error: 'PLANFIX_API_TOKEN / PLANFIX_ACCOUNT not configured' };
  }

  const res = await fetch(`https://${account}.planfix.com/rest/task/`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...(templateId ? { template: { id: Number(templateId) } } : {}),
      name: formatTaskName(lead),
      description: formatTaskDescription(lead),
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    return { ok: false, status: res.status, error: body.slice(0, 500) };
  }

  return { ok: true, status: res.status };
}

export { formatTaskName, formatTaskDescription };
