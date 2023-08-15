import React, { useEffect } from 'react';
import Button from '../buttons/Button';
import { ModalProps } from '../../types';
import './ModalWindow.css';

export const Modal: React.FC<ModalProps> = ({
  description,
  couponDate,
  couponCode,
  closeModal,
}) => {
  const handleModalClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const offScroll = () => {
      const handleScroll = () => {
        window.scrollTo(0, 0);
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    };

    offScroll();
  }, []);

  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal-content" onClick={handleModalClick}>
        <div className="modal-text">
          <h4>{description}</h4>
          <p>{`Date: ${couponDate}`}</p>
          <p>{`Code: ${couponCode}`}</p>
        </div>
      </div>
      <Button onClick={closeModal} className="close">
        {'x'}
      </Button>
    </div>
  );
};

export default Modal;
