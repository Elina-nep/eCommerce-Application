import React from 'react';
import { IProductComponentProps } from '../../types/product';
import './ProductComponent.scss';

export const ProductComponent: React.FC<IProductComponentProps> = ({
  product,
}) => {
  return (
    <div className="product">
      <h1>{product.current.name['en']}</h1>
    </div>
  );
};
