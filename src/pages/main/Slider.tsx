import { useState } from 'react';
import Button from '../../components/buttons/Button';
import { CardData } from '../../types';
import Card from './Card';
import { cards } from './constants';
import Modal, { ModalProps } from './ModalWindow';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalProps>({
    description: '',
    couponDate: '',
    couponCode: '',
    closeModal: () => {},
  });

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? cards.length - 7 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === cards.length - 7 ? 0 : prev + 1));
  };

  const handleLearnMoreClick = (cardData: CardData) => {
    setModalData({
      description: cardData.description,
      couponDate: cardData.couponDate,
      couponCode: cardData.couponCode ?? '',
      closeModal: closeModal,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          description={modalData.description}
          couponDate={modalData.couponDate}
          couponCode={modalData.couponCode ?? ''}
          closeModal={closeModal}
        />
      )}
      <div className="slider">
        <Button onClick={prevSlide} className="button-pagination">
          {'<'}
        </Button>

        <div className="slide-container">
          <div
            className="cards"
            style={{
              transform: `translateX(-${currentSlide * 102}%)`,
              transition: 'transform 0.5s ease',
              width: `${cards.length * 102}%`,
            }}
          >
            {cards.map((card, index) => (
              <Card
                card={card}
                key={index}
                handleLearnMoreClick={handleLearnMoreClick}
              />
            ))}
          </div>
        </div>

        <Button onClick={nextSlide} className="button-pagination">
          {'>'}
        </Button>
      </div>
    </>
  );
};

export default Slider;
