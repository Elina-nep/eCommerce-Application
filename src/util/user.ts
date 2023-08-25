import { Customer } from '@commercetools/platform-sdk';
import { IProfileForm } from '../types/profileFrom';

export const customerToFormMapper = (customer: Customer): IProfileForm => {
  return {
    firstName: customer.firstName!,
    lastName: customer.lastName!,
    email: customer.email!,
    password: customer.password!,
    dateOfBirth: customer.dateOfBirth!,
    billStreet: customer.addresses[0].streetName!,
    billCity: customer.addresses[0].city!,
    billPostalCode: customer.addresses[0].postalCode!,
    billCountry: customer.addresses[0].country!,
    shipStreet: customer.addresses[1].streetName!,
    shipCity: customer.addresses[1].city!,
    shipPostalCode: customer.addresses[1].postalCode!,
    shipCountry: customer.addresses[1].country!,
    areAddressesSame: customer.addresses.length === 1,
    isBillingAddressDefault:
      customer.defaultBillingAddressId === customer.addresses[0].id,
    isShippingAddressDefault:
      customer.defaultBillingAddressId === customer.addresses[1].id,
  };
};
