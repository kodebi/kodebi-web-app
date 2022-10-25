export interface IUserCredential {
	name: string;
	email: string;
	password: string;
}

export interface LoginProps {
	openPasswordResetTab: () => void;
}

export interface AuthState {
	user: boolean;
	userCredential: IUserCredential;
	userId: string;
	jwt: string;
	userName: string;
	checkSigninInput: () => void;
	login: (e: any) => void;
	signup: (e: any) => void;
	logout: () => void;
	activate: (e: any) => void;
	reset: (e: any) => void;
	requestReset: (e: any) => void;
}
