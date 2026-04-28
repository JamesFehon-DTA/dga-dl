---
layout: content
title: 'Focus mode'
description: 'A reduced-chrome layout for multi-step forms that minimises distractions while users complete a task.'
url: '/'
---

Focus mode is a layout pattern for multi-step form flows. It hides the main site navigation and simplifies the header to reduce distractions and reduce the risk of users accidentally leaving the form before completing it.

Do not use focus mode on informational content pages. Users reading guides, reports, or reference content need access to the site navigation.

## When to use

Use focus mode for:

- multi-step forms where users enter information across several screens
- wizard flows where each step depends on the previous one
- onboarding tasks where the user needs to complete a defined sequence without interruption

## Layout

In focus mode:

- use the minimal header variant — the site logo is visible but the main site navigation is hidden
- do not include breadcrumbs, section navigation, or any persistent navigational sidebar
- include a 'Back' link so users can return to the previous step without losing data
- include a 'Save and exit' control at the top of the page so users can leave intentionally and return later

## Progress indicator

Use the [Progress indicator](/components/progress-indicator/) component to show users how far through the form they are. Place it near the top of the content area, directly below the minimal header.

Do not use a progress indicator outside of focus mode. It is designed for form flows, not informational content or chapter navigation sequences.

## Preventing data loss

Even in focus mode, users can navigate away using the browser back button or by closing the tab. To help prevent data loss:

- trigger a modal dialog if the user attempts to leave the flow before completing or saving it
- prompt users with something like: 'Are you sure you want to leave? You will lose any changes made since your last save.'
- offer both 'Leave page' and 'Stay on page' options in the modal

Do not allow users to turn focus mode on or off. The system controls the layout based on where the user is in the form flow.

## Related components

- [Progress indicator](/components/progress-indicator/) — step progress for focus mode forms.
- [Next step](/components/next-step/) — forward and back controls for navigating between form steps.

## Related patterns

- [Chapter navigation](/patterns/chapter-navigation/) — for sequential content pages where focus mode is not needed.
- [Page header](/patterns/page-header/) — includes the minimal header variant used in focus mode.
