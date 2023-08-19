import { LinkItem, ColumnItem } from '../types/footer';

export const links: LinkItem[] = [
  { title: 'Home', to: '/' },
  { title: 'Catalog', to: '#' },
  { title: 'About us', to: '#' },
];

export const catalogLinks: LinkItem[] = [
  { title: 'Birthday', to: '#' },
  { title: 'Decorations', to: '#' },
  { title: 'Balloons', to: '#' },
  { title: 'Lightnings', to: '#' },
  { title: 'Party Supplies', to: '#' },
  { title: 'Gifts', to: '#' },
];

export const columns: ColumnItem[] = [
  { title: 'Information', links },
  { title: 'Catalog', links: catalogLinks },
  {
    title: 'My account',
    links: [
      { title: 'My room', to: '#' },
      { title: 'My cart', to: '#' },
    ],
  },
];
export { tokenCache, getExistingToken } from './tokenProcess';
export {
  nameValidation,
  ageValidation,
  passwordValidation,
  emailValidation,
  streetValidation,
  countryValidation,
  postalCodeValidation,
} from './validation';
