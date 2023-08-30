import { useOutlet } from 'react-router-dom';

import { AuthProvider } from '../context/AuthProvider';

export const AuthLayout = () => {
  const outlet = useOutlet();

  return <AuthProvider>{outlet}</AuthProvider>;
};
