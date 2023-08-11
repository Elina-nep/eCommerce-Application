import React, { useState } from 'react';
import { createCustomer } from '../../services/createCustomer';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { IRegistrationForm } from '../../types/registrationForm';
import './Register.css';

export const RegisterForm: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];

  const { handleSubmit, control } = useForm<IRegistrationForm>();
  const { errors } = useFormState({
    control,
  });
  const watchedCountry = useWatch({ control, name: 'billCountry' });
  const [billingAddressMatches, setBillingAddressMatches] = useState(true);
  const onSubmit: SubmitHandler<IRegistrationForm> = (data) => {
    console.log(data);

    createCustomer({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateBirth,
      addresses: [
        {
          country: data.billCountry,
          city: data.billCity,
          streetName: data.billStreet,
          postalCode: data.billPostalCode,
        },
      ],
      defaultShippingAddress: 0,
      defaultBillingAddress: 0,
      shippingAddresses: [0],
      billingAddresses: [0],
    });
  };

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
                    value={field.value || ''}
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
                    value={field.value || ''}
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
                  value={field.value || ''}
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
                  value={field.value || ''}
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
                  value={field.value || ''}
                  error={!!errors?.dateBirth?.message}
                  helperText={errors?.dateBirth?.message}
                  inputProps={{
                    min: '1901-01-01',
                    max: today,
                  }}
                />
              )}
            />
            <p>BillingAddresses</p>
            <div className="col-2">
              <FormGroup>
                <Controller
                  control={control}
                  name="isBillingAddressDefault"
                  defaultValue={false}
                  render={({ field }) => (
                    <FormGroup>
                      <FormControlLabel
                        labelPlacement="bottom"
                        control={
                          <Checkbox
                            size="small"
                            {...field}
                            onChange={(e) => field.onChange(e)}
                          />
                        }
                        label="Save"
                      />
                    </FormGroup>
                  )}
                />
              </FormGroup>
              <Controller
                control={control}
                name="billStreet"
                rules={streetValidation}
                render={({ field }) => (
                  <TextField
                    label="Street"
                    onChange={(e) => field.onChange(e)}
                    value={field.value || ''}
                    fullWidth={true}
                    size="small"
                    margin="normal"
                    type="string"
                    error={!!errors?.billStreet?.message}
                    helperText={errors?.billStreet?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="billCity"
                rules={nameValidation}
                render={({ field }) => (
                  <TextField
                    label="City"
                    onChange={(e) => field.onChange(e)}
                    value={field.value || ''}
                    fullWidth={true}
                    size="small"
                    margin="normal"
                    type="string"
                    error={!!errors?.billCity?.message}
                    helperText={errors?.billCity?.message}
                  />
                )}
              />
            </div>
            <div className="col-2">
              <Controller
                control={control}
                name="billPostalCode"
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
                    value={field.value || ''}
                    error={!!errors?.billPostalCode?.message}
                    helperText={errors?.billPostalCode?.message}
                  />
                )}
              />
            </div>

            <FormControl
              margin="normal"
              fullWidth
              size="small"
              error={!!errors?.billCountry?.message}
            >
              <InputLabel id="country-select-label">Country</InputLabel>
              <Controller
                control={control}
                name="billCountry"
                rules={countryValidation}
                render={({ field }) => (
                  <Select
                    labelId="country-select-label"
                    id="country-select"
                    value={field.value || ''}
                    label="Country"
                    onChange={(e) => field.onChange(e)}
                  >
                    <MenuItem value="US">USA</MenuItem>
                    <MenuItem value="DE">Germany</MenuItem>
                    <MenuItem value="RS">Serbia</MenuItem>
                    <MenuItem value="BY">Belarus</MenuItem>
                  </Select>
                )}
              />
              {errors?.billCountry?.message && (
                <FormHelperText>{errors.billCountry.message}</FormHelperText>
              )}
            </FormControl>
            <FormGroup>
              <Controller
                control={control}
                name="areAdressesSame"
                defaultValue={true}
                render={({ field }) => (
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setBillingAddressMatches(e.target.checked);
                          }}
                        />
                      }
                      label="My billing address matches shipping address"
                    />
                  </FormGroup>
                )}
              />
            </FormGroup>
            {!billingAddressMatches && (
              <div>
                <p>Shipping Addresses</p>
                <div className="col-2">
                  <FormGroup>
                    <Controller
                      control={control}
                      name="isShippingAddressDefault"
                      defaultValue={false}
                      render={({ field }) => (
                        <FormGroup>
                          <FormControlLabel
                            labelPlacement="bottom"
                            control={
                              <Checkbox
                                size="small"
                                {...field}
                                onChange={(e) => field.onChange(e)}
                              />
                            }
                            label="Save"
                          />
                        </FormGroup>
                      )}
                    />
                  </FormGroup>
                  <Controller
                    control={control}
                    name="shipStreet"
                    rules={streetValidation}
                    render={({ field }) => (
                      <TextField
                        label="Street"
                        onChange={(e) => field.onChange(e)}
                        value={field.value || ''}
                        fullWidth={true}
                        size="small"
                        margin="normal"
                        type="string"
                        error={!!errors?.shipStreet?.message}
                        helperText={errors?.shipStreet?.message}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="shipCity"
                    rules={nameValidation}
                    render={({ field }) => (
                      <TextField
                        label="City"
                        onChange={(e) => field.onChange(e)}
                        value={field.value || ''}
                        fullWidth={true}
                        size="small"
                        margin="normal"
                        type="string"
                        error={!!errors?.shipCity?.message}
                        helperText={errors?.shipCity?.message}
                      />
                    )}
                  />
                </div>
                <div className="col-2">
                  <Controller
                    control={control}
                    name="shipPostalCode"
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
                        value={field.value || ''}
                        error={!!errors?.shipPostalCode?.message}
                        helperText={errors?.shipPostalCode?.message}
                      />
                    )}
                  />
                </div>

                <FormControl
                  margin="normal"
                  fullWidth
                  size="small"
                  error={!!errors?.shipCountry?.message}
                >
                  <InputLabel id="country-select-label">Country</InputLabel>
                  <Controller
                    control={control}
                    name="shipCountry"
                    rules={countryValidation}
                    render={({ field }) => (
                      <Select
                        labelId="country-select-label"
                        id="country-select"
                        value={field.value || ''}
                        label="Country"
                        onChange={(e) => field.onChange(e)}
                      >
                        <MenuItem value="USA">USA</MenuItem>
                        <MenuItem value="Germany">Germany</MenuItem>
                        <MenuItem value="Serbia">Serbia</MenuItem>
                        <MenuItem value="Belarus">Belarus</MenuItem>
                      </Select>
                    )}
                  />
                  {errors?.shipCountry?.message && (
                    <FormHelperText>
                      {errors.shipCountry.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>
            )}
            <button type="submit" className="registration-page__btn">
              Create account
            </button>
          </form>
        </div>
      </ThemeProvider>
    </div>
  );
};
