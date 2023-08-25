import { Customer } from '@commercetools/platform-sdk';

export interface UserFormProps {
  refreshCallback: () => void;
  response: Customer;
}

export interface PersonalProps {
  response: Customer;
  refreshCallback: () => void;
}
