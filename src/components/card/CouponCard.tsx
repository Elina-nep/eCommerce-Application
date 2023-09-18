import './CouponCard.scss';

import React from 'react';

import { CardProps } from '../../types';
import Button from '../buttons/Button';

const Card: React.FC<CardProps> = ({ card, handleLearnMoreClick }) => {
  return (
    <>
      <div className="coupon-card">
        <h3 className="coupon-card-title">{card.discountText}</h3>
        <img className="coupon-card-img" src={card.image} alt="Card" />

        <div className="special_hover_container">
          <Button
            onClick={() => handleLearnMoreClick(card)}
            className="coupon_card__button"
          >
            Learn more
          </Button>
        </div>
      </div>
    </>
  );
};

export default Card;
