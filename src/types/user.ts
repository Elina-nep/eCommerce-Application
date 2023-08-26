import { Customer, BaseAddress } from '@commercetools/platform-sdk';

export interface UserFormProps {
  refreshCallback: () => void;
  response: Customer;
}

export interface PersonalProps {
  response: Customer;
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
