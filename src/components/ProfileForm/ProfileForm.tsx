import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Controller,
  useForm,
  useFormState,
  SubmitHandler,
} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import {
  nameValidation,
  passwordValidation,
  emailValidation,
  ageValidation,
} from '../../util/validation';
import { FormError } from '../auth/FormError';
import { IRegistrationForm } from '../../types/registrationForm';
import { TogglePasswordVisibility } from '../../util/ToggleVisibility';
import { UserFormProps } from '../../types/user';
import { ThemeProvider } from '@mui/material/styles';
import { registerTheme } from '../auth/theme';
import './ProfileForm.scss';

export const ProfileForm: React.FC<UserFormProps> = ({ response }) => {
  const { handleSubmit, control, trigger } = useForm<IRegistrationForm>({
    mode: 'onBlur',
    defaultValues: response,
  });
  const { errors } = useFormState({ control });

  const [errorMessage, setErrorMessage] = useState<string>('');

  // const clearError = (fieldName: keyof IRegistrationForm) => {
  //   if (errors[fieldName]) {
  //     setError(fieldName, { type: 'manual', message: '' });
  //   }
  // };

  const onFocusInput = () => {
    setErrorMessage('');
  };

  const [editedValues, setEditedValues] = useState(response);
  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const onSubmit: SubmitHandler<IRegistrationForm> = async (data) => {
    setEditMode(false);
    try {
      console.log('edited users data', data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || 'An error occurred');
      }
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="profile">
      <Link to="/">Home</Link>
      <h1>Profile</h1>
      <ThemeProvider theme={registerTheme}>
        <form onSubmit={handleSubmit(onSubmit)} className="profile__form">
          <div className="prof__col-2">
            <Controller
              control={control}
              name="firstName"
              rules={nameValidation}
              render={({ field }) => (
                <TextField
                  id="firstName"
                  label="First name"
                  onChange={(e) => {
                    field.onChange(e);
                    const newValue = e.target.value;
                    setEditedValues((prevValues) => ({
                      ...prevValues,
                      firstName: newValue,
                    }));
                    trigger('firstName');
                  }}
                  onBlur={() => {
                    trigger('firstName');
                  }}
                  value={editMode ? editedValues.firstName : response.firstName}
                  fullWidth
                  size="small"
                  margin="normal"
                  type="text"
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
                  onChange={(e) => {
                    field.onChange(e);
                    const newValue = e.target.value;
                    setEditedValues((prevValues) => ({
                      ...prevValues,
                      lastName: newValue,
                    }));
                    trigger('lastName');
                  }}
                  onBlur={() => {
                    trigger('lastName');
                  }}
                  value={editMode ? editedValues.lastName : response.lastName}
                  onFocus={onFocusInput}
                  fullWidth
                  size="small"
                  margin="normal"
                  type="text"
                  error={!!errors.lastName?.message}
                  helperText={errors?.lastName?.message}
                  InputProps={{
                    readOnly: !editMode,
                  }}
                  variant={editMode ? 'outlined' : 'standard'}
                />
              )}
            />
          </div>
          <div className="prof__col-2">
            <Controller
              control={control}
              name="email"
              rules={{ validate: emailValidation }}
              render={({ field }) => (
                <TextField
                  id="email"
                  label="Email"
                  onChange={(e) => {
                    field.onChange(e);
                    const newValue = e.target.value;
                    setEditedValues((prevValues) => ({
                      ...prevValues,
                      email: newValue,
                    }));
                    trigger('email');
                  }}
                  onBlur={() => {
                    trigger('email');
                  }}
                  value={editMode ? editedValues.email : response.email}
                  onFocus={onFocusInput}
                  fullWidth
                  size="small"
                  margin="normal"
                  type="email"
                  error={!!errors.email?.message}
                  helperText={errors?.email?.message}
                  autoComplete="email"
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
              name="password"
              rules={passwordValidation}
              render={({ field }) => (
                <TextField
                  id="password"
                  label="Password"
                  onChange={(e) => {
                    field.onChange(e);
                    const newValue = e.target.value;
                    setEditedValues((prevValues) => ({
                      ...prevValues,
                      password: newValue,
                    }));
                    trigger('password');
                  }}
                  onBlur={() => {
                    trigger('password');
                  }}
                  value={editMode ? editedValues.password : response.password}
                  onFocus={onFocusInput}
                  fullWidth
                  size="small"
                  margin="normal"
                  type={visible ? 'text' : 'password'}
                  error={!!errors.password?.message}
                  helperText={errors?.password?.message}
                  autoComplete="password"
                  InputProps={{
                    endAdornment: (
                      <TogglePasswordVisibility
                        visible={visible}
                        setVisible={setVisible}
                      />
                    ),
                    readOnly: !editMode,
                  }}
                  variant={editMode ? 'outlined' : 'standard'}
                />
              )}
            />
          </div>
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
                value={
                  editMode ? editedValues.dateOfBirth : response.dateOfBirth
                }
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
          <div className="buttons_box">
            <button
              className="user__edit_btn"
              onClick={handleEditClick}
              disabled={editMode}
            >
              Edit
            </button>
            <button
              type="submit"
              className="user__save_btn"
              disabled={!editMode}
            >
              Save
            </button>
          </div>
          {errorMessage && <FormError message={errorMessage} />}
        </form>
      </ThemeProvider>
    </div>
  );
};
