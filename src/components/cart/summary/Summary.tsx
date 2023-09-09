import './Summary.scss';

import React from 'react';
interface ISummaryProps {
  totalBeforeDiscount?: string;
  discount?: string;
  finalTotal: string;
}

export const Summary: React.FC<ISummaryProps> = ({
  totalBeforeDiscount,
  discount,
  finalTotal,
}) => {
  return (
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
    </div>
  );
};
