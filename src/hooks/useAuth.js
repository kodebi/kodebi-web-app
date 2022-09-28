import * as React from 'react';
import { LayoutContext } from '../context/LayoutContext';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUrlParams } from '../helpers/getUrlParams';
import {
	AUTH_SIGNIN,
	AUTH_SIGNOUT,
	AUTH_USERACTIVATION,
	API_REQUESTRESET,
	API_RESETPASSWORD,
	API_USERS,
} from '../config/config';
import { konvey } from '../helpers/konvey';
import useError from './useError';

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
	const { catchError } = useError();
	let query = getUrlParams(search);

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
			.then((data) => {
				setIsTabLeft(true);
				setAlert({
					display: true,
					icon: <FaCheckCircle />,
					msg: data.message,
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
			.catch(catchError)
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

	const activate = (e) => {
		e.preventDefault();
		setLoading(true);
		konvey(AUTH_USERACTIVATION, null, null, 'POST', {
			userId: query.get('id'),
			token: query.get('token'),
		})
			.catch(catchError)
			.then((data) => {
				setAlert({
					display: true,
					icon: <FaCheckCircle />,
					msg: data.message,
				});
				forwardPage('/');
			})
			.finally(() => {
				setLoading(false);
			});
	};

	// schicke den Password Request mit useremail ab
	const requestReset = (e) => {
		e.preventDefault();
		setLoading(true);
		konvey(API_REQUESTRESET, null, null, 'POST', {
			email: userCredential.email,
		})
			.then((data) =>
				setAlert({
					display: true,
					icon: <FaCheckCircle />,
					msg: data.message,
				})
			)
			.catch(catchError)
			.finally(() => {
				setUserCredential({ name: '', email: '', password: '' });
				setLoading(false);
			});
	};

	const reset = (e) => {
		e.preventDefault();
		setLoading(true);
		konvey(API_RESETPASSWORD, null, null, 'POST', {
			userId: query.get('id'),
			token: query.get('token'),
			password: userCredential.password,
		})
			.catch(catchError)
			.then((data) => {
				setAlert({
					display: true,
					icon: <FaCheckCircle />,
					msg: data.message,
				});
				forwardPage(
					'/',
					setUserCredential({ name: '', email: '', password: '' })
				);
			})
			.finally(() => {
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
			activate,
			reset,
			requestReset,
		},
	};
};

export default useAuth;
