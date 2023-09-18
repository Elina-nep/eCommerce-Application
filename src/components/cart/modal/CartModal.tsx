import './CartModal.scss';

import React from 'react';

import Button from '../../buttons/Button';

export const CartModal = ({
  closeModal,
  handleClearCart,
}: {
  closeModal: () => void;
  handleClearCart: () => void;
}) => {
  return (
    <>
      <div className="modal" onClick={closeModal}>
        <div className="cart__modal-wrapper">
          <p> Are you sure you want to clear the cart? </p>
          <div>
            <Button
              onClick={() => {
                closeModal();
                handleClearCart();
              }}
              className="profile__edit_btn"
            >
              {'Yes'}
            </Button>
            <Button onClick={closeModal} className="profile__delete_btn">
              {'No'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
