export {};
import { LinkItem, ColumnItem } from '../types';

export const links: LinkItem[] = [
  { title: 'Home', to: '/' },
  { title: 'Catalog', to: '/catalog' },
  { title: 'About us', to: '/about-us' },
];

export const catalogLinks: LinkItem[] = [
  { title: 'Birthday', to: '/catalog/birthday' },
  { title: 'Decorations', to: '/catalog/decorations' },
  { title: 'Balloons', to: '/catalog/balloons' },
  { title: 'Lightnings', to: '/catalog/lightnings' },
  { title: 'Party Supplies', to: '/catalog/party' },
  { title: 'Gifts', to: '/catalog/gifts' },
];

export const columns: ColumnItem[] = [
  { title: 'Information', links },
  { title: 'Catalog', links: catalogLinks },
  {
    title: 'My account',
    links: [
      { title: 'My room', to: '/room' },
      { title: 'My cart', to: '/cart' },
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
