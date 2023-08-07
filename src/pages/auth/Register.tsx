import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  useForm,
  SubmitHandler,
  Controller,
  useFormState,
} from 'react-hook-form';
import {
  nameValidation,
  ageValidation,
  passwordValidation,
  emailValidation,
} from '../../util/validation';
import { IRegistrationForm } from '../../types/index';
import './Register.css';

export const Register: React.FC = () => {
  const { handleSubmit, control } = useForm<IRegistrationForm>();
  const { errors } = useFormState({
    control,
  });

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
                label="Date of Birth"
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
            rules={nameValidation}
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
            rules={nameValidation}
            render={({ field }) => (
              <TextField
                label="Postal Code"
                onChange={(e) => field.onChange(e)}
                value={field.value}
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
          <Controller
            control={control}
            name="country"
            rules={nameValidation}
            render={({ field }) => (
              <TextField
                label="Country"
                onChange={(e) => field.onChange(e)}
                value={field.value}
                fullWidth={true}
                size="small"
                margin="normal"
                type="string"
                className="registration-form__input"
                error={!!errors?.country?.message}
                helperText={errors?.country?.message}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth={true}
            disableElevation={true}
            sx={{
              marginTop: 2,
            }}
          >
            Create account
          </Button>
        </form>
      </div>
    </div>
  );
};
