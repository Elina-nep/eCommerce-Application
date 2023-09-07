import {
  Cart,
  CartPagedQueryResponse,
  DiscountCode,
} from '@commercetools/platform-sdk';
import { Dispatch, SetStateAction } from 'react';

import {
  changeItemInCartService,
  createCartService,
  discountCartService,
  getCartService,
  getDiscountService,
} from '../services';
import { DiscountCartService, ItemInCartChangeService } from '../types';

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

export const getDiscount = (id: string): Promise<DiscountCode> => {
  return new Promise((resolve, reject) => {
    getDiscountService(id)
      .then((body) => {
        resolve(body.body);
      })
      .catch((e) => {
        const errorMessage = e.message || 'An error occurred';
        reject(new Error(errorMessage));
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

export const changeItemInCart = ({
  sku,
  cartVersion,
  cartId,
  cartItemId,
  action,
  quantity,
}: ItemInCartChangeService): Promise<Cart> => {
  return new Promise((resolve, reject) => {
    changeItemInCartService({
      sku,
      cartVersion,
      cartId,
      action,
      cartItemId,
      quantity,
    })
      .then((body) => {
        resolve(body.body);
      })
      .catch((e) => {
        const errorMessage = e.message || 'An error occurred';
        reject(new Error(errorMessage));
      });
  });
};
export const discountCart = ({
  discount,
  discountCode,
  cartVersion,
  cartId,
  action,
}: DiscountCartService): Promise<Cart> => {
  return new Promise((resolve, reject) => {
    discountCartService({
      discount,
      discountCode,
      cartVersion,
      cartId,
      action,
    })
      .then((body) => {
        resolve(body.body);
      })
      .catch((e) => {
        const errorMessage = e.message || 'An error occurred';
        reject(new Error(errorMessage));
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
