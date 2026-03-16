---
layout: content
title: 'Typography'
description: 'System font stacks prioritise legibility and native rendering across all platforms without requiring a font download.'
foundation-type: Visual
url: '/'
---

{{ page.description }}

## Font stack

The system uses the OS default sans-serif stack. No web font is loaded. This eliminates render-blocking requests, avoids FOUT (flash of unstyled text), and ensures every user sees type rendered by their platform's highest-quality font engine.

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
```

Platform rendering:

| Platform | Font |
|---|---|
| macOS / iOS | San Francisco |
| Windows 11 | Segoe UI Variable |
| Windows 10 | Segoe UI |
| Android | Roboto |
| Linux | Varies (typically Noto Sans or Liberation Sans) |

## Monospace stack

Used for code blocks, token labels, technical values, and data identifiers:

```css
font-family: ui-monospace, 'Cascadia Code', 'Fira Code', monospace;
```

| Platform | Font |
|---|---|
| macOS | SF Mono |
| Windows 11 | Cascadia Code |
| Windows 10 | Consolas |

## When to use each stack

The sans-serif stack is the default for all body copy, headings, labels, and UI text.

The monospace stack is used for:

- code samples and inline `code` references
- token names and CSS custom property labels in documentation
- data fields where character alignment aids reading (IDs, reference numbers, timestamps)

## Do

- use the system stack for all UI text
- use the monospace stack for any text that represents code or technical identifiers
- set `font-synthesis: none` to prevent browsers from artificially bolding or italicising system fonts that don't include those variants

## Don't

- load a custom web font unless there is a strong, tested brand or accessibility rationale — measure the performance cost before introducing one
- mix the two stacks within a single line of text
- rely on specific font names in component CSS — always use the full stack so fallbacks apply correctly

## Related foundations

- [Colour](/docs/_foundations/colour) — Foreground tokens that control text colour
