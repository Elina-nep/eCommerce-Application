import React, { useState } from 'react';
import { cards } from './constants';
import Card from './Card';
import Button from '../../components/buttons/Button';
import { CardData } from '../../types';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? cards.length - 7 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === cards.length - 7 ? 0 : prev + 1));
  };

  const handleLearnMoreClick = (card: CardData) => {
    console.log('Learn more clicked for card:', card);
  };

  return (
    <div className="slider">
      <Button onClick={prevSlide} className="button-pagination">
        {'<'}
      </Button>

      <div className="slide-container">
        <div
          className="cards"
          style={{
            transform: `translateX(-${currentSlide * 102}%)`,
            transition: 'transform 0.5s ease',
            width: `${cards.length * 102}%`,
          }}
        >
          {cards.map((card, index) => (
            <Card
              card={card}
              key={index}
              handleLearnMoreClick={handleLearnMoreClick}
            />
          ))}
        </div>
      </div>

      <Button onClick={nextSlide} className="button-pagination">
        {'>'}
      </Button>
    </div>
  );
};

export default Slider;
