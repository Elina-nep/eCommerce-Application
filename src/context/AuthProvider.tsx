import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import LoadingSpinner from '../components/loading/LoadingSpinner';
import { ICreateCustomer, ILoginCustomer } from '../types';
import { loginCustomerService } from '../services/auth/loginCustomerService';
import { createCustomerService } from '../services/auth/createCustomerService';
// import { recreateTokenFlow } from '../services/BuildClient';

interface IUserAuth {
  ifAuth: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setIfAuth: Dispatch<SetStateAction<boolean>>;
  loginCustomer: (data: ILoginCustomer) => void;
  createCustomer: (data: ICreateCustomer) => void;
}

export const AuthContext = createContext<IUserAuth>({
  ifAuth: false,
  setLoading: () => {},
  setIfAuth: () => {},
  loginCustomer: () => {},
  createCustomer: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [ifAuth, setIfAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  // const token = localStorage.getItem('token');
  // if (!token) {

  // }
  const loginCustomer = (data: ILoginCustomer) => {
    loginCustomerService(data)
      .then((body) => {
        alert(`Hello ${body.body.customer.firstName || 'my friend'}!`);
        setIfAuth(true);
      })
      .catch((e) => {
        throw e;
      });
  };

  const createCustomer = (data: ICreateCustomer) => {
    createCustomerService(data)
      .then((body) => {
        alert(`User ${body.body.customer.email} is created`);
        setIfAuth(true);
      })
      .catch((e) => {
        throw e;
      });
  };

  return (
    <AuthContext.Provider
      value={{
        ifAuth,
        setLoading,
        setIfAuth,
        loginCustomer,
        createCustomer,
      }}
    >
      {!loading && children}
      {loading && <LoadingSpinner />}
    </AuthContext.Provider>
  );
};
