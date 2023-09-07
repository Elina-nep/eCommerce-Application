import './ItemInCart.scss';

import React from 'react';
import { useContext } from 'react';

import { AuthContext } from '../../../context/AuthProvider';
import { IItemInCartProps } from '../../../types';
import {
  CURRENCY,
  getItemDiscountedPrice,
  getItemImage,
  getItemPrice,
  getItemTotalPrice,
  LANGUAGE,
} from '../../../util';
import { changeItemInCart } from '../../../util';

export const ItemInCart: React.FC<IItemInCartProps> = ({ product }) => {
  const image = getItemImage(product);
  const name = product.name[LANGUAGE.EN];
  const quantity = product.quantity;
  const price = getItemPrice(product, CURRENCY.EUR);
  const discountedPrice = getItemDiscountedPrice(product, CURRENCY.EUR);
  const total = getItemTotalPrice(product, CURRENCY.EUR);

  console.log('ITEM', product);
  const { cart, setCart } = useContext(AuthContext);

  const handleItemInCartAction = (
    sku: string,
    action: string,
    productInCartId: string,
    quantity: number,
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
        <button
          className="item__delete_btn"
          onClick={() => {
            handleItemInCartAction(
              product.variant.sku || '',
              'removeLineItem',
              product.id || '',
              product.quantity,
            );
          }}
        >
          x
        </button>
      </div>
      <div className="item__col">
        <img src={image} alt={name} className="item__image" />
      </div>
      <div className="item__col name">{name}</div>
      <div className="item__col price">{price}</div>
      <div className="item__col discountedPrice">{discountedPrice}</div>
      <div className="item__col quantity">
        <button
          className="item__quantity_btn"
          onClick={() => {
            handleItemInCartAction(
              product.variant.sku || '',
              'removeLineItem',
              product.id || '',
              1,
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
              product.variant.sku || '',
              'addLineItem',
              cart.id,
              1,
            );
          }}
        >
          +
        </button>
      </div>
      <div className="item__col total">{total}</div>
    </div>
  );
};
