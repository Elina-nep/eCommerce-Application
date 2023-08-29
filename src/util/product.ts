import {
  CategoryPagedQueryResponse,
  ProductCatalogData,
} from '@commercetools/platform-sdk';
export const getProductAttribute = (
  product: ProductCatalogData,
  attName: string,
) => {
  const att = product.current.masterVariant.attributes?.find(
    (att) => att.name === attName,
  )?.value;

  if (att) {
    return att['label']['en'];
  } else {
    return '';
  }
};

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
  const imageMasterVariantArray = product.current.masterVariant.images?.map(
    (image) => image.url,
  );

  const imageVariantsArray =
    product.current.variants?.map(
      (variant) => variant.images?.map((image) => image.url) || [],
    ) || [];

  if (imageMasterVariantArray) {
    const combinedImageArray = [
      ...imageMasterVariantArray,
      ...imageVariantsArray.flat(),
    ];
    return combinedImageArray;
  }
};
