import {
  CategoryPagedQueryResponse,
  ProductCatalogData,
  ProductProjection,
} from '@commercetools/platform-sdk';

export interface IProductCardProps {
  product: ProductProjection;
}

export interface IProductProps {
  product: ProductProjection;
}

export interface IProductComponentProps {
  product: ProductCatalogData;
  categories: CategoryPagedQueryResponse;
  id: string;
}

export interface IProductModalProps {
  images: string | string[];
  alt: string;
  modalImageIndex: number;
  closeModal: () => void;
}
