import * as React from 'react';
import { Form } from '../Form';
import { AuthContext } from '../../context/AuthContext';
import { Box, InputWrapper, Button } from '@kodebi/libkodebi-ui';

export const Signup = () => {
	const {
		userCredential: { name, email, password },
		signup,
		checkSigninInput,
	} = React.useContext(AuthContext);

	return (
		<>
			<Form className="form-center" onSubmit={signup}>
				<Box variant="flex-col" margin="0" padding="0">
					<div className="title">
						<h3>Melde dich jetzt an!</h3>
					</div>
					<InputWrapper
						type="text"
						htmlFor="Dein Wunsch-Username:"
						name="name"
						id="name"
						value={name}
						position="above"
						onChange={checkSigninInput}
					/>
					<InputWrapper
						type="text"
						htmlFor="Deine bevorzugte Email:"
						name="email"
						id="email"
						value={email}
						position="above"
						onChange={checkSigninInput}
					/>
					<InputWrapper
						type="password"
						htmlFor="Dein bärenstarkes Passwort:"
						name="password"
						id="password"
						value={password}
						position="above"
						onChange={checkSigninInput}
					/>
					<Button variant="signin" type="submit" label="Registrieren" />
				</Box>
			</Form>
		</>
	);
};
