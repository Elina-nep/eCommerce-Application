import imageToAddBalloons from '../assets/balloons.jpg';
import imageToAddCandles from '../assets/candles.jpg';
import imageToAddDecoration from '../assets/decoration.jpg';
import imageToAddElina from '../assets/Elina.jpg';
import imageToAddGalina from '../assets/Galina.jpg';
import imageDiscount10 from '../assets/get10.png';
import imageDiscount20 from '../assets/get20.png';
import imageDiscount30 from '../assets/get30.png';
import imageToAddHats from '../assets/hats.jpg';
import imageToAddIrina from '../assets/Irina.jpg';
import imageToAddPoppers from '../assets/poppers.jpg';
import imageToAddSets from '../assets/sets.jpg';
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
      'writing tests',
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
    discountText: '10% off on 50€‎ purchase',
    image: imageDiscount10,
    buttonText: 'Learn more',
    couponDate: 'Ends 30/09/2023 Online exclusive!',
    couponCode: 'GET10',
    description: `Embark on your shopping journey with a delightful 10% discount gracing your €‎50 purchase!`,
  },
  {
    id: 2,
    discountText: '20% off on 100€‎ purchase',
    image: imageDiscount20,
    buttonText: 'Learn more',
    couponDate: 'Ends 30/09/2023 Online exclusive!',
    couponCode: 'GET20',
    description: `Embark on your shopping journey with a delightful 20% discount gracing your €‎100 purchase!`,
  },
  {
    id: 3,
    discountText: '30% off on 150€‎ purchase',
    image: imageDiscount30,
    buttonText: 'Learn more',
    couponDate: 'Ends 01/11/2023 Online exclusive!',
    couponCode: 'GET30',
    description: `Embark on your shopping journey with a delightful 30% discount gracing your €‎150 purchase!`,
  },
  {
    id: 4,
    discountText: 'Get 20% off on Balloons set',
    image: imageToAddBalloons,
    buttonText: 'Learn more',
    couponDate: 'Ends 08/12/2023 Online exclusive! ',
    couponCode: 'All products from Set of balloons category are on sale',
    description: `Infuse your birthday into delight with balloons! Watch as they gracefully float, creating a whimsical atmosphere that will leave you in awe. elevate your birthday to new heights with balloons!`,
  },
  {
    id: 5,
    discountText: 'Get 25% off on Party candles',
    image: imageToAddCandles,
    buttonText: 'Learn more',
    couponDate: 'Ends 12/25/2023 Online exclusive!',
    couponCode: 'Find the details in the Catalog',
    description: `Illuminate your celebrations with party candles! Create a warm and cozy ambiance for any occasion and make your moments even more memorable. Don't miss out on this fantastic offer!`,
  },
  {
    id: 6,
    discountText: 'Get 20% off on Party poppers',
    image: imageToAddPoppers,
    buttonText: 'Learn more',
    couponDate: 'Ends 12/31/2023 Online exclusive!',
    couponCode: 'Find the details in the Catalog',
    description: `Add excitement to your parties with party poppers! Watch the confetti burst into the air and let the festivities begin. Hurry up and grab this amazing deal before it's gone!`,
  },
  {
    id: 7,
    discountText: 'Get 10% off on Gift sets',
    image: imageToAddSets,
    buttonText: 'Learn more',
    couponDate: 'Ends 12/31/2023 Online exclusive!',
    couponCode: 'Find the details in the Catalog',
    description: `Make your loved ones feel special with our gift sets! Whether it's a birthday, anniversary, or any other occasion, these thoughtful sets are sure to bring joy. Don't miss the chance to save on the perfect gift!`,
  },
  {
    id: 8,
    discountText: 'Get 30% off on Party hats',
    image: imageToAddHats,
    buttonText: 'Learn more',
    couponDate: 'Ends 12/31/2023 Online exclusive!',
    couponCode: 'Find the details in the Catalog',
    description: `Top off your celebrations with stylish party hats! From birthday parties to New Year's Eve, these hats will add fun and flair to any event. Grab this deal and get ready to party!`,
  },
  {
    id: 9,
    discountText: 'Get 15% off on Big Decorations',
    image: imageToAddDecoration,
    buttonText: 'Learn more',
    couponDate: 'Ends 12/31/2023 Online exclusive!',
    couponCode: 'All products from Big Decoration category are on sale',
    description: `Transform your venue into a festive wonderland with our party decorations! Create a picture-perfect setting for your celebrations. Don't miss this opportunity to save!`,
  },
];
