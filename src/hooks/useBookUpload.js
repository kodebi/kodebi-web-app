import * as React from 'react';
import { LayoutContext } from '../context/LayoutContext';
import { AuthContext } from '../context/AuthContext';
import { FaCheckCircle, FaPoo, FaFlushed } from 'react-icons/fa';
import { genres, languages, conditions, status } from '../utils/dropdown';
import { API_BOOK } from '../config/config';

const useBookUpload = () => {
	const { setLoading, setAlert } = React.useContext(LayoutContext);
	const { userId, userName, jwt } = React.useContext(AuthContext);
	const [newBook, setNewBook] = React.useState({
		name: '',
		author: '',
		category: genres[0],
		language: languages[0],
		condition: conditions[0],
		status: status[0],
		desc: '',
	});
	const [bookImage, setBookImage] = React.useState(null);

	// POST Buch
	const bookUpload = async (api, tkn, formdata) => {
		try {
			setLoading(true);
			const res = await fetch(api, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${tkn}`,
				},
				body: formdata,
			});
			if (res.ok) {
				await res.json();
				setLoading(false);
				setAlert({
					display: true,
					icon: <FaCheckCircle />,
					msg: 'Das Buch wurde erfolgreich hinzugefügt',
				});
			} else {
				throw new Error('Hoppala, da ist was schief gegangen');
			}
		} catch (error) {
			console.log('Hochladen fehlgeschlagen', error);
			setLoading(false);
			setAlert({
				display: true,
				icon: <FaPoo />,
				msg: 'Das hat irgendwie nicht geklappt...',
			});
		} finally {
			setNewBook({
				name: '',
				author: '',
				category: genres[0],
				language: languages[0],
				condition: conditions[0],
				status: status[0],
				desc: '',
			});
			setBookImage();
		}
	};

	// Buch hochladen
	const startUpload = (e) => {
		e.preventDefault();
		if (
			newBook.name &&
			newBook.author &&
			newBook.category &&
			newBook.language &&
			newBook.condition &&
			newBook.status
		) {
			const bookData = new FormData();
			bookData.append('bookImage', bookImage);
			bookData.append('name', newBook.name);
			bookData.append('author', newBook.author);
			bookData.append('category', newBook.category);
			bookData.append('language', newBook.language);
			bookData.append('condition', newBook.condition);
			bookData.append('ownerId', userId);
			bookData.append('ownerName', userName);
			bookData.append('status', newBook.status);
			bookData.append('description', newBook.desc);
			bookUpload(API_BOOK, jwt, bookData);
		} else {
			setAlert({
				display: true,
				icon: <FaFlushed />,
				msg: 'Halt, da fehlen paar Felder!',
			});
		}
	};

	// Textfeldeingabe
	const textChange = (e) => {
		setNewBook({ ...newBook, [e.target.name]: e.target.value });
	};

	// Bilddatei hinzufügen
	const imageChange = (e) => {
		setBookImage(e.target.files[0]);
	};

	// resette die komplette Eingabe
	const resetInput = () => {
		setBookImage(null);
		setNewBook({
			name: '',
			author: '',
			category: genres[0],
			language: languages[0],
			condition: conditions[0],
			ownerId: userId,
			ownerName: userName,
			status: status[0],
			desc: '',
		});
	};

	return {
		state: { newBook, bookImage },
		functions: { textChange, imageChange, resetInput, startUpload },
	};
};

export default useBookUpload;
