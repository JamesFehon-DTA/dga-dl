// @ts-check
import { visit } from 'unist-util-visit';

/**
 * Remark plugin that prefixes absolute markdown links (and image URLs) with
 * the configured Astro base path.
 *
 * Markdown like `[Foundations](/foundations/)` is normally NOT processed by
 * Astro to honour the configured `base`. When deploying to a GitHub Pages
 * project page (e.g. /dga-dl/), absolute links break unless we prepend the
 * base path ourselves.
 *
 * Skips:
 *   - Already-prefixed links (start with `${base}`)
 *   - Protocol-relative URLs (start with `//`)
 *   - Anchor-only links (start with `#`)
 *   - Mailto/tel and other non-`/` URLs
 *
 * @param {{ base: string }} options
 */
export function remarkPrefixAbsoluteLinks({ base }) {
  // Normalise: ensure base ends with `/` and we don't double-up slashes.
  const baseNoTrail = base.replace(/\/$/, '');
  if (baseNoTrail === '') {
    // base is `/` — nothing to do.
    return () => {};
  }

  return function transformer(tree) {
    visit(tree, (node) => {
      if (
        (node.type === 'link' || node.type === 'image') &&
        typeof node.url === 'string' &&
        node.url.startsWith('/') &&
        !node.url.startsWith('//') &&
        !node.url.startsWith(baseNoTrail + '/')
      ) {
        node.url = baseNoTrail + node.url;
      }
    });
  };
}
