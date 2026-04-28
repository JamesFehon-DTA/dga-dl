---
layout: content
title: 'In-page navigation'
description: 'Helping users orient within a page or section without returning to the top-level navigation.'
url: '/'
---

In-page navigation helps users understand the structure of a page or section and move directly to the content they need. It is distinct from site navigation (the primary menu) and section navigation (Sub-nav): those help users move between pages; in-page navigation helps users move within a single page.

One component implements in-page navigation on digital.gov.au:

- **[Table of contents](/components/table-of-contents/)** — an anchor-linked list generated from the H2 headings on the current page

## Choosing the right approach

Use this table to decide which approach is appropriate.

| Situation | Use |
|---|---|
| Long page with 4 or more H2 sections, single-page content | Table of contents |
| Page belongs to a multi-page section users navigate between | Sub-nav |
| Short page with fewer than 4 H2s | Neither |
| Page is part of a step-by-step form or focus-mode flow | Neither |
| Section has a persistent sidebar already in use | Sub-nav only |

If a page is part of a section *and* has 4 or more H2s, Sub-nav takes priority. Adding a Table of contents inside a Sub-nav layout creates two competing navigation signals on the same page.

## Table of contents

Use a Table of contents when:

- the page has four or more H2 headings
- the page is a long or medium guide, report body section, or policy document
- users benefit from scanning the structure before deciding where to read

Do not use a Table of contents when:

- the page has fewer than four H2 headings — a short page does not need navigation
- the page already uses Sub-nav — do not show both
- the page is a section landing page — landing pages use card grids for navigation, not anchor links
- the page is a step-by-step wizard or focus-mode form — sequential flows should not offer navigation shortcuts

Position the Table of contents directly below the page introduction, before the first H2. Authors enable it per page in the CMS; it generates automatically from H2 headings and does not require manual maintenance.

## Sub-nav

Use Sub-nav when:

- the current page belongs to a clearly bounded section with multiple sibling pages
- users are likely to move between pages in the section while reading
- the section has a consistent, stable set of pages that can be listed without confusion

Do not use Sub-nav when:

- the section contains only one or two pages — the overhead outweighs the benefit
- the section changes frequently — an unstable list of links erodes trust
- the page is standalone and does not belong to a defined section

Sub-nav appears as a persistent sidebar alongside the main content. It shows all pages in the section, with the current page indicated. It is configured at the section level, not per page.

## Anchor links in body text

For short pages or pages where only one or two sections benefit from direct linking, inline anchor links within body text are sufficient. This is not a component — it is standard HTML linking practice. Use it when:

- a related page or resource needs to point to a specific section of a long guide
- a single section is frequently referenced externally and benefits from a stable URL

Do not substitute inline anchor links for a Table of contents on pages that warrant structured navigation. Scattered anchor links in body text do not give users an overview of the page structure.

## Related components

- [Table of contents](/components/table-of-contents/) — in-page anchor navigation generated from H2 headings
- [Sub-nav](/components/sub-nav/) — section-level navigation between sibling pages
- [Filter sidebar](/components/filter-sidebar/) — filtering for search and catalogue pages; not a navigation component
