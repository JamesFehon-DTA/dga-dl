export interface NavItem {
  title: string;
  url: string;
  description?: string;
  nav_hidden?: boolean;
  external?: boolean;
}

export const mainnav: NavItem[] = [
  {
    title: 'Get started',
    url: '/plan/',
    description:
      'Site-wide content authoring standards covering page naming, structure, and content conventions.',
  },
  {
    title: 'Foundations',
    url: '/foundations/',
    description:
      'Core design and accessibility elements applied consistently across the design system.',
    nav_hidden: true,
  },
  {
    title: 'Components',
    url: '/components/',
    description:
      'Building blocks of the design system, with guidance on when and how to use each component.',
  },
  {
    title: 'Patterns',
    url: '/patterns/',
    description: 'Reusable component combinations that address common design problems.',
  },
  {
    title: 'Templates',
    url: '/templates/',
    description:
      'Purpose, structure, and writing conventions for each content type on digital.gov.au.',
  },
];

export const legalfooternav: NavItem[] = [
  { title: 'Accessibility', url: '/' },
  { title: 'Privacy', url: '/' },
  { title: 'Copyright and disclaimers', url: '/' },
  { title: 'Sitemap', url: '/' },
];

export const crosssitenav: NavItem[] = [];
