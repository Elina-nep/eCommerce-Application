import { Image, ProductCatalogData } from '@commercetools/platform-sdk';

export const createMockImage = (images: Image[]): ProductCatalogData => ({
  current: {
    categories: [],
    categoryOrderHints: {},
    description: {},
    masterVariant: {
      assets: [],
      attributes: [],
      id: 1,
      images,
      key: 'BL-01-HRT',
      prices: [],
      sku: 'BL-01-HRT',
    },
    name: {},
    searchKeywords: {},
    slug: {},
    variants: [],
  },
  hasStagedChanges: false,
  published: true,
  staged: {
    categories: [],
    categoryOrderHints: {},
    description: {},
    masterVariant: {
      assets: [],
      attributes: [],
      id: 1,
      images: [],
      key: 'BL-01-HRT',
      prices: [],
      sku: 'BL-01-HRT',
    },
    name: {},
    searchKeywords: {},
    slug: {},
    variants: [],
  },
});
