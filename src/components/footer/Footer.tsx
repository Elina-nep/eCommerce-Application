import './Footer.scss';

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { StoreType } from '../../store/store';
import { links } from '../../util/index';
import LinkList from './FooterLink';

export const Footer: React.FC = () => {
  const categories = useSelector(
    (state: StoreType) => state.categories.categories,
  );
  return (
    <footer className="footer">
      <div className="footer__column">
        <h3>Information</h3>
        <LinkList links={links} />
      </div>

      <div className="footer__column">
        <h3>Catalog</h3>
        <ul>
          {categories.map((el) => {
            if (!el.parent) {
              return (
                <li key={el.id}>
                  <Link
                    to={{
                      pathname: '/catalog',
                      search: `?category=${el.name['en']}`,
                    }}
                  >
                    {el.name['en']}
                  </Link>
                </li>
              );
            }
            return;
          })}
        </ul>
      </div>

      <div className="footer__column">
        <h3>Contacts</h3>
        <p className="footer__column-address">
          Company Inc., <br />
          ZM404, Cosmic St., 42, <br />
          Zuom Dustyville <br /> <br />
          Call us now:
        </p>
        <p className="footer__column-phone-number">(800) 2345-6789</p>
      </div>
    </footer>
  );
};
