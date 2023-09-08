import './Cart.scss';

import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthProvider';
import {
  changeItemInCart,
  CURRENCY,
  discountCart,
  getCartBeforeCoupon,
  getCartDiscount,
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

  const totalBeforeDiscount = getCartBeforeCoupon(cart, CURRENCY.EUR);
  const discount = getCartDiscount(cart, CURRENCY.EUR);
  const finalTotal = getCartTotalPrice(cart, CURRENCY.EUR);

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

      <div className="cart__payment">
        <div className="coupon">
          <div>
            <div className="coupon__new">
              <input
                placeholder="COUPON"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="coupon__new_input"
              />
              <button
                onClick={() => handleAddDiscount(couponInput)}
                className="coupon__new_btn"
              >
                Apply
              </button>
            </div>
            {errorMessage && (
              <p className="coupon__new_error">{errorMessage}</p>
            )}
          </div>

          {cart.discountCodes.length ? (
            <div className="coupon__current">
              <div className="coupon__current_container">
                <p className="coupon__current_title">Applied coupon: </p>
                <div className="coupon__current_content">
                  <span className="coupon__current_code">{code.code}</span>
                  <button
                    className="coupon__current_delete_btn"
                    onClick={() => handleDeleteDiscount(code.id)}
                  >
                    x
                  </button>
                </div>
              </div>
              <p className="coupon__current_tip">
                Please note, only one discount can be applied at a time.
              </p>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="cart__summary">
          <p className="cart__summary_title">Cart Total</p>

          {/* пока поставила вот такую дурацкую заслонку discount !== '0.00 EUR' */}
          {discount !== '0.00 EUR' ? (
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
          ) : (
            <p className="cart__summary_final">
              TOTAL<span>{finalTotal}</span>
            </p>
          )}
        </div>
      </div>

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
