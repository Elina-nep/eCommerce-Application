import './Cart.scss';

import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthProvider';

export const Cart = () => {
  const { cart } = useContext(AuthContext);
  return (
    <div className="cart">
      <Link to="/" className="cart_page__link">
        Home
      </Link>
      <h2>This is cart page</h2>
      {cart.lineItems.map((el) => (
        <p key={el.id}>
          {el.name['en']} / {el.quantity}
        </p>
      ))}
    </div>
  );
};
