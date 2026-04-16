---
layout: content
title: 'Typography'
description: 'The design system uses system fonts to decrease file size and increase page speed.'
foundation-type: Visual
url: '/'
---


## Font family

The design system uses system fonts to decrease file size and increase page speed.

Government services are provided for everyone, regardless of their situation or location. By choosing to use system fonts, users download less data and make fewer HTTP requests. This means that people on low-end devices or internet connections in remote areas can access government services easier.

## Font family tokens
| Token | Value | Description |
| --- | --- | --- |
| body | -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol' | Used as the default font for all text |
| monospace | 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace | Used for code and other monospaced text |


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

- use `rem` values for font sizes so users can override the base size in their browser settings
- use `font-weight: 400` for body text and `font-weight: 700` for headings as the primary pairing
- set `font-synthesis: none` to prevent browsers from artificially synthesising bold or italic when variable font axes are available

## Don't

- set font sizes in `px` — this overrides user browser font-size preferences and fails WCAG SC 1.4.4
- use weights below `400` in UI contexts — they reduce legibility at small sizes
- mix default font and the monospace stack within a single sentence or label
- use `font-family` with no fallbacks — the stack must include system font fallbacks
- rely on font-weight names (e.g. `bold`) in component CSS — always use numeric values so the variable font axis resolves correctly

## Related foundations

- [Colour](/dga-dl/foundations/colour) — Foreground tokens that control text colour
- [Elevation](/dga-dl/foundations/elevation) — Layering model for surfaces that contain text
