import { ProductCatalogData } from '@commercetools/platform-sdk';

import { getProductImages } from '../../src/util';
import { createMockImage } from './createMockImage';

describe('getProductAttribute', () => {
  const product: ProductCatalogData = createMockImage([
    {
      dimensions: {
        w: 10,
        h: 10,
      },
      label: 'img',
      url: 'url-to-img',
    },
  ]);

  it('should return the array with image url', () => {
    const image = getProductImages(product);
    expect(image).toEqual(['url-to-img']);
  });
});
