// Sync compiled CivicTheme assets from the pinned @dta-au/civictheme-twig
// package into public/, so the docs site renders the version it pins.
//
// The Twig package is the Drupal-agnostic derivative: it ships the monolithic
// civictheme.css that a non-Drupal Astro site needs (the SDC/uikit package only
// emits per-component CSS for Drupal aggregation).
//
// No-ops (with a warning) when the package is not installed, so builds stay
// green before the first @dta-au/civictheme-twig release is published and
// before the receiver workflow bootstraps the dependency.

import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const distDir = resolve(root, 'node_modules/@dta-au/civictheme-twig/dist')
const publicDir = resolve(root, 'public')

// BaseLayout.astro loads civictheme.base.js as a *classic* <script> (no
// type="module"). The storybook bundle now concatenates an ESM-authored
// chart-data chunk verbatim, so it carries top-level `export` statements. A
// classic script that hits `export` throws "SyntaxError: Unexpected token
// 'export'" at parse time, which aborts the WHOLE bundle before any behaviour
// attaches — the mobile navigation flyout, back-to-top, collapsibles, etc. all
// go dead. Strip the leading `export ` keyword so the bundle parses and runs as
// a classic script; those declarations are unused here and just become plain
// locals inside their DOMContentLoaded closure.
const stripEsmExports = (code) => code.replace(/^export\s+/gm, '')

// [source filename in package dist, destination filename in public/, transform]
// civictheme.storybook.js is the all-component, DOMContentLoaded-wrapped bundle
// (the non-Drupal variant); BaseLayout.astro still references civictheme.base.js.
const FILES = [
  ['civictheme.css', 'civictheme.css'],
  ['civictheme.variables.css', 'civictheme.variables.css'],
  ['civictheme.storybook.js', 'civictheme.base.js', stripEsmExports],
]

if (!existsSync(distDir)) {
  console.warn('[sync-uikit] @dta-au/civictheme-twig not installed; keeping existing public/ assets.')
  process.exit(0)
}

mkdirSync(publicDir, { recursive: true })
for (const [from, to, transform] of FILES) {
  const src = resolve(distDir, from)
  if (!existsSync(src)) {
    console.error(`[sync-uikit] expected ${from} in @dta-au/civictheme-twig/dist but it is missing.`)
    process.exit(1)
  }
  const dest = resolve(publicDir, to)
  if (transform) {
    const input = readFileSync(src, 'utf8')
    const output = transform(input)
    writeFileSync(dest, output)
    const stripped = (input.match(/^export\s+/gm) || []).length
    console.log(`[sync-uikit] ${from} -> public/${to} (stripped ${stripped} top-level export keyword(s))`)
  } else {
    copyFileSync(src, dest)
    console.log(`[sync-uikit] ${from} -> public/${to}`)
  }
}
