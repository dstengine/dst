import { test, describe } from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { EXPERIMENTS, liveExperiments, bucket, variantOf, fnv1a, BUCKET_JS } from "../src/experiments.ts";
import { NETWORK } from "../src/network.ts";

const exp = (over) => ({
  id: "t",
  unit: "visitor",
  hosts: ["a.test"],
  variants: ["a", "b", "c"],
  start: "2026-01-01",
  hypothesis: "h",
  metric: "m",
  ...over,
});

describe("the registry", () => {
  // An id and a variant are an HTML attribute name, a CSS selector and a
  // GA4 parameter value; anything outside this set breaks one of the three.
  const NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  const HOSTS = new Set([...NETWORK.map((s) => s.host), "tick.am", "aivideo.zone"]);

  for (const e of EXPERIMENTS) {
    test(`${e.id} is well-formed`, () => {
      assert.match(e.id, NAME, "id");
      assert.ok(e.id.length <= 32, "id is short enough for a GA4 value with its variant");
      assert.ok(e.variants.length >= 2, "at least a control and one variant");
      for (const v of e.variants) assert.match(v, NAME, `variant ${v}`);
      assert.equal(new Set(e.variants).size, e.variants.length, "variants are unique");
      if (e.weights) {
        assert.equal(e.weights.length, e.variants.length, "one weight per variant");
        assert.ok(e.weights.every((w) => w > 0), "weights are positive");
      }
      assert.match(e.start, /^\d{4}-\d{2}-\d{2}$/, "start is a date");
      if (e.end) assert.ok(e.end > e.start, "end is after start");
      if (e.winner) assert.ok(e.variants.includes(e.winner), "the winner is one of the variants");
      assert.ok(e.hosts.length > 0 && e.hosts.every((h) => HOSTS.has(h)), `hosts are ours: ${e.hosts}`);
      if (e.paths) assert.doesNotThrow(() => new RegExp(e.paths), "paths is a valid RegExp");
      assert.ok(e.hypothesis.length > 40, "the hypothesis is written down before the numbers arrive");
      assert.ok(e.metric.trim(), "the metric is named");
    });
  }

  test("ids are unique", () => {
    const ids = EXPERIMENTS.map((e) => e.id);
    assert.equal(new Set(ids).size, ids.length);
  });
});

describe("liveExperiments", () => {
  const all = [
    exp({ id: "running" }),
    exp({ id: "future", start: "2026-06-01" }),
    exp({ id: "ended", end: "2026-03-01" }),
    exp({ id: "decided", winner: "b" }),
    exp({ id: "elsewhere", hosts: ["b.test"] }),
    exp({ id: "events-only", paths: "^/(?:am/)?events/[^/]+/$" }),
  ];
  const live = (path, today) => liveExperiments("a.test", path, today, all).map((e) => e.id);

  test("runs from start, stops on end, and not once decided or on another host", () => {
    assert.deepEqual(live("/", "2026-02-01"), ["running", "ended"]);
    assert.deepEqual(live("/", "2026-03-01"), ["running"], "end is the first day it no longer runs");
    assert.deepEqual(live("/", "2026-06-01"), ["running", "future"]);
  });

  test("keeps to its paths, in every language", () => {
    assert.deepEqual(live("/events/x/", "2026-02-01"), ["running", "ended", "events-only"]);
    assert.deepEqual(live("/am/events/x/", "2026-02-01"), ["running", "ended", "events-only"]);
    assert.ok(!live("/events/", "2026-02-01").includes("events-only"), "not the index");
  });
});

describe("bucket", () => {
  const e = exp({ id: "spread" });
  const keys = Array.from({ length: 30000 }, (_, i) => `visitor-${i}-${(i * 2654435761) >>> 0}`);

  test("is deterministic", () => {
    for (const k of keys.slice(0, 100)) assert.equal(bucket(e, k), bucket(e, k));
  });

  test("splits evenly when unweighted", () => {
    const counts = Object.fromEntries(e.variants.map((v) => [v, 0]));
    for (const k of keys) counts[bucket(e, k)]++;
    for (const v of e.variants) {
      const share = counts[v] / keys.length;
      assert.ok(Math.abs(share - 1 / 3) < 0.02, `${v}: ${(share * 100).toFixed(1)}% of visitors`);
    }
  });

  test("follows the weights", () => {
    const w = exp({ id: "weighted", variants: ["a", "b"], weights: [9, 1] });
    const b = keys.filter((k) => bucket(w, k) === "b").length / keys.length;
    assert.ok(Math.abs(b - 0.1) < 0.015, `b: ${(b * 100).toFixed(1)}%`);
  });

  test("puts one key in different groups for different tests", () => {
    // Otherwise the control of one test is the control of every test, and
    // two tests running at once measure each other.
    const other = exp({ id: "another" });
    const same = keys.slice(0, 3000).filter((k) => bucket(e, k) === bucket(other, k)).length / 3000;
    assert.ok(same < 0.4, `${(same * 100).toFixed(1)}% agree; independent would be about 33%`);
  });

  test("the browser's copy gives the same answers", () => {
    const ctx = {};
    vm.runInNewContext(`${BUCKET_JS}; this.bucket = bucket;`, ctx);
    for (const t of [e, exp({ id: "weighted", variants: ["a", "b"], weights: [9, 1] })]) {
      for (const k of keys.slice(0, 2000)) {
        assert.equal(ctx.bucket(t.id, t.variants, t.weights ?? null, k), bucket(t, k), `${t.id}/${k}`);
      }
    }
  });

  test("fnv1a matches the published 32-bit test vectors", () => {
    assert.equal(fnv1a(""), 0x811c9dc5);
    assert.equal(fnv1a("a"), 0xe40c292c);
    assert.equal(fnv1a("foobar"), 0xbf9cf968);
  });
});

describe("variantOf", () => {
  test("the winner once decided, the control outside the dates, the bucket in between", () => {
    const e = exp({ id: "page", unit: "page", end: "2026-06-01" });
    assert.equal(variantOf({ ...e, winner: "c" }, "k", "2026-02-01"), "c");
    assert.equal(variantOf(e, "k", "2025-12-31"), "a");
    assert.equal(variantOf(e, "k", "2026-06-01"), "a");
    assert.equal(variantOf(e, "k", "2026-02-01"), bucket(e, "k"));
  });
});
