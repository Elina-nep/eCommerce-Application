import './Main.scss';

import { Link } from 'react-router-dom';

import Slider from '../../components/slider/Slider';
import { MAIN_IMAGE } from '../../util';

export const MainPage = () => {
  return (
    <main className="main-page main-container">
      <div className="main-page-container">
        <div className="main__welcome">
          <div className="main__welcome_typography">
            <h1>Discover Joyful Treasures at Enchant Fest</h1>
            <h2>
              Unwrap the magic of every celebration with our handpicked festival
              and gift selection. From birthdays to holidays, find perfect
              presents for your loved ones. <span>❤️</span>
            </h2>
            <div className="main__welcome_buttons">
              <div className="special_hover_container">
                <Link to="/catalog" className="main__welcome_to_catalog">
                  Start now
                </Link>
              </div>
              <Link to="/about" className="secondary_light_button">
                Our Team
              </Link>
            </div>
          </div>
          <div className="main__welcome_image">
            <img src={MAIN_IMAGE} alt="main image" />
          </div>
        </div>
        <h2 className="main__title">Unlock Discounts with Promo Codes</h2>
        <Slider />
      </div>
    </main>
  );
};
