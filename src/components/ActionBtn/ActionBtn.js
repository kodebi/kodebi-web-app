import React from 'react';

export const ActionBtn = (props) => {
	return (
		<>
			<button className="action-btn" {...props}>
				{props.children}
			</button>
		</>
	);
};
