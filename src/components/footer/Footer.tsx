import React from 'react';
import './Footer.css';
import { columns } from '../../util/index';
import LinkList from './FooterLink';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      {columns.map((column, index) => (
        <div className="column" key={index}>
          <h3>{column.title}</h3>
          <LinkList links={column.links} />
        </div>
      ))}
      <div className="column">
        <h3>Contacts</h3>
        <p>
          Company Inc., <br />
          ZM404, Cosmic Street, 42, <br />
          Zuom Dustyville <br /> <br />
          Call us now:
        </p>
        <p className="column-phone-number">(800) 2345-6789</p>
      </div>
    </footer>
  );
};
