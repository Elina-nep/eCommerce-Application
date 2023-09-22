import { Customer } from '@commercetools/platform-sdk';

import { getCustomerService } from '../services';

export const getCustomerFunc = (): Promise<Customer> => {
  return new Promise((resolve, reject) => {
    getCustomerService()
      .then((body) => {
        resolve(body.body);
      })
      .catch((e) => {
        const errorMessage = e.message || 'An error occurred';
        reject(new Error(errorMessage));
      });
  });
};
