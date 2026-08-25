import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { toIcs } from "../src/ics.ts";
import { allEvents } from "../src/events/index.ts";

const NOW = new Date("2026-08-25T12:00:00Z");
const base = {
  slug: "sample-event",
  site: "dst",
  title: "Sample event",
  summary: "A summary.",
  start: "2026-09-07",
};

const lines = (ics) => ics.split("\r\n");
const field = (ics, name) => lines(ics).find((l) => l.startsWith(`${name}:`) || l.startsWith(`${name};`));

describe("ics: timed events", () => {
  test("clock time is converted to UTC using the event's offset", () => {
    const ics = toIcs({ ...base, startTime: "10:00", endTime: "18:00" }, "https://dst.llc/events/sample-event/", NOW);
    // 10:00 in +04:00 is 06:00 UTC.
    console.log("  10:00 +04:00 ->", field(ics, "DTSTART"));
    assert.equal(field(ics, "DTSTART"), "DTSTART:20260907T060000Z");
    assert.equal(field(ics, "DTEND"), "DTEND:20260907T140000Z");
  });

  test("an explicit utcOffset is honoured for events outside the Gulf", () => {
    const ics = toIcs({ ...base, startTime: "10:00", utcOffset: "+00:00" }, "https://dst.llc/x/", NOW);
    console.log("  10:00 +00:00 ->", field(ics, "DTSTART"));
    assert.equal(field(ics, "DTSTART"), "DTSTART:20260907T100000Z");
  });
});

describe("ics: all-day events", () => {
  test("an event with no clock time is all-day, not midnight", () => {
    const ics = toIcs(base, "https://dst.llc/x/", NOW);
    console.log("  no time ->", field(ics, "DTSTART"));
    assert.equal(field(ics, "DTSTART"), "DTSTART;VALUE=DATE:20260907");
  });

  test("all-day DTEND is exclusive — the day after the last day", () => {
    const ics = toIcs({ ...base, end: "2026-09-09" }, "https://dst.llc/x/", NOW);
    console.log("  ends 2026-09-09 ->", field(ics, "DTEND"));
    assert.equal(field(ics, "DTEND"), "DTEND;VALUE=DATE:20260910");
  });
});

describe("ics: formatting rules", () => {
  test("commas and semicolons in text are escaped", () => {
    const ics = toIcs({ ...base, title: "Hall 4, 5; and 6" }, "https://dst.llc/x/", NOW);
    const summary = field(ics, "SUMMARY");
    console.log("  escaped ->", summary);
    assert.equal(summary, "SUMMARY:Hall 4\\, 5\\; and 6");
  });

  test("every line ends CRLF and none exceeds 75 octets", () => {
    const long = "x".repeat(400);
    const ics = toIcs({ ...base, summary: long }, "https://dst.llc/x/", NOW);
    assert.ok(ics.endsWith("\r\n"), "file does not end with CRLF");
    const over = lines(ics).filter((l) => Buffer.byteLength(l, "utf8") > 75);
    console.log(`  ${lines(ics).length} lines, longest ${Math.max(...lines(ics).map((l) => Buffer.byteLength(l, "utf8")))} octets`);
    assert.deepEqual(over, [], "lines longer than 75 octets are not folded");
  });

  test("geo is emitted when the event has coordinates", () => {
    const ics = toIcs({ ...base, geo: { name: "DWTC", lat: 25.224198, lng: 55.286468 } }, "https://dst.llc/x/", NOW);
    console.log("  ", field(ics, "GEO"));
    assert.equal(field(ics, "GEO"), "GEO:25.224198;55.286468");
  });
});

describe("ics: every real event produces a valid file", () => {
  test("all published events serialise with the required fields", () => {
    for (const item of allEvents) {
      const ics = toIcs(item, `https://${item.site}.dst.llc/events/${item.slug}/`, NOW);
      for (const required of ["BEGIN:VCALENDAR", "BEGIN:VEVENT", "UID:", "DTSTAMP:", "SUMMARY:", "END:VEVENT", "END:VCALENDAR"]) {
        assert.ok(ics.includes(required), `${item.site}/${item.slug}: .ics is missing ${required}`);
      }
      assert.ok(field(ics, "DTSTART"), `${item.site}/${item.slug}: no DTSTART`);
      console.log(`  ${item.site}/${item.slug}: ${field(ics, "DTSTART")}`);
    }
  });
});
