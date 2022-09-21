import * as React from 'react';
import { AuthContext } from '../context/AuthContext';
import { LayoutContext } from '../context/LayoutContext';
import {
	API_BORROW,
	API_ADDUSER,
	API_RETURN,
	API_MESSAGES,
} from '../config/config';
import { konvey } from '../helpers/konvey';
import { FaGrinStars } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import useError from './useError';

const useBorrow = (bookId, borrowerId, bookBorrowed, chatId) => {
	const { userId, jwt } = React.useContext(AuthContext);
	const [confirm, setConfirm] = React.useState(
		userId === borrowerId || bookBorrowed ? false : true
	);
	const { setLoading, setAlert } = React.useContext(LayoutContext);
	const { catchError } = useError();

	const lendBook = () => {
		setLoading(true);
		const triggerBorrow = konvey(
			`${API_BORROW}${bookId}${API_ADDUSER}`,
			borrowerId,
			jwt,
			'PUT'
		);
		const updateConv = konvey(API_MESSAGES, chatId, jwt, 'PATCH');
		Promise.all([triggerBorrow, updateConv])
			.then(() =>
				setAlert({
					display: true,
					icon: <FaGrinStars />,
					msg: 'Buch erfolgreich ausgeliehen',
				})
			)
			.then(() => {
				setConfirm(false);
				confetti({
					particleCount: 100,
					spread: 70,
					origin: { y: 0.6 },
				});
			})
			.catch(catchError)
			.finally(() => {
				setLoading(false);
			});
	};

	const returnBook = () => {
		setLoading(true);
		konvey(API_RETURN, bookId, jwt, 'PUT').then((data) => {
			setAlert({
				display: true,
				icon: <FaGrinStars />,
				msg: data?.message,
			})
				.then(() => {
					confetti({
						particleCount: 100,
						spread: 70,
						origin: { y: 0.6 },
					});
				})
				.catch(catchError)
				.finally(() => setLoading(false));
		});
	};

	return {
		confirm,
		setConfirm,
		lendBook,
		returnBook,
	};
};

export default useBorrow;
