import './ItemInCart.scss';

import React from 'react';
import { useContext } from 'react';

import { AuthContext } from '../../../context/AuthProvider';
import { IItemInCartProps } from '../../../types';
import {
  changeItemInCart,
  CURRENCY,
  getItemDiscountedPrice,
  getItemImage,
  getItemPrice,
  getItemTotalPrice,
  LANGUAGE,
} from '../../../util';
import Button from '../../buttons/Button';

export const ItemInCart: React.FC<IItemInCartProps> = ({ product }) => {
  const image = getItemImage(product);
  const name = product.name[LANGUAGE.EN];
  const quantity = product.quantity;
  const price = getItemPrice(product, CURRENCY.EUR);
  const discountedPrice = getItemDiscountedPrice(product, CURRENCY.EUR);
  const total = getItemTotalPrice(product, CURRENCY.EUR);

  const { cart, setCart } = useContext(AuthContext);

  const handleItemInCartAction = (
    action: string,
    quantity: number,
    productInCartId?: string,
    sku?: string,
  ) => {
    changeItemInCart({
      sku,
      cartVersion: cart.version,
      cartId: cart.id,
      action,
      cartItemId: productInCartId,
      quantity,
    })
      .then((res) => setCart(res))
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <div className="item__container">
      <div className="item__col">
        <Button
          onClick={() => {
            handleItemInCartAction(
              'removeLineItem',
              product.quantity,
              product.id || '',
            );
          }}
        >
          x
        </Button>
      </div>
      <div className="item__col">
        <img src={image} alt={name} className="item__image" />
      </div>
      <div className="item__col">{name}</div>
      <div className="item__col">{price}</div>
      <div className="item__col">{discountedPrice}</div>
      <div className="item__col item__quantity">
        <button
          className="item__quantity_btn"
          onClick={() => {
            handleItemInCartAction(
              'removeLineItem',
              1,
              product.id,
              product.variant.sku || '',
            );
          }}
        >
          -
        </button>
        {quantity}
        <button
          className="item__quantity_btn"
          onClick={() => {
            handleItemInCartAction(
              'addLineItem',
              1,
              cart.id,
              product.variant.sku || '',
            );
          }}
        >
          +
        </button>
      </div>
      <div className="item__col">{total}</div>
    </div>
  );
};
