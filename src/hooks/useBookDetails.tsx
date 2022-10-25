import * as React from 'react';
import { LayoutContext } from '../context/LayoutContext';
import { AuthContext } from '../context/AuthContext';
import { konvey } from '../helpers/konvey';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BOOK } from '../config/config';
import useError from './useError';
import { LayoutState } from '../@types/layout';
import { AuthState } from '../@types/auth';
import { BookState, IBook } from '../@types/books';

const useBookDetails = () => {
	const { setAlert, setLoading } = React.useContext(
		LayoutContext
	) as LayoutState;
	const { jwt } = React.useContext(AuthContext) as AuthState;
	const [book, setBook] = React.useState<BookState['book']>();
	const [showEditBook, setShowEditBook] = React.useState<boolean>(false);
	const { id } = useParams<string>();
	const { catchError } = useError();
	const history = useNavigate();

	// update book details
	const updateBookDetails = () => {
		return (e: any) => {
			e.preventDefault();
			setLoading(true);
			konvey(API_BOOK, id, jwt, 'PUT', book)
				.then(() => setLoading(false))
				.then(() => setShowEditBook(false))
				.then(() =>
					setAlert({
						display: true,
						icon: <FaCheckCircle />,
						msg: 'Du hast die Buchinfo erfolgreich geändert!',
					})
				)
				.catch(catchError);
		};
	};

	const deleteBook = () => {
		setLoading(true);
		konvey(API_BOOK, id, jwt, 'DELETE')
			.then(() => setLoading(false))
			.catch(catchError)
			.then(() => history(-1))
			.then(() =>
				setAlert({
					display: true,
					icon: <FaCheckCircle />,
					msg: 'Das Buch wurde erfolgreich gelöscht',
				})
			);
	};

	// öffne Fenster zum Bearbeiten
	const openEditWindow = () => {
		setShowEditBook(true);
	};

	// schließe Fenster zum Bearbeiten
	const closeEditWindow = () => {
		setShowEditBook(false);
	};

	// Textfeldeingabe
	const changeBookDetails = () => {
		return (e: any) => setBook({ ...book, [e.target.name]: e.target.value });
	};

	// öffne Buch
	React.useEffect(() => {
		setLoading(true);
		konvey(API_BOOK, id, jwt)
			.then(setBook)
			.then(() => setLoading(false));
		return () => setLoading(false);
	}, []);

	return {
		state: { book, showEditBook },
		setter: { setBook },
		functions: {
			changeBookDetails,
			updateBookDetails,
			openEditWindow,
			closeEditWindow,
			deleteBook,
		},
	};
};

export default useBookDetails;
