import './ProductModal.scss';

import React, { useEffect, useRef, useState } from 'react';

import { IProductModalProps } from '../../../types/product';
import Button from '../../buttons/Button';

export const ProductModal: React.FC<IProductModalProps> = ({
  images,
  alt,
  modalImageIndex,
  closeModal,
}) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  const handleModalClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(modalImageIndex);

  const showNextImage = () => {
    images &&
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const showPreviousImage = () => {
    images &&
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1,
      );
  };

  const handleCloseModal = () => {
    closeModal();
  };

  useEffect(() => {
    if (modalContentRef.current) {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      modalContentRef.current.scrollTop = scrollY;
      modalContentRef.current.scrollLeft = scrollX;

      const handleScroll = () => {
        const scrollTop = modalContentRef.current?.scrollTop || scrollY;
        const scrollLeft = modalContentRef.current?.scrollLeft || scrollY;
        window.scrollTo(scrollLeft, scrollTop);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <div className="product_modal" onClick={closeModal}>
      <div
        ref={modalContentRef}
        className="product-modal__wrapper"
        onClick={handleModalClick}
      >
        <Button onClick={handleCloseModal} className="product_modal__close">
          {'x'}
        </Button>

        <div className="product_modal__slider">
          <Button onClick={showPreviousImage} className="button-pagination">
            {'<'}
          </Button>
          <div className="product_modal__image">
            {images && <img src={images[currentImageIndex]} alt={alt} />}
          </div>

          <Button onClick={showNextImage} className="button-pagination">
            {'>'}
          </Button>
        </div>
      </div>
    </div>
  );
};
