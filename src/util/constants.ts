import imageToAddBalloons from '../assets/balloons.jpg';
import imageToAddCandles from '../assets/candles.jpg';
import imageToAddDecoration from '../assets/decoration.jpg';
import imageToAddElina from '../assets/Elina.jpg';
import imageToAddGalina from '../assets/Galina.jpg';
import imageToAddHats from '../assets/hats.jpg';
import imageToAddHoli from '../assets/holi.jpg';
import imageToAddIrina from '../assets/Irina.jpg';
import imageToAddPoppers from '../assets/poppers.jpg';
import imageToAddSets from '../assets/sets.jpg';
import imageToAddskylantern from '../assets/sky-lantern.jpeg';
import imageToAddWeb from '../assets/spider-web.jpg';
import { IDeveloper } from '../types';
import { CardData } from '../types/sliderCard';

export const PRODUCTS_ON_PAGE = 12;

export const DEVELOPERS: IDeveloper[] = [
  {
    name: 'Elina',
    role: 'Team Lead',
    done: [
      'organizing work',
      'checking task completion',
      ' configuring the project and the entire development environment',
      'setting up the API for working with the server',
      'obtaining tokens',
      'routing',
      'setting up navigation',
      'website search',
      'filtering',
      'sorting',
      'work with cart page functionality',
      'setting up product database in commercetools',
      'writing tests',
      'design',
      'responsive layout',
    ],
    link: 'https://github.com/Elina-nep',
    photo: imageToAddElina,
  },
  {
    name: 'Irina',
    role: 'Developer',
    done: [
      'setting up registration on the register page',
      'working with addresses and tokens',
      'authorization forms on the login page',
      'implementing functionality on user pages',
      'integrating promocodes from commercetools into the project',
      'creating a shopping cart page',
      'writing tests',
      'design',
      'responsive layout',
    ],
    link: 'https://github.com/iradzh',
    photo: imageToAddIrina,
  },
  {
    name: 'Galina',
    role: 'Developer',
    done: [
      'project design',
      'catalog page setup with product cards',
      'sorting',
      'filtering',
      'pagination',
      'creating a 404 page',
      'creating an about us page',
      'header and footer setup',
      'creating a slider on the main page',
      'setting up a product database',
      'design',
      'responsive layout',
    ],
    link: 'https://github.com/HalinaD',
    photo: imageToAddGalina,
  },
];

export const cards: CardData[] = [
  {
    id: 1,
    discountText: 'Get 15% off on Sky lanterns',
    image: imageToAddskylantern,
    buttonText: 'Learn more',
    couponDate: 'Ends 04/12/2023 Online exclusive! ',
    couponCode: 'SKY15',
    description: `Light up the night sky and create a magical atmosphere with sky lanterns! Add a touch of wonder and awe to your special event or celebration. Don't miss the chance to make your memories shine bright! `,
  },
  {
    id: 2,
    discountText: 'Get 20% off on Balloons set',
    image: imageToAddBalloons,
    buttonText: 'Learn more',
    couponDate: 'Ends 08/12/2023 Online exclusive! ',
    couponCode: 'BALLOON20',
    description: `Infuse your birthday into delight with balloons! Watch as they gracefully float, creating a whimsical atmosphere that will leave you in awe. elevate your birthday to new heights with balloons!`,
  },
  {
    id: 3,
    discountText: 'Get 30% off on Holi colors',
    image: imageToAddHoli,
    buttonText: 'Learn more',
    couponDate: 'Ends 01/11/2023 Online exclusive!',
    couponCode: 'HOLI30',
    description: `Make your celebration more vibrant with Holi colors! Get ready to create a colorful extravaganza and immerse yourself in a festive atmosphere. Don't miss the chance to experience a truly colorful celebration!`,
  },
  {
    id: 4,
    discountText: 'Get 30% off on Spider webs',
    image: imageToAddWeb,
    buttonText: 'Learn more',
    couponDate: 'Ends 31/10/2023 Online exclusive! ',
    couponCode: 'WEB30',
    description: `Transform your Halloween into a spooktacular event with artificial spider webs! Set the scene for scares and create an eerily enchanting atmosphere. Don't miss out on this hauntingly good deal!`,
  },
  {
    id: 5,
    discountText: 'Get 25% off on Party candles',
    image: imageToAddCandles,
    buttonText: 'Learn more',
    couponDate: 'Ends 12/25/2023 Online exclusive!',
    couponCode: 'CANDLE25',
    description: `Illuminate your celebrations with party candles! Create a warm and cozy ambiance for any occasion and make your moments even more memorable. Don't miss out on this fantastic offer!`,
  },
  {
    id: 6,
    discountText: 'Get 20% off on Party poppers',
    image: imageToAddPoppers,
    buttonText: 'Learn more',
    couponDate: 'Ends 12/31/2023 Online exclusive!',
    couponCode: 'POPPER20',
    description: `Add excitement to your parties with party poppers! Watch the confetti burst into the air and let the festivities begin. Hurry up and grab this amazing deal before it's gone!`,
  },
  {
    id: 7,
    discountText: 'Get 10% off on Gift sets',
    image: imageToAddSets,
    buttonText: 'Learn more',
    couponDate: 'Ends 12/31/2023 Online exclusive!',
    couponCode: 'All products from this category are on sale.',
    description: `Make your loved ones feel special with our gift sets! Whether it's a birthday, anniversary, or any other occasion, these thoughtful sets are sure to bring joy. Don't miss the chance to save on the perfect gift!`,
  },
  {
    id: 8,
    discountText: 'Get 30% off on Party hats',
    image: imageToAddHats,
    buttonText: 'Learn more',
    couponDate: 'Ends 12/31/2023 Online exclusive!',
    couponCode: 'HAT30',
    description: `Top off your celebrations with stylish party hats! From birthday parties to New Year's Eve, these hats will add fun and flair to any event. Grab this deal and get ready to party!`,
  },
  {
    id: 9,
    discountText: 'Get 15% off on Big Decorations',
    image: imageToAddDecoration,
    buttonText: 'Learn more',
    couponDate: 'Ends 12/31/2023 Online exclusive!',
    couponCode: 'All products from Big Decoration category are on sale.',
    description: `Transform your venue into a festive wonderland with our party decorations! Create a picture-perfect setting for your celebrations. Don't miss this opportunity to save!`,
  },
];
