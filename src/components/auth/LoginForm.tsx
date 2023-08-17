import {
  Controller,
  useForm,
  useFormState,
  SubmitHandler,
} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useContext, useState } from 'react';
import { passwordValidation, emailValidation } from '../../util/validation';
import { ILoginForm } from '../../types/loginForm';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { AuthContext } from '../../context/AuthProvider';
import { FormError } from './FormError';
import { TogglePasswordVisibility } from '../../util/ToggleVisibility';
import './Login.css';

export const LoginForm: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { handleSubmit, control } = useForm<ILoginForm>();
  const { errors } = useFormState({
    control,
  });

  const { loginCustomer } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    try {
      await loginCustomer({ email: data.email, password: data.password });
      setErrorMessage('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || 'An error occurred');
      }
    }
  };

  return (
    <div className="login-page">
      <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="email"
            rules={{ validate: emailValidation }}
            render={({ field }) => (
              <TextField
                id="loginEmail"
                label="Email"
                onChange={(e) => field.onChange(e)}
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
                onChange={(e) => field.onChange(e)}
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
          <button type="submit" className="login-page__btn">
            Log in
          </button>
        </form>
      </ThemeProvider>
      {errorMessage && <FormError message={errorMessage} />}{' '}
    </div>
  );
};
