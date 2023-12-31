import TextField from '@mui/material/TextField';
import { FieldErrors } from 'react-hook-form';

import { TextFieldProps } from '../../../types/form';
import { IRegistrationForm } from '../../../types/registrationForm';

export const CustomTextInput = (
  {
    name,
    value = '',
    label,
    type,
    onChange,
    onFocus,
    autocomplete,
    id,
    ...restProps
  }: TextFieldProps,
  errors: FieldErrors<IRegistrationForm>,
) => {
  const autoCompleteValue = autocomplete || 'off';
  return (
    <TextField
      name={name}
      value={value}
      label={label}
      type={type}
      fullWidth={true}
      size="small"
      margin="normal"
      onChange={onChange}
      onFocus={onFocus}
      error={!!errors[name]?.message}
      helperText={errors[name]?.message}
      autoComplete={autoCompleteValue}
      id={id}
      {...restProps}
    />
  );
};
