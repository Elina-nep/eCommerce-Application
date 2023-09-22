import { ProductProjection } from '@commercetools/platform-sdk';

const DESCRIPTION_LIMIT = 40;

export const getProductCardImage = (product: ProductProjection) => {
  const imageMasterVariant = product.masterVariant.images?.map(
    (image) => image.url,
  );

  if (imageMasterVariant) {
    return imageMasterVariant[0];
  }
};

export const getProductCardDescription = (
  product: ProductProjection,
  language: string,
) => {
  const description = product.description![language];

  if (description.length > DESCRIPTION_LIMIT) {
    return description.slice(0, DESCRIPTION_LIMIT) + '...';
  }

  return description;
};
