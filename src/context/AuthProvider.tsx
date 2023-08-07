import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import LoadingSpinner from '../components/loading/LoadingSpinner';

interface IUserAuth {
  ifAuth: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setIfAuth: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<IUserAuth>({
  ifAuth: false,
  setLoading: () => {},
  setIfAuth: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [ifAuth, setIfAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        ifAuth,
        setLoading,
        setIfAuth,
      }}
    >
      {!loading && children}
      {loading && <LoadingSpinner />}
    </AuthContext.Provider>
  );
};
