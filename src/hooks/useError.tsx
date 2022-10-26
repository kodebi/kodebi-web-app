import * as React from 'react';
import { LayoutContext } from '../context/LayoutContext';
import { FaPoop } from 'react-icons/fa';
import { LayoutState } from '../@types/layout';

const useError = () => {
	const { setAlert } = React.useContext(LayoutContext) as LayoutState;

	const catchError = (e: any): void => {
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
