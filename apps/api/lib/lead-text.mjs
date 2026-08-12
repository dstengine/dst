// Shared lead-to-text Markdown template, used by every adapter. All four
// destinations render the exact same markup now - Telegram (Markdown parse
// mode), Linear (native markdown), and Planfix/Uspacy's plain-text fields
// (which just show the ** / - literally, an accepted tradeoff for having
// one template instead of four). Only which values need escaping differs
// (Telegram's Markdown parser 400s on unescaped _*`[ ), which is why
// `escape` stays a parameter rather than being unified away too.

const CONTACT_LABELS = { phone: 'Phone', email: 'Email', whatsapp: 'WhatsApp', telegram: 'Telegram' };

export function formatLeadTitle(lead, prefix = 'Lead: ') {
  return `${prefix}${lead.name || lead.contacts.phone || lead.contacts.email || lead.contacts.whatsapp || lead.contacts.telegram}`;
}

/**
 * @param {import('./lead-dto.mjs').Lead} lead
 * @param {{
 *   escape?: (value: unknown) => string,
 *   includeName?: boolean,
 *   excludeContacts?: string[],
 *   includeSource?: boolean,
 * }} [opts]
 */
export function formatLeadText(lead, opts = {}) {
  const escape = opts.escape || ((value) => String(value));
  const excludeContacts = new Set(opts.excludeContacts || []);
  const lines = [];

  if (opts.includeName !== false && lead.name) lines.push(`**Name:** ${escape(lead.name)}`);

  const contacts = lead.contacts || {};
  for (const key of ['phone', 'email', 'whatsapp', 'telegram']) {
    if (!excludeContacts.has(key) && contacts[key]) {
      lines.push(`**${CONTACT_LABELS[key]}:** ${escape(contacts[key])}`);
    }
  }

  if (lead.form?.name) {
    lines.push(`**Form:** ${escape(lead.form.name)}${lead.form.description ? ` — ${escape(lead.form.description)}` : ''}`);
  }

  if (opts.includeSource !== false && lead.ref && (lead.ref.domain || lead.ref.url)) {
    lines.push(`**Source:** ${escape(lead.ref.domain || lead.ref.url)}`);
  }

  if (lead.geo && (lead.geo.city || lead.geo.country)) {
    lines.push(`**Location:** ${escape([lead.geo.city, lead.geo.country].filter(Boolean).join(', '))}`);
  }

  // meta.history is a list of {type, url/label, ts} objects, not a plain
  // value - pulled out of the generic dump below (Object.entries would
  // print it as "[object Object]") and rendered in full as its own
  // bulleted list, oldest-first (chronological).
  const { history, ...restMeta } = lead.meta || {};
  if (Object.keys(restMeta).length > 0) {
    lines.push('', '**Meta**');
    for (const [key, value] of Object.entries(restMeta)) lines.push(`- **${escape(key)}:** ${escape(value)}`);
  }
  if (Array.isArray(history) && history.length > 0) {
    lines.push('', `**Activity (${history.length} event(s))**`);
    for (const entry of history) {
      lines.push(`- ${escape(entry.type)}: ${escape(entry.type === 'click' ? entry.label : entry.title || entry.url)}`);
    }
  }

  return lines.join('\n');
}
