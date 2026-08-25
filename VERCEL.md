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
