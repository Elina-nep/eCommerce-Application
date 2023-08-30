import React, { useState } from 'react';
import { IProductComponentProps } from '../../types';
import { Link } from 'react-router-dom';
import {
  getProductAttribute,
  getProductCategories,
  getProductImages,
  formatAttributes,
  LANGUAGE,
  CURRENCY,
  getProductPrice,
} from '../../util';
import { ProductModal } from './assets/ProductModal';
import Button from '../buttons/Button';
import './ProductComponent.scss';

export const ProductComponent: React.FC<IProductComponentProps> = ({
  product,
  categories,
}) => {
  const title = product.current.name[LANGUAGE.EN] || '';
  const description = product.current.description?.en || '';
  const material = getProductAttribute(product, 'material', LANGUAGE.EN);
  const color = getProductAttribute(product, 'color', LANGUAGE.EN);
  const occasions = getProductAttribute(product, 'occasions', LANGUAGE.EN);
  const price = getProductPrice(product, CURRENCY.EUR);
  const productCategories = getProductCategories(
    product,
    categories,
    LANGUAGE.EN,
  );
  const productImages = getProductImages(product);
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
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="product">
      <Link to="/catalog" className="product__link">
        Back to Catalog
      </Link>
      {isModalOpen && productImages?.length && (
        <ProductModal
          images={productImages}
          closeModal={closeModal}
          alt={title}
        />
      )}
      <div className="product__slider">
        <Button onClick={showPreviousImage} className="button-pagination">
          {'<'}
        </Button>
        <div className="product__image">
          {productImages?.length && (
            <img
              onClick={handleOpenModal}
              src={productImages[currentImageIndex]}
              alt={title}
            />
          )}
        </div>

        <Button onClick={showNextImage} className="button-pagination">
          {'>'}
        </Button>
      </div>
      <h1 className="product__title">{title}</h1>
      {price && <p className="product__price">{price}</p>}
      <div className="product__categories">
        {productCategories.map((category, index) => (
          <p key={index}>{category}</p>
        ))}
      </div>
      <div className="product__details">
        {description && <p className="product__description">{description}</p>}
        <div className="product__attributes">
          {material && <p>Material: {formatAttributes(material)}</p>}
          {color && <p>Color: {formatAttributes(color)}</p>}
          {occasions && <p>Occasions: {formatAttributes(occasions)}</p>}
        </div>
      </div>
    </div>
  );
};
