---
layout: content
title: 'Elevation'
description: 'Shadow and glow tokens communicate physical depth and attention state respectively — two distinct purposes served by separate token families.'
foundation-type: Visual
url: '/'
demo: false
---

{{ page.description }}

## Shadow vs glow

The system distinguishes between two types of visual elevation:

**Shadow** communicates **physical depth** — that an element floats above the surface it sits on. Shadows are directional, darker at the base, and simulate a light source. They are used for structural elements: cards, dropdowns, modals, popovers.

**Glow** communicates **attention state** — that an element is interactive, active, or selected. Glows are non-directional, use the accent colour, and are used for UI feedback rather than layout hierarchy.

Using the wrong type creates confusion: a glowing card implies it is interactive; a shadowed button implies it is physically raised rather than in a specific state.

## Shadow tokens

Three levels of shadow correspond to increasing stacking depth:

| Token | Purpose | Typical use |
|---|---|---|
| `--shadow-sm` | Minimal lift | Inline cards, compact components, table action rows |
| `--shadow-md` | Standard elevation | Cards, sidebars, sticky elements |
| `--shadow-lg` | Maximum depth | Modals, dialogs, full-screen drawers |

All shadow tokens use two layered values: a large soft spread for ambient shadow and a small tight spread for the contact shadow. This two-layer technique avoids flat or plastic-looking shadows.

In dark mode, shadow opacity increases to compensate for the reduced contrast between the surface and the dark background.

## Glow token

| Token | Purpose |
|---|---|
| `--glow` | Active, selected, or interactive-hover state indicator on raised surfaces |

The glow uses the accent colour at low opacity, making it contextually meaningful rather than decorative. It should only appear on elements that are interactive or carry a state change.

## Do

- use `--shadow-sm` for inline components that need subtle separation from the page surface
- use `--shadow-md` as the default for floating elements
- use `--shadow-lg` only for full-screen overlays and large dialogs
- use `--glow` to reinforce an interactive hover or selected state on `--bg-raised` surfaces

## Don't

- apply shadow and glow simultaneously — choose one signal per state
- apply shadow to flat, non-interactive elements — it implies affordance that isn't there
- use `--shadow-lg` for small UI components — scale shadow to the physical size of the element
- use `--glow` in place of the focus ring — glow is a mouse-hover signal, not a keyboard-navigation signal

## Related foundations

- [Colour](/docs/_foundations/colour) — Surface tokens (`--bg-raised`) that shadow and glow are applied to
- [Focus](/docs/_foundations/focus) — Keyboard focus indicator, distinct from glow
