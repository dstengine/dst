// tea.ceo/420/ keeps two tea times, 16:20 and 04:20, and the picture beside
// the countdowns follows whichever comes next on the reader's clock: the
// common room by day, the night sky under Skywalker from twenty past four in
// the afternoon until twenty past four in the morning. Playwright's clock
// stands in for the reader's, so both pictures can be seen in one run, and
// the two edges prove the switch happens at 4:20 exactly rather than after
// the countdown's half-hour window.
import { test, expect } from "@playwright/test";
import { baseUrl } from "./servers.js";

const cases = [
  ["at noon, the common room by day", "2026-10-22T12:00:00", "/covers/420.jpg", "16:20", "in 4 h 20 m"],
  ["at three in the morning, the night sky", "2026-10-22T03:00:00", "/covers/420-night.jpg", "04:20", "in 1 h 20 m"],
  ["at 16:20 exactly, the night sky", "2026-10-22T16:20:00", "/covers/420-night.jpg", "04:20", "in 12 h 00 m"],
  ["at 04:20 exactly, the day again", "2026-10-22T04:20:00", "/covers/420.jpg", "16:20", "in 12 h 00 m"],
];

for (const [name, time, src, at, countdown] of cases) {
  test(`the 4:20 cover ${name}`, async ({ page }) => {
    await page.clock.setFixedTime(new Date(time));
    await page.goto(`${baseUrl("tea")}/420/`);
    const figure = page.locator(".ceremony .night-cover");
    await expect(figure).toHaveAttribute("data-cover", at);
    await expect(figure.locator("img")).toHaveAttribute("src", src);
    await expect(figure.locator("source[type='image/avif']")).toHaveAttribute("srcset", new RegExp(src.replace(".jpg", "-480.avif")));
    // The card for the tea time the picture belongs to counts down to it.
    const card = page.locator(".ceremony-moment", { has: page.locator(`a[href='/schedule/#four-twenty-${at === "04:20" ? "night" : "high"}-tea']`) });
    await expect(card.locator(".countdown-status")).toContainText(countdown);
  });
}

test("the schedule lists the night tea with its own calendar file", async ({ page }) => {
  await page.goto(`${baseUrl("tea")}/schedule/`);
  const night = page.locator("#four-twenty-night-tea");
  await expect(night.locator("h3")).toHaveText("4:20 Night Tea");
  await expect(night.locator("a[download='four-twenty-night-tea.ics']")).toBeVisible();
  const ics = await page.request.get(`${baseUrl("tea")}/schedule/four-twenty-night-tea.ics`);
  expect(ics.ok()).toBe(true);
  expect(await ics.text()).toMatch(/DTSTART[^\n]*T042000/);
});
