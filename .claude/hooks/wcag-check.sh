#!/usr/bin/env bash
# Stop hook: blocks completion if src/ content/layout files (.astro/.md/.mdx/.html)
# have changed since the last successful pa11y run.
# Marker file (.claude/.a11y-passed) is written by `npm run a11y` on success.

set -u

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null)" || exit 0
[ -z "$REPO_ROOT" ] && exit 0
cd "$REPO_ROOT" || exit 0

MARKER=".claude/.a11y-passed"

CHANGED=$(
  {
    git diff --name-only HEAD 2>/dev/null
    git ls-files --others --exclude-standard 2>/dev/null
  } | grep -E '^src/.*\.(astro|md|mdx|html)$' | sort -u
)

if [ -z "$CHANGED" ]; then
  exit 0
fi

block() {
  local reason="$1"
  {
    echo "WCAG check required ($reason)."
    echo
    echo "Files changed in src/ since last pa11y run:"
    echo "$CHANGED" | sed 's/^/  - /'
    echo
    echo "Run: npm run a11y"
    echo "This builds dist/, serves it locally, and tests against WCAG 2 AA."
    echo "Fix any reported violations before completing this turn."
    echo "On success the marker at $MARKER updates and this hook will pass."
  } >&2
  exit 2
}

if [ ! -f "$MARKER" ]; then
  block "no successful pa11y run recorded"
fi

while IFS= read -r f; do
  [ -z "$f" ] && continue
  if [ -e "$f" ] && [ "$f" -nt "$MARKER" ]; then
    block "$f was edited after the last pa11y run"
  fi
done <<< "$CHANGED"

exit 0
