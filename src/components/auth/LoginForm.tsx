import './LoginForm.scss';

import { ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { formAuthoredService, loginCustomerService } from '../../services';
import {
  AppDispatch,
  changeAlert,
  changeCart,
  clearAlertThunk,
  login,
} from '../../store';
import { ILoginForm } from '../../types/loginForm';
import { emailValidation, passwordValidation } from '../../util/validation';
import { TogglePasswordVisibility } from './assets/ToggleVisibility';
import { FormError } from './FormError';
import { loginTheme } from './theme';

export const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [visible, setVisible] = useState(false);
  const { handleSubmit, control, setError, trigger, setValue } =
    useForm<ILoginForm>();
  const { errors } = useFormState({
    control,
  });

  const [errorMessage, setErrorMessage] = useState<string>('');

  const clearError = (fieldName: keyof ILoginForm) => {
    if (errors[fieldName]) {
      setError(fieldName, { type: 'manual', message: '' });
    }
  };

  const onFocusInput = () => {
    setErrorMessage('');
  };

  const onChangeInput = (fieldName: keyof ILoginForm, value: string) => {
    setValue(fieldName, value);
    trigger(fieldName);
    clearError(fieldName);
  };

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    loginCustomerService(data)
      .then((body) => {
        formAuthoredService(data).catch((e) => console.log(e));
        dispatch(login());
        if (body.body.cart) {
          dispatch(changeCart({ cart: body.body.cart }));
        }
        dispatch(
          changeAlert({
            alertMessage: `Hello ${
              body.body.customer.firstName || 'my friend'
            }!`,
          }),
        );
        dispatch(clearAlertThunk());
        setErrorMessage('');
      })
      .catch((e) => {
        setErrorMessage(e.message || 'An error occurred');
      });
  };

  return (
    <div className="login-page main-container">
      <ThemeProvider theme={loginTheme}>
        <form onSubmit={handleSubmit(onSubmit)} className="login-page__form">
          <Controller
            control={control}
            name="email"
            rules={{ validate: emailValidation }}
            render={({ field }) => (
              <TextField
                id="loginEmail"
                label="Email"
                onChange={(e) => {
                  field.onChange(e);
                  onChangeInput('email', e.target.value);
                }}
                onFocus={onFocusInput}
                value={field.value || ''}
                fullWidth
                size="small"
                margin="normal"
                type="email"
                error={!!errors.email?.message}
                helperText={errors?.email?.message}
                autoComplete="email"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={passwordValidation}
            render={({ field }) => (
              <TextField
                id="loginPassword"
                label="Password"
                onChange={(e) => {
                  field.onChange(e);
                  onChangeInput('password', e.target.value);
                }}
                onFocus={onFocusInput}
                value={field.value || ''}
                fullWidth
                size="small"
                margin="normal"
                type={visible ? 'text' : 'password'}
                error={!!errors.password?.message}
                helperText={errors?.password?.message}
                autoComplete="password"
                InputProps={{
                  endAdornment: (
                    <TogglePasswordVisibility
                      visible={visible}
                      setVisible={setVisible}
                    />
                  ),
                }}
              />
            )}
          />
          <button type="submit" className="primary_button login-page__btn">
            Sign in
          </button>
          {errorMessage && <FormError message={errorMessage} />}
        </form>
      </ThemeProvider>
    </div>
  );
};
