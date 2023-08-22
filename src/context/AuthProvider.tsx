import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { ICreateCustomer, ILoginCustomer } from '../types';
import { createCustomerFunc, loginCustomerFunc, logOutFunc } from '../util';
import { getProductsFunc } from '../util/catalog';
import { ProductPagedQueryResponse } from '@commercetools/platform-sdk';

interface IUserAuth {
  ifAuth: boolean;
  loading: boolean;
  alertMessage: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setIfAuth: Dispatch<SetStateAction<boolean>>;
  loginCustomer: (data: ILoginCustomer) => void;
  createCustomer: (data: ICreateCustomer) => void;
  getProducts: () => Promise<ProductPagedQueryResponse>;
  logOut: () => void;
}

export const AuthContext = createContext<IUserAuth>({
  ifAuth: false,
  loading: false,
  alertMessage: '',
  setLoading: () => {},
  setIfAuth: () => {},
  loginCustomer: () => {},
  createCustomer: () => {},
  getProducts: () => new Promise(() => {}),
  logOut: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  const [ifAuth, setIfAuth] = useState(!!token);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const loginCustomer = (data: ILoginCustomer): Promise<void> =>
    loginCustomerFunc(data, setIfAuth, setAlertMessage);

  const createCustomer = (data: ICreateCustomer): Promise<void> =>
    createCustomerFunc(data, setIfAuth, setAlertMessage);

  const logOut = () => logOutFunc(setIfAuth);

  const getProducts = () => getProductsFunc(setLoading);

  return (
    <AuthContext.Provider
      value={{
        ifAuth,
        alertMessage,
        loading,
        setLoading,
        setIfAuth,
        loginCustomer,
        createCustomer,
        getProducts,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
