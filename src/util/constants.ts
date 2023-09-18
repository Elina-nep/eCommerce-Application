import imageToAboutUs from '../assets/about_image.png';
import imageToAddBalloons from '../assets/balloons.jpg';
import imageToAddCandles from '../assets/candles.jpg';
import imageToAddDecoration from '../assets/decoration.jpg';
import imageToAddElina from '../assets/Elina.jpg';
import imageDiscount10 from '../assets/get10.png';
import imageDiscount20 from '../assets/get20.png';
import imageDiscount30 from '../assets/get30.png';
import imageToAddHalina from '../assets/Halina.jpg';
import imageToAddHats from '../assets/hats.jpg';
import imageToAddIryna from '../assets/Iryna.png';
import imageToMain from '../assets/main_image.png';
import imageToAddPoppers from '../assets/poppers.jpg';
import imageToAddSets from '../assets/sets.jpg';
import { IDeveloper } from '../types';
import { CardData } from '../types/sliderCard';

export const PRODUCTS_ON_PAGE = 12;

export const DEVELOPERS: IDeveloper[] = [
  {
    name: 'Elina',
    role: 'Team Lead',
    bio: 'Dedicated and highly motivated front-end developer with two years of experience. Holding a PhD in technical physics. University teacher and scientific advisor. This unique blend of technical expertise and teaching experience positions me to contribute effectively to innovative front-end development projects.',
    done: [
      'tasks coordination and progress tracking',
      'configuring entire development environment',
      'product database setup',
      'services for backend requests',
      'catalog search, sorting and filtering',
      'tests setup',
      'routing',
    ],
    link: 'https://github.com/Elina-nep',
    photo: imageToAddElina,
  },
  {
    name: 'Iryna',
    role: 'Developer',
    bio: 'BSUIR alumnus with a video editing background, embarking on an exciting journey at RS School to master frontend development. Passionately committed to creating user-friendly and visually captivating digital experiences, with a keen focus on merging creativity and cutting-edge technology.',
    done: [
      'login and registration setup',
      'user profile page',
      'cart page',
      'magnifying glass implementation',
      'tests',
      'responsive layout',
    ],
    link: 'https://github.com/iradzh',
    photo: imageToAddIryna,
  },
  {
    name: 'Halina',
    role: 'Developer',
    bio: 'As a Master of Technical Sciences, my educational foundation is solid. Enrolled at RS School since December 5th, 2022, I have been diligently cultivating my skills in front-end development. I am thrilled at the prospect of utilizing my skills and knowledge to make a meaningful contribution to this development project.',
    done: [
      'project design',
      'product database setup',
      'catalog page setup',
      'sorting, filtering',
      'header, footer, pagination and slider setup',
      'main, about us and 404 page',
      'tests',
      'design & responsive layout',
    ],
    link: 'https://github.com/HalinaD',
    photo: imageToAddHalina,
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

export const MAIN_IMAGE = imageToMain;
export const ABOUT_IMAGE = imageToAboutUs;
