import { fireEvent, render, waitFor, act } from '@testing-library/react';
import { RegisterForm } from '../src/components/auth/RegisterForm';
import userEvent from '@testing-library/user-event';

test('checks Registration form render with correct inputs', async () => {
  const wrapper = render(<RegisterForm />);
  expect(wrapper).toBeTruthy();

  const inputs = {
    firstName: wrapper.container.querySelector('#firstName'),
    lastName: wrapper.container.querySelector('#lastName'),
    email: wrapper.container.querySelector('#registrEmail'),
    password: wrapper.container.querySelector('#registrPassword'),
    dateOfBirth: wrapper.container.querySelector('#dateBirth'),
    isBillingAddressDefault: wrapper.container.querySelector(
      '#isBillingAddressDefault',
    ),
    billStreet: wrapper.container.querySelector('#billStreet'),
    billCity: wrapper.container.querySelector('#billCity'),
    billPostalCode: wrapper.container.querySelector('#billPostalCode'),
    billCountrySelect: wrapper.container.querySelector('#billCountrySelect'),
    areAddressesSame: wrapper.container.querySelector('#areAddressesSame'),
    isShippingAddressDefault: wrapper.container.querySelector(
      '#isShippingAddressDefault',
    ),
    shipStreet: wrapper.container.querySelector('#shipStreet'),
    shipCity: wrapper.container.querySelector('#shipCity'),
    shipPostalCode: wrapper.container.querySelector('#shipPostalCode'),
    shipCountrySelect: wrapper.container.querySelector('#shipCountrySelect'),
  };

  await act(async () => {
    if (inputs.firstName) {
      userEvent.type(inputs.firstName, 'FirstName');
    }

    if (inputs.lastName) {
      userEvent.type(inputs.lastName, 'LastName');
    }

    if (inputs.email) {
      userEvent.type(inputs.email, 'email@email.com');
    }

    if (inputs.password) {
      userEvent.type(inputs.password, 'aaAA11!!');
    }

    if (inputs.dateOfBirth) {
      userEvent.type(inputs.dateOfBirth, '01.01.1990');
    }

    if (inputs.isBillingAddressDefault) {
      userEvent.click(inputs.isBillingAddressDefault);
    }

    if (inputs.billStreet) {
      userEvent.type(inputs.billStreet, 'billStreet');
    }

    if (inputs.billCity) {
      userEvent.type(inputs.billCity, 'billCity');
    }

    if (inputs.billPostalCode) {
      userEvent.type(inputs.billPostalCode, '12345');
    }

    if (inputs.billCountrySelect !== null) {
      userEvent.click(inputs.billCountrySelect);
    }

    const germanyOption = wrapper.container.querySelector('#billCountry');

    if (germanyOption !== null) {
      userEvent.click(germanyOption);
    }

    if (inputs.shipStreet) {
      userEvent.type(inputs.shipStreet, 'shipStreet');
    }

    if (inputs.shipCity) {
      userEvent.type(inputs.shipCity, 'shipCity');
    }

    if (inputs.shipPostalCode) {
      userEvent.type(inputs.shipPostalCode, '23456');
    }

    if (inputs.shipCountrySelect !== null) {
      userEvent.click(inputs.shipCountrySelect);
    }

    const serbiaOption = wrapper.container.querySelector('#shipCountry');

    if (serbiaOption !== null) {
      userEvent.click(serbiaOption);
    }

    if (inputs.areAddressesSame) {
      userEvent.click(inputs.areAddressesSame);
    }

    if (inputs.isShippingAddressDefault) {
      userEvent.click(inputs.isShippingAddressDefault);
    }

    fireEvent(
      wrapper.container.querySelector('.registration-page__btn')!,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
  });

  await waitFor(() => {
    const error = wrapper.container.querySelector('.error_message');
    expect(error).toBeFalsy();
  });
});

test('checks Registration form render with wrong inputs', async () => {
  const wrapper = render(<RegisterForm />);

  const inputs = {
    firstName: wrapper.container.querySelector('#firstName'),
    lastName: wrapper.container.querySelector('#lastName'),
    email: wrapper.container.querySelector('#registrEmail'),
    password: wrapper.container.querySelector('#registrPassword'),
    dateOfBirth: wrapper.container.querySelector('#dateBirth'),
    isBillingAddressDefault: wrapper.container.querySelector(
      '#isBillingAddressDefault',
    ),
    billStreet: wrapper.container.querySelector('#billStreet'),
    billCity: wrapper.container.querySelector('#billCity'),
    billPostalCode: wrapper.container.querySelector('#billPostalCode'),
    billCountrySelect: wrapper.container.querySelector('#billCountrySelect'),
    areAddressesSame: wrapper.container.querySelector('#areAddressesSame'),
    isShippingAddressDefault: wrapper.container.querySelector(
      '#isShippingAddressDefault',
    ),
    shipStreet: wrapper.container.querySelector('#shipStreet'),
    shipCity: wrapper.container.querySelector('#shipCity'),
    shipPostalCode: wrapper.container.querySelector('#shipPostalCode'),
    shipCountrySelect: wrapper.container.querySelector('#shipCountrySelect'),
  };

  await act(async () => {
    if (inputs.firstName) {
      userEvent.type(inputs.firstName, '!');
    }

    if (inputs.lastName) {
      userEvent.type(inputs.lastName, '@');
    }

    if (inputs.email) {
      userEvent.type(inputs.email, 'email@email');
    }

    if (inputs.password) {
      userEvent.type(inputs.password, 'weak');
    }

    if (inputs.dateOfBirth) {
      userEvent.type(inputs.dateOfBirth, '2020-01-01');
    }

    if (inputs.isBillingAddressDefault) {
      userEvent.click(inputs.isBillingAddressDefault);
    }

    if (inputs.billPostalCode) {
      userEvent.type(inputs.billPostalCode, '123');
    }

    if (inputs.billCountrySelect !== null) {
      userEvent.click(inputs.billCountrySelect);
    }

    const germanyOption = wrapper.container.querySelector('#billCountry');

    if (germanyOption !== null) {
      userEvent.click(germanyOption);
    }

    if (inputs.shipPostalCode) {
      userEvent.type(inputs.shipPostalCode, '2345');
    }

    if (inputs.shipCountrySelect !== null) {
      userEvent.click(inputs.shipCountrySelect);
    }

    const serbiaOption = wrapper.container.querySelector('#shipCountry');

    if (serbiaOption !== null) {
      userEvent.click(serbiaOption);
    }

    if (inputs.areAddressesSame) {
      userEvent.click(inputs.areAddressesSame);
    }

    if (inputs.isShippingAddressDefault) {
      userEvent.click(inputs.isShippingAddressDefault);
    }

    fireEvent(
      wrapper.container.querySelector('.registration-page__btn')!,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
  });

  await waitFor(() => {
    const firstNameError = wrapper.container.querySelector(
      '#firstName-helper-text',
    );
    expect(firstNameError).toBeTruthy();
    expect(firstNameError).toHaveTextContent(
      'Cannot contain special characters or numbers.',
    );
    const lastNameError = wrapper.container.querySelector(
      '#lastName-helper-text',
    );
    expect(lastNameError).toBeTruthy();
    expect(lastNameError).toHaveTextContent(
      'Cannot contain special characters or numbers.',
    );

    const emailError = wrapper.container.querySelector(
      '#registrEmail-helper-text',
    );
    expect(emailError).toBeTruthy();
    expect(emailError).toHaveTextContent('Invalid email address.');

    const passwordError = wrapper.container.querySelector(
      '#registrPassword-helper-text',
    );
    expect(passwordError).toBeTruthy();
    expect(passwordError).toHaveTextContent(
      'Password must be at least 8 characters long.',
    );

    const dateError = wrapper.container.querySelector('#dateBirth-helper-text');
    expect(dateError).toBeTruthy();
    expect(dateError).toHaveTextContent('Must be at least 13 years old.');

    const billStreetError = wrapper.container.querySelector(
      '#billStreet-helper-text',
    );
    expect(billStreetError).toBeTruthy();
    expect(billStreetError).toHaveTextContent('This field is required');

    const billCityError = wrapper.container.querySelector(
      '#billCity-helper-text',
    );
    expect(billCityError).toBeTruthy();
    expect(billCityError).toHaveTextContent('This field is required');

    const billCodeError = wrapper.container.querySelector(
      '#billpostalCode-helper-text',
    );
    expect(billCodeError).toBeTruthy();
    expect(billCodeError).toHaveTextContent('This field is required');

    const bilCountryError = wrapper.container.querySelector(
      '.MuiFormHelperText-root',
    );
    expect(bilCountryError).toBeTruthy();
    expect(bilCountryError).toHaveTextContent(
      'Cannot contain special characters or numbers.',
    );

    const shipStreetError = wrapper.container.querySelector(
      '#shipStreet-helper-text',
    );
    expect(shipStreetError).toBeTruthy();
    expect(shipStreetError).toHaveTextContent('This field is required');

    const shipCityError = wrapper.container.querySelector(
      '#shipCity-helper-text',
    );
    expect(shipCityError).toBeTruthy();
    expect(shipCityError).toHaveTextContent('This field is required');

    const shipCodeError = wrapper.container.querySelector(
      '#shippostalCode-helper-text',
    );
    expect(shipCodeError).toBeTruthy();
    expect(shipCodeError).toHaveTextContent('This field is required');

    const shipCountryError = wrapper.container.querySelector(
      '.MuiFormHelperText-root',
    );
    expect(shipCountryError).toBeTruthy();
    expect(shipCountryError).toHaveTextContent(
      'Cannot contain special characters or numbers.',
    );
  });
});
