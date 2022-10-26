import React from 'react';

interface FormProps {
	onSubmit?: () => void;
	className?: string;
	children?: React.ReactNode;
}

export const Form: React.FC<FormProps> = (props): JSX.Element => {
	return (
		<>
			<form {...props}>{props.children}</form>
		</>
	);
};
