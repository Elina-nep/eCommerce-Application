import { ProductProjection } from '@commercetools/platform-sdk';
const DESCRIPTION_LIMIT = 40;

export function getProductCardPrice(
  product: ProductProjection,
  currency: string,
): string | number {
  const prices = product.masterVariant.prices || [];
  for (const price of prices) {
    if (price.value.currencyCode === currency) {
      const formattedPrice = (price.value.centAmount / 100).toFixed(2);
      return `${formattedPrice} ${currency}`;
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
