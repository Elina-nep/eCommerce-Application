import { Dispatch, SetStateAction } from 'react';
import { getCategoriesService, getProductsService } from '../services';
import {
  CategoryPagedQueryResponse,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { ProductQueryParams } from '../types';

export const getProductsFunc = (
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

export const getCategoriesFunc = (): Promise<CategoryPagedQueryResponse> => {
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
