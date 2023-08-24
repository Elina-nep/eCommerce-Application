import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Controller,
  useForm,
  useFormState,
  SubmitHandler,
} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import {
  nameValidation,
  // ageValidation,
  streetValidation,
  postalCodeValidation,
  countryValidation,
} from '../../util/validation';
import { FormError } from '../auth/FormError';
import { IRegistrationForm } from '../../types/registrationForm';
import { IProfileForm } from '../../types/profileFrom';
// import { TogglePasswordVisibility } from '../../util/ToggleVisibility';
import { UserFormProps } from '../../types/user';
import { ThemeProvider } from '@mui/material/styles';
import { registerTheme } from '../auth/theme';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { useWatch } from 'react-hook-form';
import { Customer } from '@commercetools/platform-sdk';
// import { BillAddresses } from '../auth/assets/BillAddresses';
// import { ShipAddresses } from '../auth/assets/ShipAddress';
import './ProfileForm.scss';

const customerToFormMapper = (customer: Customer): IProfileForm => {
  return {
    firstName: customer.firstName!,
    lastName: customer.lastName!,
    email: customer.email!,
    password: customer.password!,
    dateOfBirth: customer.dateOfBirth!,
    billStreet: customer.addresses[0].streetName!,
    billCity: customer.addresses[0].city!,
    billPostalCode: customer.addresses[0].postalCode!,
    billCountry: customer.addresses[0].country!,
    shipStreet: customer.addresses[1].streetName!,
    shipCity: customer.addresses[1].city!,
    shipPostalCode: customer.addresses[1].postalCode!,
    shipCountry: customer.addresses[1].country!,
    areAddressesSame: customer.addresses.length === 1,
    isBillingAddressDefault:
      customer.defaultBillingAddressId === customer.addresses[0].id,
    isShippingAddressDefault:
      customer.defaultBillingAddressId === customer.addresses[1].id,
  };
};

export const ProfileForm: React.FC<UserFormProps> = ({ response }) => {
  const profileFields = customerToFormMapper(response);

  const { handleSubmit, control, trigger } = useForm<IRegistrationForm>({
    mode: 'onBlur',
    defaultValues: profileFields,
  });
  const { errors } = useFormState({ control });

  const [editMode, setEditMode] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string>('');

  // const clearError = (fieldName: keyof IRegistrationForm) => {
  //   if (errors[fieldName]) {
  //     setError(fieldName, { type: 'manual', message: '' });
  //   }
  // };

  // const onFocusInput = () => {
  //   setErrorMessage('');
  // };

  const [editedValues, setEditedValues] = useState(profileFields);
  // const [visible, setVisible] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const watchedbillCountry = useWatch({
    control,
    name: 'billCountry',
    defaultValue: response.addresses[0].country,
  });

  const postalCodeValidate = (value: string): string =>
    postalCodeValidation.validate(value, watchedbillCountry) as string;

  // const [addBillAddress, setAddBillAddress] = useState(false);

  // const handleAddBillClick = () => {
  //   setAddBillAddress(true);
  // };

  // const [addShipAddress, setAddShipAddress] = useState(false);

  // const handleAddShipClick = () => {
  //   setAddShipAddress(true);
  // };

  const onSubmit: SubmitHandler<IRegistrationForm> = async (data) => {
    setEditMode(false);
    const billinAdd = {
      country: data.billCountry,
      city: data.billCity,
      streetName: data.billStreet,
      postalCode: data.billPostalCode,
    };
    const shipAdd = {
      country: data.shipCountry,
      city: data.shipCity,
      streetName: data.shipStreet,
      postalCode: data.shipPostalCode,
    };
    const addresses = [billinAdd];
    if (!data.areAddressesSame) {
      addresses.push(shipAdd);
    }
    let defaultShippingAddress;

    if (data.areAddressesSame && data.isBillingAddressDefault) {
      defaultShippingAddress = 0;
    } else if (data.isShippingAddressDefault) {
      defaultShippingAddress = 1;
    }

    try {
      await console.log({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        addresses: addresses,
        defaultBillingAddress: data.isBillingAddressDefault ? 0 : undefined,
        defaultShippingAddress: defaultShippingAddress,
        billingAddresses: [0],
        shippingAddresses: data.areAddressesSame ? [0] : [1],
      });

      setErrorMessage('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || 'An error occurred');
      }
    }
  };

  // const today = new Date().toISOString().split('T')[0];

  return (
    <div className={`profile ${editMode ? 'edit-mode' : ''}`}>
      <Link to="/">Home</Link>
      <h1>{editMode ? '✏️' : ''} Profile</h1>
      <ThemeProvider theme={registerTheme}>
        <form onSubmit={handleSubmit(onSubmit)} className="profile__form">
          <Controller
            control={control}
            name="firstName"
            rules={nameValidation}
            render={({ field }) => (
              <TextField
                id="firstName"
                label="First name"
                onChange={(e) => {
                  field.onChange(e);
                  const newValue = e.target.value;
                  setEditedValues((prevValues) => ({
                    ...prevValues,
                    firstName: newValue,
                  }));
                  trigger('firstName');
                }}
                onBlur={() => {
                  trigger('firstName');
                }}
                value={editMode ? editedValues.firstName : response.firstName}
                fullWidth
                size="small"
                margin="normal"
                type="text"
                error={!!errors.firstName?.message}
                helperText={errors?.firstName?.message}
                InputProps={{
                  readOnly: !editMode,
                }}
                variant={editMode ? 'outlined' : 'standard'}
              />
            )}
          />

          <h3>Billing Addresses</h3>
          <p>
            {response.defaultBillingAddressId === response.addresses[0].id
              ? 'Default'
              : 'Not default'}
          </p>
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
                    editMode
                      ? editedValues.billStreet
                      : profileFields.billStreet
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
              error={
                !!errors[`billCountry` as keyof IRegistrationForm]?.message
              }
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
              {errors[`billCountry` as keyof IRegistrationForm]?.message && (
                <FormHelperText>
                  {errors[`billCountry` as keyof IRegistrationForm]?.message}
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

          <div className="buttons_box">
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
          {errorMessage && <FormError message={errorMessage} />}
        </form>
      </ThemeProvider>
    </div>
  );
};
