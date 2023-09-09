import './Coupon.scss';

import { useContext, useEffect, useState } from 'react';
import React from 'react';

import { AuthContext } from '../../../context/AuthProvider';
import { discountCart, getDiscount } from '../../../util';

export const Coupon: React.FC = () => {
  const { cart, setCart } = useContext(AuthContext);
  const [code, setCode] = useState({ code: '', id: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [couponInput, setCouponInput] = useState('');

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

  console.log('here', cart.discountCodes);

  return (
    <div className="coupon">
      {errorMessage && <p className="coupon__new_error">{errorMessage}</p>}

      {cart.discountCodes.length ? (
        <div className="coupon__current">
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
      ) : (
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
      )}
    </div>
  );
};
