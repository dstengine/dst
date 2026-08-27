# Deploys

Each app is its own Vercel project with Root Directory `apps/<name>`.

By default Vercel skips a build when a commit doesn't touch that
directory. That default is wrong for this repo: every app is built from
`@dst/ui` and `@dst/content`, so a change to either has to rebuild all of
them. Without an override, a commit touching only `packages/` deploys
nowhere and production silently drifts behind `main` with no failed build
to show for it — which is exactly what happened on 2026-08-26.

Each `apps/*/vercel.json` therefore sets:

    ignoreCommand: git rev-parse HEAD^ >/dev/null 2>&1 || exit 1;
                   git diff --quiet HEAD^ HEAD -- . ../../packages

Exit 0 skips the build, exit 1 runs it. So: build when the commit touched
this app's own directory or the shared packages; skip when it only
touched a sibling app. The `rev-parse` guard builds rather than skips
when there is no parent commit to compare against.

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
