import React, { useState } from 'react';
import {
  useForm,
  useFormState,
  SubmitHandler,
  Controller,
} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { emailValidation } from '../../../util';
import { IPersonalProps } from '../../../types/profileFrom';
import { IProfileForm } from '../../../types/profileFrom';
import { customerToFormMapper } from '../../../util/user';
import { CustomerChanges } from '../../../types';
import { changeCustomerFunc } from '../../../util/customer';
import { FormError } from '../../auth/FormError';
import LoadingSpinner from '../../loading/LoadingSpinner';

export const ChangeEmail: React.FC<IPersonalProps> = ({
  response,
  refreshCallback,
}) => {
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

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IProfileForm> = async (data) => {
    setEditMode(false);

    const customerChanges: CustomerChanges = {
      changeEmail: {
        action: 'changeEmail',
        email: data.email,
      },
    };

    try {
      await changeCustomerFunc(
        setLoading,
        customerChanges,
        response.version,
        setErrorMessage,
      );

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
      {loading && <LoadingSpinner />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="profile__section_head">
          <h2>{editMode ? '✏️ ' : ''}E-mail</h2>
          <div className="profile__section_head_btn">
            {editMode ? (
              ''
            ) : (
              <button
                className="user__edit_pass_btn"
                onClick={handleEditClick}
                disabled={editMode}
              >
                Change E-mail
              </button>
            )}

            {editMode ? (
              <button
                type="submit"
                className="user__save_btn"
                disabled={!editMode}
              >
                Save
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
        {editMode ? (
          <div className="prof__col-2">
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
