import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useOutlet } from 'react-router-dom';

import {
  AppDispatch,
  getCartThunk,
  getCategoriesThunk,
  getIfAuthThunk,
} from '../store';

export const AuthLayout = () => {
  const outlet = useOutlet();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getIfAuthThunk()).finally(() => {
      dispatch(getCategoriesThunk()).finally(() => {
        dispatch(getCartThunk());
      });
    });
  }, [dispatch]);

  return <>{outlet}</>;
};
