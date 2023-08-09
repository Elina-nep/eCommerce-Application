import {
  Controller,
  useForm,
  useFormState,
  SubmitHandler,
} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <div className="login-page">
      <ThemeProvider theme={theme}>
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
                fullWidth
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
              <FormControl
                fullWidth
                variant="outlined"
                size="small"
                margin="normal"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={field.value}
                  onChange={field.onChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            )}
          />

          <button type="submit" className="login-page__btn">
            Log in
          </button>
        </form>
      </ThemeProvider>
    </div>
  );
};
