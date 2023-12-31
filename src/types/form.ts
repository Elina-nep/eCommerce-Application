import { Control } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form';

import { IRegistrationForm } from './registrationForm';

export interface TextFieldProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  name: keyof IRegistrationForm;
  value: string;
  label?: string;
  type?: string;
  calendarlimit?: {
    min?: string;
    max?: string;
  };
  autocomplete?: string;
  id: string;
}

export type CheckboxFieldName =
  | 'isBillingAddressDefault'
  | 'areAddressesSame'
  | 'isShippingAddressDefault';

export interface CustomCheckboxProps {
  control: Control<IRegistrationForm>;
  name: CheckboxFieldName;
  label: string;
  isChecked?: boolean;
  onChange?: (checked: boolean) => void;
  id: string;
}

export interface PersonalDataProps {
  control: Control<IRegistrationForm>;
  errors: FieldErrors<IRegistrationForm>;
  onFocusInput: () => void;
}

export interface AddressesContainerProps {
  control: Control<IRegistrationForm>;
  errors: FieldErrors<IRegistrationForm>;
  watchedCountry?: string;
  prefix?: string;
}

export interface FormErrorProps {
  message: string;
}

export interface ToggleVisibilityProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
