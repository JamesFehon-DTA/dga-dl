---
layout: content
title: 'Search filters'
description: 'Helping users narrow a large dataset using inline filters above the listing or a persistent filter sidebar.'
url: '/'
---

Search filters help users find content by narrowing a dataset to items that match selected criteria. Applied filters are displayed as tags so users can see which filters are active and remove them individually.

Display filtered results in a [Table](/components/table/) or a card list below the filters.

## Choosing a filter layout

**Inline filters** — use when there are one or two filters. Display them directly above the dataset. No trigger button is needed. Applied filter tags are not required because the filters themselves are always visible.

**[Filter sidebar](/components/filter-sidebar/)** — use when filters need to be quickly accessed on a regular basis and should always be visible alongside the listing. The filter sidebar places filters in a persistent left-hand column. Because filters are always visible, applied filter tags are not required.

Use a filter sidebar when the layout supports a two-column arrangement and most users are likely to use the filters regularly. Use inline filters when only a small number of filter controls are needed and always-visible filters are not necessary.

## Filter sizes

Three sizes are available based on the number of filter controls:

| | Small | Medium | Large |
| --- | --- | --- | --- |
| Number of filters | 1–2 | 3–6 | 6+ |
| Primary filters always visible | 1–2 | 1–2 | 1–2 |
| Tags display active filters | No | Yes | Yes |
| Requires submission to apply | No | No | Yes |

### Small — 1 to 2 filters

Display filters directly above the dataset. Because the filters are always visible, there is no need for applied filter tags.

### Medium — 3 to 6 filters

Display in an accordion triggered by a 'Show filters' button. Show one to two of the most commonly used filters outside the accordion for quick access. Applied filters appear as tags below the inputs so users can see what is active.

### Large — 6 or more filters

Display in a panel triggered by a 'Show filters' button. Show one to two of the most commonly used filters outside the panel. Applied filters appear as tags below the inputs. Include a submit button inside the panel to apply all filters at once.

The panel requires four controls:

1. **Apply filters** — applies selections and closes the panel
2. **Clear filters** — resets all selections; the panel stays open
3. **Close** — closes the panel and discards any unsaved changes
4. **Cancel** — closes the panel and discards any unsaved changes

## Rules

Always display applied filter tags for medium and large filter sets. Do not remove the tag controls — they let users see and remove active filters without re-opening the filter panel.

Prioritise filters by expected usage. Put the most commonly needed filters closest to the user.

Always include an [empty state](/patterns/empty-state/) for when filters return no results.

## Related components

- [Filter sidebar](/components/filter-sidebar/) — the persistent sidebar component for always-visible filters.
- [Table](/components/table/) — filterable and sortable table for displaying results.

## Related patterns

- [Empty state](/patterns/empty-state/) — what to show when filters return no results.
- [Pagination](/patterns/pagination/) — use alongside filters on large datasets.
