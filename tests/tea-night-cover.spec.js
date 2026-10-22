// tea.ceo/420/ is about a tea time that comes round twice, at 16:20 and at
// 04:20, with one count to whichever is next, and the picture beside the
// count follows it: the common room by day, the night sky under Skywalker
// from twenty past four in the afternoon until twenty past four in the
// morning. Playwright's clock stands in for the reader's, so both pictures
// can be seen in one run, and the two edges prove the switch happens at
// 4:20 exactly rather than after the countdown's half-hour window.
import { test, expect } from "@playwright/test";
import { baseUrl } from "./servers.js";

const cases = [
  ["at noon, the common room by day", "2026-10-22T12:00:00", "/covers/420.jpg", "16:20", "in 4 h 20 m", "today at 16:20"],
  ["at three in the morning, the night sky", "2026-10-22T03:00:00", "/covers/420-night.jpg", "04:20", "in 1 h 20 m", "today at 04:20"],
  // At 16:20 exactly the afternoon pot is on — the count says so for half an
  // hour — but the picture has already turned to the night.
  ["at 16:20 exactly, the night sky", "2026-10-22T16:20:00", "/covers/420-night.jpg", "04:20", "Now", ""],
  ["at 04:20 exactly, the day again", "2026-10-22T04:20:00", "/covers/420.jpg", "16:20", "Now", ""],
];

for (const [name, time, src, at, status, when] of cases) {
  test(`the 4:20 cover ${name}`, async ({ page }) => {
    await page.clock.setFixedTime(new Date(time));
    await page.goto(`${baseUrl("tea")}/420/`);
    const figure = page.locator(".ceremony .night-cover");
    await expect(figure).toHaveAttribute("data-cover", at);
    await expect(figure.locator("img")).toHaveAttribute("src", src);
    await expect(figure.locator("source[type='image/avif']")).toHaveAttribute("srcset", new RegExp(src.replace(".jpg", "-480.avif")));
    // One tea time, one count, to whichever 4:20 is next.
    const cards = page.locator(".ceremony-moment");
    await expect(cards).toHaveCount(1);
    await expect(cards.locator(".countdown-status")).toContainText(status);
    await expect(cards.locator(".countdown-when")).toHaveText(when);
  });
}

test("the schedule gives 4:20 High Tea both times and a calendar file with both", async ({ page }) => {
  await page.goto(`${baseUrl("tea")}/schedule/`);
  const card = page.locator("#four-twenty-high-tea");
  await expect(card.locator(".moment-meta")).toContainText("16:20, and again at 04:20");
  await expect(page.locator("#four-twenty-night-tea")).toHaveCount(0);
  const ics = await (await page.request.get(`${baseUrl("tea")}/schedule/four-twenty-high-tea.ics`)).text();
  expect(ics).toMatch(/DTSTART:\d{8}T162000/);
  expect(ics).toMatch(/DTSTART:\d{8}T042000/);
  expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(2);
  expect(ics).toContain("UID:four-twenty-high-tea@tea.ceo");
  expect(ics).toContain("UID:four-twenty-high-tea-0420@tea.ceo");
});
