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

export const BillAddresses: React.FC<AddressesContainerProps> = ({
  control,
  errors,
}: AddressesContainerProps) => {
  const watchedCountry = useWatch({
    control,
    name: 'billCountry',
    defaultValue: '',
  });

  const postalCodeValidate = (value: string): string =>
    postalCodeValidation.validate(value, watchedCountry) as string;

  return (
    <div>
      <div className="registration-page__col-2">
        <Controller
          control={control}
          name={`billStreet`}
          rules={streetValidation}
          render={({ field }) => (
            <TextField
              id={`billStreet`}
              label="Street"
              {...field}
              fullWidth={true}
              value={field.value || ''}
              size="small"
              margin="normal"
              type="string"
              error={!!errors[`billStreet` as keyof IRegistrationForm]?.message}
              helperText={
                errors[`billStreet` as keyof IRegistrationForm]?.message
              }
            />
          )}
        />
        <div className="registration-page__spacing" />
        <Controller
          control={control}
          name="billCity"
          rules={nameValidation}
          render={({ field }) => (
            <TextField
              id={`billCity`}
              label="City"
              {...field}
              fullWidth={true}
              value={field.value || ''}
              size="small"
              margin="normal"
              type="string"
              error={!!errors[`billCity` as keyof IRegistrationForm]?.message}
              helperText={
                errors[`billCity` as keyof IRegistrationForm]?.message
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
          error={!!errors[`billCountry` as keyof IRegistrationForm]?.message}
        >
          <InputLabel id="billcountry-select-label">Country</InputLabel>
          <Controller
            control={control}
            name="billCountry"
            rules={{ validate: countryValidation.validate }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="billcountry-select-label"
                value={field.value || ''}
                label="Country"
                id="billcountry-select"
              >
                <MenuItem value="DE">Germany</MenuItem>
                <MenuItem value="RS">Serbia</MenuItem>
                <MenuItem value="BY">Belarus</MenuItem>
              </Select>
            )}
          />
          {errors[`billCountry` as keyof IRegistrationForm]?.message && (
            <FormHelperText>
              {errors[`billCountry` as keyof IRegistrationForm]?.message}
            </FormHelperText>
          )}
        </FormControl>
        <div className="registration-page__spacing" />
        <Controller
          control={control}
          name={`billPostalCode` as keyof IRegistrationForm}
          rules={{
            ...postalCodeValidation,
            required: 'This field is required',
            validate: (value) => postalCodeValidate(value as string),
          }}
          render={({ field }) => (
            <TextField
              id={`billpostalCode`}
              label="Postal Code"
              {...field}
              fullWidth={true}
              value={field.value || ''}
              size="small"
              margin="normal"
              type="string"
              error={
                !!errors[`billPostalCode` as keyof IRegistrationForm]?.message
              }
              helperText={
                errors[`billPostalCode` as keyof IRegistrationForm]?.message
              }
            />
          )}
        />
      </div>
    </div>
  );
};
