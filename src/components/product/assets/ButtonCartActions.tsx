import { ProductData } from '@commercetools/platform-sdk';
import { useContext } from 'react';

import { AuthContext } from '../../../context/AuthProvider';
import { changeItemInCart } from '../../../util';
import Button from '../../buttons/Button';

interface IButtonCartActions {
  product: ProductData;
  id: string;
}

export const ButtonCartActions = ({ product, id }: IButtonCartActions) => {
  const { cart, setCart } = useContext(AuthContext);

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
      .then((res) => setCart(res))
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
