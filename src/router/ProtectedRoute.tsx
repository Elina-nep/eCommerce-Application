import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { StoreType } from '../store/store';

export const ProtectedRoute = () => {
  const ifAuth = useSelector((state: StoreType) => state.ifAuth.ifAuth);
  return (
    <>
      {!ifAuth && <Outlet />}
      {ifAuth && <Navigate to="/" />}
    </>
  );
};
