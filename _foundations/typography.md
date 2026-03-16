---
layout: content
title: 'Typography'
description: 'Public Sans is the system typeface — an open-source humanist sans-serif designed specifically for government digital interfaces.'
foundation-type: Visual
url: '/'
demo: false
---


## Public Sans

Public Sans is a strong, neutral typeface developed by the US Web Design System (USWDS). It is derived from Libre Franklin and optimised for the specific legibility and neutrality requirements of government digital services. It is open-source (SIL Open Font Licence 1.1) and available as a variable font.

Public Sans was chosen for this system because it:

- is purpose-designed for government digital interfaces — neutral, legible, and authoritative without being bureaucratic
- provides a full variable weight axis (100–900), allowing fine typographic control without multiple font files
- renders cleanly at small sizes — essential for data-dense interfaces, tables, and form labels
- is freely available, eliminating licensing constraints for agencies and vendors

## Font stack

```css
font-family: 'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
```

The system fonts after `'Public Sans'` serve as fallbacks if the web font has not yet loaded or is unavailable. The visual difference between Public Sans and San Francisco/Segoe UI is minimal at most sizes — the stack provides a stable reading experience during load.

## Loading Public Sans

Public Sans is available from Google Fonts. Load it in the document `<head>` before any stylesheets:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
```

The `wght@0,100..900;1,100..900` range loads the full variable font for both normal and italic axes. If only a subset of weights is needed, constrain the range (e.g. `wght@0,400..700`) to reduce payload.

For production deployments where privacy or offline availability is required, self-host the variable font files and declare `@font-face` rules locally.

## Weights

| Weight | Value | Use |
|---|---|---|
| Regular | `400` | Body copy, paragraphs, list items |
| Medium | `500` | UI labels, input labels, secondary headings |
| SemiBold | `600` | Sub-headings, table column headers, emphasis labels |
| Bold | `700` | Page headings, section headings, strong callouts |

Avoid Thin (100), ExtraLight (200), and Light (300) in digital interfaces — they reduce legibility at small sizes and on low-contrast displays. Avoid ExtraBold (800) and Black (900) except in display contexts such as hero headings.

## Type scale

The scale uses a modular ratio. Sizes are defined as CSS custom properties and expressed in `rem` to respect user font-size preferences.

| Token | Value | Use |
|---|---|---|
| `--text-xs` | `0.75rem` | Fine print, legal text, metadata badges |
| `--text-sm` | `0.875rem` | Captions, table cell content, secondary labels |
| `--text-base` | `1rem` | Default body copy |
| `--text-md` | `1.125rem` | Lead paragraphs, introductory text |
| `--text-lg` | `1.25rem` | Sub-headings (h4–h5) |
| `--text-xl` | `1.5rem` | Section headings (h3) |
| `--text-2xl` | `1.875rem` | Page headings (h2) |
| `--text-3xl` | `2.25rem` | Display headings (h1) |

## Line height

| Token | Value | Use |
|---|---|---|
| `--leading-tight` | `1.25` | Headings — keeps multi-line headings compact |
| `--leading-normal` | `1.5` | Default body copy — optimal reading rhythm |
| `--leading-relaxed` | `1.75` | Long-form text, accessibility-critical reading contexts |

## Monospace stack

Used for code blocks, token labels, technical values, and data identifiers:

```css
font-family: ui-monospace, 'Cascadia Code', 'Fira Code', monospace;
```

The monospace stack is intentionally separate from Public Sans. Use it only for content that represents code or technical identifiers — not for UI text that happens to need alignment.

## Do

- load Public Sans via the `<link>` preconnect + stylesheet pattern to minimise render-blocking
- use `font-display: swap` in self-hosted `@font-face` declarations to avoid invisible text during font load
- use `rem` values for font sizes so users can override the base size in their browser settings
- use `font-weight: 400` for body text and `font-weight: 700` for headings as the primary pairing
- set `font-synthesis: none` to prevent browsers from artificially synthesising bold or italic when variable font axes are available

## Don't

- set font sizes in `px` — this overrides user browser font-size preferences and fails WCAG SC 1.4.4
- use weights below `400` in UI contexts — they reduce legibility at small sizes
- mix Public Sans and the monospace stack within a single sentence or label
- use `font-family` with only `'Public Sans'` and no fallbacks — the stack must include system font fallbacks
- rely on font-weight names (e.g. `bold`) in component CSS — always use numeric values so the variable font axis resolves correctly

## Related foundations

- [Colour](/dga-dl/foundations/colour) — Foreground tokens that control text colour
- [Elevation](/dga-dl/foundations/elevation) — Layering model for surfaces that contain text
