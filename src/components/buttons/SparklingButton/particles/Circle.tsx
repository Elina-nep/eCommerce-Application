import React from 'react';

export const Circle = () => {
  return (
    <div className="particle">
      <svg viewBox="0 0 10 10">
        <circle cx="5" cy="5" r="5" fill="#ff814e" fillRule="evenodd" />
      </svg>
    </div>
  );
};