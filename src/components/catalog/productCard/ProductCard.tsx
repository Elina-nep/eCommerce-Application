import './ProductCard.scss';

import React from 'react';
import { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { IProductCardProps } from '../../../types';
import {
  CURRENCY,
  getProductCardDescription,
  getProductCardImage,
  getProductCardPrice,
  getProductCardPriceDiscounted,
  LANGUAGE,
} from '../../../util';

export const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const title = product.name[LANGUAGE.EN];
  const price = getProductCardPrice(product, CURRENCY.EUR);
  const discountedPrice = getProductCardPriceDiscounted(product, CURRENCY.EUR);
  const image = getProductCardImage(product);
  const description = getProductCardDescription(product, LANGUAGE.EN);
  const productCardImageStyle = {
    backgroundImage: `url(${image})`,
  };
  const priceStyle = discountedPrice
    ? { textDecoration: 'line-through 1px var(--primary-color)' }
    : {};

  const [toCart, setToCart] = useState(false);

  const addToCart = () => {
    setToCart(!toCart);
    console.log(toCart ? 'REMOVE FROM CART' : 'ADD TO CART');
  };

  return (
    <Link to={`/product/${product.id}`} className="product_card__link">
      {discountedPrice ? <p className="sale-icon">%</p> : null}
      <div className="product_card" key={product.id}>
        <div
          className="product_card__image"
          style={productCardImageStyle}
        ></div>
        <p className="product_card__name">{title}</p>
        {description && (
          <p className="product_card__description">{description}</p>
        )}
        {discountedPrice && (
          <p className="product_card__dicounted_price">{discountedPrice}</p>
        )}
        {price && (
          <p className="product_card__price" style={priceStyle}>
            {price}
          </p>
        )}
        <button
          className={toCart ? 'product__cart_btn_active' : 'product__cart_btn'}
          onClick={addToCart}
        >
          <AiOutlineShoppingCart />
        </button>
      </div>
    </Link>
  );
};
