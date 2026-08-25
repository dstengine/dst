// Shared "Jan 3, 2026" formatter for news/events dates — parsed with an
// explicit UTC time-of-day so a plain "YYYY-MM-DD" string never lands on
// the wrong side of midnight depending on the visitor's local timezone.
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
