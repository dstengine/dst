// Creates a task in Planfix for a lead. Planfix has no generic "inbound
// webhook URL" like Uspacy - leads go in via its REST API (POST /task/),
// authenticated with a per-account bearer token (Account management ->
// Access to API -> REST API in the Planfix UI). PLANFIX_TEMPLATE_ID is
// optional; without it the task is created untemplated.

import { formatLeadText, formatLeadTitle } from '../lead-text.mjs';

function formatTaskName(lead) {
  return formatLeadTitle(lead);
}

// Planfix's task description is plain text, not markdown - a literal
// "**Name:**" would just read as broken formatting, so bold/section here
// are no-ops (identity / "Title:") instead of the shared template's
// markdown defaults.
function formatTaskDescription(lead) {
  return formatLeadText(lead, {
    bold: (label) => label,
    section: (title) => `${title}:`,
  });
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
