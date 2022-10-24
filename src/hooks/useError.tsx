import * as React from 'react';
import { LayoutContext } from '../context/LayoutContext';
import { FaPoop } from 'react-icons/fa';

const useError = () => {
	const { setAlert } = React.useContext(LayoutContext);

	const catchError = (e) => {
		setAlert({
			display: true,
			icon: <FaPoop />,
			msg: e.message,
		});
	};

	return {
		catchError,
	};
};

export default useError;
