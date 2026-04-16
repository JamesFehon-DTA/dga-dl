---
layout: content
title: 'Feature link list'
description: 'A compact list of navigational links with optional descriptions and directional icons.'
component-type: Navigation
url: '/'
demo: true
---

Use a feature link list to present a group of related navigational links in a sidebar or in-page panel. Each item consists of a link title, an optional short description, and a directional icon that animates on hover. The component is designed to sit alongside primary content, not to replace it.

Always accompany a feature link list with a clear heading. Without a heading, the list lacks context and users cannot assess whether the links are relevant to them.

## When to use this component

- the links share a common context and can be grouped under a single heading
- the list supplements the main content area, placed within the page's main region
- descriptions are available for all or most links – aim to use them consistently across the list
- descriptions add genuine value by clarifying what the destination contains, not restating the link title
- the component is the right choice when links to external sites are unavoidable – it renders a different icon for external destinations to signal that a new tab will open

## When not to use this component

- outside the main content region
- for primary navigation
- when links do not share a common theme – a plain rich text list is sufficient
- when you have more than eight items – consider a table, a card grid, or a section landing page
- to link to sections on the current page.

## Writing link text and descriptions

- make each link label clear, concise, and distinguishable from the others – screen reader users navigate by link text alone
- do not open links in a new tab unless unavoidable; when you must, always use the external link icon so users know what to expect
- do not repeat the link label in the description – use the description to add new information
- keep descriptions to three lines of copy or fewer; longer text undermines the component's purpose as a quick-scan navigation aid
- if most links have descriptions, add one to all – a mix of described and bare links looks unfinished and is harder to scan

## Accessibility

Each link must have clear, concise, and descriptive link text. Links that share the same label (for example, multiple 'Read more' links) are inaccessible to screen reader users who navigate by link text. Each link should be distinguishable from the others without relying on surrounding context.

Meeting this requirement supports users with cognitive disabilities and users who navigate with a screen reader or keyboard.

WCAG success criterion: [2.4.4 Link purpose (in context)](https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html)

## Related components

- [Promo]({% link _components/promo.md %}) – use to highlight a single featured item with an image and call to action.
- [Manual list]({% link _components/manual-list.md %}) – use for simpler link lists that do not require descriptions or hover icons.
- [Callout]({% link _components/callout.md %}) – use within rich text to draw attention to a single important link or requirement.
- Inpage nav – use to link to sections within the current page; do not use a feature link list for this purpose.
