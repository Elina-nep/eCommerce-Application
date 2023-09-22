import React from 'react';

interface SliderIndicatorProps {
  totalSlides: number;
  currentSlide: number;
}

const SliderIndicator = ({
  totalSlides,
  currentSlide,
}: SliderIndicatorProps) => {
  return (
    <div className="slider-indicator">
      {Array.from(Array(totalSlides).keys()).map((index) => (
        <div
          key={index}
          className={`slider__indicator-dot ${
            index === currentSlide ? 'active' : ''
          }`}
        />
      ))}
    </div>
  );
};

export default SliderIndicator;
