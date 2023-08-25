import React from 'react';
import { Link } from 'react-router-dom';
import { UserFormProps } from '../../types/user';
import { ThemeProvider } from '@mui/material/styles';
import { registerTheme } from '../auth/theme';
import { Personal } from './assets/Personal';
import { BillingAddress } from './assets/BillingAddress';
import { ShippingAddress } from './assets/ShippingAddress';
import './ProfileForm.scss';

export const ProfileForm: React.FC<UserFormProps> = ({
  refreshCallback,
  response,
}) => {
  return (
    <div className="profile">
      <Link to="/">Home</Link>
      <h1 className="profile__title"> Profile</h1>
      <ThemeProvider theme={registerTheme}>
        <Personal response={response} refreshCallback={refreshCallback} />
        <BillingAddress response={response} refreshCallback={refreshCallback} />
        <ShippingAddress
          response={response}
          refreshCallback={refreshCallback}
        />
      </ThemeProvider>
    </div>
  );
};
