import Head from './Head';
import { Navigation } from './Navigation';

export const Header = () => {
  return (
    <header className="header">
      <Head cartTotal={0} cartItemsCount={0} />
      <Navigation />
    </header>
  );
};
