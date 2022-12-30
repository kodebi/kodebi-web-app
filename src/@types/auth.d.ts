import React from "react";

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
  userId: any;
  jwt: any;
  userName: any;
  checkSigninInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  login: (e: React.MouseEvent<HTMLButtonElement>) => void;
  signup: (e: React.MouseEvent<HTMLButtonElement>) => void;
  logout: () => void;
  activate: (e: React.MouseEvent<HTMLButtonElement>) => void;
  reset: (e: React.MouseEvent<HTMLButtonElement>) => void;
  requestReset: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
