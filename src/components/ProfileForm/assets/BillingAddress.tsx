import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {
  nameValidation,
  streetValidation,
  postalCodeValidation,
  countryValidation,
} from '../../../util';
import { PersonalProps } from '../../../types/user';
import { IProfileForm } from '../../../types/profileFrom';
import {
  useWatch,
  useForm,
  useFormState,
  SubmitHandler,
} from 'react-hook-form';

import { customerToFormMapper } from '../../../util/user';
import { IRegistrationForm } from '../../../types';
import { CustomerChanges } from '../../../types';
import { changeCustomerFunc } from '../../../util/customer';

export const BillingAddress: React.FC<PersonalProps> = ({
  response,
  refreshCallback,
}) => {
  const profileFields = customerToFormMapper(response);

  const { handleSubmit, control, trigger } = useForm<IRegistrationForm>({
    mode: 'onBlur',
    defaultValues: profileFields,
  });

  const { errors } = useFormState({ control });

  const [errorMessage, setErrorMessage] = useState<string>('');

  const [editedValues, setEditedValues] = useState(profileFields);

  const [editMode, setEditMode] = useState(false);
  const handleEditClick = () => {
    setEditMode(true);
  };

  const watchedBillCountry = useWatch({
    control,
    name: 'billCountry',
    defaultValue: response.addresses[0].country,
  });

  const postalCodeValidate = (value: string): string =>
    postalCodeValidation.validate(value, watchedBillCountry) as string;

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IRegistrationForm> = async (data) => {
    setEditMode(false);

    const defaultAddressId = data.isBillingAddressDefault
      ? { addressId: response.addresses[0].id }
      : undefined;

    const customerChanges: CustomerChanges = {
      changeAddress: {
        action: 'changeAddress',
        addressId: response.addresses[0].id,
        address: {
          streetName: data.billStreet,
          postalCode: data.billPostalCode,
          country: data.billCountry,
          city: data.billCity,
        },
      },
      setDefaultBillingAddress: {
        action: 'setDefaultBillingAddress',
        ...defaultAddressId,
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
      <form onSubmit={handleSubmit(onSubmit)} className="profile__form">
        <div className="profile__section_head">
          <h2>{editMode ? '✏️' : ''} Billing Address</h2>
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

        <FormGroup>
          <Controller
            control={control}
            name="isBillingAddressDefault"
            render={({ field }) => (
              <FormControlLabel
                labelPlacement="end"
                control={
                  <Checkbox
                    id="isBillingAddressDefault"
                    size="small"
                    {...field}
                    checked={
                      editMode
                        ? editedValues.isBillingAddressDefault
                        : profileFields.isBillingAddressDefault
                    }
                    inputProps={{
                      readOnly: !editMode,
                    }}
                    onChange={(e) => {
                      const newValue = e.target.checked;
                      setEditedValues((prevValues) => ({
                        ...prevValues,
                        isBillingAddressDefault: newValue,
                      }));
                      field.onChange(e);
                    }}
                  />
                }
                label="Default"
              />
            )}
          />
        </FormGroup>

        <div className="prof__col-2">
          <Controller
            control={control}
            name="billStreet"
            rules={streetValidation}
            render={({ field }) => (
              <TextField
                id="billStreet"
                label="Street"
                onChange={(e) => {
                  field.onChange(e);
                  const newValue = e.target.value;
                  setEditedValues((prevValues) => ({
                    ...prevValues,
                    billStreet: newValue,
                  }));
                  trigger('billStreet');
                }}
                onBlur={() => {
                  trigger('billStreet');
                }}
                value={
                  editMode ? editedValues.billStreet : profileFields.billStreet
                }
                fullWidth
                size="small"
                margin="normal"
                type="text"
                error={!!errors.billStreet?.message}
                helperText={errors?.billStreet?.message}
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
            name="billCity"
            rules={nameValidation}
            render={({ field }) => (
              <TextField
                id="billCity"
                label="City"
                onChange={(e) => {
                  field.onChange(e);
                  const newValue = e.target.value;
                  setEditedValues((prevValues) => ({
                    ...prevValues,
                    billCity: newValue,
                  }));
                  trigger('billCity');
                }}
                onBlur={() => {
                  trigger('billCity');
                }}
                value={
                  editMode ? editedValues.billCity : profileFields.billCity
                }
                fullWidth
                size="small"
                margin="normal"
                type="text"
                error={!!errors.billCity?.message}
                helperText={errors?.billCity?.message}
                InputProps={{
                  readOnly: !editMode,
                }}
                variant={editMode ? 'outlined' : 'standard'}
              />
            )}
          />
        </div>

        <div className="prof__col-2">
          <FormControl
            margin="normal"
            fullWidth
            size="small"
            error={!!errors[`billCountry` as keyof IProfileForm]?.message}
          >
            <InputLabel id="billcountry-select-label">Country</InputLabel>
            <Controller
              control={control}
              name="billCountry"
              rules={{ validate: countryValidation.validate }}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="billcountry-select-label"
                  label="Country"
                  id="billcountry-select"
                  onChange={(e) => {
                    field.onChange(e);
                    const newValue = e.target.value;
                    setEditedValues((prevValues) => ({
                      ...prevValues,
                      billCountry: newValue,
                    }));
                    trigger('billCountry');
                  }}
                  onBlur={() => {
                    trigger('billCountry');
                  }}
                  value={
                    editMode
                      ? editedValues.billCountry
                      : profileFields.billCountry
                  }
                  inputProps={{
                    readOnly: !editMode,
                  }}
                  variant={editMode ? 'outlined' : 'standard'}
                >
                  <MenuItem value="DE">Germany</MenuItem>
                  <MenuItem value="RS">Serbia</MenuItem>
                  <MenuItem value="BY">Belarus</MenuItem>
                </Select>
              )}
            />
            {errors[`billCountry` as keyof IProfileForm]?.message && (
              <FormHelperText>
                {errors[`billCountry` as keyof IProfileForm]?.message}
              </FormHelperText>
            )}
          </FormControl>
          <div className="registration-page__spacing" />
          <Controller
            control={control}
            name="billPostalCode"
            rules={{
              ...postalCodeValidation,
              required: 'This field is required',
              validate: (value) => postalCodeValidate(value as string),
            }}
            render={({ field }) => (
              <TextField
                id="billPostalCode"
                label="Postal Code"
                onChange={(e) => {
                  field.onChange(e);
                  const newValue = e.target.value;
                  setEditedValues((prevValues) => ({
                    ...prevValues,
                    billPostalCode: newValue,
                  }));
                  trigger('billPostalCode');
                }}
                onBlur={() => {
                  trigger('billPostalCode');
                }}
                value={
                  editMode
                    ? editedValues.billPostalCode
                    : profileFields.billPostalCode
                }
                fullWidth
                size="small"
                margin="normal"
                type="text"
                error={!!errors.billPostalCode?.message}
                helperText={errors?.billPostalCode?.message}
                InputProps={{
                  readOnly: !editMode,
                }}
                variant={editMode ? 'outlined' : 'standard'}
              />
            )}
          />
        </div>
      </form>
    </div>
  );
};
