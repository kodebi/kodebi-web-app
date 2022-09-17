import * as React from 'react';
import { LayoutContext } from '../context/LayoutContext';
import { AuthContext } from '../context/AuthContext';
import { konvey } from '../helpers/konvey';
import { API_BOOKSBYUSER } from '../config/config';

const useUserProfile = (id) => {
	const { setLoading } = React.useContext(LayoutContext);
	const [userBooks, setUserBooks] = React.useState([]);
	const { userId, jwt } = React.useContext(AuthContext);

	React.useEffect(() => {
		setLoading(true);
		konvey(API_BOOKSBYUSER, id ?? userId, jwt)
			.then(setUserBooks)
			.then(() => setLoading(false));
		return () => setLoading(false);
	}, [id]);

	return { state: { userBooks }, setter: { setUserBooks } };
};

export default useUserProfile;
