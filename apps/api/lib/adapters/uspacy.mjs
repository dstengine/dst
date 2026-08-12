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
// likewise goes to first_name/last_name. Source stays IN the comments
// (unlike the structured `source` attempt below) because that structured
// field turns out to be a closed dictionary (e.g. "FB", "Google") - an
// arbitrary domain silently fails to save there, so text is the only place
// it reliably shows up. Uspacy's own fields are plain text, not markdown -
// a literal "**Name:**" reads as broken formatting there, so bold/section
// are no-ops instead of the shared template's markdown defaults.
function formatComments(lead) {
  return formatLeadText(lead, {
    includeName: false,
    excludeContacts: ['phone', 'email'],
    bold: (label) => label,
    section: (title) => `${title}:`,
  });
}

// A simple first-space split ("Vladimir Detailed" -> "Vladimir" /
// "Detailed") isn't always right (middle names, "Jr.", single-word names),
// but it's a better fit for Uspacy's separate first/last name fields than
// dumping the whole name into first_name alone, which is what happened
// before this - last_name always blank, and any list/search sorted or
// filtered by last name would silently miss every lead from this network.
function splitName(name) {
  if (!name) return {};
  const spaceAt = name.indexOf(' ');
  if (spaceAt === -1) return { first_name: name };
  return { first_name: name.slice(0, spaceAt), last_name: name.slice(spaceAt + 1) };
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
    ...splitName(lead.name),
    ...(lead.contacts.phone ? { phone: [{ value: lead.contacts.phone, type: 'work', main: true }] } : {}),
    ...(lead.contacts.email ? { email: [{ value: lead.contacts.email, type: 'work', main: true }] } : {}),
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

export { formatTitle, formatComments, splitName };
