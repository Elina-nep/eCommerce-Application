import {
  CategoryPagedQueryResponse,
  ProductCatalogData,
} from '@commercetools/platform-sdk';

export const getProductCategories = (
  product: ProductCatalogData,
  categories: CategoryPagedQueryResponse,
  language: string,
) => {
  const currentCategoriesIDs = product.current.categories.map((cat) => cat.id);

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
    return allAttributeValues.map((attValue) => attValue['label'][language]);
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
  product: ProductCatalogData,
  currency: string,
): string | number {
  const prices = product.current.masterVariant.prices || [];
  for (const price of prices) {
    if (price.value.currencyCode === currency) {
      return price.value.centAmount / 100;
    }
  }
  return 'Not Available';
}
