// Creates a lead in Uspacy via its incoming-webhook CRM endpoint
// (POST <webhook>/crm/v1/entities/leads). The webhook URL itself accepts
// arbitrary paths per connected service - USPACY_WEBHOOK_URL must be the
// base incoming-webhook URL (Automation -> Webhooks -> Incoming in the
// Uspacy UI) with /crm/v1/entities/leads appended. Unlike Telegram/Planfix,
// Uspacy's lead fields are structured (phone/email are typed arrays), so
// this maps the DTO instead of forwarding it unchanged.

import { formatLeadText, formatLeadTitle } from '../lead-text.mjs';

function formatTitle(lead) {
  return formatLeadTitle(lead);
}

// phone/email are excluded from comments since they already land in their
// own structured fields on the Uspacy lead (see sendToUspacy below); Name
// likewise goes to first_name. ref.domain is excluded since it's already
// the structured `source` field, not just here for readability.
function formatComments(lead) {
  return formatLeadText(lead, {
    includeName: false,
    excludeContacts: ['phone', 'email'],
    includeSource: false,
  });
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
