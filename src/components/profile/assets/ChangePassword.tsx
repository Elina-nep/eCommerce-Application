import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { SubmitHandler, useForm, useFormState } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { changeCustomerPasswordService } from '../../../services';
import {
  AppDispatch,
  changeAlert,
  clearAlertThunk,
  logout,
} from '../../../store';
import { Password } from '../../../types';
import { IChangePasswordProps } from '../../../types/profileFrom';
import { passwordValidation } from '../../../util';
import { TogglePasswordVisibility } from '../../auth/assets/ToggleVisibility';
import { FormError } from '../../auth/FormError';
import LoadingSpinner from '../../loading/LoadingSpinner';

export const ChangePassword: React.FC<IChangePasswordProps> = ({ version }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
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
    setLoading(true);

    changeCustomerPasswordService(data, version)
      .then(() => {
        dispatch(
          changeAlert({
            alertMessage: `Changes saved successfully`,
          }),
        );
        dispatch(clearAlertThunk());
        setErrorMessage('');
        setSubmitted(true);
        dispatch(logout());
        navigate('/');
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
          <h2>{editMode ? '✏️' : ''} Password</h2>
          <div className="profile__section_head_btn">
            {editMode ? (
              ''
            ) : (
              <button
                className="primary_button profile__change_btn"
                onClick={handleEditClick}
                disabled={editMode}
              >
                Change Password
              </button>
            )}

            {editMode ? (
              <div className="special_hover_container">
                <button
                  type="submit"
                  className="profile__save_btn"
                  disabled={!editMode}
                >
                  Save
                </button>
              </div>
            ) : (
              ''
            )}

            {editMode ? (
              <div className="special_hover_container">
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
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        {editMode ? (
          <div>
            <div className="form__col-2">
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
            <p className="secondary_button profile__tip">
              Sign in again after changing your password{' '}
            </p>
          </div>
        ) : (
          ''
        )}
        {errorMessage && <FormError message={errorMessage} />}
      </form>
    </div>
  );
};
