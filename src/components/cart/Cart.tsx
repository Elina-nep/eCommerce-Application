import './Cart.scss';

import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthProvider';
import { discountCart, getDiscount } from '../../util';
import Button from '../buttons/Button';
import { ItemInCart } from './item-in-cart/ItemInCart';

export const Cart = () => {
  const { cart, setCart } = useContext(AuthContext);
  const [code, setCode] = useState({ code: '', id: '' });

  useEffect(() => {
    if (cart.discountCodes.length > 0) {
      const code = cart.discountCodes.find((el) => el.state === 'MatchesCart');
      if (code) {
        getDiscount(code.discountCode.id)
          .then((res) => {
            console.log(res);
            setCode({ code: res.code, id: res.id });
          })
          .catch((e) => {
            console.log(e.message);
            return <></>;
          });
      }
    } else setCode({ code: '', id: '' });
  }, [cart]); // это для того, чтобы отображать примененный к корзине и активный купон, можно перенести в отдельный компонент

  const handleAddDiscount = (coupon: string) => {
    discountCart({
      discount: coupon,
      cartVersion: cart.version,
      cartId: cart.id,
      action: 'addDiscountCode',
    })
      .then((res) => {
        setCart(res);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const handleDeleteDiscount = (id: string) => {
    discountCart({
      discountCode: id,
      cartVersion: cart.version,
      cartId: cart.id,
      action: 'removeDiscountCode',
    })
      .then((res) => {
        setCart(res);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <div className="cart">
      <Link to="/" className="cart_page__link">
        Home
      </Link>
      <h1 className="cart__title">SHOPPING CART</h1>
      {cart.lineItems.map((el) => (
        <p key={el.id}>
          <ItemInCart product={el} />
        </p>
      ))}
      <Button onClick={() => handleAddDiscount('GET10')}>add discount</Button>
      {/* кнопка, применяющая к корзине купон с соответствующим номером */}
      <span onClick={() => handleDeleteDiscount(code.id)}>{code.code}</span>
      {/* отображаем номер примененного купона, при нажатии на него он удаляется, пока без красоты) */}
    </div>
  );
};
