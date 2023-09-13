import { Cart } from '@commercetools/platform-sdk';
import { Dispatch, SetStateAction } from 'react';

import {
  createCustomerService,
  formAuthoredService,
  loginCustomerService,
} from '../services';
import { ICreateCustomer, ILoginCustomer } from '../types';

export const clearAlert = (
  setAlertMessage: Dispatch<SetStateAction<string>>,
) => {
  setTimeout(() => {
    setAlertMessage('');
  }, 3000);
};
export const loginCustomerFunc = (
  data: ILoginCustomer,
  setIfAuth: Dispatch<SetStateAction<boolean>>,
  setAlertMessage: Dispatch<SetStateAction<string>>,
  setCart: Dispatch<SetStateAction<Cart>>,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    loginCustomerService(data)
      .then((body) => {
        if (body.body.cart) {
          setCart(body.body.cart);
        }
        formAuthoredService(data).catch((e) => console.log(e));
        setIfAuth(true);
        setAlertMessage(
          `Hello ${body.body.customer.firstName || 'my friend'}!`,
        );
        clearAlert(setAlertMessage);
        resolve();
      })
      .catch((e) => {
        const errorMessage = e.message || 'An error occurred';
        reject(new Error(errorMessage));
      });
  });
};

export const createCustomerFunc = (
  data: ICreateCustomer,
  setIfAuth: Dispatch<SetStateAction<boolean>>,
  setAlertMessage: Dispatch<SetStateAction<string>>,
  setCart: Dispatch<SetStateAction<Cart>>,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    createCustomerService(data)
      .then((body) => {
        if (body.body.cart) {
          setCart(body.body.cart);
        }
        setIfAuth(true);
        setAlertMessage(`User ${body.body.customer.email} is created`);
        clearAlert(setAlertMessage);
        loginCustomerService({
          email: data.email,
          password: data.password,
        })
          .then(() => formAuthoredService(data).catch((e) => console.log(e)))
          .catch((e) => console.log(e));
        resolve();
      })
      .catch((e) => {
        const errorMessage = e.message || 'An error occurred';
        reject(new Error(errorMessage));
      });
  });
};

export const logOutFunc = (
  setIfAuth: Dispatch<SetStateAction<boolean>>,
  clearCart: () => void,
) => {
  clearCart();
  setIfAuth(false);
  localStorage.clear();
};
