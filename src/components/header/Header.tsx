import { Link } from 'react-router-dom';
import { getProject } from '../../sdk/GetInfo';

export const Header = () => {
  getProject().then(console.log).catch(console.error);
  return (
    <header className="header">
      this is header
      <Link to="login">login page</Link>
      <Link to="register">register page</Link>
      <Link to="/">main page</Link>
    </header>
  );
};
