import './Cart.scss';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { changeCart, StoreType } from '../../store';
import { changeItemInCart } from '../../util';
import Button from '../buttons/Button';
import { Coupon } from './coupon/Coupon';
import { ItemInCart } from './item/ItemInCart';
import { Summary } from './summary/Summary';

export const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: StoreType) => state.cart.cart);

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
              disabled={cart.lineItems.length == 0}
              className="cart_page__btn"
              onClick={() => handleClearCart()}
            >
              Clear cart
            </Button>
          </div>
        </div>
        <div className="cart__aside">
          <Summary />
          <Coupon />
        </div>
      </div>
    </div>
  );
};
