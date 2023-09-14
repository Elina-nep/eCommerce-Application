import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { changeCustomerService } from '../../../services';
import { AppDispatch, changeAlert, clearAlertThunk } from '../../../store';
import { CustomerChanges } from '../../../types';
import { IPersonalProps } from '../../../types/profileFrom';
import { IProfileForm } from '../../../types/profileFrom';
import { ageValidation, nameValidation } from '../../../util';
import { customerToFormMapper } from '../../../util/user';
import { FormError } from '../../auth/FormError';
import LoadingSpinner from '../../loading/LoadingSpinner';

export const Personal: React.FC<IPersonalProps> = ({
  response,
  refreshCallback,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const profileFields = customerToFormMapper(response);

  const { handleSubmit, control, trigger } = useForm<IProfileForm>({
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

  const onSubmit: SubmitHandler<IProfileForm> = async (data) => {
    setEditMode(false);
    setLoading(true);

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
    changeCustomerService(customerChanges, response.version)
      .then(() => {
        dispatch(
          changeAlert({
            alertMessage: `Changes saved successfully`,
          }),
        );
        dispatch(clearAlertThunk());
        setErrorMessage('');
        refreshCallback();
      })
      .catch((e) => {
        setErrorMessage(e.message || 'An error occurred');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={`profile__section ${editMode ? 'edit-mode' : ''}`}>
      {loading && <LoadingSpinner />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="profile__section_head">
          <h2>{editMode ? '✏️ ' : ''}Personal</h2>
          <div className="profile__section_head_btn">
            {editMode ? (
              ''
            ) : (
              <button
                className="primary_button profile__edit_btn"
                onClick={handleEditClick}
                disabled={editMode}
              >
                Edit
              </button>
            )}

            {editMode ? (
              <button
                type="submit"
                className="primary_button profile__save_btn"
                disabled={!editMode}
              >
                Save
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="form__col-2">
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
        {errorMessage && <FormError message={errorMessage} />}
      </form>
    </div>
  );
};
