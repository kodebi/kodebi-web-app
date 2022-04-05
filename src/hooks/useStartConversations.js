import React from 'react';
import { LayoutContext } from '../context/LayoutContext';
import { konvey } from '../helpers/konvey';
import { FaCheckCircle, FaPoo } from 'react-icons/fa';
import { API_MESSAGES } from '../config/config';
import { AuthContext } from '../context/AuthContext';

const useStartConversations = (ownerId) => {
	const { setAlert, setLoading } = React.useContext(LayoutContext);
	const [showMessageModal, setShowMessageModal] = React.useState(false);
	const { userId, jwt } = React.useContext(AuthContext);
	const [newConv, setNewConv] = React.useState({
		sender: '',
		reciever: '',
		message: '',
	});

	// kontaktiere Besitzer des Buchs
	const messageUser = () => {
		setShowMessageModal(true);
	};

	// Input des Nachrichtenfensters
	const msgModalInput = (e) => {
		setNewConv({
			sender: userId,
			reciever: ownerId,
			message: e.target.value,
		});
	};

	// schließe Nachrichtenfenster
	const closeMessageModal = () => {
		setShowMessageModal(false);
	};

	// starte neue Konversation mit Buchnutzer
	const startConv = (e) => {
		e.preventDefault();
		setLoading(true);
		konvey(API_MESSAGES, null, jwt, 'POST', newConv)
			.then(() => setLoading(false))
			.then(() => setShowMessageModal(false))
			.catch((error) =>
				setAlert({
					display: true,
					icon: <FaPoo />,
					msg: error,
				})
			)
			.then(() =>
				setAlert({
					display: true,
					icon: <FaCheckCircle />,
					msg: 'Nachricht wurde erfolgreich verschickt',
				})
			)
			.finally(() =>
				setNewConv({
					sender: '',
					reciever: '',
					message: '',
				})
			);
	};

	return {
		state: { newConv, showMessageModal },
		functions: {
			closeMessageModal,
			msgModalInput,
			messageUser,
			startConv,
		},
	};
};

export default useStartConversations;
