import React from 'react';
import { Form } from '../Form';
import { ModalWrapper } from '../ModalWrapper';
import { motion } from 'framer-motion';
import { Button, Input } from '@kodebi/libkodebi-ui';
import { MessageState } from '../../@types/messages';

interface MessageModalProps {
	showMessageModal: MessageState['showMessageModal'];
	newConv: MessageState['newConv'];
	msgModalInput: MessageState['msgModalInput'];
	startConv: MessageState['startConv'];
	closeMessageModal: MessageState['closeMessageModal'];
}

export const MessageModal: React.FC<MessageModalProps> = ({
	showMessageModal,
	newConv,
	msgModalInput,
	startConv,
	closeMessageModal,
}): JSX.Element => {
	return (
		<>
			<ModalWrapper
				showMessageModal={showMessageModal}
				onClick={closeMessageModal}
			>
				<motion.aside
					drag
					className="msg-modal"
					onClick={(e) => e.stopPropagation()}
				>
					<Form onSubmit={startConv}>
						<Input
							label
							id="message"
							name="message"
							labelTag="Deine Nachricht"
							rows={3}
							position="above"
							labelColor="#fff"
							textarea
							placeholder="Schreibe etwas..."
							value={newConv.message}
							onChange={msgModalInput}
						/>
						<Button variant="action" type="submit" label="Abschicken" />
						<Button
							variant="action"
							onClick={closeMessageModal}
							label="Abbrechen"
						/>
					</Form>
				</motion.aside>
			</ModalWrapper>
		</>
	);
};
