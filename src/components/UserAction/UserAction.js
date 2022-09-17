import * as React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ActionBtn } from '../ActionBtn';

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
				<section className="action-section">
					<p>Dieses Buch gehört:</p>
					<Link to={`/profile/${ownerId}`} className="username-link">
						{ownerName}
					</Link>
				</section>
				<hr className="separation-line" />
				<section className="action-section">
					<p>Zustand des Buches ist:</p>
					<h4>{condition}</h4>
				</section>
				<hr className="separation-line" />
				<section className="action-section">
					<p>Dieses Buch ist:</p>
					<h4>{status}</h4>
				</section>
				<hr className="separation-line" />
				<section className="action-section">
					<p>Was möchtest du tun?</p>
					{ownerId === userId ? (
						<>
							<ActionBtn onClick={openEditWindow}>Jetzt bearbeiten</ActionBtn>
							<ActionBtn onClick={deleteBook}>Jetzt löschen</ActionBtn>
						</>
					) : (
						<ActionBtn onClick={messageUser}>Jetzt ausleihen</ActionBtn>
					)}
				</section>
			</aside>
		</>
	);
};
