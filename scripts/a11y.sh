#!/usr/bin/env bash
# WCAG 2 AA check via pa11y-ci against the locally built site.
# On success, touches .claude/.a11y-passed so the Stop hook knows the check is current.

set -euo pipefail

PORT="${A11Y_PORT:-4322}"
PREVIEW_PID=""

cleanup() {
  if [ -n "$PREVIEW_PID" ] && kill -0 "$PREVIEW_PID" 2>/dev/null; then
    kill "$PREVIEW_PID" 2>/dev/null || true
    wait "$PREVIEW_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT

echo "→ Building site"
npm run build

echo "→ Starting preview server on :$PORT"
npx astro preview --port "$PORT" --host 127.0.0.1 >/dev/null 2>&1 &
PREVIEW_PID=$!

for _ in $(seq 1 60); do
  if curl -sf "http://localhost:$PORT/" -o /dev/null; then
    break
  fi
  sleep 0.5
done

if ! curl -sf "http://localhost:$PORT/" -o /dev/null; then
  echo "Preview server did not start on :$PORT" >&2
  exit 1
fi

echo "→ Running pa11y-ci against WCAG 2 AA"
npx pa11y-ci

mkdir -p .claude
touch .claude/.a11y-passed
echo "✓ WCAG check passed; marker updated at .claude/.a11y-passed"
