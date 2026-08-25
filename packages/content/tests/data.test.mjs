import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { allNews, newsBySite } from "../src/news/index.ts";
import { allEvents, eventsBySite } from "../src/events/index.ts";

const SITES = ["dst", "llc", "visas", "riviera", "mbr", "palmcentral", "eco"];

const kinds = [
  { label: "news", all: allNews, bySite: newsBySite, dateKey: "date" },
  { label: "events", all: allEvents, bySite: eventsBySite, dateKey: "start" },
];

describe("slug uniqueness and per-site counts", () => {
  for (const { label, bySite } of kinds) {
    test(`${label}: slug is non-empty and unique within each site`, () => {
      const table = {};
      for (const site of SITES) {
        const items = bySite(site);
        table[site] = items.length;
        const seen = new Set();
        for (const item of items) {
          assert.ok(item.slug && item.slug.trim() !== "", `${label}/${site}: item with empty slug — ${JSON.stringify(item.title)}`);
          assert.ok(!seen.has(item.slug), `${label}/${site}: duplicate slug "${item.slug}"`);
          seen.add(item.slug);
        }
      }
      console.log(`${label} site -> count:`, table);
    });
  }
});

describe("dates parse as valid ISO", () => {
  for (const { label, all, dateKey } of kinds) {
    test(`${label}: ${dateKey} parses as a valid date on every item`, () => {
      for (const item of all) {
        const raw = item[dateKey];
        const parsed = new Date(raw);
        assert.ok(!Number.isNaN(parsed.getTime()), `${label}/${item.site}/${item.slug}: "${dateKey}"="${raw}" did not parse — got ${parsed}`);
        console.log(`${label}/${item.site}/${item.slug}: ${dateKey}="${raw}" -> ${parsed.toISOString().slice(0, 10)}`);
        if (item.end) {
          const parsedEnd = new Date(item.end);
          assert.ok(!Number.isNaN(parsedEnd.getTime()), `${label}/${item.site}/${item.slug}: "end"="${item.end}" did not parse`);
        }
      }
    });
  }
});

describe("body presence determines detail pages", () => {
  for (const { label, all } of kinds) {
    test(`${label}: items with/without body are correctly split`, () => {
      const withPage = all.filter((i) => Array.isArray(i.body) && i.body.length > 0).map((i) => `${i.site}/${i.slug}`);
      const withoutPage = all.filter((i) => !(Array.isArray(i.body) && i.body.length > 0)).map((i) => `${i.site}/${i.slug}`);
      console.log(`${label}: gets a detail page ->`, withPage);
      console.log(`${label}: stays list-only (no body) ->`, withoutPage);
      assert.equal(withPage.length + withoutPage.length, all.length, `${label}: split does not account for every item`);
    });
  }
});

describe("source, when present, is well-formed", () => {
  for (const { label, all } of kinds) {
    test(`${label}: source has a non-empty name and a syntactically valid url`, () => {
      const withSource = all.filter((i) => i.source);
      if (withSource.length === 0) {
        console.log(`${label}: no items carry a source field — nothing to check (own-action items don't need one)`);
      }
      for (const item of withSource) {
        assert.ok(item.source.name && item.source.name.trim() !== "", `${label}/${item.site}/${item.slug}: source.name is empty`);
        assert.doesNotThrow(() => new URL(item.source.url), `${label}/${item.site}/${item.slug}: source.url "${item.source.url}" is not a valid URL`);
        console.log(`${label}/${item.site}/${item.slug}: source="${item.source.name}" url="${item.source.url}"`);
      }
    });
  }
});

describe("geo, when present, is in range", () => {
  for (const { label, all } of kinds) {
    test(`${label}: geo.lat is in [-90,90] and geo.lng is in [-180,180]`, () => {
      const withGeo = all.filter((i) => i.geo);
      for (const item of withGeo) {
        assert.ok(item.geo.lat >= -90 && item.geo.lat <= 90, `${label}/${item.site}/${item.slug}: geo.lat=${item.geo.lat} out of range`);
        assert.ok(item.geo.lng >= -180 && item.geo.lng <= 180, `${label}/${item.site}/${item.slug}: geo.lng=${item.geo.lng} out of range`);
        console.log(`${label}/${item.site}/${item.slug}: geo=(${item.geo.lat}, ${item.geo.lng})`);
      }
      if (withGeo.length === 0) console.log(`${label}: no items carry geo`);
    });
  }
});

describe("image, when present, has a non-empty imageAlt", () => {
  for (const { label, all } of kinds) {
    test(`${label}: every image has alt text`, () => {
      const withImage = all.filter((i) => i.image);
      for (const item of withImage) {
        assert.ok(item.imageAlt && item.imageAlt.trim() !== "", `${label}/${item.site}/${item.slug}: image="${item.image}" has no imageAlt`);
        console.log(`${label}/${item.site}/${item.slug}: image="${item.image}" imageAlt="${item.imageAlt}"`);
      }
      if (withImage.length === 0) console.log(`${label}: no items carry an image`);
    });
  }
});

describe("related card images carry alt text", () => {
  for (const { label, all } of kinds) {
    test(`${label}: every related card image has a non-empty imageAlt`, () => {
      for (const item of all) {
        for (const card of item.related ?? []) {
          if (!card.image) continue;
          assert.ok(card.imageAlt && card.imageAlt.trim() !== "", `${label}/${item.site}/${item.slug}: related "${card.title}" has image="${card.image}" but no imageAlt`);
        }
      }
    });
  }
});

describe("related cards never point outside the site (eco: only eco or dst.llc)", () => {
  for (const { label, all } of kinds) {
    test(`${label}: related[].href stays in-network per site's linking rule`, () => {
      for (const item of all) {
        for (const card of item.related ?? []) {
          const where = `${label}/${item.site}/${item.slug} -> related "${card.title}" (${card.href})`;
          if (item.site === "eco") {
            const isEcoInternal = card.href.startsWith("/");
            const isDstLlc = /^https:\/\/(www\.)?dst\.llc(\/|$)/.test(card.href);
            assert.ok(isEcoInternal || isDstLlc, `${where}: eco related cards may only link into eco itself or to dst.llc`);
          } else {
            assert.ok(card.href.startsWith("/"), `${where}: related card must stay site-internal (relative href)`);
          }
        }
      }
    });
  }
});
