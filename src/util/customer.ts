import { Dispatch, SetStateAction } from 'react';
import { Customer } from '@commercetools/platform-sdk';
import { getCustomerService } from '../services';
import { changeCustomerService } from '../services/customer/getCustomer';
import { CustomerChanges } from '../types';

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
): Promise<Customer> => {
  setLoading(true);
  return new Promise((resolve, reject) => {
    changeCustomerService(myActions)
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
