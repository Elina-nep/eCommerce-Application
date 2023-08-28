import { ProductCatalogData } from '@commercetools/platform-sdk';

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
