---
layout: content
title: 'Rule'
description: 'A rule page sets out a normative requirement that agencies must apply – a standard, criterion, or numbered statement.'
url: '/'
---

Type
: [Rule](/templates/) – a normative requirement that agencies must apply.

A rule page sets out a normative requirement that agencies must apply. Standards, criteria, and numbered statements are all rule pages. The reader's job is to find the requirement, understand who it applies to, and know what to do next. The page's job is to make the normative text unmissable, then layer the explanation around it.

Rule pages are evidence-bearing in a way most other content is not – they are the surface that gets quoted in compliance reviews, audits, and tabled responses. Every editorial decision on a rule page should protect the integrity of that quotation.

## When to use

Use a rule page when:

- the content states an obligation, requirement, or standard that agencies must comply with
- the requirement has its own identity that will be referenced from other pages – for example, 'Criterion 7' or 'Statement 12'
- the rule is part of a set of sibling rules that together form a standard or framework

Do not use a rule page for the explanatory or procedural content that surrounds a rule. That content belongs on a [guide](/templates/guide/) page. Linking the two is essential, but they are different page types.

## Variants

### Standard parent

The umbrella page for a set of rules – for example, the page that sits above 41 statements or 10 criteria.

A standard parent does not restate every rule. Its job is to set scope, audience, and effective date, then route readers into the rule set.

| Section | Component | Purpose |
|---|---|---|
| Page header | [Banner](/components/banner/) with a status tag list ('Mandatory', version, date) | Audience signal travels with screenshots and search results |
| Section navigation | [Sub-nav](/components/sub-nav/) grouped by sub-structure (lifecycle stage, criterion number) | A flat list of 40+ items is unusable – group into the standard's own substructure |
| Overview | Short rich text – what the standard requires, who it applies to | Keep it short; the standard's text is the rule pages, not this page |
| Purpose statement | [Callout](/components/callout/) | The single quotable sentence of the standard – the 'why' |
| Rule index | Card grid grouped under headings | Surface every rule with a number, title, and one-line description; group large sets into sub-headings |
| Downloadable version | [Attachment](/components/attachment/) | A canonical PDF if one exists |

### Numbered rule (criterion or statement)

A page that holds one criterion or one statement from a standard.

| Section | Component | Purpose |
|---|---|---|
| Page header | [Banner](/components/banner/) – number first, then topic; status tag | The number is part of the title; everything cross-references by number |
| Section navigation | [Sub-nav](/components/sub-nav/) showing siblings, with active state on the current rule | Readers must see how far through the rule set they are |
| Normative sentence | [Callout](/components/callout/) – verbatim | The single most visually prominent element on the page |
| Rationale | Rich text body | Plain-English explanation: why the rule exists, how it is typically met |
| Cross-axis links | Card grid | Sibling guidance pages filtered to this rule – 'how to meet', 'how to measure', 'transitioning' |
| Sequential navigation | [Pagination](/patterns/pagination/) | Numbered rules are sequential – pagination matches that |

## Structure rules

**One callout per rule page.** The verbatim normative sentence is the only callout. A second callout for a tip or related rule competes with the rule itself and dilutes both. See [callout discipline](/patterns/callout-discipline/).

**Never collapse rules into accordions.** Each rule has its own URL, its own deep-link target, and is referenced individually from other pages. Hiding rules inside accordion panels destroys those references and makes the rule set unsearchable. See [accordion](/components/accordion/).

**Do not organise the rule set as a linear chapter sequence.** Numbered rules use [pagination](/patterns/pagination/) for sibling traversal, but the rule index on the parent must be a card grid – readers usually need one specific rule, not the whole set in order. The card grid is a page-layout choice; it does not imply that the rules themselves are unordered.

**Make the cross-axis visible.** Every rule has at least two axes – its number, and its place in some other taxonomy (lifecycle stage, policy domain, audience). Surface the second axis as a tag on the banner and as a card in the body, so readers can pivot from rule to surrounding context in one click.

## Writing conventions

Follow the [Australian Government Style Manual](https://www.stylemanual.gov.au) throughout. Key conventions for rule pages:

- The rule statement in the callout must be verbatim – do not paraphrase, abbreviate, or substitute synonyms. The callout text is the source of truth for compliance reviews.
- Use 'must' for mandatory requirements and 'should' for recommended practice. Do not soften 'must' to 'should' in the body copy if the rule itself uses 'must'.
- State the audience explicitly. 'Non-corporate Commonwealth entities' is not the same as 'agencies'.
- Avoid editorialising the rationale. Explain why the rule exists; do not argue for or against it.

## Cross-linking with guidance

A rule page on its own tells the reader what to do but not how. The how lives on a [guide](/templates/guide/) page, often as a set of three siblings: 'how to meet the standard', 'how to measure success', and 'transitioning to the standard'.

On the rule page, surface those siblings with a card grid filtered or anchored to the specific rule. A reader on Criterion 7 needs the seven-shaped slice of the guidance, not the full guide.

## Examples

- [Australian Government Architecture (AGA)](https://www.digital.gov.au/policy/aga)
- [Digital Service Standard](https://www.digital.gov.au/policy/digital-experience/digital-service-standard)
- [AI Technical Standard](https://www.digital.gov.au/policy/ai/ai-technical-standard)

## Related templates

- [Guide](/templates/guide/) – for the procedural and interpretive content that surrounds a rule.
- [Section landing page](/templates/section-landing-page/) – for the page that routes readers into a rule set when the standard parent is not the entry point.
- [Reference](/templates/reference/) – for the glossary, FAQ, or checklist that supports a rule.
