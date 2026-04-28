---
layout: content
title: 'Pagination'
description: 'Breaking a large listing into pages when users need to navigate a defined result set or return to a specific position.'
url: '/'
---

Use pagination to split a large dataset into discrete, numbered pages. This gives users a clear sense of how large the dataset is and allows them to return to a specific position after navigating away.

## When to paginate

Paginate when:

- the dataset contains more than 25 items
- users are likely to need to return to a specific position — for example, after following a result link and pressing back
- the total number of results is known and finite

## When not to paginate

Do not paginate when:

- the dataset is 25 items or fewer — show all results on one page
- a filter or search query returns fewer than two pages of results — show all results rather than a single paginated page
- the content is a continuous feed where item position is not meaningful — consider a 'Load more' button instead

## Load more vs pagination

Use a **Load more** button instead of pagination when users are browsing and do not need to bookmark or share a specific position in the list. Load more appends items to the existing list rather than replacing it.

Use **infinite scroll** only when there is a clear user experience benefit and the following conditions are met: the content is a feed or stream, the footer does not need to be reachable by scrolling, and the page does not require screen reader accessibility to the full result set. Infinite scroll creates serious accessibility problems and makes it impossible to link to a position in a list. Avoid it for content users need to compare across pages or return to.

## Page size

- Use **10 items per page** for content-heavy listings where each item has a long title, description, or summary.
- Use **25 items per page** for compact listings such as tables of names, dates, or short titles.

Do not use a page size smaller than 10 or larger than 25 without a user research justification.

## Placement

Place pagination below the listing, above the footer. Do not place it above the listing, in a sidebar, or in the middle of a page.

## Related components

- [Table](/components/table/) — filterable and sortable table; use pagination alongside when dataset exceeds 25 rows.
- [Manual list](/components/manual-list/) — manually curated content list.

## Related patterns

- [Search filters](/patterns/search-filters/) — combine with pagination on filtered result pages.
- [Empty state](/patterns/empty-state/) — what to show when filters reduce results to zero.
