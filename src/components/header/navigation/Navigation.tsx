import { Link } from 'react-router-dom';
import './Navigation.css';
export function Navigation() {
  return (
    <nav className="nav">
      <div className="navigation-container">
        <Link to="#">Catalog</Link>
        <Link to="#">My room</Link>
        <Link to="#">About us</Link>
        <div className="text-field-container">
          <input
            className="text-field__input"
            type="search"
            name="find"
            id="find"
            placeholder="...Search"
          />
          <span className="text-field__aicon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </span>
        </div>
      </div>
    </nav>
  );
}
