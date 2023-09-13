import './ModalWindow.css';

import React, { useEffect, useRef } from 'react';

import { ModalProps } from '../../types';
import Button from '../buttons/Button';

export const Modal: React.FC<ModalProps> = ({
  description,
  couponDate,
  couponCode,
  image,
  closeModal,
}) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  const handleModalClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
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
          <div className="modal-image">
            <img className="modal-image" src={image} alt="logo" />
          </div>
          <div className="modal-text">
            <h4>{description}</h4>
            <p>{`Date: ${couponDate}`}</p>
            <p className="coupon-code">{couponCode}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
