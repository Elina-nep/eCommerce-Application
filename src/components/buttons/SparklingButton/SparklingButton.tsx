import './SparklingButton.scss';

import React, { useState } from 'react';

import { IButtonProps } from '../../../types';
import { Circle } from './particles/Circle';
import { Donut } from './particles/Donut';
import { SquHollow } from './particles/Squ_hollow';
import { Triangle } from './particles/Triangle';
import { TriHollow } from './particles/TriHollow';

const availableElements = [Circle, Donut, SquHollow, Triangle, TriHollow];

export const SparklingButton: React.FC<IButtonProps> = ({
  onClick,
  children,
  className,
  disabled = false,
}) => {
  const [particles, setParticles] = useState<JSX.Element[]>([]);

  const explode = () => {
    const newParticles: JSX.Element[] = [];

    const rand = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    for (let i = 0; i < 10; i++) {
      const RandomElement =
        availableElements[Math.floor(Math.random() * availableElements.length)];
      const x = rand(80, 150) * Math.cos((2 * Math.PI * i) / rand(10, 20));
      const y = rand(80, 150) * Math.sin((2 * Math.PI * i) / rand(10, 20));
      const deg = rand(0, 360) + 'deg';
      const scale = rand(0.5, 1.1);
      const delay = i * 10;

      newParticles.push(
        <div
          key={i}
          className="particles"
          style={{
            top: y + 'px',
            left: x + 'px',
            transform: `scale(${scale}) rotate(${deg})`,
            transitionDelay: `${delay}ms`,
          }}
        >
          <RandomElement />
        </div>,
      );
    }
    setParticles(newParticles);
    setTimeout(() => {
      setParticles([]);
    }, 400);
  };

  return (
    <div className="sparkling_button_wrapper">
      <button
        disabled={disabled}
        onClick={(e) => {
          if (e) e.stopPropagation();
          !disabled && onClick && onClick(e);
          explode();
        }}
        className={`sparkling_button ${className}`}
      >
        {children}
      </button>
      {particles}
    </div>
  );
};
