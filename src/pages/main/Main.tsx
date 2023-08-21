import React from 'react';
import Slider from '../../components/slider/Slider';

import './Main.css';
import { Message } from '../../components/message/Message';

export const MainPage = () => {
  return (
    <main className="main-page">
      <div className="main-page-container">
        <Slider />
      </div>
      <Message />
    </main>
  );
};
