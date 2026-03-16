/**
 * colour-swatches.js
 * Inserts a colour swatch square into the Name cell of colour token tables.
 * Looks for tables where the second column header is "Value", reads the OKLCH
 * value from that cell, and prepends a swatch to the Name cell.
 */
(function () {
  'use strict';

  const SWATCH_STYLE = [
    'display:inline-block',
    'width:1.75rem',
    'height:1.75rem',
    'border-radius:3px',
    'vertical-align:middle',
    'margin-right:0.5em',
    // Subtle inset ring so near-white swatches are visible on white backgrounds
    'box-shadow:inset 0 0 0 1px rgba(0,0,0,0.14)',
    'flex-shrink:0',
  ].join(';');

  function insertSwatches(table) {
    // Only process tables where the second <th> text is "Value"
    const headers = table.querySelectorAll('thead th');
    if (headers.length < 2) return;
    if (headers[1].textContent.trim().toLowerCase() !== 'value') return;

    const rows = table.querySelectorAll('tbody tr');

    // Pre-pass: find the longest name in this table so all first cells share
    // the same min-width and the column is consistent across every row.
    // ch is measured against the <td> font — add 2em for swatch (1em) + gap (0.5em) + margin (0.5em).
    let maxLen = 0;
    rows.forEach(function (row) {
      const nameCell = row.querySelector('td:nth-child(1)');
      if (!nameCell) return;
      const codeEl = nameCell.querySelector('code');
      const len = (codeEl || nameCell).textContent.trim().length;
      if (len > maxLen) maxLen = len;
    });
    const minWidth = 'calc(' + maxLen + 'ch + 2.5em)';

    rows.forEach(function (row) {
      const nameCell = row.querySelector('td:nth-child(1)');
      const valueCell = row.querySelector('td:nth-child(2)');
      if (!nameCell || !valueCell) return;

      // Value is wrapped in a <code> element by the markdown renderer
      const codeEl = valueCell.querySelector('code');
      const colourValue = codeEl
        ? codeEl.textContent.trim()
        : valueCell.textContent.trim();

      // Skip rows without a recognisable colour value
      if (!colourValue) return;

      const swatch = document.createElement('span');
      swatch.setAttribute('aria-hidden', 'true');
      swatch.setAttribute('style', SWATCH_STYLE + ';background:' + colourValue);

      nameCell.style.minWidth = minWidth;
      nameCell.insertBefore(swatch, nameCell.firstChild);
    });
  }

  function init() {
    document.querySelectorAll('table').forEach(insertSwatches);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
