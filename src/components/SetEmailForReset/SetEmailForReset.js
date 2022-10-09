import * as React from 'react';
import { Form } from '../Form';
import { AuthContext } from '../../context/AuthContext';
import { Box, Button, InputWrapper } from '@kodebi/libkodebi-ui';

export const SetEmailForReset = ({ openPasswordResetTab }) => {
	const { userCredential, checkSigninInput, requestReset } =
		React.useContext(AuthContext);

	return (
		<>
			<Form className="form-center" onSubmit={requestReset}>
				<Box variant="flex-col" padding="0">
					<div className="title">
						<h3>Passwort Reset</h3>
						<p>
							Gib hier deine Email ein und wir schicken dir einen Reset-Link
						</p>
					</div>
					<InputWrapper
						type="text"
						htmlFor="Deine Email:"
						name="email"
						id="email"
						position="above"
						value={userCredential.email}
						onChange={checkSigninInput}
						required
					/>
					<Button type="submit" label="Passwort zurücksetzen" />
					<button
						type="button"
						className="reset"
						onClick={openPasswordResetTab}
					>
						zurück zum Login
					</button>
				</Box>
			</Form>
		</>
	);
};
