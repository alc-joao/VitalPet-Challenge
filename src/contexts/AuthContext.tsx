import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  onAuthStateChanged,
  User,
} from 'firebase/auth';

import { auth } from '../services/firebase';

type AuthContextData = {
  user: User | null;
  loadingAuth: boolean;
  authenticated: boolean;
};

const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUser(firebaseUser);
        setLoadingAuth(false);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingAuth,
        authenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
