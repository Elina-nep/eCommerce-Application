import TextField from '@mui/material/TextField';
import React from 'react';
import { Controller } from 'react-hook-form';

import { PersonalDataProps } from '../../../types/form';
import {
  ageValidation,
  emailValidation,
  nameValidation,
  passwordValidation,
} from '../../../util/validation';
import { CustomTextInput } from './CustomTextInput';

export const PersonalData: React.FC<PersonalDataProps> = ({
  control,
  errors,
  onFocusInput,
}) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <div className="form__col-2">
        <Controller
          control={control}
          name="firstName"
          rules={nameValidation}
          render={({ field }) =>
            CustomTextInput(
              {
                ...field,
                id: 'firstName',
                label: 'First Name',
                onFocus: onFocusInput,
              },
              errors,
            )
          }
        />
        <div className="registration-page__spacing" />

        <Controller
          control={control}
          name="lastName"
          rules={nameValidation}
          render={({ field }) =>
            CustomTextInput(
              {
                ...field,
                id: 'lastName',
                label: 'Last Name',
                onFocus: onFocusInput,
              },
              errors,
            )
          }
        />
      </div>
      <div className="form__col-2">
        <Controller
          control={control}
          name="email"
          rules={{ validate: emailValidation }}
          render={({ field }) =>
            CustomTextInput(
              {
                ...field,
                id: 'registrEmail',
                label: 'Email',
                onFocus: onFocusInput,
              },
              errors,
            )
          }
        />
        <div className="registration-page__spacing" />

        <Controller
          control={control}
          name="password"
          rules={passwordValidation}
          render={({ field }) =>
            CustomTextInput(
              {
                ...field,
                id: 'registrPassword',
                label: 'Password',
                type: 'password',
                onFocus: onFocusInput,
              },
              errors,
            )
          }
        />
      </div>
      <Controller
        control={control}
        name="dateOfBirth"
        rules={ageValidation(13)}
        render={({ field }) => (
          <TextField
            id="dateBirth"
            {...field}
            fullWidth={true}
            size="small"
            margin="normal"
            type="date"
            value={field.value || ''}
            error={!!errors?.dateOfBirth?.message}
            helperText={errors?.dateOfBirth?.message}
            inputProps={{
              min: '1901-01-01',
              max: today,
            }}
          />
        )}
      />
    </div>
  );
};
