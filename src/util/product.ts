import {
  CategoryPagedQueryResponse,
  ProductCatalogData,
} from '@commercetools/platform-sdk';

export const getProductCategories = (
  product: ProductCatalogData,
  categories: CategoryPagedQueryResponse,
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
    .map((cat) => cat['en']);
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
    return combinedImageArray;
  }
};

export const getProductAttribute = (
  product: ProductCatalogData,
  attName: string,
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
    return allAttributeValues.map((attValue) => attValue['label']['en']);
  } else {
    return '';
  }
};

export function formatAttributes(attributes: string[] | string) {
  if (Array.isArray(attributes)) {
    const uniqueAttributes = Array.from(new Set(attributes));
    return uniqueAttributes.join(', ');
  } else {
    return attributes;
  }
}
