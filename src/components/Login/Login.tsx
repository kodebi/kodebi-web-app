import * as React from 'react';
import { Form } from '../Form';
import { AuthContext } from '../../context/AuthContext';
import { Box, Input, Button } from '@kodebi/libkodebi-ui';
import { AuthState, LoginProps } from '../../@types/auth';

export const Login: React.FC<LoginProps> = ({
	openPasswordResetTab,
}): JSX.Element => {
	const {
		userCredential: { email, password },
		login,
		checkSigninInput,
	} = React.useContext(AuthContext) as AuthState;

	return (
		<>
			<Form className="form-center" onSubmit={login}>
				<Box variant="flex-col" margin="0" padding="0">
					<div className="title">
						<h3>Willkommen zurück</h3>
					</div>
					<Input
						label
						type="text"
						labelTag="Deine Email"
						name="email"
						id="email"
						value={email}
						position="above"
						onChange={checkSigninInput}
						required
					/>
					<Input
						label
						type="password"
						labelTag="Dein Passwort"
						name="password"
						id="password"
						value={password}
						position="above"
						onChange={checkSigninInput}
						required
					/>
					<Button variant="signin" type="submit" label="Einloggen" />
					<button
						type="button"
						className="reset"
						onClick={openPasswordResetTab}
					>
						Passwort vergessen?
					</button>
				</Box>
			</Form>
		</>
	);
};
