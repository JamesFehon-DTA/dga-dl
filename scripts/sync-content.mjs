// Sync all upstream-authored content from the design system's `docs-live` ref
// into src/content/: the guidance collections (patterns, templates,
// foundations), the component twins co-located under
// packages/sdc/components/**/[name].md, and the authoring-layer component docs
// under guidance/components/. docs-live is a fast-forward-only branch pointer;
// the content ships via git, not npm, so this shallow sparse-clones the repo
// rather than reading node_modules like sync-uikit.mjs.
//
// Component docs are flattened on copy (slug = basename; a basename collision
// fails the sync) and routed by frontmatter: `requires-cms-config: true` lands
// in components-advanced/, everything else in components/. README.md files are
// not content and are skipped.
//
// On fetch failure, keeps previously synced content (with a warning) so
// offline dev still works; fails only when no content exists at all.

import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// Update when the repo transfers to dta-au/design-system.
const REPO = 'https://github.com/JamesFehon-DTA/civictheme-uikit.git'
const REF = 'docs-live'
const GUIDANCE = ['patterns', 'templates', 'foundations']
const COMPONENT_DIRS = ['components', 'components-advanced']

const root = fileURLToPath(new URL('..', import.meta.url))
const contentDir = resolve(root, 'src/content')

const haveExisting = [...GUIDANCE, ...COMPONENT_DIRS].every((c) => {
  const dir = join(contentDir, c)
  return existsSync(dir) && readdirSync(dir).length > 0
})

const clone = mkdtempSync(join(tmpdir(), 'sync-content-'))
let fetched = false
try {
  execFileSync(
    'git',
    ['clone', '--quiet', '--depth', '1', '--branch', REF, '--filter=blob:none', '--sparse', REPO, clone],
    { stdio: ['ignore', 'inherit', 'inherit'] },
  )
  execFileSync(
    'git',
    ['-C', clone, 'sparse-checkout', 'set', '--no-cone', '/guidance/**', '/packages/sdc/components/**/*.md'],
    { stdio: 'inherit' },
  )
  fetched = true
} catch {
  // fall through to the fetch-failure handling below
}

if (!fetched) {
  rmSync(clone, { recursive: true, force: true })
  if (haveExisting) {
    console.warn(`[sync-content] could not fetch ${REF} from ${REPO}; keeping existing src/content copies.`)
    process.exit(0)
  }
  console.error(`[sync-content] could not fetch ${REF} from ${REPO} and src/content has no copies to fall back on.`)
  process.exit(1)
}

const sha = execFileSync('git', ['-C', clone, 'rev-parse', '--short', 'HEAD']).toString().trim()

const fail = (message) => {
  console.error(`[sync-content] ${message}`)
  rmSync(clone, { recursive: true, force: true })
  process.exit(1)
}

for (const c of [...GUIDANCE, 'components']) {
  const src = join(clone, 'guidance', c)
  if (!existsSync(src) || readdirSync(src).length === 0) {
    fail(`expected guidance/${c} at ${REF} but it is missing or empty.`)
  }
}

// Collect component docs: co-located twins (recursive) + authoring-layer docs.
const walkMd = (dir) => {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walkMd(path))
    else if (entry.name.endsWith('.md') && entry.name !== 'README.md') out.push(path)
  }
  return out
}

const twinRoot = join(clone, 'packages/sdc/components')
if (!existsSync(twinRoot)) fail(`expected packages/sdc/components at ${REF} but it is missing.`)
const componentSources = [...walkMd(twinRoot), ...walkMd(join(clone, 'guidance', 'components'))]
if (componentSources.length === 0) fail(`found no component docs at ${REF}.`)

const routed = { 'components': [], 'components-advanced': [] }
const seen = new Map()
for (const path of componentSources) {
  const slug = basename(path)
  if (seen.has(slug)) {
    fail(`slug collision: ${slug} appears at both ${seen.get(slug)} and ${path}.`)
  }
  seen.set(slug, path)
  const text = readFileSync(path, 'utf8')
  const fm = text.match(/^---\n([\s\S]*?)\n---/)
  const advanced = fm ? /^requires-cms-config:\s*true\b/m.test(fm[1]) : false
  routed[advanced ? 'components-advanced' : 'components'].push({ slug, text })
}

for (const c of GUIDANCE) {
  const dest = join(contentDir, c)
  rmSync(dest, { recursive: true, force: true })
  cpSync(join(clone, 'guidance', c), dest, { recursive: true })
  console.log(`[sync-content] guidance/${c} @ ${REF} (${sha}) -> src/content/${c} (${readdirSync(dest).length} files)`)
}

for (const c of COMPONENT_DIRS) {
  const dest = join(contentDir, c)
  rmSync(dest, { recursive: true, force: true })
  mkdirSync(dest, { recursive: true })
  for (const { slug, text } of routed[c]) writeFileSync(join(dest, slug), text)
  console.log(`[sync-content] component docs @ ${REF} (${sha}) -> src/content/${c} (${routed[c].length} files)`)
}

rmSync(clone, { recursive: true, force: true })
