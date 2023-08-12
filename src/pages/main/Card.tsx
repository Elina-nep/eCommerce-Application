import React from 'react';
import Button from '../../components/buttons/Button';
import { CardProps } from '../../types';

const Card: React.FC<CardProps> = ({ card, handleLearnMoreClick }) => {
  return (
    <>
      <div className="card">
        <h3 className="card-title">{card.discountText}</h3>
        <img src={card.image} alt="Card" />

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
