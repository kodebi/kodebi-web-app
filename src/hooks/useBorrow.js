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
	const [confirm, setConfirm] = React.useState(true);
	const [lendingList, setLendingList] = React.useState({});
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

	const returnBook = (id) => {
		setLoading(true);
		konvey(API_RETURN, id, jwt, 'PUT')
			.then((data) => {
				setAlert({
					display: true,
					icon: <FaGrinStars />,
					msg: data?.message,
				});
			})
			.then(() => setLendingList({}))
			.then(() => {
				confetti({
					particleCount: 100,
					spread: 70,
					origin: { y: 0.6 },
				});
			})
			.catch(catchError)
			.finally(() => setLoading(false));
	};

	const getLendingList = React.useCallback(() => {
		setLoading(true);
		konvey(API_BORROW, null, jwt)
			.then(setLendingList)
			.catch(catchError)
			.finally(() => setLoading(false));
	}, [lendingList]);

	const checkBorrower = React.useCallback((id, bool) => {
		if (id === userId || bool) {
			setConfirm(false);
		} else {
			setConfirm(true);
		}
	}, []);

	React.useEffect(() => {
		getLendingList();
	}, []);

	React.useEffect(() => {
		checkBorrower(borrowerId, bookBorrowed);
	}, [borrowerId, bookBorrowed]);

	return { lendingList, confirm, setConfirm, lendBook, returnBook };
};

export default useBorrow;
