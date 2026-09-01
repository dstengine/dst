# DST

Monorepo for the DST network: the group's own brand site, each Dubai-focused
vertical it operates, and the standalone experiments. Static Astro sites,
deployed independently, sharing one design system.

## Feature groups

A site is mostly defined by which of these it switches on. Each group is a
set of components in `packages/ui` that only make sense together — a site
takes the whole group or none of it.

- **[Feed](packages/ui/src/components)** — the news and events spine:
  `NewsBlock` / `NewsList` / `NewsArticle`, `EventsBlock` / `EventsList` /
  `EventArticle`, and the `FeedCards` they all render through. Brings
  `/go/` outbound hops (`Redirect`) and `.ics` calendar files with it.
  Every site but `musical`, which publishes runs rather than a feed.
- **[Lead capture](packages/ui/src/components)** — `LeadForm`,
  `LeadTracking`, `Callout`, `Faq`. The route from a reader to a qualified
  enquiry, on the verticals where DKEY executes.
- **[District](packages/ui/src/components/district)** — `DistrictHub`,
  `ContentPage`, `VenuePage`, `VenueCard`, `DistrictRentForm`, and the
  [`DistrictLayout`](packages/ui/src/layouts/DistrictLayout.astro) that
  replaces `BaseLayout` on these sites. A neighbourhood covered block by block: venues,
  amenities, and what it costs to live there.
- **[Media](packages/ui/src/components)** — `Photo`, `PhotoCredit`,
  `Lightbox`, and `district/PhotoHero`. Licensed photography with its credit attached;
  a site without pictures it may use does not switch this on.
- **[Wayfinding](packages/ui/src/components)** — `Breadcrumbs`,
  `OnThisPage`, `Glance`, `MapEmbed`, `CountdownScript`. For sites deep
  enough that a reader can get lost in them.
- **[Portfolio](packages/ui/src/components)** — `VentureGrid`. A grid of
  what the operator runs, with live/in-development status.

## The sites

| App | Domain | What it is | Feature groups |
| --- | --- | --- | --- |
| `dst` | dst.llc | The group's brand site — the systems behind the ventures | Feed, Portfolio, Lead capture, Wayfinding |
| `llc` | llc.dst.llc | Starting a business in Dubai: mainland, free zone, offshore | Feed, Lead capture |
| `visas` | visas.dst.llc | UAE residency routes, employment through Golden Visa | Feed, Lead capture |
| `riviera` | riviera.dst.llc | Azizi Riviera, block by block | Feed, District |
| `mbr` | mbr.dst.llc | MBR City, block by block | Feed, District |
| `palmcentral` | palmcentral.dst.llc | Palm Central by Nakheel — pricing, payment plan, eligibility | Feed, Lead capture, Media |
| `eco` | eco.dst.llc | The eco portfolio: funded environmental initiatives | Feed, Portfolio, Lead capture, Media |
| `api` | api.dst.llc | Serverless endpoints. Not an Astro site — no UI at all | — |
| `fwf` | fwf.lol | Independent guide to one conference: Future World Forum Dubai | Feed, Lead capture, Media, Wayfinding |
| `musical` | musical.today | Musicals city by city — venues, runs, and who is actually selling | Lead capture, District, Media, Wayfinding, Portfolio |
| `nyc42` | nyc42.lol | What's on in New York City | Feed |
| `ldn` | ldn.lol | What's on in central London | Feed |
| `lnd` | lnd.lol | Greater London, beyond the centre | Feed |
| `cmx` | cmx.lol | Qué hacer en la Ciudad de México | Feed |
| `mxo` | mxo.lol | La agenda de México | Feed |

Two things the table does not show and that the code enforces:

- **The five `.lol` sites are independent.** They carry no link to dst.llc
  and none to each other. They are year-long experiments with their own
  domains, sharing the code and nothing else. `musical.today` is separate
  from the group in the same way, down to its own publisher in the
  structured data.
- **cmx and mxo publish in Spanish.** They render `lang="es-MX"` and pass a
  Spanish label set from their own `content.ts` into the shared components
  (`packages/ui/src/labels.ts`). Everything else in the network takes the
  English defaults.

## Two home-page shapes

Every home page in the network ends with the same two blocks, in one of two
orders. Which order is not a style choice — it answers what the reader came
for:

- **A — agenda.** `EventsBlock`, then `NewsBlock`. For sites whose subject
  is dated: `dst`, `riviera`, `mbr`, `fwf`, and the five `.lol` city sites.
  What is on soon outranks what was filed recently.
- **B — advisory.** `NewsBlock`, then `EventsBlock`. For sites whose subject
  is a rule or a purchase: `llc`, `visas`, `eco`, `palmcentral`. A reader
  there wants what changed before they want a date.

Both blocks render their own `<section class="container">`. Call them bare —
wrapping one in another `.container` doubles the gutter and pushes the feed
in from the grid the rest of the page sits on.

## Working on a site

```bash
npm install
npm run dev:nyc42     # dev:<app> for any app in the table
npm run build         # every app
npm run build:nyc42   # build:<app> for one
```

Tests run against the build output, so build first:

```bash
npm run test:html && npm run test:links && npm run test:schema && npm run test:images && npm run test:network
```

Anything touching `packages/ui` is a change to every site — check them all
visually, not just the one you were working on:

```bash
node tools/visual-check.mjs <url> --widths 390,944,1280 --scheme both
```

## Shipping

```bash
node tools/llms.mjs && npm run build     # regenerate llms.txt, build
node tools/lastmod.mjs && npm run build  # sitemap dates from git, rebuild
./tools/deploy.sh nyc42                  # one site, or --all
```

`deploy.sh` exists because a push rebuilds every app the commit touched, and
a `packages/` change touches all fifteen — against a Hobby limit of 100
builds a day. Use `--force` when a build fails with no error of its own
right after "Restored build cache from previous deployment".

## Adding a vertical

1. Copy the shape of an existing app with the same feature groups —
   `nyc42` for a plain feed site, `riviera` for a district, `llc` for a
   lead-capture vertical.
2. Add `dev:<name>` / `build:<name>` to the root `package.json` and include
   the app in the root `build` script.
3. Give it an accent in `src/styles/theme.css` and a palette in
   `tools/covers.json` — a site without one cannot generate covers. The
   accent is two palettes and nothing else:

   ```css
   :root {
     --accent-light: …; --accent-ink-light: …; --accent-tint-light: …;
     --accent-dark:  …; --accent-ink-dark:  …; --accent-tint-dark:  …;
   }
   ```

   Which one applies is `tokens.css`'s job, not the site's. Don't write a
   `[data-theme]` rule here — the switch has three states, the third is easy
   to get wrong, and a test rejects a `theme.css` that reimplements it.
4. Add it to `SITES` in `tools/deploy.sh`, and to the table above.
5. Cross-link it from `apps/dst` and related verticals — unless it is a
   `.lol` experiment, which links to nothing in the network.

See `~/mind/ai/dubai/seo/guidelines.md` and the per-vertical concept docs
under `~/mind/ai/dubai/*.dst.llc.md` for content and SEO direction — this
repo is code, not the source of truth for site strategy.
