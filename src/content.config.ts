import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// All five collections are synced from the civictheme-uikit docs-live ref by
// scripts/sync-content.mjs (gitignored, not authored here). Component docs are
// routed into components/ vs components-advanced/ by requires-cms-config.

const baseFields = {
  title: z.string(),
  description: z.string(),
  layout: z.string().optional(),
  url: z.string().optional(),
};

const foundations = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/foundations' }),
  schema: z.object({
    ...baseFields,
    'foundation-type': z.enum(['Accessibility', 'Visual']),
  }),
});

const components = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/components' }),
  schema: z.object({
    ...baseFields,
    'component-type': z.enum(['Content', 'Data', 'Forms', 'Layout', 'Navigation']),
    'rendered-by': z.array(z.string()).optional(),
  }),
});

const componentsAdvanced = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/components-advanced' }),
  schema: z.object({
    ...baseFields,
    'component-type': z.enum(['Content', 'Data', 'Forms', 'Layout', 'Navigation']),
    'rendered-by': z.array(z.string()).optional(),
    'requires-cms-config': z.literal(true),
  }),
});

const patterns = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/patterns' }),
  schema: z.object(baseFields),
});

const templates = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/templates' }),
  schema: z.object(baseFields),
});

export const collections = {
  foundations,
  components,
  'components-advanced': componentsAdvanced,
  patterns,
  templates,
};
