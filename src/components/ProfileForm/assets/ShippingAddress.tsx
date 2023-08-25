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

export const ShippingAddress: React.FC<PersonalProps> = ({
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

  const watchedShipCountry = useWatch({
    control,
    name: 'shipCountry',
    defaultValue: response.addresses[1].country,
  });

  const postalCodeValidate = (value: string): string =>
    postalCodeValidation.validate(value, watchedShipCountry) as string;

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IRegistrationForm> = async (data) => {
    setEditMode(false);

    const defaultAddressId = data.isShippingAddressDefault
      ? { addressId: response.addresses[1].id }
      : undefined;

    const customerChanges: CustomerChanges = {
      changeAddress: {
        action: 'changeAddress',
        addressId: response.addresses[1].id,
        address: {
          streetName: data.shipStreet,
          postalCode: data.shipPostalCode,
          country: data.shipCountry,
          city: data.shipCity,
        },
      },
      setDefaultShippingAddress: {
        action: 'setDefaultShippingAddress',
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
          <h2>{editMode ? '✏️' : ''} Shipping Address</h2>
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
            name="isShippingAddressDefault"
            render={({ field }) => (
              <FormControlLabel
                labelPlacement="end"
                control={
                  <Checkbox
                    id="isShippingAddressDefault"
                    size="small"
                    {...field}
                    checked={
                      editMode
                        ? editedValues.isShippingAddressDefault
                        : profileFields.isShippingAddressDefault
                    }
                    inputProps={{
                      readOnly: !editMode,
                    }}
                    onChange={(e) => {
                      const newValue = e.target.checked;
                      setEditedValues((prevValues) => ({
                        ...prevValues,
                        isShippingAddressDefault: newValue,
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
            name="shipStreet"
            rules={streetValidation}
            render={({ field }) => (
              <TextField
                id="shipStreet"
                label="Street"
                onChange={(e) => {
                  field.onChange(e);
                  const newValue = e.target.value;
                  setEditedValues((prevValues) => ({
                    ...prevValues,
                    shipStreet: newValue,
                  }));
                  trigger('shipStreet');
                }}
                onBlur={() => {
                  trigger('shipStreet');
                }}
                value={
                  editMode ? editedValues.shipStreet : profileFields.shipStreet
                }
                fullWidth
                size="small"
                margin="normal"
                type="text"
                error={!!errors.shipStreet?.message}
                helperText={errors?.shipStreet?.message}
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
            name="shipCity"
            rules={nameValidation}
            render={({ field }) => (
              <TextField
                id="shipCity"
                label="City"
                onChange={(e) => {
                  field.onChange(e);
                  const newValue = e.target.value;
                  setEditedValues((prevValues) => ({
                    ...prevValues,
                    shipCity: newValue,
                  }));
                  trigger('shipCity');
                }}
                onBlur={() => {
                  trigger('shipCity');
                }}
                value={
                  editMode ? editedValues.shipCity : profileFields.shipCity
                }
                fullWidth
                size="small"
                margin="normal"
                type="text"
                error={!!errors.shipCity?.message}
                helperText={errors?.shipCity?.message}
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
            error={!!errors[`shipCountry` as keyof IProfileForm]?.message}
          >
            <InputLabel id="shipcountry-select-label">Country</InputLabel>
            <Controller
              control={control}
              name="shipCountry"
              rules={{ validate: countryValidation.validate }}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="shipcountry-select-label"
                  label="Country"
                  id="shipcountry-select"
                  onChange={(e) => {
                    field.onChange(e);
                    const newValue = e.target.value;
                    setEditedValues((prevValues) => ({
                      ...prevValues,
                      shipCountry: newValue,
                    }));
                    trigger('shipCountry');
                  }}
                  onBlur={() => {
                    trigger('shipCountry');
                  }}
                  value={
                    editMode
                      ? editedValues.shipCountry
                      : profileFields.shipCountry
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
            {errors[`shipCountry` as keyof IProfileForm]?.message && (
              <FormHelperText>
                {errors[`shipCountry` as keyof IProfileForm]?.message}
              </FormHelperText>
            )}
          </FormControl>
          <div className="registration-page__spacing" />
          <Controller
            control={control}
            name="shipPostalCode"
            rules={{
              ...postalCodeValidation,
              required: 'This field is required',
              validate: (value) => postalCodeValidate(value as string),
            }}
            render={({ field }) => (
              <TextField
                id="shipPostalCode"
                label="Postal Code"
                onChange={(e) => {
                  field.onChange(e);
                  const newValue = e.target.value;
                  setEditedValues((prevValues) => ({
                    ...prevValues,
                    shipPostalCode: newValue,
                  }));
                  trigger('shipPostalCode');
                }}
                onBlur={() => {
                  trigger('shipPostalCode');
                }}
                value={
                  editMode
                    ? editedValues.shipPostalCode
                    : profileFields.shipPostalCode
                }
                fullWidth
                size="small"
                margin="normal"
                type="text"
                error={!!errors.shipPostalCode?.message}
                helperText={errors?.shipPostalCode?.message}
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
