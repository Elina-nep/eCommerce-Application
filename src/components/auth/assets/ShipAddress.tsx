import { AddressesContainerProps } from '../../../types/form';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import {
  streetValidation,
  nameValidation,
  postalCodeValidation,
  countryValidation,
} from '../../../util/validation';
import { IRegistrationForm } from '../../../types';

import { useWatch } from 'react-hook-form';

export const ShipAddresses: React.FC<AddressesContainerProps> = ({
  control,
  errors,
}: AddressesContainerProps) => {
  const watchedCountry = useWatch({
    control,
    name: 'shipCountry',
    defaultValue: '',
  });

  const postalCodeValidate = (value: string): string =>
    postalCodeValidation.validate(value, watchedCountry) as string;

  return (
    <div>
      <Controller
        control={control}
        name={`shipStreet`}
        rules={streetValidation}
        render={({ field }) => (
          <TextField
            id={`shipStreet`}
            label="Street"
            {...field}
            fullWidth={true}
            value={field.value || ''}
            size="small"
            margin="normal"
            type="string"
            error={!!errors[`shipStreet` as keyof IRegistrationForm]?.message}
            helperText={
              errors[`shipStreet` as keyof IRegistrationForm]?.message
            }
          />
        )}
      />
      <Controller
        control={control}
        name="shipCity"
        rules={nameValidation}
        render={({ field }) => (
          <TextField
            id={`shipCity`}
            label="City"
            {...field}
            fullWidth={true}
            value={field.value || ''}
            size="small"
            margin="normal"
            type="string"
            error={!!errors[`shipCity` as keyof IRegistrationForm]?.message}
            helperText={errors[`shipCity` as keyof IRegistrationForm]?.message}
          />
        )}
      />

      <Controller
        control={control}
        name={`shipPostalCode` as keyof IRegistrationForm}
        rules={{
          ...postalCodeValidation,
          required: 'This field is required',
          validate: (value) => postalCodeValidate(value as string),
        }}
        render={({ field }) => (
          <TextField
            id={`shippostalCode`}
            label="Postal Code"
            {...field}
            fullWidth={true}
            value={field.value || ''}
            size="small"
            margin="normal"
            type="string"
            error={
              !!errors[`shipPostalCode` as keyof IRegistrationForm]?.message
            }
            helperText={
              errors[`shipPostalCode` as keyof IRegistrationForm]?.message
            }
          />
        )}
      />
      <FormControl
        margin="normal"
        fullWidth
        size="small"
        error={!!errors[`shipCountry` as keyof IRegistrationForm]?.message}
      >
        <InputLabel id={`shipcountry-select-label`}>Country</InputLabel>
        <Controller
          control={control}
          name="shipCountry"
          rules={{ validate: countryValidation.validate }}
          render={({ field }) => (
            <Select
              {...field}
              labelId={`shipcountry-select-label`}
              value={field.value || ''}
              id={`shipcountry-select`}
            >
              <MenuItem value="US">USA</MenuItem>
              <MenuItem value="DE">Germany</MenuItem>
              <MenuItem value="RS">Serbia</MenuItem>
              <MenuItem value="BY">Belarus</MenuItem>
            </Select>
          )}
        />
        {errors[`shipCountry` as keyof IRegistrationForm]?.message && (
          <FormHelperText>
            {errors[`shipCountry` as keyof IRegistrationForm]?.message}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
};
