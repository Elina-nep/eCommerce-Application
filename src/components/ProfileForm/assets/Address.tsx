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
import { BillAddProps } from '../../../types/user';
import {
  useWatch,
  useForm,
  useFormState,
  SubmitHandler,
} from 'react-hook-form';
import { IBillAdd } from '../../../types/registrationForm';
import { CustomerChanges } from '../../../types';
import { changeCustomerFunc } from '../../../util/customer';
import { AddressType } from '../../../types/user';

export const Address: React.FC<BillAddProps> = ({
  address,
  version,
  addressType,
  refreshCallback,
}) => {
  const { handleSubmit, control, trigger } = useForm<IBillAdd>({
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

  const onSubmit: SubmitHandler<IBillAdd> = async (data) => {
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
      await changeCustomerFunc(setLoading, customerChanges, version);

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
          <h2>{editMode ? '✏️' : ''}</h2>
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

        <div className="prof__col-2">
          <Controller
            control={control}
            name="streetName"
            rules={streetValidation}
            render={({ field }) => (
              <TextField
                id="streetName"
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
                id="city"
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
            error={!!errors[`country` as keyof IBillAdd]?.message}
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
                  id="billcountry-select"
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
            {errors[`country` as keyof IBillAdd]?.message && (
              <FormHelperText>
                {errors[`country` as keyof IBillAdd]?.message}
              </FormHelperText>
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
      </form>
    </div>
  );
};
