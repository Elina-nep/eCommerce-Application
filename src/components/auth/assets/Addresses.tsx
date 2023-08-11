import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { IRegistrationForm } from '../../../types/registrationForm';
import {
  streetValidation,
  nameValidation,
  postalCodeValidation,
  countryValidation,
} from '../../../util/validation';
import { AddressesContainerProps } from '../../../types/form';

const AddressesContainer: React.FC<AddressesContainerProps> = ({
  control,
  errors,
  watchedCountry,
  prefix,
}) => {
  const nameValidate = (value: string): string =>
    nameValidation.validate(value) as string;
  const postalCodeValidate = (value: string): string =>
    postalCodeValidation.validate(value, { country: watchedCountry }) as string;

  return (
    <div>
      <Controller
        control={control}
        name={`${prefix}Street` as keyof IRegistrationForm}
        rules={{ ...streetValidation, required: true }}
        render={({ field }) => (
          <TextField
            label="Street"
            {...field}
            fullWidth={true}
            value={field.value || ''}
            size="small"
            margin="normal"
            type="string"
            error={
              !!errors[`${prefix}Street` as keyof IRegistrationForm]?.message
            }
            helperText={
              errors[`${prefix}Street` as keyof IRegistrationForm]?.message
            }
          />
        )}
      />
      <Controller
        control={control}
        name={`${prefix}City` as keyof IRegistrationForm}
        rules={{
          ...nameValidation,
          required: true,
          validate: (value) => nameValidate(value as string),
        }}
        render={({ field }) => (
          <TextField
            label="City"
            {...field}
            fullWidth={true}
            value={field.value || ''}
            size="small"
            margin="normal"
            type="string"
            error={
              !!errors[`${prefix}City` as keyof IRegistrationForm]?.message
            }
            helperText={
              errors[`${prefix}City` as keyof IRegistrationForm]?.message
            }
          />
        )}
      />

      <Controller
        control={control}
        name={`${prefix}PostalCode` as keyof IRegistrationForm}
        rules={{
          ...postalCodeValidation,
          required: true,
          validate: (value) => postalCodeValidate(value as string),
        }}
        render={({ field }) => (
          <TextField
            label="Postal Code"
            {...field}
            fullWidth={true}
            value={field.value || ''}
            size="small"
            margin="normal"
            type="string"
            error={
              !!errors[`${prefix}PostalCode` as keyof IRegistrationForm]
                ?.message
            }
            helperText={
              errors[`${prefix}PostalCode` as keyof IRegistrationForm]?.message
            }
          />
        )}
      />
      <FormControl
        margin="normal"
        fullWidth
        size="small"
        error={!!errors[`${prefix}Country` as keyof IRegistrationForm]?.message}
      >
        <InputLabel id={`${prefix}country-select-label`}>Country</InputLabel>
        <Controller
          control={control}
          name={`${prefix}Country` as keyof IRegistrationForm}
          rules={{ ...countryValidation, required: true }}
          render={({ field }) => (
            <Select
              {...field}
              labelId={`${prefix}country-select-label`}
              value={field.value || ''}
              id={`${prefix}country-select`}
            >
              <MenuItem value="US">USA</MenuItem>
              <MenuItem value="DE">Germany</MenuItem>
              <MenuItem value="RS">Serbia</MenuItem>
              <MenuItem value="BY">Belarus</MenuItem>
            </Select>
          )}
        />
        {errors[`${prefix}Country` as keyof IRegistrationForm]?.message && (
          <FormHelperText>
            {errors[`${prefix}Country` as keyof IRegistrationForm]?.message}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

export default AddressesContainer;
