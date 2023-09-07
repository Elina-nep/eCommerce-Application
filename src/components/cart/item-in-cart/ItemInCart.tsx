import './ItemInCart.scss';

import React from 'react';

import { IItemInCartProps } from '../../../types';
import {
  CURRENCY,
  getItemDiscountedPrice,
  getItemImage,
  getItemPrice,
  getItemTotalPrice,
  LANGUAGE,
} from '../../../util';

export const ItemInCart: React.FC<IItemInCartProps> = ({ product }) => {
  console.log('HERE', product);
  const image = getItemImage(product);
  const name = product.name[LANGUAGE.EN];
  const quantity = product.quantity;
  const price = getItemPrice(product, CURRENCY.EUR);
  const discountedPrice = getItemDiscountedPrice(product, CURRENCY.EUR);
  const total = getItemTotalPrice(product, CURRENCY.EUR);

  return (
    <div className="item__container">
      <div className="item__col">
        <button className="item__delete_btn">x</button>
      </div>
      <div className="item__col">
        <img src={image} alt={name} className="item__image" />
      </div>
      <div className="item__col name">{name}</div>
      <div className="item__col price">{price}</div>
      <div className="item__col discountedPrice">{discountedPrice}</div>
      <div className="item__col quantity">
        <button className="item__quantity_btn">-</button>
        {quantity}
        <button className="item__quantity_btn">+</button>
      </div>
      <div className="item__col total">{total}</div>
    </div>
  );
};
