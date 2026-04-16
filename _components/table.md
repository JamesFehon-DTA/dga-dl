---
layout: content
title: 'Table'
description: 'A structured display of data in rows and columns.'
component-type: Data
url: '/'
demo: false
---

Use tables to present data that users need to scan, compare, or look up. Tables work well when information has a clear row-and-column structure and relationships between cells matter.

## When to use

- data has a meaningful row-and-column structure
- users need to compare values across rows or columns
- the data cannot be adequately expressed as a list or prose

## When not to use

- for layout purposes – tables are for data, not for arranging page elements
- when the data has only one column – a list is more appropriate
- when all rows contain the same value in most columns – reconsider the data structure

## Variants

### Standard

A basic table with column headers, an optional caption, and optional zebra striping for readability.

### Sortable

Column headers become interactive sort controls. Clicking a header sorts that column ascending; clicking again sorts descending. Only one column sorts at a time. Sort direction is indicated with an icon.

### Filterable

Connects to the search-filters pattern. Three filter configurations apply depending on the number of filters:

- **Small (1–2 filters):** filters appear inline above the table; no applied filter tags are needed.
- **Medium (3–6 filters):** primary filters appear inline; remaining filters appear in an accordion triggered by 'Show filters'; applied filters are shown as dismissible tags.
- **Large (6+ filters):** primary filters appear inline; remaining filters appear in a drawer triggered by 'Show filters'; the drawer has Apply, Clear, Close, and Cancel actions; applied filters are shown as dismissible tags.

### Wide tables

When table content overflows its container, a custom horizontal scrollbar renders at the bottom of the table. The scrollbar sticks to the bottom of the viewport when the bottom of the table is off-screen, so users can scroll horizontally from any row.

### Spanning cells

Cells can span multiple columns (`colSpan`) or rows (`rowSpan`) to represent data with genuinely hierarchical relationships. Use spanning cells only when the data relationship is inherently multi-dimensional. Do not use them to create visual layout effects.

## Related components

- [Filter sidebar]({% link _components/filter-sidebar.md %}) – use when filters should be persistently visible in a sidebar alongside the table.
- [Summary list]({% link _components/summary-list.md %}) – use for structured name–value pairs rather than rows-and-columns data.

## Related patterns

- Search filters – use to connect filter controls to a filterable table.
- Pagination – use to limit the number of rows displayed at once in large datasets.
