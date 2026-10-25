import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { toIcs, toIcsCalendar, crossesClockChange } from "../src/ics.ts";
import { allEvents, eventsBySite } from "../src/events/index.ts";
import { runDays } from "../src/when.ts";

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

  test("a night past midnight ends the next morning, not before it began", () => {
    const ics = toIcs({ ...base, startTime: "20:00", endTime: "01:00" }, "https://dst.llc/x/", NOW);
    console.log("  20:00–01:00 ->", field(ics, "DTSTART"), field(ics, "DTEND"));
    assert.equal(field(ics, "DTSTART"), "DTSTART:20260907T160000Z");
    assert.equal(field(ics, "DTEND"), "DTEND:20260907T210000Z");
  });

  test("an entry with its own end day keeps it", () => {
    const ics = toIcs({ ...base, end: "2026-09-08", startTime: "21:00", endTime: "04:00" }, "https://dst.llc/x/", NOW);
    assert.equal(field(ics, "DTEND"), "DTEND:20260908T000000Z");
  });

  test("no timed event in the data ends before it starts", () => {
    const bad = allEvents.filter((e) => {
      if (!e.startTime) return false;
      const ics = toIcs(e, "https://dst.llc/x/", NOW);
      // A single day with no published end has no DTEND to compare.
      const end = field(ics, "DTEND");
      return end !== undefined && end.slice(6) < field(ics, "DTSTART").slice(8);
    });
    assert.deepEqual(bad.map((e) => `${e.site}/${e.slug}`), []);
  });

  test("an explicit utcOffset is honoured for events outside the Gulf", () => {
    const ics = toIcs({ ...base, startTime: "10:00", utcOffset: "+00:00" }, "https://dst.llc/x/", NOW);
    console.log("  10:00 +00:00 ->", field(ics, "DTSTART"));
    assert.equal(field(ics, "DTSTART"), "DTSTART:20260907T100000Z");
  });
});

// What a run of days looks like in the file. A daily window repeats as a
// series (RRULE) with the days it skips taken out (EXDATE); everything else
// is one block, as before. The cases follow `runDays` in ../src/when.ts.
describe("ics: runs and single days", () => {
  const ldn = { ...base, site: "ldn", utcOffset: "+00:00" };
  const rule = (ics) => field(ics, "RRULE");
  // A long EXDATE is folded over several lines; a client unfolds before reading.
  const exdates = (ics) => (field(ics.replace(/\r\n[ \t]/g, ""), "EXDATE")?.slice(7).split(",") ?? []);

  test("a single day with no end time has no DTEND at all", () => {
    const ics = toIcs({ ...ldn, start: "2026-10-31", startTime: "18:30" }, "https://ldn.lol/x/", NOW);
    console.log("  18:30, no end ->", field(ics, "DTSTART"), field(ics, "DTEND") ?? "(no DTEND)");
    assert.equal(field(ics, "DTSTART"), "DTSTART:20261031T183000Z");
    assert.equal(field(ics, "DTEND"), undefined);
    assert.equal(rule(ics), undefined);
  });

  test("a run with a daily window is the first evening, repeated until the last one starts", () => {
    const ics = toIcs({ ...ldn, start: "2026-10-29", end: "2026-10-31", startTime: "17:30", endTime: "22:00" }, "https://ldn.lol/x/", NOW);
    console.log("  29–31 Oct 17:30–22:00 ->", field(ics, "DTSTART"), field(ics, "DTEND"), rule(ics));
    assert.equal(field(ics, "DTSTART"), "DTSTART:20261029T173000Z");
    assert.equal(field(ics, "DTEND"), "DTEND:20261029T220000Z");
    assert.equal(rule(ics), "RRULE:FREQ=DAILY;UNTIL=20261031T173000Z");
    assert.equal(field(ics, "EXDATE"), undefined);
  });

  test("an overnight window repeats too, each night ending the next morning", () => {
    const ics = toIcs({ ...ldn, start: "2026-11-05", end: "2026-11-08", startTime: "20:00", endTime: "02:00" }, "https://ldn.lol/x/", NOW);
    assert.equal(field(ics, "DTEND"), "DTEND:20261106T020000Z");
    // `end` is the last morning, so the last night starts on the 7th.
    assert.equal(rule(ics), "RRULE:FREQ=DAILY;UNTIL=20261107T200000Z");
  });

  test("one night written with its next-day end stays one block", () => {
    const ics = toIcs({ ...ldn, start: "2026-12-31", end: "2027-01-01", startTime: "20:00", endTime: "00:30" }, "https://ldn.lol/x/", NOW);
    assert.equal(field(ics, "DTSTART"), "DTSTART:20261231T200000Z");
    assert.equal(field(ics, "DTEND"), "DTEND:20270101T003000Z");
    assert.equal(rule(ics), undefined);
  });

  test("a span with a start time and no end time stays one block", () => {
    const ics = toIcs({ ...base, start: "2026-10-09", end: "2027-01-30", startTime: "19:00" }, "https://dst.llc/x/", NOW);
    assert.equal(field(ics, "DTSTART"), "DTSTART:20261009T150000Z");
    assert.equal(field(ics, "DTEND"), "DTEND:20270130T150000Z");
    assert.equal(rule(ics), undefined);
  });

  test("`dates` gives a series without the days between them", () => {
    const dates = ["2026-10-03", "2026-10-04", "2026-10-09", "2026-11-02"];
    const ics = toIcs({ ...base, start: "2026-10-03", end: "2026-11-02", dates, startTime: "19:00", endTime: "23:00", utcOffset: "-06:00" }, "https://cmx.lol/x/", NOW);
    console.log("  4 nights over 31 days ->", rule(ics), `${exdates(ics).length} EXDATEs`);
    assert.equal(field(ics, "DTSTART"), "DTSTART:20261004T010000Z");
    assert.equal(field(ics, "DTEND"), "DTEND:20261004T050000Z");
    assert.equal(rule(ics), "RRULE:FREQ=DAILY;UNTIL=20261103T010000Z");
    assert.equal(exdates(ics).length, 31 - 4);
    assert.equal(exdates(ics)[0], "20261006T010000Z");
    assert.ok(!exdates(ics).includes("20261010T010000Z"), "a listed night was excluded");
  });

  test("`dates` with no end time repeats the start alone", () => {
    const ics = toIcs({ ...ldn, start: "2026-10-30", end: "2026-10-31", dates: ["2026-10-30", "2026-10-31"], startTime: "18:30" }, "https://ldn.lol/x/", NOW);
    assert.equal(field(ics, "DTEND"), undefined);
    assert.equal(rule(ics), "RRULE:FREQ=DAILY;UNTIL=20261031T183000Z");
  });

  test("`closedDates` takes days out of a daily run", () => {
    const ics = toIcs({ ...ldn, start: "2026-11-20", end: "2027-01-03", closedDates: ["2026-12-25"], startTime: "10:00", endTime: "20:00" }, "https://lnd.lol/x/", NOW);
    assert.equal(rule(ics), "RRULE:FREQ=DAILY;UNTIL=20270103T100000Z");
    assert.deepEqual(exdates(ics), ["20261225T100000Z"]);
  });

  test("a run across a clock change on a site in a zone with one stays one block", () => {
    const tower = { ...ldn, start: "2026-10-24", end: "2026-11-01", startTime: "10:30", endTime: "16:00", utcOffset: "+01:00" };
    const ics = toIcs(tower, "https://ldn.lol/x/", NOW);
    console.log("  24 Oct–1 Nov across 25 Oct ->", field(ics, "DTSTART"), field(ics, "DTEND"), rule(ics) ?? "(no RRULE)");
    assert.equal(field(ics, "DTSTART"), "DTSTART:20261024T093000Z");
    assert.equal(field(ics, "DTEND"), "DTEND:20261101T150000Z");
    assert.equal(rule(ics), undefined);
  });

  test("a run whose two ends share an offset but whose winter does not is caught", () => {
    // September to April in London: +01:00 at both ends, +00:00 between.
    const run = { ...ldn, start: "2026-09-01", end: "2027-04-30", startTime: "10:00", endTime: "17:00", utcOffset: "+01:00" };
    assert.equal(crossesClockChange(run, runDays(run)), true);
    assert.equal(rule(toIcs(run, "https://ldn.lol/x/", NOW)), undefined);
  });

  test("a site in a zone without clock changes repeats across any date", () => {
    const ics = toIcs({ ...base, start: "2026-10-10", end: "2027-05-02", startTime: "09:00", endTime: "21:00" }, "https://dst.llc/x/", NOW);
    assert.equal(rule(ics), "RRULE:FREQ=DAILY;UNTIL=20270502T050000Z");
  });
});

// The same rules held over every entry in the data, not only the fixtures
// above: whatever a series says, a calendar has to be able to expand it into
// exactly the days the entry runs on.
describe("ics: every series in the data", () => {
  const stamp = (line) => line.slice(line.indexOf(":") + 1);
  const toDate = (s) => new Date(s.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/, "$1-$2-$3T$4:$5:$6Z"));
  const series = allEvents
    .map((e) => ({ e, ics: toIcs(e, "https://example.test/x/", NOW).replace(/\r\n[ \t]/g, "") }))
    .filter(({ ics }) => field(ics, "RRULE"));

  test("there are series to check", () => {
    console.log(`  ${series.length} entries written as a daily series`);
    assert.ok(series.length > 0);
  });

  test("UNTIL is UTC and not before DTSTART; DTEND is after DTSTART", () => {
    for (const { e, ics } of series) {
      const where = `${e.site}/${e.slug}`;
      const start = stamp(field(ics, "DTSTART"));
      const until = /UNTIL=([0-9TZ]+)/.exec(field(ics, "RRULE"))?.[1];
      assert.match(until ?? "", /^\d{8}T\d{6}Z$/, `${where}: UNTIL is not a UTC stamp`);
      assert.match(start, /Z$/, `${where}: DTSTART is not UTC`);
      assert.ok(until >= start, `${where}: UNTIL ${until} before DTSTART ${start}`);
      const end = field(ics, "DTEND");
      if (end) assert.ok(stamp(end) > start, `${where}: DTEND ${stamp(end)} not after DTSTART ${start}`);
    }
  });

  test("every EXDATE sits on DTSTART's clock, inside the series, once", () => {
    for (const { e, ics } of series) {
      const where = `${e.site}/${e.slug}`;
      const start = stamp(field(ics, "DTSTART"));
      const until = /UNTIL=([0-9TZ]+)/.exec(field(ics, "RRULE"))[1];
      const ex = field(ics, "EXDATE") ? stamp(field(ics, "EXDATE")).split(",") : [];
      assert.equal(new Set(ex).size, ex.length, `${where}: an EXDATE is repeated`);
      for (const x of ex) {
        assert.equal(x.slice(8), start.slice(8), `${where}: EXDATE ${x} is not at DTSTART's time of day`);
        assert.ok(x > start && x < until, `${where}: EXDATE ${x} outside (${start}, ${until})`);
      }
    }
  });

  test("a calendar expands each series into exactly the days the entry runs on", () => {
    for (const { e, ics } of series) {
      const start = toDate(stamp(field(ics, "DTSTART")));
      const until = toDate(/UNTIL=([0-9TZ]+)/.exec(field(ics, "RRULE"))[1]);
      const ex = new Set(field(ics, "EXDATE") ? stamp(field(ics, "EXDATE")).split(",") : []);
      let count = 0;
      for (let t = start; t <= until; t = new Date(t.getTime() + 86_400_000)) {
        if (!ex.has(t.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""))) count++;
      }
      assert.equal(count, runDays(e).length, `${e.site}/${e.slug}: ${count} occurrences, ${runDays(e).length} run days`);
    }
  });

  test("every run that can repeat does, and nothing else does", (t) => {
    const repeats = new Set(series.map(({ e }) => `${e.site}/${e.slug}`));
    const blocks = [];
    for (const e of allEvents) {
      const days = runDays(e);
      const expected = Boolean(days) && !crossesClockChange(e, days);
      if (days && !expected) blocks.push(e);
      assert.equal(repeats.has(`${e.site}/${e.slug}`), expected, `${e.site}/${e.slug}: series ${!expected ? "written" : "missing"}`);
    }
    // A run kept as one block because its days straddle a clock change: named
    // in the log, so a new one is seen rather than silently written as a block.
    for (const e of blocks) t.diagnostic(`one block across a clock change: ${e.site}/${e.slug} (${e.start}–${e.end})`);
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
    for (const site of ["dst", "llc", "visas", "riviera", "mbr", "palmcentral", "eco", "fwf", "nyc42", "ldn", "lnd", "cmx", "mxo", "sol2go", "vien", "tick"]) {
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
