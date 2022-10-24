import * as React from 'react';
import { AuthState, AuthProviderProps } from '../@types/auth';
import useAuth from '../hooks/useAuth';

export const AuthContext = React.createContext<AuthState | null>(null);

export const AuthProvider: React.FC = ({ children }: AuthProviderProps) => {
	const { state, creds, functions } = useAuth();

	return (
		<AuthContext.Provider value={{ ...state, ...creds, ...functions }}>
			{children}
		</AuthContext.Provider>
	);
};
