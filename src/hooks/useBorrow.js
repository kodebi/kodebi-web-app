import * as React from 'react';
import { AuthContext } from '../context/AuthContext';
import { LayoutContext } from '../context/LayoutContext';
import { API_BORROW, API_ADDUSER } from '../config/config';
import { konvey } from '../helpers/konvey';
import { FaGrinStars } from 'react-icons/fa';
import confetti from 'canvas-confetti';
import useError from './useError';

const useBorrow = (bookId) => {
	const { userId, jwt } = React.useContext(AuthContext);
	const [confirm, setConfirm] = React.useState(true);
	const { setLoading, setAlert } = React.useContext(LayoutContext);
	const { catchError } = useError();

	const lendBook = () => {
		setLoading(true);
		konvey(`${API_BORROW}${bookId}${API_ADDUSER}`, userId, jwt, 'PUT')
			.then((data) =>
				setAlert({
					display: true,
					icon: <FaGrinStars />,
					msg: data?.message,
				})
			)
			.then(() => {
				console.log('works');
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

	return {
		confirm,
		setConfirm,
		lendBook,
	};
};

export default useBorrow;
