import { ICreateCustomer } from '../../types';
import { apiRoot } from '../BuildClient';

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
      alert(`User is created ${body.customer.id}`);
    })
    .catch(console.error);
};
