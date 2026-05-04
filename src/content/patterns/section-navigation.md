---
layout: content
title: 'Section navigation'
description: 'Navigating between pages within a section using a sub-nav strip or side navigation depending on depth and size.'
url: '/'
---

Section navigation helps users move between the pages in a bounded content section – such as a program, a policy area, or a research series. Two components are available: the Sub-nav strip (for flat or shallow sections) and Side Navigation (for deeper or larger sections).

## Two-component model

**Sub-nav strip (default)** – a compact horizontal list of section links displayed above the page content. Use for sections that are flat and shallow. The sub-nav strip is not yet implemented in CivicTheme; this is an active requirement.

**Side Navigation** – a persistent vertical list in a left-hand sidebar. Use when the section has deeper hierarchy or more pages than a strip can display clearly. Side Navigation is implemented in CivicTheme but currently applied inconsistently across the site.

## When to use each

Use the **sub-nav strip** when:

- the section contains five or fewer pages
- the section is flat – all navigation links are at the same level (L1 or L2)
- no page in the section has sub-pages that also need navigation

Use **Side Navigation** when:

- the section contains more than five sibling pages
- the section has three or more levels of hierarchy (L3+)
- users need to see and navigate sub-pages while on any page within the section

## Coexistence rule

A sub-nav strip may appear at a section entry point to orient users at the top level. As users navigate deeper into the section, Side Navigation takes over.

Do not show both a sub-nav strip and Side Navigation on the same page – this creates competing navigation signals.

## Examples

The following sections are candidates for **Side Navigation** because of deep hierarchies or large numbers of sibling pages:

- Digital Experience Toolkit
- Research Series
- Investment policy sections

Most other sections on digital.gov.au are candidates for the **sub-nav strip** because they are flat and contain fewer pages.

## Consistency rules for fixing patchy Side Navigation

Side Navigation is implemented in CivicTheme but not applied consistently across the site. When auditing or fixing patchy usage, apply these rules:

- every page within a section that has Side Navigation must show the same Side Navigation – do not hide it on some pages within the section
- the current page must be clearly indicated as active in the Side Navigation
- do not apply Side Navigation to standalone pages that do not belong to a defined section

## Related components

- [Sub-nav](/components/sub-nav/) – section navigation component for moving between pages within a section.

## Related patterns

- [In-page navigation](/patterns/in-page-navigation/) – for navigating within a single page, not between pages.
- [Chapter navigation](/patterns/chapter-navigation/) – for sequential multi-page flows where reading order carries meaning.
