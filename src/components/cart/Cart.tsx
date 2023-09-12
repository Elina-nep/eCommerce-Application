import './Cart.scss';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { changeCart, StoreType } from '../../store';
import {
  changeItemInCart,
  CURRENCY,
  discountCart,
  getCartTotalPrice,
  getDiscount,
} from '../../util';
import Button from '../buttons/Button';
import { ItemInCart } from './item/ItemInCart';

export const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: StoreType) => state.cart.cart);
  console.log(cart);
  const [code, setCode] = useState({ code: '', id: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (cart.discountCodes.length > 0) {
      const code = cart.discountCodes.find((el) => el.state === 'MatchesCart');
      if (code) {
        getDiscount(code.discountCode.id)
          .then((res) => {
            console.log(res);
            setCode({ code: res.code, id: res.id });
          })
          .catch((e) => {
            console.log(e.message);
          });
      }
    } else setCode({ code: '', id: '' });
  }, [cart]);

  const [couponInput, setCouponInput] = useState('');

  const handleAddDiscount = (couponInput: string) => {
    discountCart({
      discount: couponInput,
      cartVersion: cart.version,
      cartId: cart.id,
      action: 'addDiscountCode',
    })
      .then((res) => {
        dispatch(changeCart({ cart: res }));
        setErrorMessage('');
        setCouponInput('');
      })
      .catch((e) => {
        console.log(e.message);
        setErrorMessage(e.message || 'An error occurred');
      });
  };
  const handleDeleteDiscount = (id: string) => {
    discountCart({
      discountCode: id,
      cartVersion: cart.version,
      cartId: cart.id,
      action: 'removeDiscountCode',
    })
      .then((res) => {
        dispatch(changeCart({ cart: res }));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const total = getCartTotalPrice(cart, CURRENCY.symbol);
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
      <div className="cart__content-wrapper">
        <div className="cart__content-wrapper-table">
          {' '}
          <div className="cart__content-table-header">
            <p>Product</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
          </div>
          <div>
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
          </div>
        </div>{' '}
        <div className="cart__content-coupon">
          <div className="cart__content-total">
            {' '}
            <p className="cart__total">Cart Totals:</p>
            <p>TOTAL {total}</p>
          </div>
          <div className="cart__coupon_container">
            Coupon
            <input
              placeholder="coupon"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              className="cart__input"
            />
            <button
              onClick={() => handleAddDiscount(couponInput)}
              className="cart__coupon_btn"
            >
              Apply Coupon
            </button>
            <p className="cart__coupon_error">{errorMessage}</p>
          </div>
          <div>
            <p>Applied coupon: </p>
            <span onClick={() => handleDeleteDiscount(code.id)}>
              {code.code}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
