import { Price, ProductCatalogData } from '@commercetools/platform-sdk';

export const createMockPrice = (prices: Price[]): ProductCatalogData => ({
  current: {
    categories: [],
    categoryOrderHints: {},
    description: {},
    masterVariant: {
      assets: [],
      attributes: [
        {
          name: 'color',
          value: {
            key: 'green',
            label: {
              en: 'green',
              ru: 'зеленый',
            },
          },
        },
      ],
      id: 1,
      images: [],
      key: 'BL-01-HRT',
      prices,
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
      prices,
      sku: 'BL-01-HRT',
    },
    name: {},
    searchKeywords: {},
    slug: {},
    variants: [],
  },
});
