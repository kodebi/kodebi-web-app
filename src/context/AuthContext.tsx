import * as React from "react";

import useAuth from "../hooks/useAuth";

import type { AuthState } from "../@types/auth";

interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthContext = React.createContext<AuthState | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }): JSX.Element => {
  const { state, functions } = useAuth();

  return <AuthContext.Provider value={{ ...state, ...functions }}>{children}</AuthContext.Provider>;
};
