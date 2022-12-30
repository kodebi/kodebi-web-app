import * as React from "react";
import { AuthState } from "../@types/auth";
import useAuth from "../hooks/useAuth";

interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthContext = React.createContext<AuthState | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }): JSX.Element => {
  const { state, creds, functions } = useAuth();

  return (
    <AuthContext.Provider value={{ ...state, ...creds, ...functions }}>
      {children}
    </AuthContext.Provider>
  );
};
