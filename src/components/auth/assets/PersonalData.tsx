import React from 'react';
import { Controller } from 'react-hook-form';
import {
  nameValidation,
  emailValidation,
  passwordValidation,
  ageValidation,
} from '../../../util/validation';
import TextField from '@mui/material/TextField';
import { CustomTextInput } from './CustomTextInput';
import { PersonalDataProps } from '../../../types/form';

export const PersonalData: React.FC<PersonalDataProps> = ({
  control,
  errors,
}) => {
  const today = new Date().toISOString().split('T')[0];
  return (
    <div>
      <div className="registration-page__col-2">
        <Controller
          control={control}
          name="firstName"
          rules={nameValidation}
          render={({ field }) =>
            CustomTextInput(
              { ...field, id: 'firstName', label: 'First Name' },
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
              { ...field, id: 'lastName', label: 'Last Name' },
              errors,
            )
          }
        />
      </div>
      <div className="registration-page__col-2">
        <Controller
          control={control}
          name="email"
          rules={{ validate: emailValidation }}
          render={({ field }) =>
            CustomTextInput(
              { ...field, id: 'registrEmail', label: 'Email' },
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
              },
              errors,
            )
          }
        />
      </div>
      <Controller
        control={control}
        name="dateBirth"
        rules={ageValidation(13)}
        render={({ field }) => (
          <TextField
            id="dateBirth"
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
    </div>
  );
};
