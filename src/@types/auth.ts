import React from "react";

export interface IUserCredential {
  name: string;
  email: string;
  password: string;
}

export interface LoginProps {
  openPasswordResetTab: () => void;
}

export type AuthState = {
  user: boolean;
  userCredential: IUserCredential;
  userId: string | null;
  jwt: string | null;
  userName: string | null;
  checkSigninInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  login: (e: React.FormEvent<HTMLFormElement>) => void;
  signup: (e: React.FormEvent<HTMLFormElement>) => void;
  logout: () => void;
  activate: (e: React.FormEvent<HTMLFormElement>) => void;
  reset: (e: React.FormEvent<HTMLFormElement>) => void;
  requestReset: (e: React.FormEvent<HTMLFormElement>) => void;
};
