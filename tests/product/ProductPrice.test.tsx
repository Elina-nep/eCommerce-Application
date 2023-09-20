import { ProductCatalogData } from '@commercetools/platform-sdk';

import { getProductPrice } from '../../src/util';
import { createMockPrice } from './createMockPrice';

describe('getProductPrice', () => {
  const product: ProductCatalogData = createMockPrice([
    {
      id: '0123',
      value: {
        centAmount: 1999,
        currencyCode: 'USD',
        fractionDigits: 2,
        type: 'centPrecision',
      },
    },
    {
      id: '0123',
      value: {
        centAmount: 1499,
        currencyCode: 'EUR',
        fractionDigits: 2,
        type: 'centPrecision',
      },
    },
  ]);

  it('should return the product price in USD', () => {
    expect(getProductPrice(product.current, 'USD')).toBe('19.99 USD');
  });

  it('should return the product price in EUR', () => {
    expect(getProductPrice(product.current, 'EUR')).toBe('14.99 €');
  });

  it('should return "Not Available" for an unsupported currency', () => {
    expect(getProductPrice(product.current, 'GBP')).toBe('Not Available');
  });

  it('should return "Not Available" when prices are not provided', () => {
    const productWithoutPrices: ProductCatalogData = createMockPrice([]);
    expect(getProductPrice(productWithoutPrices.current, 'USD')).toBe(
      'Not Available',
    );
  });
});
