import { BaseAddress, Customer } from '@commercetools/platform-sdk';

export interface IProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
}

export interface IProfileFormProps {
  refreshCallback: () => void;
  response: Customer;
}

export interface IPersonalProps {
  response: Customer;
  refreshCallback: () => void;
}

export interface IAddress {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

interface Default {
  isDefault: boolean;
}

export enum AddressType {
  BILL = 'Billing',
  SHIP = 'Shipping',
}

export interface IAddressProps {
  customer: Customer;
  address: BaseAddress & Default;
  version: number;
  addressType: AddressType;
  refreshCallback: () => void;
}

export interface IAddAddressProps {
  customer: Customer;
  version: number;
  addressType: AddressType;
  refreshCallback: () => void;
}

export interface IAddAdress {
  streetName: string;
  city: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

export interface IChangePasswordProps {
  version: number;
}
