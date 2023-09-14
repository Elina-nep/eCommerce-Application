import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { changeCustomerService } from '../../../services';
import { AppDispatch, changeAlert, clearAlertThunk } from '../../../store';
import {
  AddressType,
  CustomerChanges,
  IAddress,
  IAddressProps,
} from '../../../types';
import {
  countryValidation,
  nameValidation,
  postalCodeValidation,
  streetValidation,
} from '../../../util';
import { FormError } from '../../auth/FormError';
import LoadingSpinner from '../../loading/LoadingSpinner';

export const Address: React.FC<IAddressProps> = ({
  customer,
  address,
  version,
  addressType,
  refreshCallback,
}) => {
  const dispatch = useDispatch<AppDispatch>();
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

  const handleCustomerDataChange = (myActions: CustomerChanges) => {
    changeCustomerService(myActions, version)
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

  const deleteAddress = async (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    const removeAction: CustomerChanges = {
      ...removeAddressId,
    };
    handleCustomerDataChange(removeAction);
  };

  const onSubmit: SubmitHandler<IAddress> = async (data) => {
    setEditMode(false);

    let defaultAddressId;
    if (data.isDefault) {
      defaultAddressId = { addressId: address.id };
    } else if (addressType === AddressType.BILL && customer.billingAddressIds) {
      defaultAddressId = { addressId: customer.defaultBillingAddressId };
    } else {
      defaultAddressId = { addressId: customer.defaultShippingAddressId };
    }

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
    handleCustomerDataChange(customerChanges);
  };

  return (
    <div className={`profile__section ${editMode ? 'edit-mode' : ''}`}>
      {loading && <LoadingSpinner />}
      <form onSubmit={handleSubmit(onSubmit)} className="profile__form">
        <div className="profile__section_head">
          <div className="profile__section_edit_input">
            <h2>{editMode ? '✏️' : ''}</h2>
            {editMode ? (
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
                            editMode
                              ? editedValues.isDefault
                              : address.isDefault
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
                            field.onChange(newValue);
                          }}
                        />
                      }
                      label="Default"
                    />
                  )}
                />
              </FormGroup>
            ) : address.isDefault ? (
              <h3 className="profile__add_status">Default</h3>
            ) : (
              ''
            )}
          </div>
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
            <button
              className="primary_button profile__delete_btn"
              onClick={(e) => deleteAddress(e.nativeEvent)}
            >
              Delete
            </button>
          </div>
        </div>

        <div className="form__col-2">
          <Controller
            control={control}
            name="streetName"
            rules={streetValidation}
            render={({ field }) => (
              <TextField
                id={`streetName-${address.id}-${addressType}`}
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
                id={`city-${address.id}-${addressType}`}
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

        <div className="form__col-2">
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
                  id={`country-select-${address.id}-${addressType}`}
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
                id={`postalCode-${address.id}-${addressType}`}
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
