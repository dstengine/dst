// Shared lead-to-text template, used by every adapter's formatter so a
// change to what a lead submission looks like (a new field, a tweak to how
// history renders) happens once instead of once per adapter. Each adapter
// supplies a small `tpl` describing its own markup conventions (HTML for
// Telegram, markdown for Linear, plain text for Planfix/Uspacy) - the
// field selection and section order are otherwise identical everywhere.

const CONTACT_LABELS = { phone: 'Phone', email: 'Email', whatsapp: 'WhatsApp', telegram: 'Telegram' };
const HISTORY_LIMIT = 5;

export function formatLeadTitle(lead, prefix = 'Lead: ') {
  return `${prefix}${lead.name || lead.contacts.phone || lead.contacts.email || lead.contacts.whatsapp || lead.contacts.telegram}`;
}

/**
 * @param {import('./lead-dto.mjs').Lead} lead
 * @param {{
 *   header?: string,
 *   escape?: (value: unknown) => string,
 *   section?: (title: string) => string,
 *   includeName?: boolean,
 *   excludeContacts?: string[],
 *   includeSource?: boolean,
 * }} [tpl]
 */
export function formatLeadText(lead, tpl = {}) {
  const escape = tpl.escape || ((value) => String(value));
  const section = tpl.section || ((title) => `${title}:`);
  const excludeContacts = new Set(tpl.excludeContacts || []);
  const lines = [];

  if (tpl.header) lines.push(tpl.header);
  if (tpl.includeName !== false && lead.name) lines.push(`Name: ${escape(lead.name)}`);

  const contacts = lead.contacts || {};
  for (const key of ['phone', 'email', 'whatsapp', 'telegram']) {
    if (!excludeContacts.has(key) && contacts[key]) {
      lines.push(`${CONTACT_LABELS[key]}: ${escape(contacts[key])}`);
    }
  }

  if (lead.form?.name) {
    lines.push(`Form: ${escape(lead.form.name)}${lead.form.description ? ` — ${escape(lead.form.description)}` : ''}`);
  }

  if (tpl.includeSource !== false && lead.ref && (lead.ref.domain || lead.ref.url)) {
    lines.push(`Source: ${escape(lead.ref.domain || lead.ref.url)}`);
  }

  if (lead.geo && (lead.geo.city || lead.geo.country)) {
    lines.push(`Location: ${escape([lead.geo.city, lead.geo.country].filter(Boolean).join(', '))}`);
  }

  // meta.history is a list of {type, url/label, ts} objects, not a plain
  // value - pulled out of the generic dump below (Object.entries would
  // print it as "[object Object]") and rendered as its own bulleted list,
  // most-recent-last, same as everywhere else on the network.
  const { history, ...restMeta } = lead.meta || {};
  if (Object.keys(restMeta).length > 0) {
    lines.push('', section('Meta'));
    for (const [key, value] of Object.entries(restMeta)) lines.push(`${escape(key)}: ${escape(value)}`);
  }
  if (Array.isArray(history) && history.length > 0) {
    lines.push('', section(`Recent activity (${history.length} total)`));
    for (const entry of history.slice(-HISTORY_LIMIT)) {
      lines.push(`- ${escape(entry.type)}: ${escape(entry.type === 'click' ? entry.label : entry.title || entry.url)}`);
    }
  }

  return lines.join('\n');
}
