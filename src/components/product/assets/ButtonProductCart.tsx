import { ProductData } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import { changeCart, StoreType } from '../../../store';
import { ItemInCartChange } from '../../../types';
import { changeItemInCart } from '../../../util';
import { SparklingButton } from '../../buttons/SparklingButton/SparklingButton';
import { QuantityButtons } from '../../cart/item/QuantityButtons';
import { SimpleLoading } from '../../loading/SimpleLoading';

interface IButtonCartActions {
  product: ProductData;
  id: string;
}

export const ButtonProductCart = ({ product, id }: IButtonCartActions) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: StoreType) => state.cart.cart);
  const [isLoading, setIsLoading] = useState(false);
  const [itemInCart, setItemInCart] = useState(
    cart.lineItems.find((el) => el.productId === id),
  );

  useEffect(() => {
    setItemInCart(cart.lineItems.find((el) => el.productId === id));
  }, [cart, id]);

  const handleItemInCartAction = ({
    action,
    quantity,
    cartItemId,
    sku,
  }: ItemInCartChange) => {
    setIsLoading(true);
    changeItemInCart({
      sku,
      cartVersion: cart.version,
      cartId: cart.id,
      action,
      cartItemId,
      quantity,
    })
      .then((res) =>
        setTimeout(() => {
          dispatch(changeCart({ cart: res }));
          setIsLoading(false);
        }, 400),
      )
      .catch((e) => {
        console.log(e.message);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <div className="product__price-cart__buttons">
        <SimpleLoading />
      </div>
    );
  } else {
    if (itemInCart)
      return (
        <div className="product__price-cart__buttons">
          <QuantityButtons
            sku={product.masterVariant.sku}
            id={id}
            action={handleItemInCartAction}
          />
          <SparklingButton
            className="primary_button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleItemInCartAction({
                cartItemId: itemInCart.id || '',
                action: 'removeLineItem',
                quantity: itemInCart.quantity || 1,
              });
            }}
          >
            <AiOutlineDelete />
          </SparklingButton>
        </div>
      );
    return (
      <SparklingButton
        className="primary_button"
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
      </SparklingButton>
    );
  }
};
