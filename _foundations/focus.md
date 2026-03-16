---
layout: content
title: 'Focus'
description: 'A single purple focus ring token provides a consistent, high-contrast keyboard navigation indicator across all components and surfaces.'
foundation-type: Accessibility
url: '/'
demo: true
---

{{ page.description }}

## Approach

The system uses a single `--focus-ring` token — an AgDS-style purple (`hue: 285°`) — applied uniformly as an `outline` on all focusable elements. This approach:

- avoids hue collision with all four status colours (success `155°`, warning `85°`, danger `25°`, info `245°`)
- avoids hue collision with the brand accent (`~255°`)
- provides a visually distinct, easily recognised focus state
- works on both light and dark surfaces without requiring a compound indicator

## Token

| Token | Light value | Dark value |
|---|---|---|
| `--focus-ring` | `oklch(0.50 0.22 285)` | `oklch(0.72 0.20 285)` |

The Lightness shifts between modes (`0.50` → `0.72`) to maintain sufficient contrast against dark backgrounds. Chroma is marginally reduced in dark mode (`0.22` → `0.20`) to avoid the ring appearing overly vivid.

## Implementation

All focusable elements use `:focus-visible` (not `:focus`) to show the ring only for keyboard and sequential navigation — not on mouse click.

```css
:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 2px;
}
```

Primary buttons use a larger offset to lift the ring off the filled surface:

```css
.btn--primary:focus-visible {
  outline-offset: 3px;
}
```

Inputs use zero offset so the ring sits flush with the field border:

```css
.input:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 0;
  border-color: var(--border-emphasis);
}
```

## Contrast

WCAG 2.1 SC 1.4.11 (Non-text Contrast) requires a minimum **3:1** contrast ratio between the focus indicator and the adjacent colours. The purple ring at `oklch(0.50 0.22 285)` achieves this against the system's lightest surface (`--bg-body`) in light mode, and `oklch(0.72 0.20 285)` achieves it against the darkest surface in dark mode.

## Why not GOV.UK yellow

GOV.UK uses a compound focus model: yellow outline plus a black underline or border. This works because yellow (`~88°`) lacks sufficient contrast on white without a secondary dark element. In a cool-neutral system:

- yellow (`~85°`) shares a hue with the warning status colour, creating semantic ambiguity
- the compound model requires two tokens and two CSS declarations per component
- yellow reads as warm against a cool-neutral surface palette

The purple single-ring approach resolves all three issues.

## Do

- apply `--focus-ring` to every interactive element via `:focus-visible`
- use `outline` rather than `box-shadow` for the focus ring — `outline` is not clipped by `overflow: hidden` and is respected by Windows High Contrast Mode
- increase `outline-offset` on filled surfaces (buttons, chips) to visually separate the ring from the element
- test focus visibility against both light and dark mode surfaces

## Don't

- use `:focus` instead of `:focus-visible` — this shows the ring on mouse clicks, which is unexpected for sighted pointer users
- suppress the focus ring with `outline: none` or `outline: 0` without providing an equivalent replacement
- use `box-shadow` as the sole focus indicator — it is clipped by parent `overflow: hidden` and invisible in Windows High Contrast Mode
- change the focus colour per component — a single consistent ring aids recognition

## Related foundations

- [Colour](/docs/_foundations/colour) — Token system and mode-switching
