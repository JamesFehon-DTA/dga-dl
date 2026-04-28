/**
 * Inserts a colour swatch into any <td> cell whose <code> content is a CSS
 * colour value (oklch, oklab, lch, lab, hsl, rgb, hex, color()). Works across
 * any token table structure — Name/Value, Token/Light/Dark, etc.
 *
 * Pins min-width on:
 *   - Name/Token columns (first col, no swatch) — aligns token names
 *   - Value columns (any col with swatches) — swatch width + code text
 */
const SWATCH_SIZE = 2; // em
const SWATCH_STYLE = [
  'display:block',
  `width:${SWATCH_SIZE}em`,
  `height:${SWATCH_SIZE}em`,
  'border-radius:3px',
  'margin-bottom:0.4em',
  'box-shadow:inset 0 0 0 1px rgba(0,0,0,0.14)',
].join(';');

const COLOUR_RE = /^(oklch|oklab|lch|lab|rgb|rgba|hsl|hsla|hwb|color)\s*\(|^#[0-9a-fA-F]{3,8}$/;

const looksLikeColour = (str: string): boolean => COLOUR_RE.test(str.trim());

const processTable = (table: HTMLTableElement): void => {
  const rows = Array.from(table.querySelectorAll<HTMLTableRowElement>('tbody tr'));
  if (!rows.length) return;

  const colMaxLen: Record<number, number> = {};

  rows.forEach((row) => {
    Array.from(row.querySelectorAll<HTMLTableCellElement>('td')).forEach((cell, colIdx) => {
      const codeEl = cell.querySelector('code');
      if (!codeEl) return;
      const value = codeEl.textContent?.trim() ?? '';
      if (!looksLikeColour(value)) return;

      const swatch = document.createElement('div');
      swatch.setAttribute('aria-hidden', 'true');
      swatch.setAttribute('style', `${SWATCH_STYLE};background:${value}`);
      codeEl.parentNode?.insertBefore(swatch, codeEl);

      const len = value.length;
      if (!colMaxLen[colIdx] || len > colMaxLen[colIdx]) colMaxLen[colIdx] = len;
    });
  });

  if (!Object.keys(colMaxLen).length) return;

  rows.forEach((row) => {
    Array.from(row.querySelectorAll<HTMLTableCellElement>('td')).forEach((cell, colIdx) => {
      if (!colMaxLen[colIdx]) return;
      cell.style.minWidth = `calc(${colMaxLen[colIdx]}ch + 0.5em)`;
    });
  });

  const firstHeader = table.querySelector<HTMLTableCellElement>('thead th:first-child');
  if (!firstHeader) return;
  const headerText = firstHeader.textContent?.trim().toLowerCase() ?? '';
  if (headerText !== 'name' && headerText !== 'token') return;

  let maxNameLen = 0;
  rows.forEach((row) => {
    const cell = row.querySelector<HTMLTableCellElement>('td:first-child');
    if (!cell) return;
    const codeEl = cell.querySelector('code');
    const len = (codeEl ?? cell).textContent?.trim().length ?? 0;
    if (len > maxNameLen) maxNameLen = len;
  });

  if (maxNameLen > 0) {
    rows.forEach((row) => {
      const cell = row.querySelector<HTMLTableCellElement>('td:first-child');
      if (cell) cell.style.minWidth = `calc(${maxNameLen}ch + 0.5em)`;
    });
  }
};

const init = (): void => {
  document.querySelectorAll<HTMLTableElement>('table').forEach(processTable);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
