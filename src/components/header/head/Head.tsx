import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import imageToAddCottoncandy from '../../../assets/cotton-candy.png';
import { HeadProps } from '../../../types/index';
import './Head.scss';

const Head: React.FC<HeadProps> = ({ cartTotal, cartItemsCount }) => {
  const { ifAuth, logOut } = useContext(AuthContext);

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
        <div className="cart">
          <Link to="#">
            CART / ${cartTotal.toFixed(2)} gds: {cartItemsCount}
          </Link>
        </div>
        <div className="registration-links">
          <Link to="login" className="login">
            Sign in
          </Link>
          <Link to="register" className="register">
            Sign up
          </Link>
          <button className="logout" onClick={logOut} disabled={!ifAuth}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Head;
