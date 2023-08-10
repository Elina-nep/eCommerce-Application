import { Link } from 'react-router-dom';
import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      this is header
      <Link to="login">login page</Link>
      <Link to="register">register page</Link>
      <Link to="/">main page</Link>
    </header>
  );
};
