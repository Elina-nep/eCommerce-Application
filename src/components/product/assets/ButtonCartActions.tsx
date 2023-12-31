import { ProductData } from '@commercetools/platform-sdk';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import { changeCart, StoreType } from '../../../store';
import { changeItemInCart } from '../../../util';
import Button from '../../buttons/Button';
import { SparklingButton } from '../../buttons/SparklingButton/SparklingButton';

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
      .then((res) => {
        setTimeout(() => {
          dispatch(changeCart({ cart: res }));
        }, 400);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const itemInCart = cart.lineItems.find((el) => el.productId === id);
  if (itemInCart)
    return (
      <Button
        className="secondary_light_button__trash"
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
        <AiOutlineDelete />
      </Button>
    );
  return (
    <SparklingButton
      className="secondary_light_button product_button"
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
      <AiOutlineShoppingCart />
    </SparklingButton>
  );
};
