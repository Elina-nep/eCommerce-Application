import { Dispatch, SetStateAction } from 'react';
import { Customer } from '@commercetools/platform-sdk';
import {
  getCustomerService,
  changeCustomerService,
  changeCustomerPasswordService,
} from '../services';
import { CustomerChanges, Password } from '../types';
import { clearAlert } from '.';

export const getCustomerFunc = (
  setLoading: Dispatch<SetStateAction<boolean>>,
): Promise<Customer> => {
  setLoading(true);
  return new Promise((resolve, reject) => {
    getCustomerService()
      .then((body) => {
        resolve(body.body);
      })
      .catch((e) => {
        const errorMessage = e.message || 'An error occurred';
        reject(new Error(errorMessage));
      })
      .finally(() => {
        setLoading(false);
      });
  });
};

export const changeCustomerFunc = (
  setLoading: Dispatch<SetStateAction<boolean>>,
  myActions: CustomerChanges,
  version: number,
  setAlertMessage: Dispatch<SetStateAction<string>>,
): Promise<Customer> => {
  setLoading(true);
  return new Promise((resolve, reject) => {
    changeCustomerService(myActions, version)
      .then((body) => {
        setAlertMessage(`Changes saved successfully`);
        clearAlert(setAlertMessage);
        resolve(body.body);
      })
      .catch((e) => {
        const errorMessage = e.message || 'An error occurred';
        reject(new Error(errorMessage));
      })
      .finally(() => {
        setLoading(false);
      });
  });
};

export const changeCustomerPasswordFunc = (
  setLoading: Dispatch<SetStateAction<boolean>>,
  passwords: Password,
  version: number,
  setAlertMessage: Dispatch<SetStateAction<string>>,
): Promise<Customer> => {
  setLoading(true);
  return new Promise((resolve, reject) => {
    changeCustomerPasswordService(passwords, version)
      .then((body) => {
        setAlertMessage(`Changes saved successfully`);
        clearAlert(setAlertMessage);
        resolve(body.body);
      })
      .catch((e) => {
        const errorMessage = e.message || 'An error occurred';
        reject(new Error(errorMessage));
      })
      .finally(() => {
        setLoading(false);
      });
  });
};
