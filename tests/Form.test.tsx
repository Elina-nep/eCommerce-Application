import { enableFetchMocks } from 'jest-fetch-mock';
import fetch from 'jest-fetch-mock';
enableFetchMocks();

import React from 'react';
import { render } from '@testing-library/react';
import { LoginForm } from '../src/components/auth/LoginForm';
import { AuthProvider } from '../src/context/AuthProvider';

fetch.mockResponse(() =>
  Promise.resolve({ json: () => Promise.resolve('resolved') }).then(() => {
    return {
      body: JSON.stringify({
        customer: {
          firstName: 'Test',
        },
      }),
    };
  }),
);

test('renders login form', async () => {
  window.alert = () => {};
  const wrapper = render(
    <AuthProvider>
      <LoginForm />
    </AuthProvider>,
  );
  expect(wrapper).toBeTruthy();
});
