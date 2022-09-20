import * as React from 'react';
import { API_BORROW } from '../config/config';
import { konvey } from '../helpers/konvey';
import { LayoutContext } from '../context/LayoutContext';
import { AuthContext } from '../context/AuthContext';
import useError from './useError';

const useGetLentBooks = () => {
	const { setLoading } = React.useContext(LayoutContext);
	const { jwt } = React.useContext(AuthContext);
	const [lendingList, setLendingList] = React.useState({});
	const { catchError } = useError();

	React.useEffect(() => {
		setLoading(true);
		konvey(API_BORROW, null, jwt)
			.then(setLendingList)
			.catch(catchError)
			.finally(() => setLoading(false));
		return () => setLoading(false);
	}, []);

	return {
		lendingList,
	};
};

export default useGetLentBooks;
