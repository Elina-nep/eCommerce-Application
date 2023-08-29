import React, { useState } from 'react';
import { IProductComponentProps } from '../../types/product';
import { Link } from 'react-router-dom';
import {
  getProductAttribute,
  getProductCategories,
  getProductImages,
} from '../../util/product';
import { ProductModal } from './assets/ProductModal';
import Button from '../buttons/Button';
import './ProductComponent.scss';

export const ProductComponent: React.FC<IProductComponentProps> = ({
  product,
  categories,
}) => {
  console.log('product', product);
  console.log('categories', categories);

  const title = product.current.name['en'] || '';
  const description = product.current.description?.en || '';
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
  const productCategories = getProductCategories(product, categories);
  const productImages = getProductImages(product);
  console.log('HERE', productImages);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const showNextImage = () => {
    productImages &&
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % productImages.length,
      );
  };

  const showPreviousImage = () => {
    productImages &&
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? productImages.length - 1 : prevIndex - 1,
      );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="product">
      <Link to="/catalog">Back to Catalog</Link>
      {isModalOpen && productImages && (
        <ProductModal
          images={productImages}
          closeModal={closeModal}
          alt={alt}
        />
      )}
      <div className="product__slider">
        <Button onClick={showPreviousImage} className="button-pagination">
          {'<'}
        </Button>
        {productImages && (
          <img
            onClick={handleImageClick}
            src={productImages[currentImageIndex]}
            alt={alt}
          />
        )}
        <Button onClick={showNextImage} className="button-pagination">
          {'>'}
        </Button>
      </div>
      <h1 className="product__title">{title}</h1>
      {priceValue && (
        <p className="product__price">
          {priceValue} {currencyCode}
        </p>
      )}
      <div className="product__categories">
        {productCategories.map((category, index) => (
          <p key={index}>{category}</p>
        ))}
      </div>
      {description && <p className="product__description">{description}</p>}
      <div className="product__attributes">
        {material && <p>Material: {material}</p>}
        {color && <p>Color: {color}</p>}
        {occasions && <p>Occasions: {occasions}</p>}
      </div>
    </div>
  );
};
