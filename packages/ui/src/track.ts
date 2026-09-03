// The network's event vocabulary, in one place.
//
// GA4 was recording page views and nothing else: no way to tell a visit
// that produced a lead from one that bounced, and so no way to say which
// site, page or campaign is worth anything. These are the moments worth
// counting, named after GA4's own recommended events where one fits —
// generate_lead is a recommended name, and using it means the reporting
// surfaces understand it without configuration.
//
// Marking which of these count as Key Events is done in the GA interface,
// not here: Admin -> Events -> mark as key event. `generate_lead` is the
// one that matters; the rest are diagnostics around it.
//
// The same applies to the parameters below. GA4 drops an event-scoped
// parameter from every report until it is registered under Admin -> Custom
// definitions, so `site`, `cta_text` and the rest arrive in the payload,
// are visible in DebugView and Realtime, and are missing from the standard
// reports until someone registers them by hand. That is GA's design, not a
// bug here: the events still count correctly, only the breakdown is
// unavailable. `hostName` is a built-in dimension, so which site an event
// came from is answerable without registering anything.

/** GA4 event names we send. Keeping them in a union stops a typo becoming
    a second, silently separate event in the reports. */
export type TrackEvent =
  | "generate_lead"
  | "lead_failed"
  | "form_start"
  | "outbound_click"
  | "add_to_calendar"
  | "phone_click"
  | "cta_click";

/** Sends an event if analytics is on the page, and does nothing otherwise —
    a local build, a preview, or a visitor who blocked the tag. Never throws:
    a measurement failure must not take a form submission down with it. */
export function track(name: TrackEvent, params: Record<string, unknown> = {}): void {
  try {
    const gtag = (globalThis as any).gtag;
    if (typeof gtag !== "function") return;
    gtag("event", name, {
      // Which site in the network the event came from. Every host reports
      // into one GA property, so without this the numbers are a single
      // undifferentiated total.
      site: location.hostname,
      ...params,
    });
  } catch {
    /* measurement is never worth an exception on the page */
  }
}
