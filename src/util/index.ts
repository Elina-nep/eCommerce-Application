export { links, columns } from './footerConstants';
export { tokenCache, getExistingToken, userTokenCache } from './tokenProcess';
export {
  nameValidation,
  ageValidation,
  passwordValidation,
  emailValidation,
  streetValidation,
  countryValidation,
  postalCodeValidation,
} from './validation';

export { cards, PRODUCTS_ON_PAGE } from './constants';
export {
  loginCustomerFunc,
  createCustomerFunc,
  logOutFunc,
  clearAlert,
} from './auth';
export {
  getProductsFunc,
  getCategoriesFunc,
  getOneProductFunc,
} from './catalog';
export { getCustomerFunc } from './customer';
