import * as React from 'react';
import { Form } from '../Form';
import { OpenChat } from '../OpenChat';
import { Button } from '@kodebi/libkodebi-ui';
import { MessageContext } from '../../context/MessageContext';

export const ChatWindow = () => {
	const {
		selectedConversation,
		sendMessage,
		newMessage,
		handleKeyPress,
		handleMessage,
	} = React.useContext(MessageContext);

	return (
		<>
			<aside className="chat-window">
				{selectedConversation && <OpenChat />}
				{selectedConversation && (
					<Form className="input-message" onSubmit={sendMessage}>
						<textarea
							className="enter-message"
							name="message"
							value={newMessage.message}
							onChange={handleMessage}
							onKeyPress={handleKeyPress}
						/>
						<Button
							variant="filter"
							type="submit"
							margin="0"
							label="Abschicken"
						/>
					</Form>
				)}
			</aside>
		</>
	);
};
