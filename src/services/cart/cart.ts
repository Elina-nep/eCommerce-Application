import { MyCartUpdateAction } from '@commercetools/platform-sdk';

import { ItemInCartChangeService } from '../../types';
import { formFlow } from '../BuildClient';

export const getCartService = () => formFlow().me().carts().get().execute();

export const createCartService = () =>
  formFlow()
    .me()
    .carts()
    .post({
      body: { currency: 'EUR' },
    })
    .execute();

type actions = 'addLineItem' | 'removeLineItem';

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
