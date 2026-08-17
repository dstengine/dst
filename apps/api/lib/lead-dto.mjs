// Universal lead object - see ~/mind/local/dubai/dstengine/dtos/lead.dto.md.
// Every adapter (Telegram today, Planfix/Uspacy/DKey/MongoDB later) receives
// this same object unchanged, so a new destination is just a new adapter,
// not a DTO change.

/**
 * @typedef {Object} LeadContacts
 * @property {string} [email]
 * @property {string} [phone]
 * @property {string} [telegram]
 * @property {string} [whatsapp]
 *
 * @typedef {Object} LeadRef
 * @property {string} [url]
 * @property {string} [domain]
 * @property {string} [trc]
 * @property {string} [ton]
 * @property {string} [btc]
 * @property {string} [sol]
 * @property {string} [xmr]
 *
 * @typedef {Object} LeadGeo
 * @property {string} [source] "" | "gps" | "ip"
 * @property {number|string} [lat]
 * @property {number|string} [lng]
 * @property {number|string} [accuracy]
 * @property {string} [country]
 * @property {string} [city]
 * @property {string} [region]
 *
 * @typedef {Object} LeadForm
 * @property {string} [name]
 * @property {string} [description]
 *
 * @typedef {Object} Lead
 * @property {string} [name]
 * @property {LeadContacts} contacts
 * @property {Object} [meta]
 * @property {LeadGeo} [geo]
 * @property {LeadRef} [ref]
 * @property {LeadForm} [form]
 * @property {string} [company] honeypot - see ~/mind/local/dubai/dstengine/dtos/lead.dto.md.
 *   Real forms leave it empty and hidden by CSS; a filled value means
 *   whatever submitted this didn't read the page, only its inputs.
 */

// Same rejection path as "no contact" below (ok:false, generic error) -
// deliberately not a distinct status/flag. A bot that gets a different
// response for tripping the honeypot than for any other invalid submission
// can use that difference to learn which field to leave alone next time.
const HONEYPOT_FIELD = 'company';

/**
 * Validates the wire body `{ lead: {...} }` against the minimum the DTO
 * requires: an object with at least one non-empty contact field. Everything
 * else is optional, so this intentionally doesn't reject unknown fields -
 * new ref/meta keys added later shouldn't need this file to change.
 *
 * @param {unknown} body
 * @returns {{ ok: true, lead: Lead } | { ok: false, error: string }}
 */
export function parseLead(body) {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Request body must be a JSON object' };
  }
  const lead = /** @type {any} */ (body).lead;
  if (!lead || typeof lead !== 'object') {
    return { ok: false, error: 'Missing "lead" object' };
  }
  if (typeof lead[HONEYPOT_FIELD] === 'string' && lead[HONEYPOT_FIELD].trim() !== '') {
    return { ok: false, error: 'lead.contacts needs at least one of email, phone, telegram, whatsapp' };
  }
  const contacts = lead.contacts && typeof lead.contacts === 'object' ? lead.contacts : {};
  const hasContact = ['email', 'phone', 'telegram', 'whatsapp'].some(
    (key) => typeof contacts[key] === 'string' && contacts[key].trim() !== ''
  );
  if (!hasContact) {
    return { ok: false, error: 'lead.contacts needs at least one of email, phone, telegram, whatsapp' };
  }
  return { ok: true, lead: { ...lead, contacts } };
}
