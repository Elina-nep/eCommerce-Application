import React, { useState } from 'react';
import {
  useWatch,
  useForm,
  useFormState,
  SubmitHandler,
  Controller,
} from 'react-hook-form';
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
import { IAddressProps } from '../../../types/profileFrom';

import { IAddress } from '../../../types/profileFrom';
import { CustomerChanges } from '../../../types';
import { changeCustomerFunc } from '../../../util/customer';
import { AddressType } from '../../../types/profileFrom';
import { FormError } from '../../auth/FormError';
import LoadingSpinner from '../../loading/LoadingSpinner';

export const Address: React.FC<IAddressProps> = ({
  address,
  version,
  addressType,
  refreshCallback,
}) => {
  const { handleSubmit, control, trigger } = useForm<IAddress>({
    mode: 'onBlur',
    defaultValues: address,
  });

  const { errors } = useFormState({ control });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [editedValues, setEditedValues] = useState(address);

  const [editMode, setEditMode] = useState(false);
  const handleEditClick = () => {
    setEditMode(true);
  };

  const watchedBillCountry = useWatch({
    control,
    name: 'country',
    defaultValue: address.country,
  });

  const postalCodeValidate = (value: string): string =>
    postalCodeValidation.validate(value, watchedBillCountry) as string;

  const [loading, setLoading] = useState(false);

  const removeAddressId: CustomerChanges =
    addressType === AddressType.BILL
      ? {
          removeBillingAddressId: {
            action: 'removeBillingAddressId',
            addressId: address.id,
          },
        }
      : {
          removeShippingAddressId: {
            action: 'removeShippingAddressId',
            addressId: address.id,
          },
        };

  const deleteAddress = async () => {
    const removeAction: CustomerChanges = {
      ...removeAddressId,
    };

    try {
      await changeCustomerFunc(
        setLoading,
        removeAction,
        version,
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

  const onSubmit: SubmitHandler<IAddress> = async (data) => {
    setEditMode(false);

    const defaultAddressId = data.isDefault
      ? { addressId: address.id }
      : undefined;

    const setDefaultAction: CustomerChanges =
      addressType === AddressType.BILL
        ? {
            setDefaultBillingAddress: {
              action: 'setDefaultBillingAddress',
              ...defaultAddressId,
            },
          }
        : {
            setDefaultShippingAddress: {
              action: 'setDefaultShippingAddress',
              ...defaultAddressId,
            },
          };
    const customerChanges: CustomerChanges = {
      changeAddress: {
        action: 'changeAddress',
        addressId: address.id,
        address: {
          streetName: data.streetName,
          postalCode: data.postalCode,
          country: data.country,
          city: data.city,
        },
      },
      ...setDefaultAction,
    };

    try {
      await changeCustomerFunc(
        setLoading,
        customerChanges,
        version,
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
      <form onSubmit={handleSubmit(onSubmit)} className="profile__form">
        <div className="profile__section_head">
          <div className="profile__section_edit_input">
            <h2>{editMode ? '✏️' : ''}</h2>
            <FormGroup>
              <Controller
                control={control}
                name="isDefault"
                render={({ field }) => (
                  <FormControlLabel
                    labelPlacement="end"
                    control={
                      <Checkbox
                        id="isDefault"
                        size="small"
                        {...field}
                        checked={
                          editMode ? editedValues.isDefault : address.isDefault
                        }
                        inputProps={{
                          readOnly: !editMode,
                        }}
                        onChange={(e) => {
                          const newValue = e.target.checked;
                          setEditedValues((prevValues) => ({
                            ...prevValues,
                            isDefault: newValue,
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
          </div>
          <div className="profile__section_head_btn">
            {editMode ? (
              ''
            ) : (
              <button
                className="user__edit_btn"
                onClick={handleEditClick}
                disabled={editMode}
              >
                Edit
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
            <button className="prof__delete_btn" onClick={deleteAddress}>
              Delete
            </button>
          </div>
        </div>

        <div className="prof__col-2">
          <Controller
            control={control}
            name="streetName"
            rules={streetValidation}
            render={({ field }) => (
              <TextField
                id={`streetName-${address.id}`}
                label="Street"
                onChange={(e) => {
                  field.onChange(e);
                  const newValue = e.target.value;
                  setEditedValues((prevValues) => ({
                    ...prevValues,
                    streetName: newValue,
                  }));
                  trigger('streetName');
                }}
                onBlur={() => {
                  trigger('streetName');
                }}
                value={editMode ? editedValues.streetName : address.streetName}
                fullWidth
                size="small"
                margin="normal"
                type="text"
                error={!!errors.streetName?.message}
                helperText={errors?.streetName?.message}
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
            name="city"
            rules={nameValidation}
            render={({ field }) => (
              <TextField
                id={`city-${address.id}`}
                label="City"
                onChange={(e) => {
                  field.onChange(e);
                  const newValue = e.target.value;
                  setEditedValues((prevValues) => ({
                    ...prevValues,
                    city: newValue,
                  }));
                  trigger('city');
                }}
                onBlur={() => {
                  trigger('city');
                }}
                value={editMode ? editedValues.city : address.city}
                fullWidth
                size="small"
                margin="normal"
                type="text"
                error={!!errors.city?.message}
                helperText={errors?.city?.message}
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
            error={!!errors.country?.message}
          >
            <InputLabel id="billcountry-select-label">Country</InputLabel>
            <Controller
              control={control}
              name="country"
              rules={{ validate: countryValidation.validate }}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="billcountry-select-label"
                  label="Country"
                  id={`country-select-${address.id}`}
                  onChange={(e) => {
                    field.onChange(e);
                    const newValue = e.target.value;
                    setEditedValues((prevValues) => ({
                      ...prevValues,
                      country: newValue,
                    }));
                    trigger('country');
                  }}
                  onBlur={() => {
                    trigger('country');
                  }}
                  value={editMode ? editedValues.country : address.country}
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
            {errors.country?.message && (
              <FormHelperText>{errors.country?.message}</FormHelperText>
            )}
          </FormControl>
          <div className="registration-page__spacing" />
          <Controller
            control={control}
            name="postalCode"
            rules={{
              ...postalCodeValidation,
              required: 'This field is required',
              validate: (value) => postalCodeValidate(value as string),
            }}
            render={({ field }) => (
              <TextField
                id={`postalCode-${address.id}`}
                label="Postal Code"
                onChange={(e) => {
                  field.onChange(e);
                  const newValue = e.target.value;
                  setEditedValues((prevValues) => ({
                    ...prevValues,
                    postalCode: newValue,
                  }));
                  trigger('postalCode');
                }}
                onBlur={() => {
                  trigger('postalCode');
                }}
                value={editMode ? editedValues.postalCode : address.postalCode}
                fullWidth
                size="small"
                margin="normal"
                type="text"
                error={!!errors.postalCode?.message}
                helperText={errors?.postalCode?.message}
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
