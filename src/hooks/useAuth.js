import * as React from 'react';
import { LayoutContext } from '../context/LayoutContext';
import { FaCheckCircle, FaPoop } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUrlParams } from '../helpers/getUrlParams';
import {
	AUTH_SIGNIN,
	AUTH_SIGNOUT,
	API_REQUESTRESET,
	API_RESETPASSWORD,
	API_USERS,
} from '../config/config';
import { konvey } from '../helpers/konvey';

const useAuth = () => {
	const userName = localStorage.getItem('name');
	const userId = localStorage.getItem('id');
	const jwt = localStorage.getItem('token');
	const [user, setUser] = React.useState(jwt ? true : false);
	const [userCredential, setUserCredential] = React.useState({
		name: '',
		email: '',
		password: '',
	});
	const { setAlert, setLoading, setIsTabLeft, setShowLinks } =
		React.useContext(LayoutContext);
	const forwardPage = useNavigate();
	const { state, search } = useLocation();
	let query = getUrlParams(search);

	// error handler
	const catchError = (e) => {
		setAlert({
			display: true,
			icon: <FaPoop />,
			msg: e.message,
		});
	};

	// POST registriere neuen User im Backend / logge User ein (Backend)
	const login = (e) => {
		e.preventDefault();
		setLoading(true);
		konvey(AUTH_SIGNIN, null, null, 'POST', userCredential)
			.then((data) => {
				localStorage.setItem('id', data?.user._id);
				localStorage.setItem('name', data?.user.name);
				localStorage.setItem('token', data?.token);
				forwardPage(state ? state.from : '/', setUser(true));
			})
			.catch(catchError)
			.finally(() => {
				setLoading(false);
				setUserCredential({ email: '', password: '' });
			});
	};

	const signup = (e) => {
		e.preventDefault();
		setLoading(true);
		konvey(API_USERS, null, null, 'POST', userCredential)
			.then(() => setIsTabLeft(true))
			.then(() => {
				setAlert({
					display: true,
					icon: <FaCheckCircle />,
					msg: 'Der erste Schritt war erfolgreich! Halte Ausschau in deinen Emails nach Post von uns',
				});
			})
			.catch(catchError)
			.finally(() => {
				setLoading(false);
				setUserCredential({ name: '', email: '', password: '' });
			});
	};

	// logge den User aus (UI)
	const logout = () => {
		setLoading(true);
		konvey(AUTH_SIGNOUT)
			.then(() => setShowLinks(false))
			.then(() => localStorage.clear())
			.then(() => setUser(false))
			.catch((error) => console.error(error))
			.finally(() => {
				setLoading(false);
				setUserCredential({ name: '', email: '', password: '' });
			});
	};

	// verarbeite die Eingabe des Users
	const checkSigninInput = (e) => {
		setUserCredential({
			...userCredential,
			[e.target.name]: e.target.value,
		});
	};

	// schicke den Password Request mit useremail ab
	const requestReset = (e) => {
		e.preventDefault();
		setLoading(false);
		konvey(API_REQUESTRESET, null, null, 'POST', {
			email: userCredential.email,
		})
			.then(() =>
				setAlert({
					display: true,
					icon: <FaCheckCircle />,
					msg: 'Der erste Schritt war erfolgreich! Halte Ausschau in deinen Emails nach Post von uns',
				})
			)
			.catch(catchError)
			.finally(() => {
				setUserCredential({ email: '' });
				setLoading(false);
			});
	};

	const reset = (e) => {
		e.preventDefault();
		setLoading(false);
		konvey(API_RESETPASSWORD, null, null, 'POST', {
			userId: query.get('id'),
			token: query.get('token'),
			password: userCredential.password,
		})
			.catch(catchError)
			.then(() =>
				forwardPage('/', setUserCredential({ email: '', password: '' }))
			)
			.then(() => {
				setAlert({
					display: true,
					icon: <FaCheckCircle />,
					msg: 'Dein neues Passwort wurde erfolgreich eingerichtet. Logge dich nun damit ein.',
				});
			})
			.finally(() => {
				setUserCredential({ password: '' });
				setLoading(false);
			});
	};

	return {
		state: { user, userCredential },
		creds: { userId, userName, jwt },
		functions: {
			checkSigninInput,
			login,
			signup,
			logout,
			reset,
			requestReset,
		},
	};
};

export default useAuth;
