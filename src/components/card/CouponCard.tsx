import './CouponCard.css';

import React from 'react';

import { CardProps } from '../../types';
import Button from '../buttons/Button';

const Card: React.FC<CardProps> = ({ card, handleLearnMoreClick }) => {
  return (
    <>
      <div className="coupon-card">
        <h3 className="coupon-card-title">{card.discountText}</h3>
        <img className="coupon-card-img" src={card.image} alt="Card" />

        <Button
          onClick={() => handleLearnMoreClick(card)}
          className="button-info"
        >
          Learn more
        </Button>
      </div>
    </>
  );
};

export default Card;
