---
layout: content
title: 'Filter sidebar'
description: 'A persistent sidebar filter panel for search result and catalogue pages.'
component-type: Navigation
url: '/'
demo: false
---

Use a filter sidebar on search result and catalogue pages where users need to narrow a large set of results by multiple criteria. Filters are always visible in the sidebar. No trigger button is needed. Because they are always visible, applied filter tags are not required alongside them.

The correct HTML order on a page is: hero banner → filter sidebar (left) → card listing or table (right).

## When to use

- the page presents a large collection of items that users need to narrow by multiple attributes
- filters are relevant to most users and benefit from being always visible
- the layout supports a two-column arrangement with the sidebar on the left

## When not to use

- when there are only one or two filters – inline filters above the listing are sufficient
- on pages where a persistent sidebar would dominate the layout on small viewports – consider the search filters pattern with a trigger button instead
- for in-page or section navigation – use [Sub-nav]({% link _components/sub-nav.md %}) instead

## Related components

- [Table]({% link _components/table.md %}) – use alongside a filter sidebar when results are best presented in tabular form.
- [Sub-nav]({% link _components/sub-nav.md %}) – use for within-section navigation, not filtering.

## Related patterns

- Search filters – use this pattern when filters should be toggled visible rather than always shown.
