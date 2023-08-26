import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { passwordValidation } from '../../../util';
import { ChangePasswordProps } from '../../../types/user';
import { useForm, useFormState, SubmitHandler } from 'react-hook-form';
import { TogglePasswordVisibility } from '../../../util/ToggleVisibility';
import { Password } from '../../../types';
import { changeCustomerPasswordFunc } from '../../../util/customer';

export const ChangePassword: React.FC<ChangePasswordProps> = ({
  version,
  refreshCallback,
}) => {
  // const profileFields = customerToFormMapper(response);

  const { handleSubmit, control, setError, trigger, setValue } =
    useForm<Password>({
      mode: 'onBlur',
    });

  const onChangeInput = (fieldName: keyof Password, value: string) => {
    setValue(fieldName, value);
    trigger(fieldName);
    clearError(fieldName);
  };

  const clearError = (fieldName: keyof Password) => {
    if (errors[fieldName]) {
      setError(fieldName, { type: 'manual', message: '' });
    }
  };

  const onFocusInput = () => {
    setErrorMessage('');
  };

  const [errorMessage, setErrorMessage] = useState<string>('');

  const { errors } = useFormState({ control });

  const [editMode, setEditMode] = useState(false);
  const handleEditClick = () => {
    setEditMode(true);
  };

  // const [editedValues, setEditedValues] = useState(profileFields);

  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(false);
  const onSubmit: SubmitHandler<Password> = async (data) => {
    setEditMode(false);

    try {
      await changeCustomerPasswordFunc(setLoading, data, version);

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

        <div className="registration-page__col-2" />
        <Controller
          control={control}
          name="oldPassword"
          rules={passwordValidation}
          render={({ field }) => (
            <TextField
              id="oldPassword"
              label="Old Password"
              onChange={(e) => {
                field.onChange(e);
                onChangeInput('oldPassword', e.target.value);
              }}
              onFocus={onFocusInput}
              value={field.value || ''}
              fullWidth
              size="small"
              margin="normal"
              type={visible ? 'text' : 'password'}
              error={!!errors.oldPassword?.message}
              helperText={errors?.oldPassword?.message}
              variant={editMode ? 'outlined' : 'standard'}
              InputProps={{
                readOnly: !editMode,
                endAdornment: (
                  <TogglePasswordVisibility
                    visible={visible}
                    setVisible={setVisible}
                  />
                ),
              }}
            />
          )}
        />

        <div className="registration-page__spacing" />
        <Controller
          control={control}
          name="newPassword"
          rules={passwordValidation}
          render={({ field }) => (
            <TextField
              id="newPassword"
              label="New Password"
              onChange={(e) => {
                field.onChange(e);
                onChangeInput('newPassword', e.target.value);
              }}
              onFocus={onFocusInput}
              value={field.value || ''}
              fullWidth
              size="small"
              margin="normal"
              type={visible ? 'text' : 'password'}
              error={!!errors.newPassword?.message}
              helperText={errors?.newPassword?.message}
              variant={editMode ? 'outlined' : 'standard'}
              InputProps={{
                readOnly: !editMode,
                endAdornment: (
                  <TogglePasswordVisibility
                    visible={visible}
                    setVisible={setVisible}
                  />
                ),
              }}
            />
          )}
        />
      </form>
    </div>
  );
};
