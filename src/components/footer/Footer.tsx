import './Footer.scss';

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { StoreType } from '../../store/store';
import { links } from '../../util/index';
import LinkList from './FooterLink';
import { Social } from './social/Social';

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
        <Social />
      </div>
    </footer>
  );
};
