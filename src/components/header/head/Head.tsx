import './Head.scss';

import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import imageToAddCottoncandy from '../../../assets/cotton-candy.png';
import { ReactComponent as Star } from '../../../assets/star-solid.svg';
import {
  AppDispatch,
  clearCart,
  getCartThunk,
  logout,
  StoreType,
} from '../../../store';

const Head = () => {
  const dispatch = useDispatch<AppDispatch>();
  const ifAuth = useSelector((state: StoreType) => state.ifAuth.ifAuth);
  const cart = useSelector((state: StoreType) => state.cart.cart);
  const navigate = useNavigate();

  return (
    <div className="head">
      <div className="headnav">
        <Link to="/" className="store-name">
          <div className="logo">
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
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
            {cart.totalLineItemQuantity} <AiOutlineShoppingCart />
            €‎{cart.totalPrice.centAmount / 100}
          </Link>
        </div>
        <div className="registration-links">
          {ifAuth ? (
            <button
              className="logout"
              onClick={() => {
                dispatch(logout());
                dispatch(clearCart());
                dispatch(getCartThunk());
                navigate('/');
              }}
            >
              Log out
            </button>
          ) : (
            <>
              <Link to="login" className="login">
                Sign in
              </Link>
              <Link to="register" className="register">
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
