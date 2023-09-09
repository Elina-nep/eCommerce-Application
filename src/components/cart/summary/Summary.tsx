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
      <p className="summary_subtotal">
        Subtotal:
        <span>{totalBeforeDiscount}</span>
      </p>
      <p className="summary_discount">
        Discount:
        <span>{discount}</span>
      </p>
      <p className="summary_final">
        TOTAL<span>{finalTotal}</span>
      </p>
    </div>
  );
};
