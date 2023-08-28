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
    .filter((cat) => currentCategoriesIDs.includes(cat.id))
    .map((cat) => cat.name)
    .map((cat) => cat['en']);
};

export const getProductImages = (product: ProductCatalogData) => {
  const imageArray = product.current.masterVariant.images?.map(
    (image) => image.url,
  );
  if (imageArray) {
    return imageArray;
  }
};
