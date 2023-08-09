import {
  Controller,
  useForm,
  useFormState,
  SubmitHandler,
} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { passwordValidation, emailValidation } from '../../util/validation';
import { ILoginForm } from './loginForm';
import './Login.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
    error: {
      main: '#FE4004',
    },
  },
});
export const LoginPage: React.FC = () => {
  const { handleSubmit, control } = useForm<ILoginForm>();
  const { errors } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<ILoginForm> = (data) => console.log(data);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <div className="login-page">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="email"
              rules={emailValidation}
              render={({ field }) => (
                <TextField
                  label="Email"
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  fullWidth={true}
                  size="small"
                  margin="normal"
                  type="email"
                  error={!!errors.email?.message}
                  helperText={errors?.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={passwordValidation}
              render={({ field }) => (
                <TextField
                  label="Password"
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  fullWidth={true}
                  size="small"
                  margin="normal"
                  type="password"
                  error={!!errors?.password?.message}
                  helperText={errors?.password?.message}
                />
              )}
            />

            <button type="submit" className="login-page__btn">
              Log in
            </button>
          </form>
        </div>
      </ThemeProvider>
    </div>
  );
};
