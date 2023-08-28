import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { ICreateCustomer, ILoginCustomer } from '../types';
import {
  createCustomerFunc,
  getCategoriesFunc,
  getCustomerFunc,
  loginCustomerFunc,
  logOutFunc,
} from '../util';
import { Category } from '@commercetools/platform-sdk';

interface IUserAuth {
  ifAuth: boolean;
  alertMessage: string;
  categories: Category[];
  setAlertMessage: Dispatch<SetStateAction<string>>;
  setIfAuth: Dispatch<SetStateAction<boolean>>;
  loginCustomer: (data: ILoginCustomer) => void;
  createCustomer: (data: ICreateCustomer) => void;
  logOut: () => void;
}

export const AuthContext = createContext<IUserAuth>({
  ifAuth: false,
  alertMessage: '',
  categories: [],
  setAlertMessage: () => {},
  setIfAuth: () => {},
  loginCustomer: () => {},
  createCustomer: () => {},
  logOut: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [ifAuth, setIfAuth] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCustomerFunc(setLoading)
      .then(() => {
        setIfAuth(true);
        getCategoriesFunc().then((res) => {
          setCategories(res.results);
        });
      })
      .catch(() => {
        getCategoriesFunc()
          .then((res) => {
            setCategories(res.results);
          })
          .catch(() => {
            localStorage.clear();
            getCategoriesFunc().then((res) => {
              setCategories(res.results);
            });
          });
      });
  }, []);

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
        categories,
        setAlertMessage,
        setIfAuth,
        loginCustomer,
        createCustomer,
        logOut,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
