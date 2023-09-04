import './Main.css';

import React from 'react';

import Slider from '../../components/slider/Slider';

export const MainPage = () => {
  return (
    <main className="main-page main-container">
      <div className="main-page-container">
        <Slider />
      </div>
    </main>
  );
};
