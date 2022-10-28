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
import { AuthState } from '../@types/auth';
import { LayoutState } from '../@types/layout';

const useBorrow = (
	bookId?: string,
	borrowerId?: string,
	bookBorrowed?: boolean,
	chatId?: string
) => {
	const { userId, jwt } = React.useContext(AuthContext) as AuthState;
	const { setLoading, setAlert } = React.useContext(
		LayoutContext
	) as LayoutState;
	const [confirm, setConfirm] = React.useState<boolean>(true);
	const [lendingList, setLendingList] = React.useState({});
	const [bookReturned, setBookReturned] = React.useState<boolean>(false);
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

	const returnBook = (id?: string) => {
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
				setBookReturned(true);
			})
			.catch(catchError)
			.finally(() => setLoading(false));
	};

	const getLendingList = React.useCallback((): void => {
		setLoading(true);
		konvey(API_BORROW, null, jwt)
			.then(setLendingList)
			.catch(catchError)
			.finally(() => setLoading(false));
	}, [lendingList]);

	const checkBorrower = React.useCallback(
		(id?: string, bool?: boolean): void => {
			id === userId || bool ? setConfirm(false) : setConfirm(true);
		},
		[]
	);

	React.useEffect(() => {
		getLendingList();
		return () => setBookReturned(false);
	}, [bookReturned]);

	React.useEffect(() => {
		checkBorrower(borrowerId, bookBorrowed);
	}, [borrowerId, bookBorrowed]);

	return { lendingList, confirm, setConfirm, lendBook, returnBook };
};

export default useBorrow;
