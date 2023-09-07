import { Cart, Category } from '@commercetools/platform-sdk';
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { ICreateCustomer, ILoginCustomer } from '../types';
import {
  createCart,
  createCustomerFunc,
  defaultCart,
  getCart,
  getCategories,
  getCustomerFunc,
  loginCustomerFunc,
  logOutFunc,
} from '../util';

interface IUserAuth {
  ifAuth: boolean;
  alertMessage: string;
  categories: Category[];
  cart: Cart;
  setAlertMessage: Dispatch<SetStateAction<string>>;
  setIfAuth: Dispatch<SetStateAction<boolean>>;
  setCart: Dispatch<SetStateAction<Cart>>;
  loginCustomer: (data: ILoginCustomer) => void;
  createCustomer: (data: ICreateCustomer) => void;
  logOut: () => void;
}

export const AuthContext = createContext<IUserAuth>({
  ifAuth: false,
  alertMessage: '',
  categories: [],
  cart: defaultCart,
  setCart: () => {},
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
  const [cart, setCart] = useState<Cart>(defaultCart);

  const checkCart = () => {
    getCart(setLoading)
      .then((res) => {
        if (res.results.length < 1) {
          createCart().then((res) => {
            setCart(res);
          });
        } else {
          setCart(res.results[0]);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    getCustomerFunc(setLoading)
      .then(() => {
        setIfAuth(true);
        checkCart();
        getCategories().then((res) => {
          setCategories(res.results);
        });
      })
      .catch(() => {
        getCategories()
          .then((res) => {
            setCategories(res.results);
          })
          .catch(() => {
            localStorage.clear();
            getCategories().then((res) => {
              setCategories(res.results);
            });
          });
      })
      .finally(() => {
        setLoading(false);
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
        cart,
        setCart,
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
