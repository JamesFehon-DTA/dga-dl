---
layout: content
title: 'Colour tokens'
description: 'How to use colour to design consistent, purposeful, and accessible products.'
foundation-type: Visual
url: '/'
---


<!-- ## On this page

- [Colour palettes](#colour-palettes)
- [Foreground colours](#foreground-colours)
- [Background colours](#background-colours)
- [Border colours](#border-colours)
- [System colours](#system-colours)
- [Miscellaneous colours](#miscellaneous-colours)
- [Usage guidelines](#usage-guidelines)

---
 -->

## Colour palettes

There are 2 colour palettes: **light** and **dark**. Each palette is divided into foreground, background, border, system, and miscellaneous colour groups – all with a specific purpose.

All colour values are authored in [OKLCH](https://oklch.com/), a perceptually uniform colour space. Unlike HSL or HEX, OKLCH guarantees that two colours at the same Lightness value appear equally bright to the human eye, making it reliable for building accessible contrast ratios programmatically.

The system uses a **fixed cool-neutral hue of 255°** with micro-chroma. This keeps surfaces visually calm while avoiding the flat appearance of pure grey. Dark mode uses slightly elevated chroma (`0.020`) – the Commonwealth navy approach – to maintain a cool quality consistent with the Australian Government digital identity.

---

## Foreground colours

Designed to sit on top of background colours to ensure contrast ratios meet WCAG 2.1 AA requirements: 4.5:1 for text (SC 1.4.3) and 3:1 for graphic elements (SC 1.4.11).

### Light palette

| Name | Value | Description |
|---|---|---|
| `--fg-text` | `oklch(0.20 0.010 255)` | Very dark cool grey. Used for primary text – body copy, headings, and labels – to ensure legibility. |
| `--fg-muted` | `oklch(0.45 0.010 255)` | Medium-dark cool grey. Used for supporting text – captions, metadata, and secondary labels – to reduce visual prominence. |
| `--fg-subtle` | `oklch(0.58 0.008 255)` | Mid cool grey. Used for placeholder text in inputs. Do not use for meaningful text as it does not meet WCAG contrast for body copy. |
| `--fg-action` | `oklch(0.45 0.14 240)` | Medium blue. Used to indicate interactive elements – links and button labels. Do not use on non-interactive elements; always supplement with an additional visual cue (underline, icon). |

### Dark palette

| Name | Value | Description |
|---|---|---|
| `--fg-text` | `oklch(0.93 0.006 255)` | Near-white with a cool cast. Used for primary text on dark surfaces. |
| `--fg-muted` | `oklch(0.65 0.010 255)` | Medium-light cool grey. Used for supporting text on dark surfaces. |
| `--fg-subtle` | `oklch(0.50 0.008 255)` | Mid cool grey. Used for placeholder text on dark surfaces. |
| `--fg-action` | `oklch(0.70 0.14 240)` | Light blue. Used to indicate interactive elements on dark surfaces. |



## Background colours

Each palette has two main background colours: the default (`body`) and a darker alternative (`body-alt`). Shade variants sit one step darker and are used to differentiate or highlight content on their respective base.

### Light palette

| Name | Value | Description |
|---|---|---|
| `--bg-body` | `oklch(0.985 0.002 255)` | Near-white with a subtle cool cast. The primary page and content background. |
| `--bg-shade` | `oklch(0.960 0.004 255)` | Light cool grey. Used to highlight components on `body` – table row zebra-striping, pill toggle tracks, sidebar panels. |
| `--bg-body-alt` | `oklch(0.945 0.005 255)` | Slightly cooler light grey. The alternate-track primary surface, used for full-width alternating page sections. |
| `--bg-shade-alt` | `oklch(0.920 0.007 255)` | Noticeably cool light grey. Used to highlight components on `body-alt`. |
| `--bg-inset` | `oklch(0.935 0.006 255)` | Recessed cool grey. Used for inset surfaces – code blocks, input field fills, and read-only wells. |
| `--bg-raised` | `oklch(1.0 0 0)` | Pure white. Used for elevated surfaces that require shadow separation – cards, dropdowns, tooltips. |

### Dark palette

| Name | Value | Description |
|---|---|---|
| `--bg-body` | `oklch(0.155 0.020 255)` | Dark navy-grey. The Commonwealth navy dark surface. Primary page and content background. |
| `--bg-shade` | `oklch(0.175 0.022 255)` | Slightly lighter navy-grey. Used to highlight components on the dark `body` surface. |
| `--bg-body-alt` | `oklch(0.200 0.024 255)` | Medium-dark navy-grey. Alternate-track primary surface for dark full-width sections. |
| `--bg-shade-alt` | `oklch(0.220 0.026 255)` | Lighter navy-grey. Used to highlight components on the dark `body-alt` surface. |
| `--bg-inset` | `oklch(0.125 0.016 255)` | Very dark navy. Recessed surface for code blocks and input fills on dark backgrounds. |
| `--bg-raised` | `oklch(0.220 0.024 255)` | Elevated navy panel. Used for floating surfaces – cards, dropdowns, tooltips on dark backgrounds. |



## Border colours

Each palette has three border tiers: muted for decorative rules, default for structural borders, and emphasis for active or focused states.

### Light palette

| Name | Value | Description |
|---|---|---|
| `--border-muted` | `oklch(0.92 0.004 255)` | Barely-there cool rule. Used for decorative dividers and table rules that don't require a 3:1 contrast ratio. |
| `--border-default` | `oklch(0.87 0.006 255)` | Light cool grey rule. Used for standard borders on inputs, cards, and containers that require 3:1 contrast against the surface. |
| `--border-emphasis` | `oklch(0.70 0.012 255)` | Medium cool grey rule. Used for hover states, active input borders, and selected item outlines. |

### Dark palette

| Name | Value | Description |
|---|---|---|
| `--border-muted` | `oklch(0.24 0.010 255)` | Very dark cool rule. Used for decorative dividers on dark surfaces. |
| `--border-default` | `oklch(0.30 0.014 255)` | Dark cool rule. Used for structural borders on dark inputs, cards, and containers. |
| `--border-emphasis` | `oklch(0.48 0.016 255)` | Medium cool rule. Used for hover states and active borders on dark surfaces. |



## System colours

System colours indicate status. They are intentionally prominent to attract attention. Each has a `subtle` background variant (for component fills) and an `emphasis` variant (for icons, borders, and text).

Status hues are fixed and not brand-derived: success `155°`, warning `85°`, danger `25°`, info `245°`.

### Light palette

| Name | Value | Description |
|---|---|---|
| `--success-subtle` | `oklch(0.94 0.04 155)` | Pale green. Background fill for success-toned components – section alerts, banners. |
| `--success-emphasis` | `oklch(0.45 0.14 155)` | Dark green. Used for success icons, left-border accents, and status text. |
| `--warning-subtle` | `oklch(0.94 0.05 85)` | Pale amber. Background fill for warning-toned components. |
| `--warning-emphasis` | `oklch(0.48 0.14 85)` | Dark amber-orange. Used for warning icons, borders, and status text. |
| `--danger-subtle` | `oklch(0.94 0.04 25)` | Pale red. Background fill for error/destructive-toned components. |
| `--danger-emphasis` | `oklch(0.47 0.16 25)` | Dark red. Used for error icons, borders, and status text. |
| `--info-subtle` | `oklch(0.94 0.04 245)` | Pale blue. Background fill for informational components. |
| `--info-emphasis` | `oklch(0.45 0.12 245)` | Medium blue. Used for info icons, borders, and status text. |

### Dark palette

| Name | Value | Description |
|---|---|---|
| `--success-subtle` | `oklch(0.22 0.03 155)` | Muted dark green. Background fill for success-toned components on dark surfaces. |
| `--success-emphasis` | `oklch(0.68 0.14 155)` | Bright medium green. Used for success icons, borders, and status text on dark surfaces. |
| `--warning-subtle` | `oklch(0.22 0.04 85)` | Muted dark amber. Background fill for warning-toned components on dark surfaces. |
| `--warning-emphasis` | `oklch(0.75 0.14 85)` | Bright amber-yellow. Used for warning icons, borders, and status text on dark surfaces. |
| `--danger-subtle` | `oklch(0.22 0.03 25)` | Muted dark red. Background fill for error-toned components on dark surfaces. |
| `--danger-emphasis` | `oklch(0.68 0.16 25)` | Bright red. Used for error icons, borders, and status text on dark surfaces. |
| `--info-subtle` | `oklch(0.22 0.03 245)` | Muted dark blue. Background fill for informational components on dark surfaces. |
| `--info-emphasis` | `oklch(0.68 0.12 245)` | Bright cyan-blue. Used for info icons, borders, and status text on dark surfaces. |


## Miscellaneous colours

Colours that do not belong to the above groups: interactive selected states, the focus ring, accent, and the modal overlay.

### Light palette

| Name | Value | Description |
|---|---|---|
| `--selected` | `oklch(0.45 0.14 240)` | Medium blue. Used to indicate a selected or active item – active nav items, selected tabs, checked inputs. |
| `--selected-muted` | `oklch(0.955 0.020 240)` | Pale blue tint. Background for selected input components. Not intended for active navigation items. |
| `--accent-subtle` | `oklch(0.955 0.020 240)` | Pale blue. Feature surface background – highlighted cards, callout fills. |
| `--accent-muted` | `oklch(0.925 0.045 240)` | Light blue. Chip and tag fills. |
| `--accent-emphasis` | `oklch(0.50 0.13 240)` | Medium blue. Primary interactive fill – buttons, badge backgrounds. |
| `--focus-ring` | `oklch(0.50 0.22 285)` | Purple (hue 285°). Used to highlight interactive components for keyboard navigation. Unique hue chosen to avoid collision with status and brand colours. |
| `--overlay-dim` | `oklch(0.20 0.01 255 / 0.45)` | Semi-transparent dark scrim. Used as an overlay behind modals and drawers. The content beneath is considered disabled and non-interactive. |

### Dark palette

| Name | Value | Description |
|---|---|---|
| `--selected` | `oklch(0.70 0.14 240)` | Light blue. Used to indicate a selected or active item on dark surfaces. |
| `--selected-muted` | `oklch(0.20 0.025 240)` | Dark blue tint. Background for selected input components on dark surfaces. |
| `--accent-subtle` | `oklch(0.20 0.020 240)` | Dark blue tint. Feature surface background on dark surfaces. |
| `--accent-muted` | `oklch(0.24 0.040 240)` | Muted dark blue. Chip and tag fills on dark surfaces. |
| `--accent-emphasis` | `oklch(0.60 0.13 240)` | Medium-bright blue. Primary interactive fill on dark surfaces. |
| `--focus-ring` | `oklch(0.72 0.20 285)` | Light purple (hue 285°). Used to highlight interactive components for keyboard navigation on dark surfaces. |
| `--overlay-dim` | `oklch(0.00 0 0 / 0.65)` | Semi-transparent black scrim. Used as an overlay behind modals and drawers on dark surfaces. |



## Usage guidelines

### Use palettes to divide sections

An interface can be divided into rows or sections using either the light or dark palette. Components inside light sections use light palette tokens; components inside dark sections use dark palette tokens.

For example, a page header or footer might use the dark palette to create separation, while the content area uses the light palette.

### Pair foreground and background tokens

Always pair foreground tokens with background tokens from the same palette:

- **Do** pair `--fg-text` with `--bg-body`
- **Do** pair `--fg-muted` with `--bg-shade`
- **Don't** mix light and dark tokens in the same component
- **Don't** pair foreground with foreground, or background with background

### Don't rely on colour alone to convey meaning

Use additional visual cues alongside colour – icons for status messages, underlines for links, shapes for status indicators. Colour should reinforce meaning, not be the sole carrier of it.

### Always use semantic tokens in components

- **Do** reference semantic tokens (`--bg-body`, `--fg-text`, `--border-default`) in all component CSS
- **Don't** hardcode OKLCH, hex, or RGB values in component styles – always reference a token
- **Don't** use `--overlay-dim` for decorative purposes – it is reserved for modal and drawer scrims
- **Don't** use `--fg-subtle` for any text that carries meaning – it does not meet WCAG contrast for body text

---

## Related foundations

- [Focus](/dga-dl/foundations/focus) – Focus ring token, contrast requirements, and keyboard navigation
- [Elevation](/dga-dl/foundations/elevation) – Shadow and glow token usage and layering model
