import './Cart.scss';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { changeAlert, changeCart, StoreType } from '../../store';
import { changeItemInCart } from '../../util';
import Button from '../buttons/Button';
import { OrderButton } from '../buttons/OrderButton/OrderButton';
import { Coupon } from './coupon/Coupon';
import { ItemInCart } from './item/ItemInCart';
import { CartModal } from './modal/CartModal';
import { Summary } from './summary/Summary';

export const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: StoreType) => state.cart.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        dispatch(changeCart({ cart: res }));
        dispatch(changeAlert({ alertMessage: 'Cart cleared' }));
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
            <Link
              to={{
                pathname: `/catalog`,
                search: 'category=all',
              }}
              className="page__link"
            >
              &#8592; Continue Shopping
            </Link>
            <Button
              disabled={cart.lineItems.length == 0}
              className="cart_page__btn"
              onClick={() => {
                setIsModalOpen(true);
                console.log(isModalOpen);
              }}
            >
              Clear cart
            </Button>
          </div>
        </div>
        <div className="cart__aside">
          <Summary />
          <Coupon />
          <OrderButton />
        </div>
      </div>
      {isModalOpen && (
        <CartModal
          closeModal={() => {
            setIsModalOpen(false);
          }}
          handleClearCart={handleClearCart}
        />
      )}
    </div>
  );
};
