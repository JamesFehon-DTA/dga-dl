---
layout: content
title: 'Empty state'
description: 'What to show when a filter or search query returns no matching results.'
url: '/'
---

An empty state communicates to users that a filter or search query returned no matching results. It replaces the listing in the content area.

This pattern covers the no-results state only. Loading states and error states are separate concerns and are not covered here.

## Required elements

An empty state must include all three of the following:

1. **A clear heading** — state plainly that no results were found. Do not use vague or apologetic language such as 'Hmm' or 'Nothing here'.
2. **An explanation** — tell users why there are no results. For example: 'No results match your current filters' or 'No publications found for this search term'.
3. **An actionable recovery** — give users a clear next step. At minimum, offer a 'Clear filters' or 'Clear search' action. For narrow searches, also suggest broadening the search term.

## Rules

Do not show an empty content area with no guidance. Users who receive no results and no explanation will assume the site is broken or the content is missing.

Do not blame the user. Write 'No results match your current filters' not 'You have not selected any valid filters'.

Position the empty state where the listing would normally appear. Do not move it to the top of the page or outside the main content area.

## When multiple filters are active

If the empty state is caused by a combination of active filters, provide both 'Clear all filters' and the option to remove individual filters. Let users experiment with removing one constraint at a time without losing all their filter selections.

## Related components

- [Table]({% link _components/table.md %}) — the table component requires an empty state when filters return no rows.
- [Filter sidebar]({% link _components/filter-sidebar.md %}) — the filter component most likely to produce an empty state.

## Related patterns

- [Search filters]({% link _patterns/search-filters.md %}) — the broader filtering pattern that this empty state supports.
- [Pagination]({% link _patterns/pagination.md %}) — appears alongside pagination; when filters reduce results to zero, pagination is replaced by the empty state.
