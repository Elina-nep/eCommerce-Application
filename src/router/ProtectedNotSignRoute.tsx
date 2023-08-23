import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

export const ProtectedNotSignRoute = () => {
  const { ifAuth } = useContext(AuthContext);
  return (
    <>
      {ifAuth && <Outlet />}
      {!ifAuth && <Navigate to="/login" />}
    </>
  );
};
