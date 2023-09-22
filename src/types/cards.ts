import { CardData } from './sliderCard';

export type CardProps = {
  card: CardData;
  handleLearnMoreClick: (cardData: CardData) => void;
};
