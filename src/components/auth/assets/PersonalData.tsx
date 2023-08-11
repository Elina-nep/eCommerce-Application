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
      <div className="col-2">
        <Controller
          control={control}
          name="firstName"
          rules={nameValidation}
          render={({ field }) =>
            CustomTextInput({ ...field, label: 'First Name' }, errors)
          }
        />
        <Controller
          control={control}
          name="lastName"
          rules={nameValidation}
          render={({ field }) =>
            CustomTextInput({ ...field, label: 'Last Name' }, errors)
          }
        />
      </div>
      <Controller
        control={control}
        name="email"
        rules={emailValidation}
        render={({ field }) =>
          CustomTextInput({ ...field, label: 'Email' }, errors)
        }
      />
      <Controller
        control={control}
        name="password"
        rules={passwordValidation}
        render={({ field }) =>
          CustomTextInput(
            { ...field, label: 'Password', type: 'password' },
            errors,
          )
        }
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
    </div>
  );
};
