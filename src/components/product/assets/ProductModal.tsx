import React, { useEffect, useRef, useState } from 'react';
import Button from '../../buttons/Button';
import { IProductModalProps } from '../../../types/product';
import '../../modalwindow/ModalWindow.css';

export const ProductModal: React.FC<IProductModalProps> = ({
  images,
  alt,
  closeModal,
}) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  const handleModalClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const handleCloseButtonClick = () => {
    closeModal();
  };

  return (
    <div className="modal" onClick={closeModal}>
      <div
        ref={modalContentRef}
        className="modal-wrapper"
        onClick={handleModalClick}
      >
        {' '}
        <Button onClick={handleCloseButtonClick} className="close">
          {'x'}
        </Button>
        <div className="modal-content">
          <div className="product__slider">
            <button onClick={showPreviousImage} className="product__silder_btn">
              {'<'}
            </button>
            {images && <img src={images[currentImageIndex]} alt={alt} />}
            <button onClick={showNextImage} className="product__silder_btn">
              {'>'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
