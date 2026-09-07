import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { toRss, FEED_LIMIT } from "../src/rss.ts";
import { newsBySite } from "../src/news/index.ts";

const NOW = new Date("2026-09-07T12:00:00Z");
const SITES = ["dst", "llc", "visas", "riviera", "mbr", "palmcentral", "eco", "fwf",
  "nyc42", "ldn", "lnd", "cmx", "mxo", "sol2go", "vien", "musical"];
const meta = {
  title: "Sample — news",
  description: "A description.",
  siteUrl: "https://example.test/",
  self: "https://example.test/rss.xml",
  language: "en-GB",
};
const base = { slug: "an-entry", site: "ldn", title: "An entry", summary: "A summary.", date: "2026-09-06", body: ["x"] };
const feed = (items, m = meta) => toRss(items, (i) => `https://example.test/news/${i.slug}/`, m, NOW);
const tag = (xml, name) => xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))?.[1];

describe("rss: the channel", () => {
  test("it parses, and says which language it is in", () => {
    const xml = feed([base]);
    assert.match(xml, /^<\?xml version="1.0" encoding="UTF-8"\?>/);
    assert.equal(tag(xml, "language"), "en-GB");
    // rel="self" is how an aggregator knows the feed's own address when it
    // met the file somewhere other than the site.
    assert.match(xml, /<atom:link href="https:\/\/example\.test\/rss\.xml" rel="self"/);
    console.log("  ", tag(xml, "title"), "|", tag(xml, "language"));
  });

  test("dates are RFC 822, which is what RSS 2.0 requires", () => {
    const xml = feed([base]);
    // 2026-09-06 was a Sunday.
    assert.equal(tag(xml, "pubDate"), "Sun, 06 Sep 2026 00:00:00 GMT");
    console.log("  2026-09-06 ->", tag(xml, "pubDate"));
  });

  test("newest first, however they went in", () => {
    const items = [
      { ...base, slug: "old", date: "2026-08-01" },
      { ...base, slug: "new", date: "2026-09-06" },
      { ...base, slug: "middle", date: "2026-08-20" },
    ];
    const order = [...feed(items).matchAll(/<guid[^>]*>.*?\/news\/(.*?)\/<\/guid>/g)].map((m) => m[1]);
    console.log("  ", order.join(" -> "));
    assert.deepEqual(order, ["new", "middle", "old"]);
  });

  test("the feed is capped, so a first fetch is not the whole archive", () => {
    const many = Array.from({ length: 40 }, (_, i) => ({ ...base, slug: `e${i}`, date: `2026-08-${String((i % 28) + 1).padStart(2, "0")}` }));
    const count = (feed(many).match(/<item>/g) ?? []).length;
    console.log(`  40 in -> ${count} out (limit ${FEED_LIMIT})`);
    assert.equal(count, FEED_LIMIT);
  });
});

describe("rss: escaping and content", () => {
  test("markup in a title or summary cannot break the document", () => {
    const xml = feed([{ ...base, title: "Tate & Lyle <b>reopens</b>", summary: `He said "yes" & left` }]);
    assert.ok(xml.includes("Tate &amp; Lyle &lt;b&gt;reopens&lt;/b&gt;"), "title not escaped");
    assert.ok(xml.includes("&quot;yes&quot; &amp; left"), "summary not escaped");
    assert.ok(!/<b>/.test(xml), "raw markup survived into the document");
    console.log("  ", tag(xml, "title"));
  });

  test("the summary goes out, never the body", () => {
    // A full-text feed is how a scraper republishes an article and outranks
    // the site that wrote it. This is the test that keeps that decision.
    const xml = feed([{ ...base, summary: "The summary.", body: ["The first paragraph of the body.", "The second."] }]);
    assert.ok(xml.includes("The summary."), "summary missing");
    assert.ok(!xml.includes("first paragraph"), "the body reached the feed");
    console.log("   description =", tag(xml, "description"));
  });
});

describe("rss: every site's real feed", () => {
  test("each one is well formed and holds only entries with a page", () => {
    for (const site of SITES) {
      const items = newsBySite(site).filter((i) => Array.isArray(i.body) && i.body.length > 0);
      const xml = feed(items);
      const count = (xml.match(/<item>/g) ?? []).length;
      assert.equal(count, Math.min(items.length, FEED_LIMIT), `${site}: item count`);
      assert.ok(xml.trimEnd().endsWith("</rss>"), `${site}: document not closed`);
      // A guid identifies the entry for the life of the feed, so two entries
      // sharing one would read as edits of a single article.
      const guids = [...xml.matchAll(/<guid[^>]*>(.*?)<\/guid>/g)].map((m) => m[1]);
      assert.equal(new Set(guids).size, guids.length, `${site}: duplicate guid`);
      console.log(`  ${site.padEnd(12)} ${String(count).padStart(2)} items`);
    }
  });

  test("no feed advertises a site that has stopped publishing", () => {
    // The age question, settled. NewsNow asks a headline feed to carry
    // nothing older than sixty days, and the first version of this test
    // enforced that on the whole feed — which failed nine sites for having a
    // short archive rather than for being quiet. dst had published eleven
    // times in thirty days and still tripped it, because all fourteen of its
    // entries fit under the twenty-item cap and the oldest is from last year.
    //
    // An old entry in a small archive costs a reader nothing, so the
    // generator caps by count and not by age. What is worth failing on is a
    // feed whose *newest* entry has gone stale: that site has stopped, and a
    // stale feed should not be offered to a reader or to an aggregator.
    const stale = [];
    for (const site of SITES) {
      const items = newsBySite(site).filter((i) => Array.isArray(i.body) && i.body.length > 0);
      if (items.length === 0) continue;
      const dates = items.map((i) => i.date).sort();
      const days = Math.round((NOW - new Date(`${dates.at(-1)}T00:00:00Z`)) / 864e5);
      console.log(`  ${site.padEnd(12)} newest ${dates.at(-1)} (${days}d), ${items.length} in the archive`);
      if (days > 60) stale.push(`${site}: nothing since ${dates.at(-1)}, ${days} days`);
    }
    assert.deepEqual(stale, [], `feeds for sites that have stopped publishing:\n  ${stale.join("\n  ")}`);
  });
});
