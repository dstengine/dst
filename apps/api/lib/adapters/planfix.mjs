// Creates a task in Planfix for a lead. Planfix has no generic "inbound
// webhook URL" like Uspacy - leads go in via its REST API (POST /task/),
// authenticated with a per-account bearer token (Account management ->
// Access to API -> REST API in the Planfix UI). PLANFIX_TEMPLATE_ID is
// optional; without it the task is created untemplated.

import { formatLeadText, formatLeadTitle, escapeHtml } from '../lead-text.mjs';

function formatTaskName(lead) {
  return formatLeadTitle(lead);
}

// Confirmed by testing against the live API: Planfix's task description
// field is HTML, not markdown - it doesn't understand **bold**, but it
// does render <b>/<br> as real bold text and line breaks. Values go
// through escapeHtml since they're now landing inside actual markup, not
// literal text - an unescaped "<" from a lead's own name/etc. would
// otherwise inject stray HTML into the rendered task.
function formatTaskDescription(lead) {
  return formatLeadText(lead, {
    escape: escapeHtml,
    bold: (label) => `<b>${label}</b>`,
    section: (title) => `<b>${title}</b>`,
    lineBreak: '<br>',
    link: (url, text) => `<a href="${escapeHtml(url)}">${text}</a>`,
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
