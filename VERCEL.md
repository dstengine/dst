# Deploys

Each app is its own Vercel project with Root Directory `apps/<name>`.

By default Vercel skips a build when a commit doesn't touch that
directory. That default is wrong for this repo: every app is built from
`@dst/ui` and `@dst/content`, so a change to either has to rebuild all of
them. Without an override, a commit touching only `packages/` deploys
nowhere and production silently drifts behind `main` with no failed build
to show for it — which is exactly what happened on 2026-08-26.

Each `apps/*/vercel.json` therefore asks a script about itself:

    ignoreCommand: node ../../tools/vercel-ignore.mjs <name>

Exit 0 skips the build, exit 1 runs it. The script diffs this project's
last successful deployment (`VERCEL_GIT_PREVIOUS_SHA`) against the commit
being deployed and builds when any changed file is one the site's build
reads:

- anything under its own `apps/<name>/`;
- its own feed — `packages/content/src/events/<name>.ts`,
  `news/<name>.ts` and files named `<name>-…` beside them — and the feed
  index;
- its host's slice of `images.json` and `lastmod.json`, which hold every
  site and change whenever any of them does;
- any other file under `packages/`, which is shared code;
- the `tools/` modules its `astro.config` imports (`sitemap.mjs`,
  `svg-comments.mjs`);
- the lockfile, and the root `package.json` when its dependencies or
  workspaces move rather than its scripts.

`tests/`, `scripts/`, the rest of `tools/`, root Markdown and `.gitignore`
build nothing. A file the script does not recognise builds. So does
everything it cannot answer: no git history in the upload (every CLI
deploy), no earlier deployment, a base commit missing from the shallow
clone that one `git fetch` cannot bring in.

The hub `dst` also reads the feeds of the verticals its `/events/` and
`/news/` round up (`llc`, `visas`, `riviera`, `mbr`, `palmcentral`,
`eco`); `tests/vercel-ignore.test.js` holds the script's list to the
pages'. The API (`apps/api`) reads no shared package and builds only for
its own directory and the lockfile.

One rule is about time, not files. Listings are cut at build time —
`upcomingEvents` and `pastEvents` compare with the build's own date — so a
site whose last build came from a commit of an earlier UTC day builds on
the next push whatever changed, and "coming up" never runs more than a day
stale on a day anything is pushed.

It replaced `git diff --quiet HEAD^ HEAD -- . ../../packages` on
11 October 2026. That rule built every linked project on every push,
since every feed is in `packages/`. It also judged a push of several
commits by its last commit alone, so a push ending in a tests-only commit
skipped every site; and it never looked at `tools/`.

**What it cannot change**: Vercel counts a skipped build as a deployment
against the Hobby allowance of 100 a day, and a skipped build still takes
its turn in the one-at-a-time queue — for the ten-second clone instead of
the half-minute build. A push still spends one deployment per linked
project. Not creating the deployment at all is Vercel's own skipping of
unaffected projects (on for every project but fwf and musical), which works from the
workspace graph: it can only help once a site's feed and its slices of
the generated files live outside the package every app depends on, and
the files a routine commits alongside them (`tools/covers.json`) are
inside a workspace.

## Deploying one site by hand

`tools/deploy.sh llc` sends a single site out without a push. Several at
once: `tools/deploy.sh llc,mbr`. All of them: `--all`. A preview URL
instead of production: `--preview`. What would run, without running it:
`--dry-run`. The site-to-project map: `--list`.

It uploads the repo to one project, which builds it from its own Root
Directory just as a git build would — the same build, aimed at one
project instead of every project a commit touches.

Two things to keep in mind:

- **The upload is the working tree, not a commit.** A dirty tree is
  refused unless you pass `--dirty`; otherwise production ends up running
  code that exists on no branch, and the next push quietly reverts it.
- **Production runs ahead of the branch until you push.** Fine for an
  hour, a menace for a week.

Project IDs come from `vercel project inspect` on first use and are cached
in `.vercel/project-ids.env`, which is gitignored. The CLI has to be
logged in (`vercel whoami`).

## The .lol experiments

`nyc42`, `ldn`, `lnd`, `cmx` and `mxo` are five domains registered in
August 2026 to test portal concepts for a year, with a keep-or-drop
decision due in summer 2027. `sol2go` and `vien` joined them on
6 September 2026 on the same terms. Each is its own Vercel project named after
the app, on its own domain, and each is a **separate site**: no links
between them and none to dst.llc.

They once watched only their own directory. They were meant to build
nothing from `@dst/ui` or `@dst/content`; then they adopted the shared
components, the ignore rule stayed as it was, and they silently drifted
behind the components they render — the failure this file was written
about. The per-site script above reads each app's dependencies instead of
trusting a list, so a site that imports from `packages/` is rebuilt when
`packages/` changes, whoever it is.

## Projects with no git link

`tokiohotel` is a Vercel project with no repository connected, so a push
never rebuilds it. It goes out by CLI from a one-app archive of a commit —
the repo minus every other app:

    git archive HEAD $(git ls-tree HEAD --name-only | grep -vx apps) apps/<name> \
      | tar -x -C <dir>
    cd <dir> && VERCEL_ORG_ID=… VERCEL_PROJECT_ID=… vercel deploy --prod --yes

Its `ignoreCommand` is kept anyway, so linking it later changes nothing; a
CLI upload carries no `.git`, so the script always builds it.
`vien` and `sol2go` began this way and were linked on 22 September 2026,
`tick` on 11 October 2026.
`aivideo` (aivideo.zone, AI video news, 6 October 2026) was created linked:
an independent site like the .lol ones, no links to the network and none
from it. `tea` (tea.ceo, tea guides and tea times, 11 October 2026) was
created the same way.
