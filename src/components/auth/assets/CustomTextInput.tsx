import TextField from '@mui/material/TextField';
import { TextFieldProps } from '../../../types/form';
import { IRegistrationForm } from '../../../types/registrationForm';
import { FieldErrors } from 'react-hook-form';

export const CustomTextInput = (
  {
    name,
    value = '',
    label,
    type,
    onChange,
    onFocus, // Add onFocus prop
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
