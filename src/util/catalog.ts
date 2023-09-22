import {
  CategoryPagedQueryResponse,
  ClientResponse,
  Product,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { Dispatch, SetStateAction } from 'react';

import {
  getCategoriesService,
  getOneProductService,
  getProductsService,
} from '../services';
import { ProductQueryParams } from '../types';

export const getProducts = (
  setLoading: Dispatch<SetStateAction<boolean>>,
  queryParams?: ProductQueryParams,
): Promise<ProductProjectionPagedQueryResponse> => {
  setLoading(true);

  return new Promise((resolve, reject) => {
    getProductsService(queryParams)
      .then((body) => {
        resolve(body.body);
      })
      .catch((e) => {
        const errorMessage = e.message || 'An error occurred';
        reject(new Error(errorMessage));
      })
      .finally(() => {
        setLoading(false);
      });
  });
};

export const getCategories = (): Promise<CategoryPagedQueryResponse> => {
  return new Promise((resolve, reject) => {
    getCategoriesService()
      .then((body) => {
        resolve(body.body);
      })
      .catch((e) => {
        const errorMessage = e.message || 'An error occurred';
        reject(new Error(errorMessage));
      });
  });
};

export const getOneProduct = (id: string): Promise<Product> => {
  return new Promise((resolve, reject) => {
    getOneProductService(id)
      .then((body: ClientResponse<Product>) => {
        resolve(body.body);
      })
      .catch((e: Error) => {
        const errorMessage = e.message || 'An error occurred';
        reject(new Error(errorMessage));
      });
  });
};

export const findCurrentCategoryId = (
  categories: CategoryPagedQueryResponse,
  name: string,
) => {
  return (
    categories.results.find((element) => element.name['en'] === name)?.id || ''
  );
};
