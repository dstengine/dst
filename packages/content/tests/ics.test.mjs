import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { toIcs, toIcsCalendar } from "../src/ics.ts";
import { allEvents, eventsBySite } from "../src/events/index.ts";

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

describe("ics: the subscribable calendar", () => {
  const meta = {
    name: "London Today — what's on",
    description: "Exhibitions, carnival and theatre in central London.",
    url: "https://ldn.lol/events/",
    source: "https://ldn.lol/events.ics",
  };
  const cal = (items) => toIcsCalendar(items, (i) => `https://ldn.lol/events/${i.slug}/`, meta, NOW);

  test("one wrapper holds every event", () => {
    const items = [base, { ...base, slug: "second", start: "2026-09-09" }, { ...base, slug: "third", start: "2026-09-11" }];
    const ics = cal(items);
    assert.equal(lines(ics).filter((l) => l === "BEGIN:VCALENDAR").length, 1);
    assert.equal(lines(ics).filter((l) => l === "BEGIN:VEVENT").length, 3);
    console.log(`  3 events, ${lines(ics).length} lines, one VCALENDAR`);
  });

  test("events come out in date order however they went in", () => {
    const items = [
      { ...base, slug: "late", start: "2026-12-01" },
      { ...base, slug: "early", start: "2026-09-07" },
      { ...base, slug: "middle", start: "2026-10-15" },
    ];
    const order = lines(cal(items)).filter((l) => l.startsWith("UID:")).map((l) => l.slice(4).split("@")[0]);
    console.log("  ", order.join(" -> "));
    assert.deepEqual(order, ["early", "middle", "late"]);
  });

  test("a subscriber is told what this is and where to re-read it", () => {
    const ics = cal([base]);
    // NAME and SOURCE are RFC 7986; the X-WR-* twins are what Google and
    // Apple have honoured for far longer, so both have to be present.
    assert.equal(field(ics, "NAME"), `NAME:${meta.name}`);
    assert.equal(field(ics, "X-WR-CALNAME"), `X-WR-CALNAME:${meta.name}`);
    assert.equal(field(ics, "SOURCE"), `SOURCE;VALUE=URI:${meta.source}`);
    assert.equal(field(ics, "REFRESH-INTERVAL"), "REFRESH-INTERVAL;VALUE=DURATION:PT12H");
    assert.equal(field(ics, "X-PUBLISHED-TTL"), "X-PUBLISHED-TTL:PT12H");
    console.log("  ", field(ics, "SOURCE"), "|", field(ics, "REFRESH-INTERVAL"));
  });

  test("no METHOD, which belongs to an invitation rather than a feed", () => {
    // A single event is imported once and METHOD:PUBLISH describes that.
    // A calendar a client re-fetches on its own schedule is not iTIP traffic.
    assert.ok(toIcs(base, "https://ldn.lol/x/", NOW).includes("METHOD:PUBLISH"));
    assert.ok(!cal([base]).includes("METHOD:"), "the subscribable calendar should carry no METHOD");
  });

  test("every site's real calendar folds, escapes and ends cleanly", () => {
    for (const site of ["dst", "llc", "visas", "riviera", "mbr", "palmcentral", "eco", "fwf", "nyc42", "ldn", "lnd", "cmx", "mxo", "sol2go", "vien"]) {
      const items = eventsBySite(site).filter((i) => Array.isArray(i.body) && i.body.length > 0);
      const ics = toIcsCalendar(items, (i) => `https://example.test/events/${i.slug}/`, { ...meta, name: site }, NOW);
      const over = lines(ics).filter((l) => Buffer.byteLength(l, "utf8") > 75);
      assert.deepEqual(over, [], `${site}: unfolded lines`);
      assert.ok(ics.endsWith("END:VCALENDAR\r\n"), `${site}: file does not close the calendar`);
      assert.equal(lines(ics).filter((l) => l === "BEGIN:VEVENT").length, items.length, `${site}: event count`);
      // A UID has to be unique inside one calendar or a client will treat
      // two entries as edits of the same appointment.
      const uids = lines(ics).filter((l) => l.startsWith("UID:"));
      assert.equal(new Set(uids).size, uids.length, `${site}: duplicate UID in one calendar`);
      console.log(`  ${site.padEnd(12)} ${String(items.length).padStart(2)} events, ${lines(ics).length} lines`);
    }
  });
});
