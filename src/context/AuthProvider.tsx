import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import LoadingSpinner from '../components/loading/LoadingSpinner';
import { ICreateCustomer, ILoginCustomer } from '../types';
import { createCustomerFunc, loginCustomerFunc, logOutFunc } from '../util';

interface IUserAuth {
  ifAuth: boolean;
  alertMessage: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setIfAuth: Dispatch<SetStateAction<boolean>>;
  loginCustomer: (data: ILoginCustomer) => void;
  createCustomer: (data: ICreateCustomer) => void;
  logOut: () => void;
}

export const AuthContext = createContext<IUserAuth>({
  ifAuth: false,
  alertMessage: '',
  setLoading: () => {},
  setIfAuth: () => {},
  loginCustomer: () => {},
  createCustomer: () => {},
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

  return (
    <AuthContext.Provider
      value={{
        ifAuth,
        alertMessage,
        setLoading,
        setIfAuth,
        loginCustomer,
        createCustomer,
        logOut,
      }}
    >
      {!loading && children}
      {loading && <LoadingSpinner />}
    </AuthContext.Provider>
  );
};
