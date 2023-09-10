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
import { Summary } from './summary/Summary';

export const Cart = () => {
  const { cart, setCart } = useContext(AuthContext);
  console.log('here', cart);

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
      <div className="cart__wrapper">
        <div className="cart__table">
          {cart.lineItems.length < 1 ? (
            <div className="cart__table_empty">Your cart is empty</div>
          ) : (
            <div className="cart__table_header">
              <p>Product</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
            </div>
          )}
          {cart.lineItems.map((el) => (
            <ItemInCart product={el} key={el.id} />
          ))}
          <div className="cart__button_container">
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
        </div>
        <div className="cart__aside">
          <Summary
            totalBeforeDiscount={totalBeforeDiscount}
            discount={discount}
            finalTotal={finalTotal}
          />
          <Coupon />
        </div>
      </div>
    </div>
  );
};
