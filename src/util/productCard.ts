import { ProductProjection } from '@commercetools/platform-sdk';

export function getProductCardPrice(
  product: ProductProjection,
  currency: string,
): string | number {
  const prices = product.masterVariant.prices || [];
  for (const price of prices) {
    if (price.value.currencyCode === currency) {
      return price.value.centAmount / 100;
    }
  }
  return 'Not Available';
}

export const getProductCardImage = (product: ProductProjection) => {
  const imageMasterVariant = product.masterVariant.images?.map(
    (image) => image.url,
  );

  if (imageMasterVariant) {
    return imageMasterVariant[0];
  }
};
