import React from 'react';

import { Outlet } from 'react-router-dom';
import { Header } from '../components/header/Header';
import { Footer } from '../components/footer/Footer';
import './App.css';

export const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
