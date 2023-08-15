import { IRegistrationForm } from './registrationForm';
import { Control } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form';

export interface TextFieldProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: keyof IRegistrationForm;
  value: string;
  label?: string;
  type?: string;
  calendarlimit?: {
    min?: string;
    max?: string;
  };
  autocomplete?: string;
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
}

export interface PersonalDataProps {
  control: Control<IRegistrationForm>;
  errors: FieldErrors<IRegistrationForm>;
}

export interface AddressesContainerProps {
  control: Control<IRegistrationForm>;
  errors: FieldErrors<IRegistrationForm>;
  watchedCountry: string;
  prefix: string;
}

export interface FormErrorProps {
  message: string;
}

export interface ToggleVisibilityProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
