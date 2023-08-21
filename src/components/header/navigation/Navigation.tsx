import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as InputIcon } from '../../../assets/inputIcon.svg';
import './Navigation.scss';

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="nav">
      <div className="navigation-container">
        <button
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </button>
        <div className={`menu-links ${menuOpen ? 'active' : ''}`}>
          <Link to="#">Catalog</Link>
          <Link to="#">My room</Link>
          <Link to="#">About us</Link>
        </div>
        <div className="navigation-text-field-container">
          <input
            className="navigation-text-field__input"
            type="search"
            name="find"
            id="find"
            placeholder="Search"
          />
          <span className="navigation-text-field__aicon">
            <InputIcon />
          </span>
        </div>
      </div>
    </nav>
  );
}
