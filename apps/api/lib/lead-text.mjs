// Shared lead-to-text template, used by every adapter. One structure and
// field order everywhere, but rendered per-destination: real Markdown for
// Telegram (Markdown parse mode) and Linear (renders it natively), real
// HTML for Planfix/Uspacy - their description/comments fields turn out to
// be HTML underneath (confirmed by testing: <b>/<br> both render, a bare
// "\n" doesn't - it collapses to a space like any other HTML whitespace),
// they just don't understand markdown's ** syntax, so `bold` renders
// <b>...</b> and `lineBreak` is "<br>" for those two instead of markdown
// defaults. `escape` is the one thing that differs for a reason beyond
// "which markup": Telegram's Markdown parser 400s the whole send on
// unescaped _*`[ in a lead's own values, and Planfix/Uspacy render real
// HTML so unescaped &/</> in a lead's own values would inject markup -
// every adapter except Linear's (plain markdown, no HTML/executable
// context) passes a non-identity escape because of that.

const CONTACT_LABELS = { phone: 'Phone', email: 'Email', whatsapp: 'WhatsApp', telegram: 'Telegram' };

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

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
 *   lineBreak?: string,
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

  // The full page URL is more useful than the bare domain when it's
  // available - it says which property/page the lead was actually looking
  // at, not just which site.
  if (opts.includeSource !== false && lead.ref && (lead.ref.url || lead.ref.domain)) {
    lines.push(`${bold('Source:')} ${escape(lead.ref.url || lead.ref.domain)}`);
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

  return lines.join(opts.lineBreak ?? '\n');
}
