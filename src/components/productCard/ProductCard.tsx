import React from 'react';
import { Link } from 'react-router-dom';
import { IProductCardProps } from '../../types';

export const ProductCard: React.FC<IProductCardProps> = ({
  product,
  categories,
}) => {
  const { id, name, categories: categoryIds, masterVariant } = product;
  const categoryName =
    categories.results.find((category) => category.id === categoryIds[0].id)
      ?.name['en'] || '';
  const image = masterVariant.images?.[0]?.url || '';
  const { centAmount, currencyCode } = masterVariant.prices?.[0]?.value || {
    centAmount: 0,
    currencyCode: '',
  };
  const priceValue = centAmount / 100;

  return (
    <Link to={`/product/${product.id}`} className="product-link">
      <div className="product-card" key={id}>
        <div className="product-card-image">
          {image && <img src={image} alt={name['en']} />}
        </div>
        <p className="product-card-category">{categoryName}</p>
        <p className="product-card-name">{name['en']}</p>
        {priceValue && (
          <p className="product-card-price">
            {priceValue} {currencyCode}
          </p>
        )}
      </div>
    </Link>
  );
};
