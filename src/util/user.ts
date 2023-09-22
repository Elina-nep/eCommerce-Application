import { Customer } from '@commercetools/platform-sdk';

import { IProfileForm } from '../types/profileFrom';

export const customerToFormMapper = (customer: Customer): IProfileForm => {
  return {
    firstName: customer.firstName!,
    lastName: customer.lastName!,
    email: customer.email!,
    password: customer.password!,
    dateOfBirth: customer.dateOfBirth!,
  };
};
