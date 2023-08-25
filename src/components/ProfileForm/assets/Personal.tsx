import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { nameValidation, ageValidation } from '../../../util';
import { PersonalProps } from '../../../types/user';

export const Personal: React.FC<PersonalProps> = ({
  editMode,
  response,
  control,
  errors,
  trigger,
}) => {
  const { firstName, lastName, dateOfBirth } = response;

  const [editedValues, setEditedValues] = useState({
    firstName,
    lastName,
    dateOfBirth,
  });

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="prof__col-2">
      <Controller
        control={control}
        name="firstName"
        rules={nameValidation}
        render={({ field }) => (
          <TextField
            id="firstName"
            label="First name"
            {...field}
            fullWidth
            size="small"
            margin="normal"
            type="text"
            onBlur={() => {
              trigger('firstName');
            }}
            onChange={(e) => {
              field.onChange(e);
              const newValue = e.target.value;
              setEditedValues((prevValues) => ({
                ...prevValues,
                firstName: newValue,
              }));
              trigger('firstName');
            }}
            value={editMode ? editedValues.firstName : response.firstName}
            error={!!errors.firstName?.message}
            helperText={errors?.firstName?.message}
            InputProps={{
              readOnly: !editMode,
            }}
            variant={editMode ? 'outlined' : 'standard'}
          />
        )}
      />
      <div className="registration-page__spacing" />
      <Controller
        control={control}
        name="lastName"
        rules={nameValidation}
        render={({ field }) => (
          <TextField
            id="lastName"
            label="Last name"
            {...field}
            fullWidth
            size="small"
            margin="normal"
            type="text"
            onBlur={() => {
              trigger('lastName');
            }}
            onChange={(e) => {
              field.onChange(e);
              const newValue = e.target.value;
              setEditedValues((prevValues) => ({
                ...prevValues,
                lastName: newValue,
              }));
              trigger('lastName');
            }}
            value={editMode ? editedValues.lastName : response.lastName}
            error={!!errors.lastName?.message}
            helperText={errors?.lastName?.message}
            InputProps={{
              readOnly: !editMode,
            }}
            variant={editMode ? 'outlined' : 'standard'}
          />
        )}
      />
      <div className="registration-page__spacing" />
      <Controller
        control={control}
        name="dateOfBirth"
        rules={ageValidation(13)}
        render={({ field }) => (
          <TextField
            id="dateOfBirth"
            label="Date of Birth"
            {...field}
            fullWidth={true}
            onChange={(e) => {
              field.onChange(e);
              const newValue = e.target.value;
              setEditedValues((prevValues) => ({
                ...prevValues,
                dateOfBirth: newValue,
              }));
              trigger('dateOfBirth');
            }}
            onBlur={() => {
              trigger('dateOfBirth');
            }}
            value={editMode ? editedValues.dateOfBirth : response.dateOfBirth}
            size="small"
            margin="normal"
            type="date"
            error={!!errors?.dateOfBirth?.message}
            helperText={errors?.dateOfBirth?.message}
            inputProps={{
              min: '1901-01-01',
              max: today,
            }}
            InputProps={{
              readOnly: !editMode,
            }}
            variant={editMode ? 'outlined' : 'standard'}
          />
        )}
      />
    </div>
  );
};
