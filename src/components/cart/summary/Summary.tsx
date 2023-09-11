import './Summary.scss';

import React from 'react';
import { useContext } from 'react';

import { AuthContext } from '../../../context/AuthProvider';
import {
  CURRENCY,
  getCartBeforeCoupon,
  getCartDiscount,
  getCartTotalPrice,
} from '../../../util';

export const Summary: React.FC = ({}) => {
  const { cart } = useContext(AuthContext);
  const totalBeforeDiscount = getCartBeforeCoupon(cart, CURRENCY.SYMBOL);
  const discount = getCartDiscount(cart, CURRENCY.SYMBOL);
  const finalTotal = getCartTotalPrice(cart, CURRENCY.SYMBOL);

  return (
    <div className="summary">
      <h2 className="summary__title">Cart Totals</h2>
      {discount && (
        <div className="summary__row summary_subtotal">
          <p>Subtotal:</p>
          <span>{totalBeforeDiscount}</span>
        </div>
      )}
      {discount && (
        <div className="summary__row summary_discount">
          <p>Discount:</p>
          <span>{discount}</span>
        </div>
      )}
      <div className="summary__row summary_final">
        <p>TOTAL</p>
        <span>{finalTotal}</span>
      </div>
    </div>
  );
};
