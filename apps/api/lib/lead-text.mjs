// Shared lead-to-text template, used by every adapter. One structure and
// field order everywhere, but rendered per-destination: real Markdown for
// Telegram (Markdown parse mode) and Linear (renders it natively), plain
// text for Planfix/Uspacy (whose fields don't render markdown - showing
// literal ** there read as broken, not "formatted", so `bold` is a no-op
// for them instead). `escape` stays separate from `bold`: only Telegram's
// Markdown parser 400s the whole send on unescaped _*`[ in a lead's own
// values, so only its adapter passes a non-identity escape.

const CONTACT_LABELS = { phone: 'Phone', email: 'Email', whatsapp: 'WhatsApp', telegram: 'Telegram' };

export function formatLeadTitle(lead, prefix = 'Lead: ') {
  return `${prefix}${lead.name || lead.contacts.phone || lead.contacts.email || lead.contacts.whatsapp || lead.contacts.telegram}`;
}

/**
 * @param {import('./lead-dto.mjs').Lead} lead
 * @param {{
 *   escape?: (value: unknown) => string,
 *   bold?: (label: string) => string,
 *   section?: (title: string) => string,
 *   includeName?: boolean,
 *   excludeContacts?: string[],
 *   includeSource?: boolean,
 * }} [opts]
 */
export function formatLeadText(lead, opts = {}) {
  const escape = opts.escape || ((value) => String(value));
  const bold = opts.bold || ((label) => `**${label}**`);
  const section = opts.section || ((title) => `**${title}**`);
  const excludeContacts = new Set(opts.excludeContacts || []);
  const lines = [];

  if (opts.includeName !== false && lead.name) lines.push(`${bold('Name:')} ${escape(lead.name)}`);

  const contacts = lead.contacts || {};
  for (const key of ['phone', 'email', 'whatsapp', 'telegram']) {
    if (!excludeContacts.has(key) && contacts[key]) {
      lines.push(`${bold(`${CONTACT_LABELS[key]}:`)} ${escape(contacts[key])}`);
    }
  }

  if (lead.form?.name) {
    lines.push(`${bold('Form:')} ${escape(lead.form.name)}${lead.form.description ? ` — ${escape(lead.form.description)}` : ''}`);
  }

  if (opts.includeSource !== false && lead.ref && (lead.ref.domain || lead.ref.url)) {
    lines.push(`${bold('Source:')} ${escape(lead.ref.domain || lead.ref.url)}`);
  }

  if (lead.geo && (lead.geo.city || lead.geo.country)) {
    lines.push(`${bold('Location:')} ${escape([lead.geo.city, lead.geo.country].filter(Boolean).join(', '))}`);
  }

  // meta.history is a list of {type, url/label, ts} objects, not a plain
  // value - pulled out of the generic dump below (Object.entries would
  // print it as "[object Object]") and rendered in full as its own
  // bulleted list, oldest-first (chronological).
  const { history, ...restMeta } = lead.meta || {};
  if (Object.keys(restMeta).length > 0) {
    lines.push('', section('Meta'));
    for (const [key, value] of Object.entries(restMeta)) lines.push(`- ${bold(`${key}:`)} ${escape(value)}`);
  }
  if (Array.isArray(history) && history.length > 0) {
    lines.push('', section(`Activity (${history.length} event(s))`));
    for (const entry of history) {
      lines.push(`- ${escape(entry.type)}: ${escape(entry.type === 'click' ? entry.label : entry.title || entry.url)}`);
    }
  }

  return lines.join('\n');
}
