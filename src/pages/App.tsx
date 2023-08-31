import React from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
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
