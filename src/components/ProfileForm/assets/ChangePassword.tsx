import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { passwordValidation } from '../../../util';
import { IChangePasswordProps } from '../../../types/profileFrom';
import { useForm, useFormState, SubmitHandler } from 'react-hook-form';
import { TogglePasswordVisibility } from '../../../util/ToggleVisibility';
import { Password } from '../../../types';
import { changeCustomerPasswordFunc } from '../../../util/customer';
import { FormError } from '../../auth/FormError';
import LoadingSpinner from '../../loading/LoadingSpinner';
import { AuthContext } from '../../../context/AuthProvider';

export const ChangePassword: React.FC<IChangePasswordProps> = ({ version }) => {
  const navigate = useNavigate();
  const { setAlertMessage, logOut } = useContext(AuthContext);
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

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const onSubmit: SubmitHandler<Password> = async (data) => {
    setEditMode(false);

    try {
      await changeCustomerPasswordFunc(
        setLoading,
        data,
        version,
        setAlertMessage,
      );

      setErrorMessage('');
      setSubmitted(true);
      logOut();
      navigate('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || 'An error occurred');
      }
    }
  };

  return (
    <div className={`profile__section ${editMode ? 'edit-mode' : ''}`}>
      {loading && <LoadingSpinner />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="profile__section_head">
          <h2>{editMode ? '✏️' : ''} Password</h2>
          <div className="profile__section_head_btn">
            {editMode ? (
              ''
            ) : (
              <button
                className="profile__change_btn"
                onClick={handleEditClick}
                disabled={editMode}
              >
                Change Password
              </button>
            )}

            {editMode ? (
              <button
                type="submit"
                className="profile__save_btn"
                disabled={!editMode}
              >
                Save
              </button>
            ) : (
              ''
            )}

            {editMode ? (
              <button
                className="profile__exit_btn"
                disabled={!editMode}
                onClick={() => {
                  if (submitted) {
                    setEditMode(false);
                  } else {
                    setEditMode(false);
                    setSubmitted(true);
                  }
                }}
              >
                Exit
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
        {editMode ? (
          <div>
            <div className="prof__col-2">
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
            </div>
            <h1 className="profile__tip">
              Sign in again after changing your password{' '}
            </h1>
          </div>
        ) : (
          ''
        )}
        {errorMessage && <FormError message={errorMessage} />}
      </form>
    </div>
  );
};
