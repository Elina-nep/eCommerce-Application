import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import { useWatch } from 'react-hook-form';

import { IRegistrationForm } from '../../../types';
import { AddressesContainerProps } from '../../../types/form';
import {
  countryValidation,
  nameValidation,
  postalCodeValidation,
  streetValidation,
} from '../../../util/validation';

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
      <div className="registration-page__col-2">
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
        <div className="registration-page__spacing" />
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
              helperText={
                errors[`shipCity` as keyof IRegistrationForm]?.message
              }
            />
          )}
        />
      </div>

      <div className="registration-page__col-2">
        <FormControl
          margin="normal"
          fullWidth
          size="small"
          error={!!errors[`shipCountry` as keyof IRegistrationForm]?.message}
        >
          <InputLabel id="shipcountry-select-label">Country</InputLabel>
          <Controller
            control={control}
            name="shipCountry"
            rules={{ validate: countryValidation.validate }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="shipcountry-select-label"
                value={field.value || ''}
                label="Country"
                id="shipcountry-select"
              >
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
        <div className="registration-page__spacing" />
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
      </div>
    </div>
  );
};
