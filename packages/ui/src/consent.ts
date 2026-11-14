// Which sites ask before they measure, and the words they ask in.
//
// The four here are written for readers in the EU and the UK: Vienna, and
// three London sites. Austria requires a reader's consent before a
// measurement tag stores or reads anything on their device (the ePrivacy
// rules with the GDPR). The UK has exempted storage used only for
// statistics since February 2026, on conditions Google Analytics is not
// shown to meet here, so the London sites ask as well. On these hosts
// Google Analytics is not loaded, is sent nothing and sets no cookie until
// the reader allows it: Analytics.astro holds the tag back,
// ConsentBanner.astro asks the question, and BaseLayout puts a way to change
// the answer in every footer. (A map on an event page is a Google Maps
// frame and loads whatever the answer; it is not part of this.)
//
// Everything a site that asks needs is rendered inline and only on that
// site. A site that is not on the list ships none of it — not the markup,
// not the styles, not a line of script — and its pages come out of the
// build byte for byte as they did before this file existed.
//
// Adding a site is one line here — its host, and the address of the section
// of its about page that says what is counted — and a row in COPY if it
// publishes in a language that has none yet. The address lives here rather
// than in the site's site.config.ts because that file dates every index
// page of the site (tools/lastmod.mjs), and a link target is not a change
// to any of them.
const CONSENT_PAGES: Readonly<Record<string, string>> = {
  "vien.lol": "/ueber-uns/#statistik",
  "ldn.lol": "/about/#statistics",
  "lnd.lol": "/about/#statistics",
  "l0n.uk": "/about/#statistics",
};

export const CONSENT_HOSTS: readonly string[] = Object.keys(CONSENT_PAGES);

export const needsConsent = (host: string): boolean => host in CONSENT_PAGES;

/** Where a site that asks says what is counted and how to change the
    answer: the link in its bar. */
export const consentPage = (host: string): string => CONSENT_PAGES[host];

/** Where the answer is kept in localStorage, as "yes:<ms>" or "no:<ms>".
    Remembering the answer is the one thing stored without asking: it is
    what makes the question a question asked once. */
export const CONSENT_KEY = "consent:analytics";

/** How long an answer stands before the question is asked again: 180 days.
    A yes that is never revisited stops being the reader's choice and
    becomes a setting they forgot; a no asked again every visit is a nag. */
export const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;

export interface ConsentCopy {
  /** The question itself, and the bar's accessible name. */
  title: string;
  /** What a yes turns on and where the answer can be taken back, in one
      breath. It names the footer control by its label, `settings`. */
  text: string;
  /** The link to the site's own account of it, and that link's title —
      which says what is behind it rather than repeating the label. */
  more: string;
  moreTitle: string;
  no: string;
  yes: string;
  /** The line a reopened bar adds over the question: the standing answer. */
  saidYes: string;
  saidNo: string;
  /** The footer's way back to the question, and its title. */
  settings: string;
  settingsTitle: string;
}

const COPY: Record<string, ConsentCopy> = {
  en: {
    title: "May we count your visits?",
    text: "Only if you agree will Google Analytics set cookies and send usage data to Google, including to the US. You can change your answer at any time under “Cookie settings” at the foot of every page.",
    more: "What is counted",
    moreTitle: "What Google Analytics records here, and how to change your answer",
    no: "Decline",
    yes: "Allow",
    saidYes: "Your answer so far: allowed.",
    saidNo: "Your answer so far: declined.",
    settings: "Cookie settings",
    settingsTitle: "Change whether we count your visits",
  },
  de: {
    title: "Dürfen wir Ihre Besuche zählen?",
    text: "Nur wenn Sie zustimmen, setzt Google Analytics Cookies und überträgt Nutzungsdaten an Google, auch in die USA. Eine Einwilligung können Sie jederzeit unter „Cookie-Einstellungen“ am Seitenende widerrufen.",
    more: "Was gezählt wird",
    moreTitle: "Was Google Analytics hier erfasst und wie Sie Ihre Antwort ändern",
    no: "Ablehnen",
    yes: "Zustimmen",
    saidYes: "Ihre Antwort bisher: zugestimmt.",
    saidNo: "Ihre Antwort bisher: abgelehnt.",
    settings: "Cookie-Einstellungen",
    settingsTitle: "Besuchsstatistik erlauben oder ablehnen",
  },
};

/** The question in the page's language. Throws rather than falling back: a
    Spanish site asking in English would be asking a question some of its
    readers cannot answer, and a consent nobody understood is not one. */
export function consentCopy(lang: string): ConsentCopy {
  const row = COPY[lang.slice(0, 2)];
  if (!row) throw new Error(`consent: no copy for "${lang}" — add a row to COPY in packages/ui/src/consent.ts`);
  return row;
}

/** The bar's styles and the footer control's, as one inline <style> in the
    head of a site that asks. Inline rather than a component's <style>
    because Astro bundles a component's styles into every page that can
    reach the component through its imports, rendered or not — which would
    put these rules into the stylesheet of every site in the network.

    Both buttons are the same secondary button: declining has to be exactly
    as easy to see and to hit as allowing. The bar is fixed, so it shifts
    nothing when it appears, and it sits under the header rather than over
    it: on a short screen the open menu reaches down into the bar, and the
    menu is what the reader just asked for. While it is open the page grows
    by its height at the foot, so the footer can still be scrolled clear of
    it, and scroll-padding keeps a focused link from being parked
    underneath.

    In a window too short for that — a phone held sideways, a page zoomed
    to 200% and beyond — a fixed bar is half the screen or all of it, with
    the sticky header painted over its first line. There it is an ordinary
    block at the top of the document, where its markup already is, and
    scrolls away with the page.

    The two answers share a row of two equal columns. Its last query is in
    rem so that it follows the reader's font size: at the default it is
    never met, and with the browser's text set to twice that size, where a
    German label no longer fits half a phone, the answers stack.

    The link in the sentence is one line of text 17px above the answers;
    its ::after gives it a taller strip to hit without moving a word. */
export const CONSENT_CSS = `
.consent {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: calc(var(--z-header) - 1);
  padding: var(--space-2) 0 calc(var(--space-2) + env(safe-area-inset-bottom, 0px));
  background: var(--surface);
  color: var(--ink);
  border-top: 1px solid var(--border);
  box-shadow: 0 -6px 24px rgba(0, 0, 0, 0.14);
  font-size: var(--step--1);
}
.consent[hidden] { display: none; }
.consent-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2) var(--space-3);
}
.consent-copy { flex: 1 1 26rem; min-width: 0; }
.consent-title { margin: 0; font-weight: 700; font-size: var(--step-0); line-height: 1.25; }
.consent-state { margin: 0; font-weight: 600; }
.consent-state[hidden] { display: none; }
.consent-text { margin: 0.25em 0 0; max-width: 72ch; color: var(--ink-muted); }
.consent-text a { position: relative; color: inherit; text-decoration: underline; text-underline-offset: 2px; white-space: nowrap; }
.consent-text a::after { content: ""; position: absolute; inset: -3px 0 -13px; }
.consent-actions { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); flex: 0 1 auto; gap: var(--space-1); }
.consent-actions .button { justify-content: center; min-height: 44px; white-space: nowrap; }
@media (max-width: 40rem) {
  .consent-actions { flex: 1 1 100%; }
}
@media (max-width: 22.5rem) {
  .consent-actions .button { padding-inline: 0.75em; }
}
@media (max-width: 15rem) {
  .consent-actions { grid-template-columns: 1fr; }
}
html.consent-open { scroll-padding-bottom: var(--consent-h, 0px); }
html.consent-open body { padding-bottom: var(--consent-h, 0px); }
@media (max-height: 30rem) {
  .consent { position: static; border-top: 0; border-bottom: 1px solid var(--border); box-shadow: none; }
  html.consent-open { scroll-padding-bottom: 0; }
  html.consent-open body { padding-bottom: 0; }
}
.footer-consent { margin: var(--space-2) 0 0; }
.consent-open-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
}
@media print {
  .consent { display: none; }
  html.consent-open body { padding-bottom: 0; }
}
`;

/** With scripts off there is no bar to bring back and nothing is measured,
    so the controls that reopen it would be buttons that do nothing. The
    `hidden` attribute cannot do this: both controls set their own display,
    and the about page's is a .button, whose rule comes later in the page —
    hence !important. */
export const CONSENT_NOSCRIPT_CSS = `.footer-consent,[data-consent-open]{display:none!important}`;
