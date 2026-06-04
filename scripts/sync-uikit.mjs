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

import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const distDir = resolve(root, 'node_modules/@dta-au/civictheme-twig/dist')
const publicDir = resolve(root, 'public')

// [source filename in package dist, destination filename in public/]
// civictheme.storybook.js is the all-component, DOMContentLoaded-wrapped bundle
// (the non-Drupal variant); BaseLayout.astro still references civictheme.base.js.
const FILES = [
  ['civictheme.css', 'civictheme.css'],
  ['civictheme.variables.css', 'civictheme.variables.css'],
  ['civictheme.storybook.js', 'civictheme.base.js'],
]

if (!existsSync(distDir)) {
  console.warn('[sync-uikit] @dta-au/civictheme-twig not installed; keeping existing public/ assets.')
  process.exit(0)
}

mkdirSync(publicDir, { recursive: true })
for (const [from, to] of FILES) {
  const src = resolve(distDir, from)
  if (!existsSync(src)) {
    console.error(`[sync-uikit] expected ${from} in @dta-au/civictheme-twig/dist but it is missing.`)
    process.exit(1)
  }
  copyFileSync(src, resolve(publicDir, to))
  console.log(`[sync-uikit] ${from} -> public/${to}`)
}
