import React from 'react';
import './Footer.css';
import { columns } from '../../util/index';
import LinkList from './FooterLink';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      {columns.map((column) => (
        <div className="footer__column" key={column.id}>
          <h3>{column.title}</h3>
          <LinkList links={column.links} />
        </div>
      ))}
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
