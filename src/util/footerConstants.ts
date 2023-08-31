import { ColumnItem, LinkItem } from '../types/footer';

export const links: LinkItem[] = [
  { title: 'Home', to: '/' },
  { title: 'Catalog', to: '/catalog/all' },
  { title: 'About us', to: '/about' },
];

export const columns: ColumnItem[] = [
  { id: 'information', title: 'Information', links },
  {
    id: 'my-account',
    title: 'My account',
    links: [
      { title: 'My room', to: '/me' },
      { title: 'My cart', to: '/cart' },
    ],
  },
];
