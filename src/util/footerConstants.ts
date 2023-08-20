import { LinkItem, ColumnItem } from '../types/footer';

export const links: LinkItem[] = [
  { title: 'Home', to: '/' },
  { title: 'Catalog', to: '#9' },
  { title: 'About us', to: '#10' },
];

export const catalogLinks: LinkItem[] = [
  { title: 'Birthday', to: '#3' },
  { title: 'Decorations', to: '#4' },
  { title: 'Balloons', to: '#5' },
  { title: 'Lightnings', to: '#6' },
  { title: 'Party Supplies', to: '#7' },
  { title: 'Gifts', to: '#8' },
];

export const columns: ColumnItem[] = [
  { id: 'information', title: 'Information', links },
  { id: 'catalog', title: 'Catalog', links: catalogLinks },
  {
    id: 'my-account',
    title: 'My account',
    links: [
      { title: 'My room', to: '#1' },
      { title: 'My cart', to: '#2' },
    ],
  },
];
