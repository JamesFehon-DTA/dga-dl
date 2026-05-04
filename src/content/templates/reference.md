---
layout: content
title: 'Reference'
description: 'Reference content – glossaries, FAQs, and checklists – is published as a sub-page of the page it supports, not as a standalone template.'
url: '/'
---

Type
: [Reference](/templates/) – glossaries, FAQs, and checklists. Always a sub-page of the template it serves.

Reference content – glossaries, FAQs, and checklists – is the surface readers use to look something up. It is not published as its own top-level template on digital.gov.au. Each reference type is a sub-page variant of the parent it serves.

This page is a stub. The substantive guidance for each reference type lives on the parent template that owns it.

## Where to find each reference type

**Glossary** – sub-page of a [report](/templates/report/#sub-page-variants), [guide](/templates/guide/#sub-page-variants), or section landing page. The glossary is anchored to the document or section that introduces the terms; isolating it on a generic template would strip that context.

**FAQ** – sub-page of a [guide](/templates/guide/#sub-page-variants), [program](/templates/program/), or [resource](/templates/resource/#sub-page-variants). The FAQ inherits the parent's audience and scope; lifting it onto a generic template would mean restating that context for every question.

**Checklist** – published as a [resource](/templates/resource/) page. A checklist is a discrete, reusable item users return to repeatedly – the resource template fits that pattern directly. Where a checklist supports a specific [rule](/templates/rule/) or guide, link from the parent rather than nesting under it.

## Why there is no standalone reference template

Reference content fails when it is detached from the thing it references. A glossary of investment terms attached to nothing in particular is harder to use than the same glossary published under the report that introduced the terms – readers arriving from a search result land in context, and the [DefinedTermSet](https://schema.org/DefinedTermSet) JSON-LD shape can point back to the parent document.

The same applies to FAQs. A list of questions about benefits management belongs under the benefits management policy, not in a generic FAQ section, because the audience and scope of the answers depend on the parent.

## Cross-cutting rules for reference content

These apply regardless of which parent the reference sits under.

**Glossaries stay open.** Every term and definition must be visible at once. Use semantic `<dl>`/`<dt>`/`<dd>` markup or a structured list. Do not hide each term behind an [accordion](/components/accordion/) – the JSON-LD `DefinedTermSet` shape is lost if the term and its definition are not co-located in the rendered DOM, and skim-reading is broken.

**FAQs are the canonical right place for accordion.** Each question is independently a lookup key, and readers usually want one answer. The accordion is correct here – with one exception: if 80% of readers need the same answer, lift it into a [callout](/components/callout/) above the accordion. The accordion is for the long tail.

**Checklists must be readable end-to-end and printable.** Use a real ordered or unordered list. Do not collapse items into accordions. If the checklist needs to fork by audience – for example, 'for new services / for existing services / for assessors' – publish each fork as its own resource page and cross-link them, rather than using tabs.

## Related templates

- [Report](/templates/report/) – glossaries and appendices live here for long-form publications.
- [Guide](/templates/guide/) – FAQs and inline glossaries attach to the guides they support.
- [Resource](/templates/resource/) – the home for checklists and downloadable templates.
- [Rule](/templates/rule/) – cross-link from a rule to the checklist that helps assess compliance with it.
