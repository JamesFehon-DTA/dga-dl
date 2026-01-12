---
layout: content
title: 'Manual list'
description: 'A callout draws attention to important or interesting information.'
component-type: Content
url: '/'
---

<p class="ct-text-large">{{ page.description }}</p>

<div style="box-sizing: border-box;
    list-style: none;
    margin: 0;
    padding: 0;
    border-width: 0;
    border-left-width: 1px;
    border-right-width: 1px;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-color: var(--ct-color-light-border-light);
    border-style: solid;
    border-radius: 4px;">
{% include demos/callout.html%}
</div>


Use callout to draw a user’s attention to important snippets of static information.

## Do

- use sparingly as they are intrusive
- use to help users quickly scan to find essential information in a long text page
- use to reiterate important content
- use to format content not included in the main text such as support and contact details, checklists, definitions and ‘Did you know?’ content.

## Don’t
- use for primary content, as it may be missed
- use for quotes in long-form content - use a [Quote]({% link _components/quote.md%}) instead
- make them the focus of content; they are a supporting tool
- use for errors and alerts – use an alert or message instead
- embed form inputs in Callouts
- use in conditionally revealed checkbox or radio groups
- mix colour palettes.

## Related components
- Global alert – Global alerts display prominent service or system wide messages at the top of the screen.
- Message – A message is a colour-coded, non-disruptive notification that provides Success, Error, Warning or Information messages within a page at relevant times during the user journey. They should not be confused with Callouts.

## Related patterns
- Messaging – Messaging conveys contextual information to the user, provides information in relation to a service or interaction, and provides feedback in response to their actions or the current system status.


