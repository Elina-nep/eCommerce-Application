import { ProductCatalogData } from '@commercetools/platform-sdk';

export const createMockAttributes = (): ProductCatalogData => ({
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
        {
          name: 'occasion',
          value: {
            key: 'birthday',
            label: {
              en: 'birthday',
              ru: 'день рождения',
            },
          },
        },
      ],
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
    variants: [
      {
        assets: [],
        attributes: [
          {
            name: 'color',
            value: {
              key: 'white',
              label: {
                en: 'white',
                ru: 'белый',
              },
            },
          },
          {
            name: 'occasion',
            value: {
              key: 'children',
              label: {
                en: 'children',
                ru: 'дети',
              },
            },
          },
        ],
        id: 1,
        images: [],
        key: 'BL-01-HRT',
        prices: [],
        sku: 'BL-01-HRT',
      },
    ],
  },
});
