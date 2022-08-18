import React from 'react';

export const SigninBtn = (props) => {
	return (
		<>
			<button data-testid="signin" className="signin-btn" {...props}>
				{props.children}
			</button>
		</>
	);
};
