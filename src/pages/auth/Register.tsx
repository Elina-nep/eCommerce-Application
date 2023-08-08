import React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
      <div className="registration-form">
        <form
          className="registration-form__form"
          onSubmit={handleSubmit(onSubmit)}
        >
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
                className="registration-form__input"
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
                className="registration-form__input"
                error={!!errors.lastName?.message}
                helperText={errors?.lastName?.message}
              />
            )}
          />
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
                className="registration-form__input"
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
                className="registration-form__input"
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
                className="registration-form__input"
                error={!!errors?.dateBirth?.message}
                helperText={errors?.dateBirth?.message}
              />
            )}
          />

          <p>Adress</p>
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
                className="registration-form__input"
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
                className="registration-form__input"
                error={!!errors?.city?.message}
                helperText={errors?.city?.message}
              />
            )}
          />
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
                className="registration-form__input"
                error={!!errors?.postalCode?.message}
                helperText={errors?.postalCode?.message}
              />
            )}
          />

          <FormControl fullWidth size="small">
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
                  error={!!errors?.country?.message}
                >
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="Germany">Germany</MenuItem>
                </Select>
              )}
            />
            {errors?.country?.message && (
              <span style={{ color: 'red' }}>{errors.country.message}</span>
            )}
          </FormControl>
          <button type="submit">Create account</button>
        </form>
      </div>
    </div>
  );
};
