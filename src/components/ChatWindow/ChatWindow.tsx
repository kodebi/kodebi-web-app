import * as React from 'react';
import { Form } from '../Form';
import { OpenChat } from '../OpenChat';
import { Button, IconWrapper, Input } from '@kodebi/libkodebi-ui';
import { MessageContext } from '../../context/MessageContext';
import { FaPaperPlane } from 'react-icons/fa';
import { MessageState } from '../../@types/messages';

export const ChatWindow: React.FC = () => {
	const { selectedConversation, sendMessage, newMessage, handleMessage } =
		React.useContext(MessageContext) as MessageState;

	return (
		<>
			<aside className="chat-window">
				{selectedConversation ? <OpenChat /> : null}
				{selectedConversation ? (
					<Form className="input-message" onSubmit={sendMessage}>
						<Input
							textarea
							id="chat_message"
							name="message"
							cols={150}
							value={newMessage.message}
							onChange={handleMessage}
						/>
						<Button variant="filter" type="submit" margin="0">
							<IconWrapper fontSize="1.25rem">
								<FaPaperPlane />
							</IconWrapper>
						</Button>
					</Form>
				) : null}
			</aside>
		</>
	);
};
