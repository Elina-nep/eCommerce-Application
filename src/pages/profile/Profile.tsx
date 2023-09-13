import './Profile.scss';

import { Customer } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';

import LoadingSpinner from '../../components/loading/LoadingSpinner';
import { ProfileForm } from '../../components/profile/ProfileForm';
import { getCustomerFunc } from '../../util';

const defaultResponse: Customer = {
  id: '',
  version: 0,
  createdAt: '',
  lastModifiedAt: '',
  email: '',
  addresses: [],
  isEmailVerified: false,
  authenticationMode: 'Password',
};

export const ProfilePage = () => {
  const [customer, setCustomer] = useState<Customer>(defaultResponse);
  const [loading, setLoading] = useState(false);

  const handleGetCustomer = () => {
    getCustomerFunc(setLoading)
      .then((body) => {
        setCustomer(body);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    handleGetCustomer();
  }, []);

  return (
    <main className="main-container profile-page">
      {loading && <LoadingSpinner />}
      {!loading && !!customer.id && (
        <ProfileForm
          refreshCallback={() => handleGetCustomer()}
          response={customer}
        />
      )}
    </main>
  );
};
