import * as React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from '@kodebi/libkodebi-ui';
import { AuthContext } from '../../context/AuthContext';

export const UserAction = ({
	book: { ownerName, condition, ownerId, status },
	deleteBook,
	openEditWindow,
	messageUser,
}) => {
	const { userId } = React.useContext(AuthContext);

	return (
		<>
			<aside className="user-action">
				<Box variant="flex-col-start" padding="0.75rem 0">
					<p>Dieses Buch gehört:</p>
					<Link to={`/profile/${ownerId}`} className="username-link">
						{ownerName}
					</Link>
				</Box>
				<hr className="separation-line" />
				<Box variant="flex-col-start" padding="0.75rem 0">
					<p>Zustand des Buches ist:</p>
					<h4>{condition}</h4>
				</Box>
				<hr className="separation-line" />
				<Box variant="flex-col-start" padding="0.75rem 0">
					<p>Dieses Buch ist:</p>
					<h4>{status}</h4>
				</Box>
				<hr className="separation-line" />
				<Box variant="flex-col-start" padding="0.75rem 0">
					<p>Was möchtest du tun?</p>
					{ownerId === userId ? (
						<>
							<Button
								variant="action"
								onClick={openEditWindow}
								margin="0.5rem 0"
								width="100%"
								label="Jetzt bearbeiten"
							/>
							<Button
								variant="action"
								margin="0.5rem 0"
								width="100%"
								onClick={deleteBook}
								label="Jetzt löschen"
							/>
						</>
					) : (
						<Button
							variant="action"
							margin="0.5rem 0"
							width="100%"
							onClick={messageUser}
							label="Jetzt ausleihen"
						/>
					)}
				</Box>
			</aside>
		</>
	);
};
