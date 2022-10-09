import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@kodebi/libkodebi-ui';

export const ReturnTo = () => {
	const history = useNavigate();
	const prevPath = () => history(-1);
	return (
		<>
			<Button variant="filter" onClick={prevPath} label="zurück" />
		</>
	);
};
