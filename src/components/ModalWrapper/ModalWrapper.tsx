import * as React from 'react';

interface ModalWrapperProps {
	showEditBook?: boolean;
	showMessageModal?: boolean;
	onClick?: (e?: any) => void;
	children?: React.ReactNode;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
	showEditBook,
	showMessageModal,
	onClick,
	children,
}): JSX.Element => {
	return (
		<>
			<section
				className={`${
					showMessageModal || showEditBook
						? 'modal-wrapper open'
						: 'modal-wrapper'
				}`}
				onClick={onClick}
			>
				{children}
			</section>
		</>
	);
};
