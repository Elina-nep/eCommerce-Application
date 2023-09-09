import './Cart.scss';

import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthProvider';
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
  const { cart, setCart } = useContext(AuthContext);
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
  }, [cart]); // это для того, чтобы отображать примененный к корзине и активный купон, можно перенести в отдельный компонент

  const [couponInput, setCouponInput] = useState('');

  const handleAddDiscount = (couponInput: string) => {
    discountCart({
      discount: couponInput,
      cartVersion: cart.version,
      cartId: cart.id,
      action: 'addDiscountCode',
    })
      .then((res) => {
        setCart(res);
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
        setCart(res);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const total = getCartTotalPrice(cart, CURRENCY.EUR);
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
            {/* отображаем номер примененного купона, при нажатии на него он удаляется, пока без красоты) */}
          </div>
        </div>
      </div>
    </div>
  );
};
