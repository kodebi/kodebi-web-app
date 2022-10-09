import * as React from 'react';
import { Form } from '../Form';
import { AuthContext } from '../../context/AuthContext';
import { Box, InputWrapper, Button } from '@kodebi/libkodebi-ui';

export const Login = ({ openPasswordResetTab }) => {
	const {
		userCredential: { email, password },
		login,
		checkSigninInput,
	} = React.useContext(AuthContext);

	return (
		<>
			<Form className="form-center" onSubmit={login}>
				<Box variant="flex-col" margin="0" padding="0">
					<div className="title">
						<h3>Willkommen zurück</h3>
					</div>
					<InputWrapper
						type="text"
						htmlFor="Deine Email:"
						name="email"
						id="email"
						value={email}
						position="above"
						onChange={checkSigninInput}
					/>
					<InputWrapper
						type="password"
						htmlFor="Dein Passwort:"
						name="password"
						id="password"
						value={password}
						position="above"
						onChange={checkSigninInput}
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
