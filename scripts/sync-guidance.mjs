// Sync guidance content (patterns, templates, foundations) from the
// civictheme-uikit `docs-live` ref into src/content/, so the docs site
// builds against the authoritative copies. docs-live is a fast-forward-only
// branch pointer; the content ships via git, not npm, so this shallow
// sparse-clones the repo rather than reading node_modules like sync-uikit.mjs.
//
// On fetch failure, keeps previously synced content (with a warning) so
// offline dev still works; fails only when no content exists at all.

import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdtempSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// Update when the repo transfers to dta-au/design-system.
const REPO = 'https://github.com/JamesFehon-DTA/civictheme-uikit.git'
const REF = 'docs-live'
const COLLECTIONS = ['patterns', 'templates', 'foundations']

const root = fileURLToPath(new URL('..', import.meta.url))
const contentDir = resolve(root, 'src/content')

const haveExisting = COLLECTIONS.every((c) => {
  const dir = join(contentDir, c)
  return existsSync(dir) && readdirSync(dir).length > 0
})

const clone = mkdtempSync(join(tmpdir(), 'sync-guidance-'))
let fetched = false
try {
  execFileSync(
    'git',
    ['clone', '--quiet', '--depth', '1', '--branch', REF, '--filter=blob:none', '--sparse', REPO, clone],
    { stdio: ['ignore', 'inherit', 'inherit'] },
  )
  execFileSync('git', ['-C', clone, 'sparse-checkout', 'set', 'guidance'], { stdio: 'inherit' })
  fetched = true
} catch {
  // fall through to the fetch-failure handling below
}

if (!fetched) {
  rmSync(clone, { recursive: true, force: true })
  if (haveExisting) {
    console.warn(`[sync-guidance] could not fetch ${REF} from ${REPO}; keeping existing src/content copies.`)
    process.exit(0)
  }
  console.error(`[sync-guidance] could not fetch ${REF} from ${REPO} and src/content has no copies to fall back on.`)
  process.exit(1)
}

const sha = execFileSync('git', ['-C', clone, 'rev-parse', '--short', 'HEAD']).toString().trim()

for (const c of COLLECTIONS) {
  const src = join(clone, 'guidance', c)
  if (!existsSync(src) || readdirSync(src).length === 0) {
    console.error(`[sync-guidance] expected guidance/${c} at ${REF} but it is missing or empty.`)
    rmSync(clone, { recursive: true, force: true })
    process.exit(1)
  }
}

for (const c of COLLECTIONS) {
  const dest = join(contentDir, c)
  rmSync(dest, { recursive: true, force: true })
  cpSync(join(clone, 'guidance', c), dest, { recursive: true })
  console.log(`[sync-guidance] guidance/${c} @ ${REF} (${sha}) -> src/content/${c} (${readdirSync(dest).length} files)`)
}

rmSync(clone, { recursive: true, force: true })
