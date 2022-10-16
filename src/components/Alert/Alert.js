import * as React from 'react';
import { LayoutContext } from '../../context/LayoutContext';
import { Box } from '@kodebi/libkodebi-ui';

export const Alert = () => {
	const { alert, setAlert } = React.useContext(LayoutContext);

	React.useLayoutEffect(() => {
		setTimeout(() => {
			setAlert({ display: false, icon: '', msg: '' });
		}, 3000);
	}, [alert]);

	return (
		<Box className="alert basic-flex">
			<span className="icon basic-flex">{alert.icon}</span>
			<p>{alert.msg}</p>
		</Box>
	);
};
