import * as React from 'react';
import { LayoutContext } from '../../context/LayoutContext';
import { AuthContext } from '../../context/AuthContext';
import { Alert, Loading2 } from '../../components';
import { Form } from '../../components/Form';
import { Box, Button } from '@kodebi/libkodebi-ui';

export const Activate = () => {
	const { alert, loading } = React.useContext(LayoutContext);
	const { activate } = React.useContext(AuthContext);

	return (
		<>
			{loading && <Loading2 />}
			<main className="hero">
				<section className="signin-center">
					<Form className="form-center" onSubmit={activate}>
						<div className="title">
							<h3>Kontoaktivierung</h3>
							<p>Du hast es fast geschafft! Schalte nun deinen Account frei.</p>
						</div>
						<Box variant="flex-col" padding="0">
							<Button type="submit" margin="1rem 0" label="Aktivieren" />
						</Box>
					</Form>
				</section>
			</main>
			{alert.display && <Alert />}
		</>
	);
};
