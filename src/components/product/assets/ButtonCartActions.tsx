import { ProductData } from '@commercetools/platform-sdk';
import { useDispatch, useSelector } from 'react-redux';

import { changeCart, StoreType } from '../../../store';
import { changeItemInCart } from '../../../util';
import Button from '../../buttons/Button';

interface IButtonCartActions {
  product: ProductData;
  id: string;
}

export const ButtonCartActions = ({ product, id }: IButtonCartActions) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: StoreType) => state.cart.cart);

  const handleItemInCartAction = (
    sku: string,
    action: string,
    productInCartId: string,
    quantity: number,
  ) => {
    changeItemInCart({
      sku,
      cartVersion: cart.version,
      cartId: cart.id,
      action,
      cartItemId: productInCartId,
      quantity,
    })
      .then((res) => dispatch(changeCart({ cart: res })))
      .catch((e) => {
        console.log(e.message);
      });
  };

  const itemInCart = cart.lineItems.find((el) => el.productId === id);
  if (itemInCart)
    return (
      <Button
        className="secondary_light_button"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleItemInCartAction(
            product.masterVariant.sku || '',
            'removeLineItem',
            itemInCart.id || '',
            itemInCart.quantity || 1,
          );
        }}
      >
        Remove From Cart
      </Button>
    );
  return (
    <Button
      className="secondary_light_button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleItemInCartAction(
          product.masterVariant.sku || '',
          'addLineItem',
          id,
          1,
        );
      }}
    >
      Add to Cart
    </Button>
  );
};
