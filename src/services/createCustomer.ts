import { BaseAddress } from '@commercetools/platform-sdk';
import { apiRoot } from './BuildClient';

interface ICreateCustomer {
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

export const createCustomer = ({
  email,
  password,
  firstName,
  lastName,
  dateOfBirth,
  addresses,
  defaultShippingAddress,
  shippingAddresses,
  defaultBillingAddress,
  billingAddresses,
}: ICreateCustomer) => {
  apiRoot
    .customers()
    .post({
      // The CustomerDraft is the object within the body
      body: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        addresses: addresses,
        defaultShippingAddress: defaultShippingAddress,
        shippingAddresses: shippingAddresses,
        defaultBillingAddress: defaultBillingAddress,
        billingAddresses: billingAddresses,
      },
    })
    .execute()
    .then(({ body }) => {
      console.log(body.customer.id);
    })
    .catch(console.error);
};
