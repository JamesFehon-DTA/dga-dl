---
layout: content
title: 'Figure'
description: 'A figure shows an image with a caption, marked up so screen readers and search engines treat the caption as part of the image description.'
component-type: Content
url: '/'
---

A figure pairs an image with a caption inside a single `<figure>` element with a `<figcaption>`. The semantic markup binds the caption to the image, so assistive technology announces them together and search engines treat the caption as part of the image's description.

Use a figure for any image that warrants a caption – diagrams, charts, photographs, screenshots, process illustrations, architecture diagrams. Decorative images that carry no meaning should not be wrapped in a figure; use a bare `<img>` with empty `alt=""` so screen readers skip them.

## When to use

- the image is a diagram, chart, or photograph being referenced from body copy
- the image needs a caption that describes context, source, or what to look at
- the image appears in a case study, report chapter, or explainer where it carries information

## When not to use

- the image is decorative – use a bare `<img>` with empty `alt=""` instead
- the caption would only repeat the alt text – captions must add what alt cannot
- the content is text rendered as an image – use real HTML text instead

## Alt text

Every figure must have alt text. Alt text describes the image's content or function for readers who cannot see it. Keep it short – usually under 125 characters – and do not start with 'image of' or 'photograph of'. Screen readers already announce the role.

For complex diagrams, alt text alone is rarely enough. Pair the figure with a long description in the surrounding body copy, or link to a separate detail page, and reference that destination from the alt text. See [alt text, captions and titles for images](https://www.stylemanual.gov.au/content-types/images/alt-text-captions-and-titles-images).

## Captions

Captions carry context the alt text does not: source, date, author, or what to focus on. Do not repeat the alt text in the caption.

A caption should read as a complete sentence or noun phrase, ending with a full stop. Where the figure shows data, name the source in the caption.


## Accessibility

- Decorative images do not belong in a figure. Use a bare image with empty `alt=""` so screen readers skip them.
- Where the figure conveys data that cannot be summarised in alt text, provide a long description either inline below the figure or via a linked detail page, and reference that destination from the alt text.
- Do not include essential information only inside an image. Text rendered as part of an image is invisible to screen readers, search engines, and the site's translation pipeline. See [GOV.UK images guidance](https://design-system.service.gov.uk/styles/images/).

## Related components

- [Quote](/components/quote/) – use for textual quotations.
- [Table](/components/table/) – consider when data should be expressed as rows and columns rather than as a chart image.

## Related patterns

- [Callout discipline](/patterns/callout-discipline/) – figures and callouts compete for visual weight; do not place a callout directly adjacent to a figure.
