import {
  ProductProjection,
  CategoryPagedQueryResponse,
} from '@commercetools/platform-sdk';

export interface IProductCardProps {
  product: ProductProjection;
  categories: CategoryPagedQueryResponse;
}

export interface IProductProps {
  product: ProductProjection;
}
