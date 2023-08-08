import React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

import {
  Controller,
  useForm,
  useFormState,
  SubmitHandler,
  useWatch,
} from 'react-hook-form';
import {
  nameValidation,
  ageValidation,
  passwordValidation,
  emailValidation,
  streetValidation,
  countryValidation,
  postalCodeValidation,
} from '../../util/validation';
import { IRegistrationForm } from '../../types/index';
import './Register.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
    error: {
      main: '#FE4004',
    },
  },
});

export const Register: React.FC = () => {
  const { handleSubmit, control } = useForm<IRegistrationForm>();
  const { errors } = useFormState({
    control,
  });
  const watchedCountry = useWatch({ control, name: 'country' });

  const onSubmit: SubmitHandler<IRegistrationForm> = (data) =>
    console.log(data);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <div className="registration-page">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-2">
              <Controller
                control={control}
                name="firstName"
                rules={nameValidation}
                render={({ field }) => (
                  <TextField
                    label="First Name"
                    onChange={(e) => field.onChange(e)}
                    value={field.value}
                    fullWidth={true}
                    size="small"
                    margin="normal"
                    error={!!errors.firstName?.message}
                    helperText={errors?.firstName?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="lastName"
                rules={nameValidation}
                render={({ field }) => (
                  <TextField
                    label="Last Name"
                    onChange={(e) => field.onChange(e)}
                    value={field.value}
                    fullWidth={true}
                    size="small"
                    margin="normal"
                    error={!!errors.lastName?.message}
                    helperText={errors?.lastName?.message}
                  />
                )}
              />
            </div>
            <Controller
              control={control}
              name="email"
              rules={emailValidation}
              render={({ field }) => (
                <TextField
                  label="Email"
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  fullWidth={true}
                  size="small"
                  margin="normal"
                  error={!!errors.email?.message}
                  helperText={errors?.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={passwordValidation}
              render={({ field }) => (
                <TextField
                  label="Password"
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  fullWidth={true}
                  size="small"
                  margin="normal"
                  type="password"
                  error={!!errors?.password?.message}
                  helperText={errors?.password?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="dateBirth"
              rules={ageValidation(13)}
              render={({ field }) => (
                <TextField
                  // label="Date of Birth"
                  {...field}
                  fullWidth={true}
                  size="small"
                  margin="normal"
                  type="date"
                  error={!!errors?.dateBirth?.message}
                  helperText={errors?.dateBirth?.message}
                />
              )}
            />
            <div className="col-2">
              <Controller
                control={control}
                name="street"
                rules={streetValidation}
                render={({ field }) => (
                  <TextField
                    label="Street"
                    onChange={(e) => field.onChange(e)}
                    value={field.value}
                    fullWidth={true}
                    size="small"
                    margin="normal"
                    type="string"
                    error={!!errors?.street?.message}
                    helperText={errors?.street?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="city"
                rules={nameValidation}
                render={({ field }) => (
                  <TextField
                    label="City"
                    onChange={(e) => field.onChange(e)}
                    value={field.value}
                    fullWidth={true}
                    size="small"
                    margin="normal"
                    type="string"
                    error={!!errors?.city?.message}
                    helperText={errors?.city?.message}
                  />
                )}
              />
            </div>
            <div className="col-2">
              <Controller
                control={control}
                name="postalCode"
                rules={{
                  ...postalCodeValidation,
                  validate: (value: string) =>
                    postalCodeValidation.validate(value, {
                      country: watchedCountry,
                    }),
                }}
                render={({ field }) => (
                  <TextField
                    label="Postal Code"
                    {...field}
                    fullWidth={true}
                    size="small"
                    margin="normal"
                    type="string"
                    error={!!errors?.postalCode?.message}
                    helperText={errors?.postalCode?.message}
                  />
                )}
              />
            </div>

            <FormControl
              margin="normal"
              fullWidth
              size="small"
              error={!!errors?.country?.message}
            >
              <InputLabel id="country-select-label">Country</InputLabel>
              <Controller
                control={control}
                name="country"
                rules={countryValidation}
                render={({ field }) => (
                  <Select
                    labelId="country-select-label"
                    id="country-select"
                    value={field.value}
                    label="Country"
                    onChange={(e) => field.onChange(e)}
                  >
                    <MenuItem value="USA">USA</MenuItem>
                    <MenuItem value="Germany">Germany</MenuItem>
                  </Select>
                )}
              />
              {errors?.country?.message && (
                <FormHelperText>{errors.country.message}</FormHelperText>
              )}
            </FormControl>

            <button type="submit" className="registration-page__btn">
              Create account
            </button>
          </form>
        </div>
      </ThemeProvider>
    </div>
  );
};
