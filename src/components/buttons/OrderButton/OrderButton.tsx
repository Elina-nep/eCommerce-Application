import './OrderButton.scss';

import gsap from 'gsap';
import React, { useState } from 'react';

export const OrderButton: React.FC = () => {
  const [isButtonDone] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);

  const handleClick = () => {
    if (!isOrdered) {
      animateButton();
      setIsOrdered(true);
    } else {
      resetButton();
      setIsOrdered(false);
    }
  };

  const animateButton = () => {
    const button = document.querySelector('.truck-button') as HTMLDivElement;
    const box = button.querySelector('.box') as HTMLDivElement;
    const truck = button.querySelector('.truck') as HTMLDivElement;

    if (!button.classList.contains('done')) {
      if (!button.classList.contains('animation')) {
        button.classList.add('animation');

        gsap.to(button, {
          '--box-s': 1,
          '--box-o': 1,
          duration: 0.3,
          delay: 0.5,
        });

        gsap.to(box, {
          x: 0,
          duration: 0.4,
          delay: 0.7,
        });

        gsap.to(button, {
          '--hx': -5,
          '--bx': 50,
          duration: 0.18,
          delay: 0.92,
        });

        gsap.to(box, {
          y: 0,
          duration: 0.1,
          delay: 1.15,
        });

        gsap.set(button, {
          '--truck-y': 0,
          '--truck-y-n': -26,
        });

        gsap.to(button, {
          '--truck-y': 1,
          '--truck-y-n': -25,
          duration: 0.2,
          delay: 1.25,
          onComplete() {
            gsap
              .timeline({
                onComplete() {
                  button.classList.add('done');
                },
              })
              .to(truck, {
                x: 0,
                duration: 0.4,
              })
              .to(truck, {
                x: 40,
                duration: 1,
              })
              .to(truck, {
                x: 20,
                duration: 0.6,
              })
              .to(truck, {
                x: 96,
                duration: 0.4,
              });

            gsap.to(button, {
              '--progress': 1,
              duration: 2.4,
              ease: 'power2.in',
            });
          },
        });
      }
    }
  };

  const resetButton = () => {
    const button = document.querySelector('.truck-button') as HTMLDivElement;
    const truck = button.querySelector('.truck') as HTMLDivElement;

    button.classList.remove('animation', 'done');
    gsap.set(truck, {
      x: 4,
    });

    gsap.set(button, {
      '--progress': 0,
      '--hx': 0,
      '--bx': 0,
      '--box-s': 0.5,
      '--box-o': 0,
      '--truck-y': 0,
      '--truck-y-n': -26,
    });

    const box = button.querySelector('.box') as HTMLDivElement;
    gsap.set(box, {
      x: -24,
      y: -6,
    });
  };

  return (
    <div className="order_button_wrapper">
      <button
        className={`truck-button ${isButtonDone ? 'done' : ''}`}
        onClick={handleClick}
      >
        <span className="default">Complete Order</span>
        <span className="success">Order Placed</span>
        <div className="truck">
          <div className="wheel"></div>
          <div className="back"></div>
          <div className="front"></div>
          <div className="box"></div>
        </div>
      </button>
    </div>
  );
};
