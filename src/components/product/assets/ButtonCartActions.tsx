import { ProductCatalogData } from '@commercetools/platform-sdk';
import { useContext } from 'react';

import { AuthContext } from '../../../context/AuthProvider';
import { changeItemInCart } from '../../../util';
import Button from '../../buttons/Button';

interface IButtonCartActions {
  product: ProductCatalogData;
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
    }).then((res) => setCart(res));
  };

  const itemInCart = cart.lineItems.find((el) => el.productId === id);
  if (itemInCart)
    return (
      <Button
        onClick={() => {
          handleItemInCartAction(
            product.current.masterVariant.sku || '',
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
      onClick={() => {
        handleItemInCartAction(
          product.current.masterVariant.sku || '',
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
