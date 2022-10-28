import * as React from 'react';
import { LayoutState } from '../../@types/layout';
import { MessageState } from '../../@types/messages';

interface ModalWrapperProps {
	showEditBook?: LayoutState['showEditBook'];
	showMessageModal?: MessageState['showMessageModal'];
	onClick?: () => void;
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
