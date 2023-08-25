import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { nameValidation, ageValidation } from '../../../util';
import { PersonalProps } from '../../../types/user';
import { IRegistrationForm } from '../../../types';
import { useForm, useFormState, SubmitHandler } from 'react-hook-form';
import { customerToFormMapper } from '../../../util/user';
import { CustomerChanges } from '../../../types';
import { changeCustomerFunc } from '../../../util/customer';

export const Personal: React.FC<PersonalProps> = ({
  response,
  refreshCallback,
}) => {
  const profileFields = customerToFormMapper(response);

  const { handleSubmit, control, trigger } = useForm<IRegistrationForm>({
    mode: 'onBlur',
    defaultValues: profileFields,
  });

  const [errorMessage, setErrorMessage] = useState<string>('');

  const { errors } = useFormState({ control });

  const [editMode, setEditMode] = useState(false);
  const handleEditClick = () => {
    setEditMode(true);
  };

  const [editedValues, setEditedValues] = useState(profileFields);
  const today = new Date().toISOString().split('T')[0];

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IRegistrationForm> = async (data) => {
    setEditMode(false);

    const customerChanges: CustomerChanges = {
      setFirstName: {
        action: 'setFirstName',
        firstName: data.firstName,
      },
      setLastName: {
        action: 'setLastName',
        lastName: data.lastName,
      },
      setDateOfBirth: {
        action: 'setDateOfBirth',
        dateOfBirth: data.dateOfBirth,
      },
    };

    try {
      await changeCustomerFunc(setLoading, customerChanges, response.version);

      setErrorMessage('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || 'An error occurred');
      }
    } finally {
      refreshCallback();
    }
  };

  return (
    <div className={`profile__section ${editMode ? 'edit-mode' : ''}`}>
      <p>
        {loading} {errorMessage}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="profile__section_head">
          <h2>{editMode ? '✏️' : ''} Personal</h2>
          <div className="profile__section_head_btn">
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
        </div>

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
      </form>
    </div>
  );
};
