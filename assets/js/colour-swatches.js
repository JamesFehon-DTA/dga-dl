/**
 * colour-swatches.js
 * Inserts a colour swatch into any <td> cell whose <code> content is a CSS
 * colour value (oklch, oklab, lch, lab, hsl, rgb, hex, color()). Works across
 * any token table structure — Name/Value, Token/Light/Dark, etc.
 *
 * Pins min-width on:
 *   - Name/Token columns (first col, no swatch) — aligns token names
 *   - Value columns (any col with swatches) — swatch width + code text
 */
(function () {
  'use strict';

  const SWATCH_SIZE = 2;    // em — keep in sync with SWATCH_STYLE width/height
  const SWATCH_GAP  = 0.4;  // em — margin-right

  const SWATCH_STYLE = [
    'display:block',
    'width:' + SWATCH_SIZE + 'em',
    'height:' + SWATCH_SIZE + 'em',
    'border-radius:3px',
    'margin-bottom:0.4em',
    'box-shadow:inset 0 0 0 1px rgba(0,0,0,0.14)',
  ].join(';');

  // Matches any CSS colour function or hex value
  const COLOUR_RE = /^(oklch|oklab|lch|lab|rgb|rgba|hsl|hsla|hwb|color)\s*\(|^#[0-9a-fA-F]{3,8}$/;

  function looksLikeColour(str) {
    return COLOUR_RE.test(str.trim());
  }

  function processTable(table) {
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    if (!rows.length) return;

    // colMaxLen[i] = longest colour value string (in chars) found in column i
    const colMaxLen = {};

    rows.forEach(function (row) {
      Array.from(row.querySelectorAll('td')).forEach(function (cell, colIdx) {
        const codeEl = cell.querySelector('code');
        if (!codeEl) return;
        const value = codeEl.textContent.trim();
        if (!looksLikeColour(value)) return;

        const swatch = document.createElement('div');
        swatch.setAttribute('aria-hidden', 'true');
        swatch.setAttribute('style', SWATCH_STYLE + ';background:' + value);
        codeEl.parentNode.insertBefore(swatch, codeEl);

        const len = value.length;
        if (!colMaxLen[colIdx] || len > colMaxLen[colIdx]) colMaxLen[colIdx] = len;
      });
    });

    if (!Object.keys(colMaxLen).length) return;

    // Pin min-width on value columns — swatch is stacked above code, not beside it,
    // so width is driven by the code text length only
    rows.forEach(function (row) {
      Array.from(row.querySelectorAll('td')).forEach(function (cell, colIdx) {
        if (!colMaxLen[colIdx]) return;
        cell.style.minWidth = 'calc(' + colMaxLen[colIdx] + 'ch + 0.5em)';
      });
    });

    // Pin min-width on the first column when its header is "Name" or "Token"
    // (no swatch in this column — just aligns token names across rows)
    const firstHeader = table.querySelector('thead th:first-child');
    if (!firstHeader) return;
    const headerText = firstHeader.textContent.trim().toLowerCase();
    if (headerText !== 'name' && headerText !== 'token') return;

    let maxNameLen = 0;
    rows.forEach(function (row) {
      const cell = row.querySelector('td:first-child');
      if (!cell) return;
      const codeEl = cell.querySelector('code');
      const len = (codeEl || cell).textContent.trim().length;
      if (len > maxNameLen) maxNameLen = len;
    });

    if (maxNameLen > 0) {
      rows.forEach(function (row) {
        const cell = row.querySelector('td:first-child');
        if (cell) cell.style.minWidth = 'calc(' + maxNameLen + 'ch + 0.5em)';
      });
    }
  }

  function init() {
    document.querySelectorAll('table').forEach(processTable);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
