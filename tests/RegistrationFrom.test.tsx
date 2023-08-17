import { fireEvent, render, waitFor, screen } from '@testing-library/react';
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

  await waitFor(() => {
    const error = wrapper.container.querySelector('.error_message');
    expect(error).toBeFalsy();
  });
});

test('checks Registration form render with reong inputs', async () => {
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

  if (inputs.firstName) {
    userEvent.type(inputs.firstName, '!');
  }

  if (inputs.lastName) {
    userEvent.type(inputs.lastName, '@');
  }

  if (inputs.email) {
    userEvent.type(inputs.email, 'email');
  }

  if (inputs.password) {
    userEvent.type(inputs.password, 'weak');
  }

  if (inputs.dateOfBirth) {
    userEvent.type(inputs.dateOfBirth, 'invalid_date');
  }

  if (inputs.isBillingAddressDefault) {
    userEvent.click(inputs.isBillingAddressDefault);
  }

  if (inputs.billStreet) {
    userEvent.type(inputs.billStreet, '');
  }

  if (inputs.billCity) {
    userEvent.type(inputs.billCity, '');
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

  if (inputs.shipStreet) {
    userEvent.type(inputs.shipStreet, '');
  }

  if (inputs.shipCity) {
    userEvent.type(inputs.shipCity, '');
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

  await waitFor(() => {
    // const firstNameError = wrapper.container.querySelector(
    //   '#firstName-helper-text',
    // );
    // expect(firstNameError).toBeTruthy();
    // expect(
    //   screen.getByText('Cannot contain special characters or numbers.'),
    // ).toBeInTheDocument();

    const emailError = wrapper.container.querySelector(
      '#registrEmail-helper-text',
    );
    expect(emailError).toBeTruthy();
    expect(screen.getByText('Invalid email address.')).toBeInTheDocument();
  });
});
