---
layout: content
title: 'Summary list'
description: 'A structured list of name–value pairs for displaying record summaries and metadata.'
component-type: Content
url: '/'
---

{% include demo.html name="summary-list" %}

Use a summary list to display structured information as labelled name–value pairs. Typical uses include review and confirm screens before form submission, metadata panels on record or profile pages, and read-only summaries of collected data.

The component renders as a styled `<dl>` element with `<dt>` (term) and `<dd>` (description) pairs.

## When to use

- data has a clear label and a corresponding value for each item
- summarising information a user has entered before they submit a form
- presenting metadata about a record, file, or entity – such as dates, statuses, or identifiers
- showing read-only field data on a profile or detail page

## When not to use

- for content that needs running prose – use a rich text body instead
- when the data is tabular with multiple columns of comparable items – use a [Table]({% link _components/table.md %}) instead
- for navigational lists – use [Manual list]({% link _components/manual-list.md %}) or [Feature link list]({% link _components/feature-link-list.md %}) instead
- when there are only one or two pairs – a simple paragraph is sufficient

## Related components

- [Table]({% link _components/table.md %}) – use when data has multiple comparable rows and columns.
- [Content]({% link _components/content.md %}) – use for free-form body text and formatted content.
