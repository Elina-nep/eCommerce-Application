import './ProductComponent.scss';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { IProductComponentProps } from '../../types';
import {
  CURRENCY,
  formatAttributes,
  getProductAttribute,
  getProductCategories,
  getProductImages,
  getProductPrice,
  getProductPriceDiscounted,
  LANGUAGE,
} from '../../util';
import Button from '../buttons/Button';
import { ProductModal } from './assets/ProductModal';

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
  const discountedPrice = getProductPriceDiscounted(product, CURRENCY.EUR);
  const productCategories = getProductCategories(
    product,
    categories,
    LANGUAGE.EN,
  );
  const productImages = getProductImages(product);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  console.log(color);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showNextImage = () => {
    if (productImages) {
      const nextIndex = (currentImageIndex + 1) % productImages.length;
      setCurrentImageIndex(nextIndex);
    }
  };

  const showPreviousImage = () => {
    if (productImages) {
      const prevIndex =
        currentImageIndex === 0
          ? productImages.length - 1
          : currentImageIndex - 1;
      setCurrentImageIndex(prevIndex);
    }
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
          modalImageIndex={currentImageIndex}
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
      {discountedPrice ? (
        <div className="product__with_discount">
          <p className="product__offer">Special Offer</p>
          {price && <p className="product__price">{price}</p>}
          {<p className="product__dicounted_price">{discountedPrice}</p>}
        </div>
      ) : (
        <div className="product__no_discount">
          {price && <p className="product__price">{price}</p>}
        </div>
      )}
      <div className="product__categories">
        {productCategories.map((category, index) => (
          <p key={index}>{category}</p>
        ))}
      </div>
      <div className="product__details">
        {description && <p className="product__description">{description}</p>}
        <div className="product__attributes">
          {material.length > 1 && <p>Material: {formatAttributes(material)}</p>}
          {color.length > 1 && <p>Color: {formatAttributes(color)}</p>}
          {occasions.length > 1 && (
            <p>Occasions: {formatAttributes(occasions)}</p>
          )}
        </div>
      </div>
    </div>
  );
};
