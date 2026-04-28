import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://publisher-digital-govau.surge.sh',
  trailingSlash: 'always',

  build: {
    format: 'directory',
  },

  integrations: [mdx()],
});