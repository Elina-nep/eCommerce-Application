import {
  CategoryPagedQueryResponse,
  ProductCatalogData,
  ProductData,
  ProductProjection,
} from '@commercetools/platform-sdk';

import { CURRENCY } from './productConstans';

export const getProductCategories = (
  product: ProductCatalogData,
  categories: CategoryPagedQueryResponse,
  language: string,
) => {
  const currentCategoriesIDs = product.current.categories.map((cat) => cat.id);

  if (currentCategoriesIDs.length === 0) {
    return categories.results
      .filter((cat) => currentCategoriesIDs.includes(cat.id))
      .map((cat) => cat.name)
      .map((cat) => cat[language]);
  }

  return categories.results
    .filter(
      (cat) =>
        currentCategoriesIDs.includes(cat.id) &&
        cat.parent &&
        currentCategoriesIDs.includes(cat.parent.id),
    )
    .map((cat) => cat.name)
    .map((cat) => cat[language]);
};

export const getProductImages = (product: ProductCatalogData) => {
  const imageMasterVariant = product.current.masterVariant.images?.map(
    (image) => image.url,
  );

  const imageVariants =
    product.current.variants?.map(
      (variant) => variant.images?.map((image) => image.url) || [],
    ) || [];

  if (imageMasterVariant) {
    const combinedImageArray = [...imageMasterVariant, ...imageVariants.flat()];
    return formatImages(combinedImageArray);
  }
};

export function formatImages(images: string[] | string) {
  if (Array.isArray(images)) {
    return Array.from(new Set(images));
  } else {
    return images;
  }
}

export const getProductAttribute = (
  product: ProductCatalogData,
  attName: string,
  language: string,
) => {
  const attMasterVariant = product.current.masterVariant.attributes?.find(
    (att) => att.name === attName,
  )?.value;

  const attVariants =
    product.current.variants?.map(
      (variant) =>
        variant.attributes?.find((att) => att.name === attName)?.value,
    ) || [];

  const allAttributeValues = attMasterVariant
    ? [attMasterVariant, ...attVariants]
    : attVariants;

  if (allAttributeValues.length > 0) {
    return allAttributeValues.map((attValue) => {
      if (attValue && attValue['label'] && attValue['label'][language]) {
        return attValue['label'][language];
      } else {
        return '';
      }
    });
  } else {
    return '';
  }
};

export function formatAttributes(attributes: string[] | string) {
  if (Array.isArray(attributes)) {
    return Array.from(new Set(attributes)).join(', ');
  } else {
    return attributes;
  }
}

export function getProductPrice(
  product: ProductProjection | ProductData,
  currency: string,
): string {
  const prices = product.masterVariant.prices || [];
  for (const price of prices) {
    if (price.value.currencyCode === currency) {
      const formattedPrice = (price.value.centAmount / 100).toFixed(2);
      return `${formattedPrice} ${CURRENCY.SYMBOL}`;
    }
  }
  return 'Not Available';
}

export function getProductPriceDiscounted(
  product: ProductProjection | ProductData,
  currency: string,
): string {
  const prices = product.masterVariant.prices || [];
  for (const price of prices) {
    if (price.value.currencyCode === currency) {
      if (price.discounted && price.discounted.value) {
        const formattedPrice = (
          price.discounted.value.centAmount / 100
        ).toFixed(2);
        return `${formattedPrice} ${CURRENCY.SYMBOL}`;
      }
    }
  }
  return '';
}
