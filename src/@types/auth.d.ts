type TUserCredential = {
	name: string;
	email: string;
	password: string;
};

export interface AuthState {
	user: boolean;
	userCredential: TUserCredential;
	userId?: string | null;
	jwt?: string | null;
	userName?: string | null;
	checkSigninInput: (e: any) => void;
	login: (e: any) => void;
	signup: (e: any) => void;
	logout: () => void;
	activate: (e: any) => void;
	reset: (e: any) => void;
	requestReset: (e: any) => void;
}

export interface AuthProviderProps {
	children?: React.ReactNode;
}
