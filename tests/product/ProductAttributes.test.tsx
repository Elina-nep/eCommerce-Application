import { ProductCatalogData } from '@commercetools/platform-sdk';

import { getProductAttribute } from '../../src/util';
import { createMockAttributes } from './createMockAttributes';

describe('getProductAttribute', () => {
  const product: ProductCatalogData = createMockAttributes();

  it('should return empty string for the empty attribute', () => {
    const attributes = getProductAttribute(product, 'material', 'EN');
    expect(attributes).toEqual('');
  });
});
