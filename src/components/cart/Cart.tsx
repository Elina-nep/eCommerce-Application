import './Cart.scss';

import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthProvider';
import { CURRENCY } from '../../util';
import { discountCart, getCartTotalPrice, getDiscount } from '../../util';
import Button from '../buttons/Button';
import { ItemInCart } from './item/ItemInCart';

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
          });
      }
    } else setCode({ code: '', id: '' });
  }, [cart]); // это для того, чтобы отображать примененный к корзине и активный купон, можно перенести в отдельный компонент

  const [couponInput, setCouponInput] = useState('');

  const handleAddDiscount = (couponInput: string) => {
    discountCart({
      discount: couponInput,
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

  const total = getCartTotalPrice(cart, CURRENCY.EUR);

  return (
    <div className="cart">
      <Link to="/" className="cart_page__link">
        Home
      </Link>
      <h1 className="cart__title">SHOPPING CART</h1>
      {/* <button onClick={handleClearCart()}>Clear cart</button> */}
      {cart.lineItems.map((el) => (
        <p key={el.id}>
          <ItemInCart product={el} />
        </p>
      ))}
      <p className="cart__total">{total}</p>

      <div className="cart__coupon_container">
        <input
          placeholder="coupon"
          value={couponInput}
          onChange={(e) => setCouponInput(e.target.value)}
        />

        <Button onClick={() => handleAddDiscount(couponInput)}>
          add discount
        </Button>
        {/* кнопка, применяющая к корзине купон с соответствующим номером */}

        <span onClick={() => handleDeleteDiscount(code.id)}>{code.code}</span>
        {/* отображаем номер примененного купона, при нажатии на него он удаляется, пока без красоты) */}
      </div>
    </div>
  );
};
