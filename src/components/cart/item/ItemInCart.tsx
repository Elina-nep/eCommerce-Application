import './ItemInCart.scss';

import React from 'react';
import { useContext } from 'react';

import { AuthContext } from '../../../context/AuthProvider';
import { IItemInCartProps, ItemInCartChange } from '../../../types';
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
  const price = getItemPrice(product, CURRENCY.SYMBOL);
  const discountedPrice = getItemDiscountedPrice(product, CURRENCY.SYMBOL);
  const total = getItemTotalPrice(product, CURRENCY.SYMBOL);
  const { cart, setCart } = useContext(AuthContext);

  const handleItemInCartAction = ({
    action,
    quantity,
    cartItemId,
    sku,
  }: ItemInCartChange) => {
    changeItemInCart({
      sku,
      cartVersion: cart.version,
      cartId: cart.id,
      action,
      cartItemId,
      quantity,
    })
      .then((res) => setCart(res))
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <div>
      <div className="item__container">
        <div className="item__col">
          <Button
            className="item__col_remove-btn"
            onClick={() => {
              handleItemInCartAction({
                action: 'removeLineItem',
                quantity: product.quantity,
                cartItemId: product.id,
              });
            }}
          >
            x
          </Button>
        </div>
        <div className="item__col">
          <img src={image} alt={name} className="item__image" />
        </div>
        <div className="item__col">{name}</div>
        <div className="item__col price">
          {discountedPrice ? (
            <>
              <span className="discount-price">{discountedPrice}</span>
              <span style={{ textDecoration: 'line-through' }}>{price}</span>
            </>
          ) : (
            <span>{price}</span>
          )}
        </div>
        <div className="item__col item__quantity">
          <button
            className="item__quantity_btn"
            onClick={() => {
              handleItemInCartAction({
                action: 'removeLineItem',
                quantity: 1,
                cartItemId: product.id,
              });
            }}
          >
            -
          </button>
          <div>{quantity}</div>
          <button
            className="item__quantity_btn"
            onClick={() => {
              handleItemInCartAction({
                action: 'addLineItem',
                quantity: 1,
                sku: product.variant.sku,
              });
            }}
          >
            +
          </button>
        </div>
        <div className="item__col">{total}</div>
      </div>
    </div>
  );
};
