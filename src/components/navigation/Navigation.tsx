import { Link } from 'react-router-dom';
import './Navigation.css';
export function Navigation() {
  return (
    <nav className="nav">
      <div className="navigation-container">
        <Link to="/collection">Catalog</Link>
        <Link to="/my-room">My room</Link>
        <Link to="/about-us">About us</Link>
        <input type="text" placeholder="Search" />
      </div>
    </nav>
  );
}
