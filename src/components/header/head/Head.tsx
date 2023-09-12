import './Head.scss';

import React, { useContext } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

import imageToAddCottoncandy from '../../../assets/cotton-candy.png';
import { AuthContext } from '../../../context/AuthProvider';

const Head = () => {
  const { ifAuth, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const { cart } = useContext(AuthContext);

  return (
    <div className="head">
      <div className="headnav">
        <Link to="/" className="store-name">
          <div className="logo">
            <div className="logo-picture">
              <img
                className="logo-img"
                src={imageToAddCottoncandy}
                alt="logo"
              />
            </div>
            <div className="store-title">
              Enchant Fest <br />
              <span className="slogan">Unleash the Magic of Festivals</span>
            </div>
          </div>
        </Link>
        <div className="cart__link">
          <Link to="/cart">
            <AiOutlineShoppingCart /> {cart.totalLineItemQuantity} ( €‎
            {cart.totalPrice.centAmount / 100} )
          </Link>
        </div>
        <div className="registration-links">
          {ifAuth ? (
            <button
              className="dark_button logout"
              onClick={() => {
                logOut();
                navigate('/');
              }}
            >
              Log out
            </button>
          ) : (
            <>
              <Link to="login" className="primary_button login">
                Sign in
              </Link>
              <Link to="register" className="secondary_button register">
                Sign up
              </Link>
              <br />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Head;
