import { Customer } from '@commercetools/platform-sdk';
import { IProfileForm } from './profileFrom';
import { FieldErrors } from 'react-hook-form';
import { Control } from 'react-hook-form';
import { UseFormTrigger } from 'react-hook-form';

export interface UserFormProps {
  refreshCallback: () => void;
  response: Customer;
}

export interface PersonalProps {
  editMode: boolean;
  response: Customer;
  control: Control<IProfileForm>;
  errors: FieldErrors<IProfileForm>;
  trigger: UseFormTrigger<IProfileForm>;
}
