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

export const addItemToCartService = (
  sku: string,
  cartVersion: number,
  cartId: string,
) =>
  formFlow()
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: [
          {
            action: 'addLineItem',
            sku: sku,
            quantity: 1,
          },
        ],
      },
    })
    .execute();
