import React from 'react';
import { Link } from 'react-router-dom';
import { IProductCardProps } from '../../types';
import {
  getProductCardPrice,
  getProductCardImage,
  LANGUAGE,
  CURRENCY,
} from '../../util';
import './ProductCard.scss';

export const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const title = product.name[LANGUAGE.EN];
  const price = getProductCardPrice(product, CURRENCY.EUR);
  const image = getProductCardImage(product);

  return (
    <Link to={`/product/${product.id}`} className="product_card__link">
      <div className="product_card" key={product.id}>
        <div className="product_card__image">
          {image && <img src={image} alt={title} />}
        </div>
        <p className="product_card__name">{title}</p>
        {price && (
          <p className="product_card__price">
            {price} {CURRENCY.EUR}
          </p>
        )}
      </div>
    </Link>
  );
};
