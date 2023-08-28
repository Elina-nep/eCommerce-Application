import React from 'react';
import { IProductComponentProps } from '../../types/product';
import { Link } from 'react-router-dom';
import { getProductAttribute } from '../../util/product';
import './ProductComponent.scss';

export const ProductComponent: React.FC<IProductComponentProps> = ({
  product,
}) => {
  const title = product.current.name['en'] || '';
  const description = product.current.description?.en || '';
  const image = product.current.masterVariant.images?.[0]?.url || '';
  const alt = product.current.name['en'];
  const material = getProductAttribute(product, 'material');
  const color = getProductAttribute(product, 'color');
  const occasions = getProductAttribute(product, 'occasions');
  const { centAmount, currencyCode } = product.current.masterVariant.prices?.[0]
    ?.value || {
    centAmount: 0,
    currencyCode: '',
  };
  const priceValue = centAmount / 100;
  return (
    <div className="product">
      <Link to="/catalog">Back to Catalog</Link>
      <div className="product__img">
        {image && <img src={image} alt={alt} />}
      </div>
      <h1 className="product__title">{title}</h1>
      {priceValue && (
        <p className="product__price">
          {priceValue} {currencyCode}
        </p>
      )}
      {description && <p className="product__description">{description}</p>}
      <div className="product__attributes">
        {material && <p>Material: {material}</p>}
        {color && <p>Color: {color}</p>}
        {occasions && <p>Occasions: {occasions}</p>}
      </div>
    </div>
  );
};
