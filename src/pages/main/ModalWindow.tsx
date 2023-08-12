import React, { useEffect } from 'react';
import Button from '../../components/buttons/Button';

export type ModalProps = {
  description: string;
  couponDate: string;
  couponCode: string;
  closeModal: () => void;
};

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
    const body = document.querySelector('body');
    if (body) {
      body.classList.add('modal-open');
    }

    return () => {
      if (body) {
        body.classList.remove('modal-open');
      }
    };
  }, []);
  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal-content" onClick={handleModalClick}>
        <Button onClick={closeModal} className="close">
          {'x'}
        </Button>
        <div className="modal-text">
          <h4>{description}</h4>
          <p>{`Date: ${couponDate}`}</p>
          <p>{`Code: ${couponCode}`}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
