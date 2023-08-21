import Head from './head/Head';
import { Navigation } from './navigation/Navigation';

export const Header = () => {
  return (
    <header className="header">
      <Head cartTotal={0} cartItemsCount={0} />
      <Navigation />
    </header>
  );
};
