import { BaseAddress } from '@commercetools/platform-sdk';

export interface ICreateCustomer {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  addresses?: BaseAddress[];
  defaultShippingAddress?: number;
  shippingAddresses?: number[];
  defaultBillingAddress?: number;
  billingAddresses?: number[];
}
