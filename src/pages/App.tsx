import React from 'react';

import { Outlet } from 'react-router-dom';
import { Header } from '../components/header/Header';
import { Footer } from '../components/footer/Footer';
import { Message } from '../components/message/Message';

export const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Message />
      <Footer />
    </>
  );
};
