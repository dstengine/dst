# DST

Monorepo for the DST network: the group's own brand site plus each
Dubai-focused vertical it operates. Static Astro sites, deployed
independently, sharing one design system.

## Structure

```
apps/
  dst/     dst.llc        — the group's brand site (this network's home)
  llc/     llc.dst.llc     — company formation in Dubai
  visas/   visas.dst.llc   — Golden Visa & residency
packages/
  ui/      @dst/ui         — shared layout, components, and design tokens
```

Each app is a standalone static Astro site with its own `theme.css`
(accent color only — neutrals, type scale, and spacing come from
`@dst/ui/tokens.css` and are shared across the network). Every app deploys
to its own domain/subdomain independently.

## Working on a site

```bash
npm install
npm run dev:dst      # or dev:llc, dev:visas
npm run build         # builds every app
npm run build:dst     # or build:llc, build:visas
```

## Adding a new vertical

1. Copy the shape of an existing app under `apps/<name>/` (package.json,
   astro.config.mjs, tsconfig.json, `src/layouts/Layout.astro` wrapping
   `@dst/ui/BaseLayout.astro`, `src/styles/theme.css` with a distinct accent).
2. Add `dev:<name>` / `build:<name>` scripts to the root `package.json` and
   include the app in the root `build` script.
3. Cross-link the new site from `apps/dst` and from any related verticals.

See `~/mind/ai/dubai/seo/guidelines.md` and the per-vertical concept docs
under `~/mind/ai/dubai/*.dst.llc.md` for content/SEO direction — this repo
is code only, not the source of truth for site strategy.
