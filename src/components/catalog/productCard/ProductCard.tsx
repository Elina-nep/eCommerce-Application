import './ProductCard.scss';

import { ProductData } from '@commercetools/platform-sdk';
import React from 'react';
import { Link } from 'react-router-dom';

import { IProductCardProps } from '../../../types';
import {
  CURRENCY,
  getProductCardDescription,
  getProductCardImage,
  getProductPrice,
  getProductPriceDiscounted,
  LANGUAGE,
} from '../../../util';
import { ButtonCartActions } from '../../product/assets/ButtonCartActions';

export const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const title = product.name[LANGUAGE.EN];
  const price = getProductPrice(product, CURRENCY.EUR);
  const discountedPrice = getProductPriceDiscounted(product, CURRENCY.EUR);
  const image = getProductCardImage(product);
  const description = getProductCardDescription(product, LANGUAGE.EN);
  const productCardImageStyle = {
    backgroundImage: `url(${image})`,
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
        <div className="product_card__price_content">
          <div className="top-row">
            {!discountedPrice && <span className="product_card__empty_line" />}
            {discountedPrice && (
              <p className="product_card__dicounted_price">{discountedPrice}</p>
            )}
          </div>
          <div className="bottom-row">
            <div className="price-container">
              {price && (
                <p
                  className={`product_card__price ${
                    discountedPrice ? 'product_card__price-crossed' : ''
                  }`}
                >
                  {price}
                </p>
              )}
            </div>
            <ButtonCartActions
              product={product as ProductData}
              id={product.id}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
