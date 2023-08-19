import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import './Head.css';
import imageToAddCottoncandy from '../../../assets/cotton-candy.png';
import { HeadProps } from '../../../types/cart';

const Head: React.FC<HeadProps> = ({ cartTotal, cartItemsCount }) => {
  const { ifAuth, logOut } = useContext(AuthContext);

  return (
    <div className="head">
      <div className="headnav">
        <div className="logo">
          <div className="logo-picture">
            <img src={imageToAddCottoncandy} alt="logo" />
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
          <Link to="#">
            CART / ${cartTotal.toFixed(2)} gds: {cartItemsCount}
          </Link>
        </div>
        <div className="links">
          {ifAuth ? (
            <button className="logout" onClick={logOut}>
              {' '}
              Log out{' '}
            </button>
          ) : (
            <>
              <Link to="login" className="login">
                {' '}
                Sign in{' '}
              </Link>
              <Link to="register" className="register">
                {' '}
                Sign up{' '}
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
