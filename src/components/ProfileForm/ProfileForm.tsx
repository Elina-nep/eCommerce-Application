import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserFormProps } from '../../types/user';
import { ThemeProvider } from '@mui/material/styles';
import { registerTheme } from '../auth/theme';
import { Personal } from './assets/Personal';
import { Address } from './assets/Address';
import { AddressType } from '../../types/user';
import { AddAddress } from './assets/AddAddress';
import { ChangePassword } from './assets/ChangePassword';
import './ProfileForm.scss';

export const ProfileForm: React.FC<UserFormProps> = ({
  refreshCallback,
  response,
}) => {
  const billAddArr = response.addresses.filter(
    (a) => response.billingAddressIds?.includes(a.id!),
  );

  const shipAddArr = response.addresses.filter(
    (a) => response.shippingAddressIds?.includes(a.id!),
  );

  const [addBillAddress, setAddBillAdress] = useState(false);

  const handleAddBillAddress = () => {
    setAddBillAdress(!addBillAddress);
  };

  const [addShipAddress, setAddShipAdress] = useState(false);

  const handleAddShipAddress = () => {
    setAddShipAdress(!addShipAddress);
  };

  return (
    <div className="profile">
      <Link to="/">Home</Link>
      <h1 className="profile__title"> Profile</h1>
      <ThemeProvider theme={registerTheme}>
        <Personal response={response} refreshCallback={refreshCallback} />

        <h2> Billing Addresses</h2>
        <button onClick={handleAddBillAddress}>
          {' '}
          {addBillAddress ? '-' : '+'}
        </button>
        {addBillAddress && (
          <AddAddress
            version={response.version}
            addressType={AddressType.BILL}
          />
        )}
        {billAddArr.map((ba) => (
          <Address
            key={ba.id}
            address={{
              ...ba,
              isDefault: response.defaultBillingAddressId == ba.id,
            }}
            addressType={AddressType.BILL}
            version={response.version}
            refreshCallback={refreshCallback}
          />
        ))}

        <h2> Shipping Addresses</h2>
        <button onClick={handleAddShipAddress}>
          {' '}
          {addShipAddress ? '-' : '+'}
        </button>
        {addShipAddress && (
          <AddAddress
            version={response.version}
            addressType={AddressType.SHIP}
          />
        )}
        {shipAddArr.map((sa) => (
          <Address
            key={sa.id}
            address={{
              ...sa,
              isDefault: response.defaultShippingAddressId == sa.id,
            }}
            addressType={AddressType.SHIP}
            version={response.version}
            refreshCallback={refreshCallback}
          />
        ))}

        <ChangePassword
          version={response.version}
          refreshCallback={refreshCallback}
        />
      </ThemeProvider>
    </div>
  );
};
