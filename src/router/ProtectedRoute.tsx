import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from '../context/AuthProvider';

export const ProtectedRoute = () => {
  const { ifAuth } = useContext(AuthContext);
  return (
    <>
      {!ifAuth && <Outlet />}
      {ifAuth && <Navigate to="/" />}
    </>
  );
};
