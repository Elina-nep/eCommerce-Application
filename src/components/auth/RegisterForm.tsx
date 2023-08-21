import React, { useContext, useState } from 'react';
import { useForm, useFormState, SubmitHandler } from 'react-hook-form';
import { ThemeProvider } from '@mui/material/styles';
import { registerTheme } from './theme';
import { IRegistrationForm } from '../../types/registrationForm';
import { PersonalData } from './assets/PersonalData';
import { CustomCheckbox } from './assets/CustomCheckbox';
import { AuthContext } from '../../context/AuthProvider';
import { FormError } from './FormError';
import { BillAddresses } from './assets/BillAddresses';
import { ShipAddresses } from './assets/ShipAddress';
import './RegisterForm.scss';

export const RegisterForm: React.FC = () => {
  const { handleSubmit, control } = useForm<IRegistrationForm>({
    defaultValues: {
      areAddressesSame: true,
    },
  });

  const { errors } = useFormState({
    control,
  });

  const [billingAddressMatches, setBillingAddressMatches] = useState(true);
  const { createCustomer } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const onSubmit: SubmitHandler<IRegistrationForm> = async (data) => {
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
      await createCustomer({
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
      setErrorMessage('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || 'An error occurred');
      }
    }
  };

  return (
    <div className="registration-page">
      <ThemeProvider theme={registerTheme}>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="registration-page__form"
          >
            <PersonalData control={control} errors={errors} />
            <p>Billing Address</p>
            <div className="registration-page__col-2">
              <CustomCheckbox
                id="isBillingAddressDefault"
                control={control}
                name="isBillingAddressDefault"
                label="Save billing address as default"
              />
            </div>
            <BillAddresses control={control} errors={errors} />
            <div className="registration-page__col-1">
              <CustomCheckbox
                id="areAddressesSame"
                control={control}
                name="areAddressesSame"
                label="My billing address matches shipping address"
                isChecked={billingAddressMatches}
                onChange={(checked) => setBillingAddressMatches(checked)}
              />
            </div>
            {!billingAddressMatches && (
              <div>
                <p>Shipping Address</p>
                <div className="registration-page__col-2">
                  <CustomCheckbox
                    id="isShippingAddressDefault"
                    control={control}
                    name="isShippingAddressDefault"
                    label="Save shipping address as default"
                  />
                </div>
                <ShipAddresses control={control} errors={errors} />
              </div>
            )}
            <button type="submit" className="registration-page__btn">
              Create account
            </button>
            {errorMessage && <FormError message={errorMessage} />}{' '}
          </form>
        </div>
      </ThemeProvider>
    </div>
  );
};
