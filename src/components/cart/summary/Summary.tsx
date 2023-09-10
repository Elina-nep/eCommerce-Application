import './Summary.scss';

import React from 'react';

import { ISummaryProps } from '../../../types';

export const Summary: React.FC<ISummaryProps> = ({
  totalBeforeDiscount,
  discount,
  finalTotal,
}) => {
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
