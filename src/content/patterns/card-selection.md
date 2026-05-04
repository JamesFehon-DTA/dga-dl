---
layout: content
title: 'Card selection'
description: 'Choosing the right card type for child-page lists, featured items, and routing surfaces.'
url: '/'
---

Cards are the default unit for surfacing other pages on digital.gov.au. The site has several card components and they are not interchangeable. Picking the wrong one either over-promotes routine navigation or under-promotes a flagship resource.

This pattern sets the rule for which card to reach for in each situation.

## At a glance

| Situation | Default card | Why |
|---|---|---|
| Child-page list on a section landing page | Subject card | Designed for 'pick a topic' routing; pairs well with one tag |
| Index of criteria, statements, steps, chapters | Navigation card | Lightest weight; carries title + summary + optional badge |
| Promoting a flagship report, plan, or policy | Promo card | Marketing weight – image, dark or light theme, longer copy |
| Surfacing a published report or document inline | Publication card | Cover image, full title, date, attachment in one unit |
| Listing programs, services, or framework offerings | Service card | Audience-led; designed for 'who can use this and how' |

The DTA design library does not currently catalogue subject card, navigation card, publication card, or service card as separate components – these names refer to CivicTheme card variants. The selection rules in this pattern still apply when implementing card layouts in CivicTheme today.

## Subject card

Use a subject card when readers need to pick a topic from a small set of siblings on a section landing page.

Subject cards carry a title, a one-line description, and a single tag. The tag is for type or status (for example, 'Mandatory'), not for filtering. Subject cards work in two-, three-, or four-column grids. If there are more than eight siblings, group them under H2 headings.

Do not use a subject card to promote a flagship publication or campaign – it lacks the visual weight. Do not use a subject card for a list of numbered criteria or statements – the navigation card is built for that density.

## Navigation card

Use a navigation card for a dense index of structurally identical children: criteria 1 through 10, statements 1 through 41, chapters of a report, steps of a framework. The card carries a number badge, the title, and a one-line summary.

Navigation cards keep their weight low precisely so that 10 or 41 of them on one page remain scannable. When the set exceeds about 12 items, group the cards under H2 sub-headings (for example, by lifecycle stage) rather than presenting a flat grid.

Do not substitute a numbered list for a navigation card grid where each item has a one-line summary. The summary is what lets readers route directly to the right rule – a bare list forces them to click through to find out.

## Promo card

Use a promo card sparingly. The component is a marketing surface – image, optional dark theme, longer copy – designed to lift one or two flagship items above the routine navigation.

The right uses are: flagging the canonical PDF of a major report on the section landing page, surfacing the three Guidance siblings ('how to meet', 'how to measure', 'transitioning') from a rule page, and promoting an active program with an upcoming deadline.

The wrong uses are: presenting every child of a section as a promo card – this dilutes the marketing weight to nothing; using a promo card where a subject card or navigation card carries the same information at lower cost; deploying more than three promo cards on a single page.

## Publication card

Use a publication card to render a single published document inline – cover image, full title, publication date, format and file size. The component is purpose-built for the front-matter chapters of a long-form report, where every chapter needs to re-establish the parent publication for readers arriving from search.

Do not use a publication card outside the report context. A guide, policy, or program page that wants to advertise a single PDF should use an [attachment](/components/attachment/) component instead.

## Service card

Use a service card for programs, services, or framework offerings where the reader is asking 'is this for me, and how do I take part?'. The card is audience-led: it leads with who the offering is for, not just what it is.

Do not use a service card for a one-off event or a published report. The card's framing implies an ongoing offering with an entry point.

## Density rules

A grid of more than eight cards needs sub-headings. A grid of more than 16 cards needs to be broken across two or more pages, or restructured into a [side navigation](/patterns/section-navigation/) plus a brief summary.

If a grid has fewer than three cards, ask whether a card grid is the right shape at all. Two cards often read better as a [feature link list](/components/feature-link-list/) or as inline links in body text.

Cards in the same grid should carry the same data shape. A grid where some cards have a description and others do not looks unfinished and is harder to scan – pick a shape and apply it across the grid.

## Related components

- [Promo](/components/promo/) – the implementation of promo card in the design library.
- [Manual list](/components/manual-list/) – use when descriptions and visual weight are not needed.
- [Feature link list](/components/feature-link-list/) – use in sidebars or for two-to-eight related links with descriptions.
- [Attachment](/components/attachment/) – use to surface a single downloadable file when a publication card is overkill.

## Related patterns

- [Related resources](/patterns/related-resources/) – guidance on the two-to-four card grid at the end of a page.
- [Section navigation](/patterns/section-navigation/) – when the right answer is a navigation rail, not a card grid.
