---
layout: content
title: 'Colour'
description: 'A structured token system built on OKLCH colour space, supporting light and dark modes with accessible contrast across all surfaces.'
foundation-type: Visual
url: '/'
demo: true
---

{{ page.description }}

## Colour space

All colour values are authored in [OKLCH](https://oklch.com/), a perceptually uniform colour space. Unlike HSL or HEX, OKLCH guarantees that two colours with the same Lightness value appear equally bright to the human eye, making it reliable for building accessible contrast ratios programmatically.

Each value has three axes:

- **L** — Lightness (0–1), perceptually linear
- **C** — Chroma (saturation intensity)
- **H** — Hue (0–360°)

## Neutral hue

The system uses a **fixed cool-neutral hue of 255°** (blue-violet) with micro-chroma rather than deriving neutrals from a brand colour. This keeps surfaces visually calm while avoiding the dead appearance of pure grey (`chroma: 0`).

Light mode surfaces use `chroma: 0.008`. Dark mode uses `chroma: 0.020` — slightly more chroma to maintain the cool quality against dark backgrounds without appearing blue.

## Token architecture

Tokens follow a three-tier hierarchy:

1. **Primitive tokens** — raw OKLCH values defined per mode (not for direct use in components)
2. **Semantic tokens** — purposeful names (`--bg-body`, `--fg-text`, `--border-default`) consumed by components
3. **Component tokens** — component-scoped overrides that reference semantic tokens

This means changing a primitive cascades through every component that references the semantic token — approximately 26 semantic tokens serve the entire system.

## Surface tokens

Surfaces follow the [AgDS](https://design-system.agriculture.gov.au/foundations/colour) body/shade banding model. Two parallel tracks (`body` and `body-alt`) allow alternating section backgrounds without custom colour values.

| Token | Purpose |
|---|---|
| `--bg-body` | Primary page/card background |
| `--bg-shade` | Secondary surface — sidebars, table rows, pill toggles |
| `--bg-body-alt` | Alternate-track primary surface |
| `--bg-shade-alt` | Alternate-track secondary surface |
| `--bg-inset` | Recessed surface — code blocks, input fields |
| `--bg-raised` | Elevated surface — cards, dropdowns, tooltips |
| `--overlay-dim` | Full-screen scrim for modals and drawers |

## Border tokens

Three tiers of border weight cover all use cases without custom values:

| Token | Purpose |
|---|---|
| `--border-muted` | Subtle dividers, table rules, de-emphasised structure |
| `--border-default` | Standard borders on inputs, cards, containers |
| `--border-emphasis` | Hover states, active inputs, selected items |

## Foreground tokens

| Token | Purpose |
|---|---|
| `--fg-text` | Primary body text |
| `--fg-muted` | Supporting text — captions, labels, metadata |
| `--fg-action` | Interactive text — links, button labels |
| `--fg-placeholder` | Input placeholder text |

## Accent and selected tokens

Seven tokens cover the selected/active interaction state — typically a brand colour used at low chroma on surfaces and higher chroma on interactive elements:

| Token | Purpose |
|---|---|
| `--accent-subtle` | Selected row or item background |
| `--accent-muted` | Chip/tag fill |
| `--accent-default` | Active nav item, selected state indicator |
| `--accent-emphasis` | Primary interactive fill (buttons, links) |
| `--accent-fg` | Foreground on accent fills |
| `--selected-bg` | Selected item background |
| `--selected-border` | Selected item border |

## Status tokens

Four semantic statuses, each with two levels:

| Token | Purpose |
|---|---|
| `--success-subtle` | Success background (section alerts, banners) |
| `--success-emphasis` | Success icon, border, and text |
| `--warning-subtle` | Warning background |
| `--warning-emphasis` | Warning icon, border, and text |
| `--danger-subtle` | Error/destructive background |
| `--danger-emphasis` | Error icon, border, and text |
| `--info-subtle` | Informational background |
| `--info-emphasis` | Informational icon, border, and text |

Status hues are fixed and not brand-derived: success `155°`, warning `85°`, danger `25°`, info `245°`.

## Light and dark modes

Modes are applied via `[data-mode="dark"]` on `<html>`. All semantic tokens redefine their primitive values per mode — no component or layout code changes between modes.

Dark mode uses the Commonwealth navy approach: slightly elevated chroma (`0.020`) at hue `255°`, giving surfaces a subtle cool quality consistent with the Australian Government digital identity.

## Do

- use semantic tokens (`--bg-body`, `--fg-text`) in all component CSS
- use `--bg-shade` and `--bg-body-alt` for alternating section backgrounds
- pair status tokens (`--success-subtle` + `--success-emphasis`) as background + foreground within the same component
- test both modes before shipping any new component

## Don't

- hardcode OKLCH, hex, or RGB values in component CSS — always reference a token
- use `--overlay-dim` for decorative purposes — it is reserved for modal/drawer scrims
- mix status hues with brand accent colours
- use `--fg-placeholder` for any text that carries meaning — it does not meet WCAG contrast for body text

## Related foundations

- [Focus](/docs/_foundations/focus) — Focus ring token and contrast requirements
- [Elevation](/docs/_foundations/elevation) — Shadow and glow token usage
