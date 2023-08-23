import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { ICreateCustomer, ILoginCustomer } from '../types';
import { createCustomerFunc, loginCustomerFunc, logOutFunc } from '../util';

interface IUserAuth {
  ifAuth: boolean;
  alertMessage: string;
  setIfAuth: Dispatch<SetStateAction<boolean>>;
  loginCustomer: (data: ILoginCustomer) => void;
  createCustomer: (data: ICreateCustomer) => void;
  logOut: () => void;
}

export const AuthContext = createContext<IUserAuth>({
  ifAuth: false,
  alertMessage: '',
  setIfAuth: () => {},
  loginCustomer: () => {},
  createCustomer: () => {},
  logOut: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('user_token');
  const [ifAuth, setIfAuth] = useState(!!token);
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
        setIfAuth,
        loginCustomer,
        createCustomer,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
