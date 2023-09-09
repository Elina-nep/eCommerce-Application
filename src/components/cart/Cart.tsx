import './Cart.scss';

import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthProvider';
import {
  changeItemInCart,
  CURRENCY,
  getCartBeforeCoupon,
  getCartDiscount,
  getCartTotalPrice,
} from '../../util';
import Button from '../buttons/Button';
import { Coupon } from './coupon/Coupon';
import { ItemInCart } from './item/ItemInCart';

export const Cart = () => {
  const { cart, setCart } = useContext(AuthContext);

  const totalBeforeDiscount = getCartBeforeCoupon(cart, CURRENCY.SYMBOL);
  const discount = getCartDiscount(cart, CURRENCY.SYMBOL);
  const finalTotal = getCartTotalPrice(cart, CURRENCY.SYMBOL);

  const handleClearCart = () => {
    const itemsQuantities: number[] = [];
    const itemsIds = cart.lineItems.map((el) => {
      itemsQuantities.push(el.quantity);
      return el.id;
    });
    changeItemInCart({
      cartVersion: cart.version,
      cartId: cart.id,
      action: 'removeLineItem',
      cartItemId: itemsIds,
      quantity: itemsQuantities,
    })
      .then((res) => {
        setCart(res);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <div className="cart">
      <h1 className="cart__title">SHOPPING CART</h1>
      <div className="cart__content-wrapper">
        <div className="cart__content-wrapper-table">
          {' '}
          <div className="cart__content-table-header">
            <p>Product</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
          </div>
          {cart.lineItems.map((el) => (
            <ItemInCart product={el} key={el.id} />
          ))}
          <div className="cart__content-table-button">
            {' '}
            <Link to="/catalog" className="cart_page__link">
              &#8592; Continue Shopping
            </Link>
            <Button
              className="cart_page__btn"
              onClick={() => handleClearCart()}
            >
              Clear cart
            </Button>
          </div>
        </div>{' '}
        <div className="cart__content-coupon">
          <div className="cart__content-total">
            {' '}
            <p className="cart__total">Cart Totals:</p>
            <div className="cart__summary_amounts">
              <p className="cart__summary_subtotal">
                Subtotal:
                <span>{totalBeforeDiscount}</span>
              </p>
              <p className="cart__summary_discount">
                Discount:
                <span>{discount}</span>
              </p>
              <p className="cart__summary_final">
                TOTAL<span>{finalTotal}</span>
              </p>
            </div>
          </div>
          <Coupon />
        </div>
      </div>
    </div>
  );
};
