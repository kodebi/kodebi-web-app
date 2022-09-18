import * as React from 'react';
import { AuthContext } from '../context/AuthContext';
import { LayoutContext } from '../context/LayoutContext';
import { API_BORROW, API_ADDUSER } from '../config/config';
import { konvey } from '../helpers/konvey';
import useError from './useError';

const useBorrow = (bookId) => {
	const { setLoading } = React.useContext(LayoutContext);
	const { userId, jwt } = React.useContext(AuthContext);
	const { catchError } = useError();

	const borrowBook = () => {
		setLoading(true);
		konvey(`${API_BORROW}${bookId}${API_ADDUSER}`, userId, jwt, 'PUT')
			.then(() => {
				console.log('works');
			})
			.catch(catchError)
			.finally(() => {
				setLoading(false);
			});
	};

	return {
		borrowBook,
	};
};

export default useBorrow;
