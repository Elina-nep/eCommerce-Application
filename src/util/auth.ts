import { Dispatch, SetStateAction } from 'react';

import { createCustomerService, loginCustomerService } from '../services';
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
): Promise<void> => {
  return new Promise((resolve, reject) => {
    loginCustomerService(data)
      .then((body) => {
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
): Promise<void> => {
  return new Promise((resolve, reject) => {
    createCustomerService(data)
      .then((body) => {
        setIfAuth(true);
        setAlertMessage(`User ${body.body.customer.email} is created`);
        clearAlert(setAlertMessage);
        loginCustomerService({ email: data.email, password: data.password });
        resolve();
      })
      .catch((e) => {
        const errorMessage = e.message || 'An error occurred';
        reject(new Error(errorMessage));
      });
  });
};

export const logOutFunc = (setIfAuth: Dispatch<SetStateAction<boolean>>) => {
  setIfAuth(false);
  localStorage.clear();
};
