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
import { CustomerChanges, IPersonalProps, IProfileForm } from '../../../types';
import { customerToFormMapper, emailValidation } from '../../../util';
import { FormError } from '../../auth/FormError';
import LoadingSpinner from '../../loading/LoadingSpinner';

export const ChangeEmail: React.FC<IPersonalProps> = ({
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

  const [submitted, setSubmitted] = useState(false);

  const [editedValues, setEditedValues] = useState(profileFields);

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IProfileForm> = async (data) => {
    setEditMode(false);

    const customerChanges: CustomerChanges = {
      changeEmail: {
        action: 'changeEmail',
        email: data.email,
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
          <h2>{editMode ? '✏️ ' : ''}E-mail</h2>
          <div className="profile__section_head_btn">
            {editMode ? (
              ''
            ) : (
              <button
                className="primary_button profile__change_btn"
                onClick={handleEditClick}
                disabled={editMode}
              >
                Change E-mail
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
              <button
                className="primary_button profile__exit_btn"
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
          <div className="form__col-2">
            <Controller
              control={control}
              name="email"
              rules={{ validate: emailValidation }}
              render={({ field }) => (
                <TextField
                  id="email"
                  label="Email"
                  {...field}
                  fullWidth
                  size="small"
                  margin="normal"
                  type="text"
                  onBlur={() => {
                    trigger('email');
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                    const newValue = e.target.value;
                    setEditedValues((prevValues) => ({
                      ...prevValues,
                      email: newValue,
                    }));
                    trigger('email');
                  }}
                  value={editMode ? editedValues.email : response.email}
                  error={!!errors.email?.message}
                  helperText={errors?.email?.message}
                  InputProps={{
                    readOnly: !editMode,
                  }}
                  variant={editMode ? 'outlined' : 'standard'}
                />
              )}
            />
          </div>
        ) : (
          ''
        )}
        {errorMessage && <FormError message={errorMessage} />}
      </form>
    </div>
  );
};
