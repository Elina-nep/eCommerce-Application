import { Link } from 'react-router-dom';
import './Navigation.css';
import { ReactComponent as InputIcon } from '../../../assets/inputIcon.svg';

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
            <InputIcon />
          </span>
        </div>
      </div>
    </nav>
  );
}
