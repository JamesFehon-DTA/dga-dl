---
title: Page metadata
lead: Every page on digital.gov.au carries metadata that drives its title, description, where it sits in the site, and the structured data search engines and AI systems read. Get the metadata right and the rest of the system slots into place.
---

Metadata for a digital.gov.au page is more than the title and description shown to readers. It is also the source of the structured data (JSON-LD) embedded in every published page. Search engines, AI assistants, and downstream content tooling read that data to decide what the page is, who it is for, and how it relates to other pages on the site.

This page is for content owners. It sets out the metadata fields you need to provide, the canonical page-type taxonomy you choose from, and the relationships you express between your page and others.

For the wider record-keeping and capability frame this guidance sits inside, see [Metadata governance](/plan/metadata/governance/).

On this page
------------

- [Pick a page type](#pick-a-page-type)
- [Required fields](#required-fields)
- [Relationship fields](#relationship-fields)
- [Lifecycle fields](#lifecycle-fields)
- [Worked examples](#worked-examples)
- [What happens to your metadata](#what-happens-to-your-metadata)

Pick a page type
----------------

Every page is one of six canonical types. The type determines what shape the JSON-LD takes and how the page is weighted by downstream systems. Pick one before you start writing.

| Type | Use for | Examples |
|---|---|---|
| **Navigation** | A page whose primary job is to route readers to other pages. | Topic landing, section index. |
| **Overview** | A page that frames a program, initiative, or topic without setting binding rules. | Program overview, plan introduction, hub page. |
| **Rule** | A page that states a mandatory requirement, criterion, statement, or provision. | Policy statement, standard criterion, technical-standard statement. |
| **Guidance** | A page that explains how to do something, or how to apply a framework. | How-to, framework step, case study, training material. |
| **Evidence** | A page that reports findings, outcomes, or events. | Report chapter, evaluation finding, communique, news post. |
| **Reference** | A page whose job is to be looked up, not read end to end. | Glossary, FAQ, factsheet, checklist, template, related links. |

When you are unsure, ask which of these the reader is doing on your page: being **routed** (Navigation), **oriented** (Overview), **told they must do something** (Rule), **shown how to do something** (Guidance), **shown what was found or what happened** (Evidence), or **looking something up** (Reference).

A standard or policy with numbered criteria is itself a Rule, and each numbered criterion is also a Rule. The accompanying "how to meet" or "how to measure" siblings are Guidance. The "services covered" or "key terms" siblings are Reference. Reports are Evidence; their chapters and appendices are Evidence too. Communiques and news posts are Evidence.

Required fields
---------------

Every page must declare these four fields.

### `title`

The page name. Used as the page's `<h1>`, the listing card heading on parent indexes, the browser tab title, and the JSON-LD `name` and `headline`. Write it so it reads correctly out of context, since it is what other people see when they link to your page.

Do not repeat the title as a heading inside the body. The layout already renders it.

### `description`

A one- or two-sentence summary of the page. Used as the page lead, the listing card summary, the `<meta name="description">` for search engines, and the JSON-LD `description`. Write it so a reader scanning a list of cards can decide whether to open the page.

### `page-type`

One of `Navigation`, `Overview`, `Rule`, `Guidance`, `Evidence`, or `Reference`. Determines the JSON-LD primary entity shape. See [Pick a page type](#pick-a-page-type).

### `focus-area`

The subject area the page belongs to. Used to populate the JSON-LD `about` field and to group pages in section listings. Pull the value from your agency's controlled vocabulary; do not invent new ones. See [Metadata governance](/plan/metadata/governance/) for where this list comes from.

Relationship fields
-------------------

Use these to express how your page relates to others. Getting these right is what lets a reader, or a retrieval system, navigate from a chapter back to its report, or from a criterion back to its standard.

### `parent`

The URL of the page that owns this one. A criterion's parent is its standard. A report chapter's parent is the report. A framework step's parent is the framework landing. Drives the JSON-LD `isPartOf` link.

Set `parent` only when there is one obvious owner. Pages that sit at the top of a tree have no parent.

### `position`

For numbered children only: the integer position within the parent. A standard's seventh criterion sets `position: 7`. A framework's fourth step sets `position: 4`. Drives the JSON-LD `position` field and lets downstream tooling order siblings correctly.

### `mode`

A page-type-specific qualifier that picks the right JSON-LD sub-shape. Use one of the values below.

| Page type | `mode` values |
|---|---|
| Rule | `policy`, `standard`, `criterion`, `statement` |
| Guidance | `how-to`, `framework-step`, `case-study`, `training`, `explainer` |
| Evidence | `report`, `chapter`, `communique`, `news`, `consultation`, `evaluation` |
| Reference | `glossary`, `faq`, `factsheet`, `checklist`, `template`, `related-links`, `terms-of-use`, `appendix`, `services-covered` |

Navigation and Overview pages do not need a `mode`.

Named-project case studies are coded as Evidence with `mode: chapter`, since they sit as chapters inside a report. Use Guidance with `mode: case-study` only when the page teaches a method as one of a set of scenarios under a framework.

### `series`

The URL of the `CreativeWorkSeries` this page belongs to. Use on the top-level instalment of a recurring series, not on its sub-pages. The 2025-26 Major Digital Projects Report sets `series: /investment/assurance/MDPR/`. A paper in a research series sets `series` to that series' landing page.

Use `series` for recurring deliverables: annual reports, themed research collections, ongoing committee communiques. The series landing page is rendered as a `CreativeWorkSeries` whose `hasPart` lists every instalment.

`series` differs from `parent` in intent. A chapter's `parent` is its report (structural containment). A report's `series` is the recurring set it belongs to (membership in a series). Sub-pages of an instalment do not carry `series` themselves; they reach it through their `parent` chain.

Lifecycle fields
----------------

These describe when the page was published, when it was last changed, and what version it is. They are used in the JSON-LD and in any "last updated" badge on the rendered page.

### `datePublished`

ISO 8601 date the page was first published. Set once and do not change.

### `dateModified`

ISO 8601 date the page was last meaningfully changed. Update it when the substance of the page changes, not for typo fixes.

### `validFrom` (Rule pages)

ISO 8601 date the rule takes effect. Use on Rule pages when the date of effect differs from `datePublished`. A standard published in March that takes effect on 1 July sets `datePublished: 2026-03-15` and `validFrom: 2026-07-01`. Drives the JSON-LD `validFrom` property.

### `expires` (Rule pages, optional)

ISO 8601 date the rule lapses. Set when a rule has a known sunset date or fixed period of effect. Omit for rules that remain in force until superseded. Drives the JSON-LD `expires` property.

### `temporalCoverage` (Evidence pages)

The period the page reports on, in ISO 8601 interval notation. An annual report covering 2025-26 sets `temporalCoverage: "2025-07-01/2026-06-30"`. Distinct from `datePublished`, which is when the report was released. Drives the JSON-LD `temporalCoverage` property.

### `version`

For pages that are versioned releases of the same artefact (a policy, a standard, an annual report). Use a short string such as `2026` or `v1.0`.

### `supersedes` and `supersededBy`

When you publish a new version of a page, set `supersededBy` on the old version to the URL of the new version, and `supersedes` on the new version to the URL of the old one. This lets readers and crawlers follow the version chain.

Schema.org has no `supersedes` or `supersededBy` properties on `CreativeWork`. The publishing pipeline maps `supersedes` to `isBasedOn` on the new version, pointing to the old. The inverse link is recovered by walking the graph, so the version chain stays in standard schema.org rather than a custom predicate.

### `audience` (optional)

Defaults to `Australian Government agencies`. Override only when the page is genuinely written for a different audience.

Worked examples
---------------

### A standard criterion (Rule)

```yaml
---
title: Criterion 7
description: Build a digital service that is reliable, secure, and meets uptime expectations.
page-type: Rule
mode: criterion
focus-area: digital-experience
parent: /policy/digital-experience/digital-service-standard/
position: 7
datePublished: 2018-04-01
dateModified: 2026-03-11
---
```

### A framework step (Guidance)

```yaml
---
title: 'Step 4: Fairness'
description: How to assess fairness in an AI system before deployment.
page-type: Guidance
mode: framework-step
focus-area: ai
parent: /policy/ai/pilot-ai-assurance-framework/
position: 4
---
```

### A report chapter (Evidence)

```yaml
---
title: Project performance
description: Findings on the delivery and benefits realisation of major digital projects in 2025 to 2026.
page-type: Evidence
mode: chapter
focus-area: mdpr
parent: /investment/assurance/MDPR-2026/
datePublished: 2026-02-09
---
```

### An annual report (Evidence with series)

```yaml
---
title: Major Digital Projects Report 2025-26
description: A statement on the delivery and benefits realisation of major digital projects across the Australian Government for 2025-26.
page-type: Evidence
mode: report
focus-area: mdpr
parent: /investment/assurance/
series: /investment/assurance/MDPR/
temporalCoverage: '2025-07-01/2026-06-30'
datePublished: 2026-02-09
---
```

### A glossary (Reference)

```yaml
---
title: MDPR glossary
description: Definitions of the acronyms, abbreviations, and specialised terms used in the Major Digital Projects Report.
page-type: Reference
mode: glossary
focus-area: mdpr
parent: /investment/assurance/MDPR-2026/
---
```

What happens to your metadata
-----------------------------

The fields above are read by the publishing pipeline and turned into JSON-LD embedded in every page. Each canonical page type has its own typed primary entity:

- A Navigation page becomes a `CollectionPage` with an `ItemList` of children.
- An Overview page becomes an `AboutPage` with an `Article` describing the topic.
- A Rule page becomes a `CreativeWork` and `DigitalDocument` with a `genre` matching its `mode`.
- A Guidance page becomes a `LearningResource`, and a framework step is also a `HowToStep` inside its parent's `HowTo`.
- An Evidence page is a `Report` (the report itself), an `Article` and `Chapter` (a chapter or appendix), an `Article` with `genre: "communique"` (a communique), or a `NewsArticle` (a news post).
- A Reference page is a `DefinedTermSet` (glossary), `FAQPage` (FAQ), `ItemList` (checklist), or typed `CreativeWork` (factsheet, template, related links).
- A series landing page (a recurring set of reports or research papers) is a `CreativeWorkSeries` whose `hasPart` lists every instalment.

Relationships set by `parent` and `position` become `isPartOf`, `hasPart`, and `position` links between those entities. A page with `series` set is emitted with `isPartOf` pointing to the series. Lifecycle fields (`validFrom`, `expires`, `temporalCoverage`) are emitted on the typed primary entity when present.

Why this matters: search engines use the typed graph to choose richer search results, AI assistants use it to retrieve the right neighbouring pages, and the design library uses it to lint for drift. A chapter that points at a non-existent report, a criterion with no parent standard, or a superseded page that no successor links back to all become fixable lint errors once the metadata is the source of truth.
