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

  const [currentCouponVisible, setCurrentCouponVisible] = useState(false);

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
        setCurrentCouponVisible(true);
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
        setCurrentCouponVisible(false);
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

      {cart.lineItems.map((el) => (
        <ItemInCart product={el} key={el.id} />
      ))}

      <div className="cart__coupon_container">
        {/* Coupon */}
        <input
          placeholder="coupon"
          value={couponInput}
          onChange={(e) => setCouponInput(e.target.value)}
          className="cat__input"
        />
        <button
          onClick={() => handleAddDiscount(couponInput)}
          className="cart__coupon_btn"
        >
          Apply Coupon
        </button>
        <p className="cart__coupon_error">{errorMessage}</p>
      </div>

      {currentCouponVisible ? (
        <div>
          <p>Applied coupon: </p>
          <div className="TEST">
            <span className="cart__coupon_current">{code.code}</span>
            <span
              className="cart__coupon_close_btn"
              onClick={() => handleDeleteDiscount(code.id)}
            >
              x
            </span>
          </div>

          {/* отображаем номер примененного купона, при нажатии на него он удаляется, пока без красоты) */}
        </div>
      ) : (
        ''
      )}

      <p className="cart__total">TOTAL: {total}</p>

      <div className="cart__container_btn">
        <Link to="/" className="cart_page__link">
          Back to shopping
        </Link>
        <button className="cart__clear_btn" onClick={() => handleClearCart()}>
          Clear cart
        </button>
      </div>
    </div>
  );
};
