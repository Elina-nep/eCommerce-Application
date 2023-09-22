import { useSelector } from 'react-redux';

import { StoreType } from '../../../store';
import { ItemInCartChange } from '../../../types';

interface IQuantityButtons {
  sku?: string;
  id?: string;
  action: ({ action, quantity, cartItemId, sku }: ItemInCartChange) => void;
}

export const QuantityButtons = ({ sku, id, action }: IQuantityButtons) => {
  const cart = useSelector((state: StoreType) => state.cart.cart);

  const itemInCart = cart.lineItems.find((el) => el.productId === id);

  return (
    <div className="item__col item__quantity">
      <button
        className="item__quantity_btn"
        onClick={() => {
          action({
            action: 'removeLineItem',
            quantity: 1,
            cartItemId: itemInCart?.id,
          });
        }}
      >
        -
      </button>
      <div>{itemInCart?.quantity}</div>
      <button
        className="item__quantity_btn"
        onClick={() => {
          action({
            action: 'addLineItem',
            quantity: 1,
            sku: sku,
          });
        }}
      >
        +
      </button>
    </div>
  );
};
