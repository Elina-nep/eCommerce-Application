import React from 'react';

import { Outlet } from 'react-router-dom';
import { Header } from '../components/header/Header';
import { Footer } from '../components/footer/Footer';
import './App.css';
import { Register } from './auth/Register';

export const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <div className="App">
        <Register />
      </div>
      <Footer />
    </>
  );
};
