import { Price, ProductCatalogData } from '@commercetools/platform-sdk';

import { getProductPriceDiscounted } from '../../src/util';
import { createMockPrice } from './createMockPrice';

const createMockProductWithPrices = (prices: Price[]): ProductCatalogData =>
  createMockPrice(prices);

const createMockProductWithoutPrices = (): ProductCatalogData =>
  createMockPrice([]);

describe('getProductPriceDiscounted', () => {
  it('should return the discounted product price in USD', () => {
    const product = createMockProductWithPrices([
      {
        value: {
          centAmount: 1999,
          currencyCode: 'USD',
          fractionDigits: 2,
          type: 'centPrecision',
        },
        id: 'd8de1b16',
        discounted: {
          value: {
            centAmount: 1799,
            currencyCode: 'USD',
            fractionDigits: 2,
            type: 'centPrecision',
          },
          discount: {
            typeId: 'product-discount',
            id: 'discount',
          },
        },
      },
    ]);

    expect(getProductPriceDiscounted(product.current, 'USD')).toBe('17.99 USD');
  });

  it('should return an empty string when prices are not provided', () => {
    const product = createMockProductWithoutPrices();
    expect(getProductPriceDiscounted(product.current, 'USD')).toBe('');
  });
});
