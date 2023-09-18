import { ProductData } from '@commercetools/platform-sdk';
import { useDispatch, useSelector } from 'react-redux';

import { changeCart, StoreType } from '../../../store';
import { ItemInCartChange } from '../../../types';
import { changeItemInCart } from '../../../util';
import Button from '../../buttons/Button';
import { QuantityButtons } from '../../cart/item/QuantityButtons';

interface IButtonCartActions {
  product: ProductData;
  id: string;
}

export const ButtonProductCart = ({ product, id }: IButtonCartActions) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: StoreType) => state.cart.cart);

  const handleItemInCartAction = ({
    action,
    quantity,
    cartItemId,
    sku,
  }: ItemInCartChange) => {
    changeItemInCart({
      sku,
      cartVersion: cart.version,
      cartId: cart.id,
      action,
      cartItemId,
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
      <QuantityButtons
        sku={product.masterVariant.sku}
        id={id}
        action={handleItemInCartAction}
      />
    );
  return (
    <Button
      className="secondary_light_button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleItemInCartAction({
          sku: product.masterVariant.sku || '',
          action: 'addLineItem',
          quantity: 1,
        });
      }}
    >
      Add to Cart
    </Button>
  );
};