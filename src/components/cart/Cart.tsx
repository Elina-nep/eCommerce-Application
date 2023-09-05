import './Cart.scss';

import { Link } from 'react-router-dom';

export const Cart = () => {
  return (
    <div className="cart">
      <Link to="/" className="cart__link">
        Home
      </Link>
      <h2>This is cart page</h2>
    </div>
  );
};
