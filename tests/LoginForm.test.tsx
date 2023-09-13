import { enableFetchMocks } from 'jest-fetch-mock';
import fetch from 'jest-fetch-mock';
enableFetchMocks();

import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

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

window.alert = () => {};

test('checks wrong email', async () => {
  const wrapper = render(
    <AuthProvider>
      <LoginForm />
    </AuthProvider>,
  );

  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(6));
  expect(wrapper).toBeTruthy();

  const inputs = {
    email: wrapper.container.querySelector('#loginEmail'),
    password: wrapper.container.querySelector('#loginPassword'),
  };

  await act(async () => {
    fireEvent.change(inputs.email!, {
      target: {
        value: 'email@email',
      },
    });

    fireEvent.change(inputs.password!, {
      target: {
        value: 'aaAA11!!',
      },
    });

    fireEvent(
      wrapper.container.querySelector('.login-page__btn')!,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
  });

  await waitFor(() => {
    const error = wrapper.container.querySelector('.Mui-error');
    expect(error).toBeTruthy();
    expect(screen.getByText('Invalid email address.')).toBeInTheDocument();
  });

  await act(async () => {
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
  });

  await waitFor(() => {
    const error = wrapper.container.querySelector('.error_message');
    expect(error).toBeFalsy();
  });
});

test('checks wrong password', async () => {
  const wrapper = render(<LoginForm />);

  expect(wrapper).toBeTruthy();
  const inputs = {
    email: wrapper.container.querySelector('#loginEmail'),
    password: wrapper.container.querySelector('#loginPassword'),
  };

  fireEvent.change(inputs.email!, {
    target: {
      value: 'email@email.com',
    },
  });

  fireEvent.change(inputs.password!, {
    target: {
      value: 'aA1!',
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
    expect(
      screen.getByText('Password must be at least 8 characters long.'),
    ).toBeInTheDocument();
  });

  await act(async () => {
    fireEvent.change(inputs.password!, {
      target: {
        value: 'aaaaaaaa',
      },
    });

    fireEvent(
      wrapper.container.querySelector('.login-page__btn')!,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
  });

  await waitFor(() => {
    const error = wrapper.container.querySelector('.Mui-error');
    expect(error).toBeTruthy();
    expect(
      screen.getByText('Password must contain at least 1 uppercase letter.'),
    ).toBeInTheDocument();
  });

  await act(async () => {
    fireEvent.change(inputs.password!, {
      target: {
        value: 'AAAAAAA!',
      },
    });
    fireEvent(
      wrapper.container.querySelector('.login-page__btn')!,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
  });

  await waitFor(() => {
    const error = wrapper.container.querySelector('.Mui-error');
    expect(error).toBeTruthy();
    expect(
      screen.getByText('Password must contain at least 1 lowercase letter.'),
    ).toBeInTheDocument();
  });

  await act(async () => {
    fireEvent.change(inputs.password!, {
      target: {
        value: 'aaaAAA!!!',
      },
    });
    fireEvent(
      wrapper.container.querySelector('.login-page__btn')!,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
  });

  await waitFor(() => {
    const error = wrapper.container.querySelector('.Mui-error');
    expect(error).toBeTruthy();
    expect(
      screen.getByText('Password must contain at least 1 number.'),
    ).toBeInTheDocument();
  });

  await act(async () => {
    fireEvent.change(inputs.password!, {
      target: {
        value: 'aaaAAA!!!',
      },
    });
    fireEvent(
      wrapper.container.querySelector('.login-page__btn')!,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
  });

  await waitFor(() => {
    const error = wrapper.container.querySelector('.Mui-error');
    expect(error).toBeTruthy();
    expect(
      screen.getByText('Password must contain at least 1 number.'),
    ).toBeInTheDocument();
  });

  await act(async () => {
    fireEvent.change(inputs.password!, {
      target: {
        value: 'aaaAAA111',
      },
    });
    fireEvent(
      wrapper.container.querySelector('.login-page__btn')!,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
  });

  await waitFor(() => {
    const error = wrapper.container.querySelector('.Mui-error');
    expect(error).toBeTruthy();
    expect(
      screen.getByText(
        'Password must contain at least 1 special character (e.g., !@#$%^&*).',
      ),
    ).toBeInTheDocument();
  });

  await act(async () => {
    fireEvent.change(inputs.password!, {
      target: {
        value: '  aaaAAA111!!  ',
      },
    });
    fireEvent(
      wrapper.container.querySelector('.login-page__btn')!,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
  });

  await waitFor(() => {
    const error = wrapper.container.querySelector('.Mui-error');
    expect(error).toBeTruthy();
    expect(
      screen.getByText(
        'Password must not contain leading or trailing whitespace.',
      ),
    ).toBeInTheDocument();
  });

  await act(async () => {
    fireEvent.change(inputs.email!, {
      target: {
        value: 'email@email.com',
      },
    });

    fireEvent.change(inputs.password!, {
      target: {
        value: 'aaAA11!!',
      },
    });
    fireEvent(
      wrapper.container.querySelector('.login-page__btn')!,
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

test('checks email and password', async () => {
  const wrapper = render(<LoginForm />);

  expect(wrapper).toBeTruthy();
  const inputs = {
    email: wrapper.container.querySelector('#loginEmail'),
    password: wrapper.container.querySelector('#loginPassword'),
  };

  fireEvent.change(inputs.email!, {
    target: {
      value: 'email@email',
    },
  });
  fireEvent.change(inputs.password!, {
    target: {
      value: 'aaa',
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
    const emailError = wrapper.container.querySelector(
      '#loginEmail-helper-text',
    );
    expect(emailError).toBeTruthy();
    expect(screen.getByText('Invalid email address.')).toBeInTheDocument();
    const passwordError = wrapper.container.querySelector(
      '#loginPassword-helper-text',
    );
    expect(passwordError).toBeTruthy();
    expect(
      screen.getByText('Password must be at least 8 characters long.'),
    ).toBeInTheDocument();
  });

  await act(async () => {
    fireEvent.change(inputs.email!, {
      target: {
        value: 'email@email.com',
      },
    });

    fireEvent.change(inputs.password!, {
      target: {
        value: 'aaaAA11!!!',
      },
    });

    fireEvent(
      wrapper.container.querySelector('.login-page__btn')!,
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
