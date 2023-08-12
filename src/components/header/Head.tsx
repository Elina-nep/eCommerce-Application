import React from 'react';
import { Link } from 'react-router-dom';
import { HeadProps } from '../../types';
import './Head.css';

const Head: React.FC<HeadProps> = ({ cartTotal, cartItemsCount }) => {
  return (
    <div className="head">
      <div className="headnav">
        <div className="logo">
          <div className="logo-picture">
            <img src={process.env.PUBLIC_URL + 'assets/вата.png'} alt="logo" />
          </div>
          <div className="store-title">
            <Link to="/" className="store-name">
              Enchant Fest
            </Link>
            <br />
            <span className="slogan">Unleash the Magic of Festivals</span>
          </div>
        </div>
        <div className="cart">
          <Link to="cart">
            CART / ${cartTotal.toFixed(2)} gds: {cartItemsCount}
          </Link>
        </div>

        <div className="links">
          <Link to="login" className="login">
            Sign in
          </Link>
          <Link to="register" className="register">
            Sign up
          </Link>{' '}
          <br />
          <Link to="logout" className="logout">
            Log out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Head;
