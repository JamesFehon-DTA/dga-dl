---
layout: content
title: 'Focus management'
description: 'The focus indicator shows which element has focus. Good focus management helps all users track their position, but it is essential for people with low vision.'
foundation-type: Accessibility
url: '/'
demo: false
---

{{ page.description }}

## Focus management in this system

Focus management is considered throughout the design system — in every component and pattern. A clear, consistent focus indicator is provided without requiring per-component customisation.

## Requirements

- A focus indicator that is visually distinct from both the default and hover states.
- Focus indicators meet a minimum contrast ratio of 3:1 against adjacent colours and backgrounds (WCAG SC 1.4.11).
- Keyboard focus is always visible.
- Focus indicators are not removed unless an equivalent visual indicator is provided.
- When a focused object is deleted — for example, closing a section alert — focus moves to the next appropriate element.

## Benefits

- Makes it easier to locate interactive elements and focusable sections on the page for users with low vision.
- Ensures users can track their position when navigating via keyboard.
- Reduces accidental interactions by clearly defining interactive areas.
- Assists users with limitations in executive function, attention, or short-term memory to find the focus location on the page.
- Restores focus after an action has taken place — for example, closing a drawer.

---

## Approach

The system uses a single `--focus-ring` token — a purple (`hue: 285°`) applied uniformly as an `outline` on all focusable elements. This approach:

- avoids hue collision with all four status colours (success `155°`, warning `85°`, danger `25°`, info `245°`)
- avoids hue collision with the brand accent (`~240°`) and the cool-neutral surface hue (`255°`)
- provides a visually distinct, easily recognised focus state consistent across every component
- works on both light and dark surfaces without requiring a compound indicator

## Token

| Token | Light value | Dark value |
|---|---|---|
| `--focus-ring` | `oklch(0.50 0.22 285)` | `oklch(0.72 0.20 285)` |

Lightness shifts between modes (`0.50` → `0.72`) to maintain sufficient contrast against dark backgrounds. Chroma is marginally reduced in dark mode (`0.22` → `0.20`) to avoid the ring appearing overly vivid against the navy surface.

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

Inputs use zero offset so the ring sits flush against the field border:

```css
.input:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 0;
  border-color: var(--border-emphasis);
}
```

## Contrast

WCAG SC 1.4.11 (Non-text Contrast) requires a minimum **3:1** ratio between the focus indicator and the adjacent colours. The purple ring at `oklch(0.50 0.22 285)` achieves this against the system's lightest surface (`--bg-body`) in light mode. The dark mode value `oklch(0.72 0.20 285)` achieves it against the deepest dark surface.


## Do

- apply `--focus-ring` to every interactive element via `:focus-visible`
- use `outline` rather than `box-shadow` for the focus ring — `outline` is not clipped by `overflow: hidden` and is respected by Windows High Contrast Mode
- increase `outline-offset` on filled surfaces (buttons, chips) to visually separate the ring from the element
- test focus visibility against both light and dark mode surfaces
- manage focus explicitly when content changes — move focus to the next logical element after a section alert closes, a drawer dismisses, or a modal confirms

## Don't

- use `:focus` instead of `:focus-visible` — this shows the ring on mouse clicks, which is unexpected for sighted pointer users
- suppress the focus ring with `outline: none` or `outline: 0` without providing an equivalent replacement
- use `box-shadow` as the sole focus indicator — it is clipped by parent `overflow: hidden` and invisible in Windows High Contrast Mode
- change the focus colour per component — a single consistent ring aids recognition
- confuse the focus ring with `--glow` — glow is a pointer-hover signal, not a keyboard navigation signal

## WCAG references

- [Understanding SC 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html)
- [Understanding SC 2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html)

## Related foundations

- [Colour](/dga-dl/foundations/colour) — Token system and mode-switching
- [Elevation](/dga-dl/foundations/elevation) — Glow token, distinct from focus ring
