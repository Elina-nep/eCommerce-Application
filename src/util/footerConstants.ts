import { LinkItem, ColumnItem } from '../types/footer';

export const links: LinkItem[] = [
  { title: 'Home', to: '/' },
  { title: 'Catalog', to: '/catalog' },
  { title: 'About us', to: '/about' },
];

export const catalogLinks: LinkItem[] = [
  { title: 'Birthday', to: '/catalog' },
  { title: 'Decorations', to: '/catalog' },
  { title: 'Balloons', to: '/catalog' },
  { title: 'Lightnings', to: '/catalog' },
  { title: 'Party Supplies', to: '/catalog' },
  { title: 'Gifts', to: '/catalog' },
];

export const columns: ColumnItem[] = [
  { id: 'information', title: 'Information', links },
  { id: 'catalog', title: 'Catalog', links: catalogLinks },
  {
    id: 'my-account',
    title: 'My account',
    links: [
      { title: 'My room', to: '/me' },
      { title: 'My cart', to: '/cart' },
    ],
  },
];
