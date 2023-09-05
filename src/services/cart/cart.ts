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
}: ItemInCartChangeService) =>
  formFlow()
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: [
          {
            action: action as actions,
            sku: sku,
            lineItemId: cartItemId,
            quantity,
          },
        ],
      },
    })
    .execute();
