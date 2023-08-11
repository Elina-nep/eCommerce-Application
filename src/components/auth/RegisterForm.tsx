import React, { useState } from 'react';
import {
  useForm,
  useFormState,
  SubmitHandler,
  useWatch,
} from 'react-hook-form';
import { createCustomer } from '../../services/createCustomer';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { IRegistrationForm } from '../../types/registrationForm';
import './Register.css';
import AddressesContainer from './assets/Addresses';
import { PersonalData } from './assets/PersonalData';
import { CustomCheckbox } from './assets/CustomCheckbox';
// import { checkboxValue } from '../../types/form';

export const RegisterForm: React.FC = () => {
  const { handleSubmit, control } = useForm<IRegistrationForm>();
  const { errors } = useFormState({
    control,
  });
  const watchedCountry = useWatch({ control, name: 'billCountry' });
  const [billingAddressMatches, setBillingAddressMatches] = useState(true);
  const onSubmit: SubmitHandler<IRegistrationForm> = (data) => {
    console.log(data);
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

    createCustomer({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateBirth,
      addresses: addresses,
      defaultBillingAddress: data.isBillingAddressDefault ? 0 : undefined,
      defaultShippingAddress: defaultShippingAddress,
      billingAddresses: [0],
      shippingAddresses: data.areAddressesSame ? [0] : [1],
    });
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <div className="registration-page">
          <form onSubmit={handleSubmit(onSubmit)}>
            <PersonalData control={control} errors={errors} />
            <div className="col-2">
              <CustomCheckbox
                control={control}
                name="isBillingAddressDefault"
                defaultValue={false}
                label="Save"
              />
              <p>BillingAddresses</p>
            </div>

            <AddressesContainer
              control={control}
              errors={errors}
              watchedCountry={watchedCountry}
              prefix="bill"
            />
            <CustomCheckbox
              control={control}
              name="areAddressesSame"
              defaultValue={true}
              label="My billing address matches shipping address"
              onChange={(checked) => setBillingAddressMatches(checked)}
            />
            {!billingAddressMatches && (
              <div>
                <div className="col-2">
                  <CustomCheckbox
                    control={control}
                    name="isShippingAddressDefault"
                    defaultValue={false}
                    label="Save"
                  />
                  <p>Shipping Addresses</p>
                </div>

                <AddressesContainer
                  control={control}
                  errors={errors}
                  watchedCountry={watchedCountry}
                  prefix="ship"
                />
              </div>
            )}
            <button type="submit" className="registration-page__btn">
              Create account
            </button>
          </form>
        </div>
      </ThemeProvider>
    </div>
  );
};
