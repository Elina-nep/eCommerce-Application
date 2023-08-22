import { Dispatch, SetStateAction } from 'react';
import { getProductsService } from '../services';
import { ProductPagedQueryResponse } from '@commercetools/platform-sdk';

export const getProductsFunc = (
  //   data: ProductPagedQueryResponse,
  setLoading: Dispatch<SetStateAction<boolean>>,
): Promise<ProductPagedQueryResponse> => {
  setLoading(true);
  return new Promise((resolve, reject) => {
    getProductsService()
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
