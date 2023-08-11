import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import LoadingSpinner from '../components/loading/LoadingSpinner';
import { ILoginCustomer } from '../types';
import { loginCustomerService } from '../services';

interface IUserAuth {
  ifAuth: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setIfAuth: Dispatch<SetStateAction<boolean>>;
  loginCustomer: (data: ILoginCustomer) => void;
}

export const AuthContext = createContext<IUserAuth>({
  ifAuth: false,
  setLoading: () => {},
  setIfAuth: () => {},
  loginCustomer: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [ifAuth, setIfAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  // const token = localStorage.getItem('token');
  // if (!token) {

  // }
  const loginCustomer = (data: ILoginCustomer) => {
    loginCustomerService(data)
      .then(() => {
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
      }}
    >
      {!loading && children}
      {loading && <LoadingSpinner />}
    </AuthContext.Provider>
  );
};
