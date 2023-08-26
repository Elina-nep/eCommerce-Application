import { Customer, BaseAddress } from '@commercetools/platform-sdk';

export interface UserFormProps {
  refreshCallback: () => void;
  response: Customer;
}

export interface PersonalProps {
  response: Customer;
  refreshCallback: () => void;
}

export interface ChangePasswordProps {
  version: number;
  refreshCallback: () => void;
}

interface Default {
  isDefault: boolean;
}

export interface BillAddProps {
  address: BaseAddress & Default;
  version: number;
  addressType: AddressType;
  refreshCallback: () => void;
}

export enum AddressType {
  BILL = 'Billing',
  SHIP = 'Shipping',
}

export interface AddAddressProps {
  version: number;
  addressType: AddressType;
  refreshCallback: () => void;
}
