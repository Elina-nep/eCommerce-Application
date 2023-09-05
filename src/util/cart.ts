import { Cart, CartPagedQueryResponse } from '@commercetools/platform-sdk';
import { Dispatch, SetStateAction } from 'react';

import {
  addItemToCartService,
  createCartService,
  getCartService,
} from '../services';

export const getCart = (
  setLoading: Dispatch<SetStateAction<boolean>>,
): Promise<CartPagedQueryResponse> => {
  setLoading(true);

  return new Promise((resolve, reject) => {
    getCartService()
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
export const createCart = (): Promise<Cart> => {
  return new Promise((resolve, reject) => {
    createCartService()
      .then((body) => {
        resolve(body.body);
      })
      .catch((e) => {
        const errorMessage = e.message || 'An error occurred';
        reject(new Error(errorMessage));
      });
  });
};
export const addItemToCart = (
  sku: string,
  cartVersion: number,
  cartId: string,
): Promise<Cart> => {
  return new Promise((resolve, reject) => {
    addItemToCartService(sku, cartVersion, cartId)
      .then((body) => {
        console.log(body.body);
        resolve(body.body);
      })
      .catch((e) => {
        const errorMessage = e.message || 'An error occurred';
        reject(new Error(errorMessage));
        console.log(e.message);
      });
  });
};

export const defaultCart: Cart = {
  id: '',
  version: 0,
  lineItems: [],
  customLineItems: [],
  totalPrice: {
    type: 'centPrecision',
    centAmount: 0,
    currencyCode: 'EUR',
    fractionDigits: 2,
  },
  taxMode: '',
  taxRoundingMode: '',
  taxCalculationMode: '',
  inventoryMode: '',
  cartState: '',
  shippingMode: '',
  shipping: [],
  itemShippingAddresses: [],
  discountCodes: [],
  directDiscounts: [],
  refusedGifts: [],
  origin: '',
  createdAt: '',
  lastModifiedAt: '',
};
