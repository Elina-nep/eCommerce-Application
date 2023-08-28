import React from 'react';
import { IProductProps } from '../../types/product';
import './Product.scss';

export const Product: React.FC<IProductProps> = ({ product }) => {
  return (
    <div className="product">
      <h1>Here is a product </h1>
      <h1>{product.name['en']}</h1>
    </div>
  );
};
