import { Cart, DiscountCode } from '@commercetools/platform-sdk';

import {
  changeItemInCartService,
  createCartService,
  discountCartService,
  getCartService,
  getDiscountService,
} from '../services';
import { DiscountCartService, ItemInCartChangeService } from '../types';

export const getCart = (): Promise<Cart> => {
  return new Promise((resolve, reject) => {
    getCartService()
      .then((body) => {
        resolve(body.body);
      })
      .catch((e) => {
        const errorMessage = e.message || 'An error occurred';
        reject(new Error(errorMessage));
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

export function getCartTotalPrice(cart: Cart, currency: string) {
  const total = (cart.totalPrice.centAmount / 100).toFixed(2);
  return `${total} ${currency}`;
}
