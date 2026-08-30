#!/usr/bin/env bash
#
# Deploy one site, or a few, without pushing.
#
#   tools/deploy.sh llc            one site to production
#   tools/deploy.sh llc,mbr        two
#   tools/deploy.sh --all          every site
#   tools/deploy.sh --preview llc  a preview URL instead of production
#   tools/deploy.sh --dry-run llc  print what would run
#   tools/deploy.sh --list         the site -> project map
#
# Why this exists: a push rebuilds every app whose directory or ../../packages
# the commit touched, and a packages change touches all of them. Seven or eight
# builds a push, against a Hobby limit of 100 a day. When one site needs to go
# out now, this sends that one.
#
# What it actually does: uploads the repo to one project, which builds it from
# its own Root Directory (apps/<name>, set in the dashboard) exactly as a git
# build would. The upload is the WORKING TREE, not a commit — so a dirty tree
# is refused unless you say --dirty, or production ends up with code that
# exists on no branch and the next push silently reverts it.
#
# Deploys made here still count against the same build allowance. They also
# leave production ahead of the branch until you push, which is fine for an
# hour and a menace for a week.
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CACHE="$REPO/.vercel/project-ids.env"   # .vercel/ is gitignored

# Site -> Vercel project. The hub is plain `dst`; the *.dst.llc verticals
# carry the prefix; a site on its own domain carries its own name.
SITES=(dst llc visas riviera mbr palmcentral eco api fwf musical nyc42 ldn lnd cmx mxo)
project_for() {
  case "$1" in
    dst) echo "dst" ;;
    # Sites on their own domains rather than *.dst.llc verticals, so their
    # projects carry their own names instead of the group prefix. The five
    # .lol ones are year-long experiments and are independent of the group
    # and of each other — shared code, never a shared footprint.
    fwf|musical|nyc42|ldn|lnd|cmx|mxo) echo "$1" ;;
    *)   echo "dst-$1" ;;
  esac
}

die() { echo "deploy: $*" >&2; exit 1; }

usage() {
  sed -n '3,10p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'
  exit "${1:-0}"
}

prod=1
dry=0
dirty=0
targets=()

while [ $# -gt 0 ]; do
  case "$1" in
    --all)     targets=("${SITES[@]}") ;;
    --preview) prod=0 ;;
    --dry-run) dry=1 ;;
    --dirty)   dirty=1 ;;
    --list)
      for site in "${SITES[@]}"; do printf '  %-12s %s\n' "$site" "$(project_for "$site")"; done
      exit 0 ;;
    -h|--help) usage ;;
    -*)        die "unknown option $1 (--help for the list)" ;;
    *)         IFS=, read -r -a named <<< "$1"; targets+=("${named[@]}") ;;
  esac
  shift
done

[ ${#targets[@]} -gt 0 ] || usage 1

for site in "${targets[@]}"; do
  # shellcheck disable=SC2076
  [[ " ${SITES[*]} " == *" $site "* ]] || die "no site called \"$site\" (--list for the ones there are)"
  [ -d "$REPO/apps/$site" ] || die "apps/$site is not in the repo"
done

if [ "$dirty" = 0 ] && [ -n "$(git -C "$REPO" status --porcelain)" ]; then
  die "the tree is dirty. Commit first, or --dirty to ship it anyway."
fi

# Project IDs, resolved once and cached: `vercel project inspect` is a network
# round trip per site and the IDs never change.
[ -f "$CACHE" ] && . "$CACHE"
mkdir -p "$(dirname "$CACHE")"

id_for() {
  local project="$1" var id
  var="ID_${project//-/_}"
  id="${!var:-}"
  if [ -z "$id" ]; then
    # \b in a pattern is a backspace to the awk that ships with macOS, not a
    # word boundary — hence the character classes.
    id="$(vercel project inspect "$project" 2>&1 | awk '/^[[:space:]]*ID[[:space:]]/ { print $2; exit }')"
    [[ "$id" == prj_* ]] || die "could not resolve a project ID for $project — is the CLI logged in?"
    echo "$var=$id" >> "$CACHE"
    export "$var=$id"
  fi
  echo "$id"
}

ORG_ID="$(node -e 'process.stdout.write(require("'"$REPO"'/.vercel/project.json").orgId)' 2>/dev/null || true)"
[ -n "$ORG_ID" ] || die ".vercel/project.json has no orgId — run \`vercel link\` in the repo root once"

for site in "${targets[@]}"; do
  project="$(project_for "$site")"
  id="$(id_for "$project")"
  set -- vercel deploy --yes --cwd "$REPO"
  [ "$prod" = 1 ] && set -- "$@" --prod

  if [ "$dry" = 1 ]; then
    echo "VERCEL_ORG_ID=$ORG_ID VERCEL_PROJECT_ID=$id $*"
    continue
  fi

  [ "$prod" = 1 ] && where="production" || where="preview"
  echo "==> $site -> $project ($where)"
  VERCEL_ORG_ID="$ORG_ID" VERCEL_PROJECT_ID="$id" "$@"
done
