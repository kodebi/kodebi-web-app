import * as React from 'react';
import { LayoutContext } from '../context/LayoutContext';
import { AuthContext } from '../context/AuthContext';
import { konvey } from '../helpers/konvey';
import { API_BOOKSBYUSER } from '../config/config';
import useError from './useError';

const useUserProfile = (id) => {
	const { setLoading } = React.useContext(LayoutContext);
	const { userId, jwt } = React.useContext(AuthContext);
	const [userBooks, setUserBooks] = React.useState([]);
	const { catchError } = useError();

	const loadUserProfile = React.useCallback(() => {
		setLoading(true);
		konvey(API_BOOKSBYUSER, id ?? userId, jwt)
			.then(setUserBooks)
			.catch(catchError)
			.finally(() => setLoading(false));
	}, []);

	React.useEffect(() => {
		loadUserProfile();
	}, [id]);

	return { state: { userBooks }, setter: { setUserBooks } };
};

export default useUserProfile;
