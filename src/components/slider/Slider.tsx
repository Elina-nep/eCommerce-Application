import { useState } from 'react';
import Button from '../../components/buttons/Button';
import { cards } from '../../util/index';
import { ModalProps } from '../../types';
import { CardData } from '../../types/sliderCard';
import Card from '../card/CouponCard';
import Modal from '../modalwindow/ModalWindow';

import './Slider.css';
import SliderIndicator from './SliderIndicator';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalProps>({
    image: '',
    description: '',
    couponDate: '',
    couponCode: '',
    closeModal: () => {},
  });
  const [totalSlides] = useState(3);
  const slidePosition = 7;
  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? cards.length - slidePosition : prev - 1,
    );
  };

  const nextSlide = () => {
    setCurrentSlide((next) =>
      next === cards.length - slidePosition ? 0 : next + 1,
    );
  };

  const handleLearnMoreClick = (cardData: CardData) => {
    setModalData({
      image: cardData.image,
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
          image={modalData.image}
          closeModal={closeModal}
        />
      )}
      <div className="slider">
        <Button onClick={prevSlide} className="button-pagination">
          {'<'}
        </Button>

        <div className="slide-container">
          <div
            className="slide-container-cards"
            style={{
              transform: `translateX(-${currentSlide * 102}%)`,
              transition: 'transform 0.5s ease',
              width: `${cards.length * 102}%`,
            }}
          >
            {cards.map((card) => (
              <Card
                card={card}
                key={card.id}
                handleLearnMoreClick={handleLearnMoreClick}
              />
            ))}
          </div>
        </div>

        <Button onClick={nextSlide} className="button-pagination">
          {'>'}
        </Button>
      </div>
      <>
        <SliderIndicator
          totalSlides={totalSlides}
          currentSlide={currentSlide}
        />
      </>
    </>
  );
};

export default Slider;
