export { links, catalogLinks, columns } from './footerConstants';
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
export { getProducts, getCategories, getOneProduct } from './catalog';
export { getCustomerFunc } from './customer';
export {
  getProductCategories,
  getProductImages,
  getProductAttribute,
  formatAttributes,
  getProductPrice,
} from './product';
export { defaultProductData, defaultCatalogeResponse } from './productConstans';
export { LANGUAGE, CURRENCY } from './productConstans';
export { getProductCardPrice, getProductCardImage } from './productCard';
