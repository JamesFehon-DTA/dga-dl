Search filters
==============

Search filters help users find what they're looking for by displaying options that meet specified criteria.

On this page
------------

-   [Filter inputs](https://design-system.agriculture.gov.au/patterns/search-filters#filter-inputs)
-   [Filter sizes](https://design-system.agriculture.gov.au/patterns/search-filters#filter-sizes)
-   [Search filter sidebar](https://design-system.agriculture.gov.au/patterns/search-filters#search-filter-sidebar)
-   [Empty state](https://design-system.agriculture.gov.au/patterns/search-filters#empty-state)
-   [Templates](https://design-system.agriculture.gov.au/patterns/search-filters#templates)
-   [Related components](https://design-system.agriculture.gov.au/patterns/search-filters#related-components)

Search filters help users find what they're looking for by displaying options that meet specified criteria.

Applied filters are displayed as tags, so users can quickly see which filters have been applied to the dataset. Filters can be removed by dismissing the tags.

The dataset should be displayed in a [Table](https://design-system.agriculture.gov.au/components/table) or a list of [Cards](https://design-system.agriculture.gov.au/components/card) under the search filters. Refer to the specific component guidance to help determine which is more suitable to display your dataset.

**Do**

-   choose the right filter pattern to meet user needs
-   prioritise filters by expected usage
-   display 1-2 of the most important filters above the dataset
-   include [loading, empty, and error states](https://design-system.agriculture.gov.au/patterns/loading-error-empty-states)

**Don't**

-   remove the applied filter tags, as they allow users to see and remove active filters

Filter inputs
-------------

Filters can be made of from multiple input types including:

-   [Search input](https://design-system.agriculture.gov.au/component/search-input)
-   [Text input](https://design-system.agriculture.gov.au/components/text-input)
-   [Select](https://design-system.agriculture.gov.au/components/select)
-   [Checkbox](https://design-system.agriculture.gov.au/components/checkbox)
-   [Radio](https://design-system.agriculture.gov.au/components/radio)
-   [Combobox](https://design-system.agriculture.gov.au/components/combobox)
-   [Switch](https://design-system.agriculture.gov.au/components/switch)
-   [Date picker](https://design-system.agriculture.gov.au/components/date-picker)
-   [Date range picker](https://design-system.agriculture.gov.au/components/date-picker)

Filter sizes
------------

Filters are available in 3 sizes to accommodate a wide range of use cases and data sets:

-   **Small:** 1-2 filters
-   **Medium:** 3-6 filters
-   **Large:** 6+ filters

How to decide on filter size
|  |Small |Medium |Large |
| --- | --- | --- | --- |
|Number of filters | 1-2 | 3-6 | 6+ |
|Number of primary filters | 1-2 | 1-2 | 1-2 |
|Tags display active filters | No | Yes | Yes |
|Submission required | No | No | Yes |

### Small

1-2 visible filters sit above the dataset. Tags that display active filters are not needed in this case, as the filters are always visible.

[View Storybook preview](https://design-system.agriculture.gov.au/storybook/index.html?path=/story/patterns-search-filters--table-small)

![Screenshot of the small table filtering pattern](https://design-system.agriculture.gov.au/img/patterns/search-filters-table-small.png)

### Medium

3-6 filters are displayed in an accordion that is triggered by a 'Show filters' button.

1 to 2 of the most used filters can be displayed outside the accordion to make them easier and faster to access.

Applied filters are displayed as tags under the filter inputs. This helps users quickly see which filters have been applied. Filters can be removed by dismissing the tags.

[View Storybook preview](https://design-system.agriculture.gov.au/storybook/index.html?path=/story/patterns-search-filters--table-medium)

![Screenshot of the medium table filtering pattern](https://design-system.agriculture.gov.au/img/patterns/search-filters-table-medium.png)

### Large

6 or more filters are displayed in a drawer that is triggered by a 'Show filters' button. The drawer has a submit button that applies the filters.

1 to 2 of the most used filters can be displayed outside the drawer to make them easier and faster to access.

Applied filters are displayed as tags under the filter inputs. This helps users quickly see which filters have been applied. Filters can be removed by dismissing the tags.

[View Storybook preview](https://design-system.agriculture.gov.au/storybook/index.html?path=/story/patterns-search-filters--table-large)

![Screenshot of the large table filtering pattern](https://design-system.agriculture.gov.au/img/patterns/search-filters-table-large.png)

### Actions in drawer

The [Drawer](https://design-system.agriculture.gov.au/components/drawer) component should contain a total of 4 actions:

1.  **Apply filters button:** When pressed, filters should be applied and the drawer should be closed.
2.  **Clear filters button:** When pressed, filters should be reset to their original state. The drawer should stay open.
3.  **Close button:** When pressed, the drawer should close. Any changes that have been made since opening the drawer should be discarded. This is essentially the same as the 'Cancel' button.
4.  **Cancel button:** When pressed, the drawer should close. Any changes that have been made since opening the drawer should be discarded. This is essentially the same as the 'Close' button.

Search filter sidebar
---------------------

If you have filters that need to be quickly accessed on a regular basis, you could consider putting them in a [Filter sidebar](https://design-system.agriculture.gov.au/components/filter-sidebar) on the left so that they are always visible. The filter sidebar makes it faster and easier for users to access filters.

Ensure that the correct HTML order is maintained by including a hero banner at the top, followed by the filter sidebar on the left, and the card listing on the right.

Since the filters are always visible, there is no need to also include tags to show the active filters.

[View Storybook preview](https://design-system.agriculture.gov.au/storybook/index.html?path=/story/patterns-search-filters--cards)

![Screenshot of the search filter sidebar pattern](https://design-system.agriculture.gov.au/img/patterns/search-filters-search-filter-sidebar.png)

Empty state
-----------

When a search filter doesn't match any data, use an [empty state](https://design-system.agriculture.gov.au/patterns/loading-error-empty-states) to let users know that they need to clear or change the search filter.


Related components
------------------

-   [Card](https://design-system.agriculture.gov.au/components/card) -- Cards are layout components used to link to more information or for secondary in-page navigation.
-   [Drawer](https://design-system.agriculture.gov.au/components/drawer) -- A drawer is a panel that slides in from the right side of the screen. The Drawer is overlayed on top of the main area of the page to capture the user's attention while keeping the context of the current task.
-   [Filter sidebar](https://design-system.agriculture.gov.au/components/filter-sidebar) -- Filter sidebar is used for displaying filtering options in a search result or catalogue page.
-   [Pagination](https://design-system.agriculture.gov.au/components/pagination) -- Pagination separates large amounts of content into separate pages, which helps reduce cognitive load.
-   [Table](https://design-system.agriculture.gov.au/components/table) -- Tables help make complex information easier to scan and compare. Use tables for exact values or information that would be hard to read in body text.