import React from 'react';
import { LayoutContext } from '../context/LayoutContext';
import { konvey } from '../helpers/konvey';
import { FaCheckCircle } from 'react-icons/fa';
import { API_MESSAGES } from '../config/config';
import { AuthContext } from '../context/AuthContext';
import useError from './useError';

const useStartConversations = (ownerId, ownerName, bookId, bookName) => {
	const { setAlert, setLoading } = React.useContext(LayoutContext);
	const [showMessageModal, setShowMessageModal] = React.useState(false);
	const { userId, userName, jwt } = React.useContext(AuthContext);
	const [newConv, setNewConv] = React.useState({
		senderId: '',
		senderName: '',
		recieverId: '',
		recieverName: '',
		message: '',
		bookId: '',
		bookName: '',
	});
	const { catchError } = useError();

	// kontaktiere Besitzer des Buchs
	const messageUser = () => {
		setShowMessageModal(true);
	};

	// Input des Nachrichtenfensters
	const msgModalInput = (e) => {
		setNewConv({
			senderId: userId,
			senderName: userName,
			recieverId: ownerId,
			recieverName: ownerName,
			message: e.target.value,
			bookId: bookId,
			bookName: bookName,
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
			.catch(catchError)
			.then(() =>
				setAlert({
					display: true,
					icon: <FaCheckCircle />,
					msg: 'Nachricht wurde erfolgreich verschickt',
				})
			)
			.finally(() =>
				setNewConv({
					senderId: '',
					senderName: '',
					recieverId: '',
					recieverName: '',
					message: '',
					bookId: '',
					bookName: '',
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
