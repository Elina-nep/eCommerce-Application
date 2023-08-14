import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { LoginForm } from '../src/components/auth/LoginForm';

test('renders login form', async () => {
  const wrapper = render(<LoginForm />);
  expect(wrapper).toBeTruthy();
  const inputs = {
    email: wrapper.container
      .querySelector('.MuiTextField-root')!
      .querySelector('input'),
  };

  fireEvent.change(inputs.email!, {
    target: {
      value: 'email@email',
    },
  });

  fireEvent(
    wrapper.container.querySelector('.login-page__btn')!,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );

  await waitFor(() => {
    const error = wrapper.container.querySelector('.Mui-error');
    expect(error).toBeTruthy();
    expect(screen.getByText('Invalid email address.')).toBeInTheDocument();
  });
  fireEvent.change(inputs.email!, {
    target: {
      value: 'email@email.com',
    },
  });

  fireEvent(
    wrapper.container.querySelector('.login-page__btn')!,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );
  await waitFor(() => {
    const error = wrapper.container.querySelector('.Mui-error');
    expect(error).toBeFalsy();
  });
});
