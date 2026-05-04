---
layout: content
title: 'Chapter navigation'
description: 'Sequential page navigation for step-by-step processes where reading order carries meaning.'
url: '/'
---

Chapter navigation allows users to move forward and backward through a defined sequence of pages. It signals that content has a fixed reading order and that each step builds on the previous one.

## When to use

Use chapter navigation for:

- step-by-step compliance processes where each step depends on completing the one before it
- onboarding flows for a new service or program
- numbered frameworks or methodologies where sequence carries meaning and skipping ahead would leave users without necessary context

## When not to use

Do not use chapter navigation for:

- reference content – users navigate directly to what they need, not through a fixed sequence
- standards or criteria published as a set – readers often need one specific criterion without reading all of them; use a card grid so they can navigate directly to what they need
- any section where pages can be read independently – use [section navigation](/patterns/section-navigation/) instead

## Components

**[Next step](/components/next-step/)** – forward and back buttons at the bottom of a page, linking to the previous and next page in the sequence. Use this component on every page in a chapter sequence.

**[Progress indicator](/components/progress-indicator/)** – a step counter showing how far through the sequence the user is. Use this component inside [focus mode](/patterns/focus-mode/) multi-step form flows only. Do not add a progress indicator to informational chapter navigation – it is designed for form flows, not content sequences.

## Chapter navigation implies a fixed reading order

Adding forward and back controls to content that users can read in any order creates false expectations. Users who see 'Next' expect to be missing something if they skip ahead. Apply chapter navigation only when that expectation is accurate.

## Sequential next vs cross-surface next

The end of a chapter page often has two candidate next-page controls. They are editorially distinct and should not be confused.

**Sequential next** – 'the very next thing in this sequence'. Used between numbered criteria, framework steps, report chapters, and dated communiques. The reader is not making a routing choice; they are continuing to read. This is the role of chapter navigation, implemented with [Next step](/components/next-step/).

**Cross-surface next** – 'the single most likely action after finishing this page'. Used at the end of a guide to point at the form, at the end of a rule page to point at the matching guidance. The page author picks where the link goes, based on what the reader most likely needs next.

A chapter page can carry both: chapter navigation at the very bottom for sequential traversal, and a cross-surface CTA above it pointing at a related surface. They sit in that order – sequential controls last, because sequential reading is the dominant case on a chapter page.

Where only one is appropriate, prefer chapter navigation on chapter pages. A reader who reaches the end of step 3 of an 11-step framework expects step 4 next, not a cross-surface jump.

## Related components

- [Next step](/components/next-step/) – forward and back navigation for chapter sequences.
- [Progress indicator](/components/progress-indicator/) – step progress for focus mode forms only.

## Related patterns

- [Focus mode](/patterns/focus-mode/) – the multi-step form flow pattern where a progress indicator is appropriate.
- [Section navigation](/patterns/section-navigation/) – use when pages can be accessed in any order.
