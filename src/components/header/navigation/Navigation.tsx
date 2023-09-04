import './Navigation.scss';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Search } from './search/Search';

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
          <Link
            className="menu-links-item"
            to={{
              pathname: `/catalog`,
              search: 'category=all',
            }}
          >
            Catalog
          </Link>
          <Link className="menu-links-item" to="/me">
            My room
          </Link>
          <Link className="menu-links-item" to="/about">
            About us
          </Link>
        </div>
        <div className="navigation-text-field-container">
          <Search />
        </div>
      </div>
    </nav>
  );
}
