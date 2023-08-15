import { ICreateCustomer } from '../../types';
import { formFlow } from '../BuildClient';

export const createCustomerService = ({
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
}: ICreateCustomer) =>
  formFlow({ username: email, password: password })
    .customers()
    .post({
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
    .execute();
