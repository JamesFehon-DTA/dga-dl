# Software bill of materials

Every Pages deploy publishes lockfile-derived CycloneDX SBOMs and every
dependency change is gated by a vulnerability scan. This mirrors the pattern
in civictheme-uikit (docs/sbom.md there); dga-dl has no vendored assets or
native binaries, so plain `npm sbom` covers everything and no annex is needed.

## What is generated

| File | Scope |
| --- | --- |
| `dga-dl-dev.cdx.json` | Full dev graph – everything `npm ci` installs |
| `dga-dl-prod.cdx.json` | Production dependencies only – approximates the deployed static site |

Both derive from `package-lock.json`, so `@dta-au/civictheme-twig` appears as
a component with its exact pinned version. That is the point: cross-repo
vulnerability queries can match a CVE against both this SBOM and the uikit
repo's SBOMs.

## Regenerate locally

```bash
npm sbom --sbom-format cyclonedx --package-lock-only > dga-dl-dev.cdx.json
npm sbom --sbom-format cyclonedx --package-lock-only --omit dev > dga-dl-prod.cdx.json
```

Output is never committed.

## How scanning gates CI and deploys

`.github/workflows/sbom.yml` runs on any PR touching the lockfile, manifests,
suppressions or itself, and as a `workflow_call` job inside every `astro.yml`
deploy run – the SBOMs upload as artifacts of the deploy. The scan does not
gate the deploy: a new CVE fails the run (visible signal) without blocking
the site.

Grype scans the dev SBOM and fails on high-or-critical findings that have a
fix available. Syft generates an independent cross-check SBOM in the same
run. Fix-less advisories are intentionally outside the gate (`only-fixed`).

Deploy runs pass `ref: main` so a repository_dispatch pin bump, committed
during the build job, is included in the SBOM for that same run.

The anchore actions are pinned by commit SHA, not tag. Scanners run with CI
credentials and are themselves supply-chain targets; when bumping, resolve
the new tag to a commit and update the `# vX.Y.Z` comment.

## Adding a suppression

Add an entry to `.grype.yaml` with a comment stating why the finding is a
false positive or accepted risk, who assessed it, and a revisit date:

```yaml
ignore:
  # False positive: CVE applies to the server component, we ship client only.
  # Assessed jfehon 2026-07-06, revisit 2026-10-01.
  - vulnerability: CVE-2026-XXXXX
    package:
      name: example-package
```
