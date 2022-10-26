import * as React from 'react';
import { MessageState } from '../../@types/messages';

interface ModalWrapperProps {
	showMessageModal: MessageState['showMessageModal'];
	onClick?: () => void;
	children?: React.ReactNode;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
	showMessageModal,
	onClick,
	children,
}): JSX.Element => {
	return (
		<>
			<section
				className={`${
					showMessageModal ? 'modal-wrapper open' : 'modal-wrapper'
				}`}
				onClick={onClick}
			>
				{children}
			</section>
		</>
	);
};
