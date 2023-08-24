import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Controller,
  useForm,
  useFormState,
  SubmitHandler,
} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { nameValidation, ageValidation } from '../../util/validation';
import { FormError } from '../auth/FormError';
import { IRegistrationForm } from '../../types/registrationForm';
// import { TogglePasswordVisibility } from '../../util/ToggleVisibility';
import { UserFormProps } from '../../types/user';
import { ThemeProvider } from '@mui/material/styles';
import { registerTheme } from '../auth/theme';
import { BillAddresses } from '../auth/assets/BillAddresses';
import { ShipAddresses } from '../auth/assets/ShipAddress';
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
  // const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const [addBillAddress, setAddBillAddress] = useState(false);

  const handleAddBillClick = () => {
    setAddBillAddress(true);
  };

  const [addShipAddress, setAddShipAddress] = useState(false);

  const handleAddShipClick = () => {
    setAddShipAddress(true);
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
    <div className={`profile ${editMode ? 'edit-mode' : ''}`}>
      <Link to="/">Home</Link>
      <h1>{editMode ? '✏️' : ''} Profile</h1>
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
          </div>

          <h3>Billing Addresses</h3>
          <button onClick={handleAddBillClick} className="user__add_btn">
            +
          </button>
          {addBillAddress && (
            <BillAddresses control={control} errors={errors} />
          )}

          <h3>Shipping Addresses</h3>
          <button onClick={handleAddShipClick} className="user__add_btn">
            +
          </button>
          {addShipAddress && (
            <ShipAddresses control={control} errors={errors} />
          )}

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
