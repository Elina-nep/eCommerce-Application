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

interface IUserAuth {
  ifAuth: boolean;
  alertMessage: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setIfAuth: Dispatch<SetStateAction<boolean>>;
  loginCustomer: (data: ILoginCustomer) => void;
  createCustomer: (data: ICreateCustomer) => void;
  logOut: () => void;
}

export const AuthContext = createContext<IUserAuth>({
  ifAuth: false,
  alertMessage: '',
  setLoading: () => {},
  setIfAuth: () => {},
  loginCustomer: () => {},
  createCustomer: () => {},
  logOut: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  const [ifAuth, setIfAuth] = useState(!!token);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const clearAlert = () => {
    setTimeout(() => {
      setAlertMessage('');
    }, 3000);
  };
  const loginCustomer = (data: ILoginCustomer): Promise<void> => {
    return new Promise((resolve, reject) => {
      loginCustomerService(data)
        .then((body) => {
          setIfAuth(true);
          setAlertMessage(
            `Hello ${body.body.customer.firstName || 'my friend'}!`,
          );
          clearAlert();
          resolve();
        })
        .catch((e) => {
          const errorMessage = e.message || 'An error occurred';
          reject(new Error(errorMessage));
        });
    });
  };

  const createCustomer = (data: ICreateCustomer): Promise<void> => {
    return new Promise((resolve, reject) => {
      createCustomerService(data)
        .then((body) => {
          setIfAuth(true);
          setAlertMessage(`User ${body.body.customer.email} is created`);
          clearAlert();
          loginCustomerService({ email: data.email, password: data.password });
          resolve();
        })
        .catch((e) => {
          const errorMessage = e.message || 'An error occurred';
          reject(new Error(errorMessage));
        });
    });
  };

  const logOut = () => {
    setIfAuth(false);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        ifAuth,
        alertMessage,
        setLoading,
        setIfAuth,
        loginCustomer,
        createCustomer,
        logOut,
      }}
    >
      {!loading && children}
      {loading && <LoadingSpinner />}
    </AuthContext.Provider>
  );
};
