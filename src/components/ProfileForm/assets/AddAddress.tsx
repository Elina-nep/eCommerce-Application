import React, { useState, useContext } from 'react';
import {
  Controller,
  useForm,
  useFormState,
  SubmitHandler,
  useWatch,
} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import { FormGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import { CustomerChanges } from '../../../types';
import { changeCustomerFunc } from '../../../util/customer';
import { IAddAddressProps } from '../../../types/profileFrom';
import { AddressType } from '../../../types/profileFrom';
import {
  nameValidation,
  streetValidation,
  countryValidation,
  postalCodeValidation,
} from '../../../util';
import { IAddAdress } from '../../../types/profileFrom';
import { FormError } from '../../auth/FormError';
import { AuthContext } from '../../../context/AuthProvider';

export const AddAddress: React.FC<IAddAddressProps> = ({
  customer,
  version,
  refreshCallback,
  addressType,
}) => {
  const { handleSubmit, control, setError, trigger, setValue } =
    useForm<IAddAdress>();
  const { errors } = useFormState({
    control,
  });

  const { setAlertMessage } = useContext(AuthContext);

  const watchedCountry = useWatch({
    control,
    name: 'country',
    defaultValue: '',
  });

  const postalCodeValidate = (value: string): string =>
    postalCodeValidation.validate(value, watchedCountry) as string;

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const clearError = (fieldName: keyof IAddAdress) => {
    if (errors[fieldName]) {
      setError(fieldName, { type: 'manual', message: '' });
    }
  };

  const onFocusInput = () => {
    setErrorMessage('');
  };

  const onChangeInput = (fieldName: keyof IAddAdress, value: string) => {
    setValue(fieldName, value);
    trigger(fieldName);
    clearError(fieldName);
  };

  const onSubmit: SubmitHandler<IAddAdress> = async (data) => {
    console.log('CREATE ADDRESS');

    const addressCreation: CustomerChanges = {
      addressAction: {
        action: 'addAddress',
        address: data,
      },
    };

    try {
      const updatedCustomer = await changeCustomerFunc(
        setLoading,
        addressCreation,
        version,
        setAlertMessage,
      );

      const createdAddress =
        updatedCustomer.addresses[updatedCustomer.addresses.length - 1];

      let defaultAddressId;
      if (data.isDefault) {
        defaultAddressId = { addressId: createdAddress.id };
      } else if (
        addressType === AddressType.BILL &&
        customer.billingAddressIds
      ) {
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

      const setType: CustomerChanges =
        addressType === AddressType.BILL
          ? {
              addBillingAddressId: {
                action: 'addBillingAddressId',
                addressId: createdAddress.id,
              },
            }
          : {
              addShippingAddressId: {
                action: 'addShippingAddressId',
                addressId: createdAddress.id,
              },
            };

      const addressTypeAndDefault: CustomerChanges = {
        ...setDefaultAction,
        ...setType,
      };

      await changeCustomerFunc(
        setLoading,
        addressTypeAndDefault,
        updatedCustomer.version,
        setAlertMessage,
      );

      setErrorMessage('');
      refreshCallback();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || 'An error occurred');
      }
    }
  };

  return (
    <div className="profile__section edit-mode">
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>{loading}</p>
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
                    onChange={(e) => {
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
            name="streetName"
            rules={streetValidation}
            render={({ field }) => (
              <TextField
                id="street"
                label="Street"
                onChange={(e) => {
                  field.onChange(e);
                  onChangeInput('streetName', e.target.value);
                }}
                onFocus={onFocusInput}
                value={field.value || ''}
                fullWidth
                size="small"
                margin="normal"
                type="text"
                error={!!errors.streetName?.message}
                helperText={errors?.streetName?.message}
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
                id="city"
                label="City"
                onChange={(e) => {
                  field.onChange(e);
                  onChangeInput('city', e.target.value);
                }}
                onFocus={onFocusInput}
                value={field.value || ''}
                fullWidth
                size="small"
                margin="normal"
                type="text"
                error={!!errors.city?.message}
                helperText={errors?.city?.message}
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
                  value={field.value || ''}
                  label="Country"
                  id="billcountry-select"
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
                id="postalCode"
                label="Postal Code"
                onChange={(e) => {
                  field.onChange(e);
                  onChangeInput('postalCode', e.target.value);
                }}
                onFocus={onFocusInput}
                value={field.value || ''}
                fullWidth
                size="small"
                margin="normal"
                type="text"
                error={!!errors.postalCode?.message}
                helperText={errors?.postalCode?.message}
              />
            )}
          />
        </div>

        <button type="submit" className="profile__add_btn">
          Add
        </button>
        {errorMessage && <FormError message={errorMessage} />}
      </form>
    </div>
  );
};
