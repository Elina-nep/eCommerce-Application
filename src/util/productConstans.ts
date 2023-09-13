import { Product } from '@commercetools/platform-sdk';

export enum LANGUAGE {
  EN = 'en',
}

export enum CURRENCY {
  EUR = 'EUR',
  SYMBOL = '€',
}

export const defaultProductData: Product = {
  id: '',
  version: 0,
  createdAt: '',
  lastModifiedAt: '',
  productType: { typeId: 'product-type', id: '' },
  masterData: {
    published: true,
    current: {
      name: { en: '' },
      categories: [],
      slug: { en: '' },
      masterVariant: { id: 0 },
      variants: [],
      searchKeywords: {},
    },
    staged: {
      name: { en: '' },
      categories: [],
      slug: { en: '' },
      masterVariant: { id: 0 },
      variants: [],
      searchKeywords: {},
    },
    hasStagedChanges: false,
  },
};

export const defaultCatalogeResponse = {
  limit: 0,
  offset: 0,
  count: 0,
  results: [],
};
