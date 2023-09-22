import { MyCartUpdateAction } from '@commercetools/platform-sdk';

import { DiscountCartService, ItemInCartChangeService } from '../../types';
import { formFlow } from '../BuildClient';

export const getCartService = () =>
  formFlow().me().activeCart().get().execute();

export const getDiscountService = (id: string) =>
  formFlow().discountCodes().withId({ ID: id }).get().execute();

export const createCartService = () =>
  formFlow()
    .me()
    .carts()
    .post({
      body: { currency: 'EUR' },
    })
    .execute();

type actions =
  | 'addLineItem'
  | 'removeLineItem'
  | 'removeDiscountCode'
  | 'addDiscountCode';

export const changeItemInCartService = ({
  sku,
  cartVersion,
  cartId,
  cartItemId,
  action,
  quantity,
}: ItemInCartChangeService) => {
  const actions = [];
  if (Array.isArray(cartItemId) && Array.isArray(quantity)) {
    cartItemId.map((el, i) => {
      actions.push({
        action: action as actions,
        sku,
        lineItemId: el,
        quantity: quantity[i],
      });
    });
  } else
    actions.push({
      action: action as actions,
      sku,
      lineItemId: cartItemId,
      quantity,
    });
  return formFlow()
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: actions as MyCartUpdateAction[],
      },
    })
    .execute();
};

export const discountCartService = ({
  discount, //user input of discount
  discountCode, // uniq id of cart discount, used when deleting
  cartVersion,
  cartId,
  action,
}: DiscountCartService) => {
  const actions = [];
  if (action === 'addDiscountCode') {
    actions.push({
      action: action as actions,
      code: discount,
    });
  } else {
    actions.push({
      action: action as actions,
      discountCode: { typeId: 'discount-code', id: discountCode || '' },
    });
  }

  return formFlow()
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: actions as MyCartUpdateAction[],
      },
    })
    .execute();
};
