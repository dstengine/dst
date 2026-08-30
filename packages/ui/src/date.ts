// Shared "Jan 3, 2026" formatter for news/events dates — parsed with an
// explicit UTC time-of-day so a plain "YYYY-MM-DD" string never lands on
// the wrong side of midnight depending on the visitor's local timezone.
//
// The locale defaults to the network's English. A site writing in another
// language passes its own, or its dates come out in a language its readers
// did not ask for — which is how "Sep 5, 2026" ended up on a Spanish page.
export function formatDate(iso: string, locale = "en-US"): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
