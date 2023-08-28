import {
  ProductProjection,
  CategoryPagedQueryResponse,
  ProductCatalogData,
} from '@commercetools/platform-sdk';

export interface IProductCardProps {
  product: ProductProjection;
  categories: CategoryPagedQueryResponse;
}

export interface IProductProps {
  product: ProductProjection;
}

export interface IProductComponentProps {
  product: ProductCatalogData;
}
