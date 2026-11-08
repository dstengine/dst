// UTM tags on the hops to a box office (packages/ui/src/utm.ts). A seller
// counts our buyers by these tags, so a hop that drops them, or a map that
// gains them, is a fault worth a test: the helper on its own, then every
// built hop of the apps that are built.
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { isTicketHop, tagTicketUrl } = await import("../packages/ui/src/utm.ts");
// A site whose slugs name the seller rather than say "ticket" passes its own
// list to the hop; there that list decides, both ways.
const { isSellerHop: tokiohotelSeller } = await import("../apps/tokiohotel/src/outbound.ts");
const ownRule = { tokiohotel: tokiohotelSeller };

describe("tagTicketUrl", () => {
  const tag = { campaign: "swan-lake-ticket", host: "tick.am" };

  test("appends source, medium and campaign", () => {
    assert.equal(
      tagTicketUrl("https://eventhub.am/am/event/x", tag),
      "https://eventhub.am/am/event/x?utm_source=tick.am&utm_medium=referral&utm_campaign=swan-lake-ticket",
    );
  });

  test("keeps the seller's own query bytes and fragment", () => {
    assert.equal(
      tagTicketUrl("https://ticket.opera.am/hy/details/1741/P.%20Tchaikovsky%20%22SWAN%20LAKE%22?a=1,2#seats", tag),
      "https://ticket.opera.am/hy/details/1741/P.%20Tchaikovsky%20%22SWAN%20LAKE%22?a=1,2&utm_source=tick.am&utm_medium=referral&utm_campaign=swan-lake-ticket#seats",
    );
  });

  test("source is the bare host", () => {
    assert.match(tagTicketUrl("https://x.example/", { campaign: "c", host: "www.musical.today" }), /utm_source=musical\.today&/);
  });

  test("leaves alone what it should not tag", () => {
    for (const to of ["mailto:box@office.am", "tel:+37410000000", "/go/elsewhere/", "not a url"]) assert.equal(tagTicketUrl(to, tag), to);
    assert.equal(tagTicketUrl("https://www.tick.am/am/", tag), "https://www.tick.am/am/", "our own host");
    assert.equal(tagTicketUrl("https://x.example/?UTM_source=them", tag), "https://x.example/?UTM_source=them", "a seller's own campaign");
    assert.equal(tagTicketUrl("https://x.example/", { host: "tick.am" }), "https://x.example/", "no slug");
    assert.equal(tagTicketUrl("https://x.example/", { campaign: "c" }), "https://x.example/", "no host");
  });

  test("a ticket hop by its slug", () => {
    for (const slug of ["swan-lake-ticket", "tickets-chicago-liverpool", "untold-dubai-tickets", "igloofest-edmonton-tickets", "tickets"]) assert.ok(isTicketHop(slug), slug);
    for (const slug of ["swan-lake-map", "swan-lake-source", "venue-sondheim-theatre", "ticketmaster", "pocket-guide", undefined]) assert.ok(!isTicketHop(slug), String(slug));
  });
});

// Every built hop: the refresh, the script and the link out lead to the same
// place, and that place carries the tags exactly when the hop is a box
// office's. fest decides by the hop's kind too, so there a ticket slug must
// be tagged and a map must not; elsewhere the slug decides both ways.
const decode = (s) => s.replace(/&#38;|&amp;/g, "&");
const apps = readdirSync(path.join(REPO, "apps")).filter((app) => existsSync(path.join(REPO, "apps", app, "dist", "go")));

describe("built /go/ hops", () => {
  test("at least one app is built", () => assert.ok(apps.length > 0, 'run "npm run build" first'));

  for (const app of apps) {
    test(`${app}: a box office's hop is tagged, every other hop is not`, () => {
      const dir = path.join(REPO, "apps", app, "dist", "go");
      const bad = [];
      let tagged = 0;
      for (const slug of readdirSync(dir)) {
        const file = path.join(dir, slug, "index.html");
        if (!existsSync(file)) continue;
        const html = readFileSync(file, "utf8");
        const refresh = decode(html.match(/<meta http-equiv="refresh" content="0; url=([^"]*)"/)?.[1] ?? "");
        const script = JSON.parse(html.match(/const to = ("(?:[^"\\]|\\.)*");/)?.[1] ?? '""');
        const out = [...html.matchAll(/<a href="([^"]*)" rel="nofollow noopener external"/g)].map((m) => decode(m[1]));
        if (!refresh) bad.push(`${slug}: no refresh`);
        if (script !== refresh) bad.push(`${slug}: script ${script} ≠ refresh ${refresh}`);
        for (const href of out) if (href !== refresh) bad.push(`${slug}: link ${href} ≠ refresh ${refresh}`);
        // A seller's own campaign link keeps its tags and gets none of ours.
        if (/[?&]utm_/i.test(refresh) && !/[?&]utm_medium=referral&utm_campaign=/.test(refresh)) continue;
        const has = /[?&]utm_campaign=/.test(refresh);
        if (has) tagged++;
        if (has && !refresh.includes(`utm_campaign=${encodeURIComponent(slug)}`)) bad.push(`${slug}: campaign is not the slug`);
        const seller = ownRule[app] ? ownRule[app](slug) : isTicketHop(slug);
        if (seller && !has) bad.push(`${slug}: a box office's hop without UTM`);
        if (app !== "fest" && !seller && has) bad.push(`${slug}: UTM on a hop that is not a box office's`);
        if (refresh.startsWith("https://www.google.com/maps/") && has) bad.push(`${slug}: UTM on a map`);
      }
      assert.deepEqual(bad, []);
      console.log(`  ${app}: ${tagged} tagged hops`);
    });
  }
});
