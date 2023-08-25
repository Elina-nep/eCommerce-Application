import { useEffect, useState } from 'react';
import { Customer } from '@commercetools/platform-sdk';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import { getCustomerFunc } from '../../util';
import { ProfileForm } from '../../components/ProfileForm/ProfileForm';
import './Profile.scss';

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
  const [refresh, setRefresh] = useState(false);

  const handleGetProducts = () => {
    getCustomerFunc(setLoading)
      .then((body) => {
        console.log(body);
        setCustomer(body);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    handleGetProducts();
    setRefresh(false);
  }, [refresh]);

  return (
    <main className="main-container profile-page">
      <section>
        {loading && <LoadingSpinner />}
        {!loading && !!customer.id && (
          <ProfileForm
            refreshCallback={() => setRefresh(true)}
            response={customer}
          />
        )}
      </section>
    </main>
  );
};
